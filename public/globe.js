/* A real, locally rendered WebGL sphere. No tracking or third-party runtime. */
(() => {
  "use strict";
  const host = document.querySelector("[data-globe-host]");
  const toggle = document.querySelector("[data-globe-toggle]");
  if (!host || !toggle) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  try { paused = localStorage.getItem("eu-globe-paused") === "true"; } catch {}
  let gl, program, texture, canvas, observer, frame = 0, last = 0, angle = 1.2;
  let lost = false, disposed = false, ready = false;
  const buffers = [], shaders = [];
  const abort = new AbortController();
  function updateControl() {
    toggle.hidden = !ready;
    toggle.textContent = paused ? "Resume globe rotation" : "Pause globe rotation";
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.disabled = reduced.matches;
    if (reduced.matches) toggle.textContent = "Globe motion off (reduced motion)";
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; last = 0; }
  function cleanup() {
    stop();
    observer?.disconnect();
    if (gl && !lost) {
      buffers.forEach(buffer => gl.deleteBuffer(buffer));
      shaders.forEach(shader => gl.deleteShader(shader));
      if (texture) gl.deleteTexture(texture);
      if (program) gl.deleteProgram(program);
    }
    canvas?.remove();
    host.classList.remove("globe-ready");
    ready = false;
    updateControl();
  }
  function compile(type, source) {
    const shader = gl.createShader(type);
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Globe shader unavailable");
    return shader;
  }
  function resize() {
    if (!ready || lost) return;
    const rect = host.getBoundingClientRect();
    // Bound fill-rate on phones and high-density displays, independent of screen DPR.
    const ratio = Math.min(devicePixelRatio || 1, 1.25, 900 / Math.max(rect.width, rect.height, 1));
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(gl.getUniformLocation(program, "aspect"), canvas.width / canvas.height);
    draw();
  }
  function draw() {
    if (!ready || lost) return;
    gl.uniform1f(gl.getUniformLocation(program, "angle"), angle);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, 48 * 28 * 6, gl.UNSIGNED_SHORT, 0);
    canvas.dataset.rotation = angle.toFixed(4);
  }
  function animate(time) {
    frame = 0;
    if (!ready || lost || disposed || document.hidden || paused || reduced.matches) { last = 0; return; }
    if (!last) last = time;
    const elapsed = time - last;
    if (elapsed >= 1000 / 30) {
      angle = (angle + Math.min(elapsed, 100) * (Math.PI * 2 / 180000)) % (Math.PI * 2);
      last = time;
      draw();
    }
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    stop();
    updateControl();
    if (ready && !lost && !disposed && !document.hidden && !paused && !reduced.matches) frame = requestAnimationFrame(animate);
    else draw();
  }
  toggle.addEventListener("click", () => {
    paused = !paused;
    try { localStorage.setItem("eu-globe-paused", String(paused)); } catch {}
    sync();
  });
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("pagehide", event => {
    if (event.persisted) stop();
    else { disposed = true; abort.abort(); cleanup(); }
  });
  window.addEventListener("pageshow", sync);
  async function init() {
    if (disposed) return;
    try {
      canvas = document.createElement("canvas");
      canvas.className = "webgl-globe";
      canvas.setAttribute("aria-hidden", "true");
      gl = canvas.getContext("webgl", { alpha:true, antialias:false, powerPreference:"low-power", preserveDrawingBuffer:false });
      if (!gl) { cleanup(); return; }
      canvas.addEventListener("webglcontextlost", event => {
        event.preventDefault(); lost = true; stop();
        host.classList.remove("globe-ready"); ready = false; updateControl();
      });
      // Keep the stable poster if the GPU context is lost; do not repeatedly allocate contexts.
      const response = await fetch("/globe-land.json", { signal:abort.signal });
      if (!response.ok) throw new Error("Globe map unavailable");
      const polygons = await response.json();
      if (disposed || lost) { cleanup(); return; }
      program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, `
        attribute vec3 point; attribute vec2 uv; uniform float angle; uniform float aspect;
        varying vec2 mapUV; varying vec3 normal; varying vec3 position;
        void main(){
          float c=cos(angle),s=sin(angle);
          vec3 p=vec3(c*point.x+s*point.z,point.y,-s*point.x+c*point.z);
          float t=.18; p=vec3(p.x,cos(t)*p.y-sin(t)*p.z,sin(t)*p.y+cos(t)*p.z);
          normal=p;position=p;mapUV=uv;
          float w=3.1-p.z;
          gl_Position=vec4(p.x*2.6/aspect,p.y*2.6,1.020202*w-.2020202,w);
        }`));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `
        precision mediump float; uniform sampler2D earth; varying vec2 mapUV; varying vec3 normal; varying vec3 position;
        void main(){
          vec3 n=normalize(normal),light=normalize(vec3(-.7,.8,1.5)),view=normalize(vec3(0.,0.,3.1)-position);
          vec3 base=texture2D(earth,mapUV).rgb;
          float diffuse=max(dot(n,light),0.);
          float spec=pow(max(dot(n,normalize(light+view)),0.),42.);
          float rim=pow(1.-max(dot(n,view),0.),3.);
          vec3 colour=base*(.28+.86*diffuse)+vec3(.72,.96,1.)*spec*.75+vec3(.12,.5,.7)*rim;
          gl_FragColor=vec4(colour,1.);
        }`));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Globe rendering unavailable");
      gl.useProgram(program);
      const points = [], uvs = [], indices = [];
      for (let y=0;y<=28;y++) for(let x=0;x<=48;x++) {
        const u=x/48,v=y/28,longitude=u*Math.PI*2,latitude=(v-.5)*Math.PI;
        points.push(Math.cos(latitude)*Math.cos(longitude),Math.sin(latitude),Math.cos(latitude)*Math.sin(longitude));
        uvs.push(u,1-v);
      }
      for(let y=0;y<28;y++) for(let x=0;x<48;x++) {
        const a=y*49+x,b=a+49; indices.push(a,b,a+1,a+1,b,b+1);
      }
      function attribute(name, values, size) {
        const buffer=gl.createBuffer();buffers.push(buffer);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(values),gl.STATIC_DRAW);
        const location=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,size,gl.FLOAT,false,0,0);
      }
      attribute("point",points,3);attribute("uv",uvs,2);
      const index=gl.createBuffer();buffers.push(index);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
      const map=document.createElement("canvas");map.width=1024;map.height=512;
      const ctx=map.getContext("2d");
      ctx.fillStyle="#15589a";ctx.fillRect(0,0,1024,512);
      ctx.fillStyle="#b5d9bd";
      for (const polygon of polygons) {
        ctx.beginPath();
        for (const ring of polygon) ring.forEach(([lon,lat],i)=>ctx[i?"lineTo":"moveTo"]((lon+180)/360*1024,(90-lat)/180*512));
        ctx.fill("evenodd");
      }
      ctx.strokeStyle="rgba(174,231,255,.19)";ctx.lineWidth=1;
      for(let x=0;x<1024;x+=1024/12){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,512);ctx.stroke();}
      for(let y=0;y<512;y+=512/6){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(1024,y);ctx.stroke();}
      texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,map);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);
      host.append(canvas);ready=true;resize();host.classList.add("globe-ready");
      observer=new ResizeObserver(resize);observer.observe(host);
      sync();
    } catch { cleanup(); }
  }
  // Allow content and the static poster to paint before starting optional decoration.
  window.addEventListener("load", () => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(init,{timeout:1500});
    else setTimeout(init,200);
  }, {once:true});
})();

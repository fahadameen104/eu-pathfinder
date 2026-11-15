# True rotating 3D globe

The shared page atmosphere now renders a real WebGL sphere with a48x28 segmented mesh, geographic land texture generated from local Natural Earth land polygons, directional lighting, specular highlight and rim light. A single renderer per page rotates once per180seconds, capped at30renders/second and900pixels on its longest drawing-buffer axis; device pixel ratio is capped at1.25. No external runtime, tracking, WebGL library or per-frame texture generation.

Content and the SVG poster paint first; optional initialization starts after load and idle. Reduced-motion preference gets a still3D render. Footer pause/resume persists between pages. Hidden tabs stop animation; pagehide disposes resources except bfcache where animation resumes on pageshow. GPU/context/map failures keep the SVG poster. Logo remains a separate dimensional emblem and wordmark with higher opacity, plus the full-opacity header logo. Photography and page content remain above/below their existing layers respectively.

Map data: Natural Earth ne_110m_land, public domain. Source https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson ; terms https://www.naturalearthdata.com/about/terms-of-use/ . Local globe-land.json contains rounded polygon coordinates, no runtime external requests.

Tests: real mesh setup with mocked WebGL, bounded resolution, rotation changes, paused stability, resume, hidden tabs, reduced-motion changes, context loss, no-GPU/map failures and resource cleanup. Browser verified actual WebGL canvas, changing angle and stable paused angle. Mobile layout checks use390px viewport; real-device smoothness still depends on hardware.

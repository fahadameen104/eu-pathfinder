// Consolidate the public www alias onto the canonical host used by the sitemap.
// Preserve API requests, including submissions from previously cached www pages.
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  // Retire the legacy Latvia guide URL reported as 404 in Search Console.
  if (["GET", "HEAD"].includes(request.method) && /^\/countries\/latvia\/?$/.test(url.pathname)) {
    url.hostname = "eupathfinder.agency";
    url.pathname = "/latvia/";
    return Response.redirect(url.toString(), 301);
  }
  if (url.hostname === "www.eupathfinder.agency" &&
      ["GET", "HEAD"].includes(request.method) &&
      !url.pathname.startsWith("/api/")) {
    url.hostname = "eupathfinder.agency";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}

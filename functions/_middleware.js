// Consolidate the public www alias onto the canonical host used by the sitemap.
// Preserve API requests, including submissions from previously cached www pages.
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  if (url.hostname === "www.eupathfinder.agency" &&
      ["GET", "HEAD"].includes(request.method) &&
      !url.pathname.startsWith("/api/")) {
    url.hostname = "eupathfinder.agency";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}

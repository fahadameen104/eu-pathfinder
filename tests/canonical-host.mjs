import assert from "node:assert/strict";
import { onRequest } from "../functions/_middleware.js";
for (const method of ["GET", "HEAD"]) {
  let called = false;
  const response = await onRequest({
    request: new Request("https://www.eupathfinder.agency/europe-jobs-from-nepal/?utm_source=test", { method }),
    next() { called = true; }
  });
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("Location"), "https://eupathfinder.agency/europe-jobs-from-nepal/?utm_source=test");
  assert.equal(called, false);
}
for (const [url, method] of [
  ["https://eupathfinder.agency/europe-jobs-from-nepal/", "GET"],
  ["https://www.eupathfinder.agency/api/enquiry", "POST"],
  ["https://www.eupathfinder.agency/api/enquiry", "GET"],
  ["https://preview.pages.dev/", "GET"]
]) {
  const expected = new Response("unchanged", { status: 202 });
  const actual = await onRequest({ request: new Request(url, { method }), next() { return expected; } });
  assert.equal(actual, expected);
}
console.log("Canonical host checks passed: 301 preserves path/query, no apex loop, API and preview passthrough.");

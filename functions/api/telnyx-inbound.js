const recipient = "info@eupathfinder.agency";
const phoneNumber = "+12899143132";
const telnyxPublicKey = "DoF6dX66xDs6XzhgrDU+A36uwjYIo+UzPPgHsu9H1/0=";

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function decodeBase64(value) {
  try {
    return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

async function readLimitedBody(request, maximumBytes) {
  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    totalBytes += value.byteLength;
    if (totalBytes > maximumBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

async function isValidTelnyxWebhook(request, rawBody) {
  const signature = request.headers.get("telnyx-signature-ed25519");
  const timestamp = request.headers.get("telnyx-timestamp");
  if (!signature || !timestamp || !/^\d{10}$/.test(timestamp)) {
    return false;
  }

  const signedAt = Number(timestamp);
  if (!Number.isSafeInteger(signedAt) || Math.abs(Date.now() / 1000 - signedAt) > 300) {
    return false;
  }

  const signatureBytes = decodeBase64(signature);
  const publicKeyBytes = decodeBase64(telnyxPublicKey);
  if (!signatureBytes || signatureBytes.length !== 64 || !publicKeyBytes || publicKeyBytes.length !== 32) {
    return false;
  }

  try {
    const publicKey = await crypto.subtle.importKey(
      "raw",
      publicKeyBytes,
      { name: "Ed25519" },
      false,
      ["verify"]
    );
    return await crypto.subtle.verify(
      { name: "Ed25519" },
      publicKey,
      signatureBytes,
      new TextEncoder().encode(`${timestamp}|${rawBody}`)
    );
  } catch {
    return false;
  }
}

export async function onRequestPost({ request, env }) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 65536) {
    return jsonResponse(413, { ok: false });
  }

  if (!(request.headers.get("Content-Type") || "").startsWith("application/json")) {
    return jsonResponse(415, { ok: false });
  }

  let rawBody;
  try {
    rawBody = await readLimitedBody(request, 65536);
  } catch {
    return jsonResponse(400, { ok: false });
  }
  if (rawBody === null) {
    return jsonResponse(413, { ok: false });
  }

  if (!(await isValidTelnyxWebhook(request, rawBody))) {
    return jsonResponse(401, { ok: false });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return jsonResponse(400, { ok: false });
  }

  const data = event?.data;
  const message = data?.payload;
  if (data?.event_type !== "message.received" || message?.direction !== "inbound") {
    return jsonResponse(200, { ok: true });
  }

  const addressedToNumber = Array.isArray(message.to)
    && message.to.some((destination) => destination?.phone_number === phoneNumber);
  if (!addressedToNumber) {
    return jsonResponse(200, { ok: true });
  }

  const sender = typeof message.from?.phone_number === "string"
    && /^\+[1-9]\d{6,14}$/.test(message.from.phone_number)
    ? message.from.phone_number
    : "Unknown sender";
  const text = typeof message.text === "string" && message.text
    ? message.text.slice(0, 4000)
    : Array.isArray(message.media) && message.media.length
      ? "MMS received; media attachments are not forwarded."
      : "Message received with no text content.";
  const receivedAt = typeof message.received_at === "string"
    ? message.received_at.slice(0, 64)
    : "Unknown";
  const html = `<h1>Incoming text to ${phoneNumber}</h1><p><strong>From:</strong> ${escapeHtml(sender)}</p><p><strong>Received:</strong> ${escapeHtml(receivedAt)}</p><p><strong>Message:</strong></p><pre style="white-space:pre-wrap;font:inherit">${escapeHtml(text)}</pre>`;
  const plainText = `Incoming text to ${phoneNumber}\nFrom: ${sender}\nReceived: ${receivedAt}\n\n${text}`;

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    console.error("Inbound SMS email is not configured: add RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return jsonResponse(503, { ok: false });
  }

  let emailResponse;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        ...(typeof data.id === "string" ? { "Idempotency-Key": `telnyx-${data.id}` } : {})
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [recipient],
        subject: `Incoming SMS to ${phoneNumber}`,
        html,
        text: plainText
      }),
      signal: AbortSignal.timeout(1500)
    });
  } catch {
    console.error("Inbound SMS email delivery failed before Resend responded.");
    return jsonResponse(502, { ok: false });
  }

  if (!emailResponse.ok) {
    console.error("Resend rejected an inbound SMS email:", emailResponse.status);
    return jsonResponse(502, { ok: false });
  }

  return jsonResponse(200, { ok: true });
}

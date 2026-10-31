const recipient = "info@eupathfinder.agency";
const allowedInterests = new Set([
  "Hospitality work",
  "Seasonal or entry-level work",
  "Work-permit guidance",
  "Another question"
]);

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function response(request, status, message, ok) {
  const headers = { "Cache-Control": "no-store" };
  if (request.headers.get("Accept")?.includes("application/json")) {
    headers["Content-Type"] = "application/json; charset=utf-8";
    return new Response(JSON.stringify({ ok, message }), { status, headers });
  }

  headers["Content-Type"] = "text/html; charset=utf-8";
  return new Response(`<!doctype html>
    <html lang="en">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${ok ? "Enquiry sent" : "Enquiry not sent"} | EU Pathfinder</title>
      <body style="font:16px/1.6 system-ui,sans-serif;max-width:42rem;margin:10vh auto;padding:1.5rem;background:#10211d;color:#f1f6f1">
        <main>
          <h1>${ok ? "Thank you" : "We couldn't send your enquiry"}</h1>
          <p>${escapeHtml(message)}</p>
          <p><a style="color:#ffb39e" href="/#contact">Return to the contact form</a> · <a style="color:#ffb39e" href="mailto:${recipient}">${recipient}</a></p>
        </main>
      </body>
    </html>`, { status, headers });
}

function readField(formData, name, maximum) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) {
    return response(request, 403, "Please submit this form from the EU Pathfinder website.", false);
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 8192) {
    return response(request, 413, "The enquiry is too large. Please shorten your message and try again.", false);
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.startsWith("multipart/form-data") && !contentType.startsWith("application/x-www-form-urlencoded")) {
    return response(request, 415, "This form submission format is not supported.", false);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return response(request, 400, "The form could not be read. Please check the fields and try again.", false);
  }

  if (readField(formData, "website", 200)) {
    return response(request, 200, "Thank you. Your enquiry has been received.", true);
  }

  const fields = {
    name: readField(formData, "name", 100),
    email: readField(formData, "email", 254),
    nationality: readField(formData, "nationality", 80),
    whatsapp: readField(formData, "whatsapp", 32),
    interest: readField(formData, "interest", 80),
    message: readField(formData, "message", 1200)
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const whatsappPattern = /^\+?[0-9().\s-]{7,32}$/;

  if (fields.name.length < 2 || /[\r\n]/.test(fields.name)) {
    return response(request, 400, "Enter your name using at least two characters.", false);
  }
  if (!emailPattern.test(fields.email)) {
    return response(request, 400, "Enter a valid email address so the team can reply.", false);
  }
  if (!fields.nationality || /[\r\n]/.test(fields.nationality)) {
    return response(request, 400, "Enter your nationality.", false);
  }
  if (!whatsappPattern.test(fields.whatsapp)) {
    return response(request, 400, "Enter a WhatsApp number with its country code.", false);
  }
  if (!allowedInterests.has(fields.interest)) {
    return response(request, 400, "Choose the kind of guidance you need.", false);
  }
  if (formData.get("consent") !== "on") {
    return response(request, 400, "Please confirm that the team may contact you about this enquiry.", false);
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    console.error("Enquiry email is not configured: add RESEND_API_KEY and RESEND_FROM_EMAIL secrets.");
    return response(request, 503, "The enquiry form is not configured yet. Please contact info@eupathfinder.agency or use WhatsApp.", false);
  }

  const entries = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Nationality", fields.nationality],
    ["WhatsApp", fields.whatsapp],
    ["Topic", fields.interest],
    ["Message", fields.message || "(No message provided)"]
  ];
  const html = `<h1>New website enquiry</h1>${entries.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("")}`;
  const text = `New website enquiry\n\n${entries.map(([label, value]) => `${label}: ${value}`).join("\n")}`;

  let emailResponse;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [recipient],
        reply_to: fields.email,
        subject: `Website enquiry: ${fields.interest}`,
        html,
        text
      })
    });
  } catch (error) {
    console.error("Resend request failed:", error instanceof Error ? error.message : "unknown network error");
    return response(request, 502, "We couldn't connect to the email service. Please try again or email us directly.", false);
  }

  if (!emailResponse.ok) {
    console.error("Resend rejected an enquiry:", emailResponse.status);
    return response(request, 502, "The email service couldn't accept your enquiry. Please try again or email us directly.", false);
  }

  return response(request, 200, "Your enquiry has been sent. The team will reply using the contact details you provided.", true);
}

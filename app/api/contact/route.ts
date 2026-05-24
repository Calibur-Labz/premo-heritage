const TO_EMAIL = "premoheritage@gmail.com";

type ContactPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

function asRequiredString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  const fullName = asRequiredString(payload.fullName);
  const email = asRequiredString(payload.email);
  const phone = asRequiredString(payload.phone);
  const message = asRequiredString(payload.message);

  if (!fullName || !email || !phone || !message) {
    return Response.json(
      { message: "Please complete all fields before sending." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Premo Heritage <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json(
      { message: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `New Premo Heritage inquiry from ${fullName}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as {
      message?: string;
      name?: string;
    } | null;

    return Response.json(
      {
        message:
          process.env.NODE_ENV === "development" && error?.message
            ? error.message
            : "Unable to send your message right now.",
        error: process.env.NODE_ENV === "development" ? error?.name : undefined,
      },
      { status: 502 },
    );
  }

  return Response.json({ message: "Message sent successfully." });
}

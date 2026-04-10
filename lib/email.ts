const RESEND_API_URL = "https://api.resend.com/emails";

type SendEmailPayload = {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string | string[];
  tags?: Array<{ name: string; value: string }>;
};

type ResendResponse = {
  id?: string;
  error?: {
    message?: string;
    name?: string;
  };
};

export function isResendConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function assertResendConfigured() {
  if (isResendConfigured()) {
    return;
  }

  throw new Error("RESEND_API_KEY is required before email sending can go live.");
}

export async function sendTransactionalEmail(payload: SendEmailPayload) {
  assertResendConfigured();

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo,
      tags: payload.tags
    })
  });

  const data = (await response.json().catch(() => null)) as ResendResponse | null;

  if (!response.ok) {
    throw new Error(data?.error?.message || "Resend request failed.");
  }

  return data;
}

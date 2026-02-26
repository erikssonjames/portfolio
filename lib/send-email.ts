"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function getString(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function sendContactEmail(formData: FormData) {
  const trap = getString(formData, "_company");
  if (trap) return { ok: true as const }; // silently ignore bots

  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const subject = getString(formData, "subject");
  const message = getString(formData, "message");

  if (!name || !email || !message) {
    return { ok: false as const, error: "Missing required fields." };
  }

  const to = process.env.CONTACT_TO_EMAIL!;
  const from = process.env.CONTACT_FROM_EMAIL!;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: subject ? `[Portfolio] ${subject}` : "[Portfolio] New message",
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}
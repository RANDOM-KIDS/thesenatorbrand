import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, url: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"The Senator Brand" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `<p>Click the link to reset your password:</p>
<p><a href="${url}">Reset password</a></p>
<p>If you didn't request this, you can ignore this email.</p>`,
  });
}

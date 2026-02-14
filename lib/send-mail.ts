import nodemailer from "nodemailer";

export const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID!,
    pass: process.env.GMAIL_PASS!,
  },
});

export async function sendEmail(to: string, url: string, subject: string) {
  await transpoter.sendMail({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f9fafb;
      color: #111827;
    }
    .wrapper {
      max-width: 480px;
      margin: 32px auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px -8px rgba(0,0,0,0.07);
    }
    .header {
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      padding: 32px 24px 28px;
      text-align: center;
      color: white;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 28px 24px 32px;
      text-align: center;
    }
    p {
      margin: 0 0 16px;
      font-size: 15px;
      line-height: 1.55;
      color: #4b5563;
    }
    .btn {
      display: inline-block;
      margin: 24px 0 28px;
      padding: 14px 48px;
      background: #6366f1;
      color: white !important;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      border-radius: 10px;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.25);
      transition: all 0.2s ease;
    }
    .btn:hover {
      background: #4f46e5;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
    }
    .link-fallback {
      font-size: 13px;
      color: #6b7280;
      word-break: break-all;
      margin: 16px 0 24px;
    }
    .link-fallback a {
      color: #6366f1;
      text-decoration: underline;
    }
    .small {
      font-size: 13px;
      color: #6b7280;
      line-height: 1.5;
    }
    .footer {
      padding: 20px 24px;
      background: #f8fafc;
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }

    @media (prefers-color-scheme: dark) {
      body    { background: #0f172a; color: #e2e8f0; }
      .wrapper { background: #1e293b; box-shadow: 0 10px 30px -8px #00000060; }
      .content p, .small { color: #cbd5e1; }
      .footer { background: #111827; border-top-color: #334155; color: #94a3b8; }
    }

    @media only screen and (max-width: 500px) {
      .wrapper { margin: 16px; border-radius: 12px; }
      .content { padding: 24px 18px; }
      .btn    { padding: 14px 36px; width: 100%; box-sizing: border-box; text-align: center; }
    }
  </style>
</head>
<body>

<div class="wrapper">

  <div class="header">
    <h1>Reset Your Password</h1>
  </div>

  <div class="content">
    <p>Hi there,</p>
    <p>Tap the button below to choose a new password:</p>

    <a href="${url}" class="btn" target="_blank" rel="noopener">
      Reset Password
    </a>

    <p class="small">This link expires in <strong>10 minutes</strong>.</p>


    <p class="small" style="margin-top: 32px;">
      Didn’t request this? Just ignore this email —<br>
      your account stays safe.
    </p>
  </div>

  <div class="footer">
    © ${new Date().getFullYear()} Your App • Dhaka
  </div>

</div>

</body>
</html>`,
  });
}

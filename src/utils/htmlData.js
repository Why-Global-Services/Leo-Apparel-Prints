const sanitizeHtml = require("sanitize-html");

const currentYear = new Date().getFullYear();

exports.sendUserOtp = (mailData) => {
  const otp = sanitizeHtml(mailData.OTP.toString());
  const userName = mailData.name
    ? sanitizeHtml(mailData.name)
    : "Customer";

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Leo Cult OTP</title>
</head>

<body style="margin:0;padding:30px;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,50,150,0.12);max-width:600px;">

<!-- Header -->
<tr>
<td align="center" bgcolor="#0a1a3a" style="background-color:#0a1a3a;background-image:linear-gradient(135deg, #0a1a3a 0%, #1a3a7a 100%);padding:40px 35px;">

<img
src="https://facesync.blr1.digitaloceanspaces.com/products/MMK_1783922404470_mainlogo1.png"
width="65"
alt="Leo Cult"
style="display:block;margin:0 auto 15px;filter:brightness(0) invert(1);"
>

<h1 style="margin:0;color:#ffffff;font-size:30px;font-family:Arial,Helvetica,sans-serif;letter-spacing:1px;">
LEO CULT
</h1>

<p style="margin:8px 0 0;color:#8ab4f8;font-size:14px;letter-spacing:0.5px;">
Premium Streetwear Brand
</p>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:35px 35px 30px;">

<p style="text-align:center;color:#0a1a3a;font-size:15px;margin:0 0 25px;">
Hi ${userName}, use the code below to verify your account.
</p>

<!-- OTP -->
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" style="padding-bottom:12px;">

<table cellpadding="0" cellspacing="0" border="0" style="background:#f0f5ff;border:2px solid #1a3a7a;border-radius:14px;">
<tr>
<td style="padding:22px 45px;">
<span style="font-size:38px;font-family:'Courier New',monospace;font-weight:bold;letter-spacing:10px;color:#0a1a3a;">
${otp}
</span>
</td>
</tr>
</table>

</td>
</tr>
</table>

<p style="text-align:center;color:#5a7a9a;font-size:13px;margin:0 0 30px;">
⏳ Expires in 10 Minutes
</p>

<div style="border-top:1px solid #e8edf4;margin:0 0 25px;"></div>

<p style="text-align:center;font-size:13px;color:#7a8a9e;line-height:22px;margin:0;">
If you didn't request this verification code,<br>
you can safely ignore this email.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center" bgcolor="#f7f9fc" style="background:#f7f9fc;padding:35px;border-top:1px solid #e8edf4;">

<p style="margin:0 0 15px;color:#0a1a3a;font-size:15px;font-weight:700;letter-spacing:0.5px;">
LEO CULT
</p>

<p style="margin:0 0 18px;color:#5a7a9a;font-size:13px;">
Premium collections for Everyone
</p>

<p style="margin:0 0 16px;">
<a href="https://www.instagram.com/_leo_cult_/" style="color:#1a3a7a;text-decoration:none;margin:0 14px;font-size:13px;font-weight:500;">Instagram</a>
<span style="color:#c0c8d4;">|</span>
<a href="https://leocult.whydev.co.in/" style="color:#1a3a7a;text-decoration:none;margin:0 14px;font-size:13px;font-weight:500;">Website</a>
<span style="color:#c0c8d4;">|</span>
<a href="mailto:info@leocult.com" style="color:#1a3a7a;text-decoration:none;margin:0 14px;font-size:13px;font-weight:500;">Support</a>
</p>

<p style="margin:0;font-size:12px;color:#8a9aaa;">
© ${currentYear} Leo Cult. All Rights Reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};
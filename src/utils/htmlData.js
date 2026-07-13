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

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">

<title>Leo Cult OTP</title>

</head>

<body style="margin:0;padding:30px;background:#f5f5f5;font-family:'Inter',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.08);">

<!-- Header -->

<tr>
<td align="center" style="background:#111111;padding:35px;">

<img
src="https://leocult.whydev.co.in/logo.png"
width="70"
style="display:block;margin-bottom:15px;"
>

<h1 style="margin:0;color:#ffffff;font-size:32px;font-family:'Poppins',sans-serif;">
LEO CULT
</h1>

<p style="margin-top:8px;color:#cccccc;font-size:15px;">
Premium Streetwear Brand
</p>

</td>
</tr>

<!-- Content -->

<tr>
<td style="padding:45px;">

<h2 style="margin:0;color:#111111;font-size:28px;font-family:'Poppins';">
Verify Your Account
</h2>

<p style="margin-top:25px;font-size:16px;color:#444;">
Hello <strong>${userName}</strong>,
</p>

<p style="color:#666;font-size:15px;line-height:28px;">
Use the verification code below to securely access your Leo Cult account.
</p>

<!-- OTP -->

<table width="100%" cellpadding="0" cellspacing="0" style="margin:40px 0;">
<tr>
<td align="center">

<div style="
display:inline-block;
background:#FFF4EB;
border:2px dashed #FF6B00;
padding:22px 45px;
border-radius:12px;
">

<span style="
font-size:42px;
font-family:monospace;
font-weight:bold;
letter-spacing:10px;
color:#111111;
">
${otp}
</span>

</div>

</td>
</tr>
</table>

<p style="
text-align:center;
color:#888;
font-size:14px;
margin-top:-10px;
">
⏳ Expires in 10 Minutes
</p>

<!-- Button -->

<table width="100%" cellpadding="0" cellspacing="0" style="margin:35px 0;">
<tr>
<td align="center">

<a href="#"
style="
background:#111111;
color:#ffffff;
text-decoration:none;
padding:15px 40px;
border-radius:50px;
display:inline-block;
font-weight:600;
font-size:16px;
">
Verify Account
</a>

</td>
</tr>
</table>

<hr style="border:none;border-top:1px solid #eeeeee;margin:35px 0;">

<p style="
text-align:center;
font-size:14px;
color:#777;
line-height:26px;
">
If you didn't request this verification code,
you can safely ignore this email.
</p>

</td>
</tr>

<!-- Footer -->

<tr>
<td align="center"
style="
background:#111111;
padding:35px;
">

<p style="
margin:0 0 18px;
color:#ffffff;
font-size:15px;
font-weight:600;
">

LEO CULT

</p>

<p style="
margin:0 0 20px;
color:#bbbbbb;
font-size:14px;
">

Premium collections for Everyone

</p>

<p style="margin-bottom:18px;">

<a href="https://www.instagram.com/_leo_cult_/?fbclid=IwY2xjawS5p1tleHRuA2FlbQIxMQBicmlkETFaQjFzeW1tczZ6RmxIU3BQc3J0YwZhcHBfaWQBMAABHrzBnLnv4kTXFJEyildjjUOE8ZQ5QT77IiH4p3HbAHGYiPluoJV-YTS1sPY0_aem_L60h9F0eCS_p9vfZFW0vRg"
style="
color:#ffffff;
text-decoration:none;
margin:0 12px;
">
Instagram
</a>

|

<a href="https://leocult.whydev.co.in/"
style="
color:#ffffff;
text-decoration:none;
margin:0 12px;
">
Website
</a>

|

<a href="mailto:info@leocult.com"
style="
color:#ffffff;
text-decoration:none;
margin:0 12px;
">
Support
</a>

</p>

<p style="
margin:0;
font-size:12px;
color:#888888;
">

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
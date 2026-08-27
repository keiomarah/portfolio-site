// netlify/functions/contact.js
//
// Netlify Function that handles contact form submissions.
// Lives at: /.netlify/functions/contact  (once deployed)
//
// Requires the "nodemailer" package — run this in your project root:
//   npm install nodemailer
//
// And set these environment variables in Netlify's dashboard
// (Site settings > Environment variables), NOT in your code:
//   GMAIL_USER          - the Gmail address you're sending from
//   GMAIL_APP_PASSWORD   - a Gmail "app password" (not your normal password —
//                           generate one at myaccount.google.com/apppasswords,
//                           requires 2FA to be enabled on the account)
//   CONTACT_RECIPIENT    - the inbox submissions should land in (can be the
//                           same as GMAIL_USER, or different)

const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: "Method not allowed" }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: "Invalid request body" }),
    };
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  const website = (data.website || "").trim(); // honeypot

  // Bots fill in hidden fields; silently "succeed" so they don't adapt
  if (website !== "") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  }

  // ---- Validation ----
  const errors = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length > 100) {
    errors.push("Please enter a valid name.");
  }
  if (!emailPattern.test(email)) {
    errors.push("Please enter a valid email address.");
  }
  if (!message || message.length > 5000) {
    errors.push("Please enter a message (up to 5000 characters).");
  }

  if (errors.length > 0) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({ success: false, error: errors.join(" ") }),
    };
  }

  // ---- Send email ----
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECIPIENT || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: "Could not send message. Please try again later.",
      }),
    };
  }
};

import nodemailer from "nodemailer";

// ✅ CORRECT: createTransport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    console.log("📧 Preparing to send email to:", options.to);

    const mailOptions = {
      from: `AsaanDrive <${process.env.SMTP_FROM}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", options.to);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error: error.message };
  }
};

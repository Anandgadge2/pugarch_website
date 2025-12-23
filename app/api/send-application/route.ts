import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";
import type { EmailResponse } from "@/types/forms";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest
): Promise<NextResponse<EmailResponse>> {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const linkedin = formData.get("linkedin") as string | null;
    const role = formData.get("role") as string | null;
    const portfolio = formData.get("portfolio") as string | null;
    const whyJoin = formData.get("whyJoin") as string | null;
    const resume = formData.get("resume") as File | null;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          error: "Validation error",
        },
        { status: 400 }
      );
    }

    const attachments: Array<{ filename: string; content: Buffer }> = [];

    if (resume && resume.size > 0) {
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({ filename: resume.name, content: buffer });
    }

    const subject = `💼 New Job Application - ${firstName} ${lastName}${
      role ? ` (${role})` : ""
    }`;
    const emailContent = generateJobApplicationEmail({
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      role,
      portfolio,
      whyJoin,
      resumeName: resume?.name || null,
    });

    // Send email with timeout
    const emailPromise = transporter.sendMail({
      from: `"PugArch Careers" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: subject,
      html: emailContent,
      replyTo: email,
      attachments: attachments,
    });

    // Set a timeout of 15 seconds
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timeout")), 15000)
    );

    // Race between email sending and timeout
    await Promise.race([emailPromise, timeoutPromise]);

    return NextResponse.json({
      success: true,
      message: "Application sent successfully",
    });
  } catch (error) {
    console.error("Application error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // If timeout, still return success (email might still be sending)
    if (errorMessage.includes("timeout")) {
      return NextResponse.json({
        success: true,
        message: "Application received and is being processed",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send application",
        error: "Failed to send application",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

function generateJobApplicationEmail(data: any): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6; 
          color: #333; 
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px 10px;
          margin: 0;
          width: 100%;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        .email-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          padding: 40px 30px;
          text-align: center;
          position: relative;
        }
        .header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f5576c 0%, #f093fb 100%);
        }
        .header-icon {
          display: inline-block;
          margin: 0 auto 15px;
          font-size: 40px;
          line-height: 1;
        }
        .header h1 { 
          color: white;
          font-size: 32px;
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .header p {
          color: rgba(255,255,255,0.9);
          font-size: 16px;
          margin-top: 10px;
        }
        .content { 
          padding: 40px 35px;
          background: #ffffff;
        }
        .greeting {
          font-size: 20px;
          color: #333;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .intro-text {
          color: #4a5568;
          margin-bottom: 30px;
          font-size: 16px;
          line-height: 1.6;
        }
        .info-card {
          background: linear-gradient(135deg, #fff0f5 0%, #ffd6e7 100%);
          border-radius: 12px;
          border: 1px solid rgba(245, 87, 108, 0.3);
          overflow: hidden;
          margin-bottom: 25px;
        }
        
        /* Table-like structure */
        .info-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .info-table tr {
          border-bottom: 1px solid rgba(245, 87, 108, 0.3);
        }
        
        .info-table tr:last-child {
          border-bottom: none;
        }
        
        .info-table td {
          width: 50%;
          padding: 22px 25px;
          border-right: 1px solid rgba(245, 87, 108, 0.3);
          vertical-align: top;
        }
        
        .info-table td:last-child {
          border-right: none;
        }
        
        .label { 
          font-weight: 600;
          color: #f5576c;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          display: block;
          margin-bottom: 8px;
        }
        
        .value { 
          color: #2d3748;
          font-size: 16px;
          line-height: 1.6;
          word-break: break-word;
          overflow-wrap: break-word;
          display: block;
        }
        
        .value a {
          color: #f5576c;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .value a:hover {
          color: #f093fb;
          text-decoration: underline;
        }
        
        .why-join-box {
          background: #f8f9fa;
          border-left: 4px solid #f5576c;
          padding: 25px;
          border-radius: 8px;
          margin-top: 25px;
        }
        
        .why-join-box .label {
          margin-bottom: 12px;
          display: block;
        }
        
        .why-join-box .value {
          color: #4a5568;
          line-height: 1.8;
          font-size: 16px;
        }
        
        .resume-section {
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
          border: 2px solid #4caf50;
          border-radius: 8px;
          padding: 20px 25px;
          margin-top: 25px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .resume-icon {
          font-size: 32px;
          flex-shrink: 0;
        }
        
        .resume-info {
          flex: 1;
        }
        
        .resume-info .label {
          color: #2e7d32;
          margin-bottom: 5px;
        }
        
        .resume-info .value {
          color: #1b5e20;
          font-weight: 600;
        }
        
        .footer {
          background: #f8f9fa;
          padding: 30px 35px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
          color: #718096;
          font-size: 14px;
          margin: 8px 0;
          line-height: 1.5;
        }
        
        .badge {
          display: inline-block;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 15px;
        }
        
        /* Mobile Responsive Styles */
        @media only screen and (max-width: 768px) {
          body {
            padding: 10px 5px;
          }
          .email-wrapper { 
            border-radius: 8px;
            max-width: 100%;
          }
          .header {
            padding: 30px 20px;
          }
          .header-icon {
            font-size: 35px;
          }
          .header h1 {
            font-size: 24px;
          }
          .header p {
            font-size: 14px;
          }
          .content {
            padding: 30px 20px;
          }
          .greeting {
            font-size: 18px;
            margin-bottom: 15px;
          }
          .intro-text {
            font-size: 15px;
            margin-bottom: 25px;
          }
          .info-card {
            border-radius: 8px;
          }
          
          /* Stack cells on mobile */
          .info-table,
          .info-table tbody,
          .info-table tr,
          .info-table td {
            display: block;
            width: 100%;
          }
          
          .info-table td {
            border-right: none;
            border-bottom: 1px solid rgba(245, 87, 108, 0.3);
            padding: 18px 20px;
          }
          
          .info-table tr {
            border-bottom: none;
          }
          
          .info-table td:last-child {
            border-bottom: none;
          }
          
          .label {
            font-size: 12px;
          }
          .value {
            font-size: 15px;
          }
          .why-join-box {
            padding: 20px 15px;
            margin-top: 20px;
          }
          .why-join-box .value {
            font-size: 15px;
          }
          .resume-section {
            padding: 18px 15px;
            flex-direction: column;
            text-align: center;
          }
          .footer {
            padding: 25px 20px;
          }
          .footer p {
            font-size: 13px;
          }
          .badge {
            padding: 6px 16px;
            font-size: 11px;
          }
        }
        
        /* Extra Small Devices */
        @media only screen and (max-width: 480px) {
          body {
            padding: 5px;
          }
          .email-wrapper {
            border-radius: 0;
          }
          .header {
            padding: 25px 15px;
          }
          .header h1 {
            font-size: 22px;
          }
          .header p {
            font-size: 13px;
          }
          .content {
            padding: 25px 15px;
          }
          .greeting {
            font-size: 17px;
          }
          .intro-text {
            font-size: 14px;
          }
          .info-table td {
            padding: 15px;
          }
          .label {
            font-size: 11px;
          }
          .value {
            font-size: 14px;
          }
          .why-join-box {
            padding: 18px 12px;
          }
          .resume-section {
            padding: 15px 12px;
          }
          .footer {
            padding: 20px 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <!-- Header -->
        <div class="header">
          <div class="header-icon">💼</div>
          <h1>New Job Application</h1>
          <p>A candidate has applied for a position at PugArch</p>
        </div>
        
        <!-- Content -->
        <div class="content">
          <p class="greeting">Hello PugArch HR Team,</p>
          <p class="intro-text">
            You have received a new job application. Candidate details are provided below:
          </p>
          
          <!-- Candidate Information Card -->
          <div class="info-card">
            <table class="info-table" cellpadding="0" cellspacing="0">
              <tbody>
                <!-- Row 1: Candidate Name & Email -->
                <tr>
                  <td>
                    <span class="label">👤 CANDIDATE NAME</span>
                    <span class="value">${data.firstName} ${
    data.lastName
  }</span>
                  </td>
                  <td>
                    <span class="label">📧 EMAIL</span>
                    <span class="value"><a href="mailto:${data.email}">${
    data.email
  }</a></span>
                  </td>
                </tr>
                
                <!-- Row 2: Phone & LinkedIn -->
                <tr>
                  <td>
                    <span class="label">📱 PHONE NUMBER</span>
                    <span class="value">${data.phone || "Not provided"}</span>
                  </td>
                  <td>
                    <span class="label">💼 LINKEDIN</span>
                    <span class="value">${
                      data.linkedin
                        ? `<a href="${data.linkedin}" target="_blank">${data.linkedin}</a>`
                        : "Not provided"
                    }</span>
                  </td>
                </tr>
                
                <!-- Row 3: Role & Portfolio -->
                <tr>
                  <td>
                    <span class="label">🎯 ROLE/POSITION</span>
                    <span class="value">${data.role || "Not specified"}</span>
                  </td>
                  <td>
                    <span class="label">🌐 PORTFOLIO</span>
                    <span class="value">${
                      data.portfolio
                        ? `<a href="${data.portfolio}" target="_blank">${data.portfolio}</a>`
                        : "Not provided"
                    }</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Why Join Section -->
          ${
            data.whyJoin
              ? `
          <div class="why-join-box">
            <span class="label">💡 WHY JOIN PUGARCH</span>
            <div class="value">${data.whyJoin}</div>
          </div>
          `
              : ""
          }
          
          <!-- Resume Section -->
          ${
            data.resumeName
              ? `
          <div class="resume-section">
            <div class="resume-icon">📄</div>
            <div class="resume-info">
              <span class="label">RESUME ATTACHED</span>
              <span class="value">✅ ${data.resumeName}</span>
            </div>
          </div>
          `
              : `
          <div class="resume-section" style="background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%); border-color: #f44336;">
            <div class="resume-icon">⚠️</div>
            <div class="resume-info">
              <span class="label" style="color: #c62828;">RESUME NOT PROVIDED</span>
              <span class="value" style="color: #b71c1c;">❌ No resume attached</span>
            </div>
          </div>
          `
          }
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <span class="badge">Job Application</span>
          <p style="margin-top: 18px;">
            <strong>Received:</strong> ${new Date().toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
          <p style="margin-top: 12px; color: #a0aec0; font-size: 13px;">
            This email was sent from the PugArch careers form
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

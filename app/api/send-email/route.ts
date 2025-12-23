import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";
import type { EmailResponse } from "@/types/forms";

// Add this line to force dynamic rendering
export const dynamic = "force-dynamic";

interface EmailData {
  firstName: string;
  lastName: string;
  email: string;
  [key: string]: any;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<EmailResponse>> {
  try {
    const body = await request.json();
    const { formType, ...formData } = body as {
      formType: string;
      [key: string]: any;
    };

    let emailContent = "";
    let subject = "";

    switch (formType) {
      case "partnership":
        subject = `🤝 New Partnership Request - ${formData.firstName} ${formData.lastName}`;
        emailContent = generatePartnershipEmail(formData);
        break;

      case "service":
        subject = `🛠️ New Service Request - ${formData.firstName} ${formData.lastName}`;
        emailContent = generateServiceEmail(formData);
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid form type",
            error: "Invalid form type",
          },
          { status: 400 }
        );
    }

    await transporter.sendMail({
      from: `"PugArch Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: subject,
      html: emailContent,
      replyTo: formData.email,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: "Failed to send email",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

function generatePartnershipEmail(data: any): string {
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
          position: relative;
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
          background: linear-gradient(135deg, #f5f7fa 0%, #b8c6db 100%);
          border-radius: 12px;
          border: 1px solid rgba(102, 126, 234, 0.3);
          overflow: hidden;
          margin-bottom: 25px;
        }
        
        /* Table-like structure */
        .info-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .info-table tr {
          border-bottom: 1px solid rgba(102, 126, 234, 0.3);
        }
        
        .info-table tr:last-child {
          border-bottom: none;
        }
        
        .info-table td {
          width: 50%;
          padding: 22px 25px;
          border-right: 1px solid rgba(102, 126, 234, 0.3);
          vertical-align: top;
        }
        
        .info-table td:last-child {
          border-right: none;
        }
        
        .label { 
          font-weight: 600;
          color: #667eea;
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
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .value a:hover {
          color: #764ba2;
          text-decoration: underline;
        }
        
        .message-box {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 25px;
          border-radius: 8px;
          margin-top: 25px;
        }
        
        .message-box .label {
          margin-bottom: 12px;
          display: block;
        }
        
        .message-box .value {
          color: #4a5568;
          line-height: 1.8;
          font-size: 16px;
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            border-bottom: 1px solid rgba(102, 126, 234, 0.3);
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
          .message-box {
            padding: 20px 15px;
            margin-top: 20px;
          }
          .message-box .value {
            font-size: 15px;
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
          .message-box {
            padding: 18px 12px;
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
          <div class="header-icon">🤝</div>
          <h1>New Partnership Request</h1>
          <p>Someone is interested in collaborating with PugArch</p>
        </div>
        
        <!-- Content -->
        <div class="content">
          <p class="greeting">Hello PugArch Team,</p>
          <p class="intro-text">
            You have received a new partnership inquiry. Below are the details:
          </p>
          
          <!-- Contact Information Card -->
          <div class="info-card">
            <table class="info-table" cellpadding="0" cellspacing="0">
              <tbody>
                <!-- Row 1: Full Name & Email -->
                <tr>
                  <td>
                    <span class="label">👤 FULL NAME</span>
                    <span class="value">${data.firstName} ${data.lastName}</span>
                  </td>
                  <td>
                    <span class="label">📧 EMAIL</span>
                    <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
                  </td>
                </tr>
                
                <!-- Row 2: Company & Designation -->
                <tr>
                  <td>
                    <span class="label">🏢 COMPANY</span>
                    <span class="value">${data.company || "Not provided"}</span>
                  </td>
                  <td>
                    <span class="label">💼 DESIGNATION</span>
                    <span class="value">${data.designation || "Not provided"}</span>
                  </td>
                </tr>
                
                <!-- Row 3: Website & Industry -->
                <tr>
                  <td>
                    <span class="label">🌐 WEBSITE</span>
                    <span class="value">${
                      data.website
                        ? `<a href="${data.website}" target="_blank">${data.website}</a>`
                        : "Not provided"
                    }</span>
                  </td>
                  <td>
                    <span class="label">🏭 INDUSTRY</span>
                    <span class="value">${data.industry || "Not provided"}</span>
                  </td>
                </tr>
                
                <!-- Row 4: Collaboration Goal -->
                <tr>
                  <td>
                    <span class="label">🎯 COLLABORATION GOAL</span>
                    <span class="value">${data.goal || "Not specified"}</span>
                  </td>
                  <td>
                    <!-- Empty cell -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Message Section -->
          ${
            data.message
              ? `
          <div class="message-box">
            <span class="label">💬 MESSAGE</span>
            <div class="value">${data.message}</div>
          </div>
          `
              : ""
          }
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <span class="badge">Partnership Inquiry</span>
          <p style="margin-top: 18px;">
            <strong>Received:</strong> ${new Date().toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
          <p style="margin-top: 12px; color: #a0aec0; font-size: 13px;">
            This email was sent from the PugArch contact form
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// function generatePartnershipEmail(data: any): string {
//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { 
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//           line-height: 1.6; 
//           color: #333; 
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           padding: 20px 10px;
//           margin: 0;
//           width: 100%;
//           -webkit-text-size-adjust: 100%;
//           -ms-text-size-adjust: 100%;
//         }
//         .email-wrapper {
//           max-width: 900px;
//           margin: 0 auto;
//           background: #ffffff;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.1);
//         }
//        .header { 
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 40px 30px;
//   text-align: center;
//   position: relative;
// }

// .header-icon {
//    display: inline-block;
//   margin: 0 auto 15px;
//   font-size: 40px; /* Increased size since no circle constraint */
//   line-height: 1;
// }

//         .header h1 { 
//           color: white;
//           font-size: 32px;
//           font-weight: 600;
//           margin: 0;
//           letter-spacing: -0.5px;
//         }
//         .header p {
//           color: rgba(255,255,255,0.9);
//           font-size: 16px;
//           margin-top: 10px;
//         }
//         .content { 
//           padding: 20px 15px;
//           background: #ffffff;
//         }
//         .greeting {
//           font-size: 20px;
//           color: #333;
//           margin-bottom: 20px;
//           font-weight: 500;
//         }
//         .intro-text {
//           color: #4a5568;
//           margin-bottom: 30px;
//           font-size: 16px;
//           line-height: 1.6;
//         }
//         .info-card {
//           background: linear-gradient(135deg, #f5f7fa 0%, #b8c6db 100%);
//           border-radius: 12px;
//           padding: 20px 25px;
//           margin-bottom: 25px;
//         }
//         .field { 
//           margin-bottom: 10px;
//           padding: 16px 0;
//           border-bottom: 1px solid rgba(0,0,0,0.06);
//           display: flex;
//           align-items: flex-start;
//           gap: 15px;
//         }
//         .field:last-child { 
//           border-bottom: none; 
//           margin-bottom: 0;
//         }
//         .label { 
//           font-weight: 600;
//           color: #667eea;
//           min-width: 180px;
//           font-size: 14px;
//           text-transform: uppercase;
//           letter-spacing: 0.8px;
//           padding-top: 2px;
//           flex-shrink: 0;
//         }
//         .value { 
//           color: #2d3748;
//           font-size: 16px;
//           line-height: 1.6;
//           flex: 1;
//           word-break: break-word;
//           overflow-wrap: break-word;
//         }
//         .value a {
//           color: #667eea;
//           text-decoration: none;
//           font-weight: 500;
//           transition: color 0.3s ease;
//           word-break: break-all;
//         }
//         .value a:hover {
//           color: #764ba2;
//           text-decoration: underline;
//         }
//         .message-box {
//           background: #f8f9fa;
//           border-left: 4px solid #667eea;
//           padding: 25px;
//           border-radius: 8px;
//           margin-top: 25px;
//         }
//         .message-box .label {
//           margin-bottom: 12px;
//           display: block;
//           min-width: auto;
//         }
//         .message-box .value {
//           color: #4a5568;
//           line-height: 1.8;
//           font-size: 16px;
//         }
//         .footer {
//           background: #f8f9fa;
//           padding: 30px 35px;
//           text-align: center;
//           border-top: 1px solid #e2e8f0;
//         }
//         .footer p {
//           color: #718096;
//           font-size: 14px;
//           margin: 8px 0;
//           line-height: 1.5;
//         }
//         .badge {
//           display: inline-block;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           padding: 8px 20px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-top: 15px;
//         }
        
//         /* Mobile Responsive Styles */
//         @media only screen and (max-width: 768px) {
//           body {
//             padding: 10px 5px;
//           }
//           .email-wrapper { 
//             border-radius: 8px;
//             max-width: 100%;
//           }
//           .header {
//             padding: 30px 20px;
//           }
//           .header-icon {
//             width: 80px;
//             height: 80px;
//             font-size: 40px;
//           }
//           .header h1 {
//             font-size: 24px;
//           }
//           .header p {
//             font-size: 14px;
//           }
//           .content {
//             padding: 30px 20px;
//           }
//           .greeting {
//             font-size: 18px;
//             margin-bottom: 15px;
//           }
//           .intro-text {
//             font-size: 15px;
//             margin-bottom: 25px;
//           }
//           .info-card {
//             padding: 20px 15px;
//             border-radius: 8px;
//           }
//           .field {
//             flex-direction: column;
//             gap: 8px;
//             padding: 14px 0;
//             margin-bottom: 16px;
//           }
//           .label {
//             min-width: auto;
//             font-size: 13px;
//             margin-bottom: 5px;
//           }
//           .value {
//             font-size: 15px;
//           }
//           .message-box {
//             padding: 20px 15px;
//             margin-top: 20px;
//           }
//           .message-box .value {
//             font-size: 15px;
//           }
//           .footer {
//             padding: 25px 20px;
//           }
//           .footer p {
//             font-size: 13px;
//           }
//           .badge {
//             padding: 6px 16px;
//             font-size: 11px;
//           }
//         }
        
//         /* Extra Small Devices */
//         @media only screen and (max-width: 480px) {
//           body {
//             padding: 5px;
//           }
//           .email-wrapper {
//             border-radius: 0;
//           }
//           .header {
//             padding: 25px 15px;
//           }
//           .header h1 {
//             font-size: 22px;
//           }
//           .header p {
//             font-size: 13px;
//           }
//           .content {
//             padding: 25px 15px;
//           }
//           .greeting {
//             font-size: 17px;
//           }
//           .intro-text {
//             font-size: 14px;
//           }
//           .info-card {
//             padding: 18px 12px;
//           }
//           .label {
//             font-size: 12px;
//           }
//           .value {
//             font-size: 14px;
//           }
//           .message-box {
//             padding: 18px 12px;
//           }
//           .footer {
//             padding: 20px 15px;
//           }
//         }
        
//         /* Dark Mode Support */
//         @media (prefers-color-scheme: dark) {
//           .email-wrapper {
//             box-shadow: 0 10px 40px rgba(0,0,0,0.3);
//           }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="email-wrapper">
//         <!-- Header -->
//         <div class="header">
//           <div class="header-icon">🤝</div>
//           <h1>New Partnership Request</h1>
//           <p>Someone is interested in collaborating with PugArch</p>
//         </div>
        
//         <!-- Content -->
//         <div class="content">
//           <p class="greeting">Hello PugArch Team,</p>
//           <p class="intro-text">
//             You have received a new partnership inquiry. Below are the details:
//           </p>
          
//           <!-- Contact Information Card -->
//           <div class="info-card">
//             <div class="field">
//               <span class="label">👤 Full Name :</span>
//               <span class="value">${data.firstName} ${data.lastName}</span>
//             </div>
//             <div class="field">
//               <span class="label">📧 Email :</span>
//               <span class="value"><a href="mailto:${data.email}">${
//     data.email
//   }</a></span>
//             </div>
//             <div class="field">
//               <span class="label">🏢 Company :</span>
//               <span class="value">${data.company || "Not provided"}</span>
//             </div>
//             <div class="field">
//               <span class="label">💼 Designation :</span>
//               <span class="value">${data.designation || "Not provided"}</span>
//             </div>
//             <div class="field">
//               <span class="label">🌐 Website :</span>
//               <span class="value">${
//                 data.website
//                   ? `<a href="${data.website}" target="_blank">${data.website}</a>`
//                   : "Not provided"
//               }</span>
//             </div>
//             <div class="field">
//               <span class="label">🏭 Industry :</span>
//               <span class="value">${data.industry || "Not provided"}</span>
//             </div>
//             <div class="field">
//               <span class="label">🎯 Goal :</span>
//               <span class="value">${data.goal || "Not specified"}</span>
//             </div>
//           </div>
          
//           <!-- Message Section -->
//           ${
//             data.message
//               ? `
//           <div class="message-box">
//             <span class="label">💬 Message</span>
//             <div class="value">${data.message}</div>
//           </div>
//           `
//               : ""
//           }
//         </div>
        
//         <!-- Footer -->
//         <div class="footer">
//           <span class="badge">Partnership Inquiry</span>
//           <p style="margin-top: 18px;">
//             <strong>Received:</strong> ${new Date().toLocaleString("en-US", {
//               dateStyle: "full",
//               timeStyle: "short",
//             })}
//           </p>
//           <p style="margin-top: 12px; color: #a0aec0; font-size: 13px;">
//             This email was sent from the PugArch contact form
//           </p>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// }

function generateServiceEmail(data: any): string {
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
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
          background: linear-gradient(90deg, #38ef7d 0%, #11998e 100%);
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
          background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
          border-radius: 12px;
          border: 1px solid rgba(17, 153, 142, 0.3);
          overflow: hidden;
          margin-bottom: 25px;
        }
        
        /* Table-like structure */
        .info-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .info-table tr {
          border-bottom: 1px solid rgba(17, 153, 142, 0.3);
        }
        
        .info-table tr:last-child {
          border-bottom: none;
        }
        
        .info-table td {
          width: 50%;
          padding: 22px 25px;
          border-right: 1px solid rgba(17, 153, 142, 0.3);
          vertical-align: top;
        }
        
        .info-table td:last-child {
          border-right: none;
        }
        
        .label { 
          font-weight: 600;
          color: #11998e;
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
          color: #11998e;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .value a:hover {
          color: #38ef7d;
          text-decoration: underline;
        }
        
        .project-brief-box {
          background: #f8f9fa;
          border-left: 4px solid #11998e;
          padding: 25px;
          border-radius: 8px;
          margin-top: 25px;
        }
        
        .project-brief-box .label {
          margin-bottom: 12px;
          display: block;
        }
        
        .project-brief-box .value {
          color: #4a5568;
          line-height: 1.8;
          font-size: 16px;
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
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
            border-bottom: 1px solid rgba(17, 153, 142, 0.3);
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
          .project-brief-box {
            padding: 20px 15px;
            margin-top: 20px;
          }
          .project-brief-box .value {
            font-size: 15px;
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
          .project-brief-box {
            padding: 18px 12px;
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
          <div class="header-icon">🛠️</div>
          <h1>New Service Request</h1>
          <p>A potential client wants to work with PugArch</p>
        </div>
        
        <!-- Content -->
        <div class="content">
          <p class="greeting">Hello PugArch Team,</p>
          <p class="intro-text">
            You have received a new service request. Client details are provided below:
          </p>
          
          <!-- Contact Information Card -->
          <div class="info-card">
            <table class="info-table" cellpadding="0" cellspacing="0">
              <tbody>
                <!-- Row 1: Client Name & Email -->
                <tr>
                  <td>
                    <span class="label">👤 CLIENT NAME</span>
                    <span class="value">${data.firstName} ${data.lastName}</span>
                  </td>
                  <td>
                    <span class="label">📧 EMAIL</span>
                    <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
                  </td>
                </tr>
                
                <!-- Row 2: Contact & Organization -->
                <tr>
                  <td>
                    <span class="label">📱 CONTACT NUMBER</span>
                    <span class="value">${data.contact || "Not provided"}</span>
                  </td>
                  <td>
                    <span class="label">🏢 ORGANIZATION</span>
                    <span class="value">${data.organization || "Not provided"}</span>
                  </td>
                </tr>
                
                <!-- Row 3: Service Type -->
                <tr>
                  <td>
                    <span class="label">⚙️ SERVICE TYPE</span>
                    <span class="value">${data.serviceType || "Not specified"}</span>
                  </td>
                  <td>
                    <!-- Empty cell -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Project Brief Section -->
          ${
            data.projectBrief
              ? `
          <div class="project-brief-box">
            <span class="label">📋 PROJECT BRIEF</span>
            <div class="value">${data.projectBrief}</div>
          </div>
          `
              : ""
          }
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <span class="badge">Service Request</span>
          <p style="margin-top: 18px;">
            <strong>Received:</strong> ${new Date().toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
          <p style="margin-top: 12px; color: #a0aec0; font-size: 13px;">
            This email was sent from the PugArch contact form
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

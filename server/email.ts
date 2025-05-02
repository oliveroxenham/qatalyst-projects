'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const getResendClient = async () => {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('RESEND_API_KEY is not defined in environment variables');
    return null;
  }
  
  return new Resend(apiKey);
};

// Email schema validation
const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
  requirements: z.string().optional(),
  collaborators: z.array(z.string()).optional(),
  newCollaborator: z.string().email().optional().or(z.literal('')),
});

type EmailData = z.infer<typeof emailSchema>;

/**
 * Send an invitation email to a project developer using Resend
 */
export async function sendInvitationEmail(data: EmailData) {
  try {
    // Validate the data
    const validatedData = emailSchema.parse(data);
    
    // Get the Resend client
    const resend = await getResendClient();
    
    // Check if we have a valid Resend client
    if (!resend) {
      return {
        success: false,
        message: 'Email service not configured properly. Please check server logs.',
      };
    }
    
    // Send the email using Resend
    let resendResponse;
    try {
      resendResponse = await resend.emails.send({
      from: 'Qatalyst <invites@qatalyst.ai>',
      to: validatedData.to,
      subject: validatedData.subject,
      html: validatedData.html,
      text: `You've been invited to join Qatalyst! Visit: https://qatalyst-carbon-estimator-chat.vercel.app/`,
      // Adding some metadata for tracking
      tags: [
        {
          name: 'category',
          value: 'invitation',
        },
      ],
    });
    } catch (apiError) {
      console.error('Resend API error:', apiError);
      return {
        success: false,
        message: apiError instanceof Error ? apiError.message : 'Failed to send email through Resend',
      };
    }

    // Destructure the response
    const { data: resendData, error } = resendResponse;

    // Check if there was an error from Resend
    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        message: error.message || 'Failed to send email through Resend',
      };
    }
    
    // Log the successful email ID (for demonstration purposes)
    console.log('Email sent successfully! ID:', resendData?.id);
    
    // Return success response
    return { 
      success: true, 
      message: 'Invitation sent successfully!',
      emailId: resendData?.id
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Invalid email data',
        errors: error.errors,
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send invitation email',
    };
  }
}

/**
 * Generate the HTML content for the invitation email
 */
export async function generateInvitationEmailHtml(
  requirements: string = '',
  collaborators: string[] = []
): Promise<string> {
  const inviteLink = 'https://qatalyst-carbon-estimator-chat.vercel.app/';
  
  let collaboratorsHtml = '';
  if (collaborators.length > 0) {
    collaboratorsHtml = `
      <p style="margin-bottom: 15px;">You'll be collaborating with:</p>
      <ul style="margin-bottom: 20px; padding-left: 20px;">
        ${collaborators.map(name => `<li>${name}</li>`).join('')}
      </ul>
    `;
  }
  
  let requirementsHtml = '';
  if (requirements) {
    requirementsHtml = `
      <p style="margin-bottom: 15px;"><strong>Project Requirements:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        ${requirements.replace(/\n/g, '<br>')}
      </div>
    `;
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invitation to Qatalyst Carbon Project</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          max-width: 150px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #00938C;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://qatalyst-demo.vercel.app/icons/logo.svg" alt="Qatalyst Logo" class="logo">
          <h1>You've Been Invited to Create a Carbon Project</h1>
        </div>
        
        <p>Hello,</p>
        
        <p>You've been invited to create a carbon project on the Qatalyst platform. We'd like to learn more about your project and how we can support you in achieving your carbon credit goals.</p>
        
        ${requirementsHtml}
        
        ${collaboratorsHtml}
        
        <p style="margin-bottom: 25px;">To get started, please click the button below to access our carbon estimator tool:</p>
        
        <div style="text-align: center;">
          <a href="${inviteLink}" class="button">Create Your Project</a>
        </div>
        
        <p>If you have any questions, please don't hesitate to reach out to our team.</p>
        
        <p>Best regards,<br>The Qatalyst Team</p>
        
        <div class="footer">
          <p>This email was sent by Qatalyst. Please do not reply to this email.</p>
          <p>&copy; ${new Date().getFullYear()} Qatalyst. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
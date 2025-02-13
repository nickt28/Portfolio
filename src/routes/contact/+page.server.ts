export const prerender = false;

import type { Actions } from './$types';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { EMAIL_API_KEY, EMAIL_FROM, EMAIL_TO } from '$env/static/private';

export const actions = {
	default: async ({request}: RequestEvent) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const subject = data.get('subject')?.toString();
    const message = data.get('message')?.toString();

    if (!email || !subject || !message) {
      return fail(400, { success: false, message: 'Missing required fields' });
    }

    try {
      const response = await sendSupportEmail(email, subject, message);
      
      if (!response.ok) {
        return fail(500, { success: false, message: 'Failed to send email' });
      }

      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return fail(500, { success: false, message: 'Server error' });
    }
	}
} satisfies Actions;

async function sendSupportEmail(email: string, subject: string, message: string) {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Contact</title>
        <style>
            body {
            margin: 0;
            padding: 40px 0;
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
            }
            .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            }
            .content {
            padding: 20px 40px;
            }
            .email-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
            }
            .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            color: #999;
            font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <h1 style="color: #333; font-size: 20px; text-align: center;">${subject}</h1>
                <div class="email-box">
                    <strong style="color: #333;">Email:</strong> ${email}
                </div>
                <p style="color: #666; line-height: 1.6;">${message}</p>
            </div>
            <div class="footer">
                Message from Portfolio Contact
            </div>
        </div>
    </body>
    </html>
  `;

  const emailData = {
    from: { address: EMAIL_FROM, name: 'Portfolio Contact' },
    to: [{ email_address: { address: EMAIL_TO } }],
    subject: `Portfolio Contact - ${subject}`,
    htmlbody: htmlContent
  };

  const response = await fetch('https://api.zeptomail.com.au/v1.1/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Zoho-enczapikey ${EMAIL_API_KEY}`
    },
    body: JSON.stringify(emailData)
  });

  return response;
}
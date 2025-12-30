import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const body = await request.json();
        console.log('Received form data:', body);

        // Simple validation
        if (!body.firstName || !body.lastName || !body.email || !body.message) {
            return NextResponse.json(
                { success: false, error: 'All required fields must be filled' },
                { status: 400 }
            );
        }

        // IMPORTANT: Log what credentials we're using (remove in production)
        console.log('SMTP Configuration Check:', {
            user: process.env.SMTP_USER ? 'Set (first 3 chars): ' + process.env.SMTP_USER.substring(0, 3) + '...' : 'NOT SET',
            host: process.env.SMTP_HOST || 'Not set, using default',
            port: process.env.SMTP_PORT || 'Not set',
            to: process.env.SMTP_TO || 'Not set'
        });

        // Try multiple configurations
        const configs = [
            {
                name: 'Namecheap Port 587 (TLS)',
                host: process.env.SMTP_HOST || 'mail.privateemail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                    ciphers: 'SSLv3'
                }
            },
            {
                name: 'Namecheap Port 465 (SSL)',
                host: process.env.SMTP_HOST || 'mail.privateemail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false
                }
            },
            {
                name: 'Alternative Port 2525',
                host: process.env.SMTP_HOST || 'mail.privateemail.com',
                port: 2525,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                }
            },
            // Try Google's SMTP as fallback (if you have Gmail)
            process.env.GMAIL_USER && {
                name: 'Gmail SMTP',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
                }
            }
        ].filter(Boolean); // Remove null entries

        let transporter;
        let successfulConfig = null;
        let lastError = null;

        // Test each configuration
        for (const config of configs) {
            console.log(`Testing ${config.name}...`);

            try {
                transporter = nodemailer.createTransport(config);

                // Test connection
                await transporter.verify();
                console.log(`✅ ${config.name} - Connection successful`);
                successfulConfig = config;
                break;
            } catch (error) {
                console.log(`❌ ${config.name} - Failed:`, error.message);
                lastError = error;
                continue;
            }
        }

        if (!transporter || !successfulConfig) {
            console.log('All SMTP configurations failed');
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email service configuration failed',
                    debug: {
                        message: lastError?.message,
                        suggestion: 'Check your SMTP credentials and ensure the email account exists'
                    }
                },
                { status: 500 }
            );
        }

        console.log(`Using configuration: ${successfulConfig.name}`);

        // Prepare email content
        const mailOptions = {
            from: `"${body.firstName} ${body.lastName}" <${process.env.SMTP_USER || 'noreply@yourdomain.com'}>`,
            to: process.env.SMTP_TO || process.env.SMTP_USER,
            replyTo: body.email,
            subject: `New Contact Form: ${body.firstName} ${body.lastName}`,
            text: `
New Contact Form Submission
============================

Name: ${body.firstName} ${body.lastName}
Email: ${body.email}
Company: ${body.company || 'Not provided'}

Message:
${body.message}

---
Sent via website contact form
      `,
            html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #b08d57 0%, #d4af37 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h2 style="margin: 0;">New Contact Form Submission</h2>
  </div>
  <div style="padding: 20px; background: #f9f9f9; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
    <div style="margin-bottom: 15px;">
      <strong>From:</strong> ${body.firstName} ${body.lastName}
    </div>
    <div style="margin-bottom: 15px;">
      <strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a>
    </div>
    ${body.company ? `<div style="margin-bottom: 15px;"><strong>Company:</strong> ${body.company}</div>` : ''}
    <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 5px;">
      <strong>Message:</strong>
      <div style="white-space: pre-line; margin-top: 10px;">${body.message}</div>
    </div>
    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
      Sent from website contact form at ${new Date().toLocaleString()}
    </div>
  </div>
</div>
      `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        return NextResponse.json({
            success: true,
            message: 'Message sent successfully!',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Final error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Unable to send message',
                debug: {
                    error: error.message,
                    code: error.code,
                    step: 'Please verify your email credentials in .env.local'
                }
            },
            { status: 500 }
        );
    }
}
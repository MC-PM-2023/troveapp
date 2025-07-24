import nodemailer from 'nodemailer';
import {Verification_Email_Template} from './emailtemplate.js'
export async function sendOTPEmail(email, otp) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.datasolve-analytics.com',
            port: 587,
            secure: false, // TLS (false for STARTTLS)
            auth: {
                user: process.env.WEBMAIL_USER,
                pass: process.env.WEBMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false, // Disable hostname verification
            },
        });
        

        const mailOptions = {
            from: `"Datasolve Analytics" <${process.env.WEBMAIL_USER}>`, // Add a friendly name
            to: email,
            subject: 'Email Verification OTP for Datasolve Analytics Troveapp!',
            text: `Your OTP for email verification is: ${otp}`,
            html: Verification_Email_Template.replace("{verificationCode}",otp)
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error("Error sending OTP email:", error.message);
        throw new Error("Failed to send OTP email. Please try again later.");
    }
}

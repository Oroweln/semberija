/**
 * Server-side configuration for email sending
 *
 * EDIT THIS FILE with your SMTP credentials BEFORE building for production.
 * This file is only imported on the server side, never in the browser.
 *
 * IMPORTANT: Do NOT commit this file with real passwords to Git!
 * Keep a backup of your credentials somewhere safe.
 */

export const emailConfig = {
    smtp: {
        // SMTP server hostname
        host: '',  // ← EDIT: e.g., 'smtp.gmail.com', 'smtp.office365.com', 'mail.yourdomain.com'

        // SMTP port (587 for TLS, 465 for SSL)
        port: 465,  // ← EDIT if needed

        // Use SSL/TLS (true for port 465, false for port 587)
        secure: true,  // ← EDIT if using port 465

        // Optional: service name shortcut (gmail, outlook, etc.) - leave undefined if using custom host
        service: undefined,  // ← EDIT: Set to 'gmail' for Gmail (removes need for host/port)

        auth: {
            // SMTP username (usually your email address)
            user: '',  // ← EDIT: Your SMTP username

            // SMTP password
            pass: ''  // ← EDIT: Your SMTP password (use App Password for Gmail)
        }
    },

    // Sender email address
    from: '',  // ← EDIT if needed

    // Recipient email address (where service requests are sent)
    to: ''  // ← EDIT if needed
};

/**
 * COMMON CONFIGURATIONS:
 *
 * Gmail:
 *   host: (remove or set to undefined)
 *   port: (remove or set to undefined)
 *   service: 'gmail'
 *   user: 'your-email@gmail.com'
 *   pass: 'your-16-char-app-password'  // Get from: https://myaccount.google.com/apppasswords
 *
 * Outlook/Office365:
 *   host: 'smtp.office365.com'
 *   port: 587
 *   secure: false
 *   user: 'your-email@outlook.com'
 *   pass: 'your-password'
 *
 * Custom Domain:
 *   Contact your hosting provider for SMTP details.
 */

// Validate configuration
export function validateEmailConfig() {
    if (!emailConfig.smtp.auth.user || emailConfig.smtp.auth.user === 'your-email@example.com') {
        throw new Error('Email configuration is missing. Please edit src/lib/config.server.js with your SMTP credentials.');
    }
    if (!emailConfig.smtp.auth.pass || emailConfig.smtp.auth.pass === 'your-password') {
        throw new Error('SMTP password is missing. Please edit src/lib/config.server.js with your SMTP credentials.');
    }
    return true;
}
// Server-only: sends enquiry form submissions by email (nodemailer + src/lib/config.server.js).
// When SMTP isn't configured, actions return a 503 so the page can show an honest
// "not sent" message with a direct email link instead of a fake success.
import nodemailer from 'nodemailer';
import { fail } from '@sveltejs/kit';
import { emailConfig } from '$lib/config.server.js';

export const FALLBACK_EMAIL = 'info@zoemilano.com';

export function mailConfigured() {
	const { smtp, to } = emailConfig;
	return !!((smtp.host || smtp.service) && smtp.auth.user && smtp.auth.pass && to);
}

// Field labels for the email body (Serbian; the team reads these).
const LABELS: Record<string, string> = {
	type: 'Vrsta upita',
	topic: 'Tema',
	company: 'Kompanija',
	role: 'Funkcija',
	industry: 'Djelatnost',
	location: 'Lokacija',
	website: 'Web stranica',
	phone: 'Telefon',
	products: 'Proizvodi i usluge',
	offers: 'Poslovna ponuda',
	interests: 'Partnerski interesi',
	markets: 'Ciljna tržišta',
	name: 'Ime i prezime',
	email: 'Email',
	message: 'Poruka'
};

const MAX = 5000;
const clean = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim().slice(0, MAX) : '');

/**
 * Validate and send a form submission. Returns an action result:
 * { sent: true } on success, or fail(400 | 503 | 500, { error }) otherwise.
 */
export async function handleEnquiry(request: Request, subjectPrefix: string) {
	const form = await request.formData();

	// Honeypot: real visitors never fill this hidden field
	if (clean(form.get('website_hp'))) return { sent: true };

	const fields: Record<string, string> = {};
	for (const key of Object.keys(LABELS)) {
		const v = clean(form.get(key));
		if (v) fields[key] = v;
	}

	if (!fields.name || !fields.email || !fields.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
		return fail(400, { error: 'invalid' as const });
	}

	if (!mailConfigured()) {
		console.warn('[enquiry] SMTP not configured — submission not sent. Fill in src/lib/config.server.js');
		return fail(503, { error: 'not-configured' as const });
	}

	const body = Object.entries(fields)
		.map(([k, v]) => `${LABELS[k]}:\n${v}`)
		.join('\n\n');

	try {
		const transporter = nodemailer.createTransport({
			host: emailConfig.smtp.host || undefined,
			port: emailConfig.smtp.port,
			secure: emailConfig.smtp.secure,
			service: emailConfig.smtp.service,
			auth: emailConfig.smtp.auth
		});
		await transporter.sendMail({
			from: emailConfig.from || emailConfig.smtp.auth.user,
			to: emailConfig.to,
			replyTo: fields.email,
			subject: `[Semberija.app] ${subjectPrefix}${fields.company ? ' — ' + fields.company : ''}`,
			text: body
		});
		return { sent: true };
	} catch (err) {
		console.error('[enquiry] sending failed:', err);
		return fail(500, { error: 'send-failed' as const });
	}
}

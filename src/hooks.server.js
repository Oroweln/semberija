/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);

	// HTTP Strict Transport Security
	// Tells browsers to always use HTTPS for 1 year, including subdomains
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains'
	);

	// X-Frame-Options — prevents clickjacking by disallowing framing from other origins
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');

	// X-Content-Type-Options — prevents MIME-type sniffing
	response.headers.set('X-Content-Type-Options', 'nosniff');

	// Referrer-Policy — controls how much referrer info is sent with requests
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	// Permissions-Policy — restricts browser features not needed by this site
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
	);

	// Content-Security-Policy
	// - default-src 'self': only load resources from the same origin by default
	// - script-src 'self' 'unsafe-inline': SvelteKit requires inline scripts for hydration
	// - style-src 'self' 'unsafe-inline' fonts.googleapis.com: inline styles + Google Fonts CSS
	// - font-src 'self' fonts.gstatic.com: Google Fonts binary files
	// - img-src 'self' data:: allow same-origin images and inline data URIs
	// - connect-src 'self': API calls only to same origin
	// - frame-ancestors 'self': consistent with X-Frame-Options SAMEORIGIN
	response.headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline'",
			"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
			"font-src 'self' https://fonts.gstatic.com",
			"img-src 'self' data:",
			"connect-src 'self'",
			"frame-ancestors 'self'"
		].join('; ')
	);

	return response;
}
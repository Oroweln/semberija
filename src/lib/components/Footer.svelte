<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import faviconUrl from '$lib/assets/favicon.svg';

	// Screen-reader label for the icon-only "back to top" button
	const toTopLabel: Record<string, string> = {
		sr: 'Nazad na vrh',
		en: 'Back to top',
		it: 'Torna su',
		ru: 'Наверх',
		de: 'Nach oben'
	};

	function toTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="footer">
	<div class="footer-glow" aria-hidden="true"></div>

	<div class="footer-inner">
		<div class="footer-brand">
			<a href="/" class="footer-logo">
				<img src={faviconUrl} alt="Semberija.app" class="footer-logo-icon" />
				<img src="/Semberija%20app.png" alt="Semberija.app" class="footer-logo-wordmark" />
			</a>
			<p class="footer-tagline">{i18n.t.footer.tagline}</p>
			<p class="footer-desc">{i18n.t.footer.desc}</p>
			<div class="footer-socials">
				<a href="mailto:{i18n.t.footer.email}" class="social-link" aria-label="Email">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
						<polyline points="22,6 12,13 2,6"/>
					</svg>
				</a>
				<a href="https://linkedin.com" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
						<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
						<circle cx="4" cy="4" r="2"/>
					</svg>
				</a>
			</div>
		</div>

		<div class="footer-col">
			<h4>{i18n.t.footer.colPlatform}</h4>
			<nav class="footer-nav">
				<a href="/platforma">{i18n.t.nav.platformOverview}</a>
				<a href="/firme">{i18n.t.nav.companies}</a>
				<a href="/investicije">{i18n.t.nav.investments}</a>
				<a href="/b2b">{i18n.t.nav.diaspora}</a>
				<a href="/usluge">{i18n.t.nav.services}</a>
				<a href="/vijesti">{i18n.t.nav.news}</a>
				<a href="/dogadjaji">{i18n.t.nav.events}</a>
				<a href="/o-nama">{i18n.t.nav.about}</a>
			</nav>
		</div>

		<div class="footer-col">
			<h4>{i18n.t.footer.colContact}</h4>
			<div class="footer-contact">
				<p class="contact-item">
					<span class="contact-icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
					</span>
					<span>{i18n.t.footer.address}</span>
				</p>
				<a href="mailto:{i18n.t.footer.email}" class="contact-item">
					<span class="contact-icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					</span>
					<span>{i18n.t.footer.email}</span>
				</a>
				<a href="/kontakt?tip=registracija" class="footer-cta">
					{i18n.t.nav.listCta}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
				</a>
			</div>
		</div>
	</div>

	<div class="footer-bottom">
		<span>{i18n.t.legal.copyright}</span>
		<div class="footer-legal">
			<a href="/legal/privacy">{i18n.t.legal.privacy}</a>
			<a href="/legal/terms">{i18n.t.legal.terms}</a>
			<a href="/legal/cookies">{i18n.t.legal.cookies}</a>
			<a href="/legal/gdpr">{i18n.t.legal.gdpr}</a>
			<a href="/legal/disclaimer">{i18n.t.legal.disclaimer}</a>
		</div>
		<div class="footer-end">
			<span class="footer-made">Made in Bijeljina.</span>
			<button class="to-top" onclick={toTop} aria-label={toTopLabel[i18n.lang] ?? toTopLabel.en}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
			</button>
		</div>
	</div>

	<!-- Independent platform statement -->
	<p class="footer-statement">{i18n.t.legal.statement}</p>
</footer>

<style>
	.footer {
		position: relative;
		overflow: hidden;
		margin-top: 2rem;
		background: linear-gradient(180deg, #3a4148 0%, #343A40 35%, #2b3035 100%);
		color: rgba(250,249,246,0.85);
		font-family: var(--font-sans);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
	}

	/* Thin red accent line along the top edge */
	.footer::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent 0%, var(--cta) 20%, #c42a38 50%, var(--cta) 80%, transparent 100%);
	}

	/* Soft light behind the brand column */
	.footer-glow {
		position: absolute;
		top: -180px;
		left: -120px;
		width: 620px;
		height: 520px;
		background: radial-gradient(ellipse at center, rgba(250,249,246,0.07) 0%, transparent 65%);
		pointer-events: none;
	}

	.footer-inner {
		position: relative;
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 4.5rem 1.5rem 3rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	/* Logo icon stacked above the wordmark */
	.footer-logo {
		text-decoration: none;
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.75rem;
		transition: opacity 0.2s, transform 0.3s ease;
	}

	.footer-logo:hover { transform: translateY(-2px); }

	.footer-logo-icon {
		height: 110px;
		width: auto;
		display: block;
		filter: drop-shadow(0 8px 18px rgba(0,0,0,0.45));
	}

	.footer-logo-wordmark {
		height: 36px;
		width: auto;
		display: block;
	}

	.footer-tagline {
		font-family: var(--font-heading);
		font-size: 22px;
		color: #FAF9F6;
		margin-bottom: 0.75rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.35;
	}

	.footer-desc {
		font-size: 18px;
		line-height: 1.65;
		max-width: 440px;
		margin-bottom: 2rem;
		color: rgba(250,249,246,0.78);
	}

	.footer-socials {
		display: flex;
		gap: 0.75rem;
	}

	.social-link {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: rgba(250,249,246,0.06);
		border: 1px solid rgba(250,249,246,0.22);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FAF9F6;
		text-decoration: none;
		transition: background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
	}

	.social-link:hover {
		background: var(--cta);
		border-color: var(--cta);
		transform: translateY(-3px);
		box-shadow: 0 10px 20px -8px rgba(155,17,30,0.6);
	}

	/* Column headings with a short red underline */
	.footer-col h4 {
		position: relative;
		font-family: var(--font-sans);
		font-size: 16px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #FAF9F6;
		padding-bottom: 0.9rem;
		margin-bottom: 1.5rem;
	}

	.footer-col h4::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 32px;
		height: 3px;
		border-radius: 2px;
		background: linear-gradient(90deg, #c42a38, #e0414f);
	}

	.footer-nav {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	/* Links slide right and reveal an arrow on hover */
	.footer-nav a {
		position: relative;
		align-self: flex-start;
		font-size: 19px;
		color: rgba(250,249,246,0.82);
		text-decoration: none;
		transition: color 0.2s, transform 0.25s ease;
	}

	.footer-nav a::before {
		content: '→';
		position: absolute;
		left: -1.3rem;
		opacity: 0;
		color: var(--cta);
		transition: opacity 0.25s ease;
	}

	.footer-nav a:hover {
		color: #FAF9F6;
		transform: translateX(1.3rem);
	}

	.footer-nav a:hover::before { opacity: 1; }

	.footer-contact {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-item {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
		font-size: 19px;
		line-height: 1.5;
		color: rgba(250,249,246,0.82);
		text-decoration: none;
		transition: color 0.2s;
	}

	a.contact-item:hover { color: #FAF9F6; }

	.contact-icon {
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FAF9F6;
		background: rgba(250,249,246,0.07);
		border: 1px solid rgba(250,249,246,0.14);
		transition: background 0.25s, border-color 0.25s;
	}

	a.contact-item:hover .contact-icon {
		background: var(--cta);
		border-color: var(--cta);
	}

	.contact-item > span:last-child { padding-top: 0.3rem; }

	.footer-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		align-self: flex-start;
		margin-top: 1rem;
		font-size: 17px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--cta-text);
		background: var(--cta);
		text-decoration: none;
		padding: 0.95rem 1.6rem;
		border-radius: 10px;
		box-shadow: 0 10px 24px -8px rgba(155,17,30,0.6), inset 0 1px 0 rgba(255,255,255,0.18);
		transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
	}

	.footer-cta svg { transition: transform 0.2s; }

	.footer-cta:hover {
		background: var(--cta-hover);
		transform: translateY(-2px);
		box-shadow: 0 16px 32px -10px rgba(155,17,30,0.65), inset 0 1px 0 rgba(255,255,255,0.18);
	}

	.footer-cta:hover svg { transform: translateX(3px); }

	.footer-bottom {
		position: relative;
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 1.75rem 1.5rem 2rem;
		border-top: 1px solid rgba(250,249,246,0.12);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		text-align: center;
		font-size: 16px;
		color: rgba(250,249,246,0.68);
	}

	.footer-legal {
		display: flex;
		gap: 0.5rem 1.6rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.footer-legal a {
		font-size: 16px;
		color: rgba(250,249,246,0.68);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-legal a:hover { color: #FAF9F6; text-decoration: underline; text-underline-offset: 4px; }

	.footer-end {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.footer-made { font-style: italic; white-space: nowrap; }

	.footer-statement {
		position: relative;
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 0 1.5rem 2rem;
		font-size: 14px;
		line-height: 1.6;
		color: rgba(250,249,246,0.6);
		text-align: center;
	}

	.to-top {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1px solid rgba(250,249,246,0.25);
		background: rgba(250,249,246,0.06);
		color: #FAF9F6;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background 0.25s, border-color 0.25s, transform 0.25s;
	}

	.to-top:hover {
		background: var(--cta);
		border-color: var(--cta);
		transform: translateY(-3px);
	}

	@media (min-width: 768px) {
		.footer-inner {
			grid-template-columns: 2fr 1fr 1.2fr;
			gap: 4rem;
			padding: 6rem 1.5rem 4rem;
		}
		/* Row 1: copyright + made-in/back-to-top; row 2: legal links */
		.footer-bottom {
			display: grid;
			grid-template-columns: 1fr auto;
			align-items: center;
			gap: 1rem 2rem;
			text-align: left;
		}
		.footer-legal { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start; }
	}

	@media (prefers-reduced-motion: reduce) {
		.footer-nav a,
		.social-link,
		.footer-cta,
		.to-top { transition: none; }
	}
</style>

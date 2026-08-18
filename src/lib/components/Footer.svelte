<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import faviconUrl from '$lib/assets/favicon.svg';
</script>

<footer class="footer">
	<div class="footer-inner">
		<div class="footer-brand">
			<a href="/" class="footer-logo">
				<img src={faviconUrl} alt="Semberija.app" class="footer-logo-icon" />
			</a>
			<p class="footer-tagline">{i18n.t.footer.tagline}</p>
			<p class="footer-desc">{i18n.t.footer.desc}</p>
			<div class="footer-socials">
				<a href="mailto:{i18n.t.footer.email}" class="social-link" aria-label="Email">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
						<polyline points="22,6 12,13 2,6"/>
					</svg>
				</a>
				<a href="https://linkedin.com" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
						<circle cx="4" cy="4" r="2"/>
					</svg>
				</a>
			</div>
		</div>

		<div class="footer-col">
			<h4>{i18n.t.footer.colPlatform}</h4>
			<nav class="footer-nav">
				<a href="/firme">{i18n.t.nav.companies}</a>
				<a href="/investicije">{i18n.t.nav.investments}</a>
				<a href="/mreza">{i18n.t.nav.network}</a>
				<a href="/dijaspora">{i18n.t.nav.diaspora}</a>
				<a href="/usluge">{i18n.t.nav.services}</a>
				<a href="/vijesti">{i18n.t.nav.news}</a>
			</nav>
		</div>

		<div class="footer-col">
			<h4>{i18n.t.footer.colContact}</h4>
			<div class="footer-contact">
				<p>{i18n.t.footer.address}</p>
				<a href="mailto:{i18n.t.footer.email}">{i18n.t.footer.email}</a>
				<a href="/kontakt" class="footer-cta">{i18n.t.nav.listCta}</a>
			</div>
		</div>
	</div>

	<div class="footer-bottom">
		<span>{i18n.t.footer.copyright}</span>
		<div class="footer-legal">
			<a href="/legal/privacy">Privacy</a>
			<a href="/legal/terms">Terms</a>
			<a href="/legal/cookies">Cookies</a>
			<a href="/legal/gdpr">GDPR</a>
		</div>
		<span class="footer-made">Made in Bijeljina.</span>
	</div>
</footer>

<style>
	.footer {
		background: var(--navy);
		color: rgba(255,255,255,0.5);
		font-family: var(--font-sans);
		border-top: 1px solid rgba(255,255,255,0.06);
	}

	.footer-inner {
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 5rem 1.5rem 3rem;
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 4rem;
	}

	.footer-logo {
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		margin-bottom: 1rem;
		transition: opacity 0.2s;
	}

	.footer-logo:hover { opacity: 0.8; }

	.footer-logo-icon {
		height: 44px;
		width: auto;
		display: block;
	}

	.footer-tagline {
		font-size: 0.9rem;
		color: rgba(255,255,255,0.8);
		margin-bottom: 0.6rem;
		font-weight: 500;
	}

	.footer-desc {
		font-size: 0.82rem;
		line-height: 1.65;
		max-width: 300px;
		margin-bottom: 1.5rem;
	}

	.footer-socials {
		display: flex;
		gap: 0.6rem;
	}

	.social-link {
		width: 34px;
		height: 34px;
		border-radius: 8px;
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255,255,255,0.5);
		text-decoration: none;
		transition: all 0.2s;
	}

	.social-link:hover {
		background: rgba(6,182,212,0.15);
		border-color: rgba(6,182,212,0.4);
		color: var(--cyan);
	}

	.footer-col h4 {
		font-family: var(--font-sans);
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--cyan);
		margin-bottom: 1.25rem;
	}

	.footer-nav {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.footer-nav a {
		font-size: 0.875rem;
		color: rgba(255,255,255,0.5);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-nav a:hover { color: white; }

	.footer-contact {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-contact p,
	.footer-contact a:not(.footer-cta) {
		font-size: 0.875rem;
		color: rgba(255,255,255,0.5);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-contact a:not(.footer-cta):hover { color: white; }

	.footer-cta {
		display: inline-block;
		margin-top: 0.75rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--navy);
		background: linear-gradient(135deg, var(--cyan), var(--blue-light));
		text-decoration: none;
		padding: 0.55rem 1.1rem;
		border-radius: 7px;
		transition: opacity 0.2s, box-shadow 0.2s;
		box-shadow: 0 0 14px rgba(6,182,212,0.2);
	}

	.footer-cta:hover {
		opacity: 0.9;
		box-shadow: 0 0 22px rgba(6,182,212,0.4);
	}

	.footer-bottom {
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 1.25rem 1.5rem;
		border-top: 1px solid rgba(255,255,255,0.06);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
		color: rgba(255,255,255,0.25);
	}

	.footer-legal {
		display: flex;
		gap: 1.25rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.footer-legal a {
		font-size: 0.72rem;
		color: rgba(255,255,255,0.22);
		text-decoration: none;
		transition: color 0.2s;
	}

	.footer-legal a:hover { color: rgba(255,255,255,0.5); }

	.footer-made { font-style: italic; }

	@media (max-width: 768px) {
		.footer-inner {
			grid-template-columns: 1fr;
			gap: 2.5rem;
			padding: 3rem 1.5rem 2rem;
		}
		.footer-bottom {
			flex-direction: column;
			gap: 0.5rem;
			text-align: center;
		}
	}
</style>

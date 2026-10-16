<script lang="ts">
	import { i18n, langMeta, type Lang } from '$lib/i18n.svelte';
	import { regionalPlatforms } from '$lib/regionalPlatforms';
	import faviconUrl from '$lib/assets/favicon.svg';
	import FooterCrest from '$lib/components/FooterCrest.svelte';

	// Screen-reader labels for the icon-only "back to top" button and the language group
	const toTopLabel: Record<string, string> = {
		sr: 'Nazad na vrh',
		en: 'Back to top',
		it: 'Torna su',
		ru: 'Наверх',
		de: 'Nach oben'
	};
	const langLabel: Record<string, string> = {
		sr: 'Jezik',
		en: 'Language',
		it: 'Lingua',
		ru: 'Язык',
		de: 'Sprache'
	};
	const langs = Object.keys(langMeta) as Lang[];
	const devLabel: Record<string, string> = {
		sr: 'Razvija',
		en: 'Developed by',
		it: 'Sviluppato da',
		ru: 'Разработчик',
		de: 'Entwickelt von'
	};

	function toTop() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
	}
</script>

{#snippet arrow()}
	<svg class="fl-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>
{/snippet}

<footer class="footer">
	<div class="footer-glow" aria-hidden="true"></div>
	<div class="footer-lines" aria-hidden="true"></div>
	<!-- Coat of arms as a faint 3D line illustration behind all content -->
	<div class="footer-crest"><FooterCrest /></div>

	<!-- Join band -->
	<div class="footer-band-wrap">
		<div class="footer-band">
			<div class="footer-band-copy">
				<h3>{i18n.t.platform.joinHeading}</h3>
				<p>{i18n.t.platform.joinDesc}</p>
			</div>
			<div class="footer-band-btns">
				<a href="/kontakt?tip=registracija" class="band-main">
					<span>{i18n.t.nav.listCta}</span>
					<span class="band-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<a href="/kontakt" class="band-ghost">{i18n.t.nav.contact}</a>
			</div>
		</div>
	</div>

	<div class="footer-inner">
		<div class="footer-brand">
			<a href="/" class="footer-logo">
				<img src={faviconUrl} alt="Semberija.app" class="footer-logo-icon" />
				<img src="/Semberija%20app.png" alt="Semberija.app" class="footer-logo-wordmark" />
			</a>
			<p class="footer-tagline">{i18n.t.footer.tagline}</p>
			<p class="footer-desc">{i18n.t.footer.desc}</p>
			<div class="footer-contact">
				<p class="contact-item">
					<span class="contact-icon" aria-hidden="true">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
					</span>
					<span>{i18n.t.footer.address}</span>
				</p>
				<a href="mailto:{i18n.t.footer.email}" class="contact-item">
					<span class="contact-icon" aria-hidden="true">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
					</span>
					<span>{i18n.t.footer.email}</span>
				</a>
			</div>
			<a href="https://zoemilano.rs/" class="dev-link" target="_blank" rel="noopener">
				<span class="dev-label">{devLabel[i18n.lang] ?? devLabel.en}</span>
				<span class="dev-name">ZOE MILANO</span>
				<span class="dev-url">zoemilano.rs</span>
				<span class="dev-arrow" aria-hidden="true">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
				</span>
				<span class="sr-only">{i18n.t.regions.newTab}</span>
			</a>
		</div>

		<div class="footer-col">
			<h4>{i18n.t.footer.colPlatform}</h4>
			<nav class="footer-nav" aria-label={i18n.t.footer.colPlatform}>
				<a href="/platforma"><span>{i18n.t.nav.platformOverview}</span>{@render arrow()}</a>
				<a href="/firme"><span>{i18n.t.nav.companies}</span>{@render arrow()}</a>
				<a href="/investicije"><span>{i18n.t.nav.investments}</span>{@render arrow()}</a>
				<a href="/fondovi"><span>{i18n.t.funding.heading}</span>{@render arrow()}</a>
				<a href="/b2b"><span>{i18n.t.nav.b2b}</span>{@render arrow()}</a>
				<a href="/usluge"><span>{i18n.t.nav.services}</span>{@render arrow()}</a>
			</nav>
		</div>

		<div class="footer-col">
			<h4>{i18n.t.nav.network}</h4>
			<nav class="footer-nav" aria-label={i18n.t.nav.network}>
				<a href="/umrezavanje"><span>{i18n.t.nav.enquiries}</span>{@render arrow()}</a>
				<a href="/prilike"><span>{i18n.t.nav.opportunities}</span>{@render arrow()}</a>
				<a href="/vijesti"><span>{i18n.t.nav.news}</span>{@render arrow()}</a>
				<a href="/dogadjaji"><span>{i18n.t.nav.events}</span>{@render arrow()}</a>
				<a href="/oglasi"><span>{i18n.t.nav.promote}</span>{@render arrow()}</a>
				<a href="/o-nama"><span>{i18n.t.nav.about}</span>{@render arrow()}</a>
			</nav>
		</div>

		<div class="footer-col">
			<h4>{i18n.t.regions.label}</h4>
			<nav class="footer-nav" aria-label={i18n.t.regions.label}>
				{#each regionalPlatforms as p (p.id)}
					<a href={p.url} target="_blank" rel="noopener">
						<span class="fl-dot" style="--h:{p.hue}" aria-hidden="true"></span>
						<span>{p.name}</span>{@render arrow()}
						<span class="sr-only">{i18n.t.regions.newTab}</span>
					</a>
				{/each}
			</nav>
		</div>
	</div>

	<div class="footer-bottom">
		<div class="footer-bottom-row">
			<span class="footer-copy">{i18n.t.legal.copyright}</span>
			<nav class="footer-legal" aria-label="Legal">
				<a href="/legal/privacy">{i18n.t.legal.privacy}</a>
				<a href="/legal/terms">{i18n.t.legal.terms}</a>
				<a href="/legal/cookies">{i18n.t.legal.cookies}</a>
				<a href="/legal/gdpr">{i18n.t.legal.gdpr}</a>
				<a href="/legal/disclaimer">{i18n.t.legal.disclaimer}</a>
			</nav>
		</div>
		<div class="footer-bottom-row">
			<div class="footer-langs" role="group" aria-label={langLabel[i18n.lang] ?? langLabel.en}>
				{#each langs as l}
					<button
						type="button"
						class="lang-btn"
						class:active={i18n.lang === l}
						aria-pressed={i18n.lang === l}
						title={langMeta[l].label}
						onclick={() => i18n.setLang(l)}
					>{l.toUpperCase()}</button>
				{/each}
			</div>
			<div class="footer-end">
				<span class="footer-made">
					<span class="footer-made-dot" aria-hidden="true"></span>
					Made in Bijeljina
					<span class="footer-coords" aria-hidden="true">44.76° N · 19.21° E</span>
				</span>
				<button class="to-top" onclick={toTop} aria-label={toTopLabel[i18n.lang] ?? toTopLabel.en}>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
				</button>
			</div>
		</div>
		<!-- Independent platform statement -->
		<p class="footer-statement">{i18n.t.legal.statement}</p>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		margin-top: 2rem;
		/* Navbar grey (#343A40) as the midtone of a graphite gradient, lit from the top left */
		background:
			radial-gradient(110% 70% at 0% 0%, rgba(255,255,255,0.09) 0%, transparent 55%),
			radial-gradient(80% 60% at 100% 100%, rgba(0,0,0,0.35) 0%, transparent 60%),
			linear-gradient(180deg, #41474e 0%, #343A40 38%, #2a2f34 72%, #1f2327 100%);
		color: rgba(250,249,246,0.8);
		font-family: var(--font-sans);
	}
	/* Thin red accent line along the top edge */
	.footer::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent 0%, var(--cta) 20%, #e0414f 50%, var(--cta) 80%, transparent 100%);
	}
	.footer-glow {
		position: absolute;
		z-index: -1;
		right: -10%;
		bottom: -20%;
		width: 60%;
		height: 70%;
		background: radial-gradient(ellipse at center, rgba(196,42,56,0.1), transparent 65%);
		filter: blur(20px);
		pointer-events: none;
	}
	.footer-lines {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px) 0 0 / 64px 64px,
			linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px) 0 0 / 64px 64px;
		-webkit-mask-image: radial-gradient(ellipse 70% 60% at 30% 30%, #000 10%, transparent 75%);
		mask-image: radial-gradient(ellipse 70% 60% at 30% 30%, #000 10%, transparent 75%);
		pointer-events: none;
	}

	/* Line-drawn crest: large, partly cropped, faded into the background */
	.footer-crest {
		position: absolute;
		z-index: -1;
		top: 4%;
		right: -6%;
		width: min(62%, 860px);
		height: 96%;
		opacity: 0.28;
		mix-blend-mode: screen;
		-webkit-mask-image: radial-gradient(ellipse 60% 58% at 50% 45%, #000 25%, transparent 78%);
		mask-image: radial-gradient(ellipse 60% 58% at 50% 45%, #000 25%, transparent 78%);
		pointer-events: none;
	}
	@media (max-width: 899px) {
		/* Phones/tablets: own square area, centred in the footer behind the link columns,
		   below the frosted join band */
		.footer-crest {
			top: 52%;
			bottom: auto;
			right: auto;
			left: 50%;
			width: min(118vw, 620px);
			height: auto;
			aspect-ratio: 1;
			transform: translate(-50%, -50%);
			opacity: 0.32;
			-webkit-mask-image: radial-gradient(circle at 50% 48%, #000 34%, transparent 70%);
			mask-image: radial-gradient(circle at 50% 48%, #000 34%, transparent 70%);
		}
	}

	/* ── Join band ── */
	.footer-band-wrap {
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 3.5rem 1.5rem 0;
	}
	.footer-band {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: clamp(1.6rem, 3.5vw, 2.4rem) clamp(1.5rem, 4vw, 2.75rem);
		border-radius: 26px;
		background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.1), 0 30px 60px -34px rgba(0,0,0,0.7);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
	.footer-band::after {
		content: '';
		position: absolute;
		z-index: -1;
		right: -10%;
		top: -80%;
		width: 50%;
		height: 260%;
		background: radial-gradient(ellipse at center, rgba(196,42,56,0.28), transparent 65%);
		pointer-events: none;
	}
	.footer-band-copy h3 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 2.8vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.1;
		color: #FAF9F6;
		margin-bottom: 0.5rem;
	}
	.footer-band-copy p { font-size: 1rem; line-height: 1.6; color: rgba(250,249,246,0.75); max-width: 52ch; }
	.footer-band-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; flex-shrink: 0; }
	.band-main {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.45rem 0.45rem 0.45rem 1.35rem;
		border-radius: 50px;
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 16px 32px -14px rgba(155,17,30,0.85), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
	}
	.band-main-arrow {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		color: var(--cta);
		background: #FAF9F6;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.band-main:hover { transform: translateY(-2px); }
	.band-main:hover .band-main-arrow { transform: rotate(45deg); }
	.band-ghost {
		display: inline-flex;
		align-items: center;
		padding: 0 1.5rem;
		min-height: 48px;
		border-radius: 50px;
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
		box-shadow: inset 0 0 0 1px rgba(250,249,246,0.35);
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}
	.band-ghost:hover { background: rgba(255,255,255,0.1); box-shadow: inset 0 0 0 1px #FAF9F6; }

	/* ── Columns ── */
	.footer-inner {
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 3.5rem 1.5rem 2rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.75rem;
	}
	.footer-logo {
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		margin-bottom: 1.4rem;
		transition: transform 0.3s ease;
	}
	.footer-logo:hover { transform: translateY(-2px); }
	.footer-logo-icon {
		height: 64px;
		width: auto;
		display: block;
		filter: drop-shadow(0 8px 18px rgba(0,0,0,0.45));
	}
	.footer-logo-wordmark {
		height: 30px;
		width: auto;
		display: block;
		filter: brightness(0) invert(1);
	}
	.footer-tagline {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #FAF9F6;
		margin-bottom: 0.6rem;
	}
	.footer-desc {
		font-size: 0.93rem;
		line-height: 1.7;
		color: rgba(250,249,246,0.65);
		max-width: 38ch;
		margin-bottom: 1.5rem;
	}
	.footer-contact { display: flex; flex-direction: column; gap: 0.6rem; }
	.contact-item {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		align-self: flex-start;
		font-size: 0.92rem;
		color: rgba(250,249,246,0.8);
		text-decoration: none;
		transition: color 0.25s ease;
	}
	a.contact-item:hover { color: #FAF9F6; }
	.contact-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: #FAF9F6;
		background: rgba(255,255,255,0.07);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}
	a.contact-item:hover .contact-icon { background: var(--cta); box-shadow: inset 0 0 0 1px var(--cta); }

	/* Developer credit: styled as an obvious external link */
	.dev-link {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.5rem;
		padding: 0.45rem 0.45rem 0.45rem 1rem;
		border-radius: 50px;
		text-decoration: none;
		color: #FAF9F6;
		background: rgba(255,255,255,0.06);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}
	.dev-label {
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.55);
	}
	.dev-name {
		font-family: var(--font-heading);
		font-size: 0.9rem;
		font-weight: 800;
		letter-spacing: 0.04em;
	}
	.dev-url {
		font-size: 0.82rem;
		color: #f06a75;
		text-decoration: underline;
		text-decoration-color: rgba(240,106,117,0.5);
		text-underline-offset: 3px;
	}
	.dev-arrow {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		color: #FAF9F6;
		background: var(--cta);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.dev-link:hover {
		background: rgba(255,255,255,0.12);
		box-shadow: inset 0 0 0 1px rgba(240,106,117,0.6);
	}
	.dev-link:hover .dev-url { text-decoration-color: #f06a75; }
	.dev-link:hover .dev-arrow { transform: rotate(45deg); }
	.dev-link:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	.footer-col h4 {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--font-sans);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.5);
		margin-bottom: 1.25rem;
	}
	.footer-col h4::before {
		content: '';
		width: 14px;
		height: 2px;
		border-radius: 2px;
		background: linear-gradient(90deg, #c42a38, #e0414f);
	}
	.footer-nav { display: flex; flex-direction: column; gap: 0.15rem; }
	.footer-nav a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		align-self: flex-start;
		padding: 0.35rem 0;
		font-size: 0.95rem;
		font-weight: 500;
		color: rgba(250,249,246,0.82);
		text-decoration: none;
		transition: color 0.25s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.footer-nav a :global(.fl-arrow) {
		opacity: 0;
		transform: translate(-4px, 4px);
		color: #f06a75;
		transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.footer-nav a:hover { color: #FAF9F6; transform: translateX(3px); }
	.footer-nav a:hover :global(.fl-arrow) { opacity: 1; transform: none; }
	.fl-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: hsl(var(--h) 75% 62%);
		box-shadow: 0 0 0 3px hsl(var(--h) 75% 62% / 0.18);
	}

	/* ── Oversized wordmark ── */
	/* ── Bottom bar ── */
	.footer-bottom {
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 1.5rem 1.5rem 2rem;
		border-top: 1px solid rgba(255,255,255,0.08);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
	.footer-bottom-row {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.footer-copy { font-size: 0.85rem; color: rgba(250,249,246,0.6); }
	.footer-legal { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 0; }
	.footer-legal a {
		display: inline-flex;
		align-items: center;
		font-size: 0.85rem;
		color: rgba(250,249,246,0.7);
		text-decoration: none;
		transition: color 0.25s ease;
	}
	.footer-legal a + a::before {
		content: '';
		width: 3px;
		height: 3px;
		margin: 0 0.75rem;
		border-radius: 50%;
		background: rgba(250,249,246,0.3);
	}
	.footer-legal a:hover { color: #FAF9F6; }

	.footer-langs {
		display: inline-flex;
		align-self: flex-start;
		gap: 2px;
		padding: 3px;
		border-radius: 50px;
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
	}
	.lang-btn {
		min-width: 38px;
		padding: 0.4rem 0.6rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: rgba(250,249,246,0.6);
		background: transparent;
		cursor: pointer;
		transition: background 0.3s ease, color 0.3s ease;
	}
	.lang-btn:hover { color: #FAF9F6; }
	.lang-btn.active { color: var(--navy); background: #FAF9F6; }

	.footer-end { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
	.footer-made {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-size: 0.82rem;
		font-weight: 600;
		color: rgba(250,249,246,0.75);
	}
	.footer-made-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f06a75;
		box-shadow: 0 0 0 3px rgba(240,106,117,0.2);
	}
	.footer-coords {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.72rem;
		font-weight: 400;
		letter-spacing: 0.06em;
		color: rgba(250,249,246,0.45);
	}
	.to-top {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border: 0;
		border-radius: 50%;
		color: #FAF9F6;
		background: rgba(255,255,255,0.07);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
		cursor: pointer;
		transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.to-top:hover {
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 10px 22px -8px rgba(155,17,30,0.7);
		transform: translateY(-3px);
	}

	.footer-statement {
		font-size: 0.78rem;
		line-height: 1.6;
		color: rgba(250,249,246,0.45);
		max-width: 90ch;
	}

	.band-main:focus-visible, .band-ghost:focus-visible, .footer-nav a:focus-visible,
	.footer-legal a:focus-visible, .contact-item:focus-visible, .lang-btn:focus-visible,
	.to-top:focus-visible, .footer-logo:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (min-width: 640px) {
		.footer-inner { grid-template-columns: repeat(2, 1fr); }
		.footer-brand { grid-column: 1 / -1; }
	}
	@media (min-width: 900px) {
		.footer-band { flex-direction: row; align-items: center; justify-content: space-between; gap: 2rem; }
		.footer-bottom-row { flex-direction: row; align-items: center; justify-content: space-between; }
	}
	@media (min-width: 1100px) {
		.footer-inner { grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 3rem; }
		.footer-brand { grid-column: auto; }
	}

	@media (prefers-reduced-motion: reduce) {
		.band-main, .band-main-arrow, .footer-nav a, .footer-nav a :global(.fl-arrow), .to-top, .footer-logo { transition: none; }
		.band-main:hover, .band-main:hover .band-main-arrow, .footer-nav a:hover, .to-top:hover, .footer-logo:hover { transform: none; }
	}
</style>

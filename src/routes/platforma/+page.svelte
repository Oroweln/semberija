<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { platformModules } from '$lib/platform';
	import HowItWorks from '$lib/components/HowItWorks.svelte';

	const p = $derived(i18n.t.platform);
</script>

<svelte:head>
	<title>{i18n.t.seo.platformTitle}</title>
	<meta property="og:title" content={i18n.t.seo.platformTitle} />
	<meta name="description" content={p.desc} />
</svelte:head>

<div class="page-wrap">
	<!-- Introduction -->
	<section class="page-top reveal-card" use:reveal>
		<div class="container">
			<span class="page-tag">{p.label}</span>
			<h1>{p.heading}</h1>
			<p class="page-sub">{p.desc}</p>
			<div class="top-btns">
				<a href="/kontakt?tip=registracija" class="btn-primary">{i18n.t.nav.listCta}</a>
				<a href="#moduli" class="btn-light">{p.modulesHeading}</a>
			</div>
		</div>
	</section>

	<!-- Modules in detail -->
	<section id="moduli" class="page-body reveal-card" use:reveal>
		<div class="container">
			<div class="section-head">
				<h2>{p.modulesHeading}</h2>
			</div>
			<div class="modules-grid">
				{#each p.modules as mod, i}
					{@const meta = platformModules[i]}
					<article class="module">
						<div class="module-head">
							<span class="module-num">{String(i + 1).padStart(2, '0')}</span>
							{#if meta.status}
								<span class="module-status">
									{meta.status === 'dev' ? p.statusDev : p.statusSoon}
								</span>
							{/if}
						</div>
						<h3>{mod.title}</h3>
						<p class="module-desc">{mod.desc}</p>
						<p class="module-detail">{mod.detail}</p>
						<a href={meta.href} class="module-btn" class:outline={!!meta.status}>
							{mod.cta}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</a>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- How it works (shared with the homepage) -->
	<section class="page-dark reveal-card" use:reveal>
		<div class="container">
			<HowItWorks theme="dark" />
		</div>
	</section>

	<!-- Registration benefits -->
	<section class="page-body reveal-card" use:reveal>
		<div class="container">
			<div class="section-head">
				<span class="body-tag">{p.benefitsLabel}</span>
				<h2>{p.benefitsHeading}</h2>
				<p>{p.benefitsDesc}</p>
			</div>
			<ul class="benefits">
				{#each p.benefits as b}
					<li class="benefit">
						<span class="benefit-icon" aria-hidden="true">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><polyline points="20 6 9 17 4 12"/></svg>
						</span>
						<div>
							<h3>{b.title}</h3>
							<p>{b.desc}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Join -->
	<section class="page-dark join reveal-card" use:reveal>
		<div class="join-glow" aria-hidden="true"></div>
		<div class="container join-inner">
			<h2>{p.joinHeading}</h2>
			<p>{p.joinDesc}</p>
			<a href="/kontakt?tip=registracija" class="btn-primary btn-lg">{i18n.t.nav.listCta}</a>
		</div>
	</section>
</div>

<style>
	.page-wrap {
		max-width: 1440px;
		margin: 0 auto;
		padding: calc(var(--nav-h) + 1.25rem) clamp(1rem, 3vw, 2rem) 3rem;
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}
	.container { max-width: var(--max-w); margin: 0 auto; }

	/* ── Surfaces ── */
	.page-top,
	.page-dark {
		position: relative;
		overflow: hidden;
		background: var(--surface-dark);
		color: #FAF9F6;
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
	}
	.page-body {
		background: var(--surface-light);
		color: var(--dark);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
		scroll-margin-top: calc(var(--nav-h) + 1rem);
	}

	/* ── Introduction ── */
	.page-tag {
		display: inline-block;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: #FAF9F6; background: rgba(250,249,246,0.1); border: 1px solid rgba(250,249,246,0.3);
		padding: 0.35rem 0.95rem; border-radius: 50px; margin-bottom: 1.25rem;
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 5vw, 4rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.05;
		text-wrap: balance;
		max-width: 900px;
		margin-bottom: 1rem;
	}
	.page-sub {
		font-size: 1.15rem;
		color: rgba(250,249,246,0.88);
		max-width: 720px;
		line-height: 1.65;
		margin-bottom: 2rem;
	}
	.top-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }

	/* ── Buttons ── */
	.btn-primary,
	.btn-light {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 600;
		text-decoration: none;
		padding: 0.95rem 2.1rem;
		border-radius: 10px;
		transition: background 0.2s, transform 0.2s, box-shadow 0.2s, border-color 0.2s;
	}
	.btn-primary {
		color: var(--cta-text);
		background: var(--cta);
		box-shadow: 0 10px 24px -8px rgba(155,17,30,0.55), inset 0 1px 0 rgba(255,255,255,0.18);
	}
	.btn-primary:hover { background: var(--cta-hover); transform: translateY(-2px); }
	.btn-primary.btn-lg { padding: 1.1rem 2.75rem; font-size: 1.15rem; }
	.btn-light {
		color: #FAF9F6;
		background: rgba(250,249,246,0.08);
		border: 1px solid rgba(250,249,246,0.45);
	}
	.btn-light:hover { background: rgba(250,249,246,0.16); border-color: #FAF9F6; }

	/* ── Section heads ── */
	.section-head { max-width: 720px; margin: 0 auto 3rem; text-align: center; }
	.section-head h2 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.1;
		text-wrap: balance;
		color: var(--navy);
	}
	.section-head h2::after {
		content: '';
		display: block;
		width: 56px;
		height: 4px;
		margin: 1.1rem auto 0;
		border-radius: 2px;
		background: var(--accent-line);
	}
	.section-head p { margin-top: 1.25rem; font-size: 1.1rem; color: #4a525e; line-height: 1.65; }
	.body-tag {
		display: inline-block;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--steel); background: rgba(36,64,107,0.08); border: 1px solid rgba(36,64,107,0.2);
		padding: 0.35rem 0.95rem; border-radius: 50px; margin-bottom: 1rem;
	}

	/* ── Modules ── */
	.modules-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}
	.module {
		display: flex;
		flex-direction: column;
		background: #ffffff;
		border: 1px solid rgba(15,23,42,0.07);
		border-radius: var(--radius-xl);
		padding: 2rem;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.module:hover { transform: translateY(-4px); box-shadow: 0 28px 48px -20px rgba(15,23,42,0.28); }
	.module-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}
	.module-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 12px;
		font-family: var(--font-heading);
		font-weight: 800;
		color: #ffffff;
		background: linear-gradient(135deg, var(--steel), var(--steel-light));
		box-shadow: 0 10px 20px -8px rgba(36,64,107,0.45);
	}
	/* Availability badge (U RAZVOJU / IN DEVELOPMENT) */
	.module-status {
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #1a1a1a;
		background: #f2c14e;
		border-radius: 50px;
		padding: 0.35rem 0.8rem;
		white-space: nowrap;
	}
	.module h3 {
		font-family: var(--font-heading);
		font-size: 1.35rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}
	.module-desc { font-size: 1.02rem; font-weight: 600; color: var(--dark); line-height: 1.55; margin-bottom: 0.65rem; }
	.module-detail { font-size: 0.95rem; color: #4a525e; line-height: 1.65; flex: 1; margin-bottom: 1.5rem; }
	.module-btn {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--cta-text);
		background: var(--cta);
		padding: 0.8rem 1.4rem;
		border-radius: 10px;
		transition: background 0.2s, transform 0.2s;
	}
	.module-btn:hover { background: var(--cta-hover); transform: translateY(-2px); }
	.module-btn svg { transition: transform 0.2s; }
	.module-btn:hover svg { transform: translateX(3px); }
	/* Features not yet available get a quieter button */
	.module-btn.outline {
		color: var(--cta);
		background: transparent;
		border: 1.5px solid var(--cta);
	}
	.module-btn.outline:hover { color: var(--cta-text); background: var(--cta); }

	/* ── Benefits ── */
	.benefits {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem 2rem;
	}
	.benefit {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding: 1.5rem;
		background: #ffffff;
		border: 1px solid rgba(15,23,42,0.07);
		border-radius: var(--radius-lg);
	}
	.benefit-icon {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		background: var(--success);
	}
	.benefit h3 {
		font-family: var(--font-heading);
		font-size: 1.12rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 0.3rem;
	}
	.benefit p { font-size: 0.95rem; color: #4a525e; line-height: 1.6; }

	/* ── Join ── */
	.join { text-align: center; }
	.join-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 900px;
		height: 420px;
		transform: translate(-50%, -50%);
		background: radial-gradient(ellipse at center, rgba(155,17,30,0.32) 0%, rgba(155,17,30,0.08) 40%, transparent 70%);
		pointer-events: none;
	}
	.join-inner { position: relative; }
	.join h2 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3.4rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.08;
		text-wrap: balance;
		margin-bottom: 1rem;
	}
	.join p {
		font-size: 1.15rem;
		color: rgba(250,249,246,0.88);
		max-width: 600px;
		margin: 0 auto 2.25rem;
		line-height: 1.65;
	}

	@media (min-width: 768px) {
		.modules-grid { grid-template-columns: repeat(2, 1fr); }
		.benefits { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1100px) {
		.benefits { grid-template-columns: repeat(3, 1fr); }
	}
</style>

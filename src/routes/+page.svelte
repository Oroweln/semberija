<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms as companies, visibleFirmSlugs } from '$lib/data';
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import AdPlaceholder from '$lib/components/AdPlaceholder.svelte';
	import { investmentCategorySlugs, b2bItemSlugs } from '$lib/data';

	const investCats = $derived(
		i18n.t.investments.categories.map((cat, i) => ({ ...cat, slug: investmentCategorySlugs[i] }))
	);

	const b2bItems = $derived(
		i18n.t.b2b.items.map((item, i) => ({ ...item, slug: b2bItemSlugs[i] }))
	);

	const visibleCompanies = $derived(companies.filter(c => visibleFirmSlugs.includes(c.slug)));

	let companiesSection: HTMLElement;
	let companiesRevealed = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					companiesRevealed = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		observer.observe(companiesSection);
		return () => observer.disconnect();
	});

	function parseStatValue(v: string) {
		const m = v.match(/^(\d+)(.*)$/);
		return m ? { num: parseInt(m[1], 10), suffix: m[2] } : null;
	}

	const statsParsed = $derived(i18n.t.stats.map((s) => parseStatValue(s.value)));

	let statsSection: HTMLElement;
	let statsCounts = $state<number[]>([0, 0, 0, 0]);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				observer.disconnect();

				const duration = 1600;
				const startTime = performance.now();
				const targets = i18n.t.stats.map((s) => parseStatValue(s.value)?.num ?? 0);

				function tick(now: number) {
					const progress = Math.min((now - startTime) / duration, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					statsCounts = targets.map((t) => Math.round(t * eased));
					if (progress < 1) requestAnimationFrame(tick);
				}
				requestAnimationFrame(tick);
			},
			{ threshold: 0.4 }
		);
		observer.observe(statsSection);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Semberija.app — {i18n.t.hero.headline}</title>
	<meta name="description" content={i18n.t.hero.sub} />
</svelte:head>

<div class="home-wrap">

	<!-- ─── HERO BENTO ─── -->
	<section class="bento hero-bento reveal-card" use:reveal>
		<video class="hero-video" src="/hero-video.mp4" autoplay muted loop playsinline></video>
		<div class="hero-blur"></div>
		<div class="hero-overlay"></div>

		<div class="hero-content">
			<span class="hero-tag">{i18n.t.hero.tag}</span>
			<h1 class="hero-headline">{i18n.t.hero.headline}</h1>
			<p class="hero-sub">{i18n.t.hero.sub}</p>
			<div class="hero-btns">
				<a href="/mreza" class="btn-primary">{i18n.t.hero.ctaNetwork}</a>
				<a href="/firme" class="btn-ghost">{i18n.t.hero.ctaCompanies}</a>
				<a href="/investicije" class="btn-ghost">{i18n.t.hero.ctaInvest}</a>
			</div>
		</div>

		<button
			class="hero-scroll"
			onclick={() => document.getElementById('below-hero')?.scrollIntoView({ behavior: 'smooth' })}
		>
			<span class="hero-scroll-label">{i18n.t.ui.explore}</span>
			<span class="hero-scroll-line"></span>
		</button>
	</section>

	<!-- ─── STATS ─── -->
	<div class="stats-bento" id="below-hero" bind:this={statsSection}>
		{#each i18n.t.stats as stat, i}
			<div class="stat-tile reveal-card" use:reveal={{ delay: i * 90 }}>
				<span class="stat-value">
					{#if statsParsed[i]}
						{statsCounts[i]}{statsParsed[i]?.suffix}
					{:else}
						{stat.value}
					{/if}
				</span>
				<span class="stat-label">{stat.label}</span>
			</div>
		{/each}
	</div>

	<!-- ─── AD: LEADERBOARD ─── -->
	<section class="bento bento-light ad-section reveal-card" use:reveal>
		<div class="container">
			<AdPlaceholder variant="leaderboard" label="Your advertisement here" />
		</div>
	</section>

	<!-- ─── WHY SEMBERIJA ─── -->
	<section class="bento bento-light reveal-card" use:reveal>
		<div class="container">
			<div class="section-header">
				<span class="section-tag">{i18n.t.why.label}</span>
				<h2>{i18n.t.why.heading}</h2>
			</div>
			<div class="why-grid">
				{#each i18n.t.why.items as item}
					<div class="why-card">
						<div class="why-icon">
							{#if item.icon === 'location'}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
							{:else if item.icon === 'growth'}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
							{:else if item.icon === 'agriculture'}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
							{:else if item.icon === 'diaspora'}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
							{:else}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
							{/if}
						</div>
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ─── NETWORK ─── -->
	<section class="bento bento-dark reveal-card" use:reveal>
		<div class="container">
			<div class="section-header section-header-light">
				<span class="section-tag-light">{i18n.t.network.label}</span>
				<h2>{i18n.t.network.heading}</h2>
				<p class="section-sub-light">{i18n.t.network.sub}</p>
			</div>
			<div class="network-grid">
				{#each i18n.t.network.items as item, i}
					<div class="network-card">
						<div class="network-num">0{i + 1}</div>
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
					</div>
				{/each}
			</div>
			<div class="section-cta">
				<a href="/mreza" class="btn-primary">{i18n.t.hero.ctaNetwork}</a>
			</div>
		</div>
	</section>

	<!-- ─── FEATURED COMPANIES ─── -->
	<section class="bento bento-light companies-section reveal-card" use:reveal bind:this={companiesSection} class:revealed={companiesRevealed}>
		<div class="container">
			<div class="section-header">
				<span class="section-tag">{i18n.t.companies.label}</span>
				<h2>{i18n.t.companies.heading}</h2>
				<p class="section-sub">{i18n.t.companies.sub}</p>
			</div>
			<div class="companies-grid">
				{#each visibleCompanies as company}
					<article class="company-card">
						<div class="company-top">
							<div class="company-avatar" style="background: {company.color}">
								{company.initials}
							</div>
							<div class="company-meta">
								<span class="company-category">{i18n.lang === 'sr' ? company.category_sr : company.category_en}</span>
								<span class="company-city">{company.city}</span>
							</div>
						</div>
						<h3 class="company-name">{company.name}</h3>
						<p class="company-desc">{i18n.lang === 'sr' ? company.desc_sr : company.desc_en}</p>
						<a href="/kontakt" class="company-btn">
							{i18n.t.companies.inquire}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</a>
					</article>
				{/each}
			</div>
			<div class="section-cta">
				<a href="/firme" class="btn-outline">{i18n.t.companies.viewAll}</a>
			</div>
		</div>
	</section>

	<!-- ─── AD: BANNER ─── -->
	<section class="bento bento-dark ad-section reveal-card" use:reveal>
		<div class="container">
			<AdPlaceholder variant="banner" label="Your advertisement here" />
		</div>
	</section>

	<!-- ─── INVESTMENTS ─── -->
	<section class="bento bento-dark investments-section reveal-card" use:reveal>
		<div class="investments-glow"></div>
		<div class="container">
			<div class="section-header section-header-light">
				<span class="section-tag-light">{i18n.t.investments.label}</span>
				<h2>{i18n.t.investments.heading}</h2>
				<p class="section-sub-light">{i18n.t.investments.sub}</p>
			</div>
			<div class="invest-marquee">
				<div class="invest-track">
					{#each [...investCats, ...investCats] as cat}
						<a href="/investicije/{cat.slug}" class="invest-chip">
							<span class="invest-chip-dot"></span>
							{cat.name}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17 17 7M7 7h10v10"/></svg>
						</a>
					{/each}
				</div>
			</div>
			<div class="section-cta">
				<a href="/investicije" class="btn-primary">{i18n.t.investments.cta}</a>
			</div>
		</div>
	</section>

	<!-- ─── DIASPORA ─── -->
	<section class="bento bento-light reveal-card" use:reveal>
		<div class="container diaspora-layout">
			<div class="diaspora-text">
				<span class="section-tag">{i18n.t.b2b.label}</span>
				<h2>{i18n.t.b2b.heading}</h2>
				<p class="section-sub">{i18n.t.b2b.sub}</p>
				<ul class="diaspora-list">
					{#each b2bItems as item}
						<li>
							<a href="/b2b/{item.slug}">
								<span class="diaspora-dot"></span>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
				<a href="/b2b" class="btn-primary">{i18n.t.b2b.cta}</a>
			</div>
			<div class="diaspora-visual">
				<div class="diaspora-globe">
					<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="100" cy="100" r="90" stroke="rgba(154,164,178,0.2)" stroke-width="1"/>
						<circle cx="100" cy="100" r="70" stroke="rgba(154,164,178,0.15)" stroke-width="1"/>
						<circle cx="100" cy="100" r="50" stroke="rgba(154,164,178,0.1)" stroke-width="1"/>
						<ellipse cx="100" cy="100" rx="90" ry="35" stroke="rgba(154,164,178,0.15)" stroke-width="1"/>
						<ellipse cx="100" cy="100" rx="90" ry="65" stroke="rgba(154,164,178,0.1)" stroke-width="1"/>
						<line x1="100" y1="10" x2="100" y2="190" stroke="rgba(154,164,178,0.12)" stroke-width="1"/>
						{#each [30, 60, 120, 150] as x}
							<line x1={x} y1="10" x2={x} y2="190" stroke="rgba(154,164,178,0.08)" stroke-width="1"/>
						{/each}
						<circle cx="100" cy="100" r="6" fill="var(--steel)" opacity="0.8"/>
						<circle cx="60" cy="70" r="4" fill="var(--steel-light)" opacity="0.6"/>
						<circle cx="145" cy="65" r="4" fill="var(--steel-light)" opacity="0.6"/>
						<circle cx="130" cy="135" r="4" fill="var(--steel-light)" opacity="0.6"/>
						<circle cx="55" cy="140" r="4" fill="var(--steel-light)" opacity="0.6"/>
						<line x1="100" y1="100" x2="60" y2="70" stroke="rgba(36,64,107,0.4)" stroke-width="1.5"/>
						<line x1="100" y1="100" x2="145" y2="65" stroke="rgba(36,64,107,0.4)" stroke-width="1.5"/>
						<line x1="100" y1="100" x2="130" y2="135" stroke="rgba(36,64,107,0.4)" stroke-width="1.5"/>
						<line x1="100" y1="100" x2="55" y2="140" stroke="rgba(36,64,107,0.4)" stroke-width="1.5"/>
					</svg>
				</div>
			</div>
		</div>
	</section>

	<!-- ─── AD: SQUARE PAIR ─── -->
	<section class="bento bento-light ad-section ad-section-split reveal-card" use:reveal>
		<div class="container ad-split-grid">
			<AdPlaceholder variant="square" label="Your advertisement here" />
			<AdPlaceholder variant="square" label="Your advertisement here" />
		</div>
	</section>

	<!-- ─── DIGITAL SERVICES ─── -->
	<section class="bento bento-dark reveal-card" use:reveal>
		<div class="container">
			<div class="section-header section-header-light">
				<span class="section-tag-light">{i18n.t.services.label}</span>
				<h2>{i18n.t.services.heading}</h2>
				<p class="section-sub-light">{i18n.t.services.sub}</p>
			</div>
			<div class="services-grid">
				{#each i18n.t.services.items as svc, i}
					<div class="service-card">
						<div class="service-num"><span>0{i + 1}</span></div>
						<h3>{svc.title}</h3>
						<p>{svc.desc}</p>
					</div>
				{/each}
			</div>
			<div class="section-cta">
				<a href="/usluge" class="btn-primary">{i18n.t.services.cta}</a>
			</div>
		</div>
	</section>

	<!-- ─── FINAL CTA ─── -->
	<section class="bento bento-dark cta-bento reveal-card" use:reveal>
		<div class="cta-glow"></div>
		<div class="cta-inner">
			<h2>{i18n.t.cta.heading}</h2>
			<p>{i18n.t.cta.sub}</p>
			<a href="/kontakt" class="btn-primary btn-lg">{i18n.t.cta.btn}</a>
		</div>
	</section>

</div>

<style>
	/* ── Page canvas ── */
	.home-wrap {
		max-width: 1440px;
		margin: 0 auto;
		padding: calc(92px + 1.25rem) clamp(1rem, 3vw, 2rem) 3rem;
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	/* ── Bento card base ── */
	.bento {
		position: relative;
		border-radius: var(--radius-bento);
		overflow: hidden;
		box-shadow: var(--shadow-bento);
	}
	.bento-light {
		background: radial-gradient(140% 140% at 25% 15%, #ffffff 0%, #f2f3f6 100%);
		color: var(--dark);
		padding: var(--section-py) var(--section-px);
		border: 1px solid rgba(255,255,255,0.4);
		box-shadow: var(--shadow-bento), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -16px 30px -20px rgba(15,23,42,0.14);
	}
	.bento-dark {
		background: var(--card-blue);
		color: white;
		padding: var(--section-py) var(--section-px);
		border: 1px solid rgba(255,255,255,0.05);
		box-shadow:
			inset 0 8px 20px -4px rgba(0,0,0,0.4),
			inset 0 -2px 6px -2px rgba(255,255,255,0.05),
			inset 8px 0 20px -10px rgba(0,0,0,0.25),
			inset -8px 0 20px -10px rgba(0,0,0,0.25);
	}

	.container { max-width: var(--max-w); margin: 0 auto; }

	.section-header {
		text-align: center;
		max-width: 640px;
		margin: 0 auto 4rem;
	}
	.section-header-light { color: white; }

	.section-tag {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--steel);
		background: rgba(36,64,107,0.08);
		border: 1px solid rgba(36,64,107,0.2);
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		margin-bottom: 1rem;
	}
	.section-tag-light {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--silver);
		background: rgba(154,164,178,0.1);
		border: 1px solid rgba(154,164,178,0.25);
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		margin-bottom: 1rem;
	}

	.section-header h2,
	.section-header-light h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.8rem, 3.5vw, 2.8rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--navy);
		margin-bottom: 0.75rem;
	}
	.section-header-light h2 { color: white; }

	.section-sub { font-size: 1rem; color: var(--muted); line-height: 1.65; }
	.section-sub-light { font-size: 1rem; color: rgba(255,255,255,0.6); line-height: 1.65; }

	.section-cta { text-align: center; margin-top: 3rem; }

	/* ── Buttons ── */
	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--navy);
		background: linear-gradient(135deg, var(--platinum), var(--silver));
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: 10px;
		transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 4px 20px rgba(5,9,15,0.22);
	}
	.btn-primary:hover {
		opacity: 0.92;
		transform: translateY(-2px);
		box-shadow: 0 8px 28px rgba(5,9,15,0.3);
	}
	.btn-primary.btn-lg { padding: 1rem 2.5rem; font-size: 1rem; }

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 500;
		color: rgba(255,255,255,0.8);
		background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.2);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: 10px;
		transition: all 0.2s;
	}
	.btn-ghost:hover {
		background: rgba(255,255,255,0.14);
		border-color: rgba(255,255,255,0.4);
		color: white;
	}

	.btn-outline {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--steel);
		background: transparent;
		border: 1.5px solid var(--steel);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: 10px;
		transition: all 0.2s;
	}
	.btn-outline:hover {
		background: var(--steel);
		color: white;
	}

	/* ── HERO BENTO ── */
	.hero-bento {
		min-height: 74vh;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255,255,255,0.08);
	}

	.hero-video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.hero-blur {
		position: absolute;
		inset: 0;
		backdrop-filter: blur(2px);
		-webkit-backdrop-filter: blur(2px);
		pointer-events: none;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(5,9,15,0.6) 0%,
			rgba(5,9,15,0.4) 50%,
			rgba(5,9,15,0.82) 100%
		);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 820px;
		padding: 3rem var(--section-px);
		color: white;
		pointer-events: none;
	}

	.hero-tag {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--silver);
		margin-bottom: 1.5rem;
		opacity: 0.85;
	}

	.hero-headline {
		font-family: var(--font-heading);
		font-size: clamp(2.6rem, 6.5vw, 5.5rem);
		font-weight: 800;
		line-height: 1.0;
		letter-spacing: -0.04em;
		color: white;
		margin-bottom: 1.25rem;
	}

	.hero-sub {
		font-size: clamp(1rem, 2vw, 1.2rem);
		font-weight: 300;
		color: rgba(255,255,255,0.7);
		line-height: 1.6;
		max-width: 560px;
		margin: 0 auto 2.5rem;
	}

	.hero-btns {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		justify-content: center;
		align-items: stretch;
		pointer-events: all;
	}

	.hero-scroll {
		position: absolute;
		bottom: 1.25rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
		padding: 0.5rem 1rem;
		animation: scroll-bob 3s ease infinite;
	}

	.hero-scroll:hover .hero-scroll-label { opacity: 1; letter-spacing: 0.22em; }
	.hero-scroll:hover .hero-scroll-line { height: 40px; opacity: 0.9; }

	.hero-scroll-label {
		font-family: var(--font-sans);
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.55);
		transition: opacity 0.3s, letter-spacing 0.3s;
	}

	.hero-scroll-line {
		display: block;
		width: 1px;
		height: 28px;
		background: linear-gradient(to bottom, rgba(154,164,178,0.7), transparent);
		transition: height 0.3s, opacity 0.3s;
	}

	@keyframes scroll-bob {
		0%, 100% { opacity: 0.55; transform: translateX(-50%) translateY(0); }
		50%       { opacity: 1;    transform: translateX(-50%) translateY(5px); }
	}

	/* ── STATS ── */
	.stats-bento {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	.stat-tile {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		background: var(--card-blue);
		border-radius: var(--radius-xl);
		box-shadow:
			inset 0 5px 12px -2px rgba(0,0,0,0.4),
			inset 0 -1px 3px -1px rgba(255,255,255,0.05),
			inset 5px 0 10px -6px rgba(0,0,0,0.25),
			inset -5px 0 10px -6px rgba(0,0,0,0.25);
		border: 1px solid rgba(255,255,255,0.05);
	}

	.stat-value {
		font-family: var(--font-heading);
		font-size: 2.4rem;
		font-weight: 800;
		color: var(--silver);
		line-height: 1;
		margin-bottom: 0.35rem;
		letter-spacing: -0.04em;
	}

	.stat-label {
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.4);
		text-align: center;
	}

	/* ── ADS ── */
	.ad-section {
		padding: 2rem var(--section-px);
		display: flex;
		justify-content: center;
	}
	.ad-section .container {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.ad-section :global(.ad-placeholder) {
		max-width: 960px;
	}
	.ad-split-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		justify-content: center;
	}
	.bento-dark.ad-section :global(.ad-placeholder) {
		border-color: rgba(255,255,255,0.25);
		background: repeating-linear-gradient(
			45deg,
			rgba(255,255,255,0.06),
			rgba(255,255,255,0.06) 10px,
			rgba(255,255,255,0.02) 10px,
			rgba(255,255,255,0.02) 20px
		);
	}
	.bento-dark.ad-section :global(.ad-dims) { color: rgba(255,255,255,0.45); }

	/* ── WHY ── */
	.why-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.why-card {
		position: relative;
		background: var(--soft-white);
		border-radius: var(--radius-xl);
		padding: 2rem 1.75rem;
		border: 1px solid rgba(8,14,26,0.06);
		overflow: hidden;
		transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
	}
	.why-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--steel), var(--silver));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s ease;
	}
	.why-card:hover {
		transform: translateY(-6px);
		background: white;
		border-color: rgba(36,64,107,0.15);
		box-shadow: 0 20px 36px -16px rgba(15,23,42,0.2);
	}
	.why-card:hover::before { transform: scaleX(1); }

	.why-icon {
		width: 52px;
		height: 52px;
		background: linear-gradient(135deg, var(--steel), var(--steel-light));
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin-bottom: 1.25rem;
		box-shadow: 0 10px 20px -8px rgba(36,64,107,0.45);
		transition: transform 0.3s ease;
	}
	.why-card:hover .why-icon {
		transform: scale(1.08) rotate(-4deg);
	}

	.why-card h3 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}
	.why-card p { font-size: 0.85rem; color: var(--muted); line-height: 1.65; }

	/* ── NETWORK ── */
	.network-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.network-card {
		position: relative;
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: var(--radius-xl);
		padding: 2rem 1.75rem;
		overflow: hidden;
		transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
	}
	.network-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--silver), var(--platinum));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s ease;
	}
	.network-card:hover {
		transform: translateY(-6px);
		background: rgba(255,255,255,0.08);
		border-color: rgba(154,164,178,0.35);
		box-shadow: 0 20px 36px -18px rgba(0,0,0,0.5);
	}
	.network-card:hover::before { transform: scaleX(1); }

	.network-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 800;
		color: var(--silver);
		background: rgba(154,164,178,0.12);
		border: 1px solid rgba(154,164,178,0.25);
		border-radius: 10px;
		line-height: 1;
		margin-bottom: 1.25rem;
	}

	.network-card h3 {
		font-family: var(--font-heading);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: white;
		margin-bottom: 0.5rem;
	}
	.network-card p { font-size: 0.85rem; color: rgba(255,255,255,0.55); line-height: 1.65; }

	/* ── COMPANIES ── */
	.companies-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	/* Scroll-triggered reveal */
	.companies-section .companies-grid > .company-card {
		opacity: 0;
		transform: translateY(28px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}
	.companies-section.revealed .companies-grid > .company-card {
		opacity: 1;
		transform: translateY(0);
	}
	.companies-section .companies-grid > .company-card:nth-child(1) { transition-delay: 0.05s; }
	.companies-section .companies-grid > .company-card:nth-child(2) { transition-delay: 0.12s; }
	.companies-section .companies-grid > .company-card:nth-child(3) { transition-delay: 0.19s; }
	.companies-section .companies-grid > .company-card:nth-child(4) { transition-delay: 0.26s; }
	.companies-section .companies-grid > .company-card:nth-child(5) { transition-delay: 0.33s; }
	.companies-section .companies-grid > .company-card:nth-child(6) { transition-delay: 0.4s; }

	.companies-section .section-cta {
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
	}
	.companies-section.revealed .section-cta {
		opacity: 1;
		transform: translateY(0);
	}

	.company-card {
		position: relative;
		background: var(--soft-white);
		border-radius: var(--radius-xl);
		padding: 1.85rem;
		border: 1px solid rgba(8,14,26,0.06);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
	}
	.company-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: linear-gradient(90deg, var(--steel), var(--silver));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s ease;
	}
	.company-card:hover {
		transform: translateY(-6px);
		background: white;
		border-color: rgba(36,64,107,0.15);
		box-shadow: 0 20px 36px -18px rgba(15,23,42,0.18);
	}
	.company-card:hover::before { transform: scaleX(1); }

	.company-top { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.25rem; }

	.company-avatar {
		width: 46px; height: 46px;
		border-radius: 12px;
		display: flex; align-items: center; justify-content: center;
		font-family: var(--font-heading);
		font-size: 0.85rem; font-weight: 700;
		color: white; flex-shrink: 0;
		box-shadow: 0 8px 16px -8px rgba(0,0,0,0.4);
		transition: transform 0.3s ease;
	}
	.company-card:hover .company-avatar { transform: scale(1.08); }

	.company-meta { display: flex; flex-direction: column; gap: 0.15rem; }

	.company-category {
		font-size: 0.68rem;
		font-weight: 700;
		color: var(--steel);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.company-city { font-size: 0.75rem; color: var(--muted); }

	.company-name {
		font-family: var(--font-heading);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}

	.company-desc {
		font-size: 0.83rem;
		color: var(--muted);
		line-height: 1.65;
		flex: 1;
		margin-bottom: 1.4rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.company-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--steel);
		background: rgba(36,64,107,0.06);
		text-decoration: none;
		padding: 0.65rem 1rem;
		border-radius: 9px;
		text-align: center;
		transition: background 0.2s ease, color 0.2s ease, gap 0.2s ease;
	}
	.company-btn svg { transition: transform 0.2s ease; }
	.company-btn:hover {
		background: var(--steel);
		color: white;
		gap: 0.6rem;
	}
	.company-btn:hover svg { transform: translateX(2px); }

	/* ── INVESTMENTS ── */
	.investments-section {
		position: relative;
	}
	.investments-glow {
		position: absolute;
		top: -20%;
		left: 50%;
		transform: translateX(-50%);
		width: 700px;
		height: 400px;
		background: radial-gradient(ellipse at center, rgba(154,164,178,0.14) 0%, transparent 70%);
		pointer-events: none;
		z-index: 0;
	}
	.investments-section .container {
		position: relative;
		z-index: 1;
	}

	.invest-marquee {
		position: relative;
		z-index: 1;
		overflow: hidden;
		margin-bottom: 0.5rem;
		-webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
		mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
	}

	.invest-track {
		display: flex;
		width: max-content;
		gap: 0.85rem;
		animation: invest-scroll 26s linear infinite;
	}

	.invest-marquee:hover .invest-track {
		animation-play-state: paused;
	}

	@keyframes invest-scroll {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}

	.invest-chip {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		white-space: nowrap;
		gap: 0.55rem;
		font-family: var(--font-sans);
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: rgba(255,255,255,0.85);
		background: rgba(255,255,255,0.07);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border: 1px solid rgba(255,255,255,0.16);
		border-radius: 50px;
		padding: 0.7rem 1.5rem;
		text-decoration: none;
		box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 8px 16px -12px rgba(0,0,0,0.5);
		transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
	}
	.invest-chip-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--silver);
		flex-shrink: 0;
		transition: background 0.25s ease;
	}
	.invest-chip svg {
		opacity: 0.5;
		transition: opacity 0.25s ease, transform 0.25s ease;
	}
	.invest-chip:hover {
		transform: translateY(-3px) scale(1.03);
		background: linear-gradient(135deg, var(--platinum), var(--silver));
		border-color: transparent;
		color: var(--navy);
		box-shadow: 0 14px 26px -12px rgba(0,0,0,0.45);
	}
	.invest-chip:hover .invest-chip-dot { background: var(--navy); }
	.invest-chip:hover svg { opacity: 1; transform: translate(1px, -1px); }

	/* ── DIASPORA ── */
	.diaspora-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;
	}

	.diaspora-text .section-tag { margin-bottom: 1rem; }

	.diaspora-text h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 3.5vw, 2.5rem);
		font-weight: 800;
		color: var(--navy);
		letter-spacing: -0.03em;
		margin-bottom: 1rem;
	}

	.diaspora-text .section-sub { margin-bottom: 1.75rem; }

	.diaspora-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		margin-bottom: 2rem;
	}

	.diaspora-list li a {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-size: 0.9rem;
		color: var(--navy);
		font-weight: 500;
		text-decoration: none;
		transition: color 0.2s;
	}

	.diaspora-list li a:hover {
		color: var(--steel);
	}

	.diaspora-dot {
		width: 7px; height: 7px;
		background: var(--steel);
		border-radius: 50%;
		flex-shrink: 0;
	}

	.diaspora-visual { display: none; align-items: center; justify-content: center; }

	.diaspora-globe {
		width: clamp(200px, 30vw, 340px);
		opacity: 0.8;
	}

	/* ── SERVICES ── */
	.services-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.service-card {
		position: relative;
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: var(--radius-xl);
		padding: 2rem 1.75rem;
		overflow: hidden;
		transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
	}
	.service-card::after {
		content: '';
		position: absolute;
		top: -40%;
		right: -20%;
		width: 160px;
		height: 160px;
		background: radial-gradient(circle, rgba(154,164,178,0.16) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.35s ease;
	}
	.service-card:hover {
		transform: translateY(-6px);
		background: rgba(255,255,255,0.08);
		border-color: rgba(154,164,178,0.3);
		box-shadow: 0 20px 36px -18px rgba(0,0,0,0.5);
	}
	.service-card:hover::after { opacity: 1; }

	.service-num {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 46px;
		height: 46px;
		border-radius: 50%;
		background: rgba(154,164,178,0.1);
		border: 1.5px solid rgba(154,164,178,0.35);
		margin-bottom: 1.25rem;
		transition: border-color 0.3s ease, background 0.3s ease;
	}
	.service-num span {
		font-family: var(--font-heading);
		font-size: 0.85rem;
		font-weight: 800;
		color: var(--silver);
	}
	.service-card:hover .service-num {
		background: linear-gradient(135deg, var(--silver), var(--platinum));
		border-color: transparent;
	}
	.service-card:hover .service-num span { color: var(--navy); }

	.service-card h3 {
		position: relative;
		z-index: 1;
		font-family: var(--font-heading);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: white;
		margin-bottom: 0.5rem;
	}
	.service-card p {
		position: relative;
		z-index: 1;
		font-size: 0.85rem;
		color: rgba(255,255,255,0.55);
		line-height: 1.65;
	}

	/* ── FINAL CTA ── */
	.cta-bento {
		padding: clamp(64px, 10vw, 120px) var(--section-px);
		text-align: center;
	}

	.cta-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 300px;
		background: radial-gradient(ellipse at center, rgba(154,164,178,0.12) 0%, transparent 70%);
		pointer-events: none;
	}

	.cta-inner {
		position: relative;
		z-index: 1;
	}

	.cta-inner h2 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		color: white;
		letter-spacing: -0.04em;
		margin-bottom: 1rem;
	}

	.cta-inner p {
		font-size: 1.05rem;
		color: rgba(255,255,255,0.55);
		margin-bottom: 2.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	/* ── Responsive (mobile-first) ── */
	@media (min-width: 480px) {
		.hero-btns { flex-direction: row; flex-wrap: wrap; align-items: normal; }
	}
	@media (min-width: 600px) {
		.why-grid { grid-template-columns: repeat(2, 1fr); }
		.network-grid { grid-template-columns: repeat(2, 1fr); }
		.companies-grid { grid-template-columns: repeat(2, 1fr); }
		.services-grid { grid-template-columns: repeat(2, 1fr); }
		.hero-scroll { bottom: 2rem; }
	}
	@media (min-width: 768px) {
		.why-grid { grid-template-columns: repeat(3, 1fr); }
		.hero-bento { min-height: 82vh; }
	}
	@media (min-width: 1024px) {
		.stats-bento { grid-template-columns: repeat(4, 1fr); }
		.network-grid { grid-template-columns: repeat(4, 1fr); }
		.companies-grid { grid-template-columns: repeat(3, 1fr); }
		.services-grid { grid-template-columns: repeat(3, 1fr); }
		.diaspora-layout { grid-template-columns: 1fr 1fr; gap: 6rem; }
		.diaspora-visual { display: flex; }
	}
	@media (min-width: 1200px) {
		.why-grid { grid-template-columns: repeat(5, 1fr); }
	}
</style>

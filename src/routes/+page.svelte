<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms as companies, visibleFirmSlugs } from '$lib/data';
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import AdPlaceholder from '$lib/components/AdPlaceholder.svelte';
	import { investmentCategorySlugs, b2bItemSlugs } from '$lib/data';
	import { industryOptions, locationOptions, sectors, sectorCount, visibleDomestic } from '$lib/search';
	import { investors } from '$lib/data';
	import { platformModules } from '$lib/platform';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import PlatformCarousel from '$lib/components/PlatformCarousel.svelte';
	import ListingStatus from '$lib/components/ListingStatus.svelte';
	import { enquiryUrl } from '$lib/enquiry';

	// Business ecosystem: only sectors with visible companies in the directory
	const ecoSectors = sectors
		.map((s) => ({ id: s.id, count: sectorCount(s.id) }))
		.filter((s) => s.count > 0);

	// Options for the business search panel come from the company data
	const searchIndustries = $derived(industryOptions(i18n.lang));
	const searchLocations = locationOptions();

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

	// Statistics are computed from the actual data (no hard-coded numbers).
	// Only the last tile (EU export markets) is a text value from the translations.
	const directoryCount = visibleDomestic.length + investors.length;
	const sectorTotal = sectors.filter((s) => sectorCount(s.id) > 0).length;
	const statTargets = [directoryCount, sectorTotal, investmentCategorySlugs.length];

	let statsSection: HTMLElement;
	// Start at the real values so server-rendered HTML and no-JS visitors never see zeros
	let statsCounts = $state<number[]>([...statTargets]);
	let counted = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting || counted) return;
				counted = true;
				observer.disconnect();
				if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

				const duration = 1600;
				const startTime = performance.now();
				function tick(now: number) {
					const progress = Math.min((now - startTime) / duration, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					statsCounts = statTargets.map((t) => Math.max(1, Math.round(t * eased)));
					if (progress < 1) requestAnimationFrame(tick);
					else statsCounts = [...statTargets];
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
	<title>{i18n.t.seo.homeTitle}</title>
	<meta name="description" content={i18n.t.seo.homeDesc} />
	<meta property="og:title" content={i18n.t.seo.homeTitle} />
	<meta property="og:description" content={i18n.t.seo.homeDesc} />
</svelte:head>

<div class="home-wrap">

	<!-- ─── HERO BENTO ─── -->
	<section class="bento hero-bento reveal-card" use:reveal>
		<video class="hero-video" src="/hero-video.mp4" autoplay muted loop playsinline aria-hidden="true"></video>
		<div class="hero-overlay"></div>
		<div class="hero-vignette"></div>
		<div class="hero-grain"></div>

		<!-- Editorial frame: thin corner marks + coordinates -->
		<span class="hero-corner tl" aria-hidden="true"></span>
		<span class="hero-corner tr" aria-hidden="true"></span>
		<span class="hero-corner bl" aria-hidden="true"></span>
		<span class="hero-corner br" aria-hidden="true"></span>
		<span class="hero-coords" aria-hidden="true">44.76° N · 19.21° E</span>

		<div class="hero-content">
			<span class="hero-tag"><span class="hero-tag-dot"></span>{i18n.t.hero.tag}</span>
			<h1 class="hero-headline">{i18n.t.hero.headline}</h1>
			<p class="hero-subheading">{i18n.t.hero.subheading}</p>
			<p class="hero-sub">{i18n.t.hero.sub}</p>
			<div class="hero-btns">
				<a href="#platforma" class="btn-primary hero-primary">
					{i18n.t.hero.ctaPlatform}
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
				</a>
				<a href="/firme" class="btn-ghost">{i18n.t.hero.ctaCompanies}</a>
				<a href="/kontakt?tip=registracija" class="btn-ghost">{i18n.t.nav.listCta}</a>
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

	<!-- ─── BUSINESS SEARCH (submits to /firme as ?q=&cat=&city=) ─── -->
	<section class="bento search-bento reveal-card" use:reveal aria-labelledby="biz-search-title">
		<div class="search-glow" aria-hidden="true"></div>
		<div class="search-inner">
			<span class="search-eyebrow"><span class="search-eyebrow-dot"></span>{i18n.t.nav.search}</span>
			<h2 id="biz-search-title" class="search-title">{i18n.t.bizSearch.heading}</h2>
			<p class="search-desc">{i18n.t.bizSearch.desc}</p>

			<form class="biz-search" action="/firme" method="get" role="search">
				<div class="bs-field bs-query">
					<svg class="bs-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
					</svg>
					<input
						name="q"
						type="search"
						placeholder={i18n.t.bizSearch.placeholder}
						aria-label={i18n.t.bizSearch.placeholder}
						autocomplete="off"
					/>
				</div>
				<div class="bs-field bs-select">
					<span class="bs-tile" aria-hidden="true">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
					</span>
					<div class="bs-select-body">
						<label for="bs-cat">{i18n.t.bizSearch.industry}</label>
						<select id="bs-cat" name="cat">
							<option value="">{i18n.t.bizSearch.allIndustries}</option>
							{#each searchIndustries as cat}
								<option value={cat}>{cat}</option>
							{/each}
						</select>
					</div>
					<svg class="bs-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
				</div>
				<div class="bs-field bs-select">
					<span class="bs-tile" aria-hidden="true">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
					</span>
					<div class="bs-select-body">
						<label for="bs-city">{i18n.t.bizSearch.location}</label>
						<select id="bs-city" name="city">
							<option value="">{i18n.t.bizSearch.allLocations}</option>
							{#each searchLocations as city}
								<option value={city}>{city}</option>
							{/each}
						</select>
					</div>
					<svg class="bs-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
				</div>
				<button type="submit" class="btn-primary bs-submit">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
						<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
					</svg>
					{i18n.t.bizSearch.cta}
				</button>
			</form>

			<!-- Quick links: sectors that actually have companies, largest first -->
			<div class="bs-chips">
				<span class="bs-chips-label">{i18n.t.bizSearch.popular}</span>
				{#each [...ecoSectors].sort((a, b) => b.count - a.count).slice(0, 5) as sector (sector.id)}
					<a href="/firme?sector={sector.id}" class="bs-chip">
						{i18n.t.ecosystem.sectors[sector.id]}
						<span class="bs-chip-count">{sector.count}</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- ─── STATS ─── -->
	<div class="stats-bento" id="below-hero" bind:this={statsSection}>
		{#each i18n.t.stats as stat, i}
			<div class="stat-tile reveal-card" use:reveal={{ delay: i * 90 }}>
				<span class="stat-value">
					{#if i < statTargets.length}
						{statsCounts[i]}
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
				<p class="section-sub">{i18n.t.why.sub}</p>
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

	<!-- ─── PLATFORM (compact module overview; target of the hero's primary CTA) ─── -->
	<section id="platforma" class="bento bento-dark platform-section reveal-card" use:reveal>
		<div class="container">
			<div class="section-header section-header-light">
				<span class="section-tag-light">{i18n.t.platform.label}</span>
				<h2>{i18n.t.platform.heading}</h2>
				<p class="section-sub-light">{i18n.t.platform.desc}</p>
			</div>
			<div class="network-grid">
				{#each i18n.t.platform.modules as mod, i}
					{@const meta = platformModules[i]}
					<a href={meta.href} class="network-card module-card">
						<div class="module-top">
							<span class="network-num">{String(i + 1).padStart(2, '0')}</span>
							{#if meta.status}
								<span class="module-status">
									{meta.status === 'dev' ? i18n.t.platform.statusDev : i18n.t.platform.statusSoon}
								</span>
							{/if}
						</div>
						<h3>{mod.title}</h3>
						<p>{mod.desc}</p>
						<span class="module-cta">
							{mod.cta}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</span>
					</a>
				{/each}
			</div>
			<div class="section-cta">
				<a href="/platforma" class="btn-primary">{i18n.t.platform.more}</a>
			</div>
		</div>
	</section>

	<!-- ─── BUSINESS ECOSYSTEM (sectors built from directory categories) ─── -->
	<section class="bento bento-light reveal-card" use:reveal>
		<div class="container">
			<div class="section-header">
				<span class="section-tag">{i18n.t.ecosystem.label}</span>
				<h2>{i18n.t.ecosystem.heading}</h2>
				<p class="section-sub">{i18n.t.ecosystem.desc}</p>
			</div>
			<div class="eco-grid">
				{#each ecoSectors as sector (sector.id)}
					<a href="/firme?sector={sector.id}" class="eco-card">
						<span class="eco-top">
							<span class="eco-icon" aria-hidden="true">
								{#if sector.id === 'poljoprivreda-hrana'}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22V12"/><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z"/><path d="M12 15c0-4 3-7 8-7 0 4-3 7-8 7z"/></svg>
								{:else if sector.id === 'proizvodnja'}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 21h20"/><path d="M4 21V10l6 4V10l6 4V5h4v16"/></svg>
								{:else if sector.id === 'gradjevina'}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21v-3h2v3"/></svg>
								{:else if sector.id === 'trgovina'}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
								{:else if sector.id === 'transport'}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="14" height="12"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>
								{:else if sector.id === 'it'}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M9 8l-2 2 2 2M15 8l2 2-2 2"/></svg>
								{:else if sector.id === 'usluge'}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M2 13h20"/></svg>
								{:else}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 20V9l9-6 9 6v11"/><path d="M9 20v-6h6v6"/><path d="M3 20h18"/></svg>
								{/if}
							</span>
							<span class="eco-count">{i18n.t.ecosystem.companies}: <strong>{sector.count}</strong></span>
						</span>
						<span class="eco-name">{i18n.t.ecosystem.sectors[sector.id]}</span>
						<span class="eco-meta">
							<span class="eco-go">
								{i18n.t.ecosystem.explore}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
							</span>
						</span>
					</a>
				{/each}
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
						<ListingStatus slug={company.slug} name={company.name} />
						<h3 class="company-name">{company.name}</h3>
						<p class="company-desc">{i18n.lang === 'sr' ? company.desc_sr : company.desc_en}</p>
						<a href={enquiryUrl('b2b', company.name)} class="company-btn">
							{i18n.t.companies.inquire}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
						</a>
						<ListingStatus slug={company.slug} name={company.name} part="claim" />
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

	<!-- ─── HOW IT WORKS ─── -->
	<section class="bento bento-light reveal-card" use:reveal>
		<div class="container">
			<HowItWorks />
		</div>
	</section>

	<!-- ─── ZOE MILANO REGIONAL PLATFORMS (manual carousel) ─── -->
	<section class="bento bento-dark reveal-card" use:reveal>
		<div class="container">
			<PlatformCarousel />
		</div>
	</section>

	<!-- ─── FINAL CTA ─── -->
	<section class="bento bento-dark cta-bento reveal-card" use:reveal>
		<div class="cta-glow"></div>
		<div class="cta-inner">
			<h2>{i18n.t.joinCta.heading}</h2>
			<p>{i18n.t.joinCta.desc}</p>
			<ul class="cta-benefits">
				{#each i18n.t.joinCta.benefits as benefit}
					<li>
						<span class="cta-check" aria-hidden="true">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
						</span>
						{benefit}
					</li>
				{/each}
			</ul>
			<div class="cta-btns">
				<a href="/kontakt?tip=registracija" class="btn-primary btn-lg">{i18n.t.nav.listCta}</a>
				<a href="/oglasi" class="btn-cta-ghost">{i18n.t.joinCta.promote}</a>
			</div>
		</div>
	</section>

</div>

<style>
	/* ── Page canvas ── */
	.home-wrap {
		max-width: 1440px;
		margin: 0 auto;
		padding: calc(var(--nav-h) + 1.25rem) clamp(1rem, 3vw, 2rem) 3rem;
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
		background: var(--surface-light);
		color: var(--dark);
		padding: var(--section-py) var(--section-px);
		border: 1px solid rgba(255,255,255,0.4);
		box-shadow: var(--shadow-light-raised);
	}
	.bento-dark {
		background: var(--surface-dark);
		color: white;
		padding: var(--section-py) var(--section-px);
		border: 1px solid rgba(255,255,255,0.05);
		box-shadow: var(--shadow-dark-raised);
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
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--steel);
		background: rgba(36,64,107,0.08);
		border: 1px solid rgba(36,64,107,0.2);
		padding: 0.35rem 0.95rem;
		border-radius: 50px;
		margin-bottom: 1rem;
	}
	.section-tag-light {
		display: inline-block;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--silver);
		background: rgba(154,164,178,0.1);
		border: 1px solid rgba(154,164,178,0.25);
		padding: 0.35rem 0.95rem;
		border-radius: 50px;
		margin-bottom: 1rem;
	}

	.section-header h2,
	.section-header-light h2 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 4vw, 3.2rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.08;
		color: var(--navy);
		margin-bottom: 1rem;
		text-wrap: balance;
	}
	/* Short red accent line under every section heading */
	.section-header h2::after,
	.diaspora-text h2::after {
		content: '';
		display: block;
		width: 56px;
		height: 4px;
		margin: 1.1rem auto 0;
		border-radius: 2px;
		background: var(--accent-line);
	}
	.diaspora-text h2::after { margin-left: 0; }
	/* Brighter red so the accent reads on blue sections */
	.section-header-light h2::after { background: linear-gradient(90deg, #e0414f, #f06a75); }
	.section-header-light h2 { color: white; }

	.section-sub { font-size: 1.1rem; color: #4a525e; line-height: 1.65; }
	.section-sub-light { font-size: 1.1rem; color: rgba(250,249,246,0.88); line-height: 1.65; }

	.section-cta { text-align: center; margin-top: 3.5rem; }

	/* ── Buttons ── */
	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--cta-text);
		background: var(--cta);
		text-decoration: none;
		padding: 0.95rem 2.1rem;
		border-radius: 10px;
		transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 10px 24px -8px rgba(155,17,30,0.55), inset 0 1px 0 rgba(255,255,255,0.18);
	}
	.btn-primary:hover {
		background: var(--cta-hover);
		transform: translateY(-2px);
		box-shadow: 0 16px 32px -10px rgba(155,17,30,0.6), inset 0 1px 0 rgba(255,255,255,0.18);
	}
	.btn-primary.btn-lg { padding: 1.1rem 2.75rem; font-size: 1.15rem; }

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 500;
		color: rgba(255,255,255,0.8);
		background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.2);
		text-decoration: none;
		padding: 0.95rem 2.1rem;
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
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--steel);
		background: transparent;
		border: 1.5px solid var(--steel);
		text-decoration: none;
		padding: 0.95rem 2.1rem;
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
		border: none;
		/* Crisp edge: defined navy outline + short, tight shadows */
		box-shadow:
			0 0 0 1px rgba(8,37,72,0.45),
			0 2px 3px rgba(8,37,72,0.22),
			0 10px 18px -10px rgba(8,37,72,0.45);
	}

	/* Fine light inner edge drawn above the video */
	.hero-bento::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow:
			inset 0 0 0 1px rgba(250,249,246,0.18),
			inset 0 1px 0 rgba(250,249,246,0.35);
		pointer-events: none;
		z-index: 3;
	}

	.hero-video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		/* Slow cinematic push-in */
		animation: hero-push 28s ease-in-out infinite alternate;
		transform-origin: 50% 45%;
	}
	@keyframes hero-push {
		from { transform: scale(1.02); }
		to   { transform: scale(1.12); }
	}

	/* Soft edge darkening keeps focus on the centred copy */
	.hero-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 75% 70% at 50% 46%, transparent 40%, rgba(5,18,38,0.55) 100%);
		pointer-events: none;
	}

	/* Fine film grain for a printed, premium texture */
	.hero-grain {
		position: absolute;
		inset: 0;
		opacity: 0.09;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		pointer-events: none;
	}

	/* Editorial corner marks */
	.hero-corner {
		position: absolute;
		width: 28px;
		height: 28px;
		border: 0 solid rgba(250,249,246,0.55);
		z-index: 2;
		pointer-events: none;
	}
	.hero-corner.tl { top: 1.5rem; left: 1.5rem; border-top-width: 1.5px; border-left-width: 1.5px; }
	.hero-corner.tr { top: 1.5rem; right: 1.5rem; border-top-width: 1.5px; border-right-width: 1.5px; }
	.hero-corner.bl { bottom: 1.5rem; left: 1.5rem; border-bottom-width: 1.5px; border-left-width: 1.5px; }
	.hero-corner.br { bottom: 1.5rem; right: 1.5rem; border-bottom-width: 1.5px; border-right-width: 1.5px; }

	.hero-coords {
		position: absolute;
		left: calc(1.5rem + 40px);
		bottom: 1.55rem;
		z-index: 2;
		font-family: var(--font-sans);
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.22em;
		color: rgba(250,249,246,0.75);
		text-shadow: 0 1px 6px rgba(0,0,0,0.6);
		pointer-events: none;
		display: none;
	}
	@media (min-width: 900px) {
		.hero-coords { display: block; }
		.hero-corner { width: 36px; height: 36px; }
		.hero-corner.tl, .hero-corner.tr { top: 2rem; }
		.hero-corner.bl, .hero-corner.br { bottom: 2rem; }
		.hero-corner.tl, .hero-corner.bl { left: 2rem; }
		.hero-corner.tr, .hero-corner.br { right: 2rem; }
		.hero-coords { left: calc(2rem + 52px); bottom: 2.05rem; }
	}

	/* Staggered entrance */
	.hero-content > * {
		animation: hero-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}
	.hero-content > :nth-child(1) { animation-delay: 0.1s; }
	.hero-content > :nth-child(2) { animation-delay: 0.22s; }
	.hero-content > :nth-child(3) { animation-delay: 0.36s; }
	.hero-content > :nth-child(4) { animation-delay: 0.48s; }
	.hero-content > :nth-child(5) { animation-delay: 0.6s; }
	@keyframes hero-rise {
		from { opacity: 0; transform: translateY(18px); }
		to   { opacity: 1; transform: none; }
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-video, .hero-content > *, .hero-tag-dot::after { animation: none; }
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		/* Navy tint (same family as the blue sections), lighter in the middle */
		background: linear-gradient(
			to bottom,
			rgba(11,52,102,0.50) 0%,
			rgba(11,52,102,0.28) 50%,
			rgba(8,37,72,0.72) 100%
		);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 1120px;
		padding: 3rem var(--section-px) 7rem; /* bottom room for the scroll hint */
		color: white;
		pointer-events: none;
	}

	.hero-tag {
		display: inline-block;
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #FAF9F6;
		margin-bottom: 1.5rem;
		padding: 0.55rem 1.25rem;
		border-radius: 50px;
		background: rgba(8,37,72,0.55);
		border: 1px solid rgba(250,249,246,0.25);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: 0 8px 20px -10px rgba(0,0,0,0.5);
		text-shadow: 0 1px 4px rgba(0,0,0,0.4);
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
	}

	/* Live red dot in the location pill */
	.hero-tag-dot {
		position: relative;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #e0414f;
		flex-shrink: 0;
	}
	.hero-tag-dot::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: #e0414f;
		animation: dot-pulse 2.4s ease-out infinite;
	}
	@keyframes dot-pulse {
		from { transform: scale(1); opacity: 0.7; }
		to   { transform: scale(3); opacity: 0; }
	}

	.hero-headline {
		font-family: var(--font-heading);
		font-size: clamp(2.4rem, 5.2vw, 4.6rem);
		font-weight: 800;
		line-height: 1.04;
		text-wrap: balance;
		letter-spacing: -0.04em;
		color: white;
		margin-bottom: 1.25rem;
		/* Subtle top-lit sheen on the type */
		background: linear-gradient(180deg, #ffffff 30%, #e4e8ef 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		filter: drop-shadow(0 2px 18px rgba(5,15,35,0.45));
	}

	/* Supporting heading under the headline */
	.hero-subheading {
		font-family: var(--font-heading);
		font-size: clamp(1.2rem, 2.4vw, 1.75rem);
		font-weight: 700;
		letter-spacing: -0.01em;
		color: #FAF9F6;
		margin-bottom: 1rem;
		text-shadow: 0 1px 3px rgba(5,15,35,0.9), 0 2px 14px rgba(5,15,35,0.7);
	}
	.hero-subheading::after {
		content: '';
		display: block;
		width: 56px;
		height: 3px;
		margin: 0.85rem auto 0;
		border-radius: 2px;
		background: linear-gradient(90deg, #e0414f, #f06a75);
	}

	/* Jump target of the hero's primary CTA: clear the fixed navbar */
	.platform-section { scroll-margin-top: calc(var(--nav-h) + 1rem); }

	.hero-sub {
		font-size: clamp(1.1rem, 1.9vw, 1.3rem);
		font-weight: 500;
		color: #FAF9F6;
		text-shadow: 0 1px 3px rgba(5,15,35,0.9), 0 2px 14px rgba(5,15,35,0.8), 0 0 28px rgba(5,15,35,0.5);
		line-height: 1.6;
		max-width: 780px;
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

	.hero-btns .btn-primary,
	.hero-btns .btn-ghost {
		font-size: 20px;
		font-weight: 600;
		padding: 1.05rem 2.4rem;
	}

	/* Narrow screens: keep the location pill compact */
	@media (max-width: 640px) {
		.hero-tag { font-size: 0.72rem; letter-spacing: 0.1em; padding: 0.5rem 0.9rem; }
	}

	/* Narrow screens: stacked buttons share one width */
	@media (max-width: 819px) {
		.hero-btns { align-items: center; }
		.hero-btns > a { width: 100%; max-width: 320px; }
	}

	/* Primary CTA: arrow + light sweep on hover */
	.hero-btns .hero-primary {
		position: relative;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.65rem;
		box-shadow: 0 12px 28px -10px rgba(155,17,30,0.75), inset 0 1px 0 rgba(255,255,255,0.18);
		transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
	}
	.hero-primary svg { transition: transform 0.25s; }
	.hero-primary::before {
		content: '';
		position: absolute;
		top: 0;
		left: -60%;
		width: 40%;
		height: 100%;
		background: linear-gradient(100deg, transparent, rgba(255,255,255,0.28), transparent);
		transform: skewX(-20deg);
		transition: left 0.6s ease;
	}
	.hero-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 34px -12px rgba(155,17,30,0.85), inset 0 1px 0 rgba(255,255,255,0.18); }
	.hero-primary:hover::before { left: 120%; }
	.hero-primary:hover svg { transform: translateX(4px); }

	.hero-btns .btn-ghost {
		transition: background 0.25s, border-color 0.25s, transform 0.25s;
		color: #FAF9F6;
		background: rgba(8,37,72,0.5);
		border: 1px solid rgba(250,249,246,0.6);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}

	.hero-btns .btn-ghost:hover {
		background: var(--cta);
		border-color: var(--cta);
		transform: translateY(-2px);
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
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #FAF9F6;
		text-shadow: 0 1px 8px rgba(0,0,0,0.7);
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

	/* ── BUSINESS SEARCH ── */
	.search-bento {
		background: var(--surface-light);
		box-shadow: var(--shadow-light-raised);
		padding: clamp(2.5rem, 5vw, 4rem) var(--section-px);
	}
	.search-inner {
		max-width: 1120px;
		margin: 0 auto;
		text-align: center;
	}
	.search-title {
		font-family: var(--font-heading);
		font-size: clamp(1.8rem, 3.6vw, 2.8rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.1;
		color: var(--navy);
		text-wrap: balance;
		margin-bottom: 0.85rem;
	}
	.search-desc {
		font-size: 1.1rem;
		color: #4a525e;
		line-height: 1.6;
		max-width: 680px;
		margin: 0 auto 2.25rem;
	}

	/* One white search bar split into segments */
	.biz-search {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		text-align: left;
		background: #ffffff;
		border: 1px solid rgba(15,23,42,0.1);
		border-radius: 20px;
		padding: 0.75rem;
		box-shadow: 0 20px 44px -22px rgba(8,37,72,0.35), 0 4px 10px -6px rgba(8,37,72,0.15);
	}
	.bs-field {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 64px;
		padding: 0.4rem 1rem;
		border-radius: 14px;
		background: #f6f7f9;
		transition: background 0.2s, box-shadow 0.2s;
	}
	.bs-field:focus-within {
		background: #ffffff;
		box-shadow: inset 0 0 0 2px var(--steel);
	}
	.bs-query {
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
	}
	.bs-icon { color: var(--steel); flex-shrink: 0; }
	.bs-query input {
		flex: 1;
		min-width: 0;
		border: none;
		background: transparent;
		font: inherit;
		font-size: 1.05rem;
		color: var(--dark);
		outline: none;
		padding: 0.5rem 0;
	}
	.bs-query input::placeholder { color: #6b7380; }
	.bs-select label {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--steel);
	}
	.bs-select select {
		border: none;
		background: transparent;
		font: inherit;
		font-size: 1rem;
		font-weight: 600;
		color: var(--dark);
		outline: none;
		padding: 0.15rem 0;
		cursor: pointer;
	}
	.bs-submit {
		gap: 0.6rem;
		min-height: 64px;
		border: none;
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-weight: 700;
		border-radius: 14px;
	}

	/* Desktop: full-width search field, filters + button on the row below */
	@media (min-width: 900px) {
		.biz-search {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
			gap: 0.6rem;
		}
		.bs-query { grid-column: 1 / -1; min-height: 72px; }
		.bs-query input { font-size: 1.15rem; }
		.bs-submit { padding-left: 2.25rem; padding-right: 2.25rem; }
	}

	/* ── Business search: premium layer ── */
	.search-bento {
		position: relative;
		overflow: hidden;
		background:
			radial-gradient(circle at 1px 1px, rgba(11,52,102,0.09) 1px, transparent 0) 0 0 / 22px 22px,
			linear-gradient(180deg, #ffffff 0%, #f7f6f2 100%);
	}
	/* Dot grid fades out toward the centre so the copy stays clean */
	.search-bento::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 60% 70% at 50% 45%, #fcfbf8 35%, rgba(252,251,248,0) 80%);
		pointer-events: none;
	}
	.search-glow {
		position: absolute;
		left: 50%;
		bottom: -40%;
		width: 80%;
		height: 70%;
		transform: translateX(-50%);
		background: radial-gradient(ellipse at center, rgba(11,52,102,0.14), transparent 65%);
		filter: blur(20px);
		pointer-events: none;
	}
	.search-inner { position: relative; z-index: 1; }

	.search-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1.25rem;
		padding: 0.45rem 1.05rem;
		border-radius: 50px;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--navy);
		background: #ffffff;
		border: 1px solid rgba(11,52,102,0.14);
		box-shadow: 0 6px 16px -10px rgba(8,37,72,0.35);
	}
	.search-eyebrow-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--cta);
		box-shadow: 0 0 0 4px rgba(155,17,30,0.12);
	}
	.search-title::after {
		content: '';
		display: block;
		width: 56px;
		height: 3px;
		margin: 1rem auto 0;
		border-radius: 2px;
		background: linear-gradient(90deg, #9B111E, #e0414f);
	}

	/* Search bar: floating glass card with a fine gradient edge */
	.biz-search {
		position: relative;
		padding: 0.85rem;
		border-radius: 24px;
		border: 1px solid transparent;
		background:
			linear-gradient(#ffffff, #ffffff) padding-box,
			linear-gradient(135deg, rgba(11,52,102,0.28), rgba(155,17,30,0.22) 50%, rgba(11,52,102,0.12)) border-box;
		box-shadow:
			0 40px 70px -40px rgba(8,37,72,0.55),
			0 14px 28px -18px rgba(8,37,72,0.3),
			0 1px 0 rgba(255,255,255,0.9) inset;
	}
	.bs-field {
		background: #f5f6f8;
		border: 1px solid rgba(15,23,42,0.05);
		transition: background 0.2s, box-shadow 0.25s, border-color 0.2s;
	}
	.bs-field:hover { background: #f0f2f5; }
	.bs-field:focus-within {
		background: #ffffff;
		border-color: rgba(155,17,30,0.45);
		box-shadow: 0 0 0 4px rgba(155,17,30,0.1);
	}
	.bs-query .bs-icon { color: var(--cta); }

	.bs-select {
		flex-direction: row;
		align-items: center;
		gap: 0.85rem;
		padding-right: 1.1rem;
	}
	.bs-tile {
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		display: grid;
		place-items: center;
		border-radius: 12px;
		color: var(--navy);
		background: #ffffff;
		border: 1px solid rgba(11,52,102,0.1);
		box-shadow: 0 4px 10px -6px rgba(8,37,72,0.3);
		transition: background 0.2s, color 0.2s, border-color 0.2s;
	}
	.bs-select:focus-within .bs-tile {
		background: var(--cta);
		border-color: var(--cta);
		color: #FAF9F6;
	}
	.bs-select-body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}
	.bs-select select {
		appearance: none;
		-webkit-appearance: none;
		width: 100%;
		padding-right: 1.5rem;
		text-overflow: ellipsis;
	}
	.bs-chevron {
		flex-shrink: 0;
		margin-left: -1.75rem;
		color: var(--steel);
		pointer-events: none;
		transition: transform 0.2s, color 0.2s;
	}
	.bs-select:focus-within .bs-chevron { color: var(--cta); transform: rotate(180deg); }

	.bs-submit {
		position: relative;
		overflow: hidden;
		box-shadow: 0 14px 28px -12px rgba(155,17,30,0.8), inset 0 1px 0 rgba(255,255,255,0.18);
		transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
	}
	.bs-submit::before {
		content: '';
		position: absolute;
		top: 0;
		left: -60%;
		width: 40%;
		height: 100%;
		background: linear-gradient(100deg, transparent, rgba(255,255,255,0.28), transparent);
		transform: skewX(-20deg);
		transition: left 0.6s ease;
	}
	.bs-submit:hover {
		transform: translateY(-2px);
		box-shadow: 0 18px 32px -12px rgba(155,17,30,0.9), inset 0 1px 0 rgba(255,255,255,0.18);
	}
	.bs-submit:hover::before { left: 120%; }

	/* Popular sector chips */
	.bs-chips {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.6rem;
		margin-top: 1.75rem;
	}
	.bs-chips-label {
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--steel);
		margin-right: 0.25rem;
	}
	.bs-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.5rem 0.6rem 0.5rem 1rem;
		border-radius: 50px;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--navy);
		text-decoration: none;
		background: #ffffff;
		border: 1px solid rgba(11,52,102,0.14);
		box-shadow: 0 4px 12px -8px rgba(8,37,72,0.3);
		transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
	}
	.bs-chip-count {
		min-width: 1.7rem;
		padding: 0.1rem 0.45rem;
		border-radius: 50px;
		font-size: 0.78rem;
		font-weight: 700;
		text-align: center;
		color: var(--navy);
		background: rgba(11,52,102,0.08);
		transition: background 0.2s, color 0.2s;
	}
	.bs-chip:hover {
		background: var(--navy);
		border-color: var(--navy);
		color: #FAF9F6;
		transform: translateY(-2px);
	}
	.bs-chip:hover .bs-chip-count { background: var(--cta); color: #FAF9F6; }

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
		padding: 2.25rem 1rem;
		background: var(--surface-dark);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-dark-raised);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	.stat-tile:hover {
		transform: translateY(-4px);
		box-shadow: 0 36px 64px -24px rgba(8,20,45,0.6), 0 14px 28px -12px rgba(8,20,45,0.4), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.08);
	}

	.stat-value {
		font-family: var(--font-heading);
		font-size: clamp(2.4rem, 3.6vw, 3.2rem);
		font-weight: 800;
		color: #FAF9F6;
		line-height: 1;
		margin-bottom: 0.35rem;
		letter-spacing: -0.04em;
	}

	.stat-label {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #FAF9F6;
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
	.bento-dark.ad-section :global(.ad-dims) { color: rgba(255,255,255, 0.8); }

	/* ── WHY ── */
	.why-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.why-card {
		position: relative;
		background: #ffffff;
		border-radius: var(--radius-xl);
		padding: 2.25rem 1.9rem;
		border: 1px solid rgba(15,23,42,0.07);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12);
		overflow: hidden;
		transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
	}
	.why-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s ease;
	}
	.why-card:hover {
		transform: translateY(-6px);
		border-color: rgba(15,23,42,0.1);
		box-shadow: 0 28px 48px -20px rgba(15,23,42,0.28);
	}
	.why-card:hover::before { transform: scaleX(1); }

	.why-icon {
		width: 58px;
		height: 58px;
		background: linear-gradient(135deg, var(--steel), var(--steel-light));
		border-radius: 16px;
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
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		color: var(--navy);
		margin-bottom: 0.6rem;
	}
	.why-card p { font-size: 0.95rem; color: #4a525e; line-height: 1.65; }

	/* ── NETWORK ── */
	.network-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.network-card {
		position: relative;
		background: linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%);
		border: 1px solid rgba(255,255,255,0.14);
		border-radius: var(--radius-xl);
		padding: 2.25rem 1.9rem;
		overflow: hidden;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 28px -16px rgba(0,0,0,0.5);
		transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
	}
	.network-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s ease;
	}
	.network-card:hover {
		transform: translateY(-6px);
		background: linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%);
		border-color: rgba(250,249,246,0.3);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 28px 48px -20px rgba(0,0,0,0.6);
	}
	.network-card:hover::before { transform: scaleX(1); }

	.network-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		font-family: var(--font-heading);
		font-size: 1.05rem;
		font-weight: 800;
		color: #FAF9F6;
		background: rgba(250,249,246,0.1);
		border: 1px solid rgba(250,249,246,0.3);
		border-radius: 12px;
		transition: background 0.3s ease, border-color 0.3s ease;
		line-height: 1;
		margin-bottom: 1.25rem;
	}

	.network-card h3 {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		color: #FAF9F6;
		margin-bottom: 0.6rem;
	}
	.network-card p { font-size: 0.95rem; color: rgba(250,249,246,0.85); line-height: 1.65; }
	.network-card:hover .network-num { background: var(--cta); border-color: var(--cta); }

	/* ── BUSINESS ECOSYSTEM ── */
	.eco-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}
	.eco-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.9rem 1.75rem;
		background: #ffffff;
		border: 1px solid rgba(15,23,42,0.07);
		border-radius: var(--radius-xl);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12);
		text-decoration: none;
		color: inherit;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
	}
	.eco-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s ease;
	}
	.eco-card:hover {
		transform: translateY(-6px);
		border-color: rgba(15,23,42,0.1);
		box-shadow: 0 28px 48px -20px rgba(15,23,42,0.28);
	}
	.eco-card:hover::before { transform: scaleX(1); }
	.eco-card:focus-visible { outline: 3px solid var(--steel); outline-offset: 3px; }
	.eco-icon {
		width: 56px;
		height: 56px;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		background: linear-gradient(135deg, var(--steel), var(--steel-light));
		box-shadow: 0 10px 20px -8px rgba(36,64,107,0.45);
		transition: transform 0.3s ease, background 0.3s ease;
	}
	.eco-card:hover .eco-icon { transform: scale(1.06); background: var(--cta); }
	.eco-name {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		line-height: 1.25;
		color: var(--navy);
		flex: 1;
	}
	.eco-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
	}
	/* Company count badge next to the icon */
	.eco-count {
		white-space: nowrap;
		font-size: 0.85rem;
		color: #4a525e;
		background: rgba(36,64,107,0.07);
		border: 1px solid rgba(36,64,107,0.14);
		border-radius: 50px;
		padding: 0.3rem 0.75rem;
	}
	.eco-count strong { color: var(--navy); font-weight: 800; }
	.eco-meta {
		display: flex;
		align-items: center;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
		font-size: 0.95rem;
	}
	.eco-go {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-weight: 700;
		color: var(--cta);
		white-space: nowrap;
	}
	.eco-go svg { transition: transform 0.2s ease; }
	.eco-card:hover .eco-go svg { transform: translateX(3px); }

	@media (min-width: 600px) {
		.eco-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.eco-grid { grid-template-columns: repeat(4, 1fr); }
	}

	/* ── PLATFORM MODULE CARDS (extend .network-card) ── */
	.module-card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: inherit;
	}
	.module-card p { flex: 1; margin-bottom: 1.25rem; }
	.module-card:focus-visible { outline: 3px solid #FAF9F6; outline-offset: 3px; }
	.module-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
	}
	/* Availability badge (e.g. U RAZVOJU / IN DEVELOPMENT) */
	.module-status {
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #1a1a1a;
		background: #f2c14e;
		border-radius: 50px;
		padding: 0.3rem 0.7rem;
		white-space: nowrap;
	}
	.module-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		color: #FAF9F6;
		padding-top: 1rem;
		border-top: 1px solid rgba(250,249,246,0.15);
	}
	.module-cta svg { transition: transform 0.2s ease; }
	.module-card:hover .module-cta svg { transform: translateX(3px); }

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
		background: #ffffff;
		border-radius: var(--radius-xl);
		padding: 2rem;
		border: 1px solid rgba(15,23,42,0.07);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12);
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
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s ease;
	}
	.company-card:hover {
		transform: translateY(-6px);
		border-color: rgba(15,23,42,0.1);
		box-shadow: 0 28px 48px -20px rgba(15,23,42,0.28);
	}
	.company-card:hover::before { transform: scaleX(1); }

	.company-top { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1.25rem; }

	.company-avatar {
		width: 52px; height: 52px;
		border-radius: 14px;
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
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--steel);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.company-city { font-size: 0.85rem; color: var(--muted); }

	.company-name {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		color: var(--navy);
		margin-bottom: 0.6rem;
	}

	.company-desc {
		font-size: 0.95rem;
		color: #4a525e;
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
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--steel);
		background: rgba(36,64,107,0.07);
		text-decoration: none;
		padding: 0.85rem 1rem;
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
		background: radial-gradient(ellipse at center, rgba(120,170,240,0.22) 0%, transparent 70%);
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
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: #FAF9F6;
		background: rgba(255,255,255,0.07);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border: 1px solid rgba(255,255,255,0.16);
		border-radius: 50px;
		padding: 0.85rem 1.7rem;
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
		background: #FAF9F6;
		border-color: transparent;
		color: var(--navy);
		box-shadow: 0 14px 26px -12px rgba(0,0,0,0.45);
	}
	.invest-chip:hover .invest-chip-dot { background: var(--cta); }
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
		font-size: clamp(2rem, 4vw, 3.2rem);
		font-weight: 800;
		color: var(--navy);
		letter-spacing: -0.035em;
		line-height: 1.08;
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
		gap: 0.75rem;
		font-size: 1.05rem;
		color: var(--navy);
		font-weight: 600;
		text-decoration: none;
		transition: color 0.2s;
	}

	.diaspora-list li a:hover {
		color: var(--steel);
	}

	.diaspora-dot {
		width: 9px; height: 9px;
		background: var(--cta);
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
		background: linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%);
		border: 1px solid rgba(255,255,255,0.14);
		border-radius: var(--radius-xl);
		padding: 2.25rem 1.9rem;
		overflow: hidden;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 28px -16px rgba(0,0,0,0.5);
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
		background: linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%);
		border-color: rgba(250,249,246,0.3);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), 0 28px 48px -20px rgba(0,0,0,0.6);
	}
	.service-card:hover::after { opacity: 1; }

	.service-num {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: rgba(250,249,246,0.1);
		border: 1.5px solid rgba(250,249,246,0.35);
		margin-bottom: 1.25rem;
		transition: border-color 0.3s ease, background 0.3s ease;
	}
	.service-num span {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 800;
		color: #FAF9F6;
	}
	.service-card:hover .service-num {
		background: var(--cta);
		border-color: var(--cta);
	}

	.service-card h3 {
		position: relative;
		z-index: 1;
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		color: #FAF9F6;
		margin-bottom: 0.6rem;
	}
	.service-card p {
		position: relative;
		z-index: 1;
		font-size: 0.95rem;
		color: rgba(250,249,246,0.85);
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
		width: 900px;
		height: 420px;
		background: radial-gradient(ellipse at center, rgba(155,17,30,0.32) 0%, rgba(155,17,30,0.08) 40%, transparent 70%);
		pointer-events: none;
	}

	.cta-inner {
		position: relative;
		z-index: 1;
	}

	.cta-inner h2 {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 5.5vw, 4rem);
		font-weight: 800;
		color: #FAF9F6;
		letter-spacing: -0.04em;
		line-height: 1.05;
		margin-bottom: 1rem;
	}

	.cta-inner p {
		font-size: 1.2rem;
		color: rgba(250,249,246,0.88);
		margin-bottom: 2.5rem;
		max-width: 560px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Why-join benefits and buttons in the final CTA */
	.cta-inner h2 { text-wrap: balance; }
	.cta-benefits {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem 1rem;
		max-width: 980px;
		margin: 0 auto 2.75rem;
	}
	.cta-benefits li {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 1.02rem;
		font-weight: 600;
		color: #FAF9F6;
		background: rgba(250,249,246,0.08);
		border: 1px solid rgba(250,249,246,0.2);
		border-radius: 50px;
		padding: 0.6rem 1.15rem 0.6rem 0.65rem;
	}
	@media (min-width: 760px) {
		.cta-benefits {
			display: grid;
			grid-template-columns: repeat(2, auto);
			justify-content: center;
		}
	}
	.cta-check {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		background: var(--success);
		flex-shrink: 0;
	}
	.cta-btns {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.85rem;
	}
	.cta-btns a { text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
	.btn-cta-ghost {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-sans);
		font-size: 1.15rem;
		color: #FAF9F6;
		background: rgba(250,249,246,0.06);
		border: 1.5px solid rgba(250,249,246,0.55);
		text-decoration: none;
		padding: 1.1rem 2.75rem;
		border-radius: 10px;
		transition: background 0.2s, border-color 0.2s, transform 0.2s;
	}
	.btn-cta-ghost:hover { background: var(--cta); border-color: var(--cta); transform: translateY(-2px); }

	/* ── Responsive (mobile-first) ── */
	@media (min-width: 820px) {
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

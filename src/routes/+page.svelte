<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms as companies, visibleFirmSlugs } from '$lib/data';
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import AdPlaceholder from '$lib/components/AdPlaceholder.svelte';
	import { investmentCategorySlugs, b2bItemSlugs, serviceSlugs } from '$lib/data';
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
	const ecoMax = Math.max(1, ...ecoSectors.map((s) => s.count));

	// Options for the business search panel come from the company data
	const searchIndustries = $derived(industryOptions(i18n.lang));
	const searchLocations = locationOptions();

	const investCats = $derived(
		i18n.t.investments.categories.map((cat, i) => ({ ...cat, slug: investmentCategorySlugs[i] }))
	);

	// Investment explorer: selected tab; hovering selects only on devices with a real pointer
	let activeInvest = $state(0);
	let hoverSelects = $state(false);
	onMount(() => {
		hoverSelects = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	});
	function investKeys(e: KeyboardEvent, i: number) {
		const n = investCats.length;
		const next =
			e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % n :
			e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (i - 1 + n) % n :
			e.key === 'Home' ? 0 :
			e.key === 'End' ? n - 1 : -1;
		if (next < 0) return;
		e.preventDefault();
		activeInvest = next;
		const tabs = (e.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role="tab"]');
		tabs?.[next]?.focus();
	}

	const b2bItems = $derived(
		i18n.t.b2b.items.map((item, i) => ({ ...item, slug: b2bItemSlugs[i] }))
	);

	// B2B network visual: nodes evenly spaced on a circle around the hub (percent coords)
	const b2bNodes = b2bItemSlugs.map((_, i, all) => {
		const a = (-90 + (360 / all.length) * i) * (Math.PI / 180);
		return { x: +(50 + 38 * Math.cos(a)).toFixed(2), y: +(50 + 38 * Math.sin(a)).toFixed(2) };
	});
	let activeB2b = $state(0);
	let b2bHover = $state(false);
	// Cycle through the services until the visitor hovers or focuses a row
	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => {
			if (!b2bHover && !document.hidden) activeB2b = (activeB2b + 1) % b2bNodes.length;
		}, 3200);
		return () => clearInterval(id);
	});

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

	// Platform cards: feed the cursor position to the CSS spotlight
	function trackSpotlight(e: PointerEvent) {
		const el = e.currentTarget as HTMLElement;
		const r = el.getBoundingClientRect();
		el.style.setProperty('--mx', `${e.clientX - r.left}px`);
		el.style.setProperty('--my', `${e.clientY - r.top}px`);
	}

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
				<span class="stat-sheen" aria-hidden="true"></span>
				<div class="stat-top">
					<span class="stat-icon" aria-hidden="true">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
							{#if i === 0}
								<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10h1M14 10h1M9 14h1M14 14h1M10 21v-3h4v3"/>
							{:else if i === 1}
								<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
							{:else if i === 2}
								<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>
							{:else}
								<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
							{/if}
						</svg>
					</span>
					<span class="stat-index" aria-hidden="true">0{i + 1}</span>
				</div>
				<span class="stat-value">
					{#if i < statTargets.length}
						{statsCounts[i]}
					{:else}
						{stat.value}
					{/if}
				</span>
				<span class="stat-rule" aria-hidden="true"></span>
				<span class="stat-label">{stat.label}</span>
			</div>
		{/each}
	</div>

	<!-- ─── AD: LEADERBOARD ─── -->
	<section class="bento bento-light ad-section reveal-card" use:reveal>
		<div class="container">
			<AdPlaceholder variant="leaderboard" />
		</div>
	</section>

	<!-- ─── WHY SEMBERIJA ─── -->
	<section class="bento bento-light why-section reveal-card" use:reveal>
		<div class="why-backdrop" aria-hidden="true"></div>
		<div class="container">
			<div class="section-header">
				<span class="section-tag">{i18n.t.why.label}</span>
				<h2>{i18n.t.why.heading}</h2>
				<p class="section-sub">{i18n.t.why.sub}</p>
			</div>
			<div class="why-grid">
				{#each i18n.t.why.items as item, i}
					<article class="why-card" class:why-featured={i === 0}>
						{#if i === 0}
							<!-- Radar / map motif: rings around a pinned point -->
							<svg class="why-radar" viewBox="0 0 400 400" preserveAspectRatio="xMaxYMin slice" fill="none" aria-hidden="true">
								<circle cx="280" cy="140" r="60" />
								<circle cx="280" cy="140" r="120" />
								<circle cx="280" cy="140" r="180" />
								<circle cx="280" cy="140" r="240" />
								<path d="M280 140 L60 40 M280 140 L400 330 M280 140 L40 300 M280 140 L400 20" stroke-dasharray="3 7" />
								<circle class="why-radar-dot" cx="280" cy="140" r="5" />
								<circle class="why-radar-ping" cx="280" cy="140" r="5" />
							</svg>
							<span class="why-coords" aria-hidden="true">44.76° N · 19.21° E</span>
						{/if}
						<div class="why-head">
							<div class="why-icon" aria-hidden="true">
								{#if item.icon === 'location'}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
								{:else if item.icon === 'growth'}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
								{:else if item.icon === 'agriculture'}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V9"/><path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5z"/><path d="M12 11c3 0 5-2 5-5-3 0-5 2-5 5z"/><path d="M12 17c-3 0-5-2-5-5 3 0 5 2 5 5z"/><path d="M12 15c3 0 5-2 5-5-3 0-5 2-5 5z"/></svg>
								{:else if item.icon === 'diaspora'}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
								{:else}
									<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
								{/if}
							</div>
							<span class="why-index" aria-hidden="true">0{i + 1}</span>
						</div>
						<div class="why-body">
							<h3>{item.title}</h3>
							<p>{item.desc}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- ─── PLATFORM (compact module overview; target of the hero's primary CTA) ─── -->
	<section id="platforma" class="bento bento-dark platform-section reveal-card" use:reveal>
		<div class="plat-aurora" aria-hidden="true"></div>
		<div class="plat-lines" aria-hidden="true"></div>
		<div class="container">
			<div class="section-header section-header-light">
				<span class="section-tag-light">{i18n.t.platform.label}</span>
				<h2>{#each i18n.t.platform.heading.split(/(?<=\.)\s+/) as line, li}{#if li}<br />{/if}{line}{/each}</h2>
				<p class="section-sub-light">{i18n.t.platform.desc}</p>
			</div>
			<div class="plat-grid">
				{#each i18n.t.platform.modules as mod, i}
					{@const meta = platformModules[i]}
					<a
						href={meta.href}
						class="plat-card"
						class:plat-card-dev={meta.status}
						onpointermove={trackSpotlight}
					>
						<span class="plat-spot" aria-hidden="true"></span>
						<div class="plat-top">
							<span class="plat-icon" aria-hidden="true">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
									{#if meta.id === 'directory'}
										<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10h1M14 10h1M9 14h1M14 14h1M10 21v-3h4v3"/>
									{:else if meta.id === 'b2b'}
										<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
									{:else if meta.id === 'investments'}
										<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
									{:else if meta.id === 'international'}
										<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
									{:else if meta.id === 'enquiries'}
										<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>
									{:else if meta.id === 'promotion'}
										<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 6a8 8 0 0 1 0 12"/>
									{:else if meta.id === 'services'}
										<path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/><path d="M14 4l-4 16"/>
									{:else if meta.id === 'funding'}
										<path d="M12 2v4"/><circle cx="12" cy="13" r="8"/><path d="M14.5 10.5c-.5-.9-1.4-1.5-2.5-1.5-1.4 0-2.5.9-2.5 2s1.1 1.7 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2c-1.1 0-2-.6-2.5-1.5"/><path d="M12 8v1M12 17v1"/>
									{:else}
										<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>
									{/if}
								</svg>
							</span>
							{#if meta.status}
								<span class="plat-status">
									<span class="plat-status-dot"></span>
									{meta.status === 'dev' ? i18n.t.platform.statusDev : i18n.t.platform.statusSoon}
								</span>
							{:else}
								<span class="plat-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
							{/if}
						</div>
						<h3>{mod.title}</h3>
						<p>{mod.desc}</p>
						<span class="plat-cta">
							<span>{mod.cta}</span>
							<span class="plat-arrow" aria-hidden="true">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
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
	{#snippet sectorIcon(id: string, size: number, stroke: number)}
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round">
			{#if id === 'poljoprivreda-hrana'}
				<path d="M12 22V12"/><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z"/><path d="M12 15c0-4 3-7 8-7 0 4-3 7-8 7z"/>
			{:else if id === 'proizvodnja'}
				<path d="M2 21h20"/><path d="M4 21V10l6 4V10l6 4V5h4v16"/>
			{:else if id === 'gradjevina'}
				<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21v-3h2v3"/>
			{:else if id === 'trgovina'}
				<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
			{:else if id === 'transport'}
				<rect x="1" y="4" width="14" height="12"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
			{:else if id === 'it'}
				<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M9 8l-2 2 2 2M15 8l2 2-2 2"/>
			{:else if id === 'usluge'}
				<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M2 13h20"/>
			{:else}
				<path d="M3 20V9l9-6 9 6v11"/><path d="M9 20v-6h6v6"/><path d="M3 20h18"/>
			{/if}
		</svg>
	{/snippet}
	<section class="bento bento-light eco-section reveal-card" use:reveal>
		<div class="eco-backdrop" aria-hidden="true"></div>
		<div class="container">
			<div class="section-header">
				<span class="section-tag">{i18n.t.ecosystem.label}</span>
				<h2>{i18n.t.ecosystem.heading}</h2>
				<p class="section-sub">{i18n.t.ecosystem.desc}</p>
			</div>
			<div class="eco-grid">
				{#each ecoSectors as sector, i (sector.id)}
					<a href="/firme?sector={sector.id}" class="eco-card">
						<span class="eco-watermark" aria-hidden="true">{@render sectorIcon(sector.id, 150, 1)}</span>
						<span class="eco-top">
							<span class="eco-icon" aria-hidden="true">{@render sectorIcon(sector.id, 24, 1.8)}</span>
							<span class="eco-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						</span>

						<span class="eco-name">{i18n.t.ecosystem.sectors[sector.id]}</span>

						<span class="eco-stat">
							<span class="eco-count">{sector.count}</span>
							<span class="eco-count-label">{i18n.t.ecosystem.companies}</span>
						</span>
						<!-- Relative size of the sector vs. the largest one -->
						<span class="eco-bar" aria-hidden="true">
							<span class="eco-bar-fill" style="--share:{Math.max(6, Math.round((sector.count / ecoMax) * 100))}%"></span>
						</span>

						<span class="eco-meta">
							<span class="eco-go">{i18n.t.ecosystem.explore}</span>
							<span class="eco-arrow" aria-hidden="true">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- ─── FEATURED COMPANIES ─── -->
	<section class="bento bento-light companies-section reveal-card" use:reveal bind:this={companiesSection} class:revealed={companiesRevealed}>
		<div class="companies-backdrop" aria-hidden="true"></div>
		<div class="container">
			<div class="section-header">
				<span class="section-tag">{i18n.t.companies.label}</span>
				<h2>{i18n.t.companies.heading}</h2>
				<p class="section-sub">{i18n.t.companies.sub}</p>
			</div>
			<div class="companies-grid">
				{#each visibleCompanies as company}
					<article class="company-card" style="--brand: {company.color}">
						<!-- Brand-tinted cover band -->
						<div class="company-band">
							<span class="company-band-pattern" aria-hidden="true"></span>
							<div class="company-badge">
								<ListingStatus slug={company.slug} name={company.name} />
							</div>
						</div>
						<div class="company-body">
							<div class="company-avatar" aria-hidden="true">{company.initials}</div>
							<span class="company-category">{i18n.lang === 'sr' ? company.category_sr : company.category_en}</span>
							<h3 class="company-name">{company.name}</h3>
							<span class="company-city">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
								{company.city}
							</span>
							<p class="company-desc">{i18n.lang === 'sr' ? company.desc_sr : company.desc_en}</p>
							<a href={enquiryUrl('b2b', company.name)} class="company-btn">
								<span>{i18n.t.companies.inquire}</span>
								<span class="company-btn-arrow" aria-hidden="true">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
								</span>
							</a>
							<ListingStatus slug={company.slug} name={company.name} part="claim" />
						</div>
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
			<AdPlaceholder variant="banner" tone="dark" />
		</div>
	</section>

	<!-- ─── INVESTMENTS (tabbed explorer over the investment categories) ─── -->
	{#snippet investIcon(slug: string, size: number)}
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			{#if slug === 'logistika'}
				<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
			{:else if slug === 'poljoprivreda'}
				<path d="M12 22V12"/><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z"/><path d="M12 15c0-4 3-7 8-7 0 4-3 7-8 7z"/>
			{:else if slug === 'proizvodnja'}
				<path d="M2 21h20"/><path d="M4 21V10l6 4V10l6 4V5h4v16"/>
			{:else if slug === 'skladista'}
				<path d="M3 21V8l9-5 9 5v13"/><path d="M7 21v-8h10v8"/><path d="M7 17h10"/>
			{:else if slug === 'nekretnine'}
				<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21v-3h2v3"/>
			{:else if slug === 'solarna-energija'}
				<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
			{:else if slug === 'autsorsing'}
				<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6.5 6.5 0 0 1 3.5 6"/>
			{:else}
				<path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/><path d="M14 4l-4 16"/>
			{/if}
		</svg>
	{/snippet}
	<section class="bento bento-dark investments-section reveal-card" use:reveal>
		<div class="investments-glow" aria-hidden="true"></div>
		<div class="investments-lines" aria-hidden="true"></div>
		<div class="container">
			<div class="section-header section-header-light">
				<span class="section-tag-light">{i18n.t.investments.label}</span>
				<h2>{i18n.t.investments.heading}</h2>
				<p class="section-sub-light">{i18n.t.investments.sub}</p>
			</div>

			<div class="inv-explorer">
				<div class="inv-tabs" role="tablist" aria-label={i18n.t.investments.label}>
					{#each investCats as cat, i (cat.slug)}
						<button
							type="button"
							role="tab"
							id="inv-tab-{cat.slug}"
							aria-selected={activeInvest === i}
							aria-controls="inv-panel"
							tabindex={activeInvest === i ? 0 : -1}
							class="inv-tab"
							class:active={activeInvest === i}
							onclick={() => (activeInvest = i)}
							onmouseenter={() => { if (hoverSelects) activeInvest = i; }}
							onkeydown={(e) => investKeys(e, i)}
						>
							<span class="inv-tab-index">{String(i + 1).padStart(2, '0')}</span>
							<span class="inv-tab-icon">{@render investIcon(cat.slug, 18)}</span>
							<span class="inv-tab-name">{cat.name}</span>
							<svg class="inv-tab-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
						</button>
					{/each}
				</div>

				{#key activeInvest}
					{@const cat = investCats[activeInvest]}
					<div class="inv-panel" id="inv-panel" role="tabpanel" aria-labelledby="inv-tab-{cat.slug}">
						<span class="inv-panel-watermark" aria-hidden="true">{String(activeInvest + 1).padStart(2, '0')}</span>
						<div class="inv-panel-head">
							<span class="inv-panel-icon">{@render investIcon(cat.slug, 26)}</span>
							<span class="inv-panel-tag"><span class="inv-panel-tag-dot"></span>{i18n.t.investments.detailTag}</span>
						</div>
						<h3 class="inv-panel-title">{cat.name}</h3>
						<p class="inv-panel-desc">{cat.desc}</p>

						<span class="inv-panel-sub">{i18n.t.investments.detailHighlights}</span>
						<ul class="inv-highlights">
							{#each cat.highlights as h}
								<li>
									<span class="inv-check" aria-hidden="true">
										<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
									</span>
									{h}
								</li>
							{/each}
						</ul>

						<div class="inv-panel-foot">
							<a href="/investicije/{cat.slug}" class="inv-panel-link">
								{i18n.t.ui.learnMore}
								<span class="inv-panel-arrow" aria-hidden="true">
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
								</span>
							</a>
							<span class="inv-progress" aria-hidden="true">
								<span class="inv-progress-num">{String(activeInvest + 1).padStart(2, '0')}</span>
								<span class="inv-progress-bar"><span style="width:{((activeInvest + 1) / investCats.length) * 100}%"></span></span>
								<span class="inv-progress-num muted">{String(investCats.length).padStart(2, '0')}</span>
							</span>
						</div>
					</div>
				{/key}
			</div>

			<div class="section-cta">
				<a href="/investicije" class="btn-primary">{i18n.t.investments.cta}</a>
			</div>
		</div>
	</section>

	<!-- ─── B2B MATCHMAKING (service list wired to a hub-and-node network visual) ─── -->
	{#snippet b2bIcon(i: number, size: number)}
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			{#if i === 0}
				<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
			{:else if i === 1}
				<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
			{:else if i === 2}
				<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>
			{:else if i === 3}
				<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
			{:else}
				<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
			{/if}
		</svg>
	{/snippet}
	<section class="bento bento-light b2b-section reveal-card" use:reveal>
		<div class="b2b-backdrop" aria-hidden="true"></div>
		<div class="container diaspora-layout">
			<div class="diaspora-text">
				<span class="section-tag">{i18n.t.b2b.label}</span>
				<h2>{i18n.t.b2b.heading}</h2>
				<p class="section-sub">{i18n.t.b2b.sub}</p>
				<ul class="b2b-list" onmouseleave={() => (b2bHover = false)}>
					{#each b2bItems as item, i (item.slug)}
						<li>
							<a
								href="/b2b/{item.slug}"
								class="b2b-row"
								class:active={activeB2b === i}
								onmouseenter={() => { b2bHover = true; activeB2b = i; }}
								onfocus={() => { b2bHover = true; activeB2b = i; }}
								onblur={() => (b2bHover = false)}
							>
								<span class="b2b-row-icon">{@render b2bIcon(i, 20)}</span>
								<span class="b2b-row-text">
									<span class="b2b-row-title">{item.title}</span>
									<span class="b2b-row-sub">{item.highlights[0]}</span>
								</span>
								<span class="b2b-row-arrow" aria-hidden="true">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
								</span>
							</a>
						</li>
					{/each}
				</ul>
				<a href="/b2b" class="btn-primary">{i18n.t.b2b.cta}</a>
			</div>

			<div class="diaspora-visual" aria-hidden="true">
				<div class="b2b-net">
					<span class="b2b-ring r1"></span>
					<span class="b2b-ring r2"></span>
					<span class="b2b-ring r3"></span>
					<svg class="b2b-links" viewBox="0 0 100 100" preserveAspectRatio="none">
						{#each b2bNodes as node, i}
							<line x1="50" y1="50" x2={node.x} y2={node.y} class:active={activeB2b === i} />
						{/each}
					</svg>
					<span class="b2b-hub">
						<span class="b2b-hub-pulse"></span>
						<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 7l3.5 3M18 7l-3.5 3M6 17l3.5-3M18 17l-3.5-3"/></svg>
					</span>
					{#each b2bItems as item, i (item.slug)}
						<span
							class="b2b-node"
							class:active={activeB2b === i}
							style="left:{b2bNodes[i].x}%; top:{b2bNodes[i].y}%"
						>
							{@render b2bIcon(i, 20)}
						</span>
					{/each}
					{#key activeB2b}
						<div class="b2b-caption">
							<span class="b2b-caption-index">{String(activeB2b + 1).padStart(2, '0')} / {String(b2bItems.length).padStart(2, '0')}</span>
							<span class="b2b-caption-title">{b2bItems[activeB2b].title}</span>
							<span class="b2b-caption-sub">{b2bItems[activeB2b].highlights[1]}</span>
						</div>
					{/key}
				</div>
			</div>
		</div>
	</section>

	<!-- ─── AD: SQUARE PAIR ─── -->
	<section class="bento bento-light ad-section ad-section-split reveal-card" use:reveal>
		<div class="container ad-split-grid">
			<AdPlaceholder variant="square" />
			<AdPlaceholder variant="square" />
		</div>
	</section>

	<!-- ─── DIGITAL SERVICES (bento: two wide feature tiles + four compact tiles) ─── -->
	{#snippet svcIcon(i: number)}
		<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			{#if i === 0}
				<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><path d="M6 6h.01M9 6h.01"/><path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/>
			{:else if i === 1}
				<circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.5-5.5"/><path d="M7.5 12l2-2 1.5 1.5 2.5-3"/>
			{:else if i === 2}
				<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>
			{:else if i === 3}
				<path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>
			{:else if i === 4}
				<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>
			{:else}
				<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>
			{/if}
		</svg>
	{/snippet}
	<section class="bento bento-dark services-section reveal-card" use:reveal>
		<div class="svc-glow" aria-hidden="true"></div>
		<div class="container">
			<div class="section-header section-header-light">
				<span class="section-tag-light">{i18n.t.services.label}</span>
				<h2>{i18n.t.services.heading}</h2>
				<p class="section-sub-light">{i18n.t.services.sub}</p>
			</div>
			<div class="services-grid">
				{#each i18n.t.services.items as svc, i}
					{@const wide = i === 0 || i === i18n.t.services.items.length - 1}
					<a href="/usluge/{serviceSlugs[i]}" class="service-card" class:wide onpointermove={trackSpotlight}>
						<span class="svc-spot" aria-hidden="true"></span>
						<div class="svc-main">
							<div class="svc-top">
								<span class="svc-icon">{@render svcIcon(i)}</span>
								<span class="svc-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
							</div>
							<h3>{svc.title}</h3>
							<p>{svc.desc}</p>
							<ul class="svc-tags">
								{#each svc.highlights.slice(0, wide ? 3 : 2) as h}
									<li>{h}</li>
								{/each}
							</ul>
							<span class="svc-go" aria-hidden="true">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</div>

						{#if i === 0}
							<!-- Browser mockup -->
							<div class="svc-visual svc-browser" aria-hidden="true">
								<div class="svc-browser-bar"><span></span><span></span><span></span><i></i></div>
								<div class="svc-browser-body">
									<span class="sk sk-hero"></span>
									<span class="sk sk-line w70"></span>
									<span class="sk sk-line w45"></span>
									<div class="sk-row"><span class="sk sk-card"></span><span class="sk sk-card"></span><span class="sk sk-card"></span></div>
								</div>
							</div>
						{:else if wide}
							<!-- Growth chart mockup -->
							<div class="svc-visual svc-chart" aria-hidden="true">
								<svg viewBox="0 0 200 110" preserveAspectRatio="none">
									<defs>
										<linearGradient id="svc-area" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="#f06a75" stop-opacity="0.45"/>
											<stop offset="100%" stop-color="#f06a75" stop-opacity="0"/>
										</linearGradient>
									</defs>
									<path d="M0 95 L30 82 L60 86 L90 64 L120 70 L150 42 L180 34 L200 18 L200 110 L0 110 Z" fill="url(#svc-area)"/>
									<path class="svc-chart-line" d="M0 95 L30 82 L60 86 L90 64 L120 70 L150 42 L180 34 L200 18" fill="none" stroke="#f06a75" stroke-width="2.2" vector-effect="non-scaling-stroke"/>
								</svg>
								<div class="svc-chart-bars">
									{#each [38, 52, 46, 68, 74, 92] as h}
										<span style="height:{h}%"></span>
									{/each}
								</div>
							</div>
						{/if}
					</a>
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

	<!-- ─── FINAL CTA (copy + buttons, with a profile-preview card holding the benefits) ─── -->
	<section class="bento bento-dark cta-bento reveal-card" use:reveal>
		<div class="cta-glow" aria-hidden="true"></div>
		<div class="cta-rings" aria-hidden="true"><span></span><span></span><span></span></div>
		<div class="cta-inner">
			<div class="cta-copy">
				<span class="cta-eyebrow"><span class="cta-eyebrow-dot"></span>Semberija.app</span>
				<h2>{i18n.t.joinCta.heading}</h2>
				<p>{i18n.t.joinCta.desc}</p>
				<div class="cta-btns">
					<a href="/kontakt?tip=registracija" class="cta-btn-main">
						<span>{i18n.t.nav.listCta}</span>
						<span class="cta-btn-arrow" aria-hidden="true">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
					<a href="/oglasi" class="btn-cta-ghost">{i18n.t.joinCta.promote}</a>
				</div>
			</div>

			<!-- Profile preview: what a listed company gets -->
			<div class="cta-visual">
				<div class="cta-card">
					<div class="cta-card-head">
						<span class="cta-avatar" aria-hidden="true">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10h1M14 10h1M9 14h1M14 14h1M10 21v-3h4v3"/></svg>
						</span>
						<span class="cta-card-id" aria-hidden="true">
							<i class="sk w60"></i>
							<i class="sk w35"></i>
						</span>
						<span class="cta-verified">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
							{i18n.t.listing.verified}
						</span>
					</div>
					<ul class="cta-benefits">
						{#each i18n.t.joinCta.benefits as benefit, i}
							<li style="--d:{i}">
								<span class="cta-check" aria-hidden="true">
									<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
								</span>
								<span class="cta-benefit-text">{benefit}</span>
								<span class="cta-benefit-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
							</li>
						{/each}
					</ul>
				</div>
				<!-- Floating accent: rising visibility chart -->
				<div class="cta-float cta-float-chart" aria-hidden="true">
					<svg width="96" height="40" viewBox="0 0 96 40" fill="none">
						<path d="M2 36 L20 28 L36 31 L54 18 L70 21 L94 4" stroke="#7fd1b2" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
						<circle cx="94" cy="4" r="3.5" fill="#7fd1b2"/>
					</svg>
				</div>
				<div class="cta-float cta-float-pin" aria-hidden="true">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
					Bijeljina
				</div>
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
		/* Room for descenders (g, j, y): gradient text is clipped to the line box */
		line-height: 1.12;
		padding-bottom: 0.08em;
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
		/* minmax(0, …): long select options must not widen the column past the card */
		grid-template-columns: minmax(0, 1fr);
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

	/* Phones: keep every field, chip and the button inside the card */
	.search-inner, .biz-search, .bs-field, .bs-select-body { min-width: 0; }
	.bs-select select { min-width: 0; max-width: 100%; }
	.bs-submit { min-width: 0; white-space: normal; }
	.bs-chip { max-width: 100%; }
	@media (max-width: 480px) {
		.biz-search { padding: 0.6rem; }
		.bs-field { padding-left: 0.85rem; padding-right: 0.85rem; }
		.bs-chips { gap: 0.45rem; }
		.bs-chips-label { width: 100%; margin: 0 0 0.15rem; }
	}

	/* ── STATS ── */
	.stats-bento {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	.stat-tile {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: clamp(1.5rem, 2.6vw, 2rem);
		min-height: 220px;
		background: var(--surface-dark);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-dark-raised);
		transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
	}
	/* Fine dot grid, fading toward the bottom-left so the number reads cleanly */
	.stat-tile::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0) 0 0 / 18px 18px;
		-webkit-mask-image: radial-gradient(ellipse 80% 70% at 100% 0%, #000 0%, transparent 70%);
		mask-image: radial-gradient(ellipse 80% 70% at 100% 0%, #000 0%, transparent 70%);
		pointer-events: none;
	}
	/* Accent hairline that draws in on hover */
	.stat-tile::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 3px;
		width: 100%;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.stat-tile:hover {
		transform: translateY(-6px);
		box-shadow: 0 40px 70px -26px rgba(8,20,45,0.65), 0 16px 30px -14px rgba(8,20,45,0.42), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.1);
	}
	.stat-tile:hover::after { transform: scaleX(1); }

	/* Diagonal light sweep on hover */
	.stat-sheen {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.09) 48%, transparent 66%);
		transform: translateX(-100%);
		transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
		pointer-events: none;
	}
	.stat-tile:hover .stat-sheen { transform: translateX(100%); }

	.stat-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-bottom: auto;
		padding-bottom: 1.5rem;
	}
	.stat-icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.1), 0 8px 18px -10px rgba(0,0,0,0.5);
		transition: background 0.35s ease, transform 0.35s ease;
	}
	.stat-tile:hover .stat-icon {
		background: linear-gradient(160deg, #c42a38, var(--cta));
		transform: rotate(-6deg) scale(1.05);
	}
	.stat-index {
		font-family: var(--font-heading);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(250,249,246,0.45);
		font-variant-numeric: tabular-nums;
	}

	.stat-value {
		font-family: var(--font-heading);
		font-size: clamp(2.8rem, 4.4vw, 3.9rem);
		font-weight: 800;
		line-height: 1;
		letter-spacing: -0.045em;
		font-variant-numeric: tabular-nums;
		background: linear-gradient(180deg, #ffffff 0%, #ffffff 45%, #b9c6d8 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.stat-rule {
		display: block;
		width: 32px;
		height: 2px;
		margin: 0.95rem 0 0.8rem;
		border-radius: 2px;
		background: var(--accent-line);
		transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.stat-tile:hover .stat-rule { width: 56px; }

	.stat-label {
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		line-height: 1.45;
		text-transform: uppercase;
		color: rgba(250,249,246,0.78);
	}

	@media (prefers-reduced-motion: reduce) {
		.stat-tile, .stat-tile::after, .stat-sheen, .stat-icon, .stat-rule { transition: none; }
		.stat-tile:hover { transform: none; }
	}
	@media (max-width: 480px) {
		.stat-tile { min-height: 190px; padding: 1.25rem; }
		.stat-icon { width: 38px; height: 38px; }
		.stat-label { font-size: 0.7rem; letter-spacing: 0.09em; }
	}

	/* ── ADS ── */
	.ad-section {
		padding: clamp(1.25rem, 3vw, 2rem);
		display: flex;
		justify-content: center;
	}
	.ad-section .container {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.ad-section :global(.ad-slot) {
		max-width: 1120px;
	}
	/* .ad-section prefix: must beat the flex rule of `.ad-section .container` above */
	.ad-section .ad-split-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2.5vw, 1.5rem);
		max-width: 1120px;
	}
	@media (min-width: 720px) {
		.ad-section .ad-split-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
	}

	/* ── WHY ── */
	.why-section {
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}
	/* Dot grid that fades in behind the cards */
	.why-backdrop {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: radial-gradient(circle at 1px 1px, rgba(11,52,102,0.08) 1px, transparent 0) 0 0 / 22px 22px;
		-webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 35%, #000 70%, transparent 100%);
		mask-image: linear-gradient(180deg, transparent 0%, #000 35%, #000 70%, transparent 100%);
		pointer-events: none;
	}

	.why-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.4rem);
	}

	.why-card {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		padding: clamp(1.6rem, 2.6vw, 2.1rem);
		border-radius: var(--radius-2xl);
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 14px 32px -18px rgba(15,23,42,0.18),
			inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	/* Accent hairline that draws in on hover */
	.why-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	/* Soft corner glow */
	.why-card::after {
		content: '';
		position: absolute;
		z-index: -1;
		top: -40%;
		right: -30%;
		width: 80%;
		height: 80%;
		background: radial-gradient(circle, rgba(11,52,102,0.08), transparent 65%);
		opacity: 0;
		transition: opacity 0.5s ease;
		pointer-events: none;
	}
	.why-card:hover {
		transform: translateY(-6px);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 34px 60px -28px rgba(15,23,42,0.32),
			inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.why-card:hover::before { transform: scaleX(1); }
	.why-card:hover::after { opacity: 1; }

	.why-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.why-icon {
		display: grid;
		place-items: center;
		width: 54px;
		height: 54px;
		border-radius: 16px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		box-shadow: 0 12px 22px -10px rgba(11,52,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease;
	}
	.why-card:hover .why-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
		box-shadow: 0 12px 22px -10px rgba(155,17,30,0.6), inset 0 1px 0 rgba(255,255,255,0.25);
	}
	.why-index {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(11,52,102,0.35);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.why-card:hover .why-index { color: var(--cta); }

	.why-body { margin-top: auto; }
	.why-card h3 {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--navy);
		margin-bottom: 0.6rem;
	}
	.why-card p { font-size: 0.95rem; color: #4a525e; line-height: 1.65; }

	/* Featured card: dark, larger, with a map/radar motif */
	.why-featured {
		min-height: 360px;
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised);
	}
	.why-featured::after { background: radial-gradient(circle, rgba(196,42,56,0.3), transparent 65%); }
	.why-featured:hover {
		box-shadow: 0 40px 70px -26px rgba(8,20,45,0.65), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.why-featured .why-icon {
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12), 0 10px 20px -10px rgba(0,0,0,0.5);
	}
	.why-featured .why-index { color: rgba(250,249,246,0.45); }
	.why-featured:hover .why-index { color: #f06a75; }
	.why-featured h3 {
		color: #FAF9F6;
		font-size: clamp(1.6rem, 2.6vw, 2.2rem);
		letter-spacing: -0.035em;
		line-height: 1.1;
		margin-bottom: 0.85rem;
	}
	.why-featured p { color: rgba(250,249,246,0.8); font-size: 1.02rem; max-width: 40ch; }

	.why-radar {
		position: absolute;
		z-index: -1;
		inset: 0;
		width: 100%;
		height: 100%;
		stroke: rgba(255,255,255,0.14);
		stroke-width: 1;
		pointer-events: none;
		-webkit-mask-image: radial-gradient(circle at 70% 35%, #000 20%, transparent 75%);
		mask-image: radial-gradient(circle at 70% 35%, #000 20%, transparent 75%);
	}
	.why-radar-dot { fill: #f06a75; stroke: none; }
	.why-radar-ping {
		fill: none;
		stroke: #f06a75;
		stroke-width: 1.5;
		transform-box: fill-box;
		transform-origin: center;
		animation: why-ping 2.8s cubic-bezier(0,0,0.2,1) infinite;
	}
	@keyframes why-ping {
		0% { transform: scale(1); opacity: 0.9; }
		100% { transform: scale(9); opacity: 0; }
	}
	.why-coords {
		position: absolute;
		top: calc(clamp(1.6rem, 2.6vw, 2.1rem) + 1.1rem);
		right: calc(clamp(1.6rem, 2.6vw, 2.1rem) + 3rem);
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: rgba(250,249,246,0.5);
	}

	@media (min-width: 640px) {
		.why-grid { grid-template-columns: repeat(2, 1fr); }
		.why-featured { grid-column: 1 / -1; }
	}
	@media (min-width: 1024px) {
		.why-grid { grid-template-columns: 1.25fr 1fr 1fr; }
		.why-featured { grid-column: 1; grid-row: 1 / span 2; min-height: 100%; }
	}
	@media (max-width: 420px) {
		.why-coords { display: none; }
	}
	@media (prefers-reduced-motion: reduce) {
		.why-card, .why-card::before, .why-card::after, .why-icon, .why-index { transition: none; }
		.why-card:hover, .why-card:hover .why-icon { transform: none; }
		.why-radar-ping { animation: none; opacity: 0; }
	}

	/* ── BUSINESS ECOSYSTEM ── */
	.eco-section { position: relative; overflow: hidden; isolation: isolate; }
	/* Soft brand glows in opposite corners */
	.eco-backdrop {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			radial-gradient(40% 45% at 0% 100%, rgba(11,52,102,0.07), transparent 70%),
			radial-gradient(35% 40% at 100% 0%, rgba(155,17,30,0.05), transparent 70%);
		pointer-events: none;
	}

	.eco-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.25rem);
	}
	.eco-card {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: clamp(1.5rem, 2.4vw, 1.85rem);
		border-radius: var(--radius-2xl);
		text-decoration: none;
		color: inherit;
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 14px 32px -18px rgba(15,23,42,0.18),
			inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, background 0.45s ease;
	}
	.eco-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.eco-card:hover {
		transform: translateY(-6px);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 34px 60px -28px rgba(15,23,42,0.32),
			inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.eco-card:hover::before { transform: scaleX(1); }
	.eco-card:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; }

	/* Oversized faded sector icon in the corner */
	.eco-watermark {
		position: absolute;
		z-index: -1;
		right: -28px;
		bottom: -30px;
		color: rgba(11,52,102,0.05);
		transition: color 0.5s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
		pointer-events: none;
	}
	.eco-card:hover .eco-watermark { color: rgba(155,17,30,0.08); transform: rotate(-8deg) scale(1.06); }

	.eco-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}
	.eco-icon {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: 15px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		box-shadow: 0 12px 22px -10px rgba(11,52,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease;
	}
	.eco-card:hover .eco-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
		box-shadow: 0 12px 22px -10px rgba(155,17,30,0.6), inset 0 1px 0 rgba(255,255,255,0.25);
	}
	.eco-index {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(11,52,102,0.35);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.eco-card:hover .eco-index { color: var(--cta); }

	.eco-name {
		flex: 1;
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--navy);
		margin-bottom: 1.25rem;
	}

	.eco-stat {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 0.7rem;
	}
	.eco-count {
		font-family: var(--font-heading);
		font-size: 2.1rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--navy);
		font-variant-numeric: tabular-nums;
	}
	.eco-count-label {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #6b7380;
	}

	.eco-bar {
		position: relative;
		display: block;
		height: 4px;
		border-radius: 4px;
		background: rgba(11,52,102,0.08);
		overflow: hidden;
		margin-bottom: 1.4rem;
	}
	.eco-bar-fill {
		position: absolute;
		inset: 0 auto 0 0;
		width: var(--share);
		border-radius: inherit;
		background: linear-gradient(90deg, #1c5aa8, #0b3466);
		transition: background 0.4s ease;
	}
	.eco-card:hover .eco-bar-fill { background: var(--accent-line); }

	.eco-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.eco-go {
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--navy);
		transition: color 0.3s ease;
	}
	.eco-card:hover .eco-go { color: var(--cta); }
	.eco-arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.eco-card:hover .eco-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}

	@media (min-width: 600px) {
		.eco-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.eco-grid { grid-template-columns: repeat(4, 1fr); }
	}
	@media (prefers-reduced-motion: reduce) {
		.eco-card, .eco-card::before, .eco-icon, .eco-arrow, .eco-watermark { transition: none; }
		.eco-card:hover, .eco-card:hover .eco-icon, .eco-card:hover .eco-arrow, .eco-card:hover .eco-watermark { transform: none; }
	}

	/* ── PLATFORM MODULES ── */
	.platform-section { position: relative; overflow: hidden; isolation: isolate; }
	/* Slow-drifting colour glow behind the grid */
	.plat-aurora {
		position: absolute;
		z-index: -1;
		inset: -20% -10% auto;
		height: 90%;
		background:
			radial-gradient(40% 50% at 20% 30%, rgba(64,120,200,0.45), transparent 70%),
			radial-gradient(35% 45% at 85% 20%, rgba(196,42,56,0.28), transparent 70%);
		filter: blur(30px);
		animation: plat-drift 18s ease-in-out infinite alternate;
		pointer-events: none;
	}
	@keyframes plat-drift {
		from { transform: translate3d(-3%, 0, 0); }
		to   { transform: translate3d(3%, 4%, 0); }
	}
	/* Fine blueprint lines, faded toward the edges */
	.plat-lines {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 56px 56px,
			linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 56px 56px;
		-webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 80%);
		mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 80%);
		pointer-events: none;
	}

	.plat-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.25rem);
	}

	.plat-card {
		--mx: 50%;
		--my: 0%;
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: clamp(1.5rem, 2.4vw, 1.9rem);
		border-radius: var(--radius-2xl);
		text-decoration: none;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.025) 100%);
		box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.14),
			inset 0 0 0 1px rgba(255,255,255,0.1),
			0 18px 36px -22px rgba(0,0,0,0.6);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, background 0.45s ease;
	}
	/* Accent hairline that draws in on hover */
	.plat-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 2px;
		background: linear-gradient(90deg, #e0414f, #f06a75);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	/* Cursor-following spotlight */
	.plat-spot {
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(320px circle at var(--mx) var(--my), rgba(255,255,255,0.12), transparent 60%);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}
	.plat-card:hover {
		transform: translateY(-6px);
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
		box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.2),
			inset 0 0 0 1px rgba(255,255,255,0.22),
			0 34px 60px -26px rgba(0,0,0,0.7);
	}
	.plat-card:hover::before { transform: scaleX(1); }
	.plat-card:hover .plat-spot { opacity: 1; }
	.plat-card:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 4px; }

	.plat-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 1.6rem;
	}
	.plat-icon {
		display: grid;
		place-items: center;
		width: 50px;
		height: 50px;
		border-radius: 14px;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12), 0 10px 20px -10px rgba(0,0,0,0.55);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease;
	}
	.plat-card:hover .plat-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(160deg, #c42a38, var(--cta));
	}
	.plat-num {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(250,249,246,0.42);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.plat-card:hover .plat-num { color: #f06a75; }

	/* Availability badge (e.g. U RAZVOJU / IN DEVELOPMENT) */
	.plat-status {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.3rem 0.7rem;
		border-radius: 50px;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		white-space: nowrap;
		color: #f6cf72;
		background: rgba(242,193,78,0.12);
		box-shadow: inset 0 0 0 1px rgba(242,193,78,0.35);
	}
	.plat-status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
		box-shadow: 0 0 0 3px rgba(242,193,78,0.2);
		animation: plat-blink 1.8s ease-in-out infinite;
	}
	@keyframes plat-blink { 50% { opacity: 0.35; } }
	.plat-card-dev {
		background: linear-gradient(160deg, rgba(242,193,78,0.08) 0%, rgba(255,255,255,0.02) 100%);
	}

	.plat-card h3 {
		font-family: var(--font-heading);
		font-size: 1.18rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: #FAF9F6;
		margin-bottom: 0.55rem;
	}
	.plat-card p {
		flex: 1;
		font-size: 0.93rem;
		line-height: 1.6;
		color: rgba(250,249,246,0.75);
		margin-bottom: 1.4rem;
	}

	.plat-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(250,249,246,0.12);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #FAF9F6;
	}
	.plat-arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3);
		transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.plat-card:hover .plat-arrow {
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.7);
		transform: rotate(45deg);
	}

	@media (min-width: 640px) {
		.plat-grid { grid-template-columns: repeat(2, 1fr); }
		/* 9 modules on two columns: the last one spans so the grid ends evenly */
		.plat-card:last-child:nth-child(odd) { grid-column: 1 / -1; }
	}
	@media (min-width: 1024px) {
		.plat-grid { grid-template-columns: repeat(3, 1fr); }
		.plat-card:last-child:nth-child(odd) { grid-column: auto; }
	}
	@media (prefers-reduced-motion: reduce) {
		.plat-aurora, .plat-status-dot { animation: none; }
		.plat-card, .plat-card::before, .plat-icon, .plat-arrow, .plat-spot { transition: none; }
		.plat-card:hover, .plat-card:hover .plat-icon, .plat-card:hover .plat-arrow { transform: none; }
	}

	/* ── COMPANIES ── */
	.companies-section { position: relative; overflow: hidden; isolation: isolate; }
	.companies-backdrop {
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(circle at 1px 1px, rgba(11,52,102,0.07) 1px, transparent 0) 0 0 / 22px 22px;
		-webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 40%, #000 75%, transparent 100%);
		mask-image: linear-gradient(180deg, transparent 0%, #000 40%, #000 75%, transparent 100%);
		pointer-events: none;
	}

	.companies-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.4rem);
	}

	/* Scroll-triggered reveal */
	.companies-section .companies-grid > .company-card {
		opacity: 0;
		transform: translateY(28px);
		transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.45s ease;
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
		--brand: var(--steel);
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: var(--radius-2xl);
		background: #ffffff;
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 14px 32px -18px rgba(15,23,42,0.18),
			inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	/* Hover lift; the reveal transition above owns transform timing, so delay is reset here */
	.companies-section.revealed .companies-grid > .company-card:hover {
		transform: translateY(-6px);
		transition-delay: 0s;
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 34px 60px -28px rgba(15,23,42,0.32),
			inset 0 0 0 1px rgba(15,23,42,0.1);
	}

	/* Cover band tinted with the company's brand colour */
	.company-band {
		position: relative;
		height: 92px;
		overflow: hidden;
		background:
			radial-gradient(120% 140% at 0% 0%, color-mix(in srgb, var(--brand) 55%, transparent), transparent 70%),
			linear-gradient(135deg, color-mix(in srgb, var(--brand) 85%, #05090f) 0%, color-mix(in srgb, var(--brand) 60%, #05090f) 100%);
	}
	.company-band-pattern {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.22) 1px, transparent 0) 0 0 / 14px 14px;
		-webkit-mask-image: linear-gradient(110deg, transparent 20%, #000 100%);
		mask-image: linear-gradient(110deg, transparent 20%, #000 100%);
		transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
	}
	.company-card:hover .company-band-pattern { transform: translateX(-14px); }
	.company-badge {
		position: absolute;
		top: 0.9rem;
		right: 0.9rem;
		left: 0.9rem;
		display: flex;
		justify-content: flex-end;
	}
	.company-badge :global(.status) { max-width: 100%; }
	.company-badge :global(.status svg) { flex-shrink: 0; }
	.company-badge :global(.status) {
		margin-bottom: 0;
		color: #FAF9F6;
		background: rgba(255,255,255,0.14);
		border-color: rgba(255,255,255,0.28);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}
	.company-badge :global(.status.verified) {
		background: var(--success);
		border-color: rgba(255,255,255,0.35);
	}

	.company-body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 clamp(1.4rem, 2.4vw, 1.8rem) clamp(1.4rem, 2.4vw, 1.8rem);
	}

	.company-avatar {
		display: grid;
		place-items: center;
		width: 64px;
		height: 64px;
		margin-top: -32px;
		margin-bottom: 1.1rem;
		border-radius: 18px;
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: 0.02em;
		color: #ffffff;
		background: var(--brand);
		box-shadow: 0 0 0 4px #ffffff, 0 14px 26px -12px rgba(5,9,15,0.5);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.company-card:hover .company-avatar { transform: translateY(-4px) rotate(-4deg); }

	.company-category {
		align-self: flex-start;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--brand) 75%, #05090f);
		margin-bottom: 0.45rem;
	}

	.company-name {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--navy);
		margin-bottom: 0.4rem;
	}

	.company-city {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--muted);
		margin-bottom: 1rem;
	}

	.company-desc {
		font-size: 0.93rem;
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
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.55rem 0.55rem 0.55rem 1.15rem;
		border-radius: 50px;
		font-size: 0.9rem;
		font-weight: 700;
		text-decoration: none;
		color: var(--navy);
		background: rgba(11,52,102,0.06);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.12);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
	}
	.company-btn-arrow {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: #FAF9F6;
		background: var(--navy);
		transition: background 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.company-btn:hover {
		color: #FAF9F6;
		background: var(--navy);
		box-shadow: inset 0 0 0 1px var(--navy), 0 12px 24px -12px rgba(5,9,15,0.6);
	}
	.company-btn:hover .company-btn-arrow { background: var(--cta); transform: rotate(45deg); }
	.company-btn:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }

	@media (prefers-reduced-motion: reduce) {
		.company-band-pattern, .company-avatar, .company-btn-arrow { transition: none; }
		.company-card:hover .company-band-pattern,
		.company-card:hover .company-avatar,
		.company-btn:hover .company-btn-arrow { transform: none; }
		.companies-section.revealed .companies-grid > .company-card:hover { transform: none; }
	}

	/* ── INVESTMENTS ── */
	.investments-section { position: relative; overflow: hidden; isolation: isolate; }
	.investments-glow {
		position: absolute;
		z-index: -1;
		top: -25%;
		left: 50%;
		transform: translateX(-50%);
		width: min(900px, 120%);
		height: 520px;
		background:
			radial-gradient(ellipse at 35% 50%, rgba(120,170,240,0.3) 0%, transparent 65%),
			radial-gradient(ellipse at 75% 60%, rgba(196,42,56,0.18) 0%, transparent 60%);
		filter: blur(20px);
		pointer-events: none;
	}
	.investments-lines {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 56px 56px,
			linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 56px 56px;
		-webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 55%, #000 15%, transparent 80%);
		mask-image: radial-gradient(ellipse 70% 60% at 50% 55%, #000 15%, transparent 80%);
		pointer-events: none;
	}

	.inv-explorer {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2.4vw, 1.5rem);
		align-items: stretch;
	}

	/* Tab list: horizontal scroller on mobile, vertical index on desktop */
	.inv-tabs {
		display: flex;
		gap: 0.6rem;
		overflow-x: auto;
		scrollbar-width: none;
		padding-bottom: 0.25rem;
		-webkit-mask-image: linear-gradient(90deg, #000 85%, transparent);
		mask-image: linear-gradient(90deg, #000 85%, transparent);
	}
	.inv-tabs::-webkit-scrollbar { display: none; }
	.inv-tab {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-shrink: 0;
		padding: 0.7rem 1.1rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		text-align: left;
		color: rgba(250,249,246,0.72);
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
		cursor: pointer;
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
	}
	.inv-tab-index {
		font-family: var(--font-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		color: rgba(250,249,246,0.4);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.inv-tab-icon { display: none; }
	.inv-tab-name {
		font-family: var(--font-heading);
		font-size: 0.98rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}
	.inv-tab-arrow { display: none; }
	.inv-tab:hover { color: #FAF9F6; background: rgba(255,255,255,0.09); }
	.inv-tab.active {
		color: var(--navy);
		background: #FAF9F6;
		box-shadow: 0 14px 28px -14px rgba(0,0,0,0.55);
	}
	.inv-tab.active .inv-tab-index { color: var(--cta); }
	.inv-tab:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	/* Detail panel */
	.inv-panel {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: clamp(1.6rem, 3.2vw, 2.6rem);
		border-radius: var(--radius-2xl);
		background: linear-gradient(160deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.18),
			inset 0 0 0 1px rgba(255,255,255,0.12),
			0 30px 60px -30px rgba(0,0,0,0.7);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		animation: inv-in 0.55s cubic-bezier(0.22,1,0.36,1);
	}
	@keyframes inv-in {
		from { opacity: 0; transform: translateY(10px); }
		to   { opacity: 1; transform: none; }
	}
	.inv-panel::before {
		content: '';
		position: absolute;
		top: 0; left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, #e0414f, #f06a75 40%, transparent);
	}
	.inv-panel-watermark {
		position: absolute;
		z-index: -1;
		right: -0.05em;
		bottom: -0.22em;
		font-family: var(--font-heading);
		font-size: clamp(9rem, 18vw, 15rem);
		font-weight: 800;
		letter-spacing: -0.06em;
		line-height: 1;
		color: transparent;
		-webkit-text-stroke: 1px rgba(255,255,255,0.1);
		pointer-events: none;
		user-select: none;
	}

	.inv-panel-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}
	.inv-panel-icon {
		display: grid;
		place-items: center;
		width: 58px;
		height: 58px;
		border-radius: 17px;
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 14px 28px -12px rgba(155,17,30,0.75), inset 0 1px 0 rgba(255,255,255,0.28);
	}
	.inv-panel-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.85rem;
		border-radius: 50px;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.85);
		background: rgba(255,255,255,0.07);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
	}
	.inv-panel-tag-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #7fd1b2;
		box-shadow: 0 0 0 3px rgba(127,209,178,0.18);
	}

	.inv-panel-title {
		font-family: var(--font-heading);
		font-size: clamp(1.8rem, 3.4vw, 2.6rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.05;
		color: #FAF9F6;
		margin-bottom: 0.9rem;
	}
	.inv-panel-desc {
		font-size: 1.02rem;
		line-height: 1.65;
		color: rgba(250,249,246,0.8);
		max-width: 56ch;
		margin-bottom: 1.6rem;
	}
	.inv-panel-sub {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.5);
		margin-bottom: 0.8rem;
	}
	.inv-highlights {
		list-style: none;
		display: grid;
		gap: 0.65rem;
		margin: 0 0 1.8rem;
		padding: 0;
	}
	.inv-highlights li {
		display: flex;
		align-items: flex-start;
		gap: 0.7rem;
		font-size: 0.95rem;
		line-height: 1.5;
		color: #FAF9F6;
	}
	.inv-check {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 22px;
		height: 22px;
		margin-top: 0.05rem;
		border-radius: 50%;
		color: #7fd1b2;
		background: rgba(127,209,178,0.12);
		box-shadow: inset 0 0 0 1px rgba(127,209,178,0.3);
	}

	.inv-panel-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: auto;
		padding-top: 1.25rem;
		border-top: 1px solid rgba(255,255,255,0.1);
	}
	.inv-panel-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
	}
	.inv-panel-arrow {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3);
		transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.inv-panel-link:hover .inv-panel-arrow {
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.7);
		transform: rotate(45deg);
	}
	.inv-panel-link:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 4px; border-radius: 4px; }

	.inv-progress {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
	}
	.inv-progress-num {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: #FAF9F6;
		font-variant-numeric: tabular-nums;
	}
	.inv-progress-num.muted { color: rgba(250,249,246,0.4); }
	.inv-progress-bar {
		position: relative;
		width: 90px;
		height: 2px;
		border-radius: 2px;
		background: rgba(255,255,255,0.15);
		overflow: hidden;
	}
	.inv-progress-bar span {
		position: absolute;
		inset: 0 auto 0 0;
		background: linear-gradient(90deg, #e0414f, #f06a75);
		border-radius: inherit;
	}

	@media (min-width: 900px) {
		.inv-explorer { grid-template-columns: minmax(260px, 0.8fr) 1.2fr; }
		.inv-tabs {
			flex-direction: column;
			gap: 0.4rem;
			overflow: visible;
			padding: 0;
			-webkit-mask-image: none;
			mask-image: none;
		}
		.inv-tab {
			padding: 0.95rem 1.1rem;
			border-radius: 16px;
			background: transparent;
			box-shadow: inset 0 -1px 0 rgba(255,255,255,0.08);
		}
		.inv-tab-icon {
			display: grid;
			place-items: center;
			width: 36px;
			height: 36px;
			border-radius: 11px;
			color: #FAF9F6;
			background: rgba(255,255,255,0.07);
			box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
			transition: background 0.35s ease, color 0.35s ease;
		}
		.inv-tab-name { flex: 1; font-size: 1.05rem; }
		.inv-tab-arrow {
			display: block;
			opacity: 0;
			transform: translateX(-6px);
			transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
		}
		.inv-tab:hover { background: rgba(255,255,255,0.06); }
		.inv-tab.active { box-shadow: 0 18px 34px -18px rgba(0,0,0,0.6); }
		.inv-tab.active .inv-tab-icon { color: #FAF9F6; background: linear-gradient(160deg, #c42a38, var(--cta)); box-shadow: none; }
		.inv-tab.active .inv-tab-arrow { opacity: 1; transform: none; color: var(--cta); }
	}

	@media (prefers-reduced-motion: reduce) {
		.inv-panel { animation: none; }
		.inv-tab, .inv-tab-arrow, .inv-panel-arrow { transition: none; }
		.inv-panel-link:hover .inv-panel-arrow { transform: none; }
	}

	/* ── B2B MATCHMAKING ── */
	.b2b-section { position: relative; overflow: hidden; isolation: isolate; }
	.b2b-backdrop {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			radial-gradient(45% 60% at 85% 50%, rgba(11,52,102,0.08), transparent 70%),
			radial-gradient(30% 40% at 0% 0%, rgba(155,17,30,0.05), transparent 70%);
		pointer-events: none;
	}

	.diaspora-layout {
		display: grid;
		/* minmax(0, …): one-line row subtitles must not widen the column past the card */
		grid-template-columns: minmax(0, 1fr);
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
		text-wrap: balance;
	}

	.diaspora-text .section-sub { margin-bottom: 1.75rem; }

	/* Service rows */
	.b2b-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		margin: 0 0 2rem;
		padding: 0;
	}
	.b2b-row {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.8rem 0.9rem;
		border-radius: 18px;
		text-decoration: none;
		color: var(--navy);
		background: rgba(255,255,255,0.6);
		box-shadow: inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.b2b-row.active {
		background: #ffffff;
		transform: translateX(6px);
		box-shadow:
			0 18px 34px -20px rgba(15,23,42,0.3),
			inset 0 0 0 1px rgba(155,17,30,0.2);
	}
	.b2b-row:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }
	.b2b-row-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border-radius: 13px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		box-shadow: 0 10px 18px -10px rgba(11,52,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: background 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.b2b-row.active .b2b-row-icon {
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
		transform: rotate(-6deg);
	}
	.b2b-row-text { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; min-width: 0; }
	.b2b-row-title {
		font-family: var(--font-heading);
		font-size: 1.04rem;
		font-weight: 800;
		letter-spacing: -0.015em;
	}
	.b2b-row-sub {
		font-size: 0.85rem;
		color: #6b7380;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.b2b-row-arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.18);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.b2b-row.active .b2b-row-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 16px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}

	/* Network visual */
	.diaspora-visual { display: none; align-items: center; justify-content: center; }
	.b2b-net {
		position: relative;
		width: min(100%, 500px);
		aspect-ratio: 1;
		border-radius: 50%;
		isolation: isolate;
	}
	.b2b-net::before {
		content: '';
		position: absolute;
		inset: 4%;
		z-index: -1;
		border-radius: 50%;
		background:
			radial-gradient(circle at 1px 1px, rgba(11,52,102,0.12) 1px, transparent 0) 0 0 / 16px 16px;
		-webkit-mask-image: radial-gradient(circle, #000 30%, transparent 70%);
		mask-image: radial-gradient(circle, #000 30%, transparent 70%);
	}
	.b2b-ring {
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid rgba(11,52,102,0.12);
		pointer-events: none;
	}
	.b2b-ring.r1 { width: 38%; height: 38%; }
	.b2b-ring.r2 { width: 76%; height: 76%; border-style: dashed; border-color: rgba(11,52,102,0.18); animation: b2b-spin 60s linear infinite; }
	.b2b-ring.r3 { width: 98%; height: 98%; border-color: rgba(11,52,102,0.07); }
	@keyframes b2b-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }

	.b2b-links {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.b2b-links line {
		stroke: rgba(11,52,102,0.22);
		stroke-width: 1.2;
		stroke-dasharray: 4 5;
		vector-effect: non-scaling-stroke;
		transition: stroke 0.4s ease;
	}
	.b2b-links line.active {
		stroke: var(--cta);
		stroke-width: 2;
		animation: b2b-flow 0.9s linear infinite;
	}
	@keyframes b2b-flow { to { stroke-dashoffset: -18; } }

	.b2b-hub {
		position: absolute;
		top: 50%;
		left: 50%;
		display: grid;
		place-items: center;
		width: 92px;
		height: 92px;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		color: #FAF9F6;
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised), 0 0 0 10px rgba(255,255,255,0.7);
	}
	.b2b-hub-pulse {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		box-shadow: 0 0 0 0 rgba(11,52,102,0.35);
		animation: b2b-pulse 2.6s cubic-bezier(0,0,0.2,1) infinite;
	}
	@keyframes b2b-pulse {
		0% { box-shadow: 0 0 0 0 rgba(11,52,102,0.35); }
		100% { box-shadow: 0 0 0 46px rgba(11,52,102,0); }
	}

	.b2b-node {
		position: absolute;
		display: grid;
		place-items: center;
		width: 58px;
		height: 58px;
		border-radius: 18px;
		transform: translate(-50%, -50%);
		color: var(--navy);
		background: #ffffff;
		box-shadow:
			0 16px 30px -16px rgba(15,23,42,0.4),
			inset 0 0 0 1px rgba(15,23,42,0.08);
		transition: background 0.4s ease, color 0.4s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
	}
	.b2b-node.active {
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
		transform: translate(-50%, -50%) scale(1.14);
		box-shadow: 0 18px 34px -12px rgba(155,17,30,0.6), 0 0 0 8px rgba(155,17,30,0.1);
	}

	.b2b-caption {
		position: absolute;
		left: 50%;
		bottom: -4%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
		width: max-content;
		max-width: 92%;
		padding: 0.85rem 1.3rem;
		border-radius: 18px;
		text-align: center;
		background: rgba(255,255,255,0.85);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		box-shadow: 0 20px 40px -22px rgba(15,23,42,0.4), inset 0 0 0 1px rgba(15,23,42,0.07);
		animation: b2b-caption-in 0.5s cubic-bezier(0.22,1,0.36,1);
	}
	@keyframes b2b-caption-in {
		from { opacity: 0; transform: translate(-50%, 8px); }
		to   { opacity: 1; transform: translate(-50%, 0); }
	}
	.b2b-caption-index {
		font-family: var(--font-heading);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: var(--cta);
		font-variant-numeric: tabular-nums;
	}
	.b2b-caption-title {
		font-family: var(--font-heading);
		font-size: 1.02rem;
		font-weight: 800;
		letter-spacing: -0.015em;
		color: var(--navy);
	}
	.b2b-caption-sub { font-size: 0.82rem; color: #6b7380; }

	@media (prefers-reduced-motion: reduce) {
		.b2b-ring.r2, .b2b-links line.active, .b2b-hub-pulse, .b2b-caption { animation: none; }
		.b2b-row, .b2b-row-icon, .b2b-row-arrow, .b2b-node { transition: none; }
		.b2b-row.active { transform: none; }
	}

	/* ── SERVICES ── */
	.services-section { position: relative; overflow: hidden; isolation: isolate; }
	.svc-glow {
		position: absolute;
		z-index: -1;
		inset: auto -10% -30% -10%;
		height: 70%;
		background:
			radial-gradient(40% 60% at 25% 70%, rgba(64,120,200,0.4), transparent 70%),
			radial-gradient(35% 50% at 80% 60%, rgba(196,42,56,0.22), transparent 70%);
		filter: blur(30px);
		pointer-events: none;
	}

	.services-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.25rem);
	}

	.service-card {
		--mx: 50%;
		--my: 0%;
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		padding: clamp(1.5rem, 2.4vw, 1.9rem);
		border-radius: var(--radius-2xl);
		text-decoration: none;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.025) 100%);
		box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.14),
			inset 0 0 0 1px rgba(255,255,255,0.1),
			0 18px 36px -22px rgba(0,0,0,0.6);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease, background 0.45s ease;
	}
	.service-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 2px;
		background: linear-gradient(90deg, #e0414f, #f06a75);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.service-card:hover {
		transform: translateY(-6px);
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
		box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.2),
			inset 0 0 0 1px rgba(255,255,255,0.22),
			0 34px 60px -26px rgba(0,0,0,0.7);
	}
	.service-card:hover::before { transform: scaleX(1); }
	.service-card:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 4px; }
	.svc-spot {
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(320px circle at var(--mx) var(--my), rgba(255,255,255,0.12), transparent 60%);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}
	.service-card:hover .svc-spot { opacity: 1; }

	.svc-main { position: relative; display: flex; flex-direction: column; min-width: 0; }
	.svc-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}
	.svc-icon {
		display: grid;
		place-items: center;
		width: 50px;
		height: 50px;
		border-radius: 14px;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12), 0 10px 20px -10px rgba(0,0,0,0.55);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease;
	}
	.service-card:hover .svc-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(160deg, #c42a38, var(--cta));
	}
	.svc-index {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(250,249,246,0.42);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.service-card:hover .svc-index { color: #f06a75; }

	.service-card h3 {
		font-family: var(--font-heading);
		font-size: 1.22rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: #FAF9F6;
		margin-bottom: 0.5rem;
	}
	.service-card.wide h3 { font-size: clamp(1.4rem, 2.2vw, 1.75rem); letter-spacing: -0.03em; }
	.service-card p {
		font-size: 0.93rem;
		line-height: 1.6;
		color: rgba(250,249,246,0.75);
		margin-bottom: 1.2rem;
	}

	.svc-tags {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0 0 1.4rem;
		padding: 0;
	}
	.svc-tags li {
		padding: 0.3rem 0.7rem;
		border-radius: 50px;
		font-size: 0.74rem;
		font-weight: 600;
		color: rgba(250,249,246,0.82);
		background: rgba(255,255,255,0.06);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
	}

	.svc-go {
		display: grid;
		place-items: center;
		align-self: flex-start;
		margin-top: auto;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3);
		transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.service-card:hover .svc-go {
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.7);
		transform: rotate(45deg);
	}

	/* Feature visuals (wide tiles only) */
	.svc-visual { display: none; }
	.svc-browser {
		flex-direction: column;
		border-radius: 14px;
		overflow: hidden;
		background: rgba(5,9,15,0.35);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 24px 40px -24px rgba(0,0,0,0.7);
		transform: perspective(900px) rotateY(-8deg) rotateX(4deg);
		transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
	}
	.service-card:hover .svc-browser { transform: perspective(900px) rotateY(0) rotateX(0) translateY(-4px); }
	.svc-browser-bar {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 0.6rem 0.75rem;
		background: rgba(255,255,255,0.06);
		border-bottom: 1px solid rgba(255,255,255,0.08);
	}
	.svc-browser-bar span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.25); }
	.svc-browser-bar span:first-child { background: #f06a75; }
	.svc-browser-bar i { flex: 1; height: 8px; margin-left: 0.6rem; border-radius: 4px; background: rgba(255,255,255,0.08); }
	.svc-browser-body { display: flex; flex-direction: column; gap: 0.55rem; padding: 0.9rem; }
	.sk { display: block; border-radius: 6px; background: rgba(255,255,255,0.1); }
	.sk-hero {
		height: 58px;
		background: linear-gradient(120deg, rgba(64,120,200,0.55), rgba(196,42,56,0.45));
	}
	.sk-line { height: 7px; }
	.sk-line.w70 { width: 70%; }
	.sk-line.w45 { width: 45%; }
	.sk-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.45rem; margin-top: 0.2rem; }
	.sk-card { height: 38px; }

	.svc-chart {
		position: relative;
		border-radius: 14px;
		overflow: hidden;
		background: rgba(5,9,15,0.3);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
		min-height: 170px;
	}
	.svc-chart svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }
	.svc-chart-line {
		stroke-dasharray: 400;
		stroke-dashoffset: 0;
	}
	.service-card:hover .svc-chart-line { animation: svc-draw 1.2s cubic-bezier(0.22,1,0.36,1); }
	@keyframes svc-draw { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
	.svc-chart-bars {
		position: absolute;
		inset: 18% 6% 0;
		display: flex;
		align-items: flex-end;
		gap: 8%;
	}
	.svc-chart-bars span {
		flex: 1;
		border-radius: 4px 4px 0 0;
		background: linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03));
	}

	@media (min-width: 640px) {
		.services-grid { grid-template-columns: repeat(2, 1fr); }
		.service-card.wide { grid-column: 1 / -1; grid-template-columns: 1.1fr 1fr; align-items: center; }
		.service-card.wide .svc-visual { display: flex; }
		.service-card.wide .svc-chart { display: block; }
	}
	@media (min-width: 1024px) {
		.services-grid { grid-template-columns: repeat(4, 1fr); }
		.service-card.wide { grid-column: span 2; }
	}
	@media (prefers-reduced-motion: reduce) {
		.service-card, .service-card::before, .svc-icon, .svc-go, .svc-browser, .svc-spot { transition: none; }
		.service-card:hover, .service-card:hover .svc-icon, .service-card:hover .svc-go { transform: none; }
		.service-card:hover .svc-browser { transform: perspective(900px) rotateY(-8deg) rotateX(4deg); }
		.service-card:hover .svc-chart-line { animation: none; }
	}

	/* ── FINAL CTA ── */
	.cta-bento {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		padding: clamp(64px, 9vw, 112px) var(--section-px);
	}
	.cta-glow {
		position: absolute;
		z-index: -1;
		inset: -20% -10%;
		background:
			radial-gradient(35% 45% at 78% 50%, rgba(196,42,56,0.35), transparent 70%),
			radial-gradient(40% 50% at 15% 30%, rgba(64,120,200,0.35), transparent 70%);
		filter: blur(30px);
		pointer-events: none;
	}
	/* Concentric rings radiating from behind the profile card */
	.cta-rings {
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 72%;
		pointer-events: none;
	}
	.cta-rings span {
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 50%;
		border: 1px solid rgba(255,255,255,0.08);
		transform: translate(-50%, -50%);
	}
	.cta-rings span:nth-child(1) { width: 420px; height: 420px; }
	.cta-rings span:nth-child(2) { width: 640px; height: 640px; border-style: dashed; border-color: rgba(255,255,255,0.07); }
	.cta-rings span:nth-child(3) { width: 880px; height: 880px; border-color: rgba(255,255,255,0.04); }

	.cta-inner {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2.5rem, 5vw, 4rem);
		align-items: center;
		max-width: 1160px;
		margin: 0 auto;
	}

	.cta-copy { text-align: center; }
	.cta-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-bottom: 1.4rem;
		padding: 0.4rem 1rem;
		border-radius: 50px;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #FAF9F6;
		background: rgba(255,255,255,0.08);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
	}
	.cta-eyebrow-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f06a75;
		box-shadow: 0 0 0 4px rgba(240,106,117,0.2);
	}
	.cta-copy h2 {
		font-family: var(--font-heading);
		font-size: clamp(2.3rem, 5vw, 3.9rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		/* Room for descenders (g, j, y): gradient text is clipped to the line box */
		line-height: 1.12;
		padding-bottom: 0.08em;
		text-wrap: balance;
		color: #FAF9F6;
		margin-bottom: 1.25rem;
		background: linear-gradient(180deg, #ffffff 30%, #c9d4e4 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.cta-copy p {
		font-size: 1.15rem;
		line-height: 1.65;
		color: rgba(250,249,246,0.82);
		max-width: 540px;
		margin: 0 auto 2.4rem;
	}

	.cta-btns {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.85rem;
	}
	.cta-btn-main {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		padding: 0.55rem 0.55rem 0.55rem 1.6rem;
		border-radius: 50px;
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 18px 36px -14px rgba(155,17,30,0.8), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
	}
	.cta-btn-arrow {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		color: var(--cta);
		background: #FAF9F6;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.cta-btn-main:hover {
		transform: translateY(-2px);
		box-shadow: 0 24px 44px -14px rgba(155,17,30,0.9), inset 0 1px 0 rgba(255,255,255,0.3);
	}
	.cta-btn-main:hover .cta-btn-arrow { transform: rotate(45deg); }
	.btn-cta-ghost {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0 1.8rem;
		min-height: 58px;
		border-radius: 50px;
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
		background: rgba(255,255,255,0.06);
		box-shadow: inset 0 0 0 1px rgba(250,249,246,0.4);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
	}
	.btn-cta-ghost:hover {
		background: rgba(255,255,255,0.14);
		box-shadow: inset 0 0 0 1px #FAF9F6;
		transform: translateY(-2px);
	}
	.cta-btn-main:focus-visible,
	.btn-cta-ghost:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 4px; }

	/* Profile preview card */
	.cta-visual {
		position: relative;
		width: min(100%, 460px);
		margin: 0 auto;
	}
	.cta-card {
		position: relative;
		padding: 1.5rem;
		border-radius: 26px;
		background: linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%);
		box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.22),
			inset 0 0 0 1px rgba(255,255,255,0.14),
			0 40px 80px -30px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		transform: rotate(-2deg);
		transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
	}
	.cta-visual:hover .cta-card { transform: rotate(0deg) translateY(-4px); }
	.cta-card-head {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding-bottom: 1.2rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid rgba(255,255,255,0.1);
	}
	.cta-avatar {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 52px;
		height: 52px;
		border-radius: 16px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 12px 24px -10px rgba(155,17,30,0.7), inset 0 1px 0 rgba(255,255,255,0.28);
	}
	.cta-card-id { display: flex; flex-direction: column; gap: 7px; flex: 1; min-width: 0; }
	.cta-card-id .sk { display: block; height: 8px; border-radius: 4px; background: rgba(255,255,255,0.22); }
	.cta-card-id .sk.w60 { width: 70%; height: 10px; background: rgba(255,255,255,0.35); }
	.cta-card-id .sk.w35 { width: 40%; }
	.cta-verified {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		flex-shrink: 0;
		padding: 0.3rem 0.65rem;
		border-radius: 50px;
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: #7fd1b2;
		background: rgba(127,209,178,0.12);
		box-shadow: inset 0 0 0 1px rgba(127,209,178,0.35);
		white-space: nowrap;
	}

	.cta-benefits {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
	}
	.cta-benefits li {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.75rem 0.85rem;
		border-radius: 14px;
		font-size: 0.98rem;
		font-weight: 600;
		color: #FAF9F6;
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07);
		transition: background 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
	}
	.cta-benefits li:hover { background: rgba(255,255,255,0.1); transform: translateX(4px); }
	.cta-check {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		color: #0b2a22;
		background: #7fd1b2;
		box-shadow: 0 0 0 4px rgba(127,209,178,0.15);
	}
	.cta-benefit-text { flex: 1; text-align: left; }
	.cta-benefit-num {
		font-family: var(--font-heading);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		color: rgba(250,249,246,0.4);
		font-variant-numeric: tabular-nums;
	}

	/* Floating accents */
	.cta-float {
		position: absolute;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 0.8rem;
		border-radius: 16px;
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--navy);
		background: #FAF9F6;
		box-shadow: 0 20px 40px -18px rgba(0,0,0,0.6);
		animation: cta-bob 6s ease-in-out infinite;
	}
	.cta-float-chart { top: -28px; right: -18px; background: rgba(8,37,72,0.9); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14), 0 20px 40px -18px rgba(0,0,0,0.6); }
	.cta-float-pin { bottom: -22px; left: -16px; animation-delay: -3s; }
	.cta-float-pin svg { color: var(--cta); }
	@keyframes cta-bob {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-8px); }
	}

	@media (min-width: 1024px) {
		.cta-inner { grid-template-columns: 1.15fr 0.85fr; }
		.cta-copy { text-align: left; }
		.cta-copy p { margin-left: 0; }
		.cta-btns { justify-content: flex-start; }
		.cta-visual { margin: 0 0 0 auto; }
	}
	@media (max-width: 1023px) {
		.cta-rings { left: 50%; top: 75%; }
	}
	@media (max-width: 480px) {
		.cta-float-chart { right: -6px; }
		.cta-float-pin { left: -6px; }
		.cta-btn-main, .btn-cta-ghost { width: 100%; justify-content: space-between; }
		.btn-cta-ghost { justify-content: center; }
	}
	@media (prefers-reduced-motion: reduce) {
		.cta-float { animation: none; }
		.cta-card, .cta-btn-main, .cta-btn-arrow, .btn-cta-ghost, .cta-benefits li { transition: none; }
		.cta-visual:hover .cta-card { transform: rotate(-2deg); }
		.cta-btn-main:hover, .cta-btn-main:hover .cta-btn-arrow, .btn-cta-ghost:hover, .cta-benefits li:hover { transform: none; }
	}

	/* ── Responsive (mobile-first) ── */
	@media (min-width: 820px) {
		.hero-btns { flex-direction: row; flex-wrap: wrap; align-items: normal; }
	}
	@media (min-width: 600px) {
		.companies-grid { grid-template-columns: repeat(2, 1fr); }
		.hero-scroll { bottom: 2rem; }
	}
	@media (min-width: 768px) {
		.hero-bento { min-height: 82vh; }
	}
	@media (min-width: 1024px) {
		.stats-bento { grid-template-columns: repeat(4, 1fr); }
		.companies-grid { grid-template-columns: repeat(3, 1fr); }
		.diaspora-layout { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 6rem; }
		.diaspora-visual { display: flex; }
	}
</style>

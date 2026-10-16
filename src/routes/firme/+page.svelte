<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { investors, categories } from '$lib/data';
	import { visibleDomestic, matches, locationOptions, sectors, sectorCount } from '$lib/search';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { reveal } from '$lib/actions/reveal';
	import AdPlaceholder from '$lib/components/AdPlaceholder.svelte';
	import ListingStatus from '$lib/components/ListingStatus.svelte';
	import { enquiryUrl } from '$lib/enquiry';

	let search = $state('');
	let activeCategory = $state('');
	let activeCity = $state('');
	let activeSector = $state('');
	let activeTab = $state<'local' | 'investors'>('local');

	// Read filters from the URL (homepage search panel and category links use ?q=&cat=&city=)
	$effect(() => {
		const params = $page.url.searchParams;
		search = params.get('q') ?? '';
		activeCategory = params.get('cat') ?? '';
		activeCity = params.get('city') ?? '';
		activeSector = params.get('sector') ?? '';
		// Show the tab where the results are
		const f = { q: search, cat: activeCategory, city: activeCity, sector: activeSector };
		const local = visibleDomestic.filter((c) => matches(c, f, i18n.lang)).length;
		const inv = investors.filter((c) => matches(c, f, i18n.lang)).length;
		activeTab = local === 0 && inv > 0 ? 'investors' : 'local';
	});

	// "Pretraga" in the nav links to /firme#pretraga: bring the search bar into view below the
	// fixed nav, focus it and briefly highlight it
	let searchInput: HTMLInputElement;
	let filterBar: HTMLDivElement;
	let spotlight = $state(false);
	let spotlightTimer: ReturnType<typeof setTimeout>;
	$effect(() => {
		if ($page.url.hash !== '#pretraga' || !searchInput) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		filterBar.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
		searchInput.focus({ preventScroll: true });
		spotlight = true;
		clearTimeout(spotlightTimer);
		spotlightTimer = setTimeout(() => (spotlight = false), 2600);
		return () => clearTimeout(spotlightTimer);
	});

	// Quick picks under the search bar: sectors that have companies, largest first
	const quickSectors = sectors
		.map((s) => ({ id: s.id, count: sectorCount(s.id) }))
		.filter((s) => s.count > 0)
		.sort((a, b) => b.count - a.count)
		.slice(0, 6);

	function switchTab(tab: 'local' | 'investors') {
		activeTab = tab;
		activeCategory = '';
		activeCity = '';
		search = '';
	}

	function clearSector() {
		goto('/firme', { replaceState: true, noScroll: true, keepFocus: true });
	}

	// Reset every filter; drop URL params too so a reload doesn't bring them back
	function clearAll() {
		search = '';
		activeCategory = '';
		activeCity = '';
		if ($page.url.search) goto('/firme', { replaceState: true, noScroll: true, keepFocus: true });
	}

	const investorCategories = $derived(
		[...new Set(investors.map(c => i18n.lang === 'sr' ? c.category_sr : c.category_en))].sort()
	);

	const filters = $derived({ q: search, cat: activeCategory, city: activeCity, sector: activeSector });
	const anyFilter = $derived(!!(search || activeCategory || activeCity || activeSector));
	const filteredLocal = $derived(visibleDomestic.filter((c) => matches(c, filters, i18n.lang)));
	const filteredInvestors = $derived(investors.filter((c) => matches(c, filters, i18n.lang)));

	// Location options for the current tab, taken from the data
	const tabLocations = $derived(locationOptions(activeTab === 'local' ? visibleDomestic : investors));

	const filtered = $derived(activeTab === 'local' ? filteredLocal : filteredInvestors);
	const activeCats = $derived(activeTab === 'local' ? categories.slice(0, 8) : null);
</script>

<svelte:head>
	<title>{i18n.t.nav.companies} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<!-- ─── HERO + FILTERS ─── -->
<section class="page-top reveal-card" use:reveal>
	<div class="top-glow" aria-hidden="true"></div>
	<div class="top-lines" aria-hidden="true"></div>
	<div class="container">
		<span class="page-label"><span class="page-label-dot"></span>{i18n.t.nav.directory}</span>
		<h1>{activeTab === 'local' ? i18n.t.ui.companiesLocal : i18n.t.ui.investorsLabel}</h1>
		<p class="page-sub">{activeTab === 'local' ? i18n.t.companies.localSub : i18n.t.companies.investorsSub}</p>

		<!-- Segmented tabs with live counts -->
		<div class="tabs" role="tablist" style="--pos:{activeTab === 'local' ? 0 : 1}">
			<span class="tabs-pill" aria-hidden="true"></span>
			<button
				type="button"
				role="tab"
				aria-selected={activeTab === 'local'}
				class="tab-btn"
				class:active={activeTab === 'local'}
				onclick={() => switchTab('local')}
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M10 21v-3h4v3"/></svg>
				<span class="tab-label">{i18n.t.companies.localTab}</span>
				<span class="tab-count">{filteredLocal.length}</span>
			</button>
			<button
				type="button"
				role="tab"
				aria-selected={activeTab === 'investors'}
				class="tab-btn"
				class:active={activeTab === 'investors'}
				onclick={() => switchTab('investors')}
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/></svg>
				<span class="tab-label">{i18n.t.companies.investorsTab}</span>
				<span class="tab-count">{filteredInvestors.length}</span>
			</button>
		</div>

		<!-- One white search bar split into segments (matches the homepage search) -->
		<div class="filter-bar" class:spotlight role="search" bind:this={filterBar}>
			<div class="fb-field fb-query">
				<svg class="fb-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
				</svg>
				<input
					id="pretraga"
					bind:this={searchInput}
					type="search"
					placeholder={i18n.t.ui.searchPlaceholder}
					aria-label={i18n.t.ui.searchPlaceholder}
					bind:value={search}
					autocomplete="off"
				/>
			</div>

			<div class="fb-field fb-select">
				<span class="fb-tile" aria-hidden="true">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
				</span>
				<div class="fb-select-body">
					<label for="f-cat">{i18n.t.bizSearch.industry}</label>
					<select id="f-cat" bind:value={activeCategory}>
						<option value="">{i18n.t.bizSearch.allIndustries}</option>
						{#if activeTab === 'local' && activeCats}
							{#each activeCats as cat}
								<option value={i18n.lang === 'sr' ? cat.name_sr : cat.name_en}>
									{i18n.lang === 'sr' ? cat.name_sr : cat.name_en}
								</option>
							{/each}
						{:else}
							{#each investorCategories as cat}
								<option value={cat}>{cat}</option>
							{/each}
						{/if}
					</select>
				</div>
				<svg class="fb-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
			</div>

			{#if tabLocations.length > 1}
				<div class="fb-field fb-select">
					<span class="fb-tile" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
					</span>
					<div class="fb-select-body">
						<label for="f-city">{i18n.t.bizSearch.location}</label>
						<select id="f-city" bind:value={activeCity}>
							<option value="">{i18n.t.bizSearch.allLocations}</option>
							{#each tabLocations as city}
								<option value={city}>{city}</option>
							{/each}
						</select>
					</div>
					<svg class="fb-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
				</div>
			{/if}
		</div>

		{#if !anyFilter && quickSectors.length}
			<div class="quick">
				<span class="quick-label">{i18n.t.bizSearch.popular}</span>
				{#each quickSectors as sector (sector.id)}
					<a href="/firme?sector={sector.id}" class="quick-chip">
						{i18n.t.ecosystem.sectors[sector.id]}
						<span class="quick-count">{sector.count}</span>
					</a>
				{/each}
			</div>
		{/if}

		{#if anyFilter}
			<div class="active-filters">
				{#if activeSector && i18n.t.ecosystem.sectors[activeSector]}
					<span class="af-chip">
						{i18n.t.ecosystem.active}: <strong>{i18n.t.ecosystem.sectors[activeSector]}</strong>
						<button type="button" onclick={clearSector} aria-label={i18n.t.ecosystem.clear}>
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
						</button>
					</span>
				{/if}
				<button type="button" class="af-clear" onclick={clearAll}>
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
					{i18n.t.ecosystem.clear}
				</button>
			</div>
		{/if}
	</div>
</section>

<div class="ad-section reveal-card" use:reveal>
	<div class="container">
		<AdPlaceholder variant="leaderboard" />
	</div>
</div>

<!-- ─── RESULTS ─── -->
<section class="companies-body reveal-card" use:reveal>
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		<div class="results-head">
			<span class="results-count" aria-live="polite">
				<strong>{filtered.length}</strong>
				{activeTab === 'local' ? i18n.t.ecosystem.companies : i18n.t.companies.investorsTab}
			</span>
			<span class="results-line" aria-hidden="true"></span>
		</div>

		{#if filtered.length === 0}
			<div class="empty">
				<span class="empty-icon" aria-hidden="true">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/><path d="M8.5 8.5l5 5M13.5 8.5l-5 5"/></svg>
				</span>
				<p>{i18n.t.ui.noResults}</p>
				{#if anyFilter}
					<button type="button" class="af-clear dark" onclick={clearAll}>{i18n.t.ecosystem.clear}</button>
				{/if}
			</div>
		{:else}
			<div class="companies-grid">
				{#each filtered as company (company.slug)}
					<article class="company-card" style="--brand: {company.color}">
						<div class="company-band">
							<span class="company-band-pattern" aria-hidden="true"></span>
							{#if company.featured}
								<span class="featured-badge">
									<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
									{i18n.t.companies.featured}
								</span>
							{/if}
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
		{/if}

		<!-- Visibility call-to-action -->
		<div class="visibility-box">
			<div class="vb-glow" aria-hidden="true"></div>
			<div class="vb-copy">
				<span class="vb-icon" aria-hidden="true">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
				</span>
				<div>
					<h2>{i18n.t.companies.visibilityHeading}</h2>
					<p>{i18n.t.companies.visibilitySub}</p>
				</div>
			</div>
			<div class="vb-btns">
				<a href="/kontakt?tip=registracija" class="vb-main">
					<span>{i18n.t.nav.listCta}</span>
					<span class="vb-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<a href="/kontakt" class="vb-ghost">{i18n.t.ui.contactUs}</a>
			</div>
		</div>
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
	.container { position: relative; max-width: var(--max-w); margin: 0 auto; }

	/* ─── HERO ─── */
	.page-top {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		background: var(--surface-dark);
		color: #FAF9F6;
		padding: clamp(3rem, 7vw, 5.5rem) var(--section-px) clamp(2.5rem, 5vw, 3.5rem);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
	}
	.top-glow {
		position: absolute;
		z-index: -1;
		inset: -30% -10% auto;
		height: 120%;
		background:
			radial-gradient(40% 50% at 15% 30%, rgba(120,170,240,0.35), transparent 70%),
			radial-gradient(35% 45% at 90% 20%, rgba(196,42,56,0.25), transparent 70%);
		filter: blur(30px);
		pointer-events: none;
	}
	.top-lines {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 56px 56px,
			linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 56px 56px;
		-webkit-mask-image: radial-gradient(ellipse 70% 80% at 70% 20%, #000 10%, transparent 75%);
		mask-image: radial-gradient(ellipse 70% 80% at 70% 20%, #000 10%, transparent 75%);
		pointer-events: none;
	}

	.page-label {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-bottom: 1.25rem;
		padding: 0.4rem 1rem;
		border-radius: 50px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #FAF9F6;
		background: rgba(255,255,255,0.08);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
	}
	.page-label-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f06a75;
		box-shadow: 0 0 0 4px rgba(240,106,117,0.2);
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 5vw, 3.8rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		/* Room for descenders (g, j, y): gradient text is clipped to the line box */
		line-height: 1.12;
		padding-bottom: 0.08em;
		text-wrap: balance;
		max-width: 18ch;
		margin-bottom: 0.9rem;
		background: linear-gradient(180deg, #ffffff 30%, #c9d4e4 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.page-sub {
		font-size: 1.1rem;
		line-height: 1.6;
		color: rgba(250,249,246,0.8);
		max-width: 56ch;
		margin-bottom: 2.25rem;
	}

	/* ─── SEGMENTED TABS ─── */
	.tabs {
		position: relative;
		display: inline-grid;
		/* minmax(0, …): long labels must not push a tab (and its count) over the other */
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		padding: 5px;
		margin-bottom: 1.25rem;
		border-radius: 50px;
		background: rgba(255,255,255,0.07);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
		max-width: 100%;
	}
	.tabs-pill {
		position: absolute;
		top: 5px;
		bottom: 5px;
		left: 5px;
		width: calc(50% - 5px);
		border-radius: 50px;
		background: #FAF9F6;
		box-shadow: 0 10px 22px -10px rgba(0,0,0,0.5);
		transform: translateX(calc(var(--pos) * 100%));
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.tab-btn {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.7rem 1.2rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.9rem;
		font-weight: 700;
		line-height: 1.25;
		min-width: 0;
		color: rgba(250,249,246,0.8);
		background: transparent;
		cursor: pointer;
		transition: color 0.35s ease;
	}
	.tab-btn:hover { color: #FAF9F6; }
	.tab-btn.active { color: var(--navy); }
	.tab-btn:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }
	.tab-label { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.tab-btn svg { flex-shrink: 0; }
	.tab-count {
		flex-shrink: 0;
		line-height: 1.5;
		text-align: center;
		min-width: 24px;
		padding: 0.1rem 0.45rem;
		border-radius: 50px;
		font-size: 0.72rem;
		font-variant-numeric: tabular-nums;
		color: inherit;
		background: rgba(255,255,255,0.12);
		transition: background 0.35s ease, color 0.35s ease;
	}
	.tab-btn.active .tab-count { color: #FAF9F6; background: var(--cta); }

	/* ─── FILTER BAR ─── */
	.filter-bar {
		scroll-margin-top: calc(var(--nav-h) + 2rem);
		display: grid;
		/* minmax(0, …): long select options must not widen the bar past the card */
		grid-template-columns: minmax(0, 1fr);
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: 22px;
		background: #ffffff;
		box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.5);
	}
	.fb-field {
		position: relative;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-height: 62px;
		padding: 0 1rem;
		border-radius: 16px;
		color: var(--navy);
		transition: background 0.25s ease;
	}
	.fb-field:hover, .fb-field:focus-within { background: #f4f3ef; }
	.fb-icon { flex-shrink: 0; color: var(--cta); }
	.fb-query input {
		flex: 1;
		min-width: 0;
		border: 0;
		outline: none;
		background: transparent;
		font: inherit;
		font-size: 1.02rem;
		color: var(--navy);
	}
	.fb-query input::placeholder { color: #8a919c; }
	.fb-tile {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 12px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
	}
	.fb-select-body { position: relative; display: flex; flex-direction: column; flex: 1; min-width: 0; }
	.fb-select-body label {
		font-size: 0.66rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #8a919c;
	}
	.fb-select-body select {
		width: 100%;
		min-width: 0;
		appearance: none;
		-webkit-appearance: none;
		border: 0;
		outline: none;
		background: transparent;
		font: inherit;
		font-size: 0.98rem;
		font-weight: 600;
		color: var(--navy);
		cursor: pointer;
		padding: 0.1rem 1.5rem 0.1rem 0;
	}
	.fb-chevron { position: absolute; right: 1rem; color: #8a919c; pointer-events: none; }

	/* Arrival from the nav "Pretraga" link: a soft red ring pulses around the bar */
	.filter-bar.spotlight { animation: bar-spotlight 1.3s ease-out 2; }
	@keyframes bar-spotlight {
		0%   { box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 0 rgba(240,106,117,0.75); }
		100% { box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 14px rgba(240,106,117,0); }
	}
	.filter-bar:focus-within { box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 3px rgba(240,106,117,0.5); }
	#pretraga { scroll-margin-top: calc(var(--nav-h) + 6rem); }

	/* Quick sector picks */
	.quick {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.1rem;
	}
	.quick-label {
		margin-right: 0.25rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.6);
	}
	.quick-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.45rem 0.4rem 0.95rem;
		border-radius: 50px;
		font-size: 0.85rem;
		font-weight: 600;
		text-decoration: none;
		color: #FAF9F6;
		background: rgba(255,255,255,0.07);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
	}
	.quick-count {
		min-width: 22px;
		padding: 0.1rem 0.4rem;
		border-radius: 50px;
		font-size: 0.72rem;
		font-weight: 700;
		text-align: center;
		font-variant-numeric: tabular-nums;
		background: rgba(255,255,255,0.14);
		transition: background 0.3s ease, color 0.3s ease;
	}
	.quick-chip:hover {
		color: var(--navy);
		background: #FAF9F6;
		box-shadow: 0 10px 22px -10px rgba(0,0,0,0.5);
		transform: translateY(-2px);
	}
	.quick-chip:hover .quick-count { color: #FAF9F6; background: var(--cta); }
	.quick-chip:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }

	/* Active filters */
	.active-filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem;
		margin-top: 1rem;
	}
	.af-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.4rem 0.35rem 0.9rem;
		border-radius: 50px;
		font-size: 0.85rem;
		color: #FAF9F6;
		background: rgba(255,255,255,0.1);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.22);
	}
	.af-chip button {
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		border: 0;
		border-radius: 50%;
		color: #FAF9F6;
		background: var(--cta);
		cursor: pointer;
	}
	.af-clear {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.9rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.82rem;
		font-weight: 700;
		color: rgba(250,249,246,0.85);
		background: transparent;
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);
		cursor: pointer;
		transition: background 0.25s ease, color 0.25s ease;
	}
	.af-clear:hover { background: rgba(255,255,255,0.1); color: #FAF9F6; }
	.af-clear.dark { color: var(--navy); box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2); }
	.af-clear.dark:hover { color: #FAF9F6; background: var(--navy); }
	.af-chip button:focus-visible, .af-clear:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }
	.af-clear.dark:focus-visible { outline-color: var(--cta); }

	/* ─── AD ─── */
	.ad-section {
		background: var(--surface-light);
		padding: clamp(1.25rem, 3vw, 2rem);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
		display: flex;
		justify-content: center;
	}
	.ad-section .container { display: flex; justify-content: center; width: 100%; }
	.ad-section :global(.ad-slot) { max-width: 1120px; }

	/* ─── RESULTS ─── */
	.companies-body {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		background: var(--surface-light);
		padding: clamp(2.5rem, 6vw, 4.5rem) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
	}
	.body-backdrop {
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(circle at 1px 1px, rgba(11,52,102,0.07) 1px, transparent 0) 0 0 / 22px 22px;
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 60%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 60%);
		pointer-events: none;
	}
	.results-head {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-bottom: 1.75rem;
	}
	.results-count {
		display: inline-flex;
		align-items: baseline;
		gap: 0.5rem;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #6b7380;
		white-space: nowrap;
	}
	/* Phones: the count label may wrap rather than run past the card */
	@media (max-width: 599px) {
		.results-count { white-space: normal; min-width: 0; }
	}
	.results-count strong {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--navy);
		font-variant-numeric: tabular-nums;
	}
	.results-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(11,52,102,0.18), transparent); }

	.companies-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.4rem);
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
		animation: card-in 0.5s cubic-bezier(0.22,1,0.36,1) both;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	@keyframes card-in {
		from { opacity: 0; transform: translateY(12px); }
		to   { opacity: 1; transform: none; }
	}
	.company-card:hover {
		transform: translateY(-6px);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 34px 60px -28px rgba(15,23,42,0.32),
			inset 0 0 0 1px rgba(15,23,42,0.1);
	}

	.company-band {
		position: relative;
		/* Featured badge (left) and status pill (right) share one row and wrap instead of overlapping */
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		align-content: flex-start;
		gap: 0.45rem;
		padding: 0.9rem;
		height: 92px;
		box-sizing: border-box;
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
	.featured-badge {
		position: relative;
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.25rem 0.6rem;
		border-radius: 50px;
		font-size: 0.66rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #3d2a00;
		background: linear-gradient(160deg, #f6d27a, #e2b44c);
		box-shadow: 0 6px 14px -6px rgba(0,0,0,0.45);
	}
	.company-badge { position: relative; margin-left: auto; min-width: 0; max-width: 100%; }
	.company-badge :global(.status) {
		margin-bottom: 0;
		color: #FAF9F6;
		background: rgba(255,255,255,0.14);
		border-color: rgba(255,255,255,0.28);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}
	.company-badge :global(.status.verified) { background: var(--success); border-color: rgba(255,255,255,0.35); }
	.company-badge :global(.status) { max-width: 100%; }
	.company-badge :global(.status svg) { flex-shrink: 0; }

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

	/* Empty state */
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 4rem 1rem;
		text-align: center;
		color: #4a525e;
		border-radius: var(--radius-2xl);
		background: rgba(255,255,255,0.6);
		box-shadow: inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.empty-icon {
		display: grid;
		place-items: center;
		width: 64px;
		height: 64px;
		border-radius: 20px;
		color: var(--navy);
		background: rgba(11,52,102,0.07);
	}

	/* Visibility CTA */
	.visibility-box {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		padding: clamp(1.75rem, 4vw, 2.75rem);
		border-radius: var(--radius-2xl);
		color: #FAF9F6;
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised);
	}
	.vb-glow {
		position: absolute;
		z-index: -1;
		right: -10%;
		top: -60%;
		width: 55%;
		height: 220%;
		background: radial-gradient(ellipse at center, rgba(196,42,56,0.35), transparent 65%);
		pointer-events: none;
	}
	.vb-copy { display: flex; align-items: flex-start; gap: 1.1rem; }
	.vb-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 54px;
		height: 54px;
		border-radius: 16px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 12px 24px -10px rgba(155,17,30,0.7), inset 0 1px 0 rgba(255,255,255,0.28);
	}
	.visibility-box h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.1;
		margin-bottom: 0.5rem;
	}
	.visibility-box p { font-size: 1rem; line-height: 1.6; color: rgba(250,249,246,0.78); max-width: 52ch; }
	.vb-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; flex-shrink: 0; }
	.vb-main {
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
		transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.vb-main-arrow {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		color: var(--cta);
		background: #FAF9F6;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.vb-main:hover { transform: translateY(-2px); }
	.vb-main:hover .vb-main-arrow { transform: rotate(45deg); }
	.vb-ghost {
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
	.vb-ghost:hover { background: rgba(255,255,255,0.1); box-shadow: inset 0 0 0 1px #FAF9F6; }
	.vb-main:focus-visible, .vb-ghost:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	/* ─── Responsive ─── */
	@media (max-width: 479px) {
		.tabs { display: grid; width: 100%; }
		.tab-btn { padding: 0.6rem 0.5rem; gap: 0.4rem; font-size: 0.8rem; }
		/* Very narrow: label may wrap to two lines rather than being cut */
		.tab-label { white-space: normal; overflow: visible; text-align: center; }
		.tab-btn svg { display: none; }
	}
	@media (min-width: 600px) {
		.companies-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 860px) {
		/* Search gets the widest segment; works with or without the location select */
		.filter-bar { grid-template-columns: minmax(0, 1.6fr); grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 0; }
		.fb-field + .fb-field::before {
			content: '';
			position: absolute;
			left: 0;
			top: 18%;
			bottom: 18%;
			width: 1px;
			background: rgba(15,23,42,0.1);
		}
		.visibility-box { flex-direction: row; align-items: center; justify-content: space-between; }
	}
	@media (min-width: 1024px) {
		.companies-grid { grid-template-columns: repeat(3, 1fr); }
	}
	@media (prefers-reduced-motion: reduce) {
		.filter-bar.spotlight { animation: none; }
		.quick-chip { transition: none; }
		.quick-chip:hover { transform: none; }
		.tabs-pill, .company-card, .company-band-pattern, .company-avatar, .company-btn-arrow, .vb-main, .vb-main-arrow { transition: none; }
		.company-card { animation: none; }
		.company-card:hover, .company-card:hover .company-band-pattern, .company-card:hover .company-avatar,
		.company-btn:hover .company-btn-arrow, .vb-main:hover, .vb-main:hover .vb-main-arrow { transform: none; }
	}
</style>

<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms, investors } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';
	import { enquiryUrl } from '$lib/enquiry';
	import { matches, industryOptions, locationOptions, sectors, inSector } from '$lib/search';
	import DirectoryFilters from '$lib/components/DirectoryFilters.svelte';

	const PAGE = 24;

	let search = $state('');
	let activeTab = $state<'local' | 'investors'>('local');
	let limit = $state(PAGE);

	let industry = $state('');
	let location = $state('');
	let sector = $state('');

	const filters = $derived({ q: search, cat: industry, city: location, sector });
	const tabList = $derived(activeTab === 'local' ? domesticFirms : investors);
	const localCount = $derived(domesticFirms.filter((c) => matches(c, filters, i18n.lang)).length);
	const investorCount = $derived(investors.filter((c) => matches(c, filters, i18n.lang)).length);
	const filtered = $derived(tabList.filter((c) => matches(c, filters, i18n.lang)));
	const shown = $derived(filtered.slice(0, limit));

	// Filter options and quick sector picks come from the current tab's companies
	const industries = $derived({ options: industryOptions(i18n.lang, tabList) });
	const locations = $derived({ options: locationOptions(tabList) });
	const quick = $derived(
		sectors
			.map((s) => ({
				id: s.id,
				label: i18n.t.ecosystem.sectors[s.id],
				count: tabList.filter((c) => inSector(c, s.id)).length
			}))
			.filter((s) => s.count > 0)
			.sort((a, b) => b.count - a.count)
			.slice(0, 6)
	);
	const chips = $derived(
		sector
			? [{ label: i18n.t.ecosystem.active, value: i18n.t.ecosystem.sectors[sector], onRemove: () => (sector = '') }]
			: []
	);

	function clearAll() {
		search = '';
		industry = '';
		location = '';
		sector = '';
	}

	// Start from the first page whenever the list changes
	$effect(() => {
		search; industry; location; sector; activeTab;
		limit = PAGE;
	});

	function setTab(tab: 'local' | 'investors') {
		activeTab = tab;
		clearAll();
	}
</script>

<svelte:head>
	<title>{i18n.t.network.heading} — Semberija.app</title>
</svelte:head>

{#snippet pillarIcon(i: number)}
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
		{:else if i === 1}
			<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
		{:else if i === 2}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
		{:else}
			<circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 7l3.5 3M18 7l-3.5 3M6 17l3.5-3M18 17l-3.5-3"/>
		{/if}
	</svg>
{/snippet}

<div class="page-wrap">
<!-- ─── HERO ─── -->
<section class="page-top reveal-card" use:reveal>
	<div class="top-glow" aria-hidden="true"></div>
	<div class="top-lines" aria-hidden="true"></div>
	<div class="container">
		<span class="page-label"><span class="page-label-dot"></span>{i18n.t.network.label}</span>
		<h1>{i18n.t.network.heading}</h1>
		<p class="page-sub">{i18n.t.network.sub}</p>

		<div class="tabs" role="tablist" style="--pos:{activeTab === 'local' ? 0 : 1}">
			<span class="tabs-pill" aria-hidden="true"></span>
			<button type="button" role="tab" aria-selected={activeTab === 'local'} class="tab-btn" class:active={activeTab === 'local'} onclick={() => setTab('local')}>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M10 21v-3h4v3"/></svg>
				<span class="tab-label">{i18n.t.companies.localTab}</span>
				<span class="tab-count">{localCount}</span>
			</button>
			<button type="button" role="tab" aria-selected={activeTab === 'investors'} class="tab-btn" class:active={activeTab === 'investors'} onclick={() => setTab('investors')}>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/></svg>
				<span class="tab-label">{i18n.t.companies.investorsTab}</span>
				<span class="tab-count">{investorCount}</span>
			</button>
		</div>

		<DirectoryFilters
			bind:query={search}
			bind:industry
			bind:location
			placeholder={i18n.t.ui.searchNetwork}
			{industries}
			{locations}
			{quick}
			onQuick={(id) => (sector = id)}
			{chips}
			onClear={clearAll}
		/>

		<!-- What the network does -->
		<div class="pillars">
			{#each i18n.t.network.items as item, i}
				<div class="pillar">
					<span class="pillar-icon">{@render pillarIcon(i)}</span>
					<div>
						<h2>{item.title}</h2>
						<p>{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── DIRECTORY ─── -->
<section class="page-body reveal-card" use:reveal>
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		<div class="body-head">
			<span class="results-count" aria-live="polite">
				<strong>{filtered.length}</strong>
				{activeTab === 'local' ? i18n.t.ecosystem.companies : i18n.t.companies.investorsTab}
			</span>
			<div class="network-tags">
				{#each i18n.t.ui.networkTypes as label}
					<span class="network-tag"><span class="network-tag-dot" aria-hidden="true"></span>{label}</span>
				{/each}
			</div>
		</div>

		{#if filtered.length === 0}
			<div class="empty">
				<span class="empty-icon" aria-hidden="true">
					<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/><path d="M8.5 8.5l5 5M13.5 8.5l-5 5"/></svg>
				</span>
				<p>{i18n.t.ui.noResultsShort}</p>
				{#if search || industry || location || sector}
					<button type="button" class="ghost-btn" onclick={clearAll}>{i18n.t.ecosystem.clear}</button>
				{/if}
			</div>
		{:else}
			<div class="companies-grid">
				{#each shown as company (company.slug)}
					<article class="company-card" style="--brand: {company.color}">
						<span class="company-edge" aria-hidden="true"></span>
						<div class="company-top">
							<div class="company-avatar" aria-hidden="true">{company.initials}</div>
							<div class="company-meta">
								<span class="company-category">{i18n.lang === 'sr' ? company.category_sr : company.category_en}</span>
								<span class="company-city">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
									{company.city}
								</span>
							</div>
						</div>
						<h3 class="company-name">{company.name}</h3>
						<p class="company-desc">{i18n.lang === 'sr' ? company.desc_sr : company.desc_en}</p>
						<a href={enquiryUrl('b2b', company.name)} class="company-btn">
							<span>{i18n.t.companies.inquire}</span>
							<span class="company-btn-arrow" aria-hidden="true">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</a>
					</article>
				{/each}
			</div>

			{#if filtered.length > shown.length}
				<div class="more">
					<span class="more-progress" aria-hidden="true">
						<span style="width:{(shown.length / filtered.length) * 100}%"></span>
					</span>
					<span class="more-count">{shown.length} / {filtered.length}</span>
					<button type="button" class="more-btn" onclick={() => (limit += PAGE)}>
						{i18n.t.companies.showMore}
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
					</button>
				</div>
			{/if}
		{/if}
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
		padding: clamp(3rem, 7vw, 5.5rem) var(--section-px) clamp(2rem, 4vw, 3rem);
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
			radial-gradient(35% 45% at 88% 25%, rgba(196,42,56,0.25), transparent 70%);
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
		-webkit-mask-image: radial-gradient(ellipse 70% 70% at 75% 20%, #000 10%, transparent 75%);
		mask-image: radial-gradient(ellipse 70% 70% at 75% 20%, #000 10%, transparent 75%);
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

	/* Segmented tabs */
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
		background: rgba(255,255,255,0.12);
		transition: background 0.35s ease, color 0.35s ease;
	}
	.tab-btn.active .tab-count { color: #FAF9F6; background: var(--cta); }

	/* Pillars */
	.pillars {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.85rem;
		margin-top: clamp(2rem, 4vw, 2.75rem);
		padding-top: clamp(1.5rem, 3vw, 2rem);
		border-top: 1px solid rgba(255,255,255,0.1);
	}
	.pillar {
		display: flex;
		align-items: flex-start;
		gap: 0.9rem;
		padding: 1.1rem 1.2rem;
		border-radius: 18px;
		background: linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.08);
		transition: background 0.35s ease;
	}
	.pillar:hover { background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%); }
	.pillar-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		border-radius: 13px;
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 10px 20px -10px rgba(155,17,30,0.7), inset 0 1px 0 rgba(255,255,255,0.25);
	}
	.pillar h2 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: -0.015em;
		color: #FAF9F6;
		margin-bottom: 0.25rem;
	}
	.pillar p { font-size: 0.85rem; line-height: 1.5; color: rgba(250,249,246,0.7); }

	/* ─── DIRECTORY ─── */
	.page-body {
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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 40%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 40%);
		pointer-events: none;
	}
	.body-head {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgba(15,23,42,0.08);
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
		font-size: 2.2rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--navy);
		font-variant-numeric: tabular-nums;
	}
	.network-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; }
	.network-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.35rem 0.85rem;
		border-radius: 50px;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--navy);
		background: #ffffff;
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.12), 0 4px 10px -8px rgba(15,23,42,0.3);
	}
	.network-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--cta); }

	.companies-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(0.9rem, 2vw, 1.2rem);
	}
	.company-card {
		--brand: var(--steel);
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: 1.5rem 1.5rem 1.4rem;
		border-radius: var(--radius-2xl);
		background: #ffffff;
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 12px 28px -18px rgba(15,23,42,0.18),
			inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
		/* Long list: let the browser skip rendering off-screen cards */
		content-visibility: auto;
		contain-intrinsic-size: auto 260px;
	}
	/* Brand-colour edge that grows on hover */
	.company-edge {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: var(--brand);
		transform: scaleY(0.35);
		transform-origin: top;
		transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
	}
	.company-card:hover {
		transform: translateY(-5px);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 30px 54px -28px rgba(15,23,42,0.32),
			inset 0 0 0 1px rgba(15,23,42,0.1);
	}
	.company-card:hover .company-edge { transform: scaleY(1); }

	.company-top { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1rem; }
	.company-avatar {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 50px;
		height: 50px;
		border-radius: 15px;
		font-family: var(--font-heading);
		font-size: 0.9rem;
		font-weight: 800;
		color: #ffffff;
		background:
			radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.25), transparent 60%),
			var(--brand);
		box-shadow: 0 10px 20px -10px rgba(5,9,15,0.55);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
	}
	.company-card:hover .company-avatar { transform: rotate(-5deg) scale(1.05); }
	.company-meta { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
	.company-category {
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--brand) 75%, #05090f);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.company-city {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.82rem;
		color: var(--muted);
	}
	.company-name {
		font-family: var(--font-heading);
		font-size: 1.12rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--navy);
		margin-bottom: 0.45rem;
	}
	.company-desc {
		flex: 1;
		font-size: 0.88rem;
		line-height: 1.6;
		color: #4a525e;
		margin-bottom: 1.2rem;
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
		padding: 0.45rem 0.45rem 0.45rem 1.05rem;
		border-radius: 50px;
		font-size: 0.85rem;
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
		width: 30px;
		height: 30px;
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

	/* Show more */
	.more {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.85rem;
		margin-top: 2.5rem;
	}
	.more-progress {
		position: relative;
		width: min(240px, 60%);
		height: 3px;
		border-radius: 3px;
		background: rgba(11,52,102,0.1);
		overflow: hidden;
	}
	.more-progress span {
		position: absolute;
		inset: 0 auto 0 0;
		border-radius: inherit;
		background: var(--accent-line);
		transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
	}
	.more-count {
		font-family: var(--font-heading);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: #6b7380;
		font-variant-numeric: tabular-nums;
	}
	.more-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.85rem 1.6rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.88rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #FAF9F6;
		background: var(--navy);
		box-shadow: 0 14px 28px -14px rgba(5,9,15,0.6);
		cursor: pointer;
		transition: background 0.3s ease, transform 0.3s ease;
	}
	.more-btn:hover { background: var(--cta); transform: translateY(-2px); }
	.more-btn:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }

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
		width: 60px;
		height: 60px;
		border-radius: 18px;
		color: var(--navy);
		background: rgba(11,52,102,0.07);
	}
	.ghost-btn {
		padding: 0.5rem 1.1rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--navy);
		background: transparent;
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		cursor: pointer;
		transition: background 0.25s ease, color 0.25s ease;
	}
	.ghost-btn:hover { color: #FAF9F6; background: var(--navy); }

	/* ─── Responsive ─── */
	@media (max-width: 479px) {
		.tabs { display: grid; width: 100%; }
		.tab-btn { padding: 0.6rem 0.5rem; gap: 0.4rem; font-size: 0.8rem; }
		.tab-btn svg { display: none; }
		/* Very narrow: label may wrap to two lines rather than being cut */
		.tab-label { white-space: normal; overflow: visible; text-align: center; }
	}
	@media (min-width: 600px) {
		.companies-grid { grid-template-columns: repeat(2, 1fr); }
		.pillars { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 479px) {
		.tab-btn svg { display: none; }
	}
	@media (min-width: 860px) {
		.body-head { flex-direction: row; align-items: center; justify-content: space-between; }
		.network-tags { justify-content: flex-end; }
	}
	@media (min-width: 1024px) {
		.companies-grid { grid-template-columns: repeat(3, 1fr); }
	}
	@media (min-width: 1200px) {
		.pillars { grid-template-columns: repeat(4, 1fr); }
	}
	@media (prefers-reduced-motion: reduce) {
		.tabs-pill, .company-card, .company-edge, .company-avatar, .company-btn-arrow, .more-btn, .more-progress span { transition: none; }
		.company-card:hover, .company-card:hover .company-avatar, .company-btn:hover .company-btn-arrow, .more-btn:hover { transform: none; }
	}
</style>

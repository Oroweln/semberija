<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms, investors, categories, visibleFirmSlugs } from '$lib/data';
	import { page } from '$app/stores';
	import { reveal } from '$lib/actions/reveal';
	import AdPlaceholder from '$lib/components/AdPlaceholder.svelte';

	let search = $state('');
	let activeCategory = $state('');
	let activeTab = $state<'local' | 'investors'>('local');

	$effect(() => {
		const cat = $page.url.searchParams.get('cat');
		if (cat) activeCategory = cat;
	});

	function switchTab(tab: 'local' | 'investors') {
		activeTab = tab;
		activeCategory = '';
		search = '';
	}

	const investorCategories = $derived(
		[...new Set(investors.map(c => i18n.lang === 'sr' ? c.category_sr : c.category_en))].sort()
	);

	const filteredLocal = $derived(
		domesticFirms.filter((c) => visibleFirmSlugs.includes(c.slug)).filter((c) => {
			const name = c.name.toLowerCase();
			const cat = i18n.lang === 'sr' ? c.category_sr : c.category_en;
			const matchSearch = !search || name.includes(search.toLowerCase()) || cat.toLowerCase().includes(search.toLowerCase());
			const matchCat = !activeCategory || (i18n.lang === 'sr' ? c.category_sr : c.category_en) === activeCategory;
			return matchSearch && matchCat;
		})
	);

	const filteredInvestors = $derived(
		investors.filter((c) => {
			const name = c.name.toLowerCase();
			const cat = i18n.lang === 'sr' ? c.category_sr : c.category_en;
			const matchSearch = !search || name.includes(search.toLowerCase()) || cat.toLowerCase().includes(search.toLowerCase());
			const matchCat = !activeCategory || (i18n.lang === 'sr' ? c.category_sr : c.category_en) === activeCategory;
			return matchSearch && matchCat;
		})
	);

	const filtered = $derived(activeTab === 'local' ? filteredLocal : filteredInvestors);
	const activeCats = $derived(activeTab === 'local' ? categories.slice(0, 8) : null);
</script>

<svelte:head>
	<title>{i18n.t.nav.companies} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<p class="page-label">{i18n.t.nav.companies}</p>
		<h1>
			{activeTab === 'local' ? i18n.t.ui.companiesLocal : i18n.t.ui.investorsLabel}
		</h1>
		<p class="page-sub">
			{activeTab === 'local' ? i18n.t.companies.localSub : i18n.t.companies.investorsSub}
		</p>

		<div class="tabs">
			<button
				class="tab-btn"
				class:active={activeTab === 'local'}
				onclick={() => switchTab('local')}
			>
				{i18n.t.companies.localTab}
			</button>
			<button
				class="tab-btn"
				class:active={activeTab === 'investors'}
				onclick={() => switchTab('investors')}
			>
				{i18n.t.companies.investorsTab}
			</button>
		</div>

		<div class="search-row">
			<div class="search-wrap">
				<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
				</svg>
				<input
					type="text"
					placeholder={i18n.t.ui.searchPlaceholder}
					bind:value={search}
					class="search-input"
				/>
			</div>

			<div class="cat-select-wrap">
				<svg class="cat-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="6 9 12 15 18 9"/>
				</svg>
				<select class="cat-select" bind:value={activeCategory} aria-label={i18n.t.ui.categories}>
					<option value="">{i18n.t.ui.categories}</option>
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
		</div>

	</div>
</div>

<div class="ad-section reveal-card" use:reveal>
	<div class="container">
		<AdPlaceholder variant="leaderboard" label="Your advertisement here" />
	</div>
</div>

<div class="companies-body reveal-card" use:reveal>
	<div class="container">
		{#if filtered.length === 0}
			<div class="empty">
				<p>{i18n.t.ui.noResults}</p>
			</div>
		{:else}
			<div class="companies-grid">
				{#each filtered as company}
					<article class="company-card" class:featured={company.featured}>
						{#if company.featured}
							<div class="featured-badge">{i18n.t.companies.featured}</div>
						{/if}
						<div class="company-top">
							<div class="company-avatar" style="background: {company.color}">
								{company.initials}
							</div>
							<div class="company-meta">
								<span class="company-category">
									{i18n.lang === 'sr' ? company.category_sr : company.category_en}
								</span>
								<span class="company-city">{company.city}</span>
							</div>
						</div>
						<h3 class="company-name">{company.name}</h3>
						<p class="company-desc">
							{i18n.lang === 'sr' ? company.desc_sr : company.desc_en}
						</p>
						<a href="/kontakt" class="company-btn">{i18n.t.companies.inquire}</a>
					</article>
				{/each}
			</div>
		{/if}

		<div class="visibility-box">
			<h2>{i18n.t.companies.visibilityHeading}</h2>
			<p>{i18n.t.companies.visibilitySub}</p>
			<a href="/kontakt" class="btn-primary">{i18n.t.ui.contactUs}</a>
		</div>
	</div>
</div>
</div>

<style>
	.page-wrap {
		max-width: 1440px;
		margin: 0 auto;
		padding: calc(92px + 1.25rem) clamp(1rem, 3vw, 2rem) 3rem;
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	.page-top {
		background: var(--card-blue);
		color: white;
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow:
		inset 0 8px 20px -4px rgba(0,0,0,0.4),
		inset 0 -2px 6px -2px rgba(255,255,255,0.05),
		inset 8px 0 20px -10px rgba(0,0,0,0.25),
		inset -8px 0 20px -10px rgba(0,0,0,0.25);
		border: 1px solid rgba(255,255,255,0.05);
	}

	.container {
		max-width: var(--max-w);
		margin: 0 auto;
	}

	.page-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--silver);
		margin-bottom: 0.75rem;
	}

	.page-top h1 {
		font-family: var(--font-serif);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		margin-bottom: 0.5rem;
		line-height: 1.1;
	}

	.page-sub {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.65);
		margin-bottom: 2rem;
	}

	/* ─── TABS ─── */
	.tabs {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.tab-btn {
		font-family: var(--font-sans);
		font-size: 0.88rem;
		font-weight: 600;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);
		background: rgba(255, 255, 255, 0.08);
		border: 1.5px solid rgba(255, 255, 255, 0.2);
		border-radius: 50px;
		padding: 0.55rem 1.4rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.tab-btn:hover {
		background: rgba(255, 255, 255, 0.14);
		color: white;
		border-color: rgba(255, 255, 255, 0.4);
	}

	.tab-btn.active {
		background: var(--silver);
		color: var(--dark);
		border-color: var(--silver);
	}

	/* ─── SEARCH ─── */
	.search-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.search-wrap {
		position: relative;
		flex: 1 1 320px;
		max-width: 480px;
	}

	.search-icon {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
	}

	.search-input {
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius);
		color: white;
		font-family: var(--font-sans);
		font-size: 0.95rem;
		padding: 0.8rem 1rem 0.8rem 2.75rem;
		outline: none;
		transition: border-color 0.2s, background 0.2s;
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	.search-input:focus {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(154,164,178, 0.6);
	}

	/* ─── CATEGORY FILTER ─── */
	.cat-select-wrap {
		position: relative;
		flex: 1 1 220px;
		max-width: 280px;
	}

	.cat-select-icon {
		position: absolute;
		right: 0.9rem;
		top: 50%;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
		pointer-events: none;
	}

	.cat-select {
		width: 100%;
		appearance: none;
		-webkit-appearance: none;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius);
		color: white;
		font-family: var(--font-sans);
		font-size: 0.95rem;
		padding: 0.8rem 2.5rem 0.8rem 1rem;
		outline: none;
		cursor: pointer;
		transition: border-color 0.2s, background 0.2s;
	}

	.cat-select:hover,
	.cat-select:focus {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(154,164,178, 0.6);
	}

	.cat-select option {
		background: var(--card-blue);
		color: white;
	}

	/* ─── AD ─── */
	.ad-section {
		background: radial-gradient(140% 140% at 25% 15%, #ffffff 0%, #f2f3f6 100%);
		padding: 2rem var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-bento), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -16px 30px -20px rgba(15,23,42,0.14);
		border: 1px solid rgba(255,255,255,0.4);
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

	/* ─── GRID ─── */
	.companies-body {
		background: radial-gradient(140% 140% at 25% 15%, #ffffff 0%, #f2f3f6 100%);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-bento), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -16px 30px -20px rgba(15,23,42,0.14);
		border: 1px solid rgba(255,255,255,0.4);
	}

	.companies-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.company-card {
		background: var(--soft-white);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		border: 1px solid rgba(8, 14, 26, 0.05);
		position: relative;
		display: flex;
		flex-direction: column;
		transition: transform 0.25s, background 0.25s;
	}

	.company-card:hover {
		transform: translateY(-3px);
		background: white;
	}

	.company-card.featured {
		border-color: rgba(154,164,178, 0.3);
	}

	.featured-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dark);
		background: var(--silver);
		padding: 0.2rem 0.55rem;
		border-radius: 4px;
	}

	.company-top {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin-bottom: 1rem;
	}

	.company-avatar {
		width: 44px;
		height: 44px;
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-serif);
		font-size: 0.85rem;
		font-weight: 700;
		color: white;
		flex-shrink: 0;
	}

	.company-meta {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.company-category {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--navy-mid);
	}

	.company-city {
		font-size: 0.75rem;
		color: var(--muted);
	}

	.company-name {
		font-family: var(--font-serif);
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 0.6rem;
	}

	.company-desc {
		font-size: 0.83rem;
		color: var(--muted);
		line-height: 1.6;
		flex: 1;
		margin-bottom: 1.25rem;
	}

	.company-btn {
		display: block;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--navy-mid);
		background: rgba(15, 61, 62, 0.06);
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-sm);
		text-align: center;
		transition: background 0.2s;
	}

	.company-btn:hover {
		background: rgba(15, 61, 62, 0.12);
	}

	.empty {
		text-align: center;
		padding: 4rem 0;
		color: var(--muted);
	}

	.visibility-box {
		text-align: center;
		background: var(--card-blue);
		border-radius: var(--radius-xl);
		padding: 3.5rem 2rem;
		margin-top: 3rem;
		color: white;
		box-shadow:
			inset 0 8px 20px -4px rgba(0,0,0,0.4),
			inset 0 -2px 6px -2px rgba(255,255,255,0.05),
			inset 8px 0 20px -10px rgba(0,0,0,0.25),
			inset -8px 0 20px -10px rgba(0,0,0,0.25);
	}

	.visibility-box h2 {
		font-family: var(--font-serif);
		font-size: clamp(1.4rem, 3vw, 2rem);
		font-weight: 700;
		margin-bottom: 0.75rem;
	}

	.visibility-box p {
		font-size: 0.95rem;
		color: rgba(255,255,255,0.6);
		margin-bottom: 2rem;
		max-width: 480px;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.6;
	}

	.visibility-box .btn-primary {
		display: inline-flex;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--navy);
		background: linear-gradient(135deg, var(--platinum), var(--silver));
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: 10px;
		transition: opacity 0.2s, transform 0.2s;
		box-shadow: 0 5px 20px rgba(5,9,15,0.24);
	}

	.visibility-box .btn-primary:hover {
		opacity: 0.9;
		transform: translateY(-2px);
	}

	@media (min-width: 480px) {
		.tabs {
			flex-direction: row;
		}
		.tab-btn {
			text-align: left;
		}
	}

	@media (min-width: 600px) {
		.companies-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.companies-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>

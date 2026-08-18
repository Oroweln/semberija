<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms, investors, categories } from '$lib/data';
	import { page } from '$app/stores';

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
		domesticFirms.filter((c) => {
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

<div class="page-top">
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
		</div>

		<div class="cat-filters">
			<button
				class="cat-btn"
				class:active={!activeCategory}
				onclick={() => (activeCategory = '')}
			>
				{i18n.t.ui.all}
			</button>
			{#if activeTab === 'local' && activeCats}
				{#each activeCats as cat}
					<button
						class="cat-btn"
						class:active={activeCategory === (i18n.lang === 'sr' ? cat.name_sr : cat.name_en)}
						onclick={() => (activeCategory = i18n.lang === 'sr' ? cat.name_sr : cat.name_en)}
					>
						{i18n.lang === 'sr' ? cat.name_sr : cat.name_en}
					</button>
				{/each}
			{:else}
				{#each investorCategories as cat}
					<button
						class="cat-btn"
						class:active={activeCategory === cat}
						onclick={() => (activeCategory = cat)}
					>
						{cat}
					</button>
				{/each}
			{/if}
		</div>
	</div>
</div>

<div class="companies-body">
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
	</div>
</div>

<style>
	.page-top {
		background: var(--emerald);
		color: white;
		padding: 8rem var(--section-px) 3rem;
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
		color: var(--gold);
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
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.tab-btn {
		font-family: var(--font-sans);
		font-size: 0.88rem;
		font-weight: 600;
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
		background: var(--gold);
		color: var(--dark);
		border-color: var(--gold);
	}

	/* ─── SEARCH ─── */
	.search-row {
		margin-bottom: 1.5rem;
	}

	.search-wrap {
		position: relative;
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
		border-color: rgba(200, 169, 106, 0.6);
	}

	/* ─── CATEGORY FILTER ─── */
	.cat-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.cat-btn {
		font-family: var(--font-sans);
		font-size: 0.8rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.65);
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 50px;
		padding: 0.35rem 0.9rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.cat-btn:hover,
	.cat-btn.active {
		background: var(--gold);
		color: var(--dark);
		border-color: var(--gold);
	}

	/* ─── GRID ─── */
	.companies-body {
		background: var(--beige);
		padding: 3rem var(--section-px) 5rem;
	}

	.companies-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.company-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0, 0, 0, 0.06);
		position: relative;
		display: flex;
		flex-direction: column;
		transition: transform 0.25s, box-shadow 0.25s;
	}

	.company-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
	}

	.company-card.featured {
		border-color: rgba(200, 169, 106, 0.3);
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
		background: var(--gold);
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
		color: var(--emerald);
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
		color: var(--emerald);
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

	@media (max-width: 1024px) {
		.companies-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.companies-grid {
			grid-template-columns: 1fr;
		}
		.tabs {
			flex-direction: column;
		}
		.tab-btn {
			text-align: center;
		}
	}
</style>

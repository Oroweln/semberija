<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms, investors } from '$lib/data';

	let search = $state('');
	let activeTab = $state<'local' | 'investors'>('local');

	const filtered = $derived(
		(activeTab === 'local' ? domesticFirms : investors).filter(c => {
			const q = search.toLowerCase();
			return !q || c.name.toLowerCase().includes(q) ||
				(i18n.lang === 'sr' ? c.category_sr : c.category_en).toLowerCase().includes(q);
		})
	);

</script>

<svelte:head>
	<title>{i18n.t.network.heading} — Semberija.app</title>
</svelte:head>

<div class="page-top">
	<div class="container">
		<span class="page-tag">{i18n.t.network.label}</span>
		<h1>{i18n.t.network.heading}</h1>
		<p class="page-sub">{i18n.t.network.sub}</p>

		<div class="search-wrap">
			<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
			</svg>
			<input type="text" bind:value={search} placeholder={i18n.t.ui.searchNetwork} class="search-input" />
		</div>

		<div class="tabs">
			<button class="tab-btn" class:active={activeTab === 'local'} onclick={() => { activeTab = 'local'; search = ''; }}>
				{i18n.t.companies.localTab}
			</button>
			<button class="tab-btn" class:active={activeTab === 'investors'} onclick={() => { activeTab = 'investors'; search = ''; }}>
				{i18n.t.companies.investorsTab}
			</button>
		</div>
	</div>
</div>

<div class="page-body">
	<div class="container">
		<div class="network-tags">
			{#each i18n.t.ui.networkTypes as label}
				<span class="network-tag">{label}</span>
			{/each}
		</div>

		{#if filtered.length === 0}
			<div class="empty">
				<p>{i18n.t.ui.noResultsShort}</p>
			</div>
		{:else}
			<div class="companies-grid">
				{#each filtered as company}
					<article class="company-card">
						<div class="company-top">
							<div class="company-avatar" style="background: {company.color}">{company.initials}</div>
							<div class="company-meta">
								<span class="company-category">{i18n.lang === 'sr' ? company.category_sr : company.category_en}</span>
								<span class="company-city">{company.city}</span>
							</div>
						</div>
						<h3 class="company-name">{company.name}</h3>
						<p class="company-desc">{i18n.lang === 'sr' ? company.desc_sr : company.desc_en}</p>
						<a href="/kontakt" class="company-btn">{i18n.t.companies.inquire}</a>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.page-top {
		background: var(--navy);
		color: white;
		padding: 8rem var(--section-px) 3rem;
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}
	.container { max-width: var(--max-w); margin: 0 auto; }
	.page-tag {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--cyan);
		background: rgba(6,182,212,0.1);
		border: 1px solid rgba(6,182,212,0.25);
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		margin-bottom: 1.25rem;
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		margin-bottom: 0.75rem;
	}
	.page-sub { font-size: 1rem; color: rgba(255,255,255,0.6); margin-bottom: 2rem; max-width: 600px; line-height: 1.65; }

	.search-wrap { position: relative; max-width: 500px; margin-bottom: 1.5rem; }
	.search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.4); }
	.search-input {
		width: 100%;
		background: rgba(255,255,255,0.07);
		border: 1px solid rgba(255,255,255,0.15);
		border-radius: var(--radius);
		color: white;
		font-family: var(--font-sans);
		font-size: 0.95rem;
		padding: 0.8rem 1rem 0.8rem 2.75rem;
		outline: none;
		transition: border-color 0.2s, background 0.2s;
	}
	.search-input::placeholder { color: rgba(255,255,255,0.35); }
	.search-input:focus { background: rgba(255,255,255,0.1); border-color: rgba(6,182,212,0.5); }

	.tabs { display: flex; gap: 0.5rem; }
	.tab-btn {
		font-family: var(--font-sans); font-size: 0.85rem; font-weight: 600;
		color: rgba(255,255,255,0.6);
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 50px; padding: 0.5rem 1.25rem; cursor: pointer; transition: all 0.2s;
	}
	.tab-btn:hover { color: white; background: rgba(255,255,255,0.1); }
	.tab-btn.active { background: linear-gradient(135deg, var(--cyan), var(--blue-light)); color: var(--navy); border-color: transparent; }

	.page-body { background: var(--soft-white); padding: 3rem var(--section-px) 5rem; }

	.network-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.5rem; }
	.network-tag {
		font-size: 0.78rem; font-weight: 500;
		color: var(--blue);
		background: rgba(26,86,219,0.07);
		border: 1px solid rgba(26,86,219,0.15);
		border-radius: 50px; padding: 0.3rem 0.85rem;
	}

	.empty { text-align: center; padding: 4rem 0; color: var(--muted); }

	.companies-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
	.company-card {
		background: white; border-radius: var(--radius-lg); padding: 1.75rem;
		box-shadow: var(--shadow-sm); border: 1px solid rgba(0,0,0,0.05);
		display: flex; flex-direction: column;
		transition: transform 0.25s, box-shadow 0.25s;
	}
	.company-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
	.company-top { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1rem; }
	.company-avatar {
		width: 44px; height: 44px; border-radius: 10px;
		display: flex; align-items: center; justify-content: center;
		font-family: var(--font-heading); font-size: 0.85rem; font-weight: 700; color: white; flex-shrink: 0;
	}
	.company-meta { display: flex; flex-direction: column; gap: 0.15rem; }
	.company-category { font-size: 0.7rem; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: 0.05em; }
	.company-city { font-size: 0.75rem; color: var(--muted); }
	.company-name { font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 0.5rem; }
	.company-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.6; flex: 1; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
	.company-btn { display: block; font-size: 0.78rem; font-weight: 600; color: var(--blue); background: rgba(26,86,219,0.06); text-decoration: none; padding: 0.5rem 1rem; border-radius: 8px; text-align: center; transition: background 0.2s; }
	.company-btn:hover { background: rgba(26,86,219,0.12); }

	@media (max-width: 1024px) { .companies-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 600px)  { .companies-grid { grid-template-columns: 1fr; } .tabs { flex-direction: column; } }
</style>

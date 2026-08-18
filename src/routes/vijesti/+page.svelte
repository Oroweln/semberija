<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	let activeCategory = $state('');
</script>

<svelte:head>
	<title>{i18n.t.news.heading} — Semberija.app</title>
</svelte:head>

<div class="page-top">
	<div class="container">
		<span class="page-tag">{i18n.t.news.label}</span>
		<h1>{i18n.t.news.heading}</h1>
		<p class="page-sub">{i18n.t.news.sub}</p>

		<div class="cat-filters">
			<button class="cat-btn" class:active={!activeCategory} onclick={() => (activeCategory = '')}>
				{i18n.t.ui.all}
			</button>
			{#each i18n.t.news.categories as cat}
				<button class="cat-btn" class:active={activeCategory === cat} onclick={() => (activeCategory = cat)}>{cat}</button>
			{/each}
		</div>
	</div>
</div>

<div class="page-body">
	<div class="container">
		<div class="coming-soon">
			<div class="cs-icon">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 002 2z"/>
					<path d="M2 12h6"/>
					<path d="M2 8h4"/><path d="M2 16h4"/>
				</svg>
			</div>
			<h3>{i18n.t.ui.newsSoon}</h3>
			<p>{i18n.t.ui.newsSoonDesc}</p>
		</div>
	</div>
</div>

<style>
	.page-top {
		background: var(--navy); color: white;
		padding: 8rem var(--section-px) 3rem;
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}
	.container { max-width: var(--max-w); margin: 0 auto; }
	.page-tag {
		display: inline-block;
		font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--cyan); background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.25);
		padding: 0.25rem 0.75rem; border-radius: 50px; margin-bottom: 1.25rem;
	}
	.page-top h1 {
		font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.75rem;
	}
	.page-sub { font-size: 1rem; color: rgba(255,255,255,0.6); max-width: 600px; line-height: 1.65; margin-bottom: 2rem; }

	.cat-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.cat-btn {
		font-family: var(--font-sans); font-size: 0.78rem; font-weight: 500;
		color: rgba(255,255,255,0.55);
		background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
		border-radius: 50px; padding: 0.3rem 0.85rem; cursor: pointer; transition: all 0.2s;
	}
	.cat-btn:hover, .cat-btn.active { background: linear-gradient(135deg, var(--cyan), var(--blue-light)); color: var(--navy); border-color: transparent; }

	.page-body { background: var(--soft-white); padding: 4rem var(--section-px) 6rem; }

	.coming-soon {
		text-align: center; padding: 5rem 2rem;
		background: white; border-radius: var(--radius-xl);
		border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow-sm);
	}
	.cs-icon {
		width: 64px; height: 64px; background: rgba(26,86,219,0.07); border-radius: 16px;
		display: flex; align-items: center; justify-content: center; color: var(--blue); margin: 0 auto 1.25rem;
	}
	.coming-soon h3 { font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--navy); margin-bottom: 0.75rem; }
	.coming-soon p { font-size: 0.95rem; color: var(--muted); max-width: 480px; margin: 0 auto; line-height: 1.65; }
</style>

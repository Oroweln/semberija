<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';

	const categoryStats = $derived.by(() => {
		const map = new Map<string, { name_sr: string; name_en: string; count: number }>();
		for (const firm of domesticFirms) {
			const key = firm.category_sr;
			const entry = map.get(key);
			if (entry) {
				entry.count++;
			} else {
				map.set(key, { name_sr: firm.category_sr, name_en: firm.category_en, count: 1 });
			}
		}
		return [...map.values()].sort((a, b) => b.count - a.count);
	});
</script>

<svelte:head>
	<title>{i18n.t.nav.companies} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<p class="page-label">{i18n.t.nav.companies}</p>
		<h1>{i18n.t.ui.categories}</h1>
		<p class="page-sub">{i18n.t.ui.categoriesSub}</p>
	</div>
</div>

<div class="cat-body reveal-card" use:reveal>
	<div class="container">
		<div class="cat-grid">
			{#each categoryStats as cat}
				<a
					href="/firme?cat={encodeURIComponent(i18n.lang === 'sr' ? cat.name_sr : cat.name_en)}"
					class="cat-card"
				>
					<div class="cat-initial">{(i18n.lang === 'sr' ? cat.name_sr : cat.name_en).charAt(0)}</div>
					<div class="cat-info">
						<h3>{i18n.lang === 'sr' ? cat.name_sr : cat.name_en}</h3>
						<span class="cat-count">
							{cat.count}
							{i18n.lang === 'sr'
								? cat.count === 1
									? 'firma'
									: cat.count < 5
										? 'firme'
										: 'firmi'
								: cat.count === 1
									? 'company'
									: 'companies'}
						</span>
					</div>
					<svg class="cat-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			{/each}
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
		margin-bottom: 0.75rem;
	}
	.page-sub {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.7);
	}
	.cat-body {
		background: radial-gradient(140% 140% at 25% 15%, #ffffff 0%, #f2f3f6 100%);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-bento), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -16px 30px -20px rgba(15,23,42,0.14);
		border: 1px solid rgba(255,255,255,0.4);
	}
	.cat-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	.cat-card {
		background: var(--soft-white);
		border-radius: var(--radius-lg);
		padding: 1.5rem 1.75rem;
		display: flex;
		align-items: center;
		gap: 1.25rem;
		text-decoration: none;
		border: 1px solid rgba(8, 14, 26, 0.05);
		transition: transform 0.2s, background 0.2s, border-color 0.2s;
	}
	.cat-card:hover {
		transform: translateY(-2px);
		background: white;
		border-color: rgba(154,164,178, 0.4);
	}
	.cat-initial {
		width: 48px;
		height: 48px;
		background: rgba(15, 61, 62, 0.08);
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-serif);
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--navy-mid);
		flex-shrink: 0;
	}
	.cat-info {
		flex: 1;
	}
	.cat-info h3 {
		font-family: var(--font-serif);
		font-size: 1rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 0.2rem;
	}
	.cat-count {
		font-size: 0.78rem;
		color: var(--muted);
	}
	.cat-arrow {
		color: var(--muted);
		flex-shrink: 0;
		transition: color 0.2s, transform 0.2s;
	}
	.cat-card:hover .cat-arrow {
		color: var(--navy-mid);
		transform: translateX(3px);
	}

	@media (min-width: 600px) {
		.cat-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 768px) {
		.cat-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>

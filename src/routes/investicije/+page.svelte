<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { investmentCategorySlugs } from '$lib/data';

	const categories = $derived(
		i18n.t.investments.categories.map((cat, i) => ({ ...cat, slug: investmentCategorySlugs[i] }))
	);
</script>

<svelte:head>
	<title>{i18n.t.investments.heading} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<span class="page-tag">{i18n.t.investments.label}</span>
		<h1>{i18n.t.investments.heading}</h1>
		<p class="page-sub">{i18n.t.investments.sub}</p>
	</div>
</div>

<div class="page-body reveal-card" use:reveal>
	<div class="container">
		<div class="categories-grid">
			{#each categories as cat, i}
				<div class="cat-card">
					<div class="cat-num">0{i + 1}</div>
					<h3>{cat.name}</h3>
					<p class="cat-desc">{cat.desc}</p>
					<a href="/investicije/{cat.slug}" class="cat-link">{i18n.t.ui.learnMore} →</a>
				</div>
			{/each}
		</div>

		<div class="coming-soon">
			<div class="cs-icon">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
				</svg>
			</div>
			<h3>{i18n.t.ui.investSoon}</h3>
			<p>{i18n.t.ui.investSoonDesc}</p>
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
	.container { max-width: var(--max-w); margin: 0 auto; }
	.page-tag {
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
		margin-bottom: 1.25rem;
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		margin-bottom: 0.75rem;
	}
	.page-sub { font-size: 1rem; color: rgba(255,255,255,0.6); max-width: 600px; line-height: 1.65; }

	.page-body {
		background: radial-gradient(140% 140% at 25% 15%, #ffffff 0%, #f2f3f6 100%);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-bento), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -16px 30px -20px rgba(15,23,42,0.14);
		border: 1px solid rgba(255,255,255,0.4);
	}

	.categories-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-bottom: 4rem;
	}

	.cat-card {
		background: var(--soft-white);
		border-radius: var(--radius-lg);
		padding: 2rem 1.75rem;
		border: 1px solid rgba(8,14,26,0.05);
		transition: transform 0.2s, background 0.2s, border-color 0.2s;
	}
	.cat-card:hover { transform: translateY(-3px); background: white; border-color: rgba(154,164,178,0.25); }

	.cat-num {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		font-weight: 800;
		color: rgba(154,164,178,0.25);
		line-height: 1;
		margin-bottom: 0.75rem;
	}

	.cat-card h3 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 0.6rem;
	}

	.cat-desc {
		font-size: 0.83rem;
		color: var(--muted);
		line-height: 1.6;
		margin-bottom: 1.1rem;
	}

	.cat-link {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--steel);
		text-decoration: none;
		transition: color 0.2s;
	}
	.cat-link:hover { color: var(--silver); }

	.coming-soon {
		text-align: center;
		padding: 4rem 2rem;
		background: var(--soft-white);
		border-radius: var(--radius-xl);
		border: 1px solid rgba(8,14,26,0.05);
	}

	.cs-icon {
		width: 64px; height: 64px;
		background: rgba(36,64,107,0.07);
		border-radius: 16px;
		display: flex; align-items: center; justify-content: center;
		color: var(--steel);
		margin: 0 auto 1.25rem;
	}

	.coming-soon h3 {
		font-family: var(--font-heading);
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 0.75rem;
	}

	.coming-soon p { font-size: 0.95rem; color: var(--muted); margin-bottom: 2rem; max-width: 480px; margin-left: auto; margin-right: auto; }

	.btn-primary {
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
		box-shadow: 0 5px 20px rgba(5,9,15,0.2);
	}
	.btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

	@media (min-width: 600px)  { .categories-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (min-width: 1024px) { .categories-grid { grid-template-columns: repeat(4, 1fr); } }
</style>

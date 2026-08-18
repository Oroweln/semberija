<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
</script>

<svelte:head>
	<title>{i18n.t.investments.heading} — Semberija.app</title>
</svelte:head>

<div class="page-top">
	<div class="container">
		<span class="page-tag">{i18n.t.investments.label}</span>
		<h1>{i18n.t.investments.heading}</h1>
		<p class="page-sub">{i18n.t.investments.sub}</p>
	</div>
</div>

<div class="page-body">
	<div class="container">
		<div class="categories-grid">
			{#each i18n.t.investments.categories as cat, i}
				<div class="cat-card">
					<div class="cat-num">0{i + 1}</div>
					<h3>{cat}</h3>
					<a href="/kontakt" class="cat-link">{i18n.t.hero.ctaInvest} →</a>
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

<style>
	.page-top {
		background: var(--navy);
		color: white;
		padding: 8rem var(--section-px) 4rem;
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
	.page-sub { font-size: 1rem; color: rgba(255,255,255,0.6); max-width: 600px; line-height: 1.65; }

	.page-body { background: var(--soft-white); padding: 4rem var(--section-px) 6rem; }

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
		margin-bottom: 4rem;
	}

	.cat-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2rem 1.75rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0,0,0,0.05);
		transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
	}
	.cat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: rgba(6,182,212,0.25); }

	.cat-num {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		font-weight: 800;
		color: rgba(6,182,212,0.25);
		line-height: 1;
		margin-bottom: 0.75rem;
	}

	.cat-card h3 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 1rem;
	}

	.cat-link {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--blue);
		text-decoration: none;
		transition: color 0.2s;
	}
	.cat-link:hover { color: var(--cyan); }

	.coming-soon {
		text-align: center;
		padding: 4rem 2rem;
		background: white;
		border-radius: var(--radius-xl);
		border: 1px solid rgba(0,0,0,0.05);
		box-shadow: var(--shadow-sm);
	}

	.cs-icon {
		width: 64px; height: 64px;
		background: rgba(26,86,219,0.07);
		border-radius: 16px;
		display: flex; align-items: center; justify-content: center;
		color: var(--blue);
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
		background: linear-gradient(135deg, var(--cyan), var(--blue-light));
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: 10px;
		transition: opacity 0.2s, transform 0.2s;
		box-shadow: 0 0 20px rgba(6,182,212,0.25);
	}
	.btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

	@media (max-width: 1024px) { .categories-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 600px)  { .categories-grid { grid-template-columns: 1fr; } }
</style>

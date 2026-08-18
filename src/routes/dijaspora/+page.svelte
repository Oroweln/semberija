<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
</script>

<svelte:head>
	<title>{i18n.t.diaspora.heading} — Semberija.app</title>
</svelte:head>

<div class="page-top">
	<div class="container">
		<span class="page-tag">{i18n.t.diaspora.label}</span>
		<h1>{i18n.t.diaspora.heading}</h1>
		<p class="page-sub">{i18n.t.diaspora.sub}</p>
	</div>
</div>

<div class="page-body">
	<div class="container">
		<div class="items-grid">
			{#each i18n.t.diaspora.items as item, i}
				<div class="item-card">
					<div class="item-num">0{i + 1}</div>
					<h3>{item}</h3>
					<a href="/kontakt" class="item-link">{i18n.t.ui.learnMore} →</a>
				</div>
			{/each}
		</div>

		<div class="join-box">
			<h2>{i18n.t.ui.joinDiaspora}</h2>
			<p>{i18n.t.ui.joinDiasporaDesc}</p>
			<a href="/kontakt" class="btn-primary">{i18n.t.diaspora.cta}</a>
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
		font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--cyan); background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.25);
		padding: 0.25rem 0.75rem; border-radius: 50px; margin-bottom: 1.25rem;
	}
	.page-top h1 {
		font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.75rem;
	}
	.page-sub { font-size: 1rem; color: rgba(255,255,255,0.6); max-width: 600px; line-height: 1.65; }

	.page-body { background: var(--soft-white); padding: 4rem var(--section-px) 6rem; }

	.items-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.25rem; margin-bottom: 4rem; }

	.item-card {
		background: white; border-radius: var(--radius-lg); padding: 2rem 1.5rem;
		box-shadow: var(--shadow-sm); border: 1px solid rgba(0,0,0,0.05);
		transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
	}
	.item-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: rgba(6,182,212,0.2); }

	.item-num { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: rgba(6,182,212,0.2); line-height: 1; margin-bottom: 0.75rem; }
	.item-card h3 { font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 1rem; }
	.item-link { font-size: 0.82rem; font-weight: 600; color: var(--blue); text-decoration: none; transition: color 0.2s; }
	.item-link:hover { color: var(--cyan); }

	.join-box {
		text-align: center;
		background: var(--navy);
		border-radius: var(--radius-xl);
		padding: 4rem 2rem;
		color: white;
	}

	.join-box h2 { font-family: var(--font-heading); font-size: clamp(1.5rem, 3.5vw, 2.5rem); font-weight: 800; letter-spacing: -0.04em; margin-bottom: 1rem; }
	.join-box p { font-size: 1rem; color: rgba(255,255,255,0.55); margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; }

	.btn-primary {
		display: inline-flex; font-family: var(--font-sans); font-size: 0.9rem; font-weight: 600;
		color: var(--navy); background: linear-gradient(135deg, var(--cyan), var(--blue-light));
		text-decoration: none; padding: 0.75rem 1.75rem; border-radius: 10px;
		transition: opacity 0.2s, transform 0.2s; box-shadow: 0 0 20px rgba(6,182,212,0.3);
	}
	.btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

	@media (max-width: 1024px) { .items-grid { grid-template-columns: repeat(3, 1fr); } }
	@media (max-width: 600px)  { .items-grid { grid-template-columns: 1fr; } }
</style>

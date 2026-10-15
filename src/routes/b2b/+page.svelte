<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { b2bItemSlugs } from '$lib/data';

	const items = $derived(
		i18n.t.b2b.items.map((item, i) => ({ ...item, slug: b2bItemSlugs[i] }))
	);
</script>

<svelte:head>
	<title>{i18n.t.b2b.heading} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<span class="page-tag">{i18n.t.b2b.label}</span>
		<h1>{i18n.t.b2b.heading}</h1>
		<p class="page-sub">{i18n.t.b2b.sub}</p>
	</div>
</div>

<div class="page-body reveal-card" use:reveal>
	<div class="container">
		<div class="items-grid">
			{#each items as item, i}
				<div class="item-card">
					<div class="item-num">0{i + 1}</div>
					<h3>{item.title}</h3>
					<p class="item-desc">{item.desc}</p>
					<a href="/b2b/{item.slug}" class="item-link">{i18n.t.b2b.cta} →</a>
				</div>
			{/each}
		</div>

		<div class="join-box">
			<h2>{i18n.t.ui.joinB2b}</h2>
			<p>{i18n.t.ui.joinB2bDesc}</p>
			<a href="/kontakt" class="btn-primary">{i18n.t.ui.contactUs}</a>
		</div>
	</div>
</div>
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

	.page-top {
		background: var(--surface-dark);
		color: white;
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
		border: 1px solid rgba(255,255,255,0.05);
	}
	.container { max-width: var(--max-w); margin: 0 auto; }
	.page-tag {
		display: inline-block;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--silver); background: rgba(154,164,178,0.1); border: 1px solid rgba(154,164,178,0.25);
		padding: 0.25rem 0.75rem; border-radius: 50px; margin-bottom: 1.25rem;
	}
	.page-top h1 {
		font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800; letter-spacing: -0.04em; margin-bottom: 0.75rem;
	}
	.page-sub { font-size: 1rem; color: rgba(255,255,255, 0.8); max-width: 600px; line-height: 1.65; }

	.page-body {
		background: var(--surface-light);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
		border: 1px solid rgba(255,255,255,0.4);
	}

	.items-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; margin-bottom: 4rem; }

	.item-card {
		background: var(--soft-white); border-radius: var(--radius-lg); padding: 2rem 1.5rem;
		border: 1px solid rgba(8,14,26,0.05);
		transition: transform 0.2s, background 0.2s, border-color 0.2s;
	}
	.item-card:hover { transform: translateY(-3px); background: white; border-color: rgba(154,164,178,0.2); }

	.item-num { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: rgba(154,164,178,0.2); line-height: 1; margin-bottom: 0.75rem; }
	.item-card h3 { font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 0.6rem; }
	.item-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.6; margin-bottom: 1.1rem; }
	.item-link { font-size: 0.82rem; font-weight: 600; color: var(--steel); text-decoration: none; transition: color 0.2s; }
	.item-link:hover { color: var(--silver); }

	.join-box {
		text-align: center;
		background: var(--surface-dark);
		border-radius: var(--radius-xl);
		padding: 4rem 2rem;
		color: white;
		box-shadow: var(--shadow-dark-raised);
	}

	.join-box h2 { font-family: var(--font-heading); font-size: clamp(1.5rem, 3.5vw, 2.5rem); font-weight: 800; letter-spacing: -0.04em; margin-bottom: 1rem; }
	.join-box p { font-size: 1rem; color: rgba(255,255,255, 0.8); margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto; }

	.btn-primary {
		display: inline-flex; font-family: var(--font-sans); font-size: 1.05rem; font-weight: 600;
		color: var(--cta-text); background: var(--cta);
		text-decoration: none; padding: 0.95rem 2.1rem; border-radius: 10px;
		transition: opacity 0.2s, transform 0.2s; box-shadow: 0 5px 20px rgba(5,9,15,0.24);
	}
	.btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

	@media (min-width: 600px)  { .items-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (min-width: 1024px) { .items-grid { grid-template-columns: repeat(3, 1fr); } }
</style>

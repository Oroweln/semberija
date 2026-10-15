<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>{i18n.t.events.heading} — Semberija.app</title>
	<meta name="description" content={i18n.t.events.sub} />
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<span class="page-tag">{i18n.t.events.label}</span>
		<h1>{i18n.t.events.heading}</h1>
		<p class="page-sub">{i18n.t.events.sub}</p>
	</div>
</div>

<div class="page-body reveal-card" use:reveal>
	<div class="container">
		<div class="coming-soon">
			<div class="cs-icon">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<rect x="3" y="4" width="18" height="18" rx="2"/>
					<line x1="16" y1="2" x2="16" y2="6"/>
					<line x1="8" y1="2" x2="8" y2="6"/>
					<line x1="3" y1="10" x2="21" y2="10"/>
				</svg>
			</div>
			<h3>{i18n.t.ui.eventsSoon}</h3>
			<p>{i18n.t.ui.eventsSoonDesc}</p>
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
		background: var(--surface-dark); color: white;
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

	.coming-soon {
		text-align: center; padding: 5rem 2rem;
		background: var(--soft-white); border-radius: var(--radius-xl);
		border: 1px solid rgba(8,14,26,0.05);
	}
	.cs-icon {
		width: 64px; height: 64px; background: rgba(36,64,107,0.07); border-radius: 16px;
		display: flex; align-items: center; justify-content: center; color: var(--steel); margin: 0 auto 1.25rem;
	}
	.coming-soon h3 { font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--navy); margin-bottom: 0.75rem; }
	.coming-soon p { font-size: 0.95rem; color: var(--muted); max-width: 480px; margin: 0 auto 2rem; line-height: 1.65; }

	.btn-primary {
		display: inline-flex; font-family: var(--font-sans); font-size: 1.05rem; font-weight: 600;
		color: var(--cta-text); background: var(--cta);
		text-decoration: none; padding: 0.95rem 2.1rem; border-radius: 10px;
		transition: opacity 0.2s, transform 0.2s; box-shadow: 0 5px 20px rgba(5,9,15,0.24);
	}
	.btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
</style>

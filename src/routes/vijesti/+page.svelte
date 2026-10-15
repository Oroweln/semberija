<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	let activeCategory = $state('');
	let trackEl: HTMLDivElement;

	function scrollCarousel(dir: number) {
		trackEl?.scrollBy({ left: dir * trackEl.clientWidth * 0.7, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>{i18n.t.news.heading} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<span class="page-tag">{i18n.t.news.label}</span>
		<h1>{i18n.t.news.heading}</h1>
		<p class="page-sub">{i18n.t.news.sub}</p>

		<div class="cat-carousel">
			<button class="carousel-arrow" onclick={() => scrollCarousel(-1)} aria-label="Scroll left">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
			</button>

			<div class="cat-filters" bind:this={trackEl}>
				<button class="cat-btn" class:active={!activeCategory} onclick={() => (activeCategory = '')}>
					{i18n.t.ui.all}
				</button>
				{#each i18n.t.news.categories as cat}
					<button class="cat-btn" class:active={activeCategory === cat} onclick={() => (activeCategory = cat)}>{cat}</button>
				{/each}
			</div>

			<button class="carousel-arrow" onclick={() => scrollCarousel(1)} aria-label="Scroll right">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
			</button>
		</div>
	</div>
</div>

<div class="page-body reveal-card" use:reveal>
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
	.page-sub { font-size: 1rem; color: rgba(255,255,255, 0.8); max-width: 600px; line-height: 1.65; margin-bottom: 2rem; }

	.cat-carousel {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.cat-filters {
		display: flex;
		flex-wrap: nowrap;
		gap: 0.5rem;
		overflow-x: auto;
		scroll-snap-type: x proximity;
		scroll-behavior: smooth;
		scrollbar-width: none;
		-ms-overflow-style: none;
		padding: 0.2rem 0.1rem;
		-webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
		mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
	}
	.cat-filters::-webkit-scrollbar { display: none; }

	.cat-btn {
		flex-shrink: 0;
		white-space: nowrap;
		scroll-snap-align: start;
		font-family: var(--font-sans); font-size: 0.85rem; font-weight: 500;
		color: rgba(255,255,255, 0.8);
		background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
		border-radius: 50px; padding: 0.3rem 0.85rem; cursor: pointer; transition: all 0.2s;
	}
	.cat-btn:hover, .cat-btn.active { background: linear-gradient(135deg, var(--platinum), var(--silver)); color: var(--navy); border-color: transparent; }

	.carousel-arrow {
		flex-shrink: 0;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255,255,255, 0.85);
		background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.16);
		cursor: pointer;
		transition: all 0.2s;
	}
	.carousel-arrow:hover {
		background: rgba(255,255,255,0.16);
		color: white;
		border-color: rgba(255,255,255,0.3);
	}

	@media (max-width: 560px) {
		.carousel-arrow { display: none; }
	}

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
	.coming-soon p { font-size: 0.95rem; color: var(--muted); max-width: 480px; margin: 0 auto; line-height: 1.65; }
</style>

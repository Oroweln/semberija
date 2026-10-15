<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { regionalPlatforms } from '$lib/regionalPlatforms';

	// Manual carousel: arrows, dots, swipe/scroll and keyboard. No autoplay.
	let track: HTMLUListElement;
	let active = $state(0);
	let atStart = $state(true);
	let atEnd = $state(false);

	const r = $derived(i18n.t.regions);

	function update() {
		if (!track) return;
		const max = track.scrollWidth - track.clientWidth;
		atStart = track.scrollLeft <= 4;
		atEnd = track.scrollLeft >= max - 4;
		// active = card whose left edge is closest to the track's left edge
		const cards = [...track.children] as HTMLElement[];
		let best = 0;
		let bestDist = Infinity;
		cards.forEach((card, i) => {
			const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft);
			if (dist < bestDist) { bestDist = dist; best = i; }
		});
		active = atEnd ? cards.length - 1 : best;
	}

	function goTo(i: number) {
		const card = track?.children[i] as HTMLElement | undefined;
		if (!card) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.min(active + 1, regionalPlatforms.length - 1)); }
		if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.max(active - 1, 0)); }
	}

	$effect(() => {
		update();
		const ro = new ResizeObserver(update);
		ro.observe(track);
		return () => ro.disconnect();
	});
</script>

<div class="pc">
	<div class="pc-head">
		<span class="pc-tag">{r.label}</span>
		<h2>{r.heading}</h2>
		<p>{r.desc}</p>
	</div>

	<div class="pc-viewport">
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<ul
			class="pc-track"
			bind:this={track}
			onscroll={update}
			onkeydown={onKey}
			tabindex="0"
			aria-label={r.heading}
		>
			{#each regionalPlatforms as platform, i (platform.id)}
				<li class="pc-card" aria-roledescription="slide" aria-label="{r.slide} {i + 1} / {regionalPlatforms.length}: {platform.name}">
					<div class="pc-shot">
						{#if platform.screenshot}
							<img src={platform.screenshot} alt="{platform.name} — screenshot" loading="lazy" />
						{:else}
							<!-- Placeholder until an approved screenshot is added -->
							<div class="pc-placeholder" aria-hidden="true">
								<span class="pc-ph-name">{platform.name}</span>
								<span class="pc-ph-url">{platform.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
							</div>
						{/if}
					</div>
					<div class="pc-body">
						<div class="pc-brand">
							{#if platform.logo}
								<img class="pc-logo" src={platform.logo} alt={platform.name} />
							{:else}
								<span class="pc-wordmark">{platform.name}</span>
							{/if}
						</div>
						<p class="pc-desc">{r.items[platform.id]}</p>
						<a class="pc-cta" href={platform.url} target="_blank" rel="noopener">
							{r.cta}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>
							<span class="sr-only">{platform.name} {r.newTab}</span>
						</a>
					</div>
				</li>
			{/each}
		</ul>
	</div>

	<div class="pc-controls">
		<div class="pc-dots">
			{#each regionalPlatforms as platform, i (platform.id)}
				<button
					type="button"
					class="pc-dot"
					class:active={active === i}
					aria-label="{r.slide} {i + 1}: {platform.name}"
					aria-current={active === i ? 'true' : undefined}
					onclick={() => goTo(i)}
				></button>
			{/each}
		</div>
		<div class="pc-arrows">
			<button type="button" class="pc-arrow" onclick={() => goTo(active - 1)} disabled={atStart} aria-label={r.prev}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
			</button>
			<button type="button" class="pc-arrow" onclick={() => goTo(active + 1)} disabled={atEnd} aria-label={r.next}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
			</button>
		</div>
	</div>

	<p class="pc-attribution">{r.attribution}</p>
</div>

<style>
	.pc-head { max-width: 780px; margin: 0 auto 3rem; text-align: center; }
	.pc-tag {
		display: inline-block;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: #FAF9F6; background: rgba(250,249,246,0.1); border: 1px solid rgba(250,249,246,0.3);
		padding: 0.35rem 0.95rem; border-radius: 50px; margin-bottom: 1rem;
	}
	.pc-head h2 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 4vw, 3.2rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.08;
		text-wrap: balance;
		color: #FAF9F6;
	}
	.pc-head h2::after {
		content: '';
		display: block;
		width: 56px;
		height: 4px;
		margin: 1.1rem auto 0;
		border-radius: 2px;
		background: linear-gradient(90deg, #e0414f, #f06a75);
	}
	.pc-head p { margin-top: 1.25rem; font-size: 1.1rem; line-height: 1.65; color: rgba(250,249,246,0.88); }

	/* ── Track ── */
	.pc-track {
		list-style: none;
		display: flex;
		gap: 1.5rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		padding: 0.5rem 0.25rem 1.5rem;
		border-radius: var(--radius-xl);
	}
	.pc-track::-webkit-scrollbar { display: none; }
	.pc-track:focus-visible { outline: 3px solid #FAF9F6; outline-offset: 4px; }

	/* Cards are wide enough that the next one peeks in */
	.pc-card {
		flex: 0 0 88%;
		scroll-snap-align: start;
		display: flex;
		flex-direction: column;
		background: #ffffff;
		color: var(--dark);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: 0 30px 60px -28px rgba(0,0,0,0.6), 0 10px 22px -14px rgba(0,0,0,0.4);
	}

	.pc-shot {
		aspect-ratio: 16 / 9;
		background: #e9edf3;
		overflow: hidden;
	}
	.pc-shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
	.pc-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background:
			radial-gradient(120% 120% at 15% 0%, rgba(64,120,200,0.35) 0%, transparent 55%),
			linear-gradient(155deg, #1b2a40 0%, #0f1a2b 100%);
		color: #FAF9F6;
	}
	.pc-ph-name {
		font-family: var(--font-heading);
		font-size: clamp(1.8rem, 4vw, 3rem);
		font-weight: 800;
		letter-spacing: -0.03em;
	}
	.pc-ph-url { font-size: 0.95rem; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; }

	.pc-body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.75rem 2rem 2rem;
		flex: 1;
	}
	.pc-brand { min-height: 40px; display: flex; align-items: center; }
	.pc-logo { max-height: 40px; width: auto; }
	.pc-wordmark {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--navy);
	}
	.pc-desc { font-size: 1.02rem; color: #4a525e; line-height: 1.65; flex: 1; }
	.pc-cta {
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--cta-text);
		background: var(--cta);
		padding: 0.85rem 1.5rem;
		border-radius: 10px;
		box-shadow: 0 10px 24px -8px rgba(155,17,30,0.55);
		transition: background 0.2s, transform 0.2s;
	}
	.pc-cta:hover { background: var(--cta-hover); transform: translateY(-2px); }

	/* ── Controls ── */
	.pc-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 0.5rem;
	}
	.pc-dots { display: flex; gap: 0.5rem; }
	.pc-dot {
		width: 10px;
		height: 10px;
		padding: 0;
		border-radius: 50px;
		border: none;
		cursor: pointer;
		background: rgba(250,249,246,0.35);
		transition: width 0.3s ease, background 0.3s ease;
	}
	.pc-dot.active { width: 32px; background: #FAF9F6; }
	.pc-arrows { display: flex; gap: 0.6rem; }
	.pc-arrow {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #FAF9F6;
		background: rgba(250,249,246,0.08);
		border: 1px solid rgba(250,249,246,0.35);
		transition: background 0.2s, border-color 0.2s, opacity 0.2s;
	}
	.pc-arrow:hover:not(:disabled) { background: var(--cta); border-color: var(--cta); }
	.pc-arrow:disabled { opacity: 0.35; cursor: default; }
	.pc-dot:focus-visible,
	.pc-arrow:focus-visible,
	.pc-cta:focus-visible { outline: 3px solid #FAF9F6; outline-offset: 3px; }

	.pc-attribution {
		margin-top: 2rem;
		text-align: center;
		font-size: 0.9rem;
		letter-spacing: 0.06em;
		color: rgba(250,249,246,0.7);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (min-width: 900px) {
		.pc-card { flex-basis: 62%; flex-direction: row; }
		.pc-shot { aspect-ratio: auto; flex: 0 0 55%; min-height: 340px; }
		.pc-body { justify-content: center; }
	}

	@media (prefers-reduced-motion: reduce) {
		.pc-dot, .pc-arrow, .pc-cta { transition: none; }
	}
</style>

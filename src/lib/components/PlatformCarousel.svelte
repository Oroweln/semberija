<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { regionalPlatforms } from '$lib/regionalPlatforms';

	// Manual carousel: arrows, dots, swipe/scroll and keyboard. No autoplay.
	let track: HTMLUListElement;
	let active = $state(0); // highlighted dot / counter
	let first = $state(0);  // left-most visible card; arrows step from here
	let atStart = $state(true);
	let atEnd = $state(false);

	const r = $derived(i18n.t.regions);
	const total = regionalPlatforms.length;

	const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

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
		first = best;
		active = atEnd ? cards.length - 1 : best;
	}

	function goTo(i: number) {
		const card = track?.children[i] as HTMLElement | undefined;
		if (!card) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') { e.preventDefault(); goTo(Math.min(first + 1, total - 1)); }
		if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(Math.max(first - 1, 0)); }
	}

	$effect(() => {
		update();
		const ro = new ResizeObserver(update);
		ro.observe(track);
		return () => ro.disconnect();
	});
</script>

<div class="pc">
	<div class="pc-glow" aria-hidden="true"></div>

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
				<li
					class="pc-card"
					style="--h:{platform.hue}"
					aria-roledescription="slide"
					aria-label="{r.slide} {i + 1} / {total}: {platform.name}"
				>
					<!-- Browser-framed preview -->
					<div class="pc-shot">
						<div class="pc-bar" aria-hidden="true">
							<span class="pc-dots3"><i></i><i></i><i></i></span>
							<span class="pc-url">
								<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
								{host(platform.url)}
							</span>
						</div>
						<div class="pc-screen">
							{#if platform.screenshot}
								<img src={platform.screenshot} alt="{platform.name} — screenshot" loading="lazy" />
							{:else}
								<!-- Placeholder until an approved screenshot is added -->
								<div class="pc-placeholder" aria-hidden="true">
									<span class="pc-ph-grid"></span>
									<span class="pc-ph-orb"></span>
									<span class="pc-ph-name">{platform.name.replace(/\.app$/, '')}<em>.app</em></span>
									<span class="pc-ph-lines"><i></i><i></i></span>
								</div>
							{/if}
						</div>
					</div>

					<div class="pc-body">
						<div class="pc-meta">
							<span class="pc-region">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
								{platform.region}
							</span>
							<span class="pc-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						</div>
						<div class="pc-brand">
							{#if platform.logo}
								<img class="pc-logo" src={platform.logo} alt={platform.name} />
							{:else}
								<span class="pc-wordmark">{platform.name}</span>
							{/if}
						</div>
						<p class="pc-desc">{r.items[platform.id]}</p>
						<a class="pc-cta" href={platform.url} target="_blank" rel="noopener">
							<span>{r.cta}</span>
							<span class="pc-cta-arrow" aria-hidden="true">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
							<span class="sr-only">{platform.name} {r.newTab}</span>
						</a>
					</div>
				</li>
			{/each}
		</ul>
	</div>

	<div class="pc-controls">
		<div class="pc-progress">
			<span class="pc-count" aria-hidden="true">
				<strong>{String(active + 1).padStart(2, '0')}</strong>
				<span>/ {String(total).padStart(2, '0')}</span>
			</span>
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
		</div>
		<div class="pc-arrows">
			<button type="button" class="pc-arrow" onclick={() => goTo(Math.max(first - 1, 0))} disabled={atStart} aria-label={r.prev}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
			</button>
			<button type="button" class="pc-arrow" onclick={() => goTo(Math.min(first + 1, total - 1))} disabled={atEnd} aria-label={r.next}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
			</button>
		</div>
	</div>

	<p class="pc-attribution"><span class="pc-attr-line"></span>{r.attribution}<span class="pc-attr-line"></span></p>
</div>

<style>
	.pc { position: relative; isolation: isolate; }
	.pc-glow {
		position: absolute;
		z-index: -1;
		inset: 10% -10% auto;
		height: 70%;
		background:
			radial-gradient(40% 50% at 20% 40%, rgba(64,120,200,0.35), transparent 70%),
			radial-gradient(35% 45% at 85% 60%, rgba(196,42,56,0.2), transparent 70%);
		filter: blur(30px);
		pointer-events: none;
	}

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
	.pc-head p { margin-top: 1.25rem; font-size: 1.1rem; line-height: 1.65; color: rgba(250,249,246,0.85); }

	/* ── Track ── */
	.pc-track {
		list-style: none;
		display: flex;
		gap: clamp(1rem, 2vw, 1.4rem);
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		margin: 0;
		padding: 0.75rem 0.25rem 2rem;
		border-radius: var(--radius-xl);
	}
	.pc-track::-webkit-scrollbar { display: none; }
	.pc-track:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 4px; }

	/* Cards are sized so the next one peeks in */
	.pc-card {
		--accent: hsl(var(--h) 70% 58%);
		flex: 0 0 86%;
		scroll-snap-align: start;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: var(--radius-2xl);
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		color: var(--dark);
		box-shadow: 0 30px 60px -30px rgba(0,0,0,0.65), 0 10px 22px -14px rgba(0,0,0,0.4);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.pc-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 40px 70px -30px rgba(0,0,0,0.75), 0 14px 28px -14px rgba(0,0,0,0.45);
	}

	/* Browser-framed preview */
	.pc-shot {
		margin: 0.75rem 0.75rem 0;
		border-radius: 16px;
		overflow: hidden;
		background: hsl(var(--h) 45% 12%);
		box-shadow: inset 0 0 0 1px rgba(15,23,42,0.08);
	}
	.pc-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.55rem 0.75rem;
		background: hsl(var(--h) 35% 18%);
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}
	.pc-dots3 { display: flex; gap: 5px; }
	.pc-dots3 i { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.22); }
	.pc-dots3 i:first-child { background: #f06a75; }
	.pc-url {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		min-width: 0;
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.7rem;
		color: rgba(255,255,255,0.7);
		background: rgba(255,255,255,0.07);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.pc-screen { position: relative; aspect-ratio: 16 / 9; overflow: hidden; }
	.pc-screen img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
	}
	.pc-card:hover .pc-screen img { transform: scale(1.04); }

	.pc-placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
		overflow: hidden;
		background:
			radial-gradient(120% 120% at 15% 0%, hsl(var(--h) 75% 45% / 0.55) 0%, transparent 55%),
			linear-gradient(155deg, hsl(var(--h) 45% 18%) 0%, hsl(var(--h) 50% 9%) 100%);
		color: #FAF9F6;
	}
	.pc-ph-grid {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 28px 28px,
			linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 28px 28px;
		-webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
		mask-image: radial-gradient(ellipse at center, #000 20%, transparent 75%);
	}
	.pc-ph-orb {
		position: absolute;
		right: -15%;
		bottom: -40%;
		width: 70%;
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(circle, hsl(var(--h) 85% 60% / 0.45), transparent 65%);
		transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
	}
	.pc-card:hover .pc-ph-orb { transform: translate(-10%, -10%); }
	.pc-ph-name {
		position: relative;
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.035em;
	}
	.pc-ph-name em { font-style: normal; color: hsl(var(--h) 85% 72%); }
	.pc-ph-lines { position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px; }
	.pc-ph-lines i { display: block; height: 5px; border-radius: 3px; background: rgba(255,255,255,0.16); }
	.pc-ph-lines i:first-child { width: 120px; }
	.pc-ph-lines i:last-child { width: 80px; }

	.pc-body {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		flex: 1;
		padding: 1.4rem 1.6rem 1.6rem;
	}
	.pc-meta { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
	.pc-region {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		min-width: 0;
		padding: 0.25rem 0.65rem;
		border-radius: 50px;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: hsl(var(--h) 55% 32%);
		background: hsl(var(--h) 70% 50% / 0.1);
		box-shadow: inset 0 0 0 1px hsl(var(--h) 60% 45% / 0.25);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.pc-index {
		font-family: var(--font-heading);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: rgba(11,52,102,0.35);
		font-variant-numeric: tabular-nums;
	}
	.pc-brand { min-height: 34px; display: flex; align-items: center; }
	.pc-logo { max-height: 34px; width: auto; }
	.pc-wordmark {
		min-width: 0;
		overflow-wrap: anywhere;
		font-family: var(--font-heading);
		/* Scales down on phones so long names (Montalcino.app) stay inside the card */
		font-size: clamp(1.1rem, 5.2vw, 1.4rem);
		font-weight: 800;
		letter-spacing: -0.025em;
		color: var(--navy);
	}
	.pc-desc { font-size: 0.95rem; color: #4a525e; line-height: 1.6; flex: 1; }

	.pc-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: 0.4rem;
		padding: 0.5rem 0.5rem 0.5rem 1.15rem;
		border-radius: 50px;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--navy);
		background: rgba(11,52,102,0.06);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.12);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
	}
	.pc-cta-arrow {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: #FAF9F6;
		background: var(--navy);
		transition: background 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.pc-cta:hover {
		color: #FAF9F6;
		background: var(--navy);
		box-shadow: inset 0 0 0 1px var(--navy), 0 12px 24px -12px rgba(5,9,15,0.6);
	}
	.pc-cta:hover .pc-cta-arrow { background: var(--cta); transform: rotate(45deg); }

	/* ── Controls ── */
	.pc-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	.pc-progress { display: flex; align-items: center; gap: 1.25rem; min-width: 0; }
	.pc-count {
		font-family: var(--font-heading);
		font-variant-numeric: tabular-nums;
		color: rgba(250,249,246,0.55);
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		white-space: nowrap;
	}
	.pc-count strong { font-size: 1.35rem; color: #FAF9F6; letter-spacing: -0.02em; margin-right: 0.15rem; }
	.pc-dots { display: flex; flex-wrap: wrap; gap: 0.45rem; }
	.pc-dot {
		width: 8px;
		height: 8px;
		padding: 0;
		border-radius: 50px;
		border: none;
		cursor: pointer;
		background: rgba(250,249,246,0.3);
		transition: width 0.4s cubic-bezier(0.22,1,0.36,1), background 0.3s ease;
	}
	.pc-dot:hover { background: rgba(250,249,246,0.6); }
	.pc-dot.active { width: 28px; background: linear-gradient(90deg, #e0414f, #f06a75); }
	.pc-arrows { display: flex; gap: 0.6rem; }
	.pc-arrow {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		cursor: pointer;
		color: #FAF9F6;
		background: rgba(250,249,246,0.06);
		border: 0;
		box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3);
		transition: background 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
	}
	.pc-arrow:hover:not(:disabled) {
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 10px 22px -8px rgba(155,17,30,0.7);
		transform: translateY(-2px);
	}
	.pc-arrow:disabled { opacity: 0.3; cursor: default; }
	.pc-dot:focus-visible,
	.pc-arrow:focus-visible,
	.pc-cta:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	.pc-attribution {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-top: 2.5rem;
		text-align: center;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.6);
	}
	.pc-attr-line { flex: 0 1 60px; height: 1px; background: rgba(250,249,246,0.25); }

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

	@media (min-width: 640px) {
		.pc-card { flex-basis: calc((100% - 1.4rem) / 2.15); }
	}
	@media (min-width: 1024px) {
		.pc-card { flex-basis: calc((100% - 2 * 1.4rem) / 3); }
	}
	@media (max-width: 480px) {
		.pc-dots { display: none; }
	}

	@media (prefers-reduced-motion: reduce) {
		.pc-card, .pc-dot, .pc-arrow, .pc-cta, .pc-cta-arrow, .pc-screen img, .pc-ph-orb { transition: none; }
		.pc-card:hover, .pc-arrow:hover:not(:disabled), .pc-cta:hover .pc-cta-arrow,
		.pc-card:hover .pc-screen img, .pc-card:hover .pc-ph-orb { transform: none; }
	}
</style>

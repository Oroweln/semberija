<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { serviceSlugs } from '$lib/data';
	import { enquiryUrl } from '$lib/enquiry';

	const services = $derived(
		i18n.t.services.items.map((svc, i) => ({ ...svc, slug: serviceSlugs[i] }))
	);

	// Cursor-following spotlight on the cards
	function trackSpotlight(e: PointerEvent) {
		const el = e.currentTarget as HTMLElement;
		const r = el.getBoundingClientRect();
		el.style.setProperty('--mx', `${e.clientX - r.left}px`);
		el.style.setProperty('--my', `${e.clientY - r.top}px`);
	}
</script>

<svelte:head>
	<title>{i18n.t.nav.services} — Semberija.app</title>
</svelte:head>

{#snippet svcIcon(i: number)}
	<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><path d="M6 6h.01M9 6h.01"/><path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/>
		{:else if i === 1}
			<circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.5-5.5"/><path d="M7.5 12l2-2 1.5 1.5 2.5-3"/>
		{:else if i === 2}
			<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>
		{:else if i === 3}
			<path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>
		{:else if i === 4}
			<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>
		{:else}
			<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>
		{/if}
	</svg>
{/snippet}

<div class="page-wrap">
<!-- ─── HERO ─── -->
<section class="page-top reveal-card" use:reveal>
	<div class="top-glow" aria-hidden="true"></div>
	<div class="top-lines" aria-hidden="true"></div>
	<div class="container hero-grid">
		<div>
			<span class="page-label"><span class="page-label-dot"></span>{i18n.t.services.label}</span>
			<h1>{i18n.t.services.heading}</h1>
			<p class="page-sub">{i18n.t.services.sub}</p>
			<div class="hero-btns">
				<a href={enquiryUrl('usluge')} class="btn-main">
					<span>{i18n.t.ui.freeConsult}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<a href="#usluge" class="btn-ghost">{i18n.t.services.cta}</a>
			</div>
		</div>

		<!-- Showreel in a browser frame -->
		<div class="reel" aria-hidden="true">
			<div class="reel-bar"><span></span><span></span><span></span><i>semberija.app / usluge</i></div>
			<div class="reel-screen">
				<video src="/usluge.webm" autoplay muted loop playsinline></video>
			</div>
		</div>
	</div>
</section>

<!-- ─── SERVICES ─── -->
<section class="svc-body reveal-card" use:reveal id="usluge">
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		<div class="results-head">
			<span class="results-count">
				<strong>{services.length}</strong>
				{i18n.t.services.label}
			</span>
			<span class="results-line" aria-hidden="true"></span>
		</div>

		<div class="svc-grid">
			{#each services as svc, i (svc.slug)}
				{@const wide = i === 0 || i === services.length - 1}
				<a href="/usluge/{svc.slug}" class="svc-card" class:wide onpointermove={trackSpotlight}>
					<span class="svc-spot" aria-hidden="true"></span>
					<div class="svc-main">
						<div class="svc-top">
							<span class="svc-icon">{@render svcIcon(i)}</span>
							<span class="svc-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						</div>
						<h2>{svc.title}</h2>
						<p>{svc.desc}</p>
						<ul class="svc-tags">
							{#each svc.highlights.slice(0, wide ? 3 : 2) as h}
								<li>{h}</li>
							{/each}
						</ul>
						<span class="svc-foot">
							<span class="svc-go">{i18n.t.ui.learnMore}</span>
							<span class="svc-arrow" aria-hidden="true">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</span>
					</div>

					{#if i === 0}
						<div class="svc-visual svc-browser" aria-hidden="true">
							<div class="svc-browser-bar"><span></span><span></span><span></span><i></i></div>
							<div class="svc-browser-body">
								<span class="sk sk-hero"></span>
								<span class="sk sk-line w70"></span>
								<span class="sk sk-line w45"></span>
								<div class="sk-row"><span class="sk sk-card"></span><span class="sk sk-card"></span><span class="sk sk-card"></span></div>
							</div>
						</div>
					{:else if wide}
						<div class="svc-visual svc-chart" aria-hidden="true">
							<svg viewBox="0 0 200 110" preserveAspectRatio="none">
								<defs>
									<linearGradient id="usluge-area" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stop-color="#f06a75" stop-opacity="0.45"/>
										<stop offset="100%" stop-color="#f06a75" stop-opacity="0"/>
									</linearGradient>
								</defs>
								<path d="M0 95 L30 82 L60 86 L90 64 L120 70 L150 42 L180 34 L200 18 L200 110 L0 110 Z" fill="url(#usluge-area)"/>
								<path class="svc-chart-line" d="M0 95 L30 82 L60 86 L90 64 L120 70 L150 42 L180 34 L200 18" fill="none" stroke="#f06a75" stroke-width="2.2" vector-effect="non-scaling-stroke"/>
							</svg>
							<div class="svc-chart-bars">
								{#each [38, 52, 46, 68, 74, 92] as h}
									<span style="height:{h}%"></span>
								{/each}
							</div>
						</div>
					{/if}
				</a>
			{/each}
		</div>

		<!-- Consultation band -->
		<div class="svc-cta">
			<div class="svc-cta-glow" aria-hidden="true"></div>
			<div class="svc-cta-copy">
				<span class="svc-cta-icon" aria-hidden="true">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>
				</span>
				<div>
					<h2>{i18n.t.ui.transformHeading}</h2>
					<p>{i18n.t.ui.transformDesc}</p>
				</div>
			</div>
			<a href={enquiryUrl('usluge')} class="btn-main">
				<span>{i18n.t.ui.freeConsult}</span>
				<span class="btn-main-arrow" aria-hidden="true">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
				</span>
			</a>
		</div>
	</div>
</section>
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
	.container { position: relative; max-width: var(--max-w); margin: 0 auto; }

	/* ─── HERO ─── */
	.page-top {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		background: var(--surface-dark);
		color: #FAF9F6;
		padding: clamp(3rem, 7vw, 5rem) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
	}
	.top-glow {
		position: absolute;
		z-index: -1;
		inset: -30% -10% auto;
		height: 130%;
		background:
			radial-gradient(40% 50% at 15% 30%, rgba(120,170,240,0.35), transparent 70%),
			radial-gradient(35% 45% at 80% 50%, rgba(196,42,56,0.25), transparent 70%);
		filter: blur(30px);
		pointer-events: none;
	}
	.top-lines {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 56px 56px,
			linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 56px 56px;
		-webkit-mask-image: radial-gradient(ellipse 60% 80% at 78% 50%, #000 10%, transparent 75%);
		mask-image: radial-gradient(ellipse 60% 80% at 78% 50%, #000 10%, transparent 75%);
		pointer-events: none;
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: center;
	}
	.page-label {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-bottom: 1.25rem;
		padding: 0.4rem 1rem;
		border-radius: 50px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #FAF9F6;
		background: rgba(255,255,255,0.08);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
	}
	.page-label-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f06a75;
		box-shadow: 0 0 0 4px rgba(240,106,117,0.2);
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 5vw, 3.6rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		/* Room for descenders: gradient text is clipped to the line box */
		line-height: 1.12;
		padding-bottom: 0.08em;
		text-wrap: balance;
		margin-bottom: 0.9rem;
		background: linear-gradient(180deg, #ffffff 30%, #c9d4e4 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.page-sub {
		font-size: 1.1rem;
		line-height: 1.65;
		color: rgba(250,249,246,0.8);
		max-width: 52ch;
		margin-bottom: 2.25rem;
	}
	.hero-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }

	.btn-main {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		flex-shrink: 0;
		padding: 0.45rem 0.45rem 0.45rem 1.4rem;
		border-radius: 50px;
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 16px 32px -14px rgba(155,17,30,0.85), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.btn-main-arrow {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		color: var(--cta);
		background: #FAF9F6;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.btn-main:hover { transform: translateY(-2px); }
	.btn-main:hover .btn-main-arrow { transform: rotate(45deg); }
	.btn-main:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		padding: 0 1.5rem;
		min-height: 50px;
		border-radius: 50px;
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
		box-shadow: inset 0 0 0 1px rgba(250,249,246,0.35);
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}
	.btn-ghost:hover { background: rgba(255,255,255,0.1); box-shadow: inset 0 0 0 1px #FAF9F6; }
	.btn-ghost:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	/* Showreel */
	.reel {
		overflow: hidden;
		border-radius: 20px;
		background: rgba(5,15,35,0.4);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14), 0 40px 80px -36px rgba(0,0,0,0.75);
		transform: perspective(1200px) rotateY(-8deg) rotateX(3deg);
		transition: transform 0.8s cubic-bezier(0.22,1,0.36,1);
	}
	.reel:hover { transform: perspective(1200px) rotateY(0) rotateX(0); }
	.reel-bar {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 0.6rem 0.8rem;
		background: rgba(255,255,255,0.06);
		border-bottom: 1px solid rgba(255,255,255,0.08);
	}
	.reel-bar span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.25); }
	.reel-bar span:first-child { background: #f06a75; }
	.reel-bar i {
		flex: 1;
		margin-left: 0.6rem;
		font-style: normal;
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.68rem;
		text-align: center;
		color: rgba(255,255,255,0.55);
	}
	.reel-screen { aspect-ratio: 16 / 10; background: #0b1a33; }
	.reel-screen video { width: 100%; height: 100%; object-fit: cover; display: block; }

	/* ─── SERVICES ─── */
	.svc-body {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		scroll-margin-top: calc(var(--nav-h) + 1rem);
		background: var(--surface-light);
		padding: clamp(2.5rem, 6vw, 4.5rem) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
	}
	.body-backdrop {
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(circle at 1px 1px, rgba(11,52,102,0.07) 1px, transparent 0) 0 0 / 22px 22px;
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 50%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 50%);
		pointer-events: none;
	}
	.results-head { display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.75rem; }
	.results-count {
		display: inline-flex;
		align-items: baseline;
		gap: 0.5rem;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #6b7380;
		white-space: nowrap;
	}
	/* Phones: the count label may wrap rather than run past the card */
	@media (max-width: 599px) {
		.results-count { white-space: normal; min-width: 0; }
	}
	.results-count strong {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--navy);
	}
	.results-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(11,52,102,0.18), transparent); }

	.svc-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.25rem);
		margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
	}
	.svc-card {
		--mx: 50%;
		--my: 0%;
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		padding: clamp(1.5rem, 2.4vw, 1.9rem);
		border-radius: var(--radius-2xl);
		text-decoration: none;
		color: inherit;
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 32px -18px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.svc-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.svc-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 34px 60px -28px rgba(15,23,42,0.32), inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.svc-card:hover::before { transform: scaleX(1); }
	.svc-card:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; }
	.svc-spot {
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(320px circle at var(--mx) var(--my), rgba(11,52,102,0.06), transparent 60%);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}
	.svc-card:hover .svc-spot { opacity: 1; }

	.svc-main { display: flex; flex-direction: column; min-width: 0; }
	.svc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem; }
	.svc-icon {
		display: grid;
		place-items: center;
		width: 50px;
		height: 50px;
		border-radius: 15px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		box-shadow: 0 12px 22px -10px rgba(11,52,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease;
	}
	.svc-card:hover .svc-icon { transform: rotate(-6deg) scale(1.06); background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.svc-index {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(11,52,102,0.35);
		transition: color 0.35s ease;
	}
	.svc-card:hover .svc-index { color: var(--cta); }
	.svc-card h2 {
		font-family: var(--font-heading);
		font-size: 1.22rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}
	.svc-card.wide h2 { font-size: clamp(1.45rem, 2.4vw, 1.85rem); letter-spacing: -0.03em; }
	.svc-card p { font-size: 0.93rem; line-height: 1.6; color: #4a525e; margin-bottom: 1.1rem; }
	.svc-tags { list-style: none; display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0 0 1.4rem; padding: 0; }
	.svc-tags li {
		padding: 0.3rem 0.7rem;
		border-radius: 50px;
		font-size: 0.74rem;
		font-weight: 600;
		color: var(--navy);
		background: rgba(11,52,102,0.05);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.12);
	}
	.svc-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: auto;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.svc-go {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--navy);
		transition: color 0.3s ease;
	}
	.svc-card:hover .svc-go { color: var(--cta); }
	.svc-arrow {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.svc-card:hover .svc-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}

	/* Wide feature tiles: dark with a visual */
	.svc-card.wide { background: var(--surface-dark); box-shadow: var(--shadow-dark-raised); color: #FAF9F6; }
	.svc-card.wide:hover { box-shadow: 0 40px 70px -26px rgba(8,20,45,0.65), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12); }
	.svc-card.wide::before { background: linear-gradient(90deg, #e0414f, #f06a75); }
	.svc-card.wide .svc-spot { background: radial-gradient(320px circle at var(--mx) var(--my), rgba(255,255,255,0.12), transparent 60%); }
	.svc-card.wide .svc-icon {
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.svc-card.wide:hover .svc-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.svc-card.wide .svc-index { color: rgba(250,249,246,0.45); }
	.svc-card.wide:hover .svc-index { color: #f06a75; }
	.svc-card.wide h2 { color: #FAF9F6; }
	.svc-card.wide p { color: rgba(250,249,246,0.78); }
	.svc-card.wide .svc-tags li { color: rgba(250,249,246,0.85); background: rgba(255,255,255,0.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12); }
	.svc-card.wide .svc-foot { border-top-color: rgba(255,255,255,0.12); }
	.svc-card.wide .svc-go { color: #FAF9F6; }
	.svc-card.wide .svc-arrow { color: #FAF9F6; box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3); }
	.svc-card.wide:focus-visible { outline-color: var(--navy); }

	.svc-visual { display: none; }
	.svc-browser {
		flex-direction: column;
		border-radius: 14px;
		overflow: hidden;
		background: rgba(5,9,15,0.35);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 24px 40px -24px rgba(0,0,0,0.7);
		transform: perspective(900px) rotateY(-8deg) rotateX(4deg);
		transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
	}
	.svc-card:hover .svc-browser { transform: perspective(900px) rotateY(0) rotateX(0) translateY(-4px); }
	.svc-browser-bar { display: flex; align-items: center; gap: 5px; padding: 0.6rem 0.75rem; background: rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.08); }
	.svc-browser-bar span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.25); }
	.svc-browser-bar span:first-child { background: #f06a75; }
	.svc-browser-bar i { flex: 1; height: 8px; margin-left: 0.6rem; border-radius: 4px; background: rgba(255,255,255,0.08); }
	.svc-browser-body { display: flex; flex-direction: column; gap: 0.55rem; padding: 0.9rem; }
	.sk { display: block; border-radius: 6px; background: rgba(255,255,255,0.1); }
	.sk-hero { height: 58px; background: linear-gradient(120deg, rgba(64,120,200,0.55), rgba(196,42,56,0.45)); }
	.sk-line { height: 7px; }
	.sk-line.w70 { width: 70%; }
	.sk-line.w45 { width: 45%; }
	.sk-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.45rem; margin-top: 0.2rem; }
	.sk-card { height: 38px; }
	.svc-chart {
		position: relative;
		border-radius: 14px;
		overflow: hidden;
		background: rgba(5,9,15,0.3);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.1);
		min-height: 170px;
	}
	.svc-chart svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; }
	.svc-chart-line { stroke-dasharray: 400; stroke-dashoffset: 0; }
	.svc-card:hover .svc-chart-line { animation: svc-draw 1.2s cubic-bezier(0.22,1,0.36,1); }
	@keyframes svc-draw { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
	.svc-chart-bars { position: absolute; inset: 18% 6% 0; display: flex; align-items: flex-end; gap: 8%; }
	.svc-chart-bars span { flex: 1; border-radius: 4px 4px 0 0; background: linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03)); }

	/* Consultation band */
	.svc-cta {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding: clamp(1.75rem, 4vw, 2.75rem);
		border-radius: var(--radius-2xl);
		color: #FAF9F6;
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised);
	}
	.svc-cta-glow {
		position: absolute;
		z-index: -1;
		right: -10%;
		top: -60%;
		width: 55%;
		height: 220%;
		background: radial-gradient(ellipse at center, rgba(196,42,56,0.35), transparent 65%);
		pointer-events: none;
	}
	.svc-cta-copy { display: flex; align-items: flex-start; gap: 1.1rem; }
	.svc-cta-copy > div { min-width: 0; }
	.svc-cta-copy h2 { overflow-wrap: break-word; hyphens: auto; }
	/* Phones: icon above the text so the heading gets the full width */
	@media (max-width: 479px) {
		.svc-cta-copy { flex-direction: column; gap: 0.9rem; }
	}
	.svc-cta-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 54px;
		height: 54px;
		border-radius: 16px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 12px 24px -10px rgba(155,17,30,0.7), inset 0 1px 0 rgba(255,255,255,0.28);
	}
	.svc-cta h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		margin-bottom: 0.5rem;
	}
	.svc-cta p { font-size: 1rem; line-height: 1.6; color: rgba(250,249,246,0.78); max-width: 58ch; }
	.svc-cta .btn-main { align-self: flex-start; }

	/* ─── Responsive ─── */
	@media (min-width: 640px) {
		.svc-grid { grid-template-columns: repeat(2, 1fr); }
		.svc-card.wide { grid-column: 1 / -1; grid-template-columns: 1.1fr 1fr; align-items: center; }
		.svc-card.wide .svc-visual { display: flex; }
		.svc-card.wide .svc-chart { display: block; }
	}
	@media (min-width: 900px) {
		.svc-cta { flex-direction: row; align-items: center; justify-content: space-between; }
		.svc-cta .btn-main { align-self: center; }
	}
	@media (min-width: 1024px) {
		.hero-grid { grid-template-columns: 1.05fr 0.95fr; }
		.svc-grid { grid-template-columns: repeat(4, 1fr); }
		.svc-card.wide { grid-column: span 2; }
	}
	@media (prefers-reduced-motion: reduce) {
		.reel, .btn-main, .btn-main-arrow, .svc-card, .svc-card::before, .svc-icon, .svc-arrow, .svc-browser, .svc-spot { transition: none; }
		.reel:hover { transform: perspective(1200px) rotateY(-8deg) rotateX(3deg); }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .svc-card:hover, .svc-card:hover .svc-icon, .svc-card:hover .svc-arrow { transform: none; }
		.svc-card:hover .svc-browser { transform: perspective(900px) rotateY(-8deg) rotateX(4deg); }
		.svc-card:hover .svc-chart-line { animation: none; }
	}
</style>

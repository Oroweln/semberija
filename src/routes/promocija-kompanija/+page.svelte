<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { enquiryUrl } from '$lib/enquiry';

	// Highlighted placement in the hero mock-up; format cards and mock zones share it
	let hovered = $state(-1);
	const a = $derived(i18n.t.advertising);
</script>

<svelte:head>
	<title>{a.title} — Semberija.app</title>
</svelte:head>

{#snippet formatIcon(i: number)}
	<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<rect x="2" y="4" width="20" height="12" rx="2"/><path d="M8 20h8"/><path d="M9 10l-2 0M17 10h-2"/><circle cx="12" cy="10" r="2"/>
		{:else if i === 1}
			<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>
		{:else if i === 2}
			<rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 12h6"/><path d="M16 12h2"/>
		{:else}
			<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17.5 14v7M14 17.5h7"/>
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
			<span class="page-label"><span class="page-label-dot"></span>{i18n.t.promo.label}</span>
			<h1>{i18n.t.promo.heading}</h1>
			<p class="page-sub">{i18n.t.promo.desc}</p>
			<div class="hero-btns">
				<a href={enquiryUrl('oglasavanje')} class="btn-main">
					<span>{i18n.t.promo.cta}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<a href="#formati" class="btn-ghost">{a.formatsHeading}</a>
			</div>
		</div>

		<!-- Mock-up of the site with the four ad placements marked -->
		<div class="mock" aria-hidden="true">
			<div class="mock-bar"><span></span><span></span><span></span><i>semberija.app</i></div>
			<div class="mock-page">
				<div class="zone z-slider" class:active={hovered === 0}>
					<em>01</em>
					<span class="mock-line w60 light"></span>
					<span class="mock-line w40 light"></span>
				</div>
				<div class="mock-row">
					<div class="zone z-featured" class:active={hovered === 1}>
						<em>02</em>
						<span class="mock-avatar"></span>
						<span class="mock-line w70"></span>
						<span class="mock-line w50"></span>
					</div>
					<div class="mock-card">
						<span class="mock-avatar"></span>
						<span class="mock-line w70"></span>
						<span class="mock-line w50"></span>
					</div>
				</div>
				<div class="zone z-banner" class:active={hovered === 2}>
					<em>03</em>
					<span class="mock-line w50 light"></span>
				</div>
				<div class="mock-row three">
					<div class="zone z-category" class:active={hovered === 3}>
						<em>04</em>
						<span class="mock-tile"></span>
					</div>
					<div class="mock-card small"><span class="mock-tile"></span></div>
					<div class="mock-card small"><span class="mock-tile"></span></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ─── FORMATS ─── -->
<section class="adv-body reveal-card" use:reveal id="formati">
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		<span class="section-kicker">{a.formatsHeading}</span>
		<div class="adv-grid">
			{#each a.options as opt, i}
				<a
					href={enquiryUrl('oglasavanje')}
					class="adv-card"
					class:linked={hovered === i}
					onmouseenter={() => (hovered = i)}
					onmouseleave={() => (hovered = -1)}
					onfocus={() => (hovered = i)}
					onblur={() => (hovered = -1)}
				>
					<span class="adv-head">
						<span class="adv-icon">{@render formatIcon(i)}</span>
						<span class="adv-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					</span>
					<h2>{opt.title}</h2>
					<p>{opt.desc}</p>
					<span class="adv-foot">
						<span class="adv-go">{i18n.t.promo.cta}</span>
						<span class="adv-arrow" aria-hidden="true">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</span>
				</a>
			{/each}
		</div>

		<!-- Audience -->
		<div class="audience">
			<!-- Branded visual: rings radiating from Bijeljina (reach), no photo -->
			<div class="aud-media" aria-hidden="true">
				<span class="aud-lines"></span>
				<span class="aud-ring r1"></span>
				<span class="aud-ring r2"></span>
				<span class="aud-ring r3"></span>
				<span class="aud-pin">
					<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
				</span>
				<span class="aud-chip">
					<span class="aud-chip-dot"></span>
					Bijeljina · Semberija
					<em>44.76° N · 19.21° E</em>
				</span>
			</div>
			<div class="aud-copy">
				<span class="section-kicker">{i18n.t.promo.label}</span>
				<h2>{a.audienceHeading}</h2>
				<p>{a.audienceDesc}</p>
				<ul class="aud-benefits">
					{#each a.benefits as b}
						<li>
							<span class="aud-check" aria-hidden="true">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
							</span>
							{b}
						</li>
					{/each}
				</ul>
				<a href={enquiryUrl('oglasavanje')} class="btn-main dark">
					<span>{i18n.t.promo.cta}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
			</div>
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
	.btn-main.dark:focus-visible { outline-color: var(--cta); }
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

	/* Site mock-up with placements */
	.mock {
		display: none;
		overflow: hidden;
		border-radius: 20px;
		background: rgba(5,15,35,0.35);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14), 0 40px 80px -36px rgba(0,0,0,0.75);
		transform: perspective(1200px) rotateY(-9deg) rotateX(3deg);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.mock-bar {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 0.6rem 0.8rem;
		background: rgba(255,255,255,0.06);
		border-bottom: 1px solid rgba(255,255,255,0.08);
	}
	.mock-bar span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.25); }
	.mock-bar span:first-child { background: #f06a75; }
	.mock-bar i {
		flex: 1;
		margin-left: 0.6rem;
		font-style: normal;
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.68rem;
		text-align: center;
		color: rgba(255,255,255,0.55);
	}
	.mock-page { display: flex; flex-direction: column; gap: 0.6rem; padding: 0.9rem; }
	.mock-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
	.mock-row.three { grid-template-columns: repeat(3, 1fr); }
	.mock-card, .zone {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 0.75rem;
		border-radius: 12px;
		background: rgba(255,255,255,0.06);
	}
	.mock-card.small, .z-category { align-items: center; justify-content: center; padding: 0.6rem; }
	.zone {
		box-shadow: inset 0 0 0 1.5px rgba(240,106,117,0.55);
		background: rgba(240,106,117,0.08);
		transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.zone.active {
		background: rgba(240,106,117,0.28);
		box-shadow: inset 0 0 0 2px #f06a75, 0 0 0 6px rgba(240,106,117,0.15);
		transform: scale(1.02);
	}
	.zone em {
		position: absolute;
		top: 6px;
		right: 8px;
		font-style: normal;
		font-family: var(--font-heading);
		font-size: 0.66rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		color: #f6a2aa;
	}
	.z-slider {
		min-height: 92px;
		justify-content: flex-end;
		background:
			linear-gradient(120deg, rgba(64,120,200,0.45), rgba(196,42,56,0.35)),
			rgba(240,106,117,0.08);
	}
	.z-banner { min-height: 34px; justify-content: center; }
	.mock-line { display: block; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.14); }
	.mock-line.light { background: rgba(255,255,255,0.45); }
	.mock-line.w70 { width: 70%; }
	.mock-line.w60 { width: 60%; height: 9px; }
	.mock-line.w50 { width: 50%; }
	.mock-line.w40 { width: 40%; }
	.mock-avatar { width: 24px; height: 24px; border-radius: 8px; background: rgba(255,255,255,0.18); }
	.mock-tile { width: 26px; height: 26px; border-radius: 8px; background: rgba(255,255,255,0.16); }

	/* ─── FORMATS ─── */
	.adv-body {
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
	.section-kicker {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1.1rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #6b7380;
	}
	.section-kicker::before { content: ''; width: 18px; height: 2px; border-radius: 2px; background: var(--accent-line); }

	.adv-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.25rem);
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}
	.adv-card {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: clamp(1.4rem, 2.4vw, 1.75rem);
		border-radius: var(--radius-2xl);
		text-decoration: none;
		color: inherit;
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 32px -18px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.adv-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.adv-card:hover, .adv-card.linked {
		transform: translateY(-6px);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 34px 60px -28px rgba(15,23,42,0.32), inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.adv-card:hover::before, .adv-card.linked::before { transform: scaleX(1); }
	.adv-card:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; }
	.adv-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem; }
	.adv-icon {
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
	.adv-card:hover .adv-icon, .adv-card.linked .adv-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
	}
	.adv-num {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(11,52,102,0.35);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.adv-card:hover .adv-num, .adv-card.linked .adv-num { color: var(--cta); }
	.adv-card h2 {
		font-family: var(--font-heading);
		font-size: 1.18rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}
	.adv-card p { flex: 1; font-size: 0.92rem; line-height: 1.6; color: #4a525e; margin-bottom: 1.25rem; }
	.adv-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.adv-go {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--navy);
		transition: color 0.3s ease;
	}
	.adv-card:hover .adv-go { color: var(--cta); }
	.adv-arrow {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.adv-card:hover .adv-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}

	/* Audience */
	.audience {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
	}
	.aud-media {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		border-radius: 26px;
		aspect-ratio: 4 / 3;
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised);
	}
	.aud-lines {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 40px 40px,
			linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 40px 40px;
		-webkit-mask-image: radial-gradient(circle at 50% 45%, #000 15%, transparent 70%);
		mask-image: radial-gradient(circle at 50% 45%, #000 15%, transparent 70%);
	}
	.aud-ring {
		position: absolute;
		top: 45%;
		left: 50%;
		aspect-ratio: 1;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid rgba(255,255,255,0.14);
	}
	.aud-ring.r1 { width: 26%; background: radial-gradient(circle, rgba(240,106,117,0.18), transparent 70%); }
	.aud-ring.r2 { width: 50%; border-style: dashed; border-color: rgba(255,255,255,0.12); }
	.aud-ring.r3 { width: 78%; border-color: rgba(255,255,255,0.07); }
	.aud-pin {
		position: absolute;
		top: 45%;
		left: 50%;
		display: grid;
		place-items: center;
		width: 68px;
		height: 68px;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 18px 36px -12px rgba(155,17,30,0.75), 0 0 0 10px rgba(240,106,117,0.12);
	}
	.aud-chip {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.9rem;
		border-radius: 50px;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: #FAF9F6;
		background: rgba(255,255,255,0.1);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.aud-chip em {
		font-style: normal;
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.68rem;
		font-weight: 400;
		color: rgba(250,249,246,0.55);
	}
	.aud-chip-dot { width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: #f06a75; box-shadow: 0 0 0 3px rgba(240,106,117,0.25); }
	/* Phones: equal inset from both card edges; coordinates drop to their own line */
	@media (max-width: 599px) {
		.aud-chip {
			left: 0.85rem;
			bottom: 0.85rem;
			max-width: calc(100% - 1.7rem);
			flex-wrap: wrap;
			row-gap: 0.1rem;
			padding: 0.5rem 0.9rem;
			border-radius: 16px;
			letter-spacing: 0.04em;
		}
		.aud-chip em { flex-basis: 100%; padding-left: calc(6px + 0.5rem); }
	}
	.aud-copy h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.7rem, 3.4vw, 2.5rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		color: var(--navy);
		margin-bottom: 0.9rem;
		text-wrap: balance;
	}
	.aud-copy > p { font-size: 1.02rem; line-height: 1.7; color: #4a525e; max-width: 54ch; margin-bottom: 1.5rem; }
	.aud-benefits {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.55rem;
		margin: 0 0 2rem;
		padding: 0;
	}
	.aud-benefits li {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.7rem 0.85rem;
		border-radius: 14px;
		font-size: 0.93rem;
		font-weight: 600;
		color: var(--navy);
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.aud-check {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		color: var(--success);
		background: rgba(63,143,116,0.12);
	}

	/* ─── Responsive ─── */
	@media (min-width: 600px) {
		.adv-grid { grid-template-columns: repeat(2, 1fr); }
		.aud-benefits { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 900px) {
		.audience { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 1024px) {
		.hero-grid { grid-template-columns: 1.05fr 0.95fr; }
		.mock { display: block; }
		.adv-grid { grid-template-columns: repeat(4, 1fr); }
	}
	@media (prefers-reduced-motion: reduce) {
		.btn-main, .btn-main-arrow, .adv-card, .adv-card::before, .adv-icon, .adv-arrow, .zone { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .adv-card:hover, .adv-card.linked, .adv-card:hover .adv-icon,
		.adv-card.linked .adv-icon, .adv-card:hover .adv-arrow, .zone.active { transform: none; }
	}
</style>

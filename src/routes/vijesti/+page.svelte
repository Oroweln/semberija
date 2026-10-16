<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';

	// No articles are published yet: the page presents the topics the section will cover
	// and an honest "coming soon" state (no invented news).
	const n = $derived(i18n.t.news);
</script>

<svelte:head>
	<title>{n.heading} — Semberija.app</title>
</svelte:head>

{#snippet topicIcon(i: number)}
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M2 13h20"/>
		{:else if i === 1}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
		{:else if i === 2}
			<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M9 8l-2 2 2 2M15 8l2 2-2 2"/>
		{:else if i === 3}
			<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
		{:else if i === 4}
			<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
		{:else if i === 5}
			<path d="M12 22V12"/><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z"/><path d="M12 15c0-4 3-7 8-7 0 4-3 7-8 7z"/>
		{:else if i === 6}
			<path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/>
		{:else}
			<path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2"/><path d="M12 15l-3-3a22 22 0 0 1 2-4A13 13 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z"/><path d="M9 12H4s.5-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.5 4-2c1.1-1.6 0-5 0-5"/>
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
				<span class="page-label"><span class="page-label-dot"></span>{n.label}</span>
				<h1>{n.heading}</h1>
				<p class="page-sub">{n.sub}</p>
				<span class="soon-pill">
					<span class="soon-dot" aria-hidden="true"></span>
					{i18n.t.ui.newsSoon}
				</span>
			</div>

			<!-- Masthead preview (illustrative, no real articles) -->
			<div class="masthead" aria-hidden="true">
				<div class="mh-top">
					<span class="mh-brand">Semberija<em>.app</em></span>
					<span class="mh-tag">{n.label}</span>
				</div>
				<div class="mh-lead">
					<span class="mh-img"></span>
					<span class="mh-line w90"></span>
					<span class="mh-line w70"></span>
				</div>
				<div class="mh-row">
					{#each [0, 1, 2] as k}
						<div class="mh-item">
							<span class="mh-chip"></span>
							<span class="mh-line w80"></span>
							<span class="mh-line w60"></span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ─── BODY ─── -->
	<section class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container">
			<!-- Coming soon -->
			<div class="soon">
				<div class="ghost-stack" aria-hidden="true">
					{#each [0, 1, 2] as g}
						<div class="ghost-card" style="--g:{g}">
							<span class="ghost-img"></span>
							<span class="ghost-pill"></span>
							<span class="ghost-line w80"></span>
							<span class="ghost-line w60"></span>
						</div>
					{/each}
					<span class="ghost-badge">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 002 2z"/><path d="M2 12h6M2 8h4M2 16h4"/></svg>
					</span>
				</div>
				<div class="soon-copy">
					<h2>{i18n.t.ui.newsSoon}</h2>
					<p>{i18n.t.ui.newsSoonDesc}</p>
					<a href="/kontakt" class="btn-main">
						<span>{i18n.t.ui.contactUs}</span>
						<span class="btn-main-arrow" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
				</div>
			</div>

			<!-- Topics the section will cover -->
			<span class="section-kicker">{n.label}</span>
			<ul class="topics">
				{#each n.categories as cat, i}
					<li class="topic">
						<span class="topic-icon">{@render topicIcon(i)}</span>
						<span class="topic-name">{cat}</span>
						<span class="topic-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					</li>
				{/each}
			</ul>
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
			radial-gradient(35% 45% at 82% 50%, rgba(196,42,56,0.25), transparent 70%);
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
	.hero-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; }
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
	.page-label-dot { width: 7px; height: 7px; border-radius: 50%; background: #f06a75; box-shadow: 0 0 0 4px rgba(240,106,117,0.2); }
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 5vw, 3.8rem);
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
	.page-sub { font-size: 1.1rem; line-height: 1.65; color: rgba(250,249,246,0.8); max-width: 54ch; margin-bottom: 1.75rem; }
	.soon-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.45rem 0.95rem;
		border-radius: 50px;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #f6cf72;
		background: rgba(242,193,78,0.12);
		box-shadow: inset 0 0 0 1px rgba(242,193,78,0.35);
	}
	.soon-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: blink 1.8s ease-in-out infinite; }
	@keyframes blink { 50% { opacity: 0.3; } }

	/* Masthead preview */
	.masthead {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.2rem;
		border-radius: 22px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		transform: perspective(1200px) rotateY(-8deg) rotateX(3deg);
	}
	.mh-top { display: flex; align-items: baseline; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.12); }
	.mh-brand { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em; }
	.mh-brand em { font-style: normal; color: #f06a75; }
	.mh-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(250,249,246,0.6); }
	.mh-lead { display: flex; flex-direction: column; gap: 0.5rem; }
	.mh-img { height: 110px; border-radius: 14px; background: linear-gradient(120deg, rgba(64,120,200,0.55), rgba(196,42,56,0.45)); }
	.mh-line { display: block; height: 8px; border-radius: 4px; background: rgba(255,255,255,0.16); }
	.mh-line.w90 { width: 90%; height: 11px; background: rgba(255,255,255,0.32); }
	.mh-line.w80 { width: 80%; }
	.mh-line.w70 { width: 70%; }
	.mh-line.w60 { width: 60%; }
	.mh-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
	.mh-item { display: flex; flex-direction: column; gap: 0.4rem; padding: 0.7rem; border-radius: 12px; background: rgba(255,255,255,0.05); }
	.mh-chip { width: 40px; height: 8px; border-radius: 4px; background: rgba(240,106,117,0.5); }

	/* ─── BODY ─── */
	.page-body {
		position: relative;
		overflow: hidden;
		isolation: isolate;
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
	.soon {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}
	.ghost-stack { position: relative; height: 280px; max-width: 420px; width: 100%; margin: 0 auto; }
	.ghost-card {
		position: absolute;
		left: calc(var(--g) * 7%);
		top: calc(var(--g) * 28px);
		width: 86%;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		padding: 1rem;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 20px 40px -24px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
		opacity: calc(0.45 + var(--g) * 0.27);
		transform: rotate(calc((var(--g) - 1) * -3deg));
	}
	.ghost-img { height: 80px; border-radius: 12px; background: linear-gradient(120deg, rgba(28,90,168,0.18), rgba(155,17,30,0.14)); }
	.ghost-pill { width: 70px; height: 16px; border-radius: 50px; background: rgba(155,17,30,0.12); }
	.ghost-line { height: 10px; border-radius: 5px; background: rgba(11,52,102,0.1); }
	.ghost-line.w80 { width: 80%; height: 12px; background: rgba(11,52,102,0.18); }
	.ghost-line.w60 { width: 60%; }
	.ghost-badge {
		position: absolute;
		right: 2%;
		bottom: 4%;
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 16px 30px -10px rgba(155,17,30,0.7), 0 0 0 8px rgba(155,17,30,0.1);
	}
	.soon-copy h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.6rem, 3vw, 2.3rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		color: var(--navy);
		margin-bottom: 0.8rem;
	}
	.soon-copy p { font-size: 1.02rem; line-height: 1.65; color: #4a525e; max-width: 52ch; margin-bottom: 1.75rem; }
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
	.btn-main-arrow { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; color: var(--cta); background: #FAF9F6; transition: transform 0.45s cubic-bezier(0.22,1,0.36,1); }
	.btn-main:hover { transform: translateY(-2px); }
	.btn-main:hover .btn-main-arrow { transform: rotate(45deg); }
	.btn-main:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }

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
	.topics { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin: 0; padding: 0; }
	.topic {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.8rem 0.9rem;
		border-radius: 18px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 10px 24px -20px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.topic-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 12px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
	}
	.topic-name { flex: 1; min-width: 0; font-size: 0.95rem; font-weight: 700; color: var(--navy); }
	.topic-num { font-family: var(--font-heading); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; color: rgba(11,52,102,0.3); }

	/* ─── Responsive ─── */
	@media (max-width: 420px) {
		.topics { grid-template-columns: 1fr; }
	}
	@media (min-width: 900px) {
		.soon { grid-template-columns: 0.9fr 1.1fr; }
	}
	@media (min-width: 1024px) {
		.hero-grid { grid-template-columns: 1.1fr 0.9fr; }
		.topics { grid-template-columns: repeat(4, 1fr); }
	}
	@media (prefers-reduced-motion: reduce) {
		.soon-dot { animation: none; }
		.btn-main, .btn-main-arrow { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow { transform: none; }
	}
</style>

<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { showSampleContent } from '$lib/data';
	import { enquiryUrl } from '$lib/enquiry';

	const o = $derived(i18n.t.opportunities);

	// Sample opportunities (only shown when showSampleContent is on; sample text exists in sr/en)
	const samples = $derived([
		{ kind: 0, title: i18n.lang === 'sr' ? 'Hladnjača kapaciteta 2000 t' : '2000t Cold Storage Facility', desc: i18n.lang === 'sr' ? 'Tražimo investitora za izgradnju hladnjače u okolini Bijeljine.' : 'Seeking investor for cold storage construction near Bijeljina.', range: '€150.000 – €300.000' },
		{ kind: 1, title: i18n.lang === 'sr' ? 'Distribucija prehrambenih proizvoda' : 'Food Product Distribution', desc: i18n.lang === 'sr' ? 'Tražimo pouzdanog partnera za distribuciju.' : 'Looking for a reliable distribution partner.', range: i18n.lang === 'sr' ? 'Na dogovor' : 'Negotiable' },
		{ kind: 2, title: i18n.lang === 'sr' ? 'IT outsourcing za lokalne firme' : 'IT Outsourcing for Local Companies', desc: i18n.lang === 'sr' ? 'Agencija traži dugoročne saradnike za IT usluge.' : 'Agency seeking long-term collaborators for IT services.', range: i18n.lang === 'sr' ? 'Dugoročno' : 'Long-term' }
	]);
</script>

<svelte:head>
	<title>{i18n.t.nav.opportunities} — Semberija.app</title>
</svelte:head>

{#snippet kindIcon(i: number, size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
		{:else if i === 1}
			<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
		{:else}
			<circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 7l3.5 3M18 7l-3.5 3M6 17l3.5-3M18 17l-3.5-3"/>
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
			<span class="page-label"><span class="page-label-dot"></span>{i18n.t.nav.platform}</span>
			<h1>{i18n.t.nav.opportunities}</h1>
			<p class="page-sub">{o.sub}</p>
			<div class="hero-btns">
				<a href={enquiryUrl('b2b')} class="btn-main">
					<span>{i18n.t.board.submitOpp}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<a href="/investicije" class="btn-ghost">{i18n.t.nav.investments}</a>
			</div>
		</div>

		<!-- The three kinds of opportunities -->
		<div class="board" aria-hidden="true">
			<div class="board-head">
				<span class="board-dot"></span>
				<span class="board-title">{o.kindsHeading}</span>
				<span class="board-count">03</span>
			</div>
			{#each o.kinds as k, i}
				<div class="board-row">
					<span class="board-icon">{@render kindIcon(i, 18)}</span>
					<span class="board-name">{k.title}</span>
					<span class="board-num">{String(i + 1).padStart(2, '0')}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── BOARD ─── -->
<section class="opp-body reveal-card" use:reveal>
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		{#if showSampleContent}
			<div class="opp-grid">
				{#each samples as opp}
					<article class="opp-card">
						<div class="opp-header">
							<span class="opp-type"><span class="opp-type-dot" aria-hidden="true"></span>{o.kinds[opp.kind].title}</span>
							<span class="opp-range">{opp.range}</span>
						</div>
						<h3>{opp.title}</h3>
						<p>{opp.desc}</p>
						<a href={enquiryUrl('b2b')} class="opp-btn">
							<span>{o.interested}</span>
							<span class="opp-btn-arrow" aria-hidden="true">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</a>
					</article>
				{/each}
			</div>
		{:else}
			<!-- Empty board: preview of how opportunities will look + call to post the first one -->
			<div class="board-empty">
				<div class="ghost-stack" aria-hidden="true">
					{#each [0, 1, 2] as g}
						<div class="ghost-card" style="--g:{g}">
							<span class="ghost-top"><span class="ghost-pill"></span><span class="ghost-range"></span></span>
							<span class="ghost-line w80"></span>
							<span class="ghost-line w60"></span>
							<span class="ghost-btn"></span>
						</div>
					{/each}
					<span class="ghost-badge">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
					</span>
				</div>
				<div class="board-copy">
					<h2>{i18n.t.board.oppTitle}</h2>
					<p>{i18n.t.board.oppDesc}</p>
					<a href={enquiryUrl('b2b')} class="btn-main">
						<span>{i18n.t.board.submitOpp}</span>
						<span class="btn-main-arrow" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
				</div>
			</div>
		{/if}

		<!-- Kinds of opportunities -->
		<span class="section-kicker">{o.kindsHeading}</span>
		<div class="kinds">
			{#each o.kinds as k, i}
				<a href={enquiryUrl('b2b')} class="kind" class:featured={i === 0}>
					<span class="kind-watermark" aria-hidden="true">{@render kindIcon(i, 130)}</span>
					<span class="kind-head">
						<span class="kind-icon">{@render kindIcon(i, 22)}</span>
						<span class="kind-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					</span>
					<h3>{k.title}</h3>
					<p>{k.desc}</p>
					<span class="kind-foot">
						<span class="kind-go">{i18n.t.board.submitOpp}</span>
						<span class="kind-arrow" aria-hidden="true">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</span>
				</a>
			{/each}
		</div>

		<!-- Post your own -->
		<div class="post-opp">
			<!-- Branded visual: a rising line of opportunities, no photo -->
			<div class="post-media" aria-hidden="true">
				<span class="post-lines"></span>
				<svg class="post-chart" viewBox="0 0 400 300" preserveAspectRatio="none">
					<defs>
						<linearGradient id="opp-area" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stop-color="#f06a75" stop-opacity="0.35"/>
							<stop offset="100%" stop-color="#f06a75" stop-opacity="0"/>
						</linearGradient>
					</defs>
					<path d="M0 250 L70 222 L130 232 L190 180 L250 192 L310 124 L400 70 L400 300 L0 300 Z" fill="url(#opp-area)"/>
					<path d="M0 250 L70 222 L130 232 L190 180 L250 192 L310 124 L400 70" fill="none" stroke="#f06a75" stroke-width="2.5" vector-effect="non-scaling-stroke"/>
				</svg>
				<span class="post-node n1">{@render kindIcon(0, 18)}</span>
				<span class="post-node n2">{@render kindIcon(1, 18)}</span>
				<span class="post-node n3">{@render kindIcon(2, 18)}</span>
				<span class="post-chip">
					<span class="post-chip-dot"></span>
					Semberija
					<em>44.76° N · 19.21° E</em>
				</span>
			</div>
			<div class="post-text">
				<span class="section-kicker">{o.postLabel}</span>
				<h2>{o.postHeading}</h2>
				<p>{o.postDesc}</p>
				<a href={enquiryUrl('b2b')} class="btn-main">
					<span>{i18n.t.board.submitOpp}</span>
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
	.btn-main:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }
	.page-top .btn-main:focus-visible { outline-color: #FAF9F6; }
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

	/* Kinds board */
	.board {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.1rem;
		border-radius: 26px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}
	.board-head { display: flex; align-items: center; gap: 0.6rem; padding: 0.3rem 0.4rem 0.6rem; }
	.board-dot { width: 7px; height: 7px; border-radius: 50%; background: #7fd1b2; box-shadow: 0 0 0 3px rgba(127,209,178,0.2); }
	.board-title {
		flex: 1;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.7);
	}
	.board-count { font-family: var(--font-heading); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.12em; color: rgba(250,249,246,0.5); }
	.board-row {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.8rem 0.9rem;
		border-radius: 16px;
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
	}
	.board-row:first-of-type { background: #FAF9F6; color: var(--navy); }
	.board-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		border-radius: 12px;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
	}
	.board-row:first-of-type .board-icon { background: linear-gradient(150deg, #c42a38, var(--cta)); }
	.board-name { flex: 1; font-size: 0.98rem; font-weight: 700; }
	.board-num { font-family: var(--font-heading); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; opacity: 0.55; }

	/* ─── BODY ─── */
	.opp-body {
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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 45%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 45%);
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

	/* Empty board */
	.board-empty {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}
	.ghost-stack { position: relative; height: 260px; max-width: 420px; width: 100%; margin: 0 auto; }
	.ghost-card {
		position: absolute;
		left: calc(var(--g) * 7%);
		top: calc(var(--g) * 30px);
		width: 86%;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 1.25rem;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 20px 40px -24px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
		opacity: calc(0.45 + var(--g) * 0.27);
		transform: rotate(calc((var(--g) - 1) * -3deg));
	}
	.ghost-top { display: flex; justify-content: space-between; }
	.ghost-pill { width: 90px; height: 20px; border-radius: 50px; background: rgba(155,17,30,0.12); }
	.ghost-range { width: 70px; height: 20px; border-radius: 6px; background: rgba(63,143,116,0.14); }
	.ghost-line { height: 10px; border-radius: 5px; background: rgba(11,52,102,0.1); }
	.ghost-line.w80 { width: 80%; height: 13px; background: rgba(11,52,102,0.18); }
	.ghost-line.w60 { width: 60%; }
	.ghost-btn { margin-top: 0.4rem; height: 34px; border-radius: 50px; background: rgba(11,52,102,0.07); }
	.ghost-badge {
		position: absolute;
		right: 2%;
		bottom: 6%;
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 16px 30px -10px rgba(155,17,30,0.7), 0 0 0 8px rgba(155,17,30,0.1);
	}
	.board-copy h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.6rem, 3vw, 2.3rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		color: var(--navy);
		margin-bottom: 0.8rem;
		text-wrap: balance;
	}
	.board-copy p { font-size: 1.02rem; line-height: 1.65; color: #4a525e; max-width: 52ch; margin-bottom: 1.75rem; }

	/* Sample opportunity cards */
	.opp-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; margin-bottom: clamp(3rem, 6vw, 4.5rem); }
	.opp-card {
		display: flex;
		flex-direction: column;
		padding: 1.6rem;
		border-radius: var(--radius-2xl);
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 32px -18px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.opp-card:hover { transform: translateY(-6px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 34px 60px -28px rgba(15,23,42,0.32), inset 0 0 0 1px rgba(155,17,30,0.22); }
	.opp-header { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1rem; }
	.opp-type {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.28rem 0.7rem;
		border-radius: 50px;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--cta);
		background: rgba(155,17,30,0.07);
		box-shadow: inset 0 0 0 1px rgba(155,17,30,0.2);
	}
	.opp-type-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
	.opp-range { font-family: var(--font-heading); font-size: 0.85rem; font-weight: 800; color: var(--success); }
	.opp-card h3 { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 800; letter-spacing: -0.02em; color: var(--navy); margin-bottom: 0.5rem; }
	.opp-card p { flex: 1; font-size: 0.92rem; line-height: 1.6; color: #4a525e; margin-bottom: 1.25rem; }
	.opp-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.45rem 0.45rem 0.45rem 1.05rem;
		border-radius: 50px;
		font-size: 0.85rem;
		font-weight: 700;
		text-decoration: none;
		color: var(--navy);
		background: rgba(11,52,102,0.06);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.12);
		transition: background 0.35s ease, color 0.35s ease;
	}
	.opp-btn-arrow { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; color: #FAF9F6; background: var(--navy); transition: background 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1); }
	.opp-btn:hover { color: #FAF9F6; background: var(--navy); }
	.opp-btn:hover .opp-btn-arrow { background: var(--cta); transform: rotate(45deg); }

	/* Kinds */
	.kinds {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.25rem);
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}
	.kind {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: clamp(1.5rem, 2.6vw, 1.9rem);
		border-radius: var(--radius-2xl);
		text-decoration: none;
		color: inherit;
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 32px -18px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.kind::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.kind:hover { transform: translateY(-6px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 34px 60px -28px rgba(15,23,42,0.32), inset 0 0 0 1px rgba(155,17,30,0.22); }
	.kind:hover::before { transform: scaleX(1); }
	.kind:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; }
	.kind-watermark {
		position: absolute;
		z-index: -1;
		right: -26px;
		bottom: -30px;
		color: rgba(11,52,102,0.045);
		transition: color 0.5s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
		pointer-events: none;
	}
	.kind:hover .kind-watermark { color: rgba(155,17,30,0.08); transform: rotate(-8deg) scale(1.06); }
	.kind-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem; }
	.kind-icon {
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		border-radius: 15px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		box-shadow: 0 12px 22px -10px rgba(11,52,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease;
	}
	.kind:hover .kind-icon { transform: rotate(-6deg) scale(1.06); background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.kind-num { font-family: var(--font-heading); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.2em; color: rgba(11,52,102,0.35); transition: color 0.35s ease; }
	.kind:hover .kind-num { color: var(--cta); }
	.kind h3 { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800; letter-spacing: -0.02em; color: var(--navy); margin-bottom: 0.5rem; }
	.kind p { flex: 1; font-size: 0.93rem; line-height: 1.6; color: #4a525e; margin-bottom: 1.4rem; }
	.kind-foot { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid rgba(15,23,42,0.08); }
	.kind-go { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--navy); transition: color 0.3s ease; }
	.kind:hover .kind-go { color: var(--cta); }
	.kind-arrow {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.kind:hover .kind-arrow { color: #FAF9F6; background: var(--cta); box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.6); transform: rotate(45deg); }
	.kind.featured { background: var(--surface-dark); box-shadow: var(--shadow-dark-raised); }
	.kind.featured:hover { box-shadow: 0 40px 70px -26px rgba(8,20,45,0.65), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12); }
	.kind.featured .kind-watermark { color: rgba(255,255,255,0.06); }
	.kind.featured .kind-icon { background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05)); box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12); }
	.kind.featured:hover .kind-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.kind.featured .kind-num { color: rgba(250,249,246,0.5); }
	.kind.featured h3 { color: #FAF9F6; }
	.kind.featured p { color: rgba(250,249,246,0.8); }
	.kind.featured .kind-foot { border-top-color: rgba(255,255,255,0.12); }
	.kind.featured .kind-go { color: #FAF9F6; }
	.kind.featured .kind-arrow { color: #FAF9F6; box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3); }
	.kind.featured:focus-visible { outline-color: var(--navy); }

	/* Post your own */
	.post-opp {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
	}
	.post-media {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		border-radius: 26px;
		aspect-ratio: 4 / 3;
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised);
	}
	.post-lines {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 40px 40px,
			linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px) 0 0 / 40px 40px;
		-webkit-mask-image: radial-gradient(ellipse 80% 70% at 60% 40%, #000 15%, transparent 75%);
		mask-image: radial-gradient(ellipse 80% 70% at 60% 40%, #000 15%, transparent 75%);
	}
	.post-chart { position: absolute; inset: 0; width: 100%; height: 100%; }
	/* Kind icons sitting on the rising line */
	.post-node {
		position: absolute;
		display: grid;
		place-items: center;
		width: 46px;
		height: 46px;
		border-radius: 14px;
		transform: translate(-50%, -50%);
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.2), rgba(255,255,255,0.06));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.14), 0 14px 28px -14px rgba(0,0,0,0.6);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
	.post-node.n1 { left: 32.5%; top: 77.3%; }
	.post-node.n2 { left: 62.5%; top: 64%; }
	.post-node.n3 {
		left: 86%;
		top: 34.5%;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 16px 30px -12px rgba(155,17,30,0.75), 0 0 0 8px rgba(240,106,117,0.12);
	}
	.post-chip {
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
	.post-chip em {
		font-style: normal;
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.68rem;
		font-weight: 400;
		color: rgba(250,249,246,0.55);
	}
	.post-chip-dot { width: 6px; height: 6px; border-radius: 50%; background: #f06a75; box-shadow: 0 0 0 3px rgba(240,106,117,0.25); }
	.post-text h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.7rem, 3.4vw, 2.5rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		color: var(--navy);
		margin-bottom: 0.9rem;
		text-wrap: balance;
	}
	.post-text > p { font-size: 1.02rem; line-height: 1.7; color: #4a525e; max-width: 54ch; margin-bottom: 1.75rem; }

	/* ─── Responsive ─── */
	@media (min-width: 640px) {
		.opp-grid { grid-template-columns: repeat(2, 1fr); }
		.kinds { grid-template-columns: repeat(2, 1fr); }
		.kind.featured { grid-column: 1 / -1; }
	}
	@media (min-width: 900px) {
		.board-empty { grid-template-columns: 0.9fr 1.1fr; }
		.post-opp { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 1024px) {
		.hero-grid { grid-template-columns: 1.1fr 0.9fr; }
		.opp-grid, .kinds { grid-template-columns: repeat(3, 1fr); }
		.kind.featured { grid-column: auto; }
	}
	@media (prefers-reduced-motion: reduce) {
		.btn-main, .btn-main-arrow, .opp-card, .opp-btn-arrow, .kind, .kind::before, .kind-icon, .kind-arrow, .kind-watermark { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .opp-card:hover, .opp-btn:hover .opp-btn-arrow, .kind:hover, .kind:hover .kind-icon,
		.kind:hover .kind-arrow, .kind:hover .kind-watermark { transform: none; }
	}
</style>

<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';

	// No events are published yet: the page shows the event formats the section will cover
	// and an honest "coming soon" state (no invented dates or events).
	const e = $derived(i18n.t.events);

	// Illustrative calendar: 35 abstract day cells, a few marked (no real dates).
	const marked: Record<number, 'red' | 'blue'> = { 9: 'red', 16: 'blue', 23: 'red', 26: 'blue' };
</script>

<svelte:head>
	<title>{e.heading} — Semberija.app</title>
	<meta name="description" content={e.sub} />
</svelte:head>

{#snippet typeIcon(i: number)}
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M19 10v1a7 7 0 01-14 0v-1M12 18v4M8 22h8"/>
		{:else if i === 1}
			<path d="M3 21V10l9-6 9 6v11"/><path d="M3 10h18M7 21v-7h4v7M15 14h3v3h-3z"/>
		{:else if i === 2}
			<path d="M8 11l4-4 4 4"/><path d="M2 12l4-4 4 4-4 4zM14 12l4-4 4 4-4 4z"/><path d="M10 12h4"/>
		{:else if i === 3}
			<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>
		{:else if i === 4}
			<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85"/>
		{:else}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
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
				<span class="page-label"><span class="page-label-dot"></span>{e.label}</span>
				<h1>{e.heading}</h1>
				<p class="page-sub">{e.sub}</p>
				<span class="soon-pill">
					<span class="soon-dot" aria-hidden="true"></span>
					{i18n.t.ui.eventsSoon}
				</span>
			</div>

			<!-- Calendar preview (illustrative, no real events) -->
			<div class="cal-wrap" aria-hidden="true">
				<div class="cal">
					<div class="cal-top">
						<span class="cal-brand">Semberija<em>.app</em></span>
						<span class="cal-tag">{e.label}</span>
					</div>
					<div class="cal-week">
						{#each Array(7) as _, k}<span class="cal-wd" class:weekend={k > 4}></span>{/each}
					</div>
					<div class="cal-grid">
						{#each Array(35) as _, d}
							<span class="cal-day" class:muted={d < 2 || d > 31} class:red={marked[d] === 'red'} class:blue={marked[d] === 'blue'}>
								{#if marked[d]}<i></i>{/if}
							</span>
						{/each}
					</div>
				</div>
				<div class="ticket">
					<span class="ticket-date">
						<span class="td-m"></span>
						<span class="td-d"></span>
					</span>
					<span class="ticket-body">
						<span class="tk-line w90"></span>
						<span class="tk-line w60"></span>
						<span class="tk-chip"></span>
					</span>
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
							<span class="ghost-date"><span></span><span></span></span>
							<span class="ghost-lines">
								<span class="ghost-pill"></span>
								<span class="ghost-line w80"></span>
								<span class="ghost-line w60"></span>
							</span>
						</div>
					{/each}
					<span class="ghost-badge">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
					</span>
				</div>
				<div class="soon-copy">
					<h2>{i18n.t.ui.eventsSoon}</h2>
					<p>{i18n.t.ui.eventsSoonDesc}</p>
					<a href="/kontakt" class="btn-main">
						<span>{i18n.t.ui.contactUs}</span>
						<span class="btn-main-arrow" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
				</div>
			</div>

			<!-- Event formats the section will cover -->
			<span class="section-kicker">{e.typesLabel}</span>
			<ul class="types">
				{#each e.types as type, i}
					<li class="type">
						<span class="type-icon">{@render typeIcon(i)}</span>
						<span class="type-name">{type}</span>
						<span class="type-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
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

	/* Calendar preview */
	.cal-wrap { position: relative; max-width: 460px; width: 100%; margin: 0 auto; padding-bottom: 2.2rem; }
	.cal {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding: 1.2rem;
		border-radius: 22px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		transform: perspective(1200px) rotateY(-8deg) rotateX(3deg);
	}
	.cal-top { display: flex; align-items: baseline; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.12); }
	.cal-brand { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em; }
	.cal-brand em { font-style: normal; color: #f06a75; }
	.cal-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(250,249,246,0.6); }
	.cal-week, .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.4rem; }
	.cal-wd { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.22); margin: 0 22%; }
	.cal-wd.weekend { background: rgba(240,106,117,0.45); }
	.cal-day {
		position: relative;
		aspect-ratio: 1;
		border-radius: 9px;
		background: rgba(255,255,255,0.06);
	}
	.cal-day.muted { background: rgba(255,255,255,0.025); }
	.cal-day.red { background: linear-gradient(150deg, #c42a38, var(--cta)); box-shadow: 0 8px 18px -8px rgba(155,17,30,0.9); }
	.cal-day.blue { background: linear-gradient(150deg, #2a6cc0, #0b3466); box-shadow: 0 8px 18px -8px rgba(28,90,168,0.9); }
	.cal-day i { position: absolute; left: 50%; bottom: 22%; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: #FAF9F6; }

	.ticket {
		position: absolute;
		left: -4%;
		bottom: 0;
		display: flex;
		align-items: stretch;
		width: 62%;
		border-radius: 16px;
		overflow: hidden;
		background: #FAF9F6;
		box-shadow: 0 30px 50px -22px rgba(0,0,0,0.75);
		transform: rotate(-3deg);
	}
	.ticket-date {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		width: 64px;
		flex-shrink: 0;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		border-right: 2px dashed rgba(250,249,246,0.5);
	}
	.td-m { width: 26px; height: 6px; border-radius: 3px; background: rgba(250,249,246,0.6); }
	.td-d { width: 30px; height: 18px; border-radius: 5px; background: #FAF9F6; }
	.ticket-body { flex: 1; display: flex; flex-direction: column; gap: 0.45rem; padding: 0.85rem 0.9rem; }
	.tk-line { display: block; height: 8px; border-radius: 4px; background: rgba(11,52,102,0.14); }
	.tk-line.w90 { width: 90%; height: 10px; background: rgba(11,52,102,0.3); }
	.tk-line.w60 { width: 60%; }
	.tk-chip { width: 54px; height: 14px; border-radius: 50px; background: rgba(28,90,168,0.16); }

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
	.ghost-stack { position: relative; height: 250px; max-width: 420px; width: 100%; margin: 0 auto; }
	.ghost-card {
		position: absolute;
		left: calc(var(--g) * 7%);
		top: calc(var(--g) * 52px);
		width: 86%;
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.9rem;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 20px 40px -24px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
		opacity: calc(0.45 + var(--g) * 0.27);
		transform: rotate(calc((var(--g) - 1) * -3deg));
	}
	.ghost-date {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
		width: 54px;
		height: 58px;
		flex-shrink: 0;
		border-radius: 14px;
		background: linear-gradient(150deg, rgba(28,90,168,0.16), rgba(155,17,30,0.14));
	}
	.ghost-date span:first-child { width: 22px; height: 5px; border-radius: 3px; background: rgba(155,17,30,0.35); }
	.ghost-date span:last-child { width: 26px; height: 16px; border-radius: 5px; background: rgba(11,52,102,0.22); }
	.ghost-lines { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
	.ghost-pill { width: 70px; height: 14px; border-radius: 50px; background: rgba(155,17,30,0.12); }
	.ghost-line { height: 10px; border-radius: 5px; background: rgba(11,52,102,0.1); }
	.ghost-line.w80 { width: 80%; height: 12px; background: rgba(11,52,102,0.18); }
	.ghost-line.w60 { width: 60%; }
	.ghost-badge {
		position: absolute;
		right: 2%;
		bottom: 2%;
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
	.types { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin: 0; padding: 0; }
	.type {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.8rem 0.9rem;
		border-radius: 18px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 10px 24px -20px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s;
	}
	.type::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 2px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.type:hover { transform: translateY(-2px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 18px 32px -20px rgba(15,23,42,0.4), inset 0 0 0 1px rgba(15,23,42,0.08); }
	.type:hover::before { transform: scaleX(1); }
	.type-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 12px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		transition: background 0.35s;
	}
	.type:hover .type-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.type-name { flex: 1; min-width: 0; font-size: 0.95rem; font-weight: 700; color: var(--navy); }
	.type-num { font-family: var(--font-heading); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; color: rgba(11,52,102,0.3); }

	/* ─── Responsive ─── */
	@media (max-width: 420px) {
		.types { grid-template-columns: 1fr; }
	}
	@media (min-width: 900px) {
		.soon { grid-template-columns: 0.9fr 1.1fr; }
	}
	@media (min-width: 1024px) {
		.hero-grid { grid-template-columns: 1.1fr 0.9fr; }
		.types { grid-template-columns: repeat(3, 1fr); }
	}
	@media (prefers-reduced-motion: reduce) {
		.soon-dot { animation: none; }
		.btn-main, .btn-main-arrow, .type, .type::before, .type-icon { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .type:hover { transform: none; }
	}
</style>

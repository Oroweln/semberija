<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { b2bItemSlugs } from '$lib/data';
	import { enquiryUrl } from '$lib/enquiry';

	const items = $derived(
		i18n.t.b2b.items.map((item, i) => ({ ...item, slug: b2bItemSlugs[i] }))
	);

	// Hero network: service nodes evenly spaced on a circle around the hub (percent coords)
	const nodes = b2bItemSlugs.map((_, i, all) => {
		const a = (-90 + (360 / all.length) * i) * (Math.PI / 180);
		return { x: +(50 + 38 * Math.cos(a)).toFixed(2), y: +(50 + 38 * Math.sin(a)).toFixed(2) };
	});
	let hovered = $state(-1);
</script>

<svelte:head>
	<title>{i18n.t.b2b.heading} — Semberija.app</title>
</svelte:head>

{#snippet b2bIcon(i: number, size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
		{:else if i === 1}
			<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
		{:else if i === 2}
			<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>
		{:else if i === 3}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
		{:else}
			<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
		{/if}
	</svg>
{/snippet}

<div class="page-wrap">
<!-- ─── HERO ─── -->
<section class="page-top reveal-card" use:reveal>
	<div class="top-glow" aria-hidden="true"></div>
	<div class="top-lines" aria-hidden="true"></div>
	<div class="container hero-grid">
		<div class="hero-copy">
			<span class="page-label"><span class="page-label-dot"></span>{i18n.t.b2b.label}</span>
			<h1>{i18n.t.b2b.heading}</h1>
			<p class="page-sub">{i18n.t.b2b.sub}</p>
			<div class="hero-btns">
				<a href={enquiryUrl('b2b')} class="btn-main">
					<span>{i18n.t.b2b.cta}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<a href="#usluge" class="btn-ghost">{i18n.t.ui.explore}</a>
			</div>
		</div>

		<!-- Hub-and-node network; nodes link to the services -->
		<div class="net" aria-hidden="true">
			<span class="net-ring r1"></span>
			<span class="net-ring r2"></span>
			<svg class="net-links" viewBox="0 0 100 100" preserveAspectRatio="none">
				{#each nodes as node, i}
					<line x1="50" y1="50" x2={node.x} y2={node.y} class:active={hovered === i} />
				{/each}
			</svg>
			<span class="net-hub">
				<span class="net-hub-pulse"></span>
				<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 7l3.5 3M18 7l-3.5 3M6 17l3.5-3M18 17l-3.5-3"/></svg>
			</span>
			{#each items as item, i (item.slug)}
				<a
					href="/b2b/{item.slug}"
					class="net-node"
					class:active={hovered === i}
					style="left:{nodes[i].x}%; top:{nodes[i].y}%"
					tabindex="-1"
					onmouseenter={() => (hovered = i)}
					onmouseleave={() => (hovered = -1)}
				>
					{@render b2bIcon(i, 20)}
					<span class="net-tip">{item.title}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ─── SERVICES ─── -->
<section class="page-body reveal-card" use:reveal id="usluge">
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		<div class="items-grid">
			{#each items as item, i (item.slug)}
				<a
					href="/b2b/{item.slug}"
					class="item-card"
					class:featured={i === 0}
					onmouseenter={() => (hovered = i)}
					onmouseleave={() => (hovered = -1)}
				>
					<span class="item-watermark" aria-hidden="true">{@render b2bIcon(i, 150)}</span>
					<span class="item-head">
						<span class="item-icon">{@render b2bIcon(i, 22)}</span>
						<span class="item-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					</span>
					<h2>{item.title}</h2>
					<p class="item-desc">{item.desc}</p>
					<ul class="item-highlights">
						{#each item.highlights as h}
							<li>
								<span class="item-check" aria-hidden="true">
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
								</span>
								{h}
							</li>
						{/each}
					</ul>
					<span class="item-foot">
						<span class="item-go">{i18n.t.ui.learnMore}</span>
						<span class="item-arrow" aria-hidden="true">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</span>
				</a>
			{/each}
		</div>

		<!-- Join call-to-action -->
		<div class="join-box">
			<div class="join-glow" aria-hidden="true"></div>
			<div class="join-copy">
				<span class="join-icon" aria-hidden="true">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></svg>
				</span>
				<div>
					<h2>{i18n.t.ui.joinB2b}</h2>
					<p>{i18n.t.ui.joinB2bDesc}</p>
				</div>
			</div>
			<div class="join-btns">
				<a href={enquiryUrl('b2b')} class="btn-main">
					<span>{i18n.t.b2b.cta}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<a href="/kontakt" class="btn-ghost">{i18n.t.ui.contactUs}</a>
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
		max-width: 54ch;
		margin-bottom: 2.25rem;
	}
	.hero-btns, .join-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }

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
	.btn-main:focus-visible, .btn-ghost:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	/* Network visual */
	.net {
		position: relative;
		display: none;
		width: min(100%, 440px);
		aspect-ratio: 1;
		margin: 0 auto;
	}
	.net-ring {
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid rgba(255,255,255,0.12);
		pointer-events: none;
	}
	.net-ring.r1 { width: 40%; height: 40%; }
	.net-ring.r2 { width: 76%; height: 76%; border-style: dashed; border-color: rgba(255,255,255,0.16); }
	.net-links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
	.net-links line {
		stroke: rgba(255,255,255,0.22);
		stroke-width: 1.2;
		stroke-dasharray: 4 5;
		vector-effect: non-scaling-stroke;
		transition: stroke 0.35s ease;
	}
	.net-links line.active { stroke: #f06a75; stroke-width: 2; animation: net-flow 0.9s linear infinite; }
	@keyframes net-flow { to { stroke-dashoffset: -18; } }
	.net-hub {
		position: absolute;
		top: 50%;
		left: 50%;
		display: grid;
		place-items: center;
		width: 88px;
		height: 88px;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 20px 40px -14px rgba(155,17,30,0.75), inset 0 1px 0 rgba(255,255,255,0.3), 0 0 0 10px rgba(255,255,255,0.06);
	}
	.net-hub-pulse {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		animation: net-pulse 2.6s cubic-bezier(0,0,0.2,1) infinite;
	}
	@keyframes net-pulse {
		0% { box-shadow: 0 0 0 0 rgba(240,106,117,0.45); }
		100% { box-shadow: 0 0 0 46px rgba(240,106,117,0); }
	}
	.net-node {
		position: absolute;
		display: grid;
		place-items: center;
		width: 58px;
		height: 58px;
		border-radius: 18px;
		transform: translate(-50%, -50%);
		color: #FAF9F6;
		text-decoration: none;
		background: linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.14), 0 14px 28px -14px rgba(0,0,0,0.6);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition: background 0.35s ease, color 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.net-node.active {
		color: var(--navy);
		background: #FAF9F6;
		transform: translate(-50%, -50%) scale(1.12);
	}
	.net-tip {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 50%;
		padding: 0.3rem 0.65rem;
		border-radius: 8px;
		font-size: 0.72rem;
		font-weight: 700;
		white-space: nowrap;
		color: var(--navy);
		background: #FAF9F6;
		box-shadow: 0 10px 20px -10px rgba(0,0,0,0.5);
		opacity: 0;
		transform: translate(-50%, -4px);
		transition: opacity 0.25s ease, transform 0.3s ease;
		pointer-events: none;
	}
	.net-node.active .net-tip { opacity: 1; transform: translate(-50%, 0); }

	/* ─── SERVICES ─── */
	.page-body {
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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 55%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 55%);
		pointer-events: none;
	}

	.items-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.4rem);
		margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
	}
	.item-card {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: clamp(1.5rem, 2.6vw, 2rem);
		border-radius: var(--radius-2xl);
		text-decoration: none;
		color: inherit;
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 14px 32px -18px rgba(15,23,42,0.18),
			inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.item-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.item-card:hover {
		transform: translateY(-6px);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 34px 60px -28px rgba(15,23,42,0.32),
			inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.item-card:hover::before { transform: scaleX(1); }
	.item-card:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; }

	.item-watermark {
		position: absolute;
		z-index: -1;
		right: -30px;
		bottom: -34px;
		color: rgba(11,52,102,0.045);
		transition: color 0.5s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
		pointer-events: none;
	}
	.item-card:hover .item-watermark { color: rgba(155,17,30,0.08); transform: rotate(-8deg) scale(1.06); }

	.item-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
	.item-icon {
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
	.item-card:hover .item-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
	}
	.item-num {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(11,52,102,0.35);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.item-card:hover .item-num { color: var(--cta); }
	.item-card h2 {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--navy);
		margin-bottom: 0.6rem;
	}
	.item-desc { font-size: 0.93rem; line-height: 1.65; color: #4a525e; margin-bottom: 1.25rem; }
	.item-highlights {
		list-style: none;
		display: grid;
		gap: 0.5rem;
		margin: 0 0 1.5rem;
		padding: 0;
		flex: 1;
	}
	.item-highlights li {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		font-size: 0.88rem;
		line-height: 1.45;
		color: var(--navy);
	}
	.item-check {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		margin-top: 0.05rem;
		border-radius: 50%;
		color: var(--success);
		background: rgba(63,143,116,0.12);
	}
	.item-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.item-go {
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--navy);
		transition: color 0.3s ease;
	}
	.item-card:hover .item-go { color: var(--cta); }
	.item-arrow {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.item-card:hover .item-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}

	/* Featured first service: dark */
	.item-card.featured { background: var(--surface-dark); box-shadow: var(--shadow-dark-raised); }
	.item-card.featured:hover {
		box-shadow: 0 40px 70px -26px rgba(8,20,45,0.65), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.item-card.featured .item-watermark { color: rgba(255,255,255,0.06); }
	.item-card.featured .item-icon {
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.item-card.featured:hover .item-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.item-card.featured .item-num { color: rgba(250,249,246,0.5); }
	.item-card.featured:hover .item-num { color: #f06a75; }
	.item-card.featured h2 { color: #FAF9F6; font-size: clamp(1.5rem, 2.6vw, 2rem); letter-spacing: -0.03em; }
	.item-card.featured .item-desc { color: rgba(250,249,246,0.8); font-size: 1rem; max-width: 52ch; }
	.item-card.featured .item-highlights li { color: #FAF9F6; }
	.item-card.featured .item-check { color: #7fd1b2; background: rgba(127,209,178,0.14); }
	.item-card.featured .item-foot { border-top-color: rgba(255,255,255,0.12); }
	.item-card.featured .item-go { color: #FAF9F6; }
	.item-card.featured .item-arrow { color: #FAF9F6; box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3); }
	.item-card.featured:focus-visible { outline-color: #FAF9F6; }

	/* Join box */
	.join-box {
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
	.join-glow {
		position: absolute;
		z-index: -1;
		right: -10%;
		top: -60%;
		width: 55%;
		height: 220%;
		background: radial-gradient(ellipse at center, rgba(196,42,56,0.35), transparent 65%);
		pointer-events: none;
	}
	.join-copy { display: flex; align-items: flex-start; gap: 1.1rem; }
	.join-copy > div { min-width: 0; }
	.join-copy h2 { overflow-wrap: break-word; hyphens: auto; }
	/* Phones: icon above the text so the heading gets the full width */
	@media (max-width: 479px) {
		.join-copy { flex-direction: column; gap: 0.9rem; }
	}
	.join-icon {
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
	.join-box h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		margin-bottom: 0.5rem;
	}
	.join-box p { font-size: 1rem; line-height: 1.6; color: rgba(250,249,246,0.78); max-width: 54ch; }

	/* ─── Responsive ─── */
	@media (min-width: 640px) {
		.items-grid { grid-template-columns: repeat(2, 1fr); }
		.item-card.featured { grid-column: 1 / -1; }
	}
	@media (min-width: 900px) {
		.join-box { flex-direction: row; align-items: center; justify-content: space-between; }
		.join-btns { flex-shrink: 0; }
	}
	@media (min-width: 1024px) {
		.hero-grid { grid-template-columns: 1.15fr 0.85fr; }
		.net { display: block; }
		.items-grid { grid-template-columns: repeat(3, 1fr); }
		.item-card.featured { grid-column: span 2; }
	}
	@media (prefers-reduced-motion: reduce) {
		.net-hub-pulse, .net-links line.active { animation: none; }
		.item-card, .item-card::before, .item-icon, .item-arrow, .item-watermark, .net-node, .btn-main, .btn-main-arrow { transition: none; }
		.item-card:hover, .item-card:hover .item-icon, .item-card:hover .item-arrow, .item-card:hover .item-watermark,
		.btn-main:hover, .btn-main:hover .btn-main-arrow { transform: none; }
		.net-node.active { transform: translate(-50%, -50%); }
	}
</style>

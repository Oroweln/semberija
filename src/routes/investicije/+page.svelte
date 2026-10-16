<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { investmentCategorySlugs } from '$lib/data';

	const categories = $derived(
		i18n.t.investments.categories.map((cat, i) => ({ ...cat, slug: investmentCategorySlugs[i] }))
	);
	let hovered = $state(-1);
</script>

<svelte:head>
	<title>{i18n.t.investments.heading} — Semberija.app</title>
</svelte:head>

{#snippet investIcon(slug: string, size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if slug === 'logistika'}
			<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
		{:else if slug === 'poljoprivreda'}
			<path d="M12 22V12"/><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z"/><path d="M12 15c0-4 3-7 8-7 0 4-3 7-8 7z"/>
		{:else if slug === 'proizvodnja'}
			<path d="M2 21h20"/><path d="M4 21V10l6 4V10l6 4V5h4v16"/>
		{:else if slug === 'skladista'}
			<path d="M3 21V8l9-5 9 5v13"/><path d="M7 21v-8h10v8"/><path d="M7 17h10"/>
		{:else if slug === 'nekretnine'}
			<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21v-3h2v3"/>
		{:else if slug === 'solarna-energija'}
			<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
		{:else if slug === 'autsorsing'}
			<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6.5 6.5 0 0 1 3.5 6"/>
		{:else}
			<path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/><path d="M14 4l-4 16"/>
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
			<span class="page-label"><span class="page-label-dot"></span>{i18n.t.investments.label}</span>
			<h1>{i18n.t.investments.heading}</h1>
			<p class="page-sub">{i18n.t.investments.sub}</p>
			<div class="hero-btns">
				<a href="#oblasti" class="btn-main">
					<span>{i18n.t.investments.cta}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
					</span>
				</a>
				<a href="/kontakt" class="btn-ghost">{i18n.t.ui.contactUs}</a>
			</div>
		</div>

		<!-- Glass board of the investment areas; tiles link to each area -->
		<div class="board">
			<div class="board-head" aria-hidden="true">
				<span class="board-dot"></span>
				<span class="board-title">{i18n.t.investments.detailTag}</span>
				<span class="board-count">{String(categories.length).padStart(2, '0')}</span>
			</div>
			<div class="board-grid">
				{#each categories as cat, i (cat.slug)}
					<a
						href="/investicije/{cat.slug}"
						class="board-tile"
						class:active={hovered === i}
						onmouseenter={() => (hovered = i)}
						onmouseleave={() => (hovered = -1)}
						onfocus={() => (hovered = i)}
						onblur={() => (hovered = -1)}
					>
						<span class="board-icon">{@render investIcon(cat.slug, 20)}</span>
						<span class="board-name">{cat.name}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ─── AREAS ─── -->
<section class="page-body reveal-card" use:reveal id="oblasti">
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		<div class="results-head">
			<span class="results-count">
				<strong>{categories.length}</strong>
				{i18n.t.investments.label}
			</span>
			<span class="results-line" aria-hidden="true"></span>
		</div>

		<div class="cards-grid">
			{#each categories as cat, i (cat.slug)}
				<a
					href="/investicije/{cat.slug}"
					class="inv-card"
					class:featured={i === 0}
					class:linked={hovered === i}
					onmouseenter={() => (hovered = i)}
					onmouseleave={() => (hovered = -1)}
				>
					<span class="inv-watermark" aria-hidden="true">{@render investIcon(cat.slug, 150)}</span>
					<span class="inv-head">
						<span class="inv-icon">{@render investIcon(cat.slug, 22)}</span>
						<span class="inv-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					</span>
					<h2>{cat.name}</h2>
					<p class="inv-desc">{cat.desc}</p>
					<ul class="inv-highlights">
						{#each cat.highlights as h}
							<li>
								<span class="inv-check" aria-hidden="true">
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
								</span>
								{h}
							</li>
						{/each}
					</ul>
					<span class="inv-foot">
						<span class="inv-go">{i18n.t.ui.learnMore}</span>
						<span class="inv-arrow" aria-hidden="true">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</span>
				</a>
			{/each}
		</div>

		<!-- Projects coming soon -->
		<div class="soon-box">
			<div class="soon-glow" aria-hidden="true"></div>
			<div class="soon-copy">
				<span class="soon-icon" aria-hidden="true">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>
				</span>
				<div>
					<h2>{i18n.t.ui.investSoon}</h2>
					<p>{i18n.t.ui.investSoonDesc}</p>
				</div>
			</div>
			<div class="soon-btns">
				<a href="/kontakt" class="btn-main">
					<span>{i18n.t.ui.contactUs}</span>
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
	.hero-btns, .soon-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }

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
	.btn-main:hover .btn-main-arrow { transform: translateY(2px); }
	.soon-btns .btn-main:hover .btn-main-arrow { transform: rotate(45deg); }
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

	/* Glass board */
	.board {
		padding: 1.1rem;
		border-radius: 26px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.2),
			inset 0 0 0 1px rgba(255,255,255,0.12),
			0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}
	.board-head {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.3rem 0.4rem 1rem;
	}
	.board-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #7fd1b2;
		box-shadow: 0 0 0 3px rgba(127,209,178,0.2);
	}
	.board-title {
		flex: 1;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.7);
	}
	.board-count {
		font-family: var(--font-heading);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: rgba(250,249,246,0.5);
	}
	.board-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}
	.board-tile {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		min-width: 0;
		padding: 0.7rem 0.8rem;
		border-radius: 14px;
		text-decoration: none;
		color: #FAF9F6;
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
		transition: background 0.3s ease, color 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.board-tile.active {
		color: var(--navy);
		background: #FAF9F6;
		transform: translateY(-2px);
	}
	.board-tile:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }
	.board-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 11px;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		transition: background 0.3s ease;
	}
	.board-tile.active .board-icon { background: linear-gradient(150deg, #c42a38, var(--cta)); }
	.board-name {
		font-size: 0.88rem;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* ─── AREAS ─── */
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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 50%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 50%);
		pointer-events: none;
	}
	.results-head {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-bottom: 1.75rem;
	}
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
		font-variant-numeric: tabular-nums;
	}
	.results-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(11,52,102,0.18), transparent); }

	.cards-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.4rem);
		margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
	}
	.inv-card {
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
	.inv-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.inv-card:hover, .inv-card.linked {
		transform: translateY(-6px);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 34px 60px -28px rgba(15,23,42,0.32),
			inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.inv-card:hover::before, .inv-card.linked::before { transform: scaleX(1); }
	.inv-card:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; }

	.inv-watermark {
		position: absolute;
		z-index: -1;
		right: -30px;
		bottom: -34px;
		color: rgba(11,52,102,0.045);
		transition: color 0.5s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
		pointer-events: none;
	}
	.inv-card:hover .inv-watermark { color: rgba(155,17,30,0.08); transform: rotate(-8deg) scale(1.06); }

	.inv-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
	.inv-icon {
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
	.inv-card:hover .inv-icon, .inv-card.linked .inv-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
	}
	.inv-num {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(11,52,102,0.35);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.inv-card:hover .inv-num { color: var(--cta); }
	.inv-card h2 {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--navy);
		margin-bottom: 0.6rem;
	}
	.inv-desc { font-size: 0.93rem; line-height: 1.65; color: #4a525e; margin-bottom: 1.25rem; }
	.inv-highlights {
		list-style: none;
		display: grid;
		gap: 0.5rem;
		margin: 0 0 1.5rem;
		padding: 0;
		flex: 1;
	}
	.inv-highlights li {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		font-size: 0.88rem;
		line-height: 1.45;
		color: var(--navy);
	}
	.inv-check {
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
	.inv-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.inv-go {
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--navy);
		transition: color 0.3s ease;
	}
	.inv-card:hover .inv-go { color: var(--cta); }
	.inv-arrow {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.inv-card:hover .inv-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}

	/* Featured first area: dark */
	.inv-card.featured { background: var(--surface-dark); box-shadow: var(--shadow-dark-raised); }
	.inv-card.featured:hover, .inv-card.featured.linked {
		box-shadow: 0 40px 70px -26px rgba(8,20,45,0.65), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.inv-card.featured .inv-watermark { color: rgba(255,255,255,0.06); }
	.inv-card.featured .inv-icon {
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.inv-card.featured:hover .inv-icon, .inv-card.featured.linked .inv-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.inv-card.featured .inv-num { color: rgba(250,249,246,0.5); }
	.inv-card.featured:hover .inv-num { color: #f06a75; }
	.inv-card.featured h2 { color: #FAF9F6; font-size: clamp(1.5rem, 2.6vw, 2rem); letter-spacing: -0.03em; }
	.inv-card.featured .inv-desc { color: rgba(250,249,246,0.8); font-size: 1rem; max-width: 56ch; }
	.inv-card.featured .inv-highlights li { color: #FAF9F6; }
	.inv-card.featured .inv-check { color: #7fd1b2; background: rgba(127,209,178,0.14); }
	.inv-card.featured .inv-foot { border-top-color: rgba(255,255,255,0.12); }
	.inv-card.featured .inv-go { color: #FAF9F6; }
	.inv-card.featured .inv-arrow { color: #FAF9F6; box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3); }
	.inv-card.featured:focus-visible { outline-color: #FAF9F6; }

	/* Coming soon band */
	.soon-box {
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
	.soon-glow {
		position: absolute;
		z-index: -1;
		right: -10%;
		top: -60%;
		width: 55%;
		height: 220%;
		background: radial-gradient(ellipse at center, rgba(196,42,56,0.35), transparent 65%);
		pointer-events: none;
	}
	.soon-copy { display: flex; align-items: flex-start; gap: 1.1rem; }
	.soon-icon {
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
	.soon-box h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		margin-bottom: 0.5rem;
	}
	.soon-box p { font-size: 1rem; line-height: 1.6; color: rgba(250,249,246,0.78); max-width: 60ch; }

	/* ─── Responsive ─── */
	@media (min-width: 640px) {
		.cards-grid { grid-template-columns: repeat(2, 1fr); }
		.inv-card.featured { grid-column: 1 / -1; }
		.board-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 640px) and (max-width: 1023px) {
		/* 1 wide + 7 cards: let the last one span so the grid ends evenly */
		.inv-card:last-child { grid-column: 1 / -1; }
	}
	@media (min-width: 900px) {
		.soon-box { flex-direction: row; align-items: center; justify-content: space-between; }
		.soon-btns { flex-shrink: 0; }
	}
	@media (min-width: 1024px) {
		.hero-grid { grid-template-columns: 1.1fr 0.9fr; }
		.cards-grid { grid-template-columns: repeat(3, 1fr); }
		.inv-card.featured { grid-column: span 2; }
	}
	@media (prefers-reduced-motion: reduce) {
		.inv-card, .inv-card::before, .inv-icon, .inv-arrow, .inv-watermark, .board-tile, .btn-main, .btn-main-arrow { transition: none; }
		.inv-card:hover, .inv-card.linked, .inv-card:hover .inv-icon, .inv-card.linked .inv-icon, .inv-card:hover .inv-arrow,
		.inv-card:hover .inv-watermark, .board-tile.active, .btn-main:hover, .btn-main:hover .btn-main-arrow { transform: none; }
	}
</style>

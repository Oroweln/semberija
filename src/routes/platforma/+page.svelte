<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { platformModules } from '$lib/platform';
	import HowItWorks from '$lib/components/HowItWorks.svelte';

	const p = $derived(i18n.t.platform);
	// Module highlighted in the hero board; board tiles and module cards share it
	let hovered = $state(-1);
</script>

<svelte:head>
	<title>{i18n.t.seo.platformTitle}</title>
	<meta property="og:title" content={i18n.t.seo.platformTitle} />
	<meta name="description" content={p.desc} />
</svelte:head>

{#snippet modIcon(id: string, size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if id === 'directory'}
			<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10h1M14 10h1M9 14h1M14 14h1M10 21v-3h4v3"/>
		{:else if id === 'b2b'}
			<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
		{:else if id === 'investments'}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
		{:else if id === 'international'}
			<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
		{:else if id === 'enquiries'}
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>
		{:else if id === 'promotion'}
			<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 6a8 8 0 0 1 0 12"/>
		{:else if id === 'services'}
			<path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/><path d="M14 4l-4 16"/>
		{:else if id === 'funding'}
			<path d="M12 2v4"/><circle cx="12" cy="13" r="8"/><path d="M14.5 10.5c-.5-.9-1.4-1.5-2.5-1.5-1.4 0-2.5.9-2.5 2s1.1 1.7 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2c-1.1 0-2-.6-2.5-1.5"/><path d="M12 8v1M12 17v1"/>
		{:else}
			<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>
		{/if}
	</svg>
{/snippet}

{#snippet benefitIcon(i: number)}
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M6 16c.6-1.6 1.8-2.5 3-2.5s2.4.9 3 2.5"/><path d="M14 9h4M14 13h4"/>
		{:else if i === 1}
			<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>
		{:else if i === 2}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
		{:else if i === 3}
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>
		{:else if i === 4}
			<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
		{:else}
			<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M10 9l-2 2 2 2M14 9l2 2-2 2"/>
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
				<span class="page-label"><span class="page-label-dot"></span>{p.label}</span>
				<h1>{#each p.heading.split(/(?<=\.)\s+/) as line, li}{#if li}<br />{/if}{line}{/each}</h1>
				<p class="page-sub">{p.desc}</p>
				<div class="hero-btns">
					<a href="/kontakt?tip=registracija" class="btn-main">
						<span>{i18n.t.nav.listCta}</span>
						<span class="btn-main-arrow" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
					<a href="#moduli" class="btn-ghost">{p.modulesHeading}</a>
				</div>
			</div>

			<!-- Board of the platform modules -->
			<div class="board">
				<div class="board-head" aria-hidden="true">
					<span class="board-dot"></span>
					<span class="board-title">Semberija.app</span>
					<span class="board-count">{String(p.modules.length).padStart(2, '0')}</span>
				</div>
				<div class="board-grid">
					{#each p.modules as mod, i}
						{@const meta = platformModules[i]}
						<a
							href={meta.href}
							class="board-tile"
							class:active={hovered === i}
							class:dev={!!meta.status}
							onmouseenter={() => (hovered = i)}
							onmouseleave={() => (hovered = -1)}
							onfocus={() => (hovered = i)}
							onblur={() => (hovered = -1)}
						>
							<span class="board-icon">{@render modIcon(meta.id, 18)}</span>
							<span class="board-name">{mod.title}</span>
							{#if meta.status}<span class="board-status" aria-hidden="true"></span>{/if}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ─── MODULES ─── -->
	<section id="moduli" class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container">
			<div class="results-head">
				<span class="results-count">
					<strong>{p.modules.length}</strong>
					{p.modulesHeading}
				</span>
				<span class="results-line" aria-hidden="true"></span>
			</div>
			<div class="modules-grid">
				{#each p.modules as mod, i}
					{@const meta = platformModules[i]}
					<a
						href={meta.href}
						class="module"
						class:featured={i === 0}
						class:linked={hovered === i}
						onmouseenter={() => (hovered = i)}
						onmouseleave={() => (hovered = -1)}
					>
						<span class="module-watermark" aria-hidden="true">{@render modIcon(meta.id, 150)}</span>
						<span class="module-head">
							<span class="module-icon">{@render modIcon(meta.id, 22)}</span>
							{#if meta.status}
								<span class="module-status">
									<span class="module-status-dot"></span>
									{meta.status === 'dev' ? p.statusDev : p.statusSoon}
								</span>
							{:else}
								<span class="module-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
							{/if}
						</span>
						<h3>{mod.title}</h3>
						<p class="module-desc">{mod.desc}</p>
						<p class="module-detail">{mod.detail}</p>
						<span class="module-foot">
							<span class="module-go">{mod.cta}</span>
							<span class="module-arrow" aria-hidden="true">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- ─── HOW IT WORKS (shared with the homepage) ─── -->
	<section class="page-dark reveal-card" use:reveal>
		<div class="top-glow" aria-hidden="true"></div>
		<div class="top-lines" aria-hidden="true"></div>
		<div class="container">
			<HowItWorks theme="dark" />
		</div>
	</section>

	<!-- ─── REGISTRATION BENEFITS ─── -->
	<section class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container">
			<div class="section-head">
				<span class="section-kicker">{p.benefitsLabel}</span>
				<h2>{p.benefitsHeading}</h2>
				<p>{p.benefitsDesc}</p>
			</div>
			<ul class="benefits">
				{#each p.benefits as b, i}
					<li class="benefit">
						<span class="benefit-icon">{@render benefitIcon(i)}</span>
						<div>
							<h3>{b.title}</h3>
							<p>{b.desc}</p>
						</div>
					</li>
				{/each}
			</ul>

			<!-- Join band -->
			<div class="join">
				<div class="join-glow" aria-hidden="true"></div>
				<div class="join-copy">
					<span class="join-icon" aria-hidden="true">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M12 9v6M9 12h6"/></svg>
					</span>
					<div>
						<h2>{p.joinHeading}</h2>
						<p>{p.joinDesc}</p>
					</div>
				</div>
				<a href="/kontakt?tip=registracija" class="btn-main">
					<span>{i18n.t.nav.listCta}</span>
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

	/* ─── HERO / DARK SECTIONS ─── */
	.page-top, .page-dark {
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
		max-width: 54ch;
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

	/* Module board */
	.board {
		padding: 1.1rem;
		border-radius: 26px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}
	.board-head { display: flex; align-items: center; gap: 0.6rem; padding: 0.3rem 0.4rem 1rem; }
	.board-dot { width: 7px; height: 7px; border-radius: 50%; background: #7fd1b2; box-shadow: 0 0 0 3px rgba(127,209,178,0.2); }
	.board-title {
		flex: 1;
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.75rem;
		color: rgba(250,249,246,0.7);
	}
	.board-count {
		font-family: var(--font-heading);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: rgba(250,249,246,0.5);
	}
	.board-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
	.board-tile:last-child:nth-child(odd) { grid-column: 1 / -1; }
	.board-tile {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		min-width: 0;
		padding: 0.65rem 0.75rem;
		border-radius: 14px;
		text-decoration: none;
		color: #FAF9F6;
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
		transition: background 0.3s ease, color 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.board-tile.active { color: var(--navy); background: #FAF9F6; transform: translateY(-2px); }
	.board-tile:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }
	.board-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border-radius: 10px;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		transition: background 0.3s ease;
	}
	.board-tile.active .board-icon { background: linear-gradient(150deg, #c42a38, var(--cta)); }
	.board-name { font-size: 0.84rem; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.board-status {
		position: absolute;
		top: 8px;
		right: 8px;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f2c14e;
		box-shadow: 0 0 0 3px rgba(242,193,78,0.22);
	}

	/* ─── LIGHT SECTIONS ─── */
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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 45%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 45%);
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

	/* Module cards */
	.modules-grid { display: grid; grid-template-columns: 1fr; gap: clamp(1rem, 2vw, 1.4rem); }
	.module {
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
	.module::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.module:hover, .module.linked {
		transform: translateY(-6px);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 34px 60px -28px rgba(15,23,42,0.32), inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.module:hover::before, .module.linked::before { transform: scaleX(1); }
	.module:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; }
	.module-watermark {
		position: absolute;
		z-index: -1;
		right: -30px;
		bottom: -34px;
		color: rgba(11,52,102,0.045);
		transition: color 0.5s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
		pointer-events: none;
	}
	.module:hover .module-watermark { color: rgba(155,17,30,0.08); transform: rotate(-8deg) scale(1.06); }
	.module-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1.4rem; }
	.module-icon {
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
	.module:hover .module-icon, .module.linked .module-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
	}
	.module-num {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(11,52,102,0.35);
		transition: color 0.35s ease;
	}
	.module:hover .module-num { color: var(--cta); }
	.module-status {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.28rem 0.7rem;
		border-radius: 50px;
		font-size: 0.66rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		white-space: nowrap;
		color: #9a6b00;
		background: rgba(242,193,78,0.16);
		box-shadow: inset 0 0 0 1px rgba(242,193,78,0.45);
	}
	.module-status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
	.module h3 {
		font-family: var(--font-heading);
		font-size: 1.22rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.2;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}
	.module-desc { font-size: 0.95rem; line-height: 1.6; color: var(--navy); margin-bottom: 0.75rem; }
	.module-detail {
		flex: 1;
		font-size: 0.87rem;
		line-height: 1.65;
		color: #6b7380;
		margin-bottom: 1.4rem;
		padding-left: 0.85rem;
		border-left: 2px solid rgba(155,17,30,0.25);
	}
	.module-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.module-go {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--navy);
		transition: color 0.3s ease;
	}
	.module:hover .module-go { color: var(--cta); }
	.module-arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.module:hover .module-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}

	/* Featured first module: dark */
	.module.featured { background: var(--surface-dark); box-shadow: var(--shadow-dark-raised); }
	.module.featured:hover, .module.featured.linked {
		box-shadow: 0 40px 70px -26px rgba(8,20,45,0.65), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.module.featured .module-watermark { color: rgba(255,255,255,0.06); }
	.module.featured .module-icon {
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.module.featured:hover .module-icon, .module.featured.linked .module-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.module.featured .module-num { color: rgba(250,249,246,0.5); }
	.module.featured h3 { color: #FAF9F6; font-size: clamp(1.5rem, 2.6vw, 2rem); letter-spacing: -0.03em; }
	.module.featured .module-desc { color: #FAF9F6; font-size: 1.02rem; }
	.module.featured .module-detail { color: rgba(250,249,246,0.75); border-left-color: rgba(240,106,117,0.6); max-width: 60ch; }
	.module.featured .module-foot { border-top-color: rgba(255,255,255,0.12); }
	.module.featured .module-go { color: #FAF9F6; }
	.module.featured .module-arrow { color: #FAF9F6; box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3); }
	.module.featured:focus-visible { outline-color: #FAF9F6; }

	/* Benefits */
	.section-head { max-width: 640px; margin-bottom: 2rem; }
	.section-kicker {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #6b7380;
	}
	.section-kicker::before { content: ''; width: 18px; height: 2px; border-radius: 2px; background: var(--accent-line); }
	.section-head h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.8rem, 3.6vw, 2.6rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		color: var(--navy);
		margin-bottom: 0.75rem;
		text-wrap: balance;
	}
	.section-head p { font-size: 1.02rem; line-height: 1.65; color: #4a525e; }
	.benefits {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(0.85rem, 2vw, 1.1rem);
		margin: 0 0 clamp(2.5rem, 5vw, 3.5rem);
		padding: 0;
	}
	.benefit {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.25rem 1.3rem;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 12px 28px -20px rgba(15,23,42,0.25), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
	}
	.benefit:hover { transform: translateY(-3px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 22px 40px -22px rgba(15,23,42,0.32), inset 0 0 0 1px rgba(155,17,30,0.2); }
	.benefit-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border-radius: 13px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		transition: background 0.35s ease;
	}
	.benefit:hover .benefit-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.benefit h3 {
		font-family: var(--font-heading);
		font-size: 1.02rem;
		font-weight: 800;
		letter-spacing: -0.015em;
		color: var(--navy);
		margin-bottom: 0.25rem;
	}
	.benefit p { font-size: 0.88rem; line-height: 1.55; color: #4a525e; }

	/* Join band */
	.join {
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
	.join h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		margin-bottom: 0.5rem;
	}
	.join p { font-size: 1rem; line-height: 1.6; color: rgba(250,249,246,0.78); max-width: 54ch; }
	.join .btn-main { align-self: flex-start; }

	/* ─── Responsive ─── */
	@media (min-width: 640px) {
		.modules-grid, .benefits { grid-template-columns: repeat(2, 1fr); }
		.module.featured { grid-column: 1 / -1; }
	}
	@media (min-width: 900px) {
		.join { flex-direction: row; align-items: center; justify-content: space-between; }
		.join .btn-main { align-self: center; }
	}
	@media (min-width: 1024px) {
		.hero-grid { grid-template-columns: 1.1fr 0.9fr; }
		.modules-grid, .benefits { grid-template-columns: repeat(3, 1fr); }
		/* 9 modules: a clean 3 × 3 grid, the featured card keeps its dark style without spanning */
		.module.featured { grid-column: auto; }
	}
	@media (prefers-reduced-motion: reduce) {
		.btn-main, .btn-main-arrow, .board-tile, .module, .module::before, .module-icon, .module-arrow, .module-watermark, .benefit { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .board-tile.active, .module:hover, .module.linked, .module:hover .module-icon,
		.module.linked .module-icon, .module:hover .module-arrow, .module:hover .module-watermark, .benefit:hover { transform: none; }
	}
</style>

<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';

	// Editorial About page: numbered chapters with a table of contents, founder within the narrative, no photos.
	const a = $derived(i18n.t.aboutPage);

	const chapters = $derived([
		{ id: 'platforma', label: a.platform.label },
		{ id: 'vizija', label: a.vision.label },
		{ id: 'ponuda', label: a.offer.heading },
		{ id: 'osnivac', label: a.founder.label },
		{ id: 'zoe-milano', label: a.zoe.label },
		{ id: 'buducnost', label: a.future.label }
	]);
</script>

<svelte:head>
	<title>{i18n.t.seo.aboutTitle}</title>
	<meta property="og:title" content={i18n.t.seo.aboutTitle} />
	<meta name="description" content={a.intro[0]} />
</svelte:head>

{#snippet offerIcon(i: number)}
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10h1M14 10h1M9 14h1M14 14h1M10 21v-3h4v3"/>
		{:else if i === 1}
			<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
		{:else if i === 2}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
		{:else if i === 3}
			<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
		{:else}
			<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 6a8 8 0 0 1 0 12"/>
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
				<span class="page-label"><span class="page-label-dot"></span>{a.label}</span>
				<h1>{a.heading}</h1>
				<div class="intro">
					{#each a.intro as paragraph}
						<p>{paragraph}</p>
					{/each}
				</div>
				<span class="hero-places" aria-hidden="true">
					<span class="hero-places-dot"></span>
					{a.founder.places}
				</span>
			</div>

			<!-- Table of contents -->
			<nav class="toc" aria-label={a.label}>
				{#each chapters as ch, i (ch.id)}
					<a href="#{ch.id}" class="toc-item">
						<span class="toc-num">{String(i + 1).padStart(2, '0')}</span>
						<span class="toc-label">{ch.label}</span>
						<svg class="toc-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
					</a>
				{/each}
			</nav>
		</div>
	</section>

	<!-- ─── 01–03 ─── -->
	<section class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container">
			<article class="chapter" id="platforma">
				<header class="chapter-head">
					<span class="chapter-num" aria-hidden="true">01</span>
					<span class="chapter-label">{a.platform.label}</span>
					<h2>{#each a.platform.heading.split(/(?<=\.)\s+/) as line, li}{#if li}<br />{/if}{line}{/each}</h2>
				</header>
				<div class="chapter-body">
					{#each a.platform.body as paragraph}<p>{paragraph}</p>{/each}
				</div>
			</article>

			<article class="chapter" id="vizija">
				<header class="chapter-head">
					<span class="chapter-num" aria-hidden="true">02</span>
					<span class="chapter-label">{a.vision.label}</span>
					<h2>{a.vision.heading}</h2>
				</header>
				<div class="chapter-body">
					{#each a.vision.body as paragraph}<p>{paragraph}</p>{/each}
				</div>
			</article>

			<article class="chapter" id="ponuda">
				<header class="chapter-head">
					<span class="chapter-num" aria-hidden="true">03</span>
					<span class="chapter-label">{a.offer.label}</span>
					<h2>{a.offer.heading}</h2>
				</header>
				<div class="chapter-body">
					<ol class="offer-list">
						{#each a.offer.items as item, i}
							<li>
								<span class="offer-icon">{@render offerIcon(i)}</span>
								<span class="offer-text">{item}</span>
								<span class="offer-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
							</li>
						{/each}
					</ol>
					<p class="closing">{a.offer.closing}</p>
				</div>
			</article>
		</div>
	</section>

	<!-- ─── 04 FOUNDER ─── -->
	<section class="page-dark reveal-card" use:reveal id="osnivac">
		<div class="top-glow" aria-hidden="true"></div>
		<div class="top-lines" aria-hidden="true"></div>
		<div class="container">
			<article class="chapter dark">
				<header class="chapter-head">
					<span class="chapter-num" aria-hidden="true">04</span>
					<span class="chapter-label">{a.founder.label}</span>
					<h2>{a.founder.name}</h2>
					<p class="founder-role">
						{#each a.founder.role.split('|') as part}<span>{part.trim()}</span>{/each}
					</p>
					<p class="founder-places">
						{#each a.founder.places.split('·') as place}<span>{place.trim()}</span>{/each}
					</p>
				</header>
				<div class="chapter-body">
					{#each a.founder.body as paragraph}<p>{paragraph}</p>{/each}
				</div>
			</article>

			<figure class="quote">
				<figcaption class="quote-label">{a.founder.quoteLabel}</figcaption>
				<span class="quote-mark" aria-hidden="true">“</span>
				<blockquote>{a.founder.quote}</blockquote>
				<p class="quote-by">
					<span class="quote-avatar" aria-hidden="true">{a.founder.name.split(' ').map((w) => w[0]).join('')}</span>
					<span>
						<strong>{a.founder.name}</strong>
						<small>{a.founder.quoteRole}</small>
					</span>
				</p>
			</figure>
		</div>
	</section>

	<!-- ─── 05–06 ─── -->
	<section class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container">
			<article class="chapter" id="zoe-milano">
				<header class="chapter-head">
					<span class="chapter-num" aria-hidden="true">05</span>
					<span class="chapter-label">{a.zoe.label}</span>
					<h2>{a.zoe.heading}</h2>
				</header>
				<div class="chapter-body">
					{#each a.zoe.body as paragraph}<p>{paragraph}</p>{/each}
					<dl class="credits">
						{#each a.zoe.credits as credit}
							<div>
								<dt>{credit.label}</dt>
								<dd>{credit.value}</dd>
							</div>
						{/each}
					</dl>
					<a class="zoe-link" href="https://zoemilano.com/" target="_blank" rel="noopener">
						<span>{a.zoe.cta}</span>
						<span class="zoe-arrow" aria-hidden="true">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
				</div>
			</article>

			<article class="chapter" id="buducnost">
				<header class="chapter-head">
					<span class="chapter-num" aria-hidden="true">06</span>
					<span class="chapter-label">{a.future.label}</span>
					<h2>{a.future.heading}</h2>
				</header>
				<div class="chapter-body">
					{#each a.future.body as paragraph}<p>{paragraph}</p>{/each}
					<p class="closing big">{a.future.closing}</p>
				</div>
			</article>

			<!-- Final call-to-action -->
			<div class="cta">
				<div class="cta-glow" aria-hidden="true"></div>
				<div class="cta-copy">
					<h2>{a.cta.heading}</h2>
					<p>{a.cta.desc}</p>
				</div>
				<div class="cta-btns">
					<a href="/kontakt?tip=registracija" class="btn-main">
						<span>{i18n.t.nav.listCta}</span>
						<span class="btn-main-arrow" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
					<a href="/oglasi" class="btn-ghost">{i18n.t.joinCta.promote}</a>
					<a href="/kontakt" class="btn-ghost">{a.cta.contact}</a>
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

	/* ─── DARK SECTIONS ─── */
	.page-top, .page-dark {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		scroll-margin-top: calc(var(--nav-h) + 1rem);
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
		font-size: clamp(2.3rem, 5.4vw, 4rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		/* Room for descenders: gradient text is clipped to the line box */
		line-height: 1.1;
		padding-bottom: 0.08em;
		text-wrap: balance;
		margin-bottom: 1.25rem;
		background: linear-gradient(180deg, #ffffff 30%, #c9d4e4 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.intro { display: grid; gap: 0.9rem; max-width: 58ch; margin-bottom: 1.75rem; }
	.intro p { font-size: 1.1rem; line-height: 1.7; color: rgba(250,249,246,0.82); }
	.intro p:first-child { font-size: 1.2rem; color: #FAF9F6; }
	.hero-places {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.45rem 0.95rem;
		border-radius: 50px;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.8);
		background: rgba(255,255,255,0.06);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
	}
	.hero-places-dot { width: 6px; height: 6px; border-radius: 50%; background: #f06a75; }

	/* Table of contents */
	.toc {
		display: flex;
		flex-direction: column;
		padding: 0.6rem;
		border-radius: 26px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}
	.toc-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.85rem 0.9rem;
		border-radius: 16px;
		text-decoration: none;
		color: #FAF9F6;
		transition: background 0.3s ease, color 0.3s ease;
	}
	.toc-item + .toc-item { box-shadow: inset 0 1px 0 rgba(255,255,255,0.07); }
	.toc-item:hover { color: var(--navy); background: #FAF9F6; box-shadow: none; }
	.toc-item:hover + .toc-item { box-shadow: none; }
	.toc-item:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }
	.toc-num { font-family: var(--font-heading); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.14em; color: #f06a75; }
	.toc-item:hover .toc-num { color: var(--cta); }
	.toc-label { flex: 1; font-size: 0.98rem; font-weight: 700; }
	.toc-arrow { opacity: 0.4; transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1); }
	.toc-item:hover .toc-arrow { opacity: 1; transform: translateY(2px); }

	/* ─── LIGHT SECTIONS ─── */
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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 40%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 40%);
		pointer-events: none;
	}

	/* Chapters: number + heading on the left, text on the right */
	.chapter {
		scroll-margin-top: calc(var(--nav-h) + 1.5rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem 3rem;
		padding: clamp(2rem, 4vw, 3rem) 0;
	}
	.chapter + .chapter { border-top: 1px solid rgba(15,23,42,0.08); }
	.chapter:first-child { padding-top: 0; }
	.chapter-head { position: relative; }
	.chapter-num {
		display: block;
		font-family: var(--font-heading);
		font-size: clamp(3.2rem, 6vw, 4.6rem);
		font-weight: 800;
		letter-spacing: -0.05em;
		line-height: 0.9;
		color: transparent;
		-webkit-text-stroke: 1.5px rgba(11,52,102,0.22);
		margin-bottom: 0.9rem;
	}
	.chapter-label {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.7rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--cta);
	}
	.chapter-label::before { content: ''; width: 18px; height: 2px; border-radius: 2px; background: var(--accent-line); }
	.chapter-head h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.7rem, 3.2vw, 2.4rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		color: var(--navy);
		text-wrap: balance;
	}
	.chapter-body { display: grid; gap: 1rem; align-content: start; }
	.chapter-body p { font-size: 1.05rem; line-height: 1.75; color: #3d4450; max-width: 62ch; }

	.offer-list { list-style: none; display: grid; gap: 0.6rem; margin: 0; padding: 0; }
	.offer-list li {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.9rem 1rem;
		border-radius: 18px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 12px 26px -20px rgba(15,23,42,0.25), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
	}
	.offer-list li:hover { transform: translateX(4px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 18px 32px -18px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(155,17,30,0.2); }
	.offer-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		border-radius: 13px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		transition: background 0.35s ease;
	}
	.offer-list li:hover .offer-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.offer-text { flex: 1; font-size: 1rem; font-weight: 700; color: var(--navy); }
	.offer-num { font-family: var(--font-heading); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.18em; color: rgba(11,52,102,0.3); }

	.closing {
		padding-left: 1rem;
		border-left: 3px solid var(--cta);
		font-weight: 600;
		color: var(--navy) !important;
	}
	.closing.big {
		margin-top: 0.5rem;
		padding: 0;
		border: 0;
		font-family: var(--font-heading);
		font-size: clamp(1.8rem, 4vw, 2.8rem) !important;
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.15;
		background: linear-gradient(90deg, var(--navy), var(--cta));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		padding-bottom: 0.08em;
	}

	/* Founder (dark) */
	.chapter.dark { padding-top: 0; }
	.chapter.dark .chapter-num { -webkit-text-stroke-color: rgba(255,255,255,0.25); }
	.chapter.dark .chapter-label { color: #f06a75; }
	.chapter.dark .chapter-label::before { background: linear-gradient(90deg, #e0414f, #f06a75); }
	.chapter.dark .chapter-head h2 { color: #FAF9F6; }
	.chapter.dark .chapter-body p { color: rgba(250,249,246,0.82); }
	.founder-role { display: flex; flex-direction: column; gap: 0.2rem; margin-top: 0.75rem; }
	.founder-role span { font-size: 0.92rem; color: rgba(250,249,246,0.75); }
	.founder-role span:first-child { font-weight: 700; color: #FAF9F6; }
	.founder-places { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem; }
	.founder-places span {
		padding: 0.3rem 0.75rem;
		border-radius: 50px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #FAF9F6;
		background: rgba(255,255,255,0.08);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
	}

	.quote {
		position: relative;
		margin: clamp(2rem, 4vw, 3rem) 0 0;
		padding: clamp(1.75rem, 4vw, 2.75rem);
		border-radius: 26px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.6);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		overflow: hidden;
	}
	.quote-mark {
		position: absolute;
		top: -2.5rem;
		right: 1.5rem;
		font-family: Georgia, serif;
		font-size: 12rem;
		line-height: 1;
		color: rgba(240,106,117,0.18);
		pointer-events: none;
	}
	.quote-label { position: relative; margin-bottom: 1rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #f06a75; }
	.quote blockquote {
		position: relative;
		margin: 0 0 1.75rem;
		font-family: var(--font-heading);
		font-size: clamp(1.25rem, 2.4vw, 1.7rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1.45;
		color: #FAF9F6;
		max-width: 60ch;
	}
	.quote-by { position: relative; display: flex; align-items: center; gap: 0.85rem; }
	.quote-avatar {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		font-family: var(--font-heading);
		font-weight: 800;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 12px 24px -10px rgba(155,17,30,0.7);
	}
	.quote-by > span:last-child { display: flex; flex-direction: column; }
	.quote-by strong { color: #FAF9F6; }
	.quote-by small { font-size: 0.85rem; color: rgba(250,249,246,0.65); }

	/* ZOE MILANO */
	.credits { display: grid; grid-template-columns: 1fr; gap: 0.6rem; margin: 0.5rem 0 0.75rem; }
	.credits div {
		padding: 1rem 1.1rem;
		border-radius: 16px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.credits dt { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #6b7380; margin-bottom: 0.25rem; }
	.credits dd { margin: 0; font-family: var(--font-heading); font-size: 1.05rem; font-weight: 800; color: var(--navy); }
	.zoe-link {
		display: inline-flex;
		align-items: center;
		justify-self: start;
		gap: 0.85rem;
		padding: 0.45rem 0.45rem 0.45rem 1.2rem;
		border-radius: 50px;
		font-size: 0.88rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--navy);
		background: rgba(11,52,102,0.06);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.14);
		transition: background 0.35s ease, color 0.35s ease;
	}
	.zoe-arrow { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; color: #FAF9F6; background: var(--navy); transition: background 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1); }
	.zoe-link:hover { color: #FAF9F6; background: var(--navy); }
	.zoe-link:hover .zoe-arrow { background: var(--cta); transform: rotate(45deg); }
	.zoe-link:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }

	/* Final CTA band */
	.cta {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		margin-top: clamp(1.5rem, 3vw, 2rem);
		padding: clamp(1.75rem, 4vw, 2.75rem);
		border-radius: var(--radius-2xl);
		color: #FAF9F6;
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised);
	}
	.cta-glow {
		position: absolute;
		z-index: -1;
		right: -10%;
		top: -60%;
		width: 55%;
		height: 220%;
		background: radial-gradient(ellipse at center, rgba(196,42,56,0.35), transparent 65%);
		pointer-events: none;
	}
	.cta h2 { font-family: var(--font-heading); font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 800; letter-spacing: -0.035em; line-height: 1.12; margin-bottom: 0.5rem; text-wrap: balance; }
	.cta p { font-size: 1rem; line-height: 1.6; color: rgba(250,249,246,0.78); max-width: 54ch; }
	.cta-btns { display: flex; flex-wrap: wrap; gap: 0.6rem; }
	.btn-main {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.45rem 0.45rem 0.45rem 1.4rem;
		border-radius: 50px;
		font-size: 0.9rem;
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
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		padding: 0 1.3rem;
		min-height: 50px;
		border-radius: 50px;
		font-size: 0.88rem;
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

	/* ─── Responsive ─── */
	@media (min-width: 600px) {
		.credits { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 900px) {
		.hero-grid { grid-template-columns: 1.3fr 0.7fr; }
		.chapter { grid-template-columns: 0.85fr 1.15fr; }
		.chapter-head { position: sticky; top: calc(var(--nav-h) + 2rem); align-self: start; }
	}
	@media (min-width: 1100px) {
		.cta { flex-direction: row; align-items: center; justify-content: space-between; }
		.cta-btns { flex-shrink: 0; }
	}
	@media (prefers-reduced-motion: reduce) {
		.offer-list li, .offer-icon, .toc-arrow, .zoe-arrow, .btn-main, .btn-main-arrow { transition: none; }
		.offer-list li:hover, .toc-item:hover .toc-arrow, .zoe-link:hover .zoe-arrow, .btn-main:hover, .btn-main:hover .btn-main-arrow { transform: none; }
	}
</style>

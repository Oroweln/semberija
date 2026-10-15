<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';

	// Editorial About page: numbered sections, founder within the narrative, no photos.
	const a = $derived(i18n.t.aboutPage);
</script>

<svelte:head>
	<title>{i18n.t.seo.aboutTitle}</title>
	<meta property="og:title" content={i18n.t.seo.aboutTitle} />
	<meta name="description" content={a.intro[0]} />
</svelte:head>

<div class="page-wrap">
	<!-- Hero -->
	<section class="page-top reveal-card" use:reveal>
		<div class="container">
			<span class="page-tag">{a.label}</span>
			<h1>{a.heading}</h1>
			<div class="intro">
				{#each a.intro as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
		</div>
	</section>

	<!-- 01–03: platform, vision, what it offers -->
	<section class="page-body reveal-card" use:reveal>
		<div class="container">
			<article class="chapter">
				<header class="chapter-head">
					<span class="chapter-label"><span class="chapter-num">01</span> — {a.platform.label}</span>
					<h2>{a.platform.heading}</h2>
				</header>
				<div class="chapter-body">
					{#each a.platform.body as paragraph}<p>{paragraph}</p>{/each}
				</div>
			</article>

			<article class="chapter">
				<header class="chapter-head">
					<span class="chapter-label"><span class="chapter-num">02</span> — {a.vision.label}</span>
					<h2>{a.vision.heading}</h2>
				</header>
				<div class="chapter-body">
					{#each a.vision.body as paragraph}<p>{paragraph}</p>{/each}
				</div>
			</article>

			<article class="chapter">
				<header class="chapter-head">
					<span class="chapter-label"><span class="chapter-num">03</span> — {a.offer.label}</span>
					<h2>{a.offer.heading}</h2>
				</header>
				<div class="chapter-body">
					<ol class="offer-list">
						{#each a.offer.items as item, i}
							<li><span class="offer-num">{String(i + 1).padStart(2, '0')}</span>{item}</li>
						{/each}
					</ol>
					<p class="closing">{a.offer.closing}</p>
				</div>
			</article>
		</div>
	</section>

	<!-- 04: founder (family connection is part of the narrative, no separate section) -->
	<section class="page-dark reveal-card" use:reveal>
		<div class="container">
			<article class="chapter dark">
				<header class="chapter-head">
					<span class="chapter-label"><span class="chapter-num">04</span> — {a.founder.label}</span>
					<h2>{a.founder.name}</h2>
					<p class="founder-role">
						{#each a.founder.role.split('|') as part}<span>{part.trim()}</span>{/each}
					</p>
					<p class="founder-places">{a.founder.places}</p>
				</header>
				<div class="chapter-body">
					{#each a.founder.body as paragraph}<p>{paragraph}</p>{/each}
				</div>
			</article>

			<figure class="quote">
				<figcaption class="quote-label">{a.founder.quoteLabel}</figcaption>
				<blockquote>{a.founder.quote}</blockquote>
				<p class="quote-by">
					<strong>{a.founder.name}</strong>
					<span>{a.founder.quoteRole}</span>
				</p>
			</figure>
		</div>
	</section>

	<!-- 05–06: ZOE MILANO and the future -->
	<section class="page-body reveal-card" use:reveal>
		<div class="container">
			<article class="chapter">
				<header class="chapter-head">
					<span class="chapter-label"><span class="chapter-num">05</span> — {a.zoe.label}</span>
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
					<a class="btn-outline" href="https://zoemilano.com/" target="_blank" rel="noopener">
						{a.zoe.cta}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</a>
				</div>
			</article>

			<article class="chapter">
				<header class="chapter-head">
					<span class="chapter-label"><span class="chapter-num">06</span> — {a.future.label}</span>
					<h2>{a.future.heading}</h2>
				</header>
				<div class="chapter-body">
					{#each a.future.body as paragraph}<p>{paragraph}</p>{/each}
					<p class="closing big">{a.future.closing}</p>
				</div>
			</article>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="page-dark cta reveal-card" use:reveal>
		<div class="cta-glow" aria-hidden="true"></div>
		<div class="container cta-inner">
			<h2>{a.cta.heading}</h2>
			<p>{a.cta.desc}</p>
			<div class="cta-btns">
				<a href="/kontakt?tip=registracija" class="btn-primary">{i18n.t.nav.listCta}</a>
				<a href="/oglasi" class="btn-ghost">{i18n.t.joinCta.promote}</a>
				<a href="/kontakt" class="btn-ghost">{a.cta.contact}</a>
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
	.container { max-width: var(--max-w); margin: 0 auto; }

	/* ── Surfaces ── */
	.page-top,
	.page-dark {
		position: relative;
		overflow: hidden;
		background: var(--surface-dark);
		color: #FAF9F6;
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
	}
	.page-body {
		background: var(--surface-light);
		color: var(--dark);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
	}

	/* ── Hero ── */
	.page-tag {
		display: inline-block;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: #FAF9F6; background: rgba(250,249,246,0.1); border: 1px solid rgba(250,249,246,0.3);
		padding: 0.35rem 0.95rem; border-radius: 50px; margin-bottom: 1.25rem;
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 5.2vw, 4.2rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.05;
		text-wrap: balance;
		max-width: 960px;
		margin-bottom: 1.75rem;
	}
	.intro { max-width: 760px; }
	.intro p { font-size: 1.15rem; line-height: 1.7; color: rgba(250,249,246,0.9); }
	.intro p + p { margin-top: 1rem; }

	/* ── Editorial chapters: label + heading left, text right ── */
	.chapter {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem 4rem;
		padding: 3rem 0;
		border-top: 1px solid rgba(15,23,42,0.1);
	}
	.chapter:first-child { border-top: none; padding-top: 0; }
	.chapter:last-child { padding-bottom: 0; }
	.chapter-label {
		display: block;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--steel);
		margin-bottom: 1rem;
	}
	.chapter-num { color: var(--cta); }
	.chapter-head h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.8rem, 3.4vw, 2.6rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.1;
		text-wrap: balance;
		color: var(--navy);
	}
	.chapter-body p { font-size: 1.08rem; line-height: 1.75; color: #3d4450; }
	.chapter-body p + p { margin-top: 1.1rem; }
	.closing { font-weight: 600; color: var(--navy) !important; margin-top: 1.5rem; }
	.closing.big {
		font-family: var(--font-heading);
		font-size: clamp(1.4rem, 2.4vw, 1.8rem) !important;
		font-weight: 800;
		letter-spacing: -0.02em;
	}
	.closing.big::before {
		content: '';
		display: block;
		width: 56px;
		height: 4px;
		margin-bottom: 1rem;
		border-radius: 2px;
		background: var(--accent-line);
	}

	/* What the platform offers */
	.offer-list { list-style: none; display: grid; gap: 0.6rem; }
	.offer-list li {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: #ffffff;
		border: 1px solid rgba(15,23,42,0.07);
		border-radius: var(--radius-lg);
		font-size: 1.08rem;
		font-weight: 600;
		color: var(--navy);
	}
	.offer-num {
		font-family: var(--font-heading);
		font-weight: 800;
		color: var(--cta);
		min-width: 1.8rem;
	}

	/* ── Founder (dark) ── */
	.chapter.dark { border-top: none; padding-top: 0; }
	.dark .chapter-label { color: rgba(250,249,246,0.75); }
	.dark .chapter-num { color: #f06a75; }
	.dark .chapter-head h2 { color: #FAF9F6; }
	.dark .chapter-body p { color: rgba(250,249,246,0.88); }
	.founder-role { margin-top: 0.85rem; font-size: 1rem; font-weight: 600; color: #FAF9F6; line-height: 1.5; display: flex; flex-direction: column; }
	.founder-role span + span { font-weight: 500; color: rgba(250,249,246,0.8); }
	.founder-places {
		margin-top: 0.5rem;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.65);
	}

	.quote {
		margin: 3rem 0 0;
		padding: 2.5rem clamp(1.5rem, 4vw, 3.5rem);
		border-radius: var(--radius-xl);
		background: linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%);
		border: 1px solid rgba(255,255,255,0.14);
		border-left: 4px solid var(--cta);
	}
	.quote-label {
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.75);
		margin-bottom: 1rem;
	}
	.quote blockquote {
		font-family: var(--font-heading);
		font-size: clamp(1.25rem, 2.3vw, 1.65rem);
		font-weight: 600;
		line-height: 1.5;
		letter-spacing: -0.01em;
		color: #FAF9F6;
	}
	.quote-by { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.2rem; }
	.quote-by strong { font-size: 1.05rem; color: #FAF9F6; }
	.quote-by span { font-size: 0.95rem; color: rgba(250,249,246,0.7); }

	/* ── ZOE MILANO credits ── */
	.credits {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		margin: 1.75rem 0;
	}
	.credits div {
		padding: 1rem 1.25rem;
		background: #ffffff;
		border: 1px solid rgba(15,23,42,0.07);
		border-radius: var(--radius-lg);
	}
	.credits dt {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--steel);
		margin-bottom: 0.25rem;
	}
	.credits dd { font-size: 1.08rem; font-weight: 700; color: var(--navy); }

	/* ── Buttons ── */
	.btn-primary,
	.btn-ghost,
	.btn-outline {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-family: var(--font-sans);
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		padding: 0.95rem 1.9rem;
		border-radius: 10px;
		transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
	}
	.btn-primary {
		color: var(--cta-text);
		background: var(--cta);
		box-shadow: 0 10px 24px -8px rgba(155,17,30,0.55), inset 0 1px 0 rgba(255,255,255,0.18);
	}
	.btn-primary:hover { background: var(--cta-hover); transform: translateY(-2px); }
	.btn-ghost {
		color: #FAF9F6;
		background: rgba(250,249,246,0.06);
		border: 1.5px solid rgba(250,249,246,0.55);
	}
	.btn-ghost:hover { background: var(--cta); border-color: var(--cta); transform: translateY(-2px); }
	.btn-outline {
		color: var(--cta);
		border: 1.5px solid var(--cta);
		background: transparent;
	}
	.btn-outline:hover { color: var(--cta-text); background: var(--cta); }

	/* ── Final CTA ── */
	.cta { text-align: center; }
	.cta-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 900px;
		height: 420px;
		transform: translate(-50%, -50%);
		background: radial-gradient(ellipse at center, rgba(155,17,30,0.32) 0%, rgba(155,17,30,0.08) 40%, transparent 70%);
		pointer-events: none;
	}
	.cta-inner { position: relative; }
	.cta h2 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 4.8vw, 3.4rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1.08;
		text-wrap: balance;
		margin-bottom: 1rem;
	}
	.cta p {
		font-size: 1.15rem;
		line-height: 1.65;
		color: rgba(250,249,246,0.88);
		max-width: 620px;
		margin: 0 auto 2.25rem;
	}
	.cta-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.85rem; }

	@media (min-width: 900px) {
		.chapter { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); }
		.credits { grid-template-columns: repeat(2, 1fr); }
	}
</style>

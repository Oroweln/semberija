<script lang="ts">
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n.svelte';
	import { b2bItemSlugs } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import FormError from '$lib/components/FormError.svelte';
	import Semberija3D from '$lib/components/Semberija3D.svelte';

	const index = $derived((b2bItemSlugs as readonly string[]).indexOf($page.params.slug ?? ''));
	// The diaspora page shows the 3D Semberija scene in the hero instead of the number badge
	const withScene = $derived($page.params.slug === 'dijaspora-mreza');
	const item = $derived(index >= 0 ? i18n.t.b2b.items[index] : null);
	// The other services, for the "more services" list
	const others = $derived(
		i18n.t.b2b.items
			.map((it, i) => ({ ...it, i, slug: b2bItemSlugs[i] }))
			.filter((it) => it.i !== index)
	);

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');
	let submitted = $state(false);
	let prefilled = false;

	$effect(() => {
		if (item && !prefilled) {
			message = i18n.t.b2b.detailPrefill + item.title;
			prefilled = true;
		}
	});

	// Real submission via the server action; failures keep the form and show an honest message
	let sending = $state(false);
	let error = $state<string | null>(null);

	const submit: SubmitFunction = () => {
		sending = true;
		error = null;
		return async ({ result }) => {
			sending = false;
			if (result.type === 'success') submitted = true;
			else if (result.type === 'failure') error = (result.data?.error as string) ?? 'send-failed';
			else error = 'send-failed';
		};
	};

	const mailto = $derived(
		`mailto:info@zoemilano.com?subject=${encodeURIComponent('Semberija.app — ' + (item?.title ?? ''))}&body=${encodeURIComponent(message)}`
	);

	// Mobile: floating "request" button while neither the hero nor the form is on screen
	let heroEl = $state<HTMLElement>();
	let formEl = $state<HTMLElement>();
	let heroVisible = $state(true);
	let formVisible = $state(false);
	const showFab = $derived(!!item && !heroVisible && !formVisible && !submitted);
	$effect(() => {
		if (!heroEl || !formEl) return;
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) {
				if (e.target === heroEl) heroVisible = e.isIntersecting;
				if (e.target === formEl) formVisible = e.isIntersecting;
			}
		});
		io.observe(heroEl);
		io.observe(formEl);
		return () => io.disconnect();
	});

	function resetForm() {
		submitted = false;
		error = null;
		name = '';
		email = '';
		company = '';
		message = item ? i18n.t.b2b.detailPrefill + item.title : '';
	}
</script>

<svelte:head>
	<title>{item ? item.title : i18n.t.b2b.heading} — Semberija.app</title>
	{#if item}
		<meta name="description" content={item.desc} />
	{/if}
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
{#if item}
	<!-- ─── HERO ─── -->
	<section class="page-top reveal-card" use:reveal bind:this={heroEl}>
		<div class="top-glow" aria-hidden="true"></div>
		<div class="top-lines" aria-hidden="true"></div>
		<span class="top-watermark" class:left={withScene} aria-hidden="true">{@render b2bIcon(index, 420)}</span>
		<div class="container hero-grid" class:with-scene={withScene}>
			<div>
				<a href="/b2b" class="back-link">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
					{i18n.t.b2b.detailBack}
				</a>
				<span class="page-label"><span class="page-label-dot"></span>{i18n.t.b2b.detailTag}</span>
				<h1>{item.title}</h1>
				<p class="page-sub">{item.desc}</p>
				<a href="#upit" class="btn-main">
					<span>{i18n.t.b2b.detailInquireHeading}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
					</span>
				</a>
			</div>

			{#if withScene}
				<!-- 3D scene floating on the hero: no box, silver models on navy -->
				<div class="hero-scene">
					<span class="scene-halo" aria-hidden="true"></span>
					<span class="scene-ring r1" aria-hidden="true"></span>
					<span class="scene-ring r2" aria-hidden="true"></span>
					<Semberija3D label="Semberija" />
					<span class="scene-floor" aria-hidden="true"></span>
					<span class="scene-tag" aria-hidden="true">
						<span class="scene-tag-dot"></span>
						Semberija
						<em>44.76° N · 19.21° E</em>
					</span>
				</div>
			{:else}
				<div class="hero-badge" aria-hidden="true">
					<span class="hero-badge-icon">{@render b2bIcon(index, 34)}</span>
					<span class="hero-badge-num">{String(index + 1).padStart(2, '0')}<em>/ {String(b2bItemSlugs.length).padStart(2, '0')}</em></span>
					<span class="hero-badge-label">{i18n.t.b2b.label}</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- ─── PROCESS ─── -->
	<section class="process reveal-card" use:reveal>
		<div class="container">
			<span class="section-kicker">{i18n.t.b2b.processHeading}</span>
			<ol class="proc-steps">
				{#each i18n.t.b2b.process as step, si}
					<li class="proc-step" style="--s:{si}">
						<span class="proc-node" aria-hidden="true">
							{#if si === 0}
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>
							{:else if si === 1}
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.5-5.5"/><path d="M8 10.5l2 2 3.5-3.5"/></svg>
							{:else}
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/></svg>
							{/if}
						</span>
						<div class="proc-text">
							<span class="proc-num">{String(si + 1).padStart(2, '0')}</span>
							<h3>{step.title}</h3>
							<p>{step.desc}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- ─── DETAIL + FORM ─── -->
	<section class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container detail-layout">
			<div class="detail-info">
				<span class="section-kicker">{i18n.t.b2b.detailHighlights}</span>
				<ol class="highlights-list">
					{#each item.highlights as highlight, hi}
						<li>
							<span class="hl-num" aria-hidden="true">{String(hi + 1).padStart(2, '0')}</span>
							<span class="hl-text">{highlight}</span>
							<span class="hl-check" aria-hidden="true">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
							</span>
						</li>
					{/each}
				</ol>

				<span class="section-kicker">{i18n.t.b2b.label}</span>
				<nav class="others" aria-label={i18n.t.b2b.label}>
					{#each others as o (o.slug)}
						<a href="/b2b/{o.slug}" class="other">
							<span class="other-icon">{@render b2bIcon(o.i, 18)}</span>
							<span class="other-title">{o.title}</span>
							<span class="other-arrow" aria-hidden="true">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</a>
					{/each}
				</nav>
			</div>

			<div class="form-wrap" id="upit" bind:this={formEl}>
				{#if submitted}
					<div class="success-state">
						<div class="success-icon">
							<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
								<polyline points="22 4 12 14.01 9 11.01"/>
							</svg>
						</div>
						<h3>{i18n.t.ui.contact.sent}</h3>
						<p>{i18n.t.ui.contact.sentDesc}</p>
						<button class="btn-submit" onclick={resetForm}>
							{i18n.t.ui.contact.newMessage}
						</button>
					</div>
				{:else}
					<form use:enhance={submit} class="inquiry-form" method="POST">
						<input type="hidden" name="topic" value={item.title} />
						<input type="text" name="website_hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
						<div class="form-head">
							<span class="form-icon" aria-hidden="true">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></svg>
							</span>
							<div>
								<h2>{i18n.t.b2b.detailInquireHeading}</h2>
								<p class="form-sub">{i18n.t.b2b.detailInquireSub}</p>
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="name">{i18n.t.ui.contact.fullName} *</label>
								<input id="name" name="name" type="text" bind:value={name} required placeholder={i18n.t.ui.contact.namePlaceholder} />
							</div>
							<div class="form-group">
								<label for="email">Email *</label>
								<input id="email" name="email" type="email" bind:value={email} required placeholder={i18n.t.ui.contact.emailPlaceholder} />
							</div>
						</div>

						<div class="form-group">
							<label for="company">{i18n.t.ui.contact.companyName}</label>
							<input id="company" name="company" type="text" bind:value={company} placeholder={i18n.t.ui.contact.companyPlaceholder} />
						</div>

						<div class="form-group">
							<label for="message">{i18n.t.ui.contact.message} *</label>
							<textarea id="message" name="message" bind:value={message} required rows="5"></textarea>
						</div>

						<FormError {error} {mailto} />

						<button type="submit" class="btn-submit" disabled={sending}>
							<span>{sending ? i18n.t.formStatus.sending : i18n.t.ui.contact.send}</span>
							<span class="btn-submit-arrow" aria-hidden="true">
								<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>
							</span>
						</button>

						<p class="privacy-note">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
							<span>{i18n.t.b2b.privacyNote} <a href="/legal/privacy">{i18n.t.legal.privacy}</a></span>
						</p>
					</form>
				{/if}
			</div>
		</div>
	</section>
	<a href="#upit" class="fab" class:show={showFab} aria-hidden={!showFab} tabindex={showFab ? 0 : -1}>
		<span>{i18n.t.b2b.detailInquireHeading}</span>
		<span class="fab-arrow" aria-hidden="true">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
		</span>
	</a>
{:else}
	<section class="page-top reveal-card" use:reveal>
		<div class="top-glow" aria-hidden="true"></div>
		<div class="container">
			<span class="page-label"><span class="page-label-dot"></span>{i18n.t.b2b.label}</span>
			<h1>{i18n.t.ui.noResultsShort}</h1>
			<a href="/b2b" class="back-link">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
				{i18n.t.b2b.detailBack}
			</a>
		</div>
	</section>
{/if}
</div>

<style>
	.hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

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
		padding: clamp(2.5rem, 6vw, 4.5rem) var(--section-px);
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
			radial-gradient(35% 45% at 85% 50%, rgba(196,42,56,0.25), transparent 70%);
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
		-webkit-mask-image: radial-gradient(ellipse 60% 80% at 80% 50%, #000 10%, transparent 75%);
		mask-image: radial-gradient(ellipse 60% 80% at 80% 50%, #000 10%, transparent 75%);
		pointer-events: none;
	}
	/* Oversized line icon of the service, bleeding off the right edge */
	.top-watermark {
		position: absolute;
		z-index: -1;
		right: -80px;
		top: 50%;
		transform: translateY(-50%) rotate(-8deg);
		color: rgba(255,255,255,0.05);
		pointer-events: none;
	}
	/* With the 3D scene on the right, the watermark moves to the bottom-left corner */
	.top-watermark.left {
		right: auto;
		left: -120px;
		top: auto;
		bottom: -160px;
		transform: rotate(10deg);
		color: rgba(255,255,255,0.04);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: center;
	}
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		margin-bottom: 1.5rem;
		padding: 0.4rem 0.9rem 0.4rem 0.7rem;
		border-radius: 50px;
		font-size: 0.82rem;
		font-weight: 600;
		text-decoration: none;
		color: rgba(250,249,246,0.85);
		background: rgba(255,255,255,0.06);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
		transition: background 0.3s ease, color 0.3s ease;
	}
	.back-link svg { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1); }
	.back-link:hover { color: #FAF9F6; background: rgba(255,255,255,0.12); }
	.back-link:hover svg { transform: translateX(-3px); }
	.back-link:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }
	.page-label {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		width: max-content;
		margin-bottom: 1.1rem;
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
		max-width: 56ch;
		margin-bottom: 2rem;
	}
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
	.btn-main:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	/* Service badge */
	.hero-badge {
		display: none;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
		justify-self: end;
		width: 240px;
		padding: 1.5rem;
		border-radius: 26px;
		background: linear-gradient(160deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		transform: rotate(-3deg);
	}
	.hero-badge-icon {
		display: grid;
		place-items: center;
		width: 68px;
		height: 68px;
		border-radius: 20px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 16px 30px -12px rgba(155,17,30,0.75), inset 0 1px 0 rgba(255,255,255,0.3);
	}
	.hero-badge-num {
		font-family: var(--font-heading);
		font-size: 3.2rem;
		font-weight: 800;
		letter-spacing: -0.05em;
		line-height: 1;
		color: #FAF9F6;
	}
	.hero-badge-num em {
		font-style: normal;
		font-size: 1rem;
		letter-spacing: 0.04em;
		margin-left: 0.35rem;
		color: rgba(250,249,246,0.5);
	}
	.hero-badge-label {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.65);
	}

	/* 3D scene in the hero */
	.hero-scene {
		position: relative;
		isolation: isolate;
		width: 100%;
		max-width: 520px;
		margin: 0 auto;
	}
	@media (min-width: 900px) {
		/* Extend into the section's right padding so the crest has room at the edge */
		.hero-scene { max-width: none; width: calc(100% + var(--section-px)); }
	}
	.hero-scene :global(.scene) {
		/* Wide frame: the orbit is much wider than it is tall */
		aspect-ratio: 3 / 2;
		max-height: none;
		background: none;
		border: 0;
		box-shadow: none;
		border-radius: 0;
	}
	.scene-halo {
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		width: 70%;
		aspect-ratio: 1;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: radial-gradient(circle, rgba(140,185,245,0.32) 0%, rgba(120,170,240,0.1) 40%, transparent 70%);
		pointer-events: none;
	}
	.scene-ring {
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid rgba(255,255,255,0.1);
		pointer-events: none;
	}
	.scene-ring.r1 { width: 52%; aspect-ratio: 1; }
	.scene-ring.r2 { width: 76%; aspect-ratio: 1; border-style: dashed; border-color: rgba(255,255,255,0.08); }
	/* Soft contact shadow under the models */
	.scene-floor {
		display: block;
		width: 46%;
		height: 22px;
		margin: -8% auto 0;
		border-radius: 50%;
		background: radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%);
		filter: blur(4px);
		pointer-events: none;
	}
	/* Sits in normal flow below the scene (under the floor shadow), never over the models */
	.scene-tag {
		position: relative;
		display: flex;
		width: max-content;
		max-width: 100%;
		margin: clamp(1.75rem, 3.5vw, 2.75rem) auto 0;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.9rem;
		border-radius: 50px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		white-space: nowrap;
		color: #FAF9F6;
		background: rgba(255,255,255,0.08);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16), 0 14px 28px -14px rgba(0,0,0,0.6);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.scene-tag em {
		font-style: normal;
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.68rem;
		font-weight: 400;
		color: rgba(250,249,246,0.55);
	}
	.scene-tag-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #f06a75;
		box-shadow: 0 0 0 3px rgba(240,106,117,0.22);
	}

	/* ─── PROCESS ─── */
	.process {
		position: relative;
		overflow: hidden;
		background: var(--surface-light);
		padding: clamp(2rem, 5vw, 3rem) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
	}
	.proc-steps {
		--node: 52px;
		position: relative;
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin: 0;
		padding: 0;
	}
	/* Track + progress line (vertical on mobile), drawn when the section is revealed */
	.proc-steps::before,
	.proc-steps::after {
		content: '';
		position: absolute;
		left: calc(var(--node) / 2 - 1px);
		top: calc(var(--node) / 2);
		bottom: calc(var(--node) / 2);
		width: 2px;
		border-radius: 2px;
	}
	.proc-steps::before { background: rgba(11,52,102,0.12); }
	.proc-steps::after {
		background: linear-gradient(180deg, #1c5aa8, var(--cta));
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 1.4s cubic-bezier(0.22,1,0.36,1) 0.4s;
	}
	.process:global(.reveal-visible) .proc-steps::after { transform: scaleY(1); }
	.proc-step {
		position: relative;
		display: grid;
		grid-template-columns: var(--node) 1fr;
		gap: 1rem;
		align-items: start;
	}
	.proc-node {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		width: var(--node);
		height: var(--node);
		border-radius: 50%;
		color: var(--navy);
		background: #ffffff;
		box-shadow: 0 0 0 6px #faf9f6, inset 0 0 0 1px rgba(11,52,102,0.14), 0 12px 24px -14px rgba(15,23,42,0.45);
		transition: background 0.5s ease, color 0.5s ease;
		transition-delay: calc(0.5s + var(--s) * 0.4s);
	}
	.process:global(.reveal-visible) .proc-node {
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
	}
	.proc-text { padding-top: 0.2rem; }
	.proc-num {
		font-family: var(--font-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: var(--cta);
	}
	.proc-text h3 {
		font-family: var(--font-heading);
		font-size: 1.12rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--navy);
		margin: 0.2rem 0 0.4rem;
	}
	.proc-text p { font-size: 0.92rem; line-height: 1.6; color: #4a525e; max-width: 42ch; }

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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 55%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 55%);
		pointer-events: none;
	}
	.detail-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: start;
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
	.section-kicker::before {
		content: '';
		width: 18px;
		height: 2px;
		border-radius: 2px;
		background: var(--accent-line);
	}

	.highlights-list {
		list-style: none;
		display: grid;
		gap: 0.65rem;
		margin: 0 0 2.5rem;
		padding: 0;
	}
	.highlights-list li {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.05rem 1.15rem;
		border-radius: 18px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 12px 26px -18px rgba(15,23,42,0.2), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
	}
	.highlights-list li:hover {
		transform: translateX(4px);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 18px 32px -18px rgba(15,23,42,0.28), inset 0 0 0 1px rgba(155,17,30,0.2);
	}
	.hl-num {
		font-family: var(--font-heading);
		font-size: 1.4rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		color: rgba(11,52,102,0.25);
		font-variant-numeric: tabular-nums;
	}
	.hl-text { flex: 1; font-size: 1rem; font-weight: 600; line-height: 1.45; color: var(--navy); }
	.hl-check {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		color: var(--success);
		background: rgba(63,143,116,0.12);
	}


	.others { display: grid; gap: 0.5rem; }
	.other {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.65rem 0.7rem;
		border-radius: 16px;
		text-decoration: none;
		color: var(--navy);
		background: rgba(255,255,255,0.6);
		box-shadow: inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}
	.other:hover { background: #ffffff; box-shadow: 0 12px 24px -16px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(155,17,30,0.2); }
	.other:focus-visible { outline: 2px solid var(--cta); outline-offset: 2px; }
	.other-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		border-radius: 12px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		transition: background 0.3s ease;
	}
	.other:hover .other-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.other-title { flex: 1; font-size: 0.95rem; font-weight: 700; }
	.other-arrow {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.18);
		transition: background 0.3s ease, color 0.3s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.other:hover .other-arrow { color: #FAF9F6; background: var(--cta); transform: rotate(45deg); }

	/* ─── FORM ─── */
	.form-wrap {
		scroll-margin-top: calc(var(--nav-h) + 1.5rem);
		padding: clamp(1.5rem, 3.5vw, 2.4rem);
		border-radius: 26px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 40px 80px -40px rgba(15,23,42,0.35), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.form-head { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.75rem; }
	.form-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 50px;
		height: 50px;
		border-radius: 15px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 12px 24px -10px rgba(155,17,30,0.6), inset 0 1px 0 rgba(255,255,255,0.28);
	}
	.form-head h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.35rem, 2.4vw, 1.7rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: var(--navy);
		margin-bottom: 0.35rem;
	}
	.form-sub { font-size: 0.92rem; line-height: 1.55; color: #4a525e; }

	.form-row { display: grid; grid-template-columns: 1fr; gap: 0 1rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.1rem; }
	.form-group label {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #6b7380;
	}
	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 0.85rem 1rem;
		border: 0;
		border-radius: 14px;
		font: inherit;
		font-size: 0.98rem;
		color: var(--navy);
		background: #f4f3ef;
		box-shadow: inset 0 0 0 1px rgba(15,23,42,0.06);
		outline: none;
		transition: background 0.25s ease, box-shadow 0.25s ease;
	}
	.form-group textarea { resize: vertical; min-height: 130px; line-height: 1.55; }
	.form-group input::placeholder, .form-group textarea::placeholder { color: #8a919c; }
	.form-group input:focus, .form-group textarea:focus {
		background: #ffffff;
		box-shadow: inset 0 0 0 1px rgba(155,17,30,0.45), 0 0 0 4px rgba(155,17,30,0.1);
	}

	.btn-submit {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		padding: 0.45rem 0.45rem 0.45rem 1.4rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 16px 32px -14px rgba(155,17,30,0.8), inset 0 1px 0 rgba(255,255,255,0.25);
		cursor: pointer;
		transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
	}
	.btn-submit-arrow {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		color: var(--cta);
		background: #FAF9F6;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.btn-submit:hover:not(:disabled) { transform: translateY(-2px); }
	.btn-submit:hover:not(:disabled) .btn-submit-arrow { transform: translate(2px, -2px); }
	.btn-submit:disabled { opacity: 0.6; cursor: wait; }
	.btn-submit:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }

	.privacy-note {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		margin-top: 1rem;
		font-size: 0.8rem;
		line-height: 1.5;
		color: #6b7380;
	}
	.privacy-note svg { flex-shrink: 0; margin-top: 0.1rem; color: var(--success); }
	.privacy-note a { color: var(--navy); font-weight: 700; text-underline-offset: 3px; }
	.privacy-note a:hover { color: var(--cta); }

	/* Mobile floating request button */
	.fab {
		position: fixed;
		z-index: 40;
		left: 50%;
		bottom: max(1rem, env(safe-area-inset-bottom));
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.4rem 0.4rem 0.4rem 1.25rem;
		border-radius: 50px;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		white-space: nowrap;
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 18px 36px -12px rgba(155,17,30,0.75), inset 0 0 0 1px rgba(255,255,255,0.15);
		transform: translate(-50%, 140%);
		opacity: 0;
		pointer-events: none;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
	}
	.fab.show { transform: translate(-50%, 0); opacity: 1; pointer-events: auto; }
	.fab-arrow {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		color: var(--cta);
		background: #FAF9F6;
	}
	.fab:focus-visible { outline: 2px solid var(--navy); outline-offset: 3px; }

	.success-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 2.5rem 1rem;
		text-align: center;
	}
	.success-icon {
		display: grid;
		place-items: center;
		width: 68px;
		height: 68px;
		margin-bottom: 0.5rem;
		border-radius: 50%;
		color: var(--success);
		background: rgba(63,143,116,0.12);
		box-shadow: 0 0 0 8px rgba(63,143,116,0.06);
	}
	.success-state h3 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--navy);
	}
	.success-state p { font-size: 0.98rem; color: #4a525e; margin-bottom: 1rem; }
	.success-state .btn-submit { width: auto; justify-content: center; padding: 0.85rem 1.6rem; }

	/* ─── Responsive ─── */
	@media (min-width: 600px) {
		.form-row { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 900px) {
		.proc-steps { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
		.proc-steps::before,
		.proc-steps::after {
			top: calc(var(--node) / 2 - 1px);
			bottom: auto;
			/* From the centre of the first column to the centre of the last: (100% - 2 gaps) / 6 */
			left: calc((100% - 2 * 1.5rem) / 6);
			right: calc((100% - 2 * 1.5rem) / 6);
			width: auto;
			height: 2px;
		}
		.proc-steps::after {
			background: linear-gradient(90deg, #1c5aa8, var(--cta));
			transform: scaleX(0);
			transform-origin: left;
		}
		.process:global(.reveal-visible) .proc-steps::after { transform: scaleX(1); }
		.proc-step { grid-template-columns: 1fr; justify-items: center; text-align: center; }
		.proc-text p { margin: 0 auto; }
		.fab { display: none; }
		.hero-grid { grid-template-columns: 1fr auto; }
		.hero-grid.with-scene { grid-template-columns: 1.05fr 0.95fr; }
		.hero-grid.with-scene .hero-scene { margin: 0 calc(-1 * var(--section-px)) 0 0; }
		.hero-badge { display: flex; }
		.detail-layout { grid-template-columns: 1fr 1.05fr; }
		.form-wrap { position: sticky; top: calc(var(--nav-h) + 1.5rem); }
	}
	@media (prefers-reduced-motion: reduce) {
		.proc-steps::after, .proc-node, .fab { transition: none; }
		.btn-main, .btn-main-arrow, .btn-submit, .btn-submit-arrow, .highlights-list li, .other-arrow, .back-link svg { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .btn-submit:hover:not(:disabled), .btn-submit:hover:not(:disabled) .btn-submit-arrow,
		.highlights-list li:hover, .other:hover .other-arrow, .back-link:hover svg { transform: none; }
	}
</style>

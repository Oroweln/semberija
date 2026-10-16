<script lang="ts">
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n.svelte';
	import { serviceSlugs } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import FormError from '$lib/components/FormError.svelte';

	const slug = $derived($page.params.slug ?? '');
	const index = $derived((serviceSlugs as readonly string[]).indexOf(slug));
	const service = $derived(index >= 0 ? i18n.t.services.items[index] : null);
	const total = serviceSlugs.length;

	// Other services, for moving between detail pages
	const others = $derived(
		i18n.t.services.items
			.map((svc, i) => ({ name: svc.title, slug: serviceSlugs[i], i }))
			.filter((o) => o.slug !== slug)
	);

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');
	let submitted = $state(false);
	let prefilledFor = '';

	// Prefill the message for this service (again when navigating to another service)
	$effect(() => {
		if (service && prefilledFor !== slug) {
			message = i18n.t.services.detailPrefill + service.title;
			prefilledFor = slug;
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
		`mailto:info@zoemilano.com?subject=${encodeURIComponent('Semberija.app — ' + (service?.title ?? ''))}&body=${encodeURIComponent(message)}`
	);

	function resetForm() {
		submitted = false;
		error = null;
		name = '';
		email = '';
		company = '';
		message = service ? i18n.t.services.detailPrefill + service.title : '';
	}
</script>

<svelte:head>
	<title>{service ? service.title : i18n.t.services.heading} — Semberija.app</title>
	{#if service}
		<meta name="description" content={service.desc} />
	{/if}
</svelte:head>

{#snippet svcIcon(i: number, size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><path d="M6 6h.01M9 6h.01"/><path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/>
		{:else if i === 1}
			<circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.5-5.5"/><path d="M7.5 12l2-2 1.5 1.5 2.5-3"/>
		{:else if i === 2}
			<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>
		{:else if i === 3}
			<path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>
		{:else if i === 4}
			<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>
		{:else}
			<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>
		{/if}
	</svg>
{/snippet}

{#snippet backLink()}
	<a href="/usluge" class="back-link">
		<span class="back-arrow" aria-hidden="true">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
		</span>
		{i18n.t.services.detailBack}
	</a>
{/snippet}

<div class="page-wrap">
{#if service}
	<!-- ─── HERO ─── -->
	<section class="page-top reveal-card" use:reveal>
		<div class="top-glow" aria-hidden="true"></div>
		<div class="top-lines" aria-hidden="true"></div>
		<div class="container hero-grid">
			<div>
				{@render backLink()}
				<span class="page-label"><span class="page-label-dot"></span>{i18n.t.services.detailTag}</span>
				<h1>{service.title}</h1>
				<p class="page-sub">{service.desc}</p>
				<a href="#upit" class="btn-main">
					<span>{i18n.t.services.detailInquireHeading}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
					</span>
				</a>
			</div>

			<!-- Emblem of the area -->
			<div class="emblem" aria-hidden="true">
				<span class="ring r1"></span>
				<span class="ring r2"></span>
				<span class="ring r3"></span>
				<span class="orbit-dot d1"></span>
				<span class="orbit-dot d2"></span>
				<span class="emblem-core">{@render svcIcon(index, 54)}</span>
				<span class="emblem-index">
					<strong>{String(index + 1).padStart(2, '0')}</strong>
					<span>/ {String(total).padStart(2, '0')}</span>
				</span>
			</div>
		</div>
	</section>

	<!-- ─── BODY ─── -->
	<section class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container detail-layout">
			<div class="detail-info">
				<span class="section-kicker">{i18n.t.services.detailHighlights}</span>
				<ul class="highlights">
					{#each service.highlights as highlight, i}
						<li class="hl">
							<span class="hl-watermark" aria-hidden="true">{@render svcIcon(index, 110)}</span>
							<span class="hl-check" aria-hidden="true">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
							</span>
							<span class="hl-text">{highlight}</span>
							<span class="hl-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						</li>
					{/each}
				</ul>

				<span class="section-kicker others-kicker">{i18n.t.services.label}</span>
				<nav class="others" aria-label={i18n.t.services.label}>
					{#each others as o (o.slug)}
						<a href="/usluge/{o.slug}" class="other">
							<span class="other-icon">{@render svcIcon(o.i, 16)}</span>
							<span class="other-name">{o.name}</span>
						</a>
					{/each}
				</nav>
			</div>

			<div class="form-wrap" id="upit">
				{#if submitted}
					<div class="success-state">
						<div class="success-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
								<polyline points="22 4 12 14.01 9 11.01"/>
							</svg>
						</div>
						<h3>{i18n.t.ui.contact.sent}</h3>
						<p>{i18n.t.ui.contact.sentDesc}</p>
						<button class="btn-submit" onclick={resetForm}>
							<span>{i18n.t.ui.contact.newMessage}</span>
						</button>
					</div>
				{:else}
					<form use:enhance={submit} class="inquiry-form" method="POST">
						<input type="hidden" name="topic" value={service.title} />
						<input type="text" name="website_hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
						<div class="form-head">
							<span class="form-icon" aria-hidden="true">{@render svcIcon(index, 22)}</span>
							<div>
								<h2>{i18n.t.services.detailInquireHeading}</h2>
								<p class="form-sub">{i18n.t.services.detailInquireSub}</p>
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
{:else}
	<section class="page-top reveal-card" use:reveal>
		<div class="top-glow" aria-hidden="true"></div>
		<div class="top-lines" aria-hidden="true"></div>
		<div class="container">
			{@render backLink()}
			<span class="page-label"><span class="page-label-dot"></span>{i18n.t.services.label}</span>
			<h1>{i18n.t.ui.noResultsShort}</h1>
		</div>
	</section>
{/if}
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

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1.75rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: rgba(250,249,246,0.8);
		text-decoration: none;
		transition: color 0.25s ease;
	}
	.back-arrow {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: rgba(255,255,255,0.06);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.22);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.25s ease;
	}
	.back-link:hover { color: #FAF9F6; }
	.back-link:hover .back-arrow { transform: translateX(-3px); background: rgba(255,255,255,0.14); }
	.back-link:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 4px; border-radius: 50px; }

	.page-label {
		display: flex;
		width: fit-content;
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
		font-size: clamp(2.4rem, 6vw, 4.4rem);
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
	.page-sub { font-size: 1.1rem; line-height: 1.65; color: rgba(250,249,246,0.8); max-width: 56ch; margin-bottom: 2rem; }
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
	.btn-main:hover .btn-main-arrow { transform: translateY(2px); }
	.btn-main:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	/* Emblem */
	.emblem {
		position: relative;
		display: grid;
		place-items: center;
		width: min(100%, 340px);
		aspect-ratio: 1;
		margin: 0 auto;
	}
	.ring { position: absolute; border-radius: 50%; }
	.ring.r1 { inset: 0; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08); background: radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%); }
	.ring.r2 { inset: 14%; border: 1px dashed rgba(255,255,255,0.18); animation: spin 60s linear infinite; }
	.ring.r3 {
		inset: 28%;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -30px rgba(0,0,0,0.7);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.orbit-dot { position: absolute; width: 10px; height: 10px; border-radius: 50%; }
	.orbit-dot.d1 { top: 12%; right: 22%; background: #f06a75; box-shadow: 0 0 0 5px rgba(240,106,117,0.18); }
	.orbit-dot.d2 { bottom: 18%; left: 12%; width: 8px; height: 8px; background: #7fb0f0; box-shadow: 0 0 0 5px rgba(127,176,240,0.18); }
	.emblem-core {
		position: relative;
		display: grid;
		place-items: center;
		width: 34%;
		aspect-ratio: 1;
		border-radius: 30%;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 24px 48px -16px rgba(155,17,30,0.8), inset 0 1px 0 rgba(255,255,255,0.3);
	}
	.emblem-index {
		position: absolute;
		right: 2%;
		bottom: 6%;
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		padding: 0.4rem 0.85rem;
		border-radius: 50px;
		font-family: var(--font-heading);
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		color: rgba(250,249,246,0.6);
		background: rgba(8,14,26,0.4);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
	.emblem-index strong { font-size: 1.05rem; font-weight: 800; color: #FAF9F6; }
	@keyframes spin { to { transform: rotate(360deg); } }

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
	.detail-layout { display: grid; grid-template-columns: 1fr; gap: clamp(2rem, 4vw, 3.5rem); align-items: start; }

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

	.highlights { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin: 0; padding: 0; }
	.hl {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.2rem 1.25rem;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 30px -22px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
	}
	.hl::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--accent-line);
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.hl:hover { transform: translateX(4px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 24px 40px -24px rgba(15,23,42,0.35), inset 0 0 0 1px rgba(15,23,42,0.08); }
	.hl:hover::before { transform: scaleY(1); }
	.hl-watermark { position: absolute; z-index: -1; right: -18px; top: 50%; transform: translateY(-50%); color: rgba(11,52,102,0.045); pointer-events: none; }
	.hl-check {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 12px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		transition: background 0.35s ease;
	}
	.hl:hover .hl-check { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.hl-text { flex: 1; min-width: 0; font-size: 1rem; font-weight: 600; line-height: 1.5; color: var(--navy); }
	.hl-num { font-family: var(--font-heading); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; color: rgba(11,52,102,0.3); }

	.others-kicker { margin-top: 2.25rem; }
	.others { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.other {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.4rem 0.95rem 0.4rem 0.4rem;
		border-radius: 50px;
		font-size: 0.86rem;
		font-weight: 600;
		color: var(--navy);
		text-decoration: none;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), inset 0 0 0 1px rgba(15,23,42,0.08);
		transition: box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), color 0.3s ease;
	}
	.other-icon {
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		color: #1c5aa8;
		background: rgba(28,90,168,0.1);
		transition: background 0.3s ease, color 0.3s ease;
	}
	.other:hover { color: var(--cta); transform: translateY(-2px); box-shadow: 0 12px 24px -16px rgba(15,23,42,0.4), inset 0 0 0 1px rgba(155,17,30,0.3); }
	.other:hover .other-icon { color: #FAF9F6; background: var(--cta); }
	.other:focus-visible { outline: 2px solid var(--cta); outline-offset: 2px; }

	/* Form */
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
	.form-head h2 { font-family: var(--font-heading); font-size: clamp(1.35rem, 2.4vw, 1.7rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; color: var(--navy); margin-bottom: 0.35rem; }
	.form-sub { font-size: 0.92rem; line-height: 1.55; color: #4a525e; }
	.form-row { display: grid; grid-template-columns: 1fr; gap: 0 1rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.1rem; }
	.form-group label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #6b7380; }
	.form-group input, .form-group textarea {
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
	.form-group input:focus, .form-group textarea:focus { background: #ffffff; box-shadow: inset 0 0 0 1px rgba(155,17,30,0.45), 0 0 0 4px rgba(155,17,30,0.1); }
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
	.btn-submit-arrow { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; color: var(--cta); background: #FAF9F6; }
	.btn-submit:hover:not(:disabled) { transform: translateY(-2px); }
	.btn-submit:disabled { opacity: 0.6; cursor: wait; }
	.btn-submit:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }
	.privacy-note { display: flex; align-items: flex-start; gap: 0.5rem; margin-top: 1rem; font-size: 0.8rem; line-height: 1.5; color: #6b7380; }
	.privacy-note svg { flex-shrink: 0; margin-top: 0.1rem; color: var(--success); }
	.privacy-note a { color: var(--navy); font-weight: 700; text-underline-offset: 3px; }
	.hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
	.success-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 2.5rem 1rem; text-align: center; }
	.success-icon { display: grid; place-items: center; width: 68px; height: 68px; margin-bottom: 0.5rem; border-radius: 50%; color: var(--success); background: rgba(63,143,116,0.12); box-shadow: 0 0 0 8px rgba(63,143,116,0.06); }
	.success-state h3 { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.03em; color: var(--navy); }
	.success-state p { font-size: 0.98rem; color: #4a525e; margin-bottom: 1rem; }
	.success-state .btn-submit { width: auto; justify-content: center; padding: 0.85rem 1.6rem; }

	/* ─── Responsive ─── */
	@media (max-width: 899px) {
		.emblem { width: min(70%, 260px); }
	}
	@media (min-width: 600px) {
		.form-row { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 900px) {
		.hero-grid { grid-template-columns: 1.25fr 0.75fr; }
		.detail-layout { grid-template-columns: 1fr 1.05fr; }
		.form-wrap { position: sticky; top: calc(var(--nav-h) + 1.5rem); }
	}
	@media (prefers-reduced-motion: reduce) {
		.ring.r2 { animation: none; }
		.btn-main, .btn-main-arrow, .back-arrow, .hl, .hl::before, .hl-check, .other, .other-icon, .btn-submit { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .back-link:hover .back-arrow, .hl:hover, .other:hover, .btn-submit:hover:not(:disabled) { transform: none; }
	}
</style>

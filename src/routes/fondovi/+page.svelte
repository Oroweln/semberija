<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import FormError from '$lib/components/FormError.svelte';

	// Funding & Incentives: informative overview + enquiry form.
	// No funding calls are listed here yet. If real calls are added later, each must show the
	// official source, eligibility, deadline and the date it was last verified.
	const f = $derived(i18n.t.funding);

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');
	let submitted = $state(false);
	let prefilled = false;

	$effect(() => {
		if (!prefilled) {
			message = f.prefill;
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
		`mailto:info@zoemilano.com?subject=${encodeURIComponent('Semberija.app — ' + f.heading)}&body=${encodeURIComponent(message)}`
	);

	function resetForm() {
		submitted = false;
		error = null;
		name = '';
		email = '';
		company = '';
		message = f.prefill;
	}
</script>

<svelte:head>
	<title>{f.heading} — Semberija.app</title>
	<meta name="description" content={f.desc} />
</svelte:head>

{#snippet instrumentIcon(i: number)}
	<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<path d="M3 11l18-8-8 18-2-8z"/>
		{:else if i === 1}
			<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13"/><path d="M3 12h18"/><path d="M12 8c-1.5-3-5-3.5-5-1.5S10 8 12 8zM12 8c1.5-3 5-3.5 5-1.5S14 8 12 8z"/>
		{:else if i === 2}
			<path d="M12 2v4"/><circle cx="12" cy="13" r="8"/><path d="M14.5 10.5c-.5-.9-1.4-1.5-2.5-1.5-1.4 0-2.5.9-2.5 2s1.1 1.7 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2c-1.1 0-2-.6-2.5-1.5"/>
		{:else if i === 3}
			<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4z"/><path d="M10 9l-1.5 1.5L10 12M14 9l1.5 1.5L14 12"/>
		{:else}
			<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>
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
				<a href="/platforma" class="back-link">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
					{i18n.t.nav.platformOverview}
				</a>
				<span class="page-label"><span class="page-label-dot"></span>{f.label}</span>
				<h1>{f.heading}</h1>
				<p class="page-sub">{f.desc}</p>
				<div class="hero-btns">
					<a href="#upit" class="btn-main">
						<span>{f.formCta}</span>
						<span class="btn-main-arrow" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
						</span>
					</a>
					<a href="#pregled" class="btn-ghost">{f.overviewHeading}</a>
				</div>
			</div>

			<!-- Instruments board (overview, not a list of calls) -->
			<div class="board" aria-hidden="true">
				<div class="board-head">
					<span class="board-dot"></span>
					<span class="board-title">{f.overviewHeading}</span>
				</div>
				{#each f.instruments as ins, i}
					<div class="board-row">
						<span class="board-icon">{@render instrumentIcon(i)}</span>
						<span class="board-name">{ins.title}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ─── OVERVIEW ─── -->
	<section class="page-body reveal-card" use:reveal id="pregled">
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container">
			<span class="section-kicker">{f.overviewHeading}</span>
			<div class="ins-grid">
				{#each f.instruments as ins, i}
					<article class="ins-card" class:voucher={i === 3}>
						<span class="ins-head">
							<span class="ins-icon">{@render instrumentIcon(i)}</span>
							<span class="ins-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						</span>
						<h2>{ins.title}</h2>
						<p>{ins.desc}</p>
					</article>
				{/each}
			</div>

			<!-- Status + disclaimer -->
			<div class="notes">
				<div class="note">
					<span class="note-icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></svg>
					</span>
					<div>
						<h3>{f.statusHeading}</h3>
						<p>{f.statusDesc}</p>
					</div>
				</div>
				<div class="note warn">
					<span class="note-icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>
					</span>
					<div>
						<h3>{f.disclaimerHeading}</h3>
						<p>{f.disclaimer}</p>
					</div>
				</div>
			</div>

			<!-- Premium / BandiHub (discreet) -->
			<div class="premium-note" id="premium">
				<span class="premium-tag">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
					{f.premiumTag}
				</span>
				<p>{f.premiumNote}</p>
				<span class="premium-soon">{f.soon}</span>
			</div>
		</div>
	</section>

	<!-- ─── ZOE MILANO + ENQUIRY ─── -->
	<section class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container detail-layout">
			<div class="zoe">
				<span class="section-kicker">ZOE MILANO</span>
				<h2>{f.zoeHeading}</h2>
				<p>{f.zoeDesc}</p>
				<a href="/usluge" class="zoe-link">
					<span class="zoe-icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><path d="M10 13l-2 2 2 2M14 13l2 2-2 2"/></svg>
					</span>
					<span class="zoe-title">{f.zoeCta}</span>
					<span class="zoe-arrow" aria-hidden="true">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<p class="zoe-disclaimer">{f.disclaimer}</p>
			</div>

			<div class="form-wrap" id="upit">
				{#if submitted}
					<div class="success-state">
						<div class="success-icon">
							<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
						</div>
						<h3>{i18n.t.ui.contact.sent}</h3>
						<p>{i18n.t.ui.contact.sentDesc}</p>
						<button class="btn-submit" onclick={resetForm}>{i18n.t.ui.contact.newMessage}</button>
					</div>
				{:else}
					<form use:enhance={submit} class="inquiry-form" method="POST">
						<input type="hidden" name="topic" value={f.heading} />
						<input type="text" name="website_hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
						<div class="form-head">
							<span class="form-icon" aria-hidden="true">{@render instrumentIcon(2)}</span>
							<div>
								<h2>{f.formHeading}</h2>
								<p class="form-sub">{f.formSub}</p>
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
	.back-link:hover { color: #FAF9F6; background: rgba(255,255,255,0.12); }
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
	.page-sub { font-size: 1.08rem; line-height: 1.65; color: rgba(250,249,246,0.8); max-width: 58ch; margin-bottom: 2.25rem; }
	.hero-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }

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

	.board {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		padding: 1.1rem;
		border-radius: 26px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}
	.board-head { display: flex; align-items: center; gap: 0.6rem; padding: 0.3rem 0.4rem 0.6rem; }
	.board-dot { width: 7px; height: 7px; border-radius: 50%; background: #7fd1b2; box-shadow: 0 0 0 3px rgba(127,209,178,0.2); }
	.board-title { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(250,249,246,0.7); }
	.board-row {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.6rem 0.75rem;
		border-radius: 14px;
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
	}
	.board-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 11px;
		color: #FAF9F6;
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
	}
	.board-icon :global(svg) { width: 18px; height: 18px; }
	.board-name { font-size: 0.92rem; font-weight: 700; }

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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 50%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 50%);
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

	.ins-grid { display: grid; grid-template-columns: 1fr; gap: clamp(0.9rem, 2vw, 1.2rem); margin-bottom: 2rem; }
	.ins-card {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		border-radius: var(--radius-2xl);
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 32px -18px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.ins-card:hover { transform: translateY(-4px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 30px 54px -28px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(155,17,30,0.2); }
	.ins-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
	.ins-icon {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: 14px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		box-shadow: 0 12px 22px -10px rgba(11,52,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: background 0.4s ease;
	}
	.ins-card:hover .ins-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.ins-num { font-family: var(--font-heading); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; color: rgba(11,52,102,0.35); }
	.ins-card h2 { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; letter-spacing: -0.02em; color: var(--navy); margin-bottom: 0.4rem; }
	.ins-card p { font-size: 0.88rem; line-height: 1.6; color: #4a525e; }
	/* Digital vouchers: potential instrument, marked with a dashed outline */
	.ins-card.voucher { box-shadow: 0 1px 2px rgba(15,23,42,0.04), inset 0 0 0 1px rgba(242,193,78,0.5); background: linear-gradient(180deg, #fffdf6 0%, #fbf7ec 100%); }

	.notes { display: grid; grid-template-columns: 1fr; gap: 0.85rem; margin-bottom: 1.25rem; }
	.note {
		display: flex;
		align-items: flex-start;
		gap: 0.9rem;
		padding: 1.1rem 1.2rem;
		border-radius: 18px;
		background: #ffffff;
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.12);
	}
	.note-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		color: var(--navy);
		background: rgba(11,52,102,0.08);
	}
	.note.warn { background: #fffaf0; box-shadow: inset 0 0 0 1px rgba(242,193,78,0.5); }
	.note.warn .note-icon { color: #9a6b00; background: rgba(242,193,78,0.2); }
	.note h3 { font-family: var(--font-heading); font-size: 0.95rem; font-weight: 800; color: var(--navy); margin-bottom: 0.25rem; }
	.note p { font-size: 0.88rem; line-height: 1.6; color: #4a525e; }

	/* Discreet Premium note */
	.premium-note {
		scroll-margin-top: calc(var(--nav-h) + 2rem);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1rem;
		padding: 1rem 1.2rem;
		border-radius: 18px;
		background: linear-gradient(135deg, rgba(246,210,122,0.12), rgba(255,255,255,0.6));
		box-shadow: inset 0 0 0 1px rgba(226,180,76,0.4);
	}
	.premium-note p { flex: 1 1 320px; font-size: 0.9rem; line-height: 1.55; color: var(--navy); }
	.premium-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.28rem 0.75rem;
		border-radius: 50px;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #3d2a00;
		background: linear-gradient(160deg, #f6d27a, #e2b44c);
	}
	.premium-soon {
		padding: 0.2rem 0.6rem;
		border-radius: 50px;
		font-size: 0.64rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #9a6b00;
		background: rgba(242,193,78,0.16);
		box-shadow: inset 0 0 0 1px rgba(242,193,78,0.45);
	}

	/* ZOE MILANO + form */
	.detail-layout { display: grid; grid-template-columns: 1fr; gap: clamp(2rem, 5vw, 3.5rem); align-items: start; }
	.zoe h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		color: var(--navy);
		margin-bottom: 0.8rem;
	}
	.zoe > p { font-size: 1rem; line-height: 1.65; color: #4a525e; margin-bottom: 1.5rem; max-width: 52ch; }
	.zoe-link {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		max-width: 360px;
		padding: 0.7rem;
		border-radius: 16px;
		text-decoration: none;
		color: var(--navy);
		background: #ffffff;
		box-shadow: 0 12px 24px -18px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: box-shadow 0.3s ease;
	}
	.zoe-link:hover { box-shadow: 0 16px 30px -18px rgba(15,23,42,0.35), inset 0 0 0 1px rgba(155,17,30,0.25); }
	.zoe-link:focus-visible { outline: 2px solid var(--cta); outline-offset: 2px; }
	.zoe-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; color: #FAF9F6; background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%); transition: background 0.3s ease; }
	.zoe-link:hover .zoe-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.zoe-title { flex: 1; font-weight: 700; }
	.zoe-arrow { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(11,52,102,0.18); transition: background 0.3s ease, color 0.3s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1); }
	.zoe-link:hover .zoe-arrow { color: #FAF9F6; background: var(--cta); transform: rotate(45deg); }
	.zoe-disclaimer { margin-top: 1.25rem; font-size: 0.8rem; line-height: 1.55; color: #6b7380; max-width: 52ch; }

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
	.success-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 2.5rem 1rem; text-align: center; }
	.success-icon { display: grid; place-items: center; width: 68px; height: 68px; margin-bottom: 0.5rem; border-radius: 50%; color: var(--success); background: rgba(63,143,116,0.12); box-shadow: 0 0 0 8px rgba(63,143,116,0.06); }
	.success-state h3 { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; letter-spacing: -0.03em; color: var(--navy); }
	.success-state p { font-size: 0.98rem; color: #4a525e; margin-bottom: 1rem; }
	.success-state .btn-submit { width: auto; justify-content: center; padding: 0.85rem 1.6rem; }

	/* ─── Responsive ─── */
	@media (min-width: 600px) {
		.ins-grid { grid-template-columns: repeat(2, 1fr); }
		.form-row { grid-template-columns: 1fr 1fr; }
		.notes { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 900px) {
		.hero-grid { grid-template-columns: 1.15fr 0.85fr; }
		.detail-layout { grid-template-columns: 1fr 1.05fr; }
		.form-wrap { position: sticky; top: calc(var(--nav-h) + 1.5rem); }
	}
	@media (min-width: 1100px) {
		.ins-grid { grid-template-columns: repeat(5, 1fr); }
	}
	@media (prefers-reduced-motion: reduce) {
		.btn-main, .btn-main-arrow, .ins-card, .btn-submit, .zoe-arrow { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .ins-card:hover, .btn-submit:hover:not(:disabled), .zoe-link:hover .zoe-arrow { transform: none; }
	}
</style>

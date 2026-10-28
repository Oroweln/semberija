<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { page } from '$app/stores';
	import { categories } from '$lib/data';
	import { enquiryTypes, enquiryFields, isEnquiryType, type EnquiryType, type EnquiryField } from '$lib/enquiry';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import FormError from '$lib/components/FormError.svelte';

	// Enquiry type and company can be preset with ?tip=<type>&firma=<name>
	let type = $state<EnquiryType>('registracija');
	let submitted = $state(false);
	let values = $state<Record<string, string>>({});

	$effect(() => {
		const params = $page.url.searchParams;
		const tip = params.get('tip');
		if (isEnquiryType(tip)) type = tip;
		const firma = params.get('firma');
		if (firma) values.company = firma;
	});

	const e = $derived(i18n.t.enquiry);
	const c = $derived(i18n.t.ui.contact);
	const config = $derived(enquiryFields[type]);
	const shows = (f: EnquiryField) => config.fields.includes(f);
	const req = (f: EnquiryField) => config.required.includes(f);

	const industries = $derived(
		categories.map((c) => (i18n.lang === 'sr' ? c.name_sr : c.name_en)).sort((a, b) => a.localeCompare(b))
	);

	const topics = $derived([
		{ title: c.regTitle, desc: c.regDesc },
		{ title: c.digitalTitle, desc: c.digitalDesc },
		{ title: c.advertisingTitle, desc: c.advertisingDesc }
	]);

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
		`mailto:info@zoemilano.com?subject=${encodeURIComponent('Semberija.app — ' + e.types[type])}&body=${encodeURIComponent(values.message ?? '')}`
	);

	// Ambient video: plays only while on screen, never autoplays with reduced motion
	let video = $state<HTMLVideoElement>();
	let paused = $state(true);
	let userPaused = false;
	const videoLabels: Record<string, { play: string; pause: string }> = {
		sr: { play: 'Pokreni video', pause: 'Pauziraj video' },
		en: { play: 'Play video', pause: 'Pause video' },
		it: { play: 'Riproduci video', pause: 'Metti in pausa' },
		ru: { play: 'Воспроизвести видео', pause: 'Приостановить видео' },
		de: { play: 'Video abspielen', pause: 'Video pausieren' }
	};

	$effect(() => {
		if (!video) return;
		const el = video;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !userPaused) el.play().catch(() => {});
			else if (!entry.isIntersecting) el.pause();
		}, { threshold: 0.25 });
		io.observe(el);
		return () => io.disconnect();
	});

	function toggleVideo() {
		if (!video) return;
		if (video.paused) {
			userPaused = false;
			video.play().catch(() => {});
		} else {
			userPaused = true;
			video.pause();
		}
	}

	function reset() {
		submitted = false;
		error = null;
		values = {};
	}
</script>

<svelte:head>
	<title>{i18n.t.nav.contact} — Semberija.app</title>
	<meta name="description" content={c.sub} />
</svelte:head>

{#snippet topicIcon(i: number)}
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if i === 0}
			<path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-5h6v5M9 10h.01M15 10h.01"/>
		{:else if i === 1}
			<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4M9 8l-2 2 2 2M15 8l2 2-2 2"/>
		{:else}
			<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/>
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
				<span class="page-label"><span class="page-label-dot"></span>{i18n.t.nav.contact}</span>
				<h1>{c.heading}</h1>
				<p class="page-sub">{c.sub}</p>
				<div class="hero-actions">
					<a href="#forma" class="btn-main">
						<span>{c.send}</span>
						<span class="btn-main-arrow" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
						</span>
					</a>
					<a href="mailto:info@zoemilano.com" class="btn-ghost">info@zoemilano.com</a>
				</div>
			</div>

			<!-- Contact card -->
			<div class="board">
				<div class="board-head">
					<span class="board-title">Semberija<em>.app</em></span>
					<span class="board-live"><span class="live-dot" aria-hidden="true"></span>{i18n.t.nav.contact}</span>
				</div>
				<a class="board-row" href="mailto:info@zoemilano.com">
					<span class="board-icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
					</span>
					<span class="board-text">
						<span class="board-k">Email</span>
						<span class="board-v">info@zoemilano.com</span>
					</span>
					<span class="board-arrow" aria-hidden="true">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<div class="board-row">
					<span class="board-icon" aria-hidden="true">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
					</span>
					<span class="board-text">
						<span class="board-k">{i18n.t.ui.location}</span>
						<span class="board-v">Bijeljina, Republika Srpska, BiH</span>
					</span>
				</div>
				<div class="board-tags">
					{#each topics as t}
						<span class="board-tag">{t.title}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ─── BODY ─── -->
	<section class="page-body reveal-card" use:reveal>
		<div class="body-backdrop" aria-hidden="true"></div>
		<div class="container contact-layout">
			<aside class="contact-info">
				<span class="section-kicker">{e.typeLabel}</span>
				<ul class="topics">
					{#each topics as t, i}
						<li class="topic">
							<span class="topic-icon">{@render topicIcon(i)}</span>
							<span class="topic-copy">
								<h3>{t.title}</h3>
								<p>{t.desc}</p>
							</span>
							<span class="topic-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						</li>
					{/each}
				</ul>

				<figure class="media" class:playing={!paused}>
					<figcaption class="media-cap">
						<span class="media-place">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
							Bijeljina · Semberija
						</span>
						<span class="media-coords">44.757° N · 19.214° E</span>
					</figcaption>
					<div class="media-frame">
						<video
							bind:this={video}
							bind:paused
							src="/kontakt-video.mp4"
							poster="/kontakt-video-poster.jpg"
							muted
							loop
							playsinline
							preload="metadata"
							aria-hidden="true"
						></video>
						<span class="media-shade" aria-hidden="true"></span>
						<span class="media-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
						<span class="media-ai">{i18n.t.aiVideo}</span>
						<button
							type="button"
							class="media-toggle"
							onclick={toggleVideo}
							aria-label={paused ? videoLabels[i18n.lang].play : videoLabels[i18n.lang].pause}
						>
							{#if paused}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 001.5.86l12.5-7.5a1 1 0 000-1.72L8.5 3.64A1 1 0 007 4.5z"/></svg>
							{:else}
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1.2"/><rect x="14" y="4" width="4" height="16" rx="1.2"/></svg>
							{/if}
						</button>
					</div>
				</figure>

				<div class="process">
					<span class="section-kicker">{c.processLabel}</span>
					<ol class="steps">
						{#each c.process as step, i}
							<li class="step">
								<span class="step-node" aria-hidden="true">{i + 1}</span>
								<p><strong>{step.title}</strong> {step.desc}</p>
							</li>
						{/each}
					</ol>
				</div>
			</aside>

			<div class="form-wrap" id="forma">
				{#if submitted}
					<div class="success-state">
						<div class="success-icon">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
								<polyline points="22 4 12 14.01 9 11.01"/>
							</svg>
						</div>
						<h3>{c.sent}</h3>
						<p>{c.sentDesc}</p>
						<button class="btn-submit" onclick={reset}>
							<span>{c.newMessage}</span>
						</button>
					</div>
				{:else}
					<form use:enhance={submit} class="contact-form" method="POST">
						<div class="form-head">
							<span class="form-icon" aria-hidden="true">
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
							</span>
							<h2>{c.heading}</h2>
						</div>

						<!-- Spam trap: hidden from people, filled by bots -->
						<input type="text" name="website_hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

						<!-- Enquiry type -->
						<fieldset class="type-picker">
							<legend>{e.typeLabel}</legend>
							<div class="type-grid">
								{#each enquiryTypes as t}
									<label class="type-option" class:active={type === t}>
										<input type="radio" name="type" value={t} bind:group={type} />
										<span class="type-radio" aria-hidden="true"></span>
										<span>{e.types[t]}</span>
									</label>
								{/each}
							</div>
							<p class="type-hint">{e.hints[type]}</p>
						</fieldset>

						<!-- Company details (fields depend on the enquiry type) -->
						<fieldset class="section">
							<legend>{e.companySection}</legend>

							<div class="form-group">
								<label for="company">{c.companyName}{req('company') ? ' *' : ''}</label>
								<input id="company" name="company" type="text" bind:value={values.company} required={req('company')} placeholder={c.companyPlaceholder} />
							</div>

							{#if shows('role')}
								<div class="form-group">
									<label for="role">{e.role}{req('role') ? ' *' : ''}</label>
									<input id="role" name="role" type="text" bind:value={values.role} required={req('role')} placeholder={e.rolePlaceholder} />
								</div>
							{/if}

							{#if shows('industry') || shows('location')}
								<div class="form-row">
									{#if shows('industry')}
										<div class="form-group">
											<label for="industry">{e.industry}{req('industry') ? ' *' : ''}</label>
											<select id="industry" name="industry" bind:value={values.industry} required={req('industry')}>
												<option value="">{e.industryPlaceholder}</option>
												{#each industries as ind}
													<option value={ind}>{ind}</option>
												{/each}
												<option value="other">{e.industryOther}</option>
											</select>
										</div>
									{/if}
									{#if shows('location')}
										<div class="form-group">
											<label for="location">{e.location}{req('location') ? ' *' : ''}</label>
											<input id="location" name="location" type="text" bind:value={values.location} required={req('location')} placeholder={e.locationPlaceholder} />
										</div>
									{/if}
								</div>
							{/if}

							{#if shows('website') || shows('phone')}
								<div class="form-row">
									{#if shows('website')}
										<div class="form-group">
											<label for="website">{e.website} <span class="opt">({e.optional})</span></label>
											<input id="website" name="website" type="url" bind:value={values.website} placeholder="https://" />
										</div>
									{/if}
									{#if shows('phone')}
										<div class="form-group">
											<label for="phone">{e.phone} <span class="opt">({e.optional})</span></label>
											<input id="phone" name="phone" type="tel" bind:value={values.phone} placeholder="+387" />
										</div>
									{/if}
								</div>
							{/if}

							<div class="form-row extras">
							{#each [['products', e.products, e.productsPlaceholder], ['offers', e.offers, e.offersPlaceholder], ['interests', e.interests, e.interestsPlaceholder], ['markets', e.markets, e.marketsPlaceholder]] as [field, label, placeholder]}
								{#if shows(field as EnquiryField)}
									<div class="form-group">
										<label for={field}>{label} <span class="opt">({e.optional})</span></label>
										{#if field === 'markets'}
											<input id={field} name={field} type="text" bind:value={values[field]} {placeholder} />
										{:else}
											<textarea id={field} name={field} rows="2" bind:value={values[field]} {placeholder}></textarea>
										{/if}
									</div>
								{/if}
							{/each}
							</div>
						</fieldset>

						<!-- Contact details -->
						<fieldset class="section">
							<legend>{e.contactSection}</legend>
							<div class="form-row">
								<div class="form-group">
									<label for="name">{c.fullName} *</label>
									<input id="name" name="name" type="text" bind:value={values.name} required placeholder={c.namePlaceholder} />
								</div>
								<div class="form-group">
									<label for="email">Email *</label>
									<input id="email" name="email" type="email" bind:value={values.email} required placeholder={c.emailPlaceholder} />
								</div>
							</div>
							<div class="form-group">
								<label for="message">{c.message} *</label>
								<textarea id="message" name="message" bind:value={values.message} required rows="4" placeholder={c.messagePlaceholder}></textarea>
							</div>
						</fieldset>

						<FormError {error} {mailto} />

						<button type="submit" class="btn-submit" disabled={sending}>
							<span>{sending ? i18n.t.formStatus.sending : c.send}</span>
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
	.page-sub { font-size: 1.1rem; line-height: 1.65; color: rgba(250,249,246,0.8); max-width: 54ch; margin-bottom: 2rem; }
	.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; }
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
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		padding: 0.95rem 1.4rem;
		border-radius: 50px;
		font-size: 0.92rem;
		font-weight: 600;
		text-decoration: none;
		color: #FAF9F6;
		background: rgba(255,255,255,0.06);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.22);
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}
	.btn-ghost:hover { background: rgba(255,255,255,0.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4); }
	.btn-ghost:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	/* Contact card */
	.board {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		max-width: 460px;
		width: 100%;
		margin: 0 auto;
		padding: 1.2rem;
		border-radius: 22px;
		background: linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12), 0 40px 80px -36px rgba(0,0,0,0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}
	.board-head { display: flex; align-items: baseline; justify-content: space-between; padding-bottom: 0.75rem; margin-bottom: 0.2rem; border-bottom: 1px solid rgba(255,255,255,0.12); }
	.board-title { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 800; letter-spacing: -0.03em; }
	.board-title em { font-style: normal; color: #f06a75; }
	.board-live { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(250,249,246,0.65); }
	.live-dot { width: 6px; height: 6px; border-radius: 50%; background: #5fd3a5; box-shadow: 0 0 0 3px rgba(95,211,165,0.22); }
	.board-row {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.8rem;
		border-radius: 16px;
		color: #FAF9F6;
		text-decoration: none;
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
		transition: background 0.3s ease;
	}
	a.board-row:hover { background: rgba(255,255,255,0.1); }
	a.board-row:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }
	.board-icon { display: grid; place-items: center; flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(150deg, #2a6cc0, #0b3466); box-shadow: inset 0 1px 0 rgba(255,255,255,0.2); }
	.board-row:first-of-type .board-icon { background: linear-gradient(150deg, #c42a38, var(--cta)); }
	.board-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.1rem; }
	.board-k { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(250,249,246,0.55); }
	.board-v { font-size: 0.95rem; font-weight: 600; overflow-wrap: anywhere; }
	.board-arrow { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25); transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), background 0.3s ease; }
	a.board-row:hover .board-arrow { transform: rotate(45deg); background: rgba(255,255,255,0.12); }
	.board-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; padding-top: 0.4rem; }
	.board-tag { padding: 0.35rem 0.75rem; border-radius: 50px; font-size: 0.74rem; font-weight: 600; color: rgba(250,249,246,0.85); background: rgba(255,255,255,0.06); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14); }

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
	.contact-layout { display: grid; grid-template-columns: 1fr; gap: clamp(2rem, 4vw, 3.5rem); align-items: start; }

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
	.topics { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; margin: 0 0 1.5rem; padding: 0; }
	.topic {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.15rem 1.2rem;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 30px -22px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
	}
	.topic::before {
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
	.topic:hover { transform: translateY(-2px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 24px 40px -24px rgba(15,23,42,0.35), inset 0 0 0 1px rgba(15,23,42,0.08); }
	.topic:hover::before { transform: scaleX(1); }
	.topic-icon {
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
	.topic:hover .topic-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.topic-copy { flex: 1; min-width: 0; }
	.topic-copy h3 { font-family: var(--font-heading); font-size: 1.02rem; font-weight: 800; letter-spacing: -0.02em; color: var(--navy); margin-bottom: 0.3rem; }
	.topic-copy p { font-size: 0.9rem; line-height: 1.6; color: #4a525e; }
	.topic-num { font-family: var(--font-heading); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; color: rgba(11,52,102,0.3); }

	/* Ambient video (passe-partout card) */
	.media {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 0;
		padding: 0.55rem 0.55rem 0.85rem;
		border-radius: 26px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 40px 70px -40px rgba(15,23,42,0.55), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.media-frame {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		aspect-ratio: 1024 / 736;
		border-radius: 20px;
		background: #0b1524 url('/kontakt-video-poster.jpg') center / cover;
	}
	.media-frame video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.04);
		transition: transform 6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease;
		filter: saturate(0.9) contrast(1.04);
	}
	.media.playing .media-frame video { transform: scale(1.1); }
	.media:hover .media-frame video { filter: saturate(1.05) contrast(1.06); }
	.media-shade {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			linear-gradient(180deg, rgba(8,14,26,0.35) 0%, transparent 30%, transparent 55%, rgba(8,14,26,0.7) 100%),
			radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(8,14,26,0.35) 100%);
	}
	.media-corners i {
		position: absolute;
		width: 18px;
		height: 18px;
		border: 0 solid rgba(250,249,246,0.75);
		pointer-events: none;
	}
	.media-corners i:nth-child(1) { top: 14px; left: 14px; border-top-width: 2px; border-left-width: 2px; border-top-left-radius: 6px; }
	.media-corners i:nth-child(2) { top: 14px; right: 14px; border-top-width: 2px; border-right-width: 2px; border-top-right-radius: 6px; }
	.media-corners i:nth-child(3) { bottom: 14px; left: 14px; border-bottom-width: 2px; border-left-width: 2px; border-bottom-left-radius: 6px; }
	.media-corners i:nth-child(4) { bottom: 14px; right: 14px; border-bottom-width: 2px; border-right-width: 2px; border-bottom-right-radius: 6px; }
	.media-toggle {
		position: absolute;
		right: 22px;
		bottom: 22px;
		display: grid;
		place-items: center;
		width: 46px;
		height: 46px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		color: #FAF9F6;
		background: rgba(8,14,26,0.35);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35), 0 10px 24px -10px rgba(0,0,0,0.6);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		cursor: pointer;
		transition: background 0.3s ease, color 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.media-ai {
		position: absolute;
		left: 44px;
		bottom: 16px;
		font-size: 0.66rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		color: rgba(250,249,246,0.7);
		text-shadow: 0 1px 4px rgba(0,0,0,0.5);
		pointer-events: none;
	}
	.media-toggle:hover { color: var(--cta); background: #FAF9F6; transform: scale(1.06); }
	.media-toggle:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }
	.media-cap {
		order: 2;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.4rem 1rem;
		padding: 0 0.6rem;
	}
	.media-place { display: inline-flex; align-items: center; gap: 0.45rem; font-family: var(--font-heading); font-size: 0.95rem; font-weight: 800; letter-spacing: -0.01em; color: var(--navy); }
	.media-place svg { color: var(--cta); }
	.media-coords { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em; color: #8a919c; font-variant-numeric: tabular-nums; }

	/* Enquiry process (compact) */
	.process {
		margin-top: 1.25rem;
		padding: 1.15rem 1.25rem 1.2rem;
		border-radius: 22px;
		background: linear-gradient(160deg, #ffffff 0%, #f7f6f2 100%);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 30px -22px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.process .section-kicker { margin-bottom: 0.85rem; }
	.steps { position: relative; display: flex; flex-direction: column; gap: 0.7rem; list-style: none; margin: 0; padding: 0; }
	.steps::before {
		content: '';
		position: absolute;
		left: 12px;
		top: 14px;
		bottom: 14px;
		width: 2px;
		border-radius: 2px;
		background: linear-gradient(180deg, var(--cta) 0%, #1c5aa8 100%);
		opacity: 0.3;
	}
	.step { position: relative; display: flex; align-items: flex-start; gap: 0.85rem; }
	.step-node {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		font-family: var(--font-heading);
		font-size: 0.74rem;
		font-weight: 800;
		color: var(--navy);
		background: #ffffff;
		box-shadow: inset 0 0 0 1.5px rgba(11,52,102,0.22), 0 0 0 4px #f9f8f5;
	}
	.step:first-child .step-node { color: #FAF9F6; background: linear-gradient(150deg, #c42a38, var(--cta)); box-shadow: 0 8px 16px -8px rgba(155,17,30,0.6), 0 0 0 4px #fbfaf7; }
	.step p { padding-top: 0.15rem; font-size: 0.86rem; line-height: 1.55; color: #4a525e; }
	.step strong { display: block; font-family: var(--font-heading); font-size: 0.92rem; font-weight: 800; letter-spacing: -0.015em; color: var(--navy); }

	/* Form */
	.form-wrap {
		scroll-margin-top: calc(var(--nav-h) + 1.5rem);
		padding: clamp(1.5rem, 3.5vw, 2.4rem);
		border-radius: 26px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 40px 80px -40px rgba(15,23,42,0.35), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.form-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem; }
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
	.form-head h2 { font-family: var(--font-heading); font-size: clamp(1.35rem, 2.4vw, 1.7rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; color: var(--navy); }

	fieldset { border: none; padding: 0; margin: 0 0 1.25rem; min-width: 0; }
	legend {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.9rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--navy);
	}
	.section { padding-top: 1.25rem; border-top: 1px solid rgba(15,23,42,0.08); }

	.type-grid { display: flex; flex-wrap: wrap; gap: 0.45rem; }
	.type-option {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.55rem;
		min-height: 42px;
		padding: 0.5rem 0.95rem 0.5rem 0.75rem;
		border-radius: 50px;
		background: #f4f3ef;
		box-shadow: inset 0 0 0 1px rgba(15,23,42,0.06);
		font-size: 0.88rem;
		font-weight: 600;
		color: var(--navy);
		cursor: pointer;
		transition: background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
	}
	.type-option input { position: absolute; opacity: 0; width: 1px; height: 1px; }
	.type-radio {
		position: relative;
		flex-shrink: 0;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: inset 0 0 0 1.5px rgba(15,23,42,0.25);
		transition: box-shadow 0.25s ease;
	}
	.type-radio::after {
		content: '';
		position: absolute;
		inset: 4px;
		border-radius: 50%;
		background: var(--cta);
		transform: scale(0);
		transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
	}
	.type-option:hover { background: #ffffff; box-shadow: inset 0 0 0 1px rgba(11,52,102,0.25); }
	.type-option.active { color: var(--cta); background: rgba(155,17,30,0.05); box-shadow: inset 0 0 0 1.5px rgba(155,17,30,0.55); }
	.type-option.active .type-radio { box-shadow: inset 0 0 0 1.5px var(--cta); }
	.type-option.active .type-radio::after { transform: scale(1); }
	.type-option:has(input:focus-visible) { outline: 2px solid var(--cta); outline-offset: 2px; }
	.type-hint {
		margin-top: 0.85rem;
		padding: 0.85rem 1rem;
		border-radius: 14px;
		font-size: 0.9rem;
		line-height: 1.55;
		color: #3d4450;
		background: linear-gradient(90deg, rgba(155,17,30,0.06), rgba(155,17,30,0.01));
		box-shadow: inset 3px 0 0 var(--cta);
	}

	.form-row { display: grid; grid-template-columns: 1fr; gap: 0 1rem; }
	.form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
	.form-group label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #6b7380; }
	.opt { font-weight: 500; letter-spacing: 0.04em; text-transform: none; color: #8a919c; }
	.form-group input, .form-group select, .form-group textarea {
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
	.form-group select {
		appearance: none;
		padding-right: 2.6rem;
		cursor: pointer;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230b3466' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1rem center;
	}
	.form-group textarea { resize: vertical; min-height: 120px; line-height: 1.55; }
	.extras textarea { min-height: 84px; }
	.form-group input::placeholder, .form-group textarea::placeholder { color: #8a919c; }
	.form-group input:focus, .form-group select:focus, .form-group textarea:focus { background-color: #ffffff; box-shadow: inset 0 0 0 1px rgba(155,17,30,0.45), 0 0 0 4px rgba(155,17,30,0.1); }

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
	.btn-submit-arrow { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; color: var(--cta); background: #FAF9F6; transition: transform 0.45s cubic-bezier(0.22,1,0.36,1); }
	.btn-submit:hover:not(:disabled) { transform: translateY(-2px); }
	.btn-submit:hover:not(:disabled) .btn-submit-arrow { transform: rotate(15deg); }
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
	@media (min-width: 600px) {
		.form-row { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 900px) {
		.hero-grid { grid-template-columns: 1.15fr 0.85fr; }
		.contact-layout { grid-template-columns: 0.85fr 1.15fr; }
		.contact-info { position: sticky; top: calc(var(--nav-h) + 1.5rem); }
	}
	@media (prefers-reduced-motion: reduce) {
		.btn-main, .btn-main-arrow, .btn-submit, .btn-submit-arrow, .topic, .topic::before, .topic-icon, .board-arrow, .type-radio::after, .media-frame video, .media-toggle { transition: none; }
		.media.playing .media-frame video { transform: scale(1.04); }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .topic:hover, a.board-row:hover .board-arrow, .btn-submit:hover:not(:disabled), .btn-submit:hover:not(:disabled) .btn-submit-arrow { transform: none; }
	}
</style>

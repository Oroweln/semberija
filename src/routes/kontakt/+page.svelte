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
	const config = $derived(enquiryFields[type]);
	const shows = (f: EnquiryField) => config.fields.includes(f);
	const req = (f: EnquiryField) => config.required.includes(f);

	const industries = $derived(
		categories.map((c) => (i18n.lang === 'sr' ? c.name_sr : c.name_en)).sort((a, b) => a.localeCompare(b))
	);

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

	function reset() {
		submitted = false;
		error = null;
		values = {};
	}
</script>

<svelte:head>
	<title>{i18n.t.nav.contact} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<p class="page-label">{i18n.t.nav.contact}</p>
		<h1>{i18n.t.ui.contact.heading}</h1>
		<p class="page-sub">{i18n.t.ui.contact.sub}</p>
	</div>
</div>

<div class="contact-body reveal-card" use:reveal>
	<div class="container contact-layout">

		<div class="contact-info">
			<div class="info-block">
				<h3>{i18n.t.ui.contact.regTitle}</h3>
				<p>{i18n.t.ui.contact.regDesc}</p>
			</div>

			<div class="info-block">
				<h3>{i18n.t.ui.contact.digitalTitle}</h3>
				<p>{i18n.t.ui.contact.digitalDesc}</p>
			</div>

			<div class="info-block">
				<h3>{i18n.t.ui.contact.advertisingTitle}</h3>
				<p>{i18n.t.ui.contact.advertisingDesc}</p>
			</div>

			<div class="contact-details">
				<div class="contact-detail">
					<span class="detail-label">Email</span>
					<a href="mailto:info@zoemilano.com">info@zoemilano.com</a>
				</div>
				<div class="contact-detail">
					<span class="detail-label">{i18n.t.ui.location}</span>
					<span>Bijeljina, Republika Srpska, BiH</span>
				</div>
			</div>

			<div class="contact-img-wrap">
				<video src="/kontakt-video.mp4" class="contact-img" autoplay muted loop playsinline aria-hidden="true"></video>
			</div>
		</div>

		<div class="form-wrap">
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
					<button class="btn-submit" onclick={reset}>
						{i18n.t.ui.contact.newMessage}
					</button>
				</div>
			{:else}
				<form use:enhance={submit} class="contact-form" method="POST">
					<h2>{i18n.t.ui.contact.heading}</h2>

					<!-- Spam trap: hidden from people, filled by bots -->
					<input type="text" name="website_hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

					<!-- Enquiry type -->
					<fieldset class="type-picker">
						<legend>{e.typeLabel}</legend>
						<div class="type-grid">
							{#each enquiryTypes as t}
								<label class="type-option" class:active={type === t}>
									<input type="radio" name="type" value={t} bind:group={type} />
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
							<label for="company">{i18n.t.ui.contact.companyName}{req('company') ? ' *' : ''}</label>
							<input id="company" name="company" type="text" bind:value={values.company} required={req('company')} placeholder={i18n.t.ui.contact.companyPlaceholder} />
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
					</fieldset>

					<!-- Contact details -->
					<fieldset class="section">
						<legend>{e.contactSection}</legend>
						<div class="form-row">
							<div class="form-group">
								<label for="name">{i18n.t.ui.contact.fullName} *</label>
								<input id="name" name="name" type="text" bind:value={values.name} required placeholder={i18n.t.ui.contact.namePlaceholder} />
							</div>
							<div class="form-group">
								<label for="email">Email *</label>
								<input id="email" name="email" type="email" bind:value={values.email} required placeholder={i18n.t.ui.contact.emailPlaceholder} />
							</div>
						</div>
						<div class="form-group">
							<label for="message">{i18n.t.ui.contact.message} *</label>
							<textarea id="message" name="message" bind:value={values.message} required rows="4" placeholder={i18n.t.ui.contact.messagePlaceholder}></textarea>
						</div>
					</fieldset>

					<FormError {error} {mailto} />

					<button type="submit" class="btn-submit" disabled={sending}>
						{sending ? i18n.t.formStatus.sending : i18n.t.ui.contact.send}
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>
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

	.page-top {
		background: var(--surface-dark);
		color: white;
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
		border: 1px solid rgba(255,255,255,0.05);
	}
	.container {
		max-width: var(--max-w);
		margin: 0 auto;
	}
	.page-label {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--silver);
		margin-bottom: 1rem;
		display: block;
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		margin-bottom: 0.75rem;
	}
	.page-sub {
		font-size: 1rem;
		color: rgba(255,255,255, 0.8);
		line-height: 1.65;
	}

	.contact-body {
		background: var(--surface-light);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
		border: 1px solid rgba(255,255,255,0.4);
	}

	.contact-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: start;
	}

	.info-block {
		background: var(--soft-white);
		border-radius: var(--radius-lg);
		padding: 1.5rem 1.75rem;
		margin-bottom: 1rem;
		border: 1px solid rgba(8,14,26,0.05);
	}

	.info-block h3 {
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}

	.info-block p {
		font-size: 0.85rem;
		color: var(--muted);
		line-height: 1.65;
	}

	.contact-details {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 1.25rem 0;
	}

	.contact-detail {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.detail-label {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--silver);
	}

	.contact-detail a,
	.contact-detail span {
		font-size: 0.9rem;
		color: var(--navy);
		text-decoration: none;
	}

	.contact-detail a:hover { color: var(--steel); }

	.contact-img-wrap {
		margin-top: 1.5rem;
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid rgba(8,14,26,0.05);
	}

	.contact-img {
		display: block;
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.form-wrap {
		background: var(--soft-white);
		border-radius: var(--radius-xl);
		padding: 2.5rem;
		border: 1px solid rgba(8,14,26,0.06);
	}

	.contact-form h2 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--navy);
		margin-bottom: 1.75rem;
		letter-spacing: -0.03em;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		margin-bottom: 1.25rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	label {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--navy);
		letter-spacing: 0.01em;
	}

	input, select, textarea {
		font-family: var(--font-sans);
		font-size: 0.9rem;
		color: var(--navy);
		background: var(--soft-white);
		border: 1.5px solid rgba(0,0,0,0.1);
		border-radius: var(--radius);
		padding: 0.7rem 0.9rem;
		outline: none;
		transition: border-color 0.2s, box-shadow 0.2s;
		width: 100%;
	}

	input:focus, select:focus, textarea:focus {
		border-color: var(--steel);
		box-shadow: 0 0 0 3px rgba(36,64,107,0.1);
	}

	textarea { resize: vertical; min-height: 120px; }

	.btn-submit {
		width: 100%;
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--cta-text);
		background: var(--cta);
		border: none;
		border-radius: 10px;
		padding: 0.875rem;
		cursor: pointer;
		transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 5px 20px rgba(5,9,15,0.2);
	}

	.btn-submit:hover {
		opacity: 0.9;
		transform: translateY(-1px);
		box-shadow: 0 7px 28px rgba(5,9,15,0.36);
	}

	/* ── Enquiry type picker ── */
	fieldset { border: none; padding: 0; margin: 0 0 1.5rem; min-width: 0; }
	legend {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--steel);
		margin-bottom: 0.85rem;
	}
	.section {
		padding-top: 1.5rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.type-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;
	}
	.type-option {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 48px;
		padding: 0.6rem 0.9rem;
		border-radius: var(--radius);
		border: 1.5px solid rgba(15,23,42,0.12);
		background: #ffffff;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--navy);
		cursor: pointer;
		transition: border-color 0.2s, background 0.2s, color 0.2s;
	}
	.type-option input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}
	.type-option:hover { border-color: var(--steel); }
	.type-option.active {
		border-color: var(--cta);
		background: rgba(155,17,30,0.06);
		color: var(--cta);
	}
	.type-option:has(input:focus-visible) { outline: 3px solid var(--steel); outline-offset: 2px; }
	.type-hint {
		margin-top: 0.85rem;
		padding: 0.75rem 1rem;
		border-left: 3px solid var(--cta);
		background: #ffffff;
		border-radius: 0 var(--radius) var(--radius) 0;
		font-size: 0.92rem;
		line-height: 1.55;
		color: #3d4450;
	}
	.opt { font-weight: 400; color: var(--muted); }
	.hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
	.btn-submit:disabled { opacity: 0.7; cursor: wait; }

	@media (min-width: 600px) {
		.type-grid { grid-template-columns: repeat(2, 1fr); }
	}

	.success-state {
		text-align: center;
		padding: 3rem 1rem;
	}

	.success-icon {
		width: 64px; height: 64px;
		background: rgba(16,185,129,0.1);
		border-radius: 50%;
		display: flex; align-items: center; justify-content: center;
		color: var(--success);
		margin: 0 auto 1.25rem;
	}

	.success-state h3 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--navy);
		margin-bottom: 0.6rem;
	}

	.success-state p {
		color: var(--muted);
		margin-bottom: 1.75rem;
	}

	@media (min-width: 600px) {
		.form-row { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 768px) {
		.contact-layout { grid-template-columns: 1fr 1.4fr; gap: 4rem; }
	}
</style>

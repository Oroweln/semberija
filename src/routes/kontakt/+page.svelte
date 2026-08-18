<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let subject = $state('listing');
	let message = $state('');
	let submitted = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		submitted = true;
	}
</script>

<svelte:head>
	<title>{i18n.t.nav.contact} — Semberija.app</title>
</svelte:head>

<div class="page-top">
	<div class="container">
		<p class="page-label">{i18n.t.nav.contact}</p>
		<h1>{i18n.t.ui.contact.heading}</h1>
		<p class="page-sub">{i18n.t.ui.contact.sub}</p>
	</div>
</div>

<div class="contact-body">
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
					<a href="mailto:info@semberija.app">info@semberija.app</a>
				</div>
				<div class="contact-detail">
					<span class="detail-label">{i18n.t.ui.location}</span>
					<span>Bijeljina, Republika Srpska, BiH</span>
				</div>
			</div>

			<div class="contact-img-wrap">
				<img src="/gradska%20kuca%20bijeljina.jpg" alt="Bijeljina" class="contact-img" loading="lazy" />
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
					<button class="btn-submit" onclick={() => { submitted = false; name = ''; email = ''; company = ''; message = ''; }}>
						{i18n.t.ui.contact.newMessage}
					</button>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="contact-form">
					<h2>{i18n.t.ui.contact.heading}</h2>

					<div class="form-group">
						<label for="subject">{i18n.t.ui.contact.subject}</label>
						<select id="subject" bind:value={subject}>
							<option value="listing">{i18n.t.ui.contact.optListing}</option>
							<option value="service">{i18n.t.ui.contact.optService}</option>
							<option value="advertising">{i18n.t.ui.contact.optAdvertising}</option>
							<option value="networking">{i18n.t.ui.contact.optNetworking}</option>
							<option value="other">{i18n.t.ui.contact.optOther}</option>
						</select>
					</div>

					<div class="form-row">
						<div class="form-group">
							<label for="name">{i18n.t.ui.contact.fullName} *</label>
							<input id="name" type="text" bind:value={name} required placeholder={i18n.t.ui.contact.namePlaceholder} />
						</div>
						<div class="form-group">
							<label for="email">Email *</label>
							<input id="email" type="email" bind:value={email} required placeholder={i18n.t.ui.contact.emailPlaceholder} />
						</div>
					</div>

					<div class="form-group">
						<label for="company">{i18n.t.ui.contact.companyName}</label>
						<input id="company" type="text" bind:value={company} placeholder={i18n.t.ui.contact.companyPlaceholder} />
					</div>

					<div class="form-group">
						<label for="message">{i18n.t.ui.contact.message} *</label>
						<textarea
							id="message"
							bind:value={message}
							required
							rows="5"
							placeholder={i18n.t.ui.contact.messagePlaceholder}
						></textarea>
					</div>

					<button type="submit" class="btn-submit">
						{i18n.t.ui.contact.send}
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.page-top {
		background: var(--navy);
		color: white;
		padding: 8rem var(--section-px) 4rem;
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}
	.container {
		max-width: var(--max-w);
		margin: 0 auto;
	}
	.page-label {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--cyan);
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
		color: rgba(255,255,255,0.6);
		line-height: 1.65;
	}

	.contact-body {
		background: var(--soft-white);
		padding: 4rem var(--section-px) 6rem;
	}

	.contact-layout {
		display: grid;
		grid-template-columns: 1fr 1.4fr;
		gap: 4rem;
		align-items: start;
	}

	.info-block {
		background: white;
		border-radius: var(--radius-lg);
		padding: 1.5rem 1.75rem;
		margin-bottom: 1rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0,0,0,0.05);
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
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--cyan);
	}

	.contact-detail a,
	.contact-detail span {
		font-size: 0.9rem;
		color: var(--navy);
		text-decoration: none;
	}

	.contact-detail a:hover { color: var(--blue); }

	.contact-img-wrap {
		margin-top: 1.5rem;
		border-radius: var(--radius-lg);
		overflow: hidden;
		box-shadow: var(--shadow-md);
	}

	.contact-img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.form-wrap {
		background: white;
		border-radius: var(--radius-xl);
		padding: 2.5rem;
		box-shadow: var(--shadow-md);
		border: 1px solid rgba(0,0,0,0.05);
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
		grid-template-columns: 1fr 1fr;
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
		border-color: var(--blue);
		box-shadow: 0 0 0 3px rgba(26,86,219,0.1);
	}

	textarea { resize: vertical; min-height: 120px; }

	.btn-submit {
		width: 100%;
		font-family: var(--font-sans);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--navy);
		background: linear-gradient(135deg, var(--cyan), var(--blue-light));
		border: none;
		border-radius: 10px;
		padding: 0.875rem;
		cursor: pointer;
		transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 0 20px rgba(6,182,212,0.25);
	}

	.btn-submit:hover {
		opacity: 0.9;
		transform: translateY(-1px);
		box-shadow: 0 0 28px rgba(6,182,212,0.45);
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

	@media (max-width: 768px) {
		.contact-layout { grid-template-columns: 1fr; }
		.form-row { grid-template-columns: 1fr; }
	}
</style>

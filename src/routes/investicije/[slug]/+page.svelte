<script lang="ts">
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n.svelte';
	import { investmentCategorySlugs } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import FormError from '$lib/components/FormError.svelte';

	const index = $derived((investmentCategorySlugs as readonly string[]).indexOf($page.params.slug ?? ''));
	const category = $derived(index >= 0 ? i18n.t.investments.categories[index] : null);

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let message = $state('');
	let submitted = $state(false);
	let prefilled = false;

	$effect(() => {
		if (category && !prefilled) {
			message = i18n.t.investments.detailPrefill + category.name;
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
		`mailto:info@zoemilano.com?subject=${encodeURIComponent('Semberija.app — ' + (category?.name ?? ''))}&body=${encodeURIComponent(message)}`
	);

	function resetForm() {
		submitted = false;
		error = null;
		name = '';
		email = '';
		company = '';
		message = category ? i18n.t.investments.detailPrefill + category.name : '';
	}
</script>

<svelte:head>
	<title>{category ? category.name : i18n.t.investments.heading} — Semberija.app</title>
	{#if category}
		<meta name="description" content={category.desc} />
	{/if}
</svelte:head>

<div class="page-wrap">
{#if category}
	<div class="page-top reveal-card" use:reveal>
		<div class="container">
			<a href="/investicije" class="back-link">← {i18n.t.investments.detailBack}</a>
			<span class="page-tag">{i18n.t.investments.detailTag}</span>
			<h1>{category.name}</h1>
			<p class="page-sub">{category.desc}</p>
		</div>
	</div>

	<div class="page-body reveal-card" use:reveal>
		<div class="container detail-layout">
			<div class="detail-info">
				<h2>{i18n.t.investments.detailHighlights}</h2>
				<ul class="highlights-list">
					{#each category.highlights as highlight}
						<li>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
							<span>{highlight}</span>
						</li>
					{/each}
				</ul>
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
						<button class="btn-submit" onclick={resetForm}>
							{i18n.t.ui.contact.newMessage}
						</button>
					</div>
				{:else}
					<form use:enhance={submit} class="inquiry-form" method="POST">
						<input type="hidden" name="topic" value={category.name} />
						<input type="text" name="website_hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
						<h2>{i18n.t.investments.detailInquireHeading}</h2>
						<p class="form-sub">{i18n.t.investments.detailInquireSub}</p>

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
							<textarea
								id="message" name="message"
								bind:value={message}
								required
								rows="5"
							></textarea>
						</div>

						<FormError {error} {mailto} />

						<button type="submit" class="btn-submit" disabled={sending}>
							{sending ? i18n.t.formStatus.sending : i18n.t.ui.contact.send}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="page-top reveal-card" use:reveal>
		<div class="container">
			<span class="page-tag">{i18n.t.investments.label}</span>
			<h1>{i18n.t.ui.noResultsShort}</h1>
			<a href="/investicije" class="back-link back-link-inline">← {i18n.t.investments.detailBack}</a>
		</div>
	</div>
{/if}
</div>

<style>
	.hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
	.btn-submit:disabled { opacity: 0.7; cursor: wait; }

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
	.container { max-width: var(--max-w); margin: 0 auto; }

	.back-link {
		display: inline-block;
		font-size: 0.82rem;
		font-weight: 600;
		color: rgba(255,255,255, 0.8);
		text-decoration: none;
		margin-bottom: 1.5rem;
		transition: color 0.2s;
	}
	.back-link:hover { color: white; }
	.back-link-inline { margin-top: 1rem; margin-bottom: 0; }

	.page-tag {
		display: inline-block;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--silver);
		background: rgba(154,164,178,0.1);
		border: 1px solid rgba(154,164,178,0.25);
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		margin-bottom: 1.25rem;
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		margin-bottom: 0.75rem;
	}
	.page-sub { font-size: 1rem; color: rgba(255,255,255, 0.8); max-width: 600px; line-height: 1.65; }

	.page-body {
		background: var(--surface-light);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
		border: 1px solid rgba(255,255,255,0.4);
	}

	.detail-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: start;
	}

	.detail-info h2 {
		font-family: var(--font-heading);
		font-size: 1.3rem;
		font-weight: 800;
		color: var(--navy);
		letter-spacing: -0.02em;
		margin-bottom: 1.25rem;
	}

	.highlights-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.highlights-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		background: var(--soft-white);
		border: 1px solid rgba(8,14,26,0.05);
		border-radius: var(--radius-lg);
		padding: 1rem 1.15rem;
		font-size: 0.9rem;
		color: var(--navy);
		line-height: 1.55;
	}

	.highlights-list svg {
		flex-shrink: 0;
		margin-top: 0.15rem;
		color: var(--steel);
	}

	.form-wrap {
		background: var(--soft-white);
		border-radius: var(--radius-xl);
		padding: 2.5rem;
		border: 1px solid rgba(8,14,26,0.06);
	}

	.inquiry-form h2 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--navy);
		margin-bottom: 0.5rem;
		letter-spacing: -0.03em;
	}

	.form-sub {
		font-size: 0.88rem;
		color: var(--muted);
		line-height: 1.6;
		margin-bottom: 1.75rem;
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

	input, textarea {
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

	input:focus, textarea:focus {
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
	@media (min-width: 900px) {
		.detail-layout { grid-template-columns: 1fr 1.3fr; gap: 3rem; }
	}
</style>

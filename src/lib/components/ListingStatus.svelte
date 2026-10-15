<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { verifiedFirmSlugs } from '$lib/data';
	import { enquiryUrl } from '$lib/enquiry';

	// Shows whether a listing is a verified member or compiled from public sources.
	// part="badge" renders the status pill; part="claim" renders the claim link (public listings only).
	let { slug, name, part = 'badge' }: { slug: string; name: string; part?: 'badge' | 'claim' } = $props();

	const verified = $derived(verifiedFirmSlugs.includes(slug));
	const l = $derived(i18n.t.listing);
</script>

{#if part === 'badge'}
	<span class="status" class:verified title={verified ? l.verifiedHint : l.publicHint}>
		{#if verified}
			<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
		{:else}
			<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>
		{/if}
		{verified ? l.verified : l.public}
	</span>
{:else if !verified}
	<a class="claim" href={enquiryUrl('preuzimanje', name)}>{l.claim}</a>
{/if}

<style>
	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		align-self: flex-start;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: #4a525e;
		background: rgba(15,23,42,0.05);
		border: 1px solid rgba(15,23,42,0.12);
		border-radius: 50px;
		padding: 0.25rem 0.65rem;
		margin-bottom: 0.85rem;
		cursor: help;
	}
	.status.verified {
		color: #ffffff;
		background: var(--success);
		border-color: var(--success);
	}
	.claim {
		display: block;
		margin-top: 0.75rem;
		text-align: center;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--steel);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.claim:hover { color: var(--cta); }
</style>

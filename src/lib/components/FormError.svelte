<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	// Honest failure message for enquiry forms, with a direct email fallback.
	let { error, mailto }: { error: string | null; mailto: string } = $props();
</script>

{#if error}
	<div class="form-error" role="alert">
		{#if error === 'invalid'}
			{i18n.t.formStatus.invalid}
		{:else}
			{error === 'not-configured' ? i18n.t.formStatus.notConfigured : i18n.t.formStatus.sendFailed}
			<a href={mailto}>info@zoemilano.com</a>
		{/if}
	</div>
{/if}

<style>
	.form-error {
		margin-bottom: 1.25rem;
		padding: 0.9rem 1.1rem;
		border-radius: var(--radius);
		background: #fff4f4;
		border: 1px solid rgba(155,17,30,0.35);
		color: #5a0a12;
		font-size: 0.95rem;
		line-height: 1.55;
	}
	.form-error a { font-weight: 700; color: var(--cta); }
</style>

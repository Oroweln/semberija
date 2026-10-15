<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { howSteps } from '$lib/platform';

	// Content only; the page provides the surrounding section (light or dark).
	let { theme = 'light' }: { theme?: 'light' | 'dark' } = $props();

	const h = $derived(i18n.t.howItWorks);
</script>

<div class="how" class:dark={theme === 'dark'}>
	<div class="how-head">
		<span class="how-tag">{h.label}</span>
		<h2>{h.heading}</h2>
	</div>

	<ol class="how-steps">
		{#each h.steps as step, i}
			{@const meta = howSteps[i]}
			<li class="how-step">
				<div class="how-step-top">
					<span class="how-num">{String(i + 1).padStart(2, '0')}</span>
					<span class="how-mode" class:online={meta.mode === 'online'}>
						{meta.mode === 'online' ? h.online : h.manual}
					</span>
				</div>
				<h3>{step.title}</h3>
				<p>{step.desc}</p>
				{#if meta.href && step.link}
					<a href={meta.href} class="how-link">
						{step.link}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
					</a>
				{/if}
			</li>
		{/each}
	</ol>

	<p class="how-note">
		<span class="how-mode" aria-hidden="true">{h.manual}</span>
		{h.note}
	</p>
</div>

<style>
	.how-head { max-width: 760px; margin: 0 auto 3rem; text-align: center; }
	.how-tag {
		display: inline-block;
		font-size: 0.8rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
		color: var(--steel); background: rgba(36,64,107,0.08); border: 1px solid rgba(36,64,107,0.2);
		padding: 0.35rem 0.95rem; border-radius: 50px; margin-bottom: 1rem;
	}
	.how-head h2 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 4vw, 3.2rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.08;
		text-wrap: balance;
		color: var(--navy);
	}
	.how-head h2::after {
		content: '';
		display: block;
		width: 56px;
		height: 4px;
		margin: 1.1rem auto 0;
		border-radius: 2px;
		background: var(--accent-line);
	}

	.how-steps {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}
	.how-step {
		display: flex;
		flex-direction: column;
		padding: 2rem 1.75rem;
		background: #ffffff;
		border: 1px solid rgba(15,23,42,0.07);
		border-radius: var(--radius-xl);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12);
	}
	.how-step-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}
	.how-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		font-family: var(--font-heading);
		font-size: 1.15rem;
		font-weight: 800;
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: 0 10px 20px -8px rgba(155,17,30,0.55);
	}
	/* Availability: online (green) or handled via enquiry (amber) */
	.how-mode {
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		white-space: nowrap;
		color: #1a1a1a;
		background: #f2c14e;
		border-radius: 50px;
		padding: 0.3rem 0.7rem;
	}
	.how-mode.online { color: #ffffff; background: var(--success); }
	.how-step h3 {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: -0.015em;
		line-height: 1.3;
		color: var(--navy);
		margin-bottom: 0.6rem;
	}
	.how-step p { font-size: 0.95rem; color: #4a525e; line-height: 1.65; flex: 1; }
	.how-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		text-decoration: none;
		color: var(--cta);
	}
	.how-link svg { transition: transform 0.2s ease; }
	.how-link:hover svg { transform: translateX(3px); }

	.how-note {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.6rem;
		max-width: 820px;
		margin: 2rem auto 0;
		text-align: center;
		font-size: 0.95rem;
		color: #4a525e;
		line-height: 1.6;
	}

	/* Dark variant (on blue sections) */
	.dark .how-tag { color: #FAF9F6; background: rgba(250,249,246,0.1); border-color: rgba(250,249,246,0.3); }
	.dark .how-head h2 { color: #FAF9F6; }
	.dark .how-head h2::after { background: linear-gradient(90deg, #e0414f, #f06a75); }
	.dark .how-step {
		background: linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%);
		border-color: rgba(255,255,255,0.14);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
	}
	.dark .how-step h3 { color: #FAF9F6; }
	.dark .how-step p { color: rgba(250,249,246,0.85); }
	.dark .how-link { color: #FAF9F6; border-top-color: rgba(250,249,246,0.15); }
	.dark .how-note { color: rgba(250,249,246,0.85); }

	@media (min-width: 700px) {
		.how-steps { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1100px) {
		.how-steps { grid-template-columns: repeat(4, 1fr); }
	}
</style>

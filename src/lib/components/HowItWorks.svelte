<script lang="ts">
	import { onMount } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { howSteps } from '$lib/platform';

	// Content only; the page provides the surrounding section (light or dark).
	let { theme = 'light' }: { theme?: 'light' | 'dark' } = $props();

	const h = $derived(i18n.t.howItWorks);

	// Draw the timeline connector once the steps scroll into view
	let stepsEl: HTMLElement;
	let drawn = $state(false);
	onMount(() => {
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					drawn = true;
					io.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		io.observe(stepsEl);
		return () => io.disconnect();
	});
</script>

<div class="how" class:dark={theme === 'dark'}>
	<div class="how-head">
		<span class="how-tag">{h.label}</span>
		<h2>{h.heading}</h2>
	</div>

	<ol class="how-steps" class:drawn bind:this={stepsEl}>
		{#each h.steps as step, i}
			{@const meta = howSteps[i]}
			<li class="how-step" style="--i:{i}">
				<div class="how-marker" aria-hidden="true">
					<span class="how-node">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
							{#if i === 0}
								<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M12 9v6M9 12h6"/>
							{:else if i === 1}
								<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2h6V3"/><path d="M9 11h6M9 15h4"/>
							{:else if i === 2}
								<circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.5-5.5"/>
							{:else}
								<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
							{/if}
						</svg>
					</span>
					<span class="how-num">{String(i + 1).padStart(2, '0')}</span>
				</div>

				<div class="how-card">
					<span class="how-mode" class:online={meta.mode === 'online'}>
						<span class="how-mode-dot"></span>
						{meta.mode === 'online' ? h.online : h.manual}
					</span>
					<h3>{step.title}</h3>
					<p>{step.desc}</p>
					{#if meta.href && step.link}
						<a href={meta.href} class="how-link">
							<span>{step.link}</span>
							<span class="how-link-arrow" aria-hidden="true">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</a>
					{/if}
				</div>
			</li>
		{/each}
	</ol>

	<p class="how-note">
		<span class="how-note-icon" aria-hidden="true">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>
		</span>
		<span class="how-note-text">
			<span class="how-mode" aria-hidden="true"><span class="how-mode-dot"></span>{h.manual}</span>
			{h.note}
		</span>
	</p>

	<!-- Optional Premium membership: informative only, not a registration step -->
	<aside class="premium" aria-labelledby="premium-heading">
		<div class="premium-head">
			<span class="premium-tag">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
				{i18n.t.premium.label}
			</span>
			<h3 id="premium-heading">{i18n.t.premium.heading}</h3>
			<p>{i18n.t.premium.desc}</p>
		</div>
		<ul class="premium-items">
			{#each i18n.t.premium.items as item}
				<li>
					<span class="premium-item-top">
						<strong>{item.title}</strong>
						<span class="premium-soon">{i18n.t.funding.soon}</span>
					</span>
					<span class="premium-item-desc">{item.desc}</span>
				</li>
			{/each}
		</ul>
		<div class="premium-foot">
			<span class="premium-optional">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
				{i18n.t.premium.optional}
			</span>
			<a href="/fondovi#premium" class="premium-link">
				{i18n.t.premium.more}
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>
			</a>
		</div>
	</aside>
</div>

<style>
	.how {
		--ink: var(--navy);
		--ink-soft: #4a525e;
		--line: rgba(11,52,102,0.14);
		--card-bg: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		--card-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 32px -18px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(15,23,42,0.06);
		--node-bg: #ffffff;
		--node-ring: #f8f7f3;
	}
	.how.dark {
		--ink: #FAF9F6;
		--ink-soft: rgba(250,249,246,0.78);
		--line: rgba(255,255,255,0.16);
		--card-bg: linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.025) 100%);
		--card-shadow: inset 0 1px 0 rgba(255,255,255,0.14), inset 0 0 0 1px rgba(255,255,255,0.1), 0 18px 36px -22px rgba(0,0,0,0.6);
		--node-bg: rgba(255,255,255,0.1);
		--node-ring: rgba(8,37,72,0.9);
	}

	.how-head { max-width: 760px; margin: 0 auto 3.5rem; text-align: center; }
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
		color: var(--ink);
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

	/* ── Timeline ── */
	.how-steps {
		--node: 60px;
		position: relative;
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin: 0;
		padding: 0;
	}
	/* Track + animated progress (vertical on mobile) */
	.how-steps::before,
	.how-steps::after {
		content: '';
		position: absolute;
		left: calc(var(--node) / 2 - 1px);
		top: calc(var(--node) / 2);
		bottom: calc(var(--node) / 2);
		width: 2px;
		border-radius: 2px;
	}
	.how-steps::before { background: var(--line); }
	.how-steps::after {
		background: linear-gradient(180deg, #1c5aa8, var(--cta));
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 1.6s cubic-bezier(0.22,1,0.36,1) 0.2s;
	}
	.how-steps.drawn::after { transform: scaleY(1); }

	.how-step {
		position: relative;
		display: grid;
		grid-template-columns: var(--node) 1fr;
		gap: 1.1rem;
		align-items: start;
	}

	.how-marker {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	.how-node {
		display: grid;
		place-items: center;
		width: var(--node);
		height: var(--node);
		border-radius: 50%;
		color: var(--ink);
		background: var(--node-bg);
		box-shadow: 0 0 0 6px var(--node-ring), inset 0 0 0 1px var(--line), 0 14px 28px -14px rgba(15,23,42,0.45);
		transition: background 0.5s ease, color 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1);
		transition-delay: calc(0.25s + var(--i) * 0.35s);
	}
	.how-steps.drawn .how-node {
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
	}
	.how-num {
		font-family: var(--font-heading);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: var(--ink-soft);
		opacity: 0.7;
		font-variant-numeric: tabular-nums;
	}

	.how-card {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: clamp(1.4rem, 2.4vw, 1.75rem);
		border-radius: var(--radius-2xl);
		background: var(--card-bg);
		box-shadow: var(--card-shadow);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.how-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.how-step:hover .how-card {
		transform: translateY(-5px);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 30px 54px -26px rgba(15,23,42,0.32), inset 0 0 0 1px rgba(155,17,30,0.2);
	}
	.dark .how-step:hover .how-card {
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.22), 0 34px 60px -26px rgba(0,0,0,0.7);
	}
	.how-step:hover .how-card::before { transform: scaleX(1); }
	.how-step:hover .how-node { transform: scale(1.06) rotate(-6deg); transition-delay: 0s; }

	/* Availability: online (green) or handled via enquiry (amber) */
	.how-mode {
		display: inline-flex;
		align-items: center;
		align-self: flex-start;
		gap: 0.4rem;
		padding: 0.28rem 0.7rem;
		border-radius: 50px;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		white-space: nowrap;
		color: #9a6b00;
		background: rgba(242,193,78,0.16);
		box-shadow: inset 0 0 0 1px rgba(242,193,78,0.45);
		margin-bottom: 1rem;
	}
	.how-mode.online {
		color: var(--success);
		background: rgba(63,143,116,0.1);
		box-shadow: inset 0 0 0 1px rgba(63,143,116,0.3);
	}
	.dark .how-mode { color: #f6cf72; background: rgba(242,193,78,0.12); }
	.dark .how-mode.online { color: #7fd1b2; background: rgba(127,209,178,0.1); box-shadow: inset 0 0 0 1px rgba(127,209,178,0.3); }
	.how-mode-dot { width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: currentColor; }
	/* Phones: the badge may wrap instead of running past the narrow card */
	@media (max-width: 599px) {
		.how-mode { max-width: 100%; white-space: normal; letter-spacing: 0.06em; line-height: 1.3; }
	}

	.how-card h3 {
		font-family: var(--font-heading);
		font-size: 1.18rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--ink);
		margin-bottom: 0.55rem;
	}
	.how-card p { font-size: 0.93rem; color: var(--ink-soft); line-height: 1.65; flex: 1; }

	.how-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--ink);
	}
	.how-link-arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px var(--line);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.how-link:hover .how-link-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 16px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}
	.how-link:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; border-radius: 4px; }

	.how-note {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
		max-width: 860px;
		margin: 2.5rem auto 0;
		padding: 1rem 1.25rem;
		border-radius: 18px;
		font-size: 0.92rem;
		line-height: 1.6;
		color: var(--ink-soft);
		background: rgba(242,193,78,0.07);
		box-shadow: inset 0 0 0 1px rgba(242,193,78,0.3);
	}
	.how-note-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		color: #9a6b00;
		background: rgba(242,193,78,0.2);
	}
	.dark .how-note-icon { color: #f6cf72; }
	.how-note-text .how-mode { margin: 0 0.4rem 0 0; vertical-align: 1px; }

	.dark .how-tag { color: #FAF9F6; background: rgba(250,249,246,0.1); border-color: rgba(250,249,246,0.3); }
	.dark .how-head h2::after { background: linear-gradient(90deg, #e0414f, #f06a75); }

	/* Desktop: horizontal timeline with nodes above the cards */
	@media (min-width: 1100px) {
		.how-steps { grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
		.how-steps::before,
		.how-steps::after {
			top: calc(var(--node) / 2 - 1px);
			bottom: auto;
			/* From the centre of the first column to the centre of the last: (100% - 3 gaps) / 8 */
			left: calc((100% - 3 * 1.25rem) / 8);
			right: calc((100% - 3 * 1.25rem) / 8);
			width: auto;
			height: 2px;
		}
		.how-steps::after {
			background: linear-gradient(90deg, #1c5aa8, var(--cta));
			transform: scaleX(0);
			transform-origin: left;
		}
		.how-steps.drawn::after { transform: scaleX(1); }
		.how-step { grid-template-columns: 1fr; gap: 1.25rem; }
		.how-marker { justify-self: center; }
	}

	/* ── Premium (optional membership) ── */
	.premium {
		max-width: 980px;
		margin: 2.5rem auto 0;
		padding: clamp(1.4rem, 3vw, 2rem);
		border-radius: var(--radius-2xl);
		background: var(--card-bg);
		box-shadow: var(--card-shadow);
	}
	.premium-head { margin-bottom: 1.25rem; }
	.premium-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-bottom: 0.75rem;
		padding: 0.28rem 0.75rem;
		border-radius: 50px;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #3d2a00;
		background: linear-gradient(160deg, #f6d27a, #e2b44c);
	}
	.premium-head h3 {
		font-family: var(--font-heading);
		font-size: clamp(1.25rem, 2.4vw, 1.6rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--ink);
		margin-bottom: 0.4rem;
	}
	.premium-head p { font-size: 0.95rem; line-height: 1.6; color: var(--ink-soft); max-width: 62ch; }
	.premium-items {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.6rem;
		margin: 0 0 1.25rem;
		padding: 0;
	}
	.premium-items li {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 0.9rem 1rem;
		border-radius: 16px;
		box-shadow: inset 0 0 0 1px var(--line);
	}
	.premium-item-top { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
	.premium-item-top strong { font-family: var(--font-heading); font-size: 0.98rem; font-weight: 800; color: var(--ink); }
	.premium-soon {
		flex-shrink: 0;
		padding: 0.15rem 0.55rem;
		border-radius: 50px;
		font-size: 0.62rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #9a6b00;
		background: rgba(242,193,78,0.16);
		box-shadow: inset 0 0 0 1px rgba(242,193,78,0.45);
	}
	.dark .premium-soon { color: #f6cf72; background: rgba(242,193,78,0.12); }
	.premium-item-desc { font-size: 0.86rem; line-height: 1.5; color: var(--ink-soft); }
	.premium-foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid var(--line);
	}
	.premium-optional {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--ink-soft);
	}
	.premium-optional svg { color: var(--success); }
	.dark .premium-optional svg { color: #7fd1b2; }
	.premium-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--ink);
	}
	.premium-link:hover { color: var(--cta); }
	.dark .premium-link:hover { color: #f06a75; }
	.premium-link:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; border-radius: 4px; }
	@media (min-width: 700px) {
		.premium-items { grid-template-columns: repeat(3, 1fr); }
	}

	@media (prefers-reduced-motion: reduce) {
		.how-steps::after, .how-node, .how-card, .how-card::before, .how-link-arrow { transition: none; }
		.how-step:hover .how-card, .how-step:hover .how-node, .how-link:hover .how-link-arrow { transform: none; }
	}
</style>

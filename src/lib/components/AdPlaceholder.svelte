<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	interface Props {
		width?: string;
		height?: string;
		label?: string;
		variant?: 'banner' | 'sidebar' | 'square' | 'leaderboard';
		tone?: 'light' | 'dark';
		href?: string;
	}

	let { width, height, label, variant = 'banner', tone = 'light', href = '/oglasi' }: Props = $props();

	// Standard IAB formats shown on the chip; min-heights keep the slot proportions on screen
	const formats: Record<string, { dims: string; minH: string }> = {
		leaderboard: { dims: '970 × 250', minH: '200px' },
		banner: { dims: '728 × 90', minH: '150px' },
		square: { dims: '300 × 250', minH: '300px' },
		sidebar: { dims: '300 × 600', minH: '420px' }
	};

	const stacked = $derived(variant === 'square' || variant === 'sidebar');
	const style = $derived(
		[width && `width:${width}`, `min-height:${height ?? formats[variant].minH}`].filter(Boolean).join(';')
	);
</script>

<a
	{href}
	class="ad-slot ad-{variant} tone-{tone}"
	class:stacked
	{style}
	aria-label={label ?? `${i18n.t.adSlot.tag}: ${i18n.t.adSlot.cta}`}
>
	<span class="ad-frame" aria-hidden="true">
		<span class="c tl"></span><span class="c tr"></span><span class="c bl"></span><span class="c br"></span>
	</span>
	<span class="ad-glow" aria-hidden="true"></span>

	<span class="ad-copy">
		<span class="ad-meta">
			<span class="ad-tag">{i18n.t.adSlot.tag}</span>
			<span class="ad-badge"><span class="ad-pulse"></span>{i18n.t.adSlot.available}</span>
		</span>
		<span class="ad-title">{i18n.t.adSlot.title}</span>
		<span class="ad-desc">{i18n.t.adSlot.desc}</span>
	</span>

	<span class="ad-side">
		<span class="ad-format">
			<span class="ad-format-label">{i18n.t.adSlot.format}</span>
			<span class="ad-format-dims">{formats[variant].dims}</span>
		</span>
		<span class="ad-cta">
			{i18n.t.adSlot.cta}
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
		</span>
	</span>
</a>

<style>
	.ad-slot {
		--ink: var(--navy, #080e1a);
		--ink-soft: #4a525e;
		--line: rgba(11, 52, 102, 0.14);
		--dot: rgba(11, 52, 102, 0.1);
		--chip-bg: #ffffff;

		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: clamp(1.25rem, 3vw, 2.5rem);
		width: 100%;
		max-width: 100%;
		padding: clamp(1.5rem, 3.5vw, 2.5rem) clamp(1.5rem, 4vw, 3rem);
		border-radius: var(--radius-2xl, 24px);
		text-decoration: none;
		color: var(--ink);
		background:
			radial-gradient(circle at 1px 1px, var(--dot) 1px, transparent 0) 0 0 / 20px 20px,
			linear-gradient(135deg, #ffffff 0%, #f6f4ef 100%);
		box-shadow:
			0 24px 48px -28px rgba(15, 23, 42, 0.28),
			inset 0 1px 0 #ffffff,
			inset 0 0 0 1px var(--line);
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease;
	}
	.ad-slot.tone-dark {
		--ink: #FAF9F6;
		--ink-soft: rgba(250, 249, 246, 0.72);
		--line: rgba(255, 255, 255, 0.14);
		--dot: rgba(255, 255, 255, 0.09);
		--chip-bg: rgba(255, 255, 255, 0.08);
		background:
			radial-gradient(circle at 1px 1px, var(--dot) 1px, transparent 0) 0 0 / 20px 20px,
			linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%);
		box-shadow:
			0 24px 48px -28px rgba(0, 0, 0, 0.55),
			inset 0 1px 0 rgba(255, 255, 255, 0.16),
			inset 0 0 0 1px var(--line);
		backdrop-filter: blur(6px);
	}
	.ad-slot:hover {
		transform: translateY(-4px);
		box-shadow:
			0 34px 60px -28px rgba(15, 23, 42, 0.38),
			inset 0 1px 0 #ffffff,
			inset 0 0 0 1px rgba(155, 17, 30, 0.35);
	}
	.ad-slot.tone-dark:hover {
		box-shadow:
			0 34px 60px -28px rgba(0, 0, 0, 0.7),
			inset 0 1px 0 rgba(255, 255, 255, 0.2),
			inset 0 0 0 1px rgba(255, 255, 255, 0.3);
	}
	.ad-slot:focus-visible {
		outline: 2px solid var(--cta, #9B111E);
		outline-offset: 4px;
	}

	/* Editorial crop marks */
	.ad-frame { position: absolute; inset: 14px; pointer-events: none; }
	.c {
		position: absolute;
		width: 14px;
		height: 14px;
		border-color: var(--ink);
		opacity: 0.28;
		transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}
	.tl { top: 0; left: 0; border-top: 1.5px solid; border-left: 1.5px solid; }
	.tr { top: 0; right: 0; border-top: 1.5px solid; border-right: 1.5px solid; }
	.bl { bottom: 0; left: 0; border-bottom: 1.5px solid; border-left: 1.5px solid; }
	.br { bottom: 0; right: 0; border-bottom: 1.5px solid; border-right: 1.5px solid; }
	.ad-slot:hover .c { opacity: 0.6; }
	.ad-slot:hover .tl { transform: translate(-4px, -4px); }
	.ad-slot:hover .tr { transform: translate(4px, -4px); }
	.ad-slot:hover .bl { transform: translate(-4px, 4px); }
	.ad-slot:hover .br { transform: translate(4px, 4px); }

	/* Soft brand glow that follows hover */
	.ad-glow {
		position: absolute;
		z-index: -1;
		right: -10%;
		top: -60%;
		width: 55%;
		height: 220%;
		background: radial-gradient(ellipse at center, rgba(155, 17, 30, 0.1), transparent 65%);
		filter: blur(10px);
		transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
		opacity: 0.7;
		pointer-events: none;
	}
	.tone-dark .ad-glow { background: radial-gradient(ellipse at center, rgba(196, 42, 56, 0.28), transparent 65%); }
	.ad-slot:hover .ad-glow { transform: translateX(-12%); opacity: 1; }

	.ad-copy { display: flex; flex-direction: column; gap: 0.55rem; min-width: 0; }

	.ad-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem; }
	.ad-tag {
		font-family: var(--font-sans, sans-serif);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}
	.ad-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.22rem 0.65rem;
		border-radius: 50px;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--success, #3f8f74);
		background: rgba(63, 143, 116, 0.1);
		box-shadow: inset 0 0 0 1px rgba(63, 143, 116, 0.25);
	}
	.tone-dark .ad-badge { color: #7fd1b2; background: rgba(127, 209, 178, 0.1); box-shadow: inset 0 0 0 1px rgba(127, 209, 178, 0.3); }
	.ad-pulse {
		position: relative;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
	}
	.ad-pulse::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: currentColor;
		animation: ad-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
	@keyframes ad-ping {
		0% { transform: scale(1); opacity: 0.6; }
		80%, 100% { transform: scale(3); opacity: 0; }
	}

	.ad-title {
		font-family: var(--font-heading, sans-serif);
		font-size: clamp(1.4rem, 2.6vw, 2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: var(--ink);
	}
	.ad-desc {
		font-size: 0.95rem;
		line-height: 1.55;
		color: var(--ink-soft);
		max-width: 52ch;
	}

	.ad-side { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1rem; flex-shrink: 0; max-width: 100%; min-width: 0; }

	.ad-format {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.15rem;
		padding: 0.5rem 0.85rem;
		border-radius: 12px;
		background: var(--chip-bg);
		box-shadow: inset 0 0 0 1px var(--line);
	}
	.ad-format-label {
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}
	.ad-format-dims {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	.ad-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 1.35rem;
		border-radius: 50px;
		font-size: 0.9rem;
		font-weight: 700;
		white-space: nowrap;
		max-width: 100%;
		color: var(--cta-text, #FAF9F6);
		background: linear-gradient(160deg, #c42a38, var(--cta, #9B111E));
		box-shadow: 0 12px 24px -12px rgba(155, 17, 30, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.25);
		transition: box-shadow 0.35s ease;
	}
	.ad-cta svg { transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
	.ad-slot:hover .ad-cta { box-shadow: 0 16px 30px -12px rgba(155, 17, 30, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.3); }
	.ad-slot:hover .ad-cta svg { transform: translateX(4px); }

	/* Square / sidebar: stacked layout */
	.ad-slot.stacked {
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		text-align: left;
	}
	.stacked .ad-glow { right: -30%; top: -20%; width: 90%; height: 90%; }
	.stacked .ad-side { width: 100%; justify-content: space-between; }
	.stacked .ad-format { align-items: flex-start; }

	@media (max-width: 760px) {
		.ad-slot:not(.stacked) { flex-direction: column; align-items: flex-start; }
		.ad-side { width: 100%; justify-content: space-between; }
		.ad-format { align-items: flex-start; }
	}
	/* Phones and narrow slots: format chip above, full-width CTA below */
	@media (max-width: 560px) {
		.ad-slot { padding-left: 1.25rem; padding-right: 1.25rem; }
		.ad-side { flex-direction: column; align-items: stretch; width: 100%; }
		.ad-format { align-self: flex-start; }
		.ad-cta { justify-content: center; white-space: normal; text-align: center; }
	}
	/* Narrow stacked slots (sidebar/square) at any screen width */
	.stacked .ad-side { flex-wrap: wrap; }
	.stacked .ad-cta { white-space: normal; }

	@media (prefers-reduced-motion: reduce) {
		.ad-slot, .c, .ad-glow, .ad-cta svg { transition: none; }
		.ad-slot:hover, .ad-slot:hover .c, .ad-slot:hover .ad-glow, .ad-slot:hover .ad-cta svg { transform: none; }
		.ad-pulse::after { animation: none; }
	}
</style>

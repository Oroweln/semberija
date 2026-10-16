<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	let { children } = $props();
</script>

<div class="page-wrap">
	{#if i18n.t.legal.langNotice}
		<p class="lang-notice" lang={i18n.lang}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20z"/></svg>
			<span>{i18n.t.legal.langNotice}</span>
		</p>
	{/if}
	{@render children()}
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

	/* Shown when the legal text isn't available in the selected language */
	.lang-notice {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		width: fit-content;
		max-width: 100%;
		margin: 0 auto;
		padding: 0.6rem 1.2rem;
		border-radius: 50px;
		font-size: 0.9rem;
		font-weight: 600;
		color: #7a5a10;
		background: linear-gradient(90deg, #fff6df, #fffaf0);
		box-shadow: inset 0 0 0 1px rgba(242,193,78,0.6), 0 10px 24px -18px rgba(122,90,16,0.5);
	}
	.lang-notice svg { flex-shrink: 0; color: #c8901a; }

	/* ─── HERO ─── */
	:global(.legal-top) {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		background: var(--surface-dark);
		color: #FAF9F6;
		padding: clamp(2.75rem, 6vw, 4.5rem) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
	}
	/* Glow */
	:global(.legal-top::before) {
		content: '';
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
	/* Grid lines */
	:global(.legal-top::after) {
		content: '';
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
	:global(.legal-top .container) { position: relative; max-width: var(--max-w); margin: 0 auto; }
	:global(.legal-top .breadcrumb) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		width: fit-content;
		margin-bottom: 1.5rem;
		padding: 0.4rem 1rem;
		border-radius: 50px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.65);
		background: rgba(255,255,255,0.08);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
	}
	:global(.legal-top .breadcrumb::before) {
		content: '';
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f06a75;
		box-shadow: 0 0 0 4px rgba(240,106,117,0.2);
	}
	:global(.legal-top .breadcrumb a) { color: #FAF9F6; text-decoration: none; transition: color 0.25s ease; }
	:global(.legal-top .breadcrumb a:hover) { color: #f6a3aa; }
	:global(.legal-top h1) {
		font-family: var(--font-heading);
		font-size: clamp(2.4rem, 6vw, 4.2rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		/* Room for descenders: gradient text is clipped to the line box */
		line-height: 1.12;
		padding-bottom: 0.08em;
		text-wrap: balance;
		margin-bottom: 1.1rem;
		background: linear-gradient(180deg, #ffffff 30%, #c9d4e4 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	:global(.legal-top .updated) {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.95rem;
		border-radius: 50px;
		font-size: 0.8rem;
		font-weight: 600;
		color: rgba(250,249,246,0.8);
		background: rgba(255,255,255,0.05);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
	}
	:global(.legal-top .updated::before) {
		content: '';
		width: 14px;
		height: 14px;
		background: currentColor;
		-webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M12 7v5l3 2'/%3E%3C/svg%3E") center / contain no-repeat;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M12 7v5l3 2'/%3E%3C/svg%3E") center / contain no-repeat;
	}

	/* ─── BODY ─── */
	:global(.legal-body) {
		position: relative;
		overflow: clip;
		isolation: isolate;
		background: var(--surface-light);
		padding: clamp(2rem, 5vw, 4rem) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
	}
	/* Dotted backdrop */
	:global(.legal-body::before) {
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(circle at 1px 1px, rgba(11,52,102,0.07) 1px, transparent 0) 0 0 / 22px 22px;
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 40%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 40%);
		pointer-events: none;
	}
	:global(.legal-body .container) {
		max-width: var(--max-w);
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		align-items: start;
	}

	/* Document card */
	:global(.legal-content) {
		counter-reset: legal-h2;
		min-width: 0;
		padding: clamp(1.5rem, 4vw, 3.25rem);
		border-radius: 26px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 40px 80px -48px rgba(15,23,42,0.35), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	:global(.legal-content .lead) {
		position: relative;
		margin-bottom: 2.25rem;
		padding: 0 0 2rem 1.25rem;
		font-size: 1.12rem;
		line-height: 1.7;
		color: var(--navy);
		border-bottom: 1px solid rgba(15,23,42,0.08);
	}
	:global(.legal-content .lead::before) {
		content: '';
		position: absolute;
		left: 0;
		top: 0.3rem;
		bottom: 2.3rem;
		width: 3px;
		border-radius: 3px;
		background: var(--accent-line);
	}
	:global(.legal-content h2) {
		counter-increment: legal-h2;
		display: flex;
		align-items: baseline;
		gap: 0.85rem;
		margin: 2.75rem 0 0.9rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(15,23,42,0.07);
		font-family: var(--font-heading);
		font-size: clamp(1.25rem, 2.2vw, 1.5rem);
		font-weight: 800;
		letter-spacing: -0.025em;
		line-height: 1.25;
		color: var(--navy);
	}
	:global(.legal-content h2::before) {
		content: counter(legal-h2, decimal-leading-zero);
		flex-shrink: 0;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: var(--cta);
		transform: translateY(-0.15em);
	}
	:global(.legal-content h2:first-of-type) { margin-top: 0; padding-top: 0; border-top: 0; }
	:global(.legal-content h3) {
		margin: 1.5rem 0 0.5rem;
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--navy);
	}
	:global(.legal-content p) { margin-bottom: 0.9rem; font-size: 0.98rem; line-height: 1.8; color: #3d4450; }
	:global(.legal-content ul),
	:global(.legal-content ol) { margin: 0.5rem 0 1.2rem; padding: 0; list-style: none; }
	:global(.legal-content ol) { counter-reset: legal-ol; }
	:global(.legal-content li) {
		position: relative;
		margin-bottom: 0.45rem;
		padding-left: 1.6rem;
		font-size: 0.98rem;
		line-height: 1.7;
		color: #3d4450;
	}
	:global(.legal-content ul > li::before) {
		content: '';
		position: absolute;
		left: 0.25rem;
		top: 0.65em;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: linear-gradient(150deg, #1c5aa8, #0b3466);
		box-shadow: 0 0 0 3px rgba(28,90,168,0.12);
	}
	:global(.legal-content ol > li) { counter-increment: legal-ol; }
	:global(.legal-content ol > li::before) {
		content: counter(legal-ol) '.';
		position: absolute;
		left: 0;
		font-weight: 800;
		color: var(--cta);
	}
	:global(.legal-content a) {
		color: var(--navy);
		font-weight: 600;
		text-decoration: underline;
		text-decoration-color: rgba(155,17,30,0.35);
		text-underline-offset: 3px;
		transition: color 0.2s ease, text-decoration-color 0.2s ease;
	}
	:global(.legal-content a:hover) { color: var(--cta); text-decoration-color: var(--cta); }
	:global(.legal-content strong) { color: var(--navy); }
	:global(.legal-content .company-block) {
		margin: 1rem 0 1.4rem;
		padding: 1.25rem 1.5rem;
		border-radius: 18px;
		font-size: 0.95rem;
		line-height: 1.8;
		color: var(--navy);
		background: linear-gradient(160deg, #f7f6f2, #ffffff);
		box-shadow: inset 0 0 0 1px rgba(15,23,42,0.07), inset 3px 0 0 #1c5aa8;
	}

	/* Independent platform statement (disclaimer page) */
	:global(.statement-box) {
		margin-bottom: 2rem;
		padding: 1.3rem 1.5rem;
		border-radius: 18px;
		font-weight: 600;
		line-height: 1.65;
		color: var(--navy);
		background: linear-gradient(90deg, rgba(155,17,30,0.07), rgba(155,17,30,0.015));
		box-shadow: inset 3px 0 0 var(--cta), inset 0 0 0 1px rgba(155,17,30,0.12);
	}

	/* Document navigation */
	:global(.legal-nav) {
		order: -1;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		padding: 1rem;
		border-radius: 22px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 30px -22px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	:global(.legal-nav h4) {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
		margin: 0.2rem 0.3rem 0.5rem;
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #6b7380;
	}
	:global(.legal-nav h4::before) { content: ''; width: 18px; height: 2px; border-radius: 2px; background: var(--accent-line); }
	:global(.legal-nav a) {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.55rem 0.85rem;
		border-radius: 12px;
		font-size: 0.88rem;
		font-weight: 600;
		color: #4a525e;
		text-decoration: none;
		background: #f4f3ef;
		transition: color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
	}
	:global(.legal-nav a:hover) { color: var(--navy); background: #ecebe6; }
	:global(.legal-nav a.active) {
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		box-shadow: 0 10px 22px -12px rgba(11,52,102,0.7);
	}
	:global(.legal-nav a:focus-visible) { outline: 2px solid var(--cta); outline-offset: 2px; }

	@media (min-width: 900px) {
		:global(.legal-body .container) {
			grid-template-columns: minmax(0, 1fr) 260px;
			gap: 2.5rem;
		}
		:global(.legal-nav) {
			position: sticky;
			top: calc(var(--nav-h) + 1.5rem);
			order: 0;
			flex-direction: column;
			flex-wrap: nowrap;
			gap: 0.3rem;
			padding: 1.1rem;
		}
		:global(.legal-nav h4) { margin: 0.2rem 0.4rem 0.7rem; }
		:global(.legal-nav a) { background: transparent; }
		:global(.legal-nav a:hover) { background: #f4f3ef; }
		:global(.legal-nav a.active) { background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%); }
		:global(.legal-nav a::after) {
			content: '';
			margin-left: auto;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background: transparent;
			transition: background 0.25s ease;
		}
		:global(.legal-nav a.active::after) { background: #f06a75; box-shadow: 0 0 0 3px rgba(240,106,117,0.25); }
	}
	@media (prefers-reduced-motion: reduce) {
		:global(.legal-nav a), :global(.legal-content a), :global(.legal-top .breadcrumb a) { transition: none; }
	}
</style>

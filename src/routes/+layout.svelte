<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import faviconUrl from '$lib/assets/favicon.svg';
	import { i18n } from '$lib/i18n.svelte';

	let { children } = $props();

	// Keep <html lang> in sync with the selected language (SEO, screen readers)
	$effect(() => {
		document.documentElement.lang = i18n.lang === 'sr' ? 'sr-Latn' : i18n.lang;
	});
</script>

<svelte:head>
	<link rel="icon" href={faviconUrl} type="image/svg+xml" />
</svelte:head>

<Nav />
<main>
	{@render children()}
</main>
<Footer />

<style>
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(:root) {
		/* ── Core palette — deep navy + chrome/silver, drawn from the logo ── */
		--navy:        #080e1a;
		--navy-mid:    #0c1526;
		--navy-light:  #13203a;
		--navy-deep:   #05090f;
		--steel:       #24406b;
		--steel-light: #3a5a8c;
		--card-blue:       #0d3f7a;
		--card-blue-light: #1c5aa8;
		--silver:      #9aa4b2;
		--silver-glow: rgba(154, 164, 178, 0.16);
		--graphite:    #1a1f29;
		--graphite-mid:#242a36;
		--platinum:    #dde1e7;
		--white:       #ffffff;
		--soft-white:  #f7f8fa;
		--canvas:      #FAF9F6;
		--dark:        #0c1119;
		--muted:       #626b78;
		--success:     #3f8f74;

		/* ── Call-to-action (filled buttons) ── */
		--cta:         #9B111E;
		--cta-hover:   #7F0E18;
		--cta-text:    #FAF9F6;

		/* ── Bento cards ── */
		--radius-bento: 28px;
		--shadow-bento: 0 28px 56px -24px rgba(15,23,42,0.28), 0 10px 20px -12px rgba(15,23,42,0.14);

		/* ── Section surfaces (edit here to restyle every page) ── */
		--surface-dark:
			radial-gradient(120% 120% at 12% 0%, rgba(64,120,200,0.55) 0%, rgba(64,120,200,0) 55%),
			linear-gradient(155deg, #0f4687 0%, #0b3466 55%, #082548 100%);
		--surface-light: linear-gradient(180deg, #ffffff 0%, #f8f7f3 100%);
		--shadow-dark-raised:
			0 30px 60px -24px rgba(8,20,45,0.55),
			0 12px 24px -12px rgba(8,20,45,0.35),
			inset 0 1px 0 rgba(255,255,255,0.14),
			inset 0 0 0 1px rgba(255,255,255,0.06);
		--shadow-light-raised:
			0 30px 60px -28px rgba(15,23,42,0.22),
			0 10px 22px -14px rgba(15,23,42,0.12),
			inset 0 1px 0 #ffffff,
			inset 0 0 0 1px rgba(15,23,42,0.05);
		--accent-line: linear-gradient(90deg, var(--cta), #c42a38);

		/* ── Typography ── */
		--font-heading: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
		--font-sans:    'Inter', system-ui, -apple-system, sans-serif;
		--font-serif:   'Plus Jakarta Sans', system-ui, sans-serif;

		/* ── Shape ── */
		--radius-sm: 4px;
		--radius:    8px;
		--radius-lg: 12px;
		--radius-xl: 18px;
		--radius-2xl:24px;

		/* ── Shadow ── */
		--shadow-sm: 0 1px 4px rgba(5,9,15,0.1);
		--shadow:    0 2px 14px rgba(5,9,15,0.12);
		--shadow-md: 0 6px 28px rgba(5,9,15,0.14);
		--shadow-lg: 0 10px 44px rgba(5,9,15,0.18);
		--shadow-xl: 0 18px 68px rgba(5,9,15,0.22);
		--glow-blue: 0 4px 24px rgba(8,14,26,0.3);
		--glow-cyan: 0 0 18px rgba(154,164,178,0.22);

		/* ── Layout ── */
		--max-w:        1280px;
		--nav-h:        92px;
		--section-py:   clamp(64px, 9vw, 120px);
		--section-px:   clamp(1.25rem, 4vw, 2rem);
	}

	@media (min-width: 1480px) {
		:global(:root) { --nav-h: 112px; }
	}

	/* Base text size: 18px. All rem-based text and spacing scale from this. */
	:global(html) {
		font-size: 112.5%;
		scroll-behavior: smooth;
	}

	:global(body) {
		font-family: var(--font-sans);
		font-size: 1rem;
		line-height: 1.6;
		color: var(--dark);
		background: var(--canvas);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	/* Premium canvas: soft navy / red ambient glows behind the content */
	:global(body)::before {
		content: '';
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		background:
			radial-gradient(ellipse 55% 45% at 8% 12%, rgba(11,52,102,0.12), transparent 70%),
			radial-gradient(ellipse 45% 40% at 95% 30%, rgba(155,17,30,0.07), transparent 70%),
			radial-gradient(ellipse 60% 50% at 85% 95%, rgba(11,52,102,0.10), transparent 70%),
			radial-gradient(ellipse 40% 35% at 15% 85%, rgba(200,169,106,0.10), transparent 70%);
	}

	/* Fine paper grain over the cream */
	:global(body)::after {
		content: '';
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		opacity: 0.55;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.33  0 0 0 0 0.3  0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E");
	}

	:global(img) {
		max-width: 100%;
		height: auto;
		display: block;
	}

	:global(a) {
		color: inherit;
	}

	:global(button) {
		font-family: var(--font-sans);
	}

	:global(h1, h2, h3, h4, h5, h6) {
		line-height: 1.2;
		font-weight: 700;
	}

	main {
		min-height: 100vh;
	}

	/* ── Scroll-reveal for bento cards ── */
	:global(.reveal-card) {
		opacity: 0;
		transform: translateY(36px) scale(0.98);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}
	:global(.reveal-card.reveal-visible) {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
	@media (prefers-reduced-motion: reduce) {
		:global(.reveal-card) {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>

<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import faviconUrl from '$lib/assets/favicon.svg';

	let { children } = $props();
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
		--canvas:      #40434a;
		--dark:        #0c1119;
		--muted:       #626b78;
		--success:     #3f8f74;

		/* ── Bento cards ── */
		--radius-bento: 28px;
		--shadow-bento: 0 24px 70px rgba(0,0,0,0.35), 0 4px 18px rgba(0,0,0,0.22);

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
		--section-py:   clamp(64px, 9vw, 120px);
		--section-px:   clamp(1.25rem, 4vw, 2rem);
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		font-family: var(--font-sans);
		font-size: 16px;
		line-height: 1.6;
		color: var(--dark);
		background: var(--canvas);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
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

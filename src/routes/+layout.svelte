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
		/* ── Core palette ── */
		--navy:        #0a0f1e;
		--navy-mid:    #0d1526;
		--navy-light:  #111d35;
		--blue:        #1a56db;
		--blue-light:  #2563eb;
		--cyan:        #06b6d4;
		--cyan-glow:   rgba(6, 182, 212, 0.18);
		--graphite:    #1e2535;
		--graphite-mid:#2a3347;
		--silver:      #94a3b8;
		--platinum:    #e2e8f0;
		--white:       #ffffff;
		--soft-white:  #f8fafc;
		--gold:        #c8a96a;
		--gold-light:  #d4ba84;
		--dark:        #0a0f1e;
		--dark-mid:    #0d1526;
		--muted:       #64748b;
		--success:     #10b981;

		/* Legacy aliases kept so existing pages don't break */
		--emerald:       #0d1526;
		--emerald-light: #111d35;
		--beige:         #f1f5f9;
		--beige-dark:    #e2e8f0;

		/* ── Typography ── */
		--font-heading: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
		--font-sans:    'Inter', system-ui, -apple-system, sans-serif;
		--font-serif:   'Plus Jakarta Sans', system-ui, sans-serif;

		/* ── Shape ── */
		--radius-sm: 6px;
		--radius:    10px;
		--radius-lg: 16px;
		--radius-xl: 24px;
		--radius-2xl:32px;

		/* ── Shadow ── */
		--shadow-sm: 0 1px 4px rgba(0,0,0,0.12);
		--shadow:    0 2px 12px rgba(0,0,0,0.16);
		--shadow-md: 0 4px 24px rgba(0,0,0,0.2);
		--shadow-lg: 0 8px 40px rgba(0,0,0,0.25);
		--shadow-xl: 0 16px 64px rgba(0,0,0,0.3);
		--glow-blue: 0 0 24px rgba(26,86,219,0.35);
		--glow-cyan: 0 0 20px rgba(6,182,212,0.3);

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
		background: var(--soft-white);
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
</style>

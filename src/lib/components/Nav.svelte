<script lang="ts">
	import { page } from '$app/stores';
	import { i18n, langMeta, type Lang } from '$lib/i18n.svelte';
	import faviconUrl from '$lib/assets/favicon.svg';

	let scrolled = $state(false);
	let mobileOpen = $state(false);
	let langOpen = $state(false);
	let bizOpen = $state(false);
	let bizMobileOpen = $state(false);
	let bizCloseTimer: ReturnType<typeof setTimeout> | undefined;

	function openBiz() {
		clearTimeout(bizCloseTimer);
		bizOpen = true;
	}

	function closeBizDelayed() {
		clearTimeout(bizCloseTimer);
		bizCloseTimer = setTimeout(() => { bizOpen = false; }, 200);
	}

	const langs = Object.entries(langMeta) as [Lang, { label: string }][];

	$effect(() => {
		const handler = () => { scrolled = window.scrollY > 60; };
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});

	$effect(() => {
		$page.url.pathname;
		mobileOpen = false;
		bizOpen = false;
		clearTimeout(bizCloseTimer);
	});

	const businessLinks = $derived([
		{ href: '/firme',       label: i18n.t.nav.companies },
		{ href: '/investicije', label: i18n.t.nav.investments },
		{ href: '/b2b',         label: i18n.t.nav.diaspora },
		{ href: '/usluge',      label: i18n.t.nav.services }
	]);

	const navLinks = $derived([
		{ href: '/',          label: i18n.t.nav.home },
		{ href: '/vijesti',   label: i18n.t.nav.news },
		{ href: '/dogadjaji', label: i18n.t.nav.events },
		{ href: '/o-nama',    label: i18n.t.nav.about },
		{ href: '/kontakt',   label: i18n.t.nav.contact }
	]);

	function isActive(href: string) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}

	const bizActive = $derived(businessLinks.some((l) => isActive(l.href)));
</script>

<nav class="nav" class:scrolled class:mobile-open={mobileOpen}>
	<div class="nav-inner">
		<a href="/" class="logo">
			<img src={faviconUrl} alt="Semberija.app" class="logo-icon" />
			<img src="/Semberija%20app.png" alt="Semberija.app" class="logo-wordmark" />
		</a>

		<ul class="nav-links">
			<li>
				<a href="/" class="nav-link" class:active={isActive('/')}>
					{i18n.t.nav.home}
				</a>
			</li>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<li
				class="nav-dropdown"
				class:open={bizOpen}
				onmouseenter={openBiz}
				onmouseleave={closeBizDelayed}
			>
				<button
					type="button"
					class="nav-link nav-dropdown-toggle"
					class:active={bizActive}
					onclick={() => (bizOpen = !bizOpen)}
				>
					{i18n.t.nav.businessNetwork}
					<svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" style="margin-left:4px;opacity:0.6">
						<path d="M1 3l4 4 4-4"/>
					</svg>
				</button>
				{#if bizOpen}
					<div class="nav-dropdown-menu">
						{#each businessLinks as link}
							<a href={link.href} class="nav-dropdown-link" class:active={isActive(link.href)}>
								{link.label}
							</a>
						{/each}
					</div>
				{/if}
			</li>
			{#each navLinks.slice(1) as link}
				<li>
					<a href={link.href} class="nav-link" class:active={isActive(link.href)}>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="nav-actions">
			<div class="lang-select" class:open={langOpen}>
				<button class="lang-toggle" onclick={() => (langOpen = !langOpen)} aria-label="Switch language">
					{i18n.lang.toUpperCase()}
					<svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" style="margin-left:3px;opacity:0.6">
						<path d="M1 3l4 4 4-4"/>
					</svg>
				</button>
				{#if langOpen}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div class="lang-backdrop" onclick={() => (langOpen = false)}></div>
					<div class="lang-dropdown">
						{#each langs as [code, meta]}
							<button
								class="lang-option"
								class:active={i18n.lang === code}
								onclick={() => { i18n.setLang(code); langOpen = false; }}
							>
								<span class="lang-code">{code.toUpperCase()}</span>
								<span class="lang-label">{meta.label}</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
			<a href="/kontakt" class="btn-cta">{i18n.t.nav.listCta}</a>
		</div>

		<div class="mobile-right">
			<div class="lang-select" class:open={langOpen}>
				<button class="lang-toggle" onclick={() => (langOpen = !langOpen)} aria-label="Switch language">
					{i18n.lang.toUpperCase()}
				</button>
				{#if langOpen}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div class="lang-backdrop" onclick={() => (langOpen = false)}></div>
					<div class="lang-dropdown">
						{#each langs as [code, meta]}
							<button
								class="lang-option"
								class:active={i18n.lang === code}
								onclick={() => { i18n.setLang(code); langOpen = false; }}
							>
								<span class="lang-code">{code.toUpperCase()}</span>
								<span class="lang-label">{meta.label}</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
			<button class="hamburger" class:open={mobileOpen} onclick={() => (mobileOpen = !mobileOpen)} aria-label="Toggle menu">
				<span></span><span></span><span></span>
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div class="mobile-menu">
			<a href="/" class="mobile-link" class:active={isActive('/')}>{i18n.t.nav.home}</a>

			<button
				type="button"
				class="mobile-link mobile-dropdown-toggle"
				class:active={bizActive}
				onclick={() => (bizMobileOpen = !bizMobileOpen)}
			>
				{i18n.t.nav.businessNetwork}
				<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" class="mobile-dropdown-chevron" class:open={bizMobileOpen}>
					<path d="M1 3l4 4 4-4"/>
				</svg>
			</button>
			{#if bizMobileOpen}
				<div class="mobile-submenu">
					{#each businessLinks as link}
						<a href={link.href} class="mobile-sublink" class:active={isActive(link.href)}>{link.label}</a>
					{/each}
				</div>
			{/if}

			{#each navLinks.slice(1) as link}
				<a href={link.href} class="mobile-link" class:active={isActive(link.href)}>{link.label}</a>
			{/each}
			<a href="/kontakt" class="mobile-cta">{i18n.t.nav.listCta}</a>
		</div>
	{/if}
</nav>

<style>
	.nav {
		position: fixed;
		top: 0; left: 0; right: 0;
		z-index: 100;
		transition: background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease;
	}

	.nav.scrolled {
		background: rgba(8, 14, 26, 0.94);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4);
	}

	.nav-inner {
		max-width: var(--max-w);
		margin: 0 auto;
		padding: 0 1.5rem;
		height: 92px;
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	/* ── Logo ── */
	.logo {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 0.65rem;
		text-decoration: none;
	}

	.logo-icon {
		height: 66px;
		width: auto;
		display: block;
		filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5)) drop-shadow(0 0 14px rgba(154,164,178,0.35));
		transition: opacity 0.2s, filter 0.2s;
	}

	.logo:hover .logo-icon {
		opacity: 0.9;
		filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(154,164,178,0.55));
	}

	.logo-wordmark {
		height: 16px;
		width: auto;
		display: block;
		transition: opacity 0.2s;
	}

	.logo:hover .logo-wordmark {
		opacity: 0.85;
	}

	@media (min-width: 480px) {
		.logo-wordmark { height: 22px; }
	}

	/* ── Links ── */
	.nav-links {
		display: none;
		align-items: center;
		list-style: none;
		margin: 0; padding: 0;
		gap: 0;
		flex: 1;
		justify-content: center;
	}

	.nav-links li {
		display: flex;
		align-items: center;
	}

	.nav-link {
		display: flex;
		align-items: center;
		font-family: var(--font-sans);
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.65);
		text-decoration: none;
		padding: 0.55rem 0.75rem;
		border-radius: 6px;
		transition: color 0.2s, background 0.2s;
		white-space: nowrap;
		line-height: 1;
	}

	.nav-link:hover {
		color: white;
		background: rgba(255,255,255,0.08);
	}

	.nav-link.active {
		color: var(--silver);
	}

	/* ── Business Network dropdown ── */
	.nav-dropdown {
		position: relative;
		list-style: none;
	}

	.nav-dropdown-toggle {
		display: flex;
		align-items: center;
		font-family: inherit;
		background: none;
		border: none;
		cursor: pointer;
	}

	.nav-dropdown-toggle:hover,
	.nav-dropdown.open .nav-dropdown-toggle {
		color: white;
		background: rgba(255,255,255,0.08);
	}

	.nav-dropdown-menu {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		background: var(--graphite);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 10px;
		box-shadow: 0 12px 40px rgba(0,0,0,0.5);
		min-width: 190px;
		overflow: hidden;
		z-index: 99;
		display: flex;
		flex-direction: column;
	}

	.nav-dropdown-link {
		display: block;
		width: 100%;
		padding: 0.65rem 1rem;
		font-family: var(--font-sans);
		font-size: 0.82rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: none;
		color: rgba(255,255,255,0.7);
		text-decoration: none;
		transition: background 0.15s, color 0.15s;
	}

	.nav-dropdown-link:hover {
		background: rgba(255,255,255,0.07);
		color: white;
	}

	.nav-dropdown-link.active {
		color: var(--silver);
	}

	/* ── Actions ── */
	.nav-actions {
		display: none;
		align-items: center;
		gap: 0.75rem;
		flex-shrink: 0;
	}

	.lang-select { position: relative; }

	.lang-toggle {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: rgba(255,255,255,0.55);
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 6px;
		padding: 0.3rem 0.55rem;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
	}

	.lang-toggle:hover,
	.lang-select.open .lang-toggle {
		color: white;
		background: rgba(255,255,255,0.12);
		border-color: rgba(255,255,255,0.25);
	}

	.lang-backdrop {
		position: fixed;
		inset: 0;
		z-index: 98;
	}

	.lang-dropdown {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		background: var(--graphite);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 10px;
		box-shadow: 0 12px 40px rgba(0,0,0,0.5);
		min-width: 148px;
		overflow: hidden;
		z-index: 99;
	}

	.lang-option {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
		padding: 0.55rem 0.9rem;
		font-family: var(--font-sans);
		font-size: 0.82rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		color: rgba(255,255,255,0.7);
		transition: background 0.15s, color 0.15s;
	}

	.lang-option:hover { background: rgba(255,255,255,0.07); color: white; }
	.lang-option.active { color: var(--silver); }

	.lang-code { font-weight: 700; font-size: 0.72rem; letter-spacing: 0.06em; min-width: 26px; }
	.lang-label { color: inherit; opacity: 0.65; font-size: 0.8rem; }
	.lang-option.active .lang-label { opacity: 1; }

	.btn-cta {
		font-family: var(--font-sans);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--navy);
		background: linear-gradient(135deg, var(--platinum), var(--silver));
		text-decoration: none;
		padding: 0.65rem 1.3rem;
		border-radius: 8px;
		transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
		white-space: nowrap;
		box-shadow: 0 2px 14px rgba(5,9,15,0.25);
	}

	.btn-cta:hover {
		opacity: 0.92;
		transform: translateY(-1px);
		box-shadow: 0 4px 20px rgba(5,9,15,0.35);
	}

	/* ── Mobile ── */
	.mobile-right {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-left: auto;
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 22px;
		height: 15px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.hamburger span {
		display: block;
		height: 2px;
		background: rgba(255,255,255,0.8);
		border-radius: 2px;
		transition: transform 0.3s, opacity 0.3s;
	}

	.hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
	.hamburger.open span:nth-child(2) { opacity: 0; }
	.hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

	.mobile-menu {
		display: flex;
		flex-direction: column;
		background: var(--navy-mid);
		border-top: 1px solid rgba(255,255,255,0.06);
		padding: 1rem 1.5rem 1.5rem;
		box-shadow: 0 16px 48px rgba(0,0,0,0.5);
	}

	.mobile-link {
		font-family: var(--font-sans);
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.7);
		text-decoration: none;
		padding: 0.8rem 0;
		border-bottom: 1px solid rgba(255,255,255,0.06);
		transition: color 0.2s;
	}

	.mobile-link:last-of-type { border-bottom: none; }
	.mobile-link.active, .mobile-link:hover { color: var(--silver); }

	.mobile-dropdown-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-family: inherit;
		background: none;
		border: none;
		cursor: pointer;
	}

	.mobile-dropdown-chevron {
		opacity: 0.6;
		transition: transform 0.2s;
		flex-shrink: 0;
	}

	.mobile-dropdown-chevron.open {
		transform: rotate(180deg);
	}

	.mobile-submenu {
		display: flex;
		flex-direction: column;
		padding-bottom: 0.25rem;
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}

	.mobile-sublink {
		font-family: var(--font-sans);
		font-size: 0.88rem;
		font-weight: 500;
		color: rgba(255,255,255,0.6);
		text-decoration: none;
		padding: 0.6rem 0 0.6rem 1rem;
		transition: color 0.2s;
	}

	.mobile-sublink.active, .mobile-sublink:hover { color: var(--silver); }

	.mobile-cta {
		display: inline-block;
		margin-top: 1rem;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--navy);
		background: linear-gradient(135deg, var(--platinum), var(--silver));
		text-decoration: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-align: center;
	}

	@media (min-width: 1100px) {
		.nav-links { display: flex; }
		.nav-actions { display: flex; }
		.mobile-right { display: none; }
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import { i18n, langMeta, type Lang } from '$lib/i18n.svelte';
	import faviconUrl from '$lib/assets/favicon.svg';

	type NavItem = { href: string; label: string };
	type Menu = { id: string; label: string; href?: string; items: NavItem[] };

	let scrolled = $state(false);
	let mobileOpen = $state(false);
	let langOpen = $state(false);
	let openMenu = $state<string | null>(null);        // desktop dropdown
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	function openDropdown(id: string) {
		clearTimeout(closeTimer);
		openMenu = id;
	}

	function closeDropdownDelayed() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => { openMenu = null; }, 200);
	}

	// Close a dropdown when keyboard focus leaves it
	function onMenuFocusOut(e: FocusEvent) {
		const li = e.currentTarget as HTMLElement;
		if (!li.contains(e.relatedTarget as Node)) openMenu = null;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			openMenu = null;
			langOpen = false;
			mobileOpen = false;
		}
	}

	const langs = Object.entries(langMeta) as [Lang, { label: string }][];
	const langTitle: Record<string, string> = { sr: 'Jezik', en: 'Language', it: 'Lingua', ru: 'Язык', de: 'Sprache' };

	$effect(() => {
		const handler = () => { scrolled = window.scrollY > 60; };
		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});

	$effect(() => {
		$page.url.pathname;
		mobileOpen = false;
		openMenu = null;
		clearTimeout(closeTimer);
	});

	// Every existing page stays reachable from the menu
	const menus = $derived<Menu[]>([
		{
			id: 'explore',
			label: i18n.t.nav.explore,
			items: [
				{ href: '/firme',          label: i18n.t.nav.companies },
				{ href: '/kategorije',     label: i18n.t.nav.industries },
				{ href: '/mreza',          label: i18n.t.nav.directory },
				{ href: '/firme#pretraga', label: i18n.t.nav.search }
			]
		},
		{
			id: 'business',
			label: i18n.t.nav.business,
			items: [
				{ href: '/b2b',                  label: i18n.t.nav.b2b },
				{ href: '/investicije',          label: i18n.t.nav.investments },
				{ href: '/b2b/dijaspora-mreza',  label: i18n.t.nav.international },
				{ href: '/umrezavanje',          label: i18n.t.nav.enquiries },
				{ href: '/oglasi',               label: i18n.t.nav.promote }
			]
		},
		{
			id: 'platform',
			label: i18n.t.nav.platform,
			href: '/platforma',
			items: [
				{ href: '/platforma', label: i18n.t.nav.platformOverview },
				{ href: '/usluge',  label: i18n.t.nav.services },
				{ href: '/prilike', label: i18n.t.nav.opportunities }
			]
		},
		{
			id: 'about',
			label: i18n.t.nav.about,
			href: '/o-nama',
			items: [
				{ href: '/o-nama',    label: i18n.t.nav.about },
				{ href: '/vijesti',   label: i18n.t.nav.news },
				{ href: '/dogadjaji', label: i18n.t.nav.events },
				{ href: '/kontakt',   label: i18n.t.nav.contact }
			]
		}
	]);

	// Line icons (feather-style) for dropdown and mobile links, keyed by href
	const icons: Record<string, string> = {
		'/firme': '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1"/>',
		'/kategorije': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
		'/mreza': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
		'/firme#pretraga': '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>',
		'/b2b': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20"/>',
		'/investicije': '<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
		'/b2b/dijaspora-mreza': '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
		'/umrezavanje': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
		'/oglasi': '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
		'/platforma': '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
		'/usluge': '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
		'/prilike': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
		'/o-nama': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
		'/vijesti': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
		'/dogadjaji': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
		'/kontakt': '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>'
	};

	function isActive(href: string) {
		if (href.includes('#')) return false;
		const path = $page.url.pathname;
		if (href === '/') return path === '/';
		return path === href || path.startsWith(href + '/');
	}

	function menuActive(menu: Menu) {
		return menu.items.some((l) => isActive(l.href));
	}
</script>

<svelte:window onkeydown={onKeydown} />

<nav class="nav" class:scrolled class:mobile-open={mobileOpen} aria-label="Main">
	<div class="nav-inner">
		<a href="/" class="logo">
			<img src={faviconUrl} alt="Semberija.app" class="logo-icon" />
			<img src="/semberija-wordmark-svetlo.svg" alt="Semberija.app" class="logo-wordmark" />
		</a>

		<ul class="nav-links">
			<li>
				<a href="/" class="nav-link" class:active={isActive('/')} aria-current={isActive('/') ? 'page' : undefined}>
					{i18n.t.nav.home}
				</a>
			</li>
			{#each menus as menu (menu.id)}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<li
					class="nav-dropdown"
					class:open={openMenu === menu.id}
					onmouseenter={() => openDropdown(menu.id)}
					onmouseleave={closeDropdownDelayed}
					onfocusout={onMenuFocusOut}
				>
					{#if menu.href}
						<!-- Top-level link (e.g. O nama) still goes to its page; hover/focus shows the dropdown -->
						<a
							href={menu.href}
							class="nav-link nav-dropdown-toggle"
							class:active={menuActive(menu)}
							aria-haspopup="true"
							aria-expanded={openMenu === menu.id}
							onfocus={() => openDropdown(menu.id)}
						>
							{menu.label}
							<svg class="chevron" width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M1 3l4 4 4-4"/></svg>
						</a>
					{:else}
						<button
							type="button"
							class="nav-link nav-dropdown-toggle"
							class:active={menuActive(menu)}
							aria-haspopup="true"
							aria-expanded={openMenu === menu.id}
							onclick={() => (openMenu = openMenu === menu.id ? null : menu.id)}
						>
							{menu.label}
							<svg class="chevron" width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M1 3l4 4 4-4"/></svg>
						</button>
					{/if}
					{#if openMenu === menu.id}
						<div class="nav-dropdown-menu">
							<p class="nav-dropdown-head">{menu.label}</p>
							{#each menu.items as link, i}
								<a
									href={link.href}
									class="nav-dropdown-link"
									class:active={isActive(link.href)}
									aria-current={isActive(link.href) ? 'page' : undefined}
									style="--i: {i}"
								>
									<span class="dd-icon" aria-hidden="true">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{@html icons[link.href] ?? ''}</svg>
									</span>
									<span class="dd-label">{link.label}</span>
									<svg class="dd-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
								</a>
							{/each}
						</div>
					{/if}
				</li>
			{/each}
		</ul>

		<div class="nav-actions">
			<div class="lang-select" class:open={langOpen}>
				<button class="lang-toggle" onclick={() => (langOpen = !langOpen)} aria-label="Switch language" aria-expanded={langOpen}>
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
								{#if i18n.lang === code}
									<svg class="lang-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>
			<a href="/kontakt?tip=registracija" class="btn-cta">
				{i18n.t.nav.listCta}
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
			</a>
		</div>

		<div class="mobile-right">
			<button
				class="hamburger"
				class:open={mobileOpen}
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
				aria-expanded={mobileOpen}
				aria-controls="mobile-menu"
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div class="mobile-menu" id="mobile-menu">
			<a href="/" class="mobile-link" class:active={isActive('/')} aria-current={isActive('/') ? 'page' : undefined}>{i18n.t.nav.home}</a>

			<!-- Every group is always expanded so all links are visible -->
			<div class="mobile-groups">
				{#each menus as menu (menu.id)}
					<div class="mobile-group">
						{#if menu.href}
							<a href={menu.href} class="mobile-group-title" class:active={menuActive(menu)}>{menu.label}</a>
						{:else}
							<p class="mobile-group-title" class:active={menuActive(menu)}>{menu.label}</p>
						{/if}
						{#each menu.items as link}
							<a
								href={link.href}
								class="mobile-sublink"
								class:active={isActive(link.href)}
								aria-current={isActive(link.href) ? 'page' : undefined}
							>
								<span class="dd-icon" aria-hidden="true">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">{@html icons[link.href] ?? ''}</svg>
								</span>
								{link.label}
							</a>
						{/each}
					</div>
				{/each}
			</div>

			<div class="mobile-langs">
				<p class="mobile-group-title" id="mobile-lang-title">{langTitle[i18n.lang] ?? langTitle.en}</p>
				<div class="mobile-lang-row" role="group" aria-labelledby="mobile-lang-title">
					{#each langs as [code, meta]}
						<button
							type="button"
							class="mobile-lang"
							class:active={i18n.lang === code}
							aria-pressed={i18n.lang === code}
							title={meta.label}
							onclick={() => i18n.setLang(code)}
						>
							{code.toUpperCase()}
						</button>
					{/each}
				</div>
			</div>

			<a href="/kontakt?tip=registracija" class="mobile-cta">{i18n.t.nav.listCta}</a>
		</div>
	{/if}
</nav>

<style>
	.nav {
		position: fixed;
		top: 0; left: 0; right: 0;
		z-index: 100;
		background: #343A40;
		transition: box-shadow 0.35s ease;
	}

	.nav.scrolled {
		box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4);
	}

	/* Deeper pool of shade behind the logo, fading into the bar grey */
	.nav::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: var(--nav-h);
		width: min(560px, 75%);
		background:
			radial-gradient(ellipse 70% 160% at 12% 50%, rgba(12,15,19,0.78) 0%, rgba(18,22,26,0.45) 45%, transparent 78%);
		pointer-events: none;
	}

	.nav-inner {
		position: relative;
		padding: 0 clamp(1.5rem, 3.5vw, 4rem);
		height: var(--nav-h);
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	/* ── Logo ── */
	.logo {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-right: 0.75rem;
		text-decoration: none;
	}

	/* Logo is taller than the bar and hangs below its bottom edge.
	   translateY = (icon height - bar height) / 2 + top gap */
	.logo-icon {
		height: 104px;
		width: auto;
		display: block;
		transform: translateY(14px);
		filter: drop-shadow(0 6px 14px rgba(0,0,0,0.45)) drop-shadow(0 0 10px rgba(255,255,255,0.08));
		transition: transform 0.2s, filter 0.2s;
	}

	.logo:hover .logo-icon {
		transform: translateY(12px);
		filter: drop-shadow(0 10px 18px rgba(0,0,0,0.5)) drop-shadow(0 0 14px rgba(255,255,255,0.14));
	}

	.logo-wordmark {
		height: 22px;
		width: auto;
		display: block;
		/* Crisp edge + soft halo so the light wordmark lifts off the bar */
		filter: drop-shadow(0 1px 1px rgba(0,0,0,0.55)) drop-shadow(0 0 12px rgba(255,255,255,0.14));
		transition: filter 0.3s ease;
	}

	.logo:hover .logo-wordmark {
		filter: drop-shadow(0 1px 1px rgba(0,0,0,0.55)) drop-shadow(0 0 16px rgba(255,255,255,0.26));
	}

	@media (min-width: 480px) {
		.logo-wordmark { height: 30px; }
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
		font-size: 20px;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #FAF9F6;
		text-decoration: none;
		padding: 0.7rem 0.75rem;
		border-radius: 6px;
		transition: color 0.2s, background 0.2s;
		white-space: nowrap;
		line-height: 1;
	}

	.nav-link:hover {
		color: #FAF9F6;
		background: rgba(255,255,255,0.08);
	}

	.nav-link.active {
		color: #FAF9F6;
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 8px;
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
		color: #FAF9F6;
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
		min-width: 260px;
		overflow: hidden;
		z-index: 99;
		display: flex;
		flex-direction: column;
	}

	.nav-dropdown-link {
		display: block;
		width: 100%;
		padding: 0.85rem 1.25rem;
		font-family: var(--font-sans);
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: none;
		color: #FAF9F6;
		text-decoration: none;
		transition: background 0.15s, color 0.15s;
	}

	.nav-dropdown-link:hover {
		background: rgba(255,255,255,0.07);
		color: #FAF9F6;
	}

	.nav-dropdown-link.active {
		color: #FAF9F6;
		text-decoration: underline;
		text-underline-offset: 5px;
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
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: #FAF9F6;
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 6px;
		padding: 0.45rem 0.75rem;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
	}

	.lang-toggle:hover,
	.lang-select.open .lang-toggle {
		color: #FAF9F6;
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
		min-width: 190px;
		overflow: hidden;
		z-index: 99;
	}

	.lang-option {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		width: 100%;
		padding: 0.75rem 1.1rem;
		font-family: var(--font-sans);
		font-size: 17px;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		color: #FAF9F6;
		transition: background 0.15s, color 0.15s;
	}

	.lang-option:hover { background: rgba(255,255,255,0.07); color: #FAF9F6; }
	.lang-option.active { color: #FAF9F6; font-weight: 700; }

	.lang-code { font-weight: 700; font-size: 15px; letter-spacing: 0.06em; min-width: 26px; }
	.lang-label { color: inherit; font-size: 16px; }

	.btn-cta {
		font-family: var(--font-sans);
		font-size: 17px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--cta-text);
		background: var(--cta);
		text-decoration: none;
		padding: 0.85rem 1.6rem;
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
		flex-shrink: 0;
	}

	/* Phones: logo scales with the screen so the hamburger always fits */
	@media (max-width: 479px) {
		.nav-inner { padding: 0 1rem; gap: 0.75rem; }
		.logo { gap: 0.6rem; margin-right: 0; min-width: 0; }
		.logo-icon { --icon-h: clamp(80px, 25vw, 104px); height: var(--icon-h); transform: translateY(calc(var(--icon-h) / 2 - 38px)); }
		.logo:hover .logo-icon { transform: translateY(calc(var(--icon-h) / 2 - 40px)); }
		.logo-wordmark { height: clamp(16px, 6.8vw, 30px); }
		.mobile-right .hamburger { padding: 12px 6px; width: 40px; height: 44px; box-sizing: border-box; }
	}

	/* Tablets and small laptops (hamburger layout): larger logo */
	@media (min-width: 480px) and (max-width: 1479px) {
		.logo-icon { height: 112px; transform: translateY(18px); }
		.logo:hover .logo-icon { transform: translateY(16px); }
		.logo-wordmark { height: 34px; }
	}

	/* Language switcher in the mobile menu */
	.mobile-langs { padding: 0.9rem 0 0.25rem; }
	.mobile-lang-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
	.mobile-lang {
		min-width: 52px;
		min-height: 44px;
		padding: 0 0.9rem;
		border: 0;
		border-radius: 50px;
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: rgba(250,249,246,0.8);
		background: rgba(255,255,255,0.06);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
		cursor: pointer;
		transition: background 0.2s, color 0.2s, box-shadow 0.2s;
	}
	.mobile-lang:hover { color: #FAF9F6; background: rgba(255,255,255,0.12); }
	.mobile-lang.active {
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 10px 22px -10px rgba(155,17,30,0.85), inset 0 1px 0 rgba(255,255,255,0.22);
	}
	.mobile-lang:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }

	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 28px;
		height: 20px;
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

	.hamburger.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
	.hamburger.open span:nth-child(2) { opacity: 0; }
	.hamburger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

	.mobile-menu {
		display: flex;
		flex-direction: column;
		background: #343A40;
		border-top: 1px solid rgba(255,255,255,0.06);
		padding: 1rem 1.5rem 1.5rem;
		box-shadow: 0 16px 48px rgba(0,0,0,0.5);
	}

	.mobile-link {
		font-family: var(--font-sans);
		font-size: 20px;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #FAF9F6;
		text-decoration: none;
		padding: 1rem 0;
		border-bottom: 1px solid rgba(255,255,255,0.06);
		transition: color 0.2s;
	}

	.mobile-link:last-of-type { border-bottom: none; }
	.mobile-link.active, .mobile-link:hover { color: #FAF9F6; }
	.mobile-link.active { text-decoration: underline; text-underline-offset: 6px; }

	.mobile-sublink {
		font-family: var(--font-sans);
		font-size: 18px;
		font-weight: 500;
		color: #FAF9F6;
		text-decoration: none;
		padding: 0.75rem 0 0.75rem 1rem;
		transition: color 0.2s;
	}

	.mobile-sublink.active, .mobile-sublink:hover { color: #FAF9F6; }
	.mobile-sublink.active { text-decoration: underline; text-underline-offset: 5px; }

	.mobile-cta {
		display: inline-block;
		margin-top: 1rem;
		font-family: var(--font-sans);
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--cta-text);
		background: var(--cta);
		text-decoration: none;
		padding: 0.95rem 1.75rem;
		border-radius: 8px;
		text-align: center;
	}

	@media (min-width: 1480px) {
		.logo-icon { height: 136px; transform: translateY(22px); }
		.logo:hover .logo-icon { transform: translateY(20px); }
		.logo-wordmark { height: 30px; }
	}

	/* Full desktop menu, truly centred between logo and actions.
	   Shown from 1660px, where every language fits at 20px text. */
	@media (min-width: 1660px) {
		.nav-inner {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			grid-template-rows: 100%;
		}
		.logo { justify-self: start; }
		.nav-links { display: flex; flex: none; }
		.nav-actions { display: flex; justify-self: end; }
		.mobile-right { display: none; }
	}

	@media (min-width: 1860px) {
		.logo-wordmark { height: 40px; }
	}

	/* Dropdown chevron flips when open */
	.chevron {
		margin-left: 6px;
		opacity: 0.7;
		transition: transform 0.2s ease;
	}
	.nav-dropdown.open .chevron { transform: rotate(180deg); }

	/* Mobile menu: fits the visible screen (dvh excludes the phone's
	   address bar) and scrolls if the content is taller */
	.mobile-menu {
		max-height: calc(100vh - var(--nav-h));
		max-height: calc(100dvh - var(--nav-h));
		overflow-y: auto;
		overscroll-behavior: contain;
	}

	.mobile-link {
		min-height: 48px;
		display: flex;
		align-items: center;
	}

	.mobile-groups {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.25rem 2rem;
		padding: 0.25rem 0 0.5rem;
	}

	.mobile-group {
		display: flex;
		flex-direction: column;
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(255,255,255,0.08);
	}

	.mobile-group-title {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.6);
		text-decoration: none;
		margin: 0 0 0.25rem;
		padding: 0.35rem 0;
	}

	a.mobile-group-title:hover,
	.mobile-group-title.active { color: #FAF9F6; }

	.mobile-sublink {
		min-height: 44px;
		display: flex;
		align-items: center;
		padding: 0.5rem 0 !important;
	}

	/* Tablets and laptops: groups side by side so nothing is hidden */
	@media (min-width: 700px) {
		.mobile-groups { grid-template-columns: repeat(2, 1fr); }
		.mobile-group { border-bottom: none; }
	}
	@media (min-width: 1100px) {
		.mobile-groups { grid-template-columns: repeat(4, 1fr); }
		.mobile-menu { padding-left: clamp(1.5rem, 3.5vw, 4rem); padding-right: clamp(1.5rem, 3.5vw, 4rem); }
	}

	.mobile-link:focus-visible,
	.mobile-sublink:focus-visible,
	.nav-link:focus-visible,
	.nav-dropdown-link:focus-visible {
		outline: 2px solid #FAF9F6;
		outline-offset: 2px;
		border-radius: 6px;
	}

	/* ═════════ Premium layer ═════════ */

	/* Bar: same #343A40, with a soft top-light gradient and a fine
	   red hairline that fades out toward the edges */
	.nav {
		background: linear-gradient(180deg, #3a4148 0%, #343A40 55%, #30363c 100%);
	}
	.nav::after {
		content: '';
		position: absolute;
		left: 0; right: 0; bottom: 0;
		height: 1px;
		/* Starts after the logo area so no red line shows behind the logo */
		background: linear-gradient(90deg, transparent 0%, transparent 32%, rgba(224,65,79,0.75) 62%, rgba(155,17,30,0.0) 94%, transparent 100%);
		pointer-events: none;
	}
	/* Logo and links paint above the hairline */
	.nav-inner { z-index: 1; }
	.nav.scrolled {
		background: rgba(52,58,64,0.94);
		backdrop-filter: saturate(140%) blur(14px);
		-webkit-backdrop-filter: saturate(140%) blur(14px);
		box-shadow: 0 10px 30px -12px rgba(0,0,0,0.55);
	}

	/* Links: animated red underline instead of a text underline */
	.nav-link {
		position: relative;
		letter-spacing: 0.06em;
		transition: color 0.2s, background 0.2s;
	}
	.nav-link::after {
		content: '';
		position: absolute;
		left: 0.75rem;
		right: 0.75rem;
		bottom: 0.2rem;
		height: 2px;
		border-radius: 2px;
		background: linear-gradient(90deg, #9B111E, #e0414f);
		transform: scaleX(0);
		transform-origin: center;
		transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	.nav-link:hover,
	.nav-dropdown-toggle:hover,
	.nav-dropdown.open .nav-dropdown-toggle {
		background: rgba(255,255,255,0.05);
	}
	.nav-link:hover::after,
	.nav-dropdown.open .nav-link::after,
	.nav-link.active::after { transform: scaleX(1); }
	.nav-link.active { text-decoration: none; }
	.nav-dropdown-toggle .chevron { margin-left: 8px; }

	/* Dropdown panel */
	.nav-dropdown-menu {
		top: calc(100% + 14px);
		left: 50%;
		min-width: 320px;
		padding: 0.6rem;
		gap: 2px;
		overflow: visible;
		background: linear-gradient(180deg, rgba(58,65,72,0.97), rgba(40,45,51,0.98));
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 16px;
		box-shadow:
			0 1px 0 rgba(255,255,255,0.08) inset,
			0 24px 60px -18px rgba(0,0,0,0.65),
			0 8px 20px -10px rgba(0,0,0,0.4);
		transform-origin: top center;
		animation: dd-in 0.28s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}
	/* Invisible bridge so the pointer can travel from the toggle to the panel */
	.nav-dropdown-menu::before {
		content: '';
		position: absolute;
		left: 0; right: 0;
		top: -16px;
		height: 16px;
	}
	/* Small pointer toward the toggle */
	.nav-dropdown-menu::after {
		content: '';
		position: absolute;
		top: -6px;
		left: 50%;
		width: 12px;
		height: 12px;
		background: rgba(58,65,72,0.97);
		border-left: 1px solid rgba(255,255,255,0.1);
		border-top: 1px solid rgba(255,255,255,0.1);
		transform: translateX(-50%) rotate(45deg);
		border-radius: 2px 0 0 0;
	}
	@keyframes dd-in {
		from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.98); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
	}

	.nav-dropdown-head {
		margin: 0;
		padding: 0.55rem 0.9rem 0.65rem;
		font-family: var(--font-sans);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.5);
		border-bottom: 1px solid rgba(255,255,255,0.07);
		margin-bottom: 0.35rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.nav-dropdown-head::before {
		content: '';
		width: 16px;
		height: 2px;
		border-radius: 2px;
		background: #e0414f;
	}

	.nav-dropdown-link {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.7rem 0.9rem;
		border-radius: 10px;
		animation: dd-item 0.35s cubic-bezier(0.2, 0.7, 0.2, 1) both;
		animation-delay: calc(0.04s + var(--i, 0) * 0.04s);
		transition: background 0.2s, color 0.2s;
	}
	@keyframes dd-item {
		from { opacity: 0; transform: translateY(-4px); }
		to   { opacity: 1; transform: none; }
	}
	.nav-dropdown-link:hover,
	.nav-dropdown-link:focus-visible {
		background: rgba(255,255,255,0.07);
	}
	.nav-dropdown-link.active {
		text-decoration: none;
		background: rgba(155,17,30,0.22);
	}
	.nav-dropdown-link.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 22%;
		bottom: 22%;
		width: 3px;
		border-radius: 3px;
		background: #e0414f;
	}

	.dd-icon {
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		display: grid;
		place-items: center;
		border-radius: 10px;
		color: #FAF9F6;
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.08);
		transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
	}
	.nav-dropdown-link:hover .dd-icon,
	.nav-dropdown-link.active .dd-icon {
		background: var(--cta);
		border-color: var(--cta);
		transform: scale(1.04);
	}
	.dd-label { flex: 1; white-space: nowrap; padding-right: 0.5rem; }
	.nav-dropdown-menu { width: max-content; }
	.dd-arrow {
		opacity: 0;
		transform: translateX(-6px);
		transition: opacity 0.2s, transform 0.2s;
		color: rgba(250,249,246,0.8);
	}
	.nav-dropdown-link:hover .dd-arrow,
	.nav-dropdown-link:focus-visible .dd-arrow { opacity: 1; transform: none; }

	/* Language menu matches the dropdown panels */
	.lang-toggle { border-radius: 8px; }
	.lang-dropdown {
		top: calc(100% + 12px);
		padding: 0.45rem;
		border-radius: 14px;
		min-width: 210px;
		background: linear-gradient(180deg, rgba(58,65,72,0.97), rgba(40,45,51,0.98));
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		box-shadow: 0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px -18px rgba(0,0,0,0.65);
		animation: lang-in 0.24s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}
	@keyframes lang-in {
		from { opacity: 0; transform: translateY(-6px); }
		to   { opacity: 1; transform: none; }
	}
	.lang-option { border-radius: 9px; gap: 0.75rem; }
	.lang-option.active { background: rgba(155,17,30,0.22); }
	.lang-code {
		display: grid;
		place-items: center;
		min-width: 34px;
		height: 26px;
		border-radius: 6px;
		font-size: 13px;
		background: rgba(255,255,255,0.08);
	}
	.lang-option.active .lang-code { background: var(--cta); }
	.lang-label { flex: 1; }
	.lang-check { color: #e0414f; }

	/* CTA: arrow + light sweep */
	.btn-cta {
		position: relative;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		border-radius: 10px;
		box-shadow: 0 10px 24px -10px rgba(155,17,30,0.8), inset 0 1px 0 rgba(255,255,255,0.18);
	}
	.btn-cta svg { transition: transform 0.25s; }
	.btn-cta::before {
		content: '';
		position: absolute;
		top: 0;
		left: -60%;
		width: 40%;
		height: 100%;
		background: linear-gradient(100deg, transparent, rgba(255,255,255,0.28), transparent);
		transform: skewX(-20deg);
		transition: left 0.6s ease;
	}
	.btn-cta:hover {
		opacity: 1;
		background: var(--cta-hover);
		box-shadow: 0 14px 28px -10px rgba(155,17,30,0.9), inset 0 1px 0 rgba(255,255,255,0.18);
	}
	.btn-cta:hover::before { left: 120%; }
	.btn-cta:hover svg { transform: translateX(3px); }

	/* Mobile menu */
	.mobile-menu {
		background: linear-gradient(180deg, #343A40 0%, #2c3237 100%);
		animation: lang-in 0.28s cubic-bezier(0.2, 0.7, 0.2, 1) both;
	}
	.mobile-group-title {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.mobile-group-title::before {
		content: '';
		width: 16px;
		height: 2px;
		border-radius: 2px;
		background: #e0414f;
	}
	.mobile-sublink {
		gap: 0.8rem;
		border-radius: 10px;
		transition: background 0.2s;
	}
	.mobile-sublink .dd-icon { width: 34px; height: 34px; border-radius: 9px; }
	.mobile-sublink:hover .dd-icon,
	.mobile-sublink.active .dd-icon { background: var(--cta); border-color: var(--cta); }
	.mobile-sublink.active { text-decoration: none; }
	.mobile-cta { border-radius: 10px; box-shadow: 0 10px 24px -10px rgba(155,17,30,0.8); }

	@media (prefers-reduced-motion: reduce) {
		.nav-dropdown-menu, .nav-dropdown-link, .lang-dropdown, .mobile-menu { animation: none; }
		.nav-dropdown-menu { transform: translateX(-50%); }
	}
</style>

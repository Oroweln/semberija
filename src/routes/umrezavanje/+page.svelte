<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { networkingPosts, showSampleContent } from '$lib/data';
	import { enquiryUrl } from '$lib/enquiry';
	import { reveal } from '$lib/actions/reveal';

	const posts = showSampleContent ? networkingPosts : [];

	// Post types exist in Serbian and English in the data; labels come from the translations
	const types_sr = ['Svi', 'Partnerstvo', 'Investicija', 'Saradnja'];
	const types_en = ['All', 'Partnership', 'Investment', 'Collaboration'];
	let active = $state(0);
	let search = $state('');

	const filteredPosts = $derived(
		posts.filter((post) => {
			const type = i18n.lang === 'sr' ? post.type_sr : post.type_en;
			const title = (i18n.lang === 'sr' ? post.title_sr : post.title_en).toLowerCase();
			const desc = (i18n.lang === 'sr' ? post.desc_sr : post.desc_en).toLowerCase();
			const q = search.trim().toLowerCase();
			const matchSearch = !q || title.includes(q) || desc.includes(q) || post.company.toLowerCase().includes(q);
			const matchType = active === 0 || type === (i18n.lang === 'sr' ? types_sr[active] : types_en[active]);
			return matchSearch && matchType;
		})
	);

	// Icons for the six kinds of enquiries (same order as i18n.t.ui.networkTypes)
	const kindIcons = ['handshake', 'truck', 'spark', 'export', 'chart', 'b2b'];
</script>

<svelte:head>
	<title>{i18n.t.networking.heading} — Semberija.app</title>
</svelte:head>

{#snippet kindIcon(kind: string)}
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if kind === 'handshake'}
			<path d="M8 12l3 3 5-5"/><path d="M2 12l4-4 4 2 4-2 4 2 4-2"/><path d="M2 12l6 6c1 1 2 1 3 0l9-9"/>
		{:else if kind === 'truck'}
			<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
		{:else if kind === 'spark'}
			<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>
		{:else if kind === 'export'}
			<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"/>
		{:else if kind === 'chart'}
			<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/>
		{:else}
			<circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 7l3.5 3M18 7l-3.5 3M6 17l3.5-3M18 17l-3.5-3"/>
		{/if}
	</svg>
{/snippet}

<div class="page-wrap">
<!-- ─── HERO ─── -->
<section class="page-top reveal-card" use:reveal>
	<div class="top-glow" aria-hidden="true"></div>
	<div class="top-lines" aria-hidden="true"></div>
	<div class="container">
		<span class="page-label"><span class="page-label-dot"></span>{i18n.t.nav.network}</span>
		<h1>{i18n.t.networking.heading}</h1>
		<p class="page-sub">{i18n.t.networking.sub}</p>

		{#if posts.length}
			<!-- Search + type filter (shown once posts exist) -->
			<div class="filter-bar" role="search">
				<div class="fb-field fb-query">
					<svg class="fb-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
					<input type="search" bind:value={search} placeholder={i18n.t.ui.searchNetwork} aria-label={i18n.t.ui.searchNetwork} autocomplete="off" />
				</div>
			</div>
			<div class="type-chips" role="group" aria-label={i18n.t.nav.network}>
				{#each i18n.t.networking.types as label, i}
					<button type="button" class="type-chip" class:active={active === i} aria-pressed={active === i} onclick={() => (active = i)}>{label}</button>
				{/each}
			</div>
		{:else}
			<div class="hero-btns">
				<a href={enquiryUrl('b2b')} class="btn-main">
					<span>{i18n.t.board.submit}</span>
					<span class="btn-main-arrow" aria-hidden="true">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
					</span>
				</a>
				<a href="/b2b" class="btn-ghost">{i18n.t.nav.b2b}</a>
			</div>
		{/if}
	</div>
</section>

<!-- ─── BOARD ─── -->
<section class="net-body reveal-card" use:reveal>
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		{#if posts.length === 0}
			<!-- Empty board: preview of how posts will look + call to post the first one -->
			<div class="board-empty">
				<div class="ghost-stack" aria-hidden="true">
					{#each [0, 1, 2] as g}
						<div class="ghost-card" style="--g:{g}">
							<span class="ghost-pill"></span>
							<span class="ghost-line w80"></span>
							<span class="ghost-line w60"></span>
							<span class="ghost-foot"><i></i><b></b></span>
						</div>
					{/each}
					<span class="ghost-badge">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
					</span>
				</div>
				<div class="board-copy">
					<h2>{i18n.t.board.enqTitle}</h2>
					<p>{i18n.t.board.enqDesc}</p>
					<a href={enquiryUrl('b2b')} class="btn-main dark">
						<span>{i18n.t.board.submit}</span>
						<span class="btn-main-arrow" aria-hidden="true">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
				</div>
			</div>
		{:else if filteredPosts.length === 0}
			<div class="empty">
				<span class="empty-icon" aria-hidden="true">
					<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/><path d="M8.5 8.5l5 5M13.5 8.5l-5 5"/></svg>
				</span>
				<p>{i18n.t.ui.noResults}</p>
				<button type="button" class="ghost-btn" onclick={() => { search = ''; active = 0; }}>{i18n.t.ecosystem.clear}</button>
			</div>
		{:else}
			<div class="net-grid">
				{#each filteredPosts as post (post.id)}
					<article class="net-card">
						<span class="net-type"><span class="net-type-dot" aria-hidden="true"></span>{i18n.lang === 'sr' ? post.type_sr : post.type_en}</span>
						<h3>{i18n.lang === 'sr' ? post.title_sr : post.title_en}</h3>
						<p>{i18n.lang === 'sr' ? post.desc_sr : post.desc_en}</p>
						<div class="net-footer">
							<div class="net-company">
								<span class="net-avatar" aria-hidden="true">{post.company.charAt(0)}</span>
								<span class="net-company-text">
									<strong>{post.company}</strong>
									{#if post.city}<small>{post.city}</small>{/if}
								</span>
							</div>
							<a href={enquiryUrl('b2b', post.company)} class="net-btn" aria-label="{i18n.t.networking.contact}: {post.company}">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}

		<!-- Kinds of enquiries -->
		<div class="kinds">
			<span class="section-kicker">{i18n.t.networking.kindsHeading}</span>
			<div class="kinds-grid">
				{#each i18n.t.ui.networkTypes as label, i}
					<a href={enquiryUrl('b2b')} class="kind">
						<span class="kind-icon">{@render kindIcon(kindIcons[i])}</span>
						<span class="kind-label">{label}</span>
						<span class="kind-arrow" aria-hidden="true">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
						</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Proposal call-to-action -->
		<div class="post-cta">
			<div class="post-cta-glow" aria-hidden="true"></div>
			<div class="post-cta-copy">
				<span class="post-cta-icon" aria-hidden="true">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v6M9 10h6"/></svg>
				</span>
				<div>
					<h2>{i18n.t.networking.proposalHeading}</h2>
					<p>{i18n.t.networking.proposalDesc}</p>
				</div>
			</div>
			<a href={enquiryUrl('b2b')} class="btn-main">
				<span>{i18n.t.board.submit}</span>
				<span class="btn-main-arrow" aria-hidden="true">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
				</span>
			</a>
		</div>
	</div>
</section>
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
	.container { position: relative; max-width: var(--max-w); margin: 0 auto; }

	/* ─── HERO ─── */
	.page-top {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		background: var(--surface-dark);
		color: #FAF9F6;
		padding: clamp(3rem, 7vw, 5rem) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
	}
	.top-glow {
		position: absolute;
		z-index: -1;
		inset: -30% -10% auto;
		height: 130%;
		background:
			radial-gradient(40% 50% at 15% 30%, rgba(120,170,240,0.35), transparent 70%),
			radial-gradient(35% 45% at 85% 40%, rgba(196,42,56,0.25), transparent 70%);
		filter: blur(30px);
		pointer-events: none;
	}
	.top-lines {
		position: absolute;
		z-index: -1;
		inset: 0;
		background:
			linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 56px 56px,
			linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px) 0 0 / 56px 56px;
		-webkit-mask-image: radial-gradient(ellipse 60% 80% at 80% 40%, #000 10%, transparent 75%);
		mask-image: radial-gradient(ellipse 60% 80% at 80% 40%, #000 10%, transparent 75%);
		pointer-events: none;
	}
	.page-label {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-bottom: 1.25rem;
		padding: 0.4rem 1rem;
		border-radius: 50px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #FAF9F6;
		background: rgba(255,255,255,0.08);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
	}
	.page-label-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f06a75;
		box-shadow: 0 0 0 4px rgba(240,106,117,0.2);
	}
	.page-top h1 {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 5vw, 3.8rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		/* Room for descenders: gradient text is clipped to the line box */
		line-height: 1.12;
		padding-bottom: 0.08em;
		text-wrap: balance;
		margin-bottom: 0.9rem;
		background: linear-gradient(180deg, #ffffff 30%, #c9d4e4 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.page-sub {
		font-size: 1.1rem;
		line-height: 1.65;
		color: rgba(250,249,246,0.8);
		max-width: 56ch;
		margin-bottom: 2.25rem;
	}
	.hero-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }

	.btn-main {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		flex-shrink: 0;
		padding: 0.45rem 0.45rem 0.45rem 1.4rem;
		border-radius: 50px;
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
		background: linear-gradient(160deg, #c42a38, var(--cta));
		box-shadow: 0 16px 32px -14px rgba(155,17,30,0.85), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
	}
	.btn-main-arrow {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		color: var(--cta);
		background: #FAF9F6;
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.btn-main:hover { transform: translateY(-2px); }
	.btn-main:hover .btn-main-arrow { transform: rotate(45deg); }
	.btn-main:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }
	.btn-main.dark:focus-visible { outline-color: var(--cta); }
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		padding: 0 1.5rem;
		min-height: 50px;
		border-radius: 50px;
		font-size: 0.92rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: #FAF9F6;
		box-shadow: inset 0 0 0 1px rgba(250,249,246,0.35);
		transition: background 0.3s ease, box-shadow 0.3s ease;
	}
	.btn-ghost:hover { background: rgba(255,255,255,0.1); box-shadow: inset 0 0 0 1px #FAF9F6; }
	.btn-ghost:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 3px; }

	/* Filter bar (same look as /firme) */
	.filter-bar {
		max-width: 640px;
		padding: 0.5rem;
		border-radius: 22px;
		background: #ffffff;
		box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.5);
		transition: box-shadow 0.25s ease;
	}
	.filter-bar:focus-within { box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 3px rgba(240,106,117,0.5); }
	.fb-field {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-height: 60px;
		padding: 0 1rem;
		border-radius: 16px;
		transition: background 0.25s ease;
	}
	.fb-field:hover, .fb-field:focus-within { background: #f4f3ef; }
	.fb-icon { flex-shrink: 0; color: var(--cta); }
	.fb-query input {
		flex: 1;
		min-width: 0;
		border: 0;
		outline: none;
		background: transparent;
		font: inherit;
		font-size: 1.02rem;
		color: var(--navy);
	}
	.fb-query input::placeholder { color: #8a919c; }
	.type-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.1rem; }
	.type-chip {
		padding: 0.5rem 1.05rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.85rem;
		font-weight: 700;
		color: rgba(250,249,246,0.85);
		background: rgba(255,255,255,0.07);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
		cursor: pointer;
		transition: background 0.3s ease, color 0.3s ease;
	}
	.type-chip:hover { color: #FAF9F6; background: rgba(255,255,255,0.12); }
	.type-chip.active { color: var(--navy); background: #FAF9F6; box-shadow: 0 10px 22px -10px rgba(0,0,0,0.5); }
	.type-chip:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }

	/* ─── BOARD ─── */
	.net-body {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		background: var(--surface-light);
		padding: clamp(2.5rem, 6vw, 4.5rem) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
	}
	.body-backdrop {
		position: absolute;
		z-index: -1;
		inset: 0;
		background: radial-gradient(circle at 1px 1px, rgba(11,52,102,0.07) 1px, transparent 0) 0 0 / 22px 22px;
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 55%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 55%);
		pointer-events: none;
	}

	/* Empty board */
	.board-empty {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
		margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
	}
	.ghost-stack {
		position: relative;
		height: 260px;
		max-width: 420px;
		width: 100%;
		margin: 0 auto;
	}
	.ghost-card {
		position: absolute;
		left: calc(var(--g) * 7%);
		top: calc(var(--g) * 30px);
		width: 86%;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 1.25rem;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 20px 40px -24px rgba(15,23,42,0.3), inset 0 0 0 1px rgba(15,23,42,0.06);
		opacity: calc(0.45 + var(--g) * 0.27);
		transform: rotate(calc((var(--g) - 1) * -3deg));
	}
	.ghost-pill { width: 90px; height: 20px; border-radius: 50px; background: rgba(155,17,30,0.12); }
	.ghost-line { height: 10px; border-radius: 5px; background: rgba(11,52,102,0.1); }
	.ghost-line.w80 { width: 80%; height: 13px; background: rgba(11,52,102,0.18); }
	.ghost-line.w60 { width: 60%; }
	.ghost-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 0.4rem; padding-top: 0.75rem; border-top: 1px solid rgba(15,23,42,0.06); }
	.ghost-foot i { width: 34px; height: 34px; border-radius: 10px; background: rgba(11,52,102,0.12); }
	.ghost-foot b { width: 34px; height: 34px; border-radius: 50%; background: rgba(11,52,102,0.08); }
	.ghost-badge {
		position: absolute;
		right: 2%;
		bottom: 6%;
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 16px 30px -10px rgba(155,17,30,0.7), 0 0 0 8px rgba(155,17,30,0.1);
	}
	.board-copy h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.6rem, 3vw, 2.3rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		color: var(--navy);
		margin-bottom: 0.8rem;
		text-wrap: balance;
	}
	.board-copy p { font-size: 1.02rem; line-height: 1.65; color: #4a525e; max-width: 52ch; margin-bottom: 1.75rem; }

	/* Post cards */
	.net-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1rem, 2vw, 1.25rem);
		margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
	}
	.net-card {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: 1.6rem;
		border-radius: var(--radius-2xl);
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 14px 32px -18px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	.net-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.net-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 34px 60px -28px rgba(15,23,42,0.32), inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.net-card:hover::before { transform: scaleX(1); }
	.net-type {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		align-self: flex-start;
		margin-bottom: 1rem;
		padding: 0.28rem 0.7rem;
		border-radius: 50px;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--cta);
		background: rgba(155,17,30,0.07);
		box-shadow: inset 0 0 0 1px rgba(155,17,30,0.2);
	}
	.net-type-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
	.net-card h3 {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.3;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}
	.net-card p { flex: 1; font-size: 0.92rem; line-height: 1.6; color: #4a525e; margin-bottom: 1.25rem; }
	.net-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.net-company { display: flex; align-items: center; gap: 0.7rem; min-width: 0; }
	.net-avatar {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		border-radius: 12px;
		font-family: var(--font-heading);
		font-weight: 800;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
	}
	.net-company-text { display: flex; flex-direction: column; min-width: 0; }
	.net-company-text strong { font-size: 0.88rem; color: var(--navy); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.net-company-text small { font-size: 0.78rem; color: var(--muted); }
	.net-btn {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		color: #FAF9F6;
		background: var(--navy);
		transition: background 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.net-btn:hover { background: var(--cta); transform: rotate(45deg); }
	.net-btn:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 4rem 1rem;
		margin-bottom: 2.5rem;
		text-align: center;
		color: #4a525e;
		border-radius: var(--radius-2xl);
		background: rgba(255,255,255,0.6);
		box-shadow: inset 0 0 0 1px rgba(15,23,42,0.06);
	}
	.empty-icon {
		display: grid;
		place-items: center;
		width: 60px;
		height: 60px;
		border-radius: 18px;
		color: var(--navy);
		background: rgba(11,52,102,0.07);
	}
	.ghost-btn {
		padding: 0.5rem 1.1rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--navy);
		background: transparent;
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		cursor: pointer;
	}
	.ghost-btn:hover { color: #FAF9F6; background: var(--navy); }

	/* Kinds of enquiries */
	.kinds { margin-bottom: clamp(2.5rem, 5vw, 3.5rem); }
	.section-kicker {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1.1rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #6b7380;
	}
	.section-kicker::before { content: ''; width: 18px; height: 2px; border-radius: 2px; background: var(--accent-line); }
	.kinds-grid { display: grid; grid-template-columns: 1fr; gap: 0.6rem; }
	.kind {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.8rem 0.8rem 0.8rem 0.85rem;
		border-radius: 18px;
		text-decoration: none;
		color: var(--navy);
		background: #ffffff;
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 10px 24px -18px rgba(15,23,42,0.25), inset 0 0 0 1px rgba(15,23,42,0.06);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
	}
	.kind:hover { transform: translateY(-3px); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 22px 40px -22px rgba(15,23,42,0.35), inset 0 0 0 1px rgba(155,17,30,0.22); }
	.kind:focus-visible { outline: 2px solid var(--cta); outline-offset: 3px; }
	.kind-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		border-radius: 13px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		transition: background 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
	}
	.kind:hover .kind-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); transform: rotate(-6deg); }
	.kind-label { flex: 1; font-size: 0.98rem; font-weight: 700; }
	.kind-arrow {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.18);
		transition: background 0.3s ease, color 0.3s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.kind:hover .kind-arrow { color: #FAF9F6; background: var(--cta); transform: rotate(45deg); }

	/* Proposal band */
	.post-cta {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding: clamp(1.75rem, 4vw, 2.75rem);
		border-radius: var(--radius-2xl);
		color: #FAF9F6;
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised);
	}
	.post-cta-glow {
		position: absolute;
		z-index: -1;
		right: -10%;
		top: -60%;
		width: 55%;
		height: 220%;
		background: radial-gradient(ellipse at center, rgba(196,42,56,0.35), transparent 65%);
		pointer-events: none;
	}
	.post-cta-copy { display: flex; align-items: flex-start; gap: 1.1rem; }
	.post-cta-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 54px;
		height: 54px;
		border-radius: 16px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #c42a38, var(--cta));
		box-shadow: 0 12px 24px -10px rgba(155,17,30,0.7), inset 0 1px 0 rgba(255,255,255,0.28);
	}
	.post-cta h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 3vw, 2.1rem);
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.12;
		margin-bottom: 0.5rem;
	}
	.post-cta p { font-size: 1rem; line-height: 1.6; color: rgba(250,249,246,0.78); max-width: 54ch; }
	.post-cta .btn-main { align-self: flex-start; }

	/* ─── Responsive ─── */
	@media (min-width: 600px) {
		.net-grid, .kinds-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 900px) {
		.board-empty { grid-template-columns: 0.9fr 1.1fr; }
		.post-cta { flex-direction: row; align-items: center; justify-content: space-between; }
		.post-cta .btn-main { align-self: center; }
	}
	@media (min-width: 1024px) {
		.net-grid, .kinds-grid { grid-template-columns: repeat(3, 1fr); }
	}
	@media (prefers-reduced-motion: reduce) {
		.btn-main, .btn-main-arrow, .net-card, .net-card::before, .net-btn, .kind, .kind-icon, .kind-arrow { transition: none; }
		.btn-main:hover, .btn-main:hover .btn-main-arrow, .net-card:hover, .net-btn:hover, .kind:hover, .kind:hover .kind-icon, .kind:hover .kind-arrow { transform: none; }
	}
</style>

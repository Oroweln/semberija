<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';
	import { sectors, sectorCount } from '$lib/search';
	import DirectoryFilters from '$lib/components/DirectoryFilters.svelte';

	// Quick picks: sectors with companies on /firme, largest first
	const quick = $derived(
		sectors
			.map((s) => ({ id: s.id, label: i18n.t.ecosystem.sectors[s.id], count: sectorCount(s.id), href: `/firme?sector=${s.id}` }))
			.filter((s) => s.count > 0)
			.sort((a, b) => b.count - a.count)
			.slice(0, 6)
	);

	const categoryStats = $derived.by(() => {
		const map = new Map<string, { name_sr: string; name_en: string; count: number }>();
		for (const firm of domesticFirms) {
			const key = firm.category_sr;
			const entry = map.get(key);
			if (entry) {
				entry.count++;
			} else {
				map.set(key, { name_sr: firm.category_sr, name_en: firm.category_en, count: 1 });
			}
		}
		return [...map.values()].sort((a, b) => b.count - a.count);
	});

	const totalFirms = $derived(categoryStats.reduce((sum, c) => sum + c.count, 0));
	const maxCount = $derived(Math.max(1, ...categoryStats.map((c) => c.count)));

	const nameOf = (c: { name_sr: string; name_en: string }) => (i18n.lang === 'sr' ? c.name_sr : c.name_en);

	// Client-side filter over the category names
	let query = $state('');
	const visible = $derived(
		categoryStats.filter((c) => {
			const q = query.trim().toLowerCase();
			return !q || c.name_sr.toLowerCase().includes(q) || c.name_en.toLowerCase().includes(q);
		})
	);

	// Icon per category, matched on the Serbian name
	function iconFor(name: string): string {
		const n = name.toLowerCase();
		if (n.startsWith('it')) return 'code';
		if (n.includes('prehramb') || n.includes('hrana')) return 'food';
		if (n.includes('poljopriv')) return 'leaf';
		if (n.includes('transport')) return 'truck';
		if (n.includes('finans')) return 'coins';
		if (n.includes('ugostit')) return 'cup';
		if (n.includes('energ')) return 'bolt';
		if (n.includes('moda') || n.includes('tekstil')) return 'shirt';
		if (n.includes('maloprod')) return 'bag';
		if (n.includes('pravn')) return 'scale';
		if (n.includes('građ') || n.includes('nekretn')) return 'building';
		if (n.includes('avio')) return 'plane';
		if (n.includes('komunal')) return 'drop';
		if (n.includes('farmac') || n.includes('zdrav')) return 'health';
		if (n.includes('drvn')) return 'tree';
		if (n.includes('automob')) return 'car';
		if (n.includes('obrazov')) return 'cap';
		if (n.includes('medij')) return 'signal';
		if (n.includes('poslovn')) return 'briefcase';
		if (n.includes('industr')) return 'factory';
		return 'grid';
	}
</script>

{#snippet catIcon(kind: string, size: number)}
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if kind === 'code'}
			<path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/><path d="M14 4l-4 16"/>
		{:else if kind === 'food'}
			<path d="M12 22V10"/><path d="M12 14c-3 0-5-2-5-5 3 0 5 2 5 5z"/><path d="M12 12c3 0 5-2 5-5-3 0-5 2-5 5z"/><path d="M12 18c-3 0-5-2-5-5 3 0 5 2 5 5z"/><path d="M12 16c3 0 5-2 5-5-3 0-5 2-5 5z"/>
		{:else if kind === 'leaf'}
			<path d="M12 22V12"/><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z"/><path d="M12 15c0-4 3-7 8-7 0 4-3 7-8 7z"/>
		{:else if kind === 'truck'}
			<rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>
		{:else if kind === 'coins'}
			<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M15 11.5c3.4.2 6 1.4 6 3s-2.7 3-6 3c-1.5 0-2.9-.3-4-.7"/><path d="M21 14.5v3c0 1.7-2.7 3-6 3s-6-1.3-6-3v-2"/>
		{:else if kind === 'cup'}
			<path d="M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2v3M12 2v3"/>
		{:else if kind === 'bolt'}
			<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>
		{:else if kind === 'shirt'}
			<path d="M8 3l-5 3 2 5 3-1v11h8V10l3 1 2-5-5-3a4 4 0 0 1-8 0z"/>
		{:else if kind === 'bag'}
			<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
		{:else if kind === 'scale'}
			<path d="M12 3v18M7 21h10"/><path d="M5 7h14"/><path d="M5 7l-3 7a3 3 0 0 0 6 0z"/><path d="M19 7l-3 7a3 3 0 0 0 6 0z"/>
		{:else if kind === 'building'}
			<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M11 21v-3h2v3"/>
		{:else if kind === 'plane'}
			<path d="M10.5 13.5L3 11l1.5-1.5 8 1L17 6a2 2 0 0 1 3 3l-4.5 4.5 1 8L15 23l-2.5-7.5L9 19v3l-1.5 1-1-3.5L3 18.5 4 17h3l3.5-3.5z"/>
		{:else if kind === 'drop'}
			<path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.4 0z"/>
		{:else if kind === 'health'}
			<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/><path d="M12 9v5M9.5 11.5h5"/>
		{:else if kind === 'tree'}
			<path d="M12 22v-6"/><path d="M12 2l6 9h-3l4 5H5l4-5H6z"/>
		{:else if kind === 'car'}
			<path d="M5 17h14v-5l-2-5H7l-2 5z"/><path d="M5 12h14"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>
		{:else if kind === 'cap'}
			<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>
		{:else if kind === 'signal'}
			<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19A10 10 0 0 1 5 5"/>
		{:else if kind === 'briefcase'}
			<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M2 13h20"/>
		{:else if kind === 'factory'}
			<path d="M2 21h20"/><path d="M4 21V10l6 4V10l6 4V5h4v16"/>
		{:else}
			<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
		{/if}
	</svg>
{/snippet}

<svelte:head>
	<title>{i18n.t.ui.categories} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<!-- ─── HERO ─── -->
<section class="page-top reveal-card" use:reveal>
	<div class="top-glow" aria-hidden="true"></div>
	<div class="top-lines" aria-hidden="true"></div>
	<div class="container top-grid">
		<div>
			<span class="page-label"><span class="page-label-dot"></span>{i18n.t.nav.directory}</span>
			<h1>{i18n.t.ui.categories}</h1>
			<p class="page-sub">{i18n.t.ui.categoriesSub}</p>

			<DirectoryFilters bind:query {quick} onClear={() => (query = '')} />
		</div>

		<div class="top-stats" aria-hidden="true">
			<div class="top-stat">
				<strong>{categoryStats.length}</strong>
				<span>{i18n.t.ui.categories}</span>
			</div>
			<div class="top-stat">
				<strong>{totalFirms}</strong>
				<span>{i18n.t.ecosystem.companies}</span>
			</div>
		</div>
	</div>
</section>

<!-- ─── GRID ─── -->
<section class="cat-body reveal-card" use:reveal>
	<div class="body-backdrop" aria-hidden="true"></div>
	<div class="container">
		<div class="results-head">
			<span class="results-count" aria-live="polite">
				<strong>{visible.length}</strong>
				{i18n.t.ui.categories}
			</span>
			<span class="results-line" aria-hidden="true"></span>
		</div>

		{#if visible.length === 0}
			<div class="empty">
				<span class="empty-icon" aria-hidden="true">{@render catIcon('grid', 26)}</span>
				<p>{i18n.t.ui.noResultsShort}</p>
				<button type="button" class="empty-clear" onclick={() => (query = '')}>{i18n.t.ecosystem.clear}</button>
			</div>
		{:else}
			<div class="cat-grid">
				{#each visible as cat, i (cat.name_sr)}
					{@const rank = categoryStats.indexOf(cat)}
					<a
						href="/firme?cat={encodeURIComponent(nameOf(cat))}"
						class="cat-card"
						class:top={rank < 3 && !query}
						style="--i:{Math.min(i, 12)}"
					>
						<span class="cat-watermark" aria-hidden="true">{@render catIcon(iconFor(cat.name_sr), 140)}</span>
						<span class="cat-head">
							<span class="cat-icon">{@render catIcon(iconFor(cat.name_sr), 22)}</span>
							<span class="cat-rank" aria-hidden="true">{String(rank + 1).padStart(2, '0')}</span>
						</span>
						<span class="cat-name">{nameOf(cat)}</span>
						<span class="cat-stat">
							<span class="cat-count">{cat.count}</span>
							<span class="cat-count-label">{i18n.t.ecosystem.companies}</span>
						</span>
						<span class="cat-bar" aria-hidden="true">
							<span style="width:{Math.max(5, Math.round((cat.count / maxCount) * 100))}%"></span>
						</span>
						<span class="cat-foot">
							<span class="cat-go">{i18n.t.ui.explore}</span>
							<span class="cat-arrow" aria-hidden="true">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
							</span>
						</span>
					</a>
				{/each}
			</div>
		{/if}
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
		padding: clamp(3rem, 7vw, 5.5rem) var(--section-px);
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
			radial-gradient(35% 45% at 90% 40%, rgba(196,42,56,0.25), transparent 70%);
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
		-webkit-mask-image: radial-gradient(ellipse 70% 80% at 75% 30%, #000 10%, transparent 75%);
		mask-image: radial-gradient(ellipse 70% 80% at 75% 30%, #000 10%, transparent 75%);
		pointer-events: none;
	}
	.top-grid {
		display: grid;
		/* minmax(0, …): the stat labels must not widen the column past the hero padding */
		grid-template-columns: minmax(0, 1fr);
		gap: 2.5rem;
		align-items: end;
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
		/* Room for descenders (g, j, y): gradient text is clipped to the line box */
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
		line-height: 1.6;
		color: rgba(250,249,246,0.8);
		max-width: 52ch;
		margin-bottom: 2rem;
	}

	.top-stats { display: flex; gap: 0.85rem; min-width: 0; }
	.top-grid > div { min-width: 0; }
	.top-stat {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		flex: 1;
		min-width: 0;
		padding: 1.25rem 1.4rem;
		border-radius: 20px;
		background: linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.16), inset 0 0 0 1px rgba(255,255,255,0.1);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.top-stat strong {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 4vw, 3rem);
		font-weight: 800;
		letter-spacing: -0.045em;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		background: linear-gradient(180deg, #ffffff 40%, #b9c6d8 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.top-stat span {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.7);
	}

	.results-head {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-bottom: 1.75rem;
	}
	.results-count {
		display: inline-flex;
		align-items: baseline;
		gap: 0.5rem;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #6b7380;
		white-space: nowrap;
	}
	/* Phones: the count label may wrap rather than run past the card */
	@media (max-width: 599px) {
		.results-count { white-space: normal; min-width: 0; }
	}
	.results-count strong {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		color: var(--navy);
		font-variant-numeric: tabular-nums;
	}
	.results-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(11,52,102,0.18), transparent); }

	/* ─── GRID ─── */
	.cat-body {
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
		-webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 60%);
		mask-image: linear-gradient(180deg, #000 0%, transparent 60%);
		pointer-events: none;
	}
	.cat-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(0.9rem, 2vw, 1.25rem);
	}

	.cat-card {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: clamp(1.35rem, 2.2vw, 1.7rem);
		border-radius: var(--radius-2xl);
		text-decoration: none;
		color: inherit;
		background: linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 14px 32px -18px rgba(15,23,42,0.18),
			inset 0 0 0 1px rgba(15,23,42,0.06);
		animation: cat-in 0.5s cubic-bezier(0.22,1,0.36,1) both;
		animation-delay: calc(var(--i) * 40ms);
		transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease;
	}
	@keyframes cat-in {
		from { opacity: 0; transform: translateY(12px); }
		to   { opacity: 1; transform: none; }
	}
	.cat-card::before {
		content: '';
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 3px;
		background: var(--accent-line);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
	}
	.cat-card:hover {
		transform: translateY(-6px);
		box-shadow:
			0 1px 2px rgba(15,23,42,0.04),
			0 34px 60px -28px rgba(15,23,42,0.32),
			inset 0 0 0 1px rgba(155,17,30,0.22);
	}
	.cat-card:hover::before { transform: scaleX(1); }
	.cat-card:focus-visible { outline: 2px solid var(--cta); outline-offset: 4px; }

	.cat-watermark {
		position: absolute;
		z-index: -1;
		right: -26px;
		bottom: -28px;
		color: rgba(11,52,102,0.045);
		transition: color 0.5s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
		pointer-events: none;
	}
	.cat-card:hover .cat-watermark { color: rgba(155,17,30,0.08); transform: rotate(-8deg) scale(1.06); }

	.cat-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem; }
	.cat-icon {
		display: grid;
		place-items: center;
		width: 50px;
		height: 50px;
		border-radius: 15px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
		box-shadow: 0 12px 22px -10px rgba(11,52,102,0.55), inset 0 1px 0 rgba(255,255,255,0.25);
		transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease;
	}
	.cat-card:hover .cat-icon {
		transform: rotate(-6deg) scale(1.06);
		background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%);
	}
	.cat-rank {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		color: rgba(11,52,102,0.35);
		font-variant-numeric: tabular-nums;
		transition: color 0.35s ease;
	}
	.cat-card:hover .cat-rank { color: var(--cta); }

	.cat-name {
		flex: 1;
		font-family: var(--font-heading);
		font-size: 1.15rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--navy);
		margin-bottom: 1.1rem;
	}
	.cat-stat { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.65rem; }
	.cat-count {
		font-family: var(--font-heading);
		font-size: 1.9rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--navy);
		font-variant-numeric: tabular-nums;
	}
	.cat-count-label {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #6b7380;
	}
	.cat-bar {
		position: relative;
		display: block;
		height: 4px;
		border-radius: 4px;
		background: rgba(11,52,102,0.08);
		overflow: hidden;
		margin-bottom: 1.25rem;
	}
	.cat-bar span {
		position: absolute;
		inset: 0 auto 0 0;
		border-radius: inherit;
		background: linear-gradient(90deg, #1c5aa8, #0b3466);
		transition: background 0.4s ease;
	}
	.cat-card:hover .cat-bar span { background: var(--accent-line); }

	.cat-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 0.9rem;
		border-top: 1px solid rgba(15,23,42,0.08);
	}
	.cat-go {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--navy);
		transition: color 0.3s ease;
	}
	.cat-card:hover .cat-go { color: var(--cta); }
	.cat-arrow {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		color: var(--navy);
		box-shadow: inset 0 0 0 1px rgba(11,52,102,0.2);
		transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
	}
	.cat-card:hover .cat-arrow {
		color: #FAF9F6;
		background: var(--cta);
		box-shadow: inset 0 0 0 1px var(--cta), 0 8px 18px -6px rgba(155,17,30,0.6);
		transform: rotate(45deg);
	}

	/* Top three sectors: dark feature cards */
	.cat-card.top {
		background: var(--surface-dark);
		box-shadow: var(--shadow-dark-raised);
	}
	.cat-card.top:hover {
		box-shadow: 0 40px 70px -26px rgba(8,20,45,0.65), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 0 0 1px rgba(255,255,255,0.12);
	}
	.cat-card.top .cat-watermark { color: rgba(255,255,255,0.06); }
	.cat-card.top:hover .cat-watermark { color: rgba(240,106,117,0.14); }
	.cat-card.top .cat-icon {
		background: linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05));
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.12), 0 10px 20px -10px rgba(0,0,0,0.5);
	}
	.cat-card.top:hover .cat-icon { background: linear-gradient(150deg, #c42a38 0%, var(--cta) 100%); }
	.cat-card.top .cat-rank { color: rgba(250,249,246,0.5); }
	.cat-card.top:hover .cat-rank { color: #f06a75; }
	.cat-card.top .cat-name { color: #FAF9F6; font-size: 1.35rem; }
	.cat-card.top .cat-count { color: #FAF9F6; font-size: 2.4rem; }
	.cat-card.top .cat-count-label { color: rgba(250,249,246,0.65); }
	.cat-card.top .cat-bar { background: rgba(255,255,255,0.12); }
	.cat-card.top .cat-bar span { background: linear-gradient(90deg, #e0414f, #f06a75); }
	.cat-card.top .cat-foot { border-top-color: rgba(255,255,255,0.12); }
	.cat-card.top .cat-go { color: #FAF9F6; }
	.cat-card.top .cat-arrow { color: #FAF9F6; box-shadow: inset 0 0 0 1px rgba(250,249,246,0.3); }
	.cat-card.top:focus-visible { outline-color: #FAF9F6; }

	/* Empty state */
	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 4rem 1rem;
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
	.empty-clear {
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
		transition: background 0.25s ease, color 0.25s ease;
	}
	.empty-clear:hover { color: #FAF9F6; background: var(--navy); }

	/* ─── Responsive ─── */
	@media (min-width: 600px) {
		.cat-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 599px) {
		.top-stats { gap: 0.6rem; }
		.top-stat { padding: 1rem 1.05rem; }
		.top-stat span { font-size: 0.66rem; letter-spacing: 0.09em; overflow-wrap: anywhere; }
	}
	@media (min-width: 900px) {
		.top-grid { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); }
	}
	@media (min-width: 1024px) {
		.cat-grid { grid-template-columns: repeat(4, 1fr); }
		/* Top three span a wider first row: 2 + 1 + 1 columns */
		.cat-card.top:first-child { grid-column: span 2; }
	}
	@media (prefers-reduced-motion: reduce) {
		.cat-card { animation: none; }
		.cat-card, .cat-card::before, .cat-icon, .cat-arrow, .cat-watermark { transition: none; }
		.cat-card:hover, .cat-card:hover .cat-icon, .cat-card:hover .cat-arrow, .cat-card:hover .cat-watermark { transform: none; }
	}
</style>

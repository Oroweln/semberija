<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import type { FilterOption } from '$lib/search';
	import FilterSelect from '$lib/components/FilterSelect.svelte';

	// Directory search panel in the /kompanije style, for dark hero sections:
	// one white bar split into segments (text search + optional industry/location selects),
	// "popular" quick picks under it, and an active-filter row with a clear button.
	type Select = { options: FilterOption[] };
	type Quick = { id: string; label: string; count: number; href?: string };
	type Chip = { label: string; value: string; onRemove: () => void };

	let {
		query = $bindable(''),
		industry = $bindable(''),
		location = $bindable(''),
		placeholder = i18n.t.ui.searchPlaceholder,
		industries,
		locations,
		quick = [],
		onQuick,
		chips = [],
		onClear
	}: {
		query?: string;
		industry?: string;
		location?: string;
		placeholder?: string;
		industries?: Select;
		locations?: Select;
		quick?: Quick[];
		onQuick?: (id: string) => void;
		chips?: Chip[];
		onClear?: () => void;
	} = $props();

	const anyFilter = $derived(!!(query || industry || location || chips.length));
</script>

<div class="filter-bar" role="search">
	<div class="fb-field fb-query">
		<svg class="fb-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
		</svg>
		<input type="search" bind:value={query} {placeholder} aria-label={placeholder} autocomplete="off" />
	</div>

	{#if industries && industries.options.length > 1}
		<div class="fb-field fb-select" data-fs-anchor>
			<span class="fb-tile" aria-hidden="true">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
			</span>
			<FilterSelect label={i18n.t.bizSearch.industry} allLabel={i18n.t.bizSearch.allIndustries} options={industries.options} bind:value={industry} />
			<svg class="fb-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
		</div>
	{/if}

	{#if locations && locations.options.length > 1}
		<div class="fb-field fb-select" data-fs-anchor>
			<span class="fb-tile" aria-hidden="true">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
			</span>
			<FilterSelect label={i18n.t.bizSearch.location} allLabel={i18n.t.bizSearch.allLocations} options={locations.options} bind:value={location} />
			<svg class="fb-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
		</div>
	{/if}
</div>

{#if !anyFilter && quick.length}
	<div class="quick">
		<span class="quick-label">{i18n.t.bizSearch.popular}</span>
		{#each quick as q (q.id)}
			{#if q.href}
				<a href={q.href} class="quick-chip">{q.label}<span class="quick-count">{q.count}</span></a>
			{:else}
				<button type="button" class="quick-chip" onclick={() => onQuick?.(q.id)}>{q.label}<span class="quick-count">{q.count}</span></button>
			{/if}
		{/each}
	</div>
{/if}

{#if anyFilter && onClear}
	<div class="active-filters">
		{#each chips as chip (chip.value)}
			<span class="af-chip">
				{chip.label}: <strong>{chip.value}</strong>
				<button type="button" onclick={chip.onRemove} aria-label={i18n.t.ecosystem.clear}>
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>
				</button>
			</span>
		{/each}
		<button type="button" class="af-clear" onclick={onClear}>
			<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
			{i18n.t.ecosystem.clear}
		</button>
	</div>
{/if}

<style>
	.filter-bar {
		display: grid;
		/* minmax(0, …): long select options must not widen the bar past its container */
		grid-template-columns: minmax(0, 1fr);
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: 22px;
		background: #ffffff;
		box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.5);
		transition: box-shadow 0.25s ease;
	}
	.filter-bar:focus-within { box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6), 0 0 0 3px rgba(240,106,117,0.5); }
	.fb-field {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-width: 0;
		min-height: 62px;
		padding: 0 1rem;
		border-radius: 16px;
		color: var(--navy);
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
	.fb-tile {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 12px;
		color: #FAF9F6;
		background: linear-gradient(150deg, #1c5aa8 0%, #0b3466 100%);
	}
	.fb-chevron { position: absolute; right: 1rem; color: #8a919c; pointer-events: none; transition: transform 0.2s ease; }
	.fb-select:has(:global([aria-expanded='true'])) .fb-chevron { transform: rotate(180deg); }

	/* Quick picks */
	.quick {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.1rem;
	}
	.quick-label {
		margin-right: 0.25rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(250,249,246,0.6);
	}
	.quick-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.45rem 0.4rem 0.95rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.85rem;
		font-weight: 600;
		text-decoration: none;
		color: #FAF9F6;
		background: rgba(255,255,255,0.07);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		cursor: pointer;
		transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
	}
	.quick-count {
		min-width: 22px;
		padding: 0.1rem 0.4rem;
		border-radius: 50px;
		font-size: 0.72rem;
		font-weight: 700;
		text-align: center;
		font-variant-numeric: tabular-nums;
		background: rgba(255,255,255,0.14);
		transition: background 0.3s ease, color 0.3s ease;
	}
	.quick-chip:hover {
		color: var(--navy);
		background: #FAF9F6;
		box-shadow: 0 10px 22px -10px rgba(0,0,0,0.5);
		transform: translateY(-2px);
	}
	.quick-chip:hover .quick-count { color: #FAF9F6; background: var(--cta); }
	.quick-chip:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }

	/* Active filters */
	.active-filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem;
		margin-top: 1rem;
	}
	.af-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.4rem 0.35rem 0.9rem;
		border-radius: 50px;
		font-size: 0.85rem;
		color: #FAF9F6;
		background: rgba(255,255,255,0.1);
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.22);
	}
	.af-chip button {
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		border: 0;
		border-radius: 50%;
		color: #FAF9F6;
		background: var(--cta);
		cursor: pointer;
	}
	.af-clear {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.9rem;
		border: 0;
		border-radius: 50px;
		font: inherit;
		font-size: 0.82rem;
		font-weight: 700;
		color: rgba(250,249,246,0.85);
		background: transparent;
		box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);
		cursor: pointer;
		transition: background 0.25s ease, color 0.25s ease;
	}
	.af-clear:hover { background: rgba(255,255,255,0.1); color: #FAF9F6; }
	.af-chip button:focus-visible, .af-clear:focus-visible { outline: 2px solid #FAF9F6; outline-offset: 2px; }

	@media (min-width: 860px) {
		/* Search gets the widest segment; works with any number of selects */
		.filter-bar { grid-template-columns: minmax(0, 1.6fr); grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 0; }
		.fb-field + .fb-field::before {
			content: '';
			position: absolute;
			left: 0;
			top: 18%;
			bottom: 18%;
			width: 1px;
			background: rgba(15,23,42,0.1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.quick-chip { transition: none; }
		.quick-chip:hover { transform: none; }
	}
</style>

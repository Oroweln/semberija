<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import type { FilterOption } from '$lib/search';

	// Compact, searchable dropdown for the company search filters.
	// The trigger fills the host field (the nearest element with `data-fs-anchor`), so the host
	// keeps its own tile, chevron and styling. The option panel is moved to <body> and positioned
	// against that field: the search cards clip overflow and are transformed by the reveal
	// animation, which would otherwise cut the panel off.
	// Typography of the trigger is set by the host with --fs-* custom properties.

	let {
		label,
		value = $bindable(''),
		options,
		allLabel,
		name,
		id = 'fs-' + Math.random().toString(36).slice(2, 8)
	}: {
		label: string;
		value?: string;
		options: FilterOption[];
		allLabel: string;
		name?: string; // set inside a <form> so the value is submitted
		id?: string;
	} = $props();

	let open = $state(false);
	let filter = $state('');
	let active = $state(0);
	let root: HTMLDivElement;
	let trigger: HTMLButtonElement;
	let panel = $state<HTMLDivElement>();
	let searchInput = $state<HTMLInputElement>();
	let pos = $state({ left: 0, top: 0, width: 0, maxH: 320, above: false });

	const listId = $derived(`${id}-list`);
	const all = $derived<FilterOption>({ value: '', label: allLabel, count: 0 });
	const selectedLabel = $derived(options.find((o) => o.value === value)?.label ?? (value || allLabel));

	// Diacritic- and case-insensitive matching (so "gradj" or "gradev" finds "Građevinarstvo")
	const norm = (s: string) =>
		s.toLowerCase().replace(/đ/g, 'dj').normalize('NFD').replace(/[̀-ͯ]/g, '');
	const visible = $derived.by(() => {
		const q = norm(filter.trim());
		const list = q ? options.filter((o) => norm(o.label + ' ' + (o.keywords ?? '')).includes(q)) : options;
		return q ? list : [all, ...list];
	});

	function place() {
		const anchor = (root.closest('[data-fs-anchor]') as HTMLElement) ?? root;
		const r = anchor.getBoundingClientRect();
		const vw = document.documentElement.clientWidth;
		const vh = window.innerHeight;
		const margin = 12;
		const width = Math.min(Math.max(r.width, 280), vw - margin * 2);
		const left = Math.min(Math.max(r.left, margin), vw - width - margin);
		const below = vh - r.bottom - margin - 8;
		const aboveSpace = r.top - margin - 8;
		const above = below < 240 && aboveSpace > below;
		const maxH = Math.max(160, Math.min(360, above ? aboveSpace : below));
		pos = { left, width, maxH, above, top: above ? r.top - 8 : r.bottom + 8 };
	}

	function show() {
		if (open) return;
		filter = '';
		active = Math.max(0, visible.findIndex((o) => o.value === value));
		place();
		open = true;
	}

	function hide(refocus = false) {
		open = false;
		if (refocus) trigger?.focus();
	}

	function choose(o: FilterOption) {
		value = o.value;
		hide(true);
	}

	// Focus the search field on devices with a real keyboard; on touch the keyboard would cover the list
	$effect(() => {
		if (open && searchInput && window.matchMedia('(pointer: fine)').matches) searchInput.focus();
	});

	// Keep the highlighted option in view
	$effect(() => {
		if (!open || !panel) return;
		panel.querySelector<HTMLElement>(`#${id}-opt-${active}`)?.scrollIntoView({ block: 'nearest' });
	});

	// Follow the field on scroll/resize; close on outside press
	$effect(() => {
		if (!open) return;
		const onMove = () => place();
		const onDown = (e: PointerEvent) => {
			const t = e.target as Node;
			if (!root.contains(t) && !panel?.contains(t)) hide();
		};
		window.addEventListener('scroll', onMove, true);
		window.addEventListener('resize', onMove);
		document.addEventListener('pointerdown', onDown);
		return () => {
			window.removeEventListener('scroll', onMove, true);
			window.removeEventListener('resize', onMove);
			document.removeEventListener('pointerdown', onDown);
		};
	});

	function onKey(e: KeyboardEvent) {
		if (!open) {
			if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
				e.preventDefault();
				show();
			}
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			active = Math.min(active + 1, visible.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			active = Math.max(active - 1, 0);
		} else if (e.key === 'Home' && e.currentTarget === trigger) {
			e.preventDefault();
			active = 0;
		} else if (e.key === 'End' && e.currentTarget === trigger) {
			e.preventDefault();
			active = visible.length - 1;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (visible[active]) choose(visible[active]);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			hide(true);
		} else if (e.key === 'Tab') {
			hide();
		}
	}

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return { destroy: () => node.remove() };
	}
</script>

<div class="fs" bind:this={root}>
	<span class="fs-label" id="{id}-label">{label}</span>
	<button
		type="button"
		class="fs-trigger"
		{id}
		bind:this={trigger}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-controls={open ? listId : undefined}
		aria-labelledby="{id}-label {id}"
		onclick={() => (open ? hide() : show())}
		onkeydown={onKey}
	>
		<span class="fs-value" class:is-all={!value}>{selectedLabel}</span>
	</button>
	{#if name}
		<input type="hidden" {name} {value} disabled={!value} />
	{/if}
</div>

{#if open}
	<div
		class="fs-panel"
		class:above={pos.above}
		bind:this={panel}
		use:portal
		style="left:{pos.left}px; top:{pos.top}px; width:{pos.width}px; --fs-max-h:{pos.maxH}px"
	>
		<div class="fs-search">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
			<input
				bind:this={searchInput}
				bind:value={filter}
				oninput={() => (active = 0)}
				onkeydown={onKey}
				type="text"
				role="combobox"
				aria-expanded="true"
				aria-controls={listId}
				aria-activedescendant={visible[active] ? `${id}-opt-${active}` : undefined}
				aria-label={label}
				placeholder={i18n.t.bizSearch.filterSearch}
				autocomplete="off"
				spellcheck="false"
			/>
		</div>
		<ul class="fs-list" id={listId} role="listbox" aria-labelledby="{id}-label">
			{#each visible as o, i (o.value)}
				<!-- Keyboard selection is handled by the combobox input / trigger (arrows + Enter) -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					id="{id}-opt-{i}"
					role="option"
					aria-selected={o.value === value}
					class="fs-opt"
					class:active={i === active}
					class:all={o.value === ''}
					onpointerenter={() => (active = i)}
					onpointerdown={(e) => e.preventDefault()}
					onclick={() => choose(o)}
				>
					<span class="fs-opt-label">{o.label}</span>
					{#if o.value}<span class="fs-count">{o.count}</span>{/if}
					<svg class="fs-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
				</li>
			{:else}
				<li class="fs-empty" role="presentation">{i18n.t.bizSearch.noOptions}</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.fs { display: flex; flex-direction: column; flex: 1; min-width: 0; }
	.fs-label {
		font-size: var(--fs-label-size, 0.66rem);
		font-weight: 700;
		letter-spacing: var(--fs-label-spacing, 0.16em);
		text-transform: uppercase;
		color: var(--fs-label-color, #8a919c);
	}
	.fs-trigger {
		display: block;
		width: 100%;
		min-width: 0;
		margin: 0;
		padding: 0.1rem 1.5rem 0.1rem 0;
		border: 0;
		background: transparent;
		font: inherit;
		text-align: left;
		color: var(--fs-value-color, var(--navy));
		cursor: pointer;
		outline: none;
	}
	/* The whole host field is the click target (the anchor is position: relative) */
	.fs-trigger::before { content: ''; position: absolute; inset: 0; border-radius: inherit; }
	.fs-value {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: var(--fs-value-size, 0.98rem);
		font-weight: 600;
	}

	/* Panel (rendered in <body>) */
	.fs-panel {
		position: fixed;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		max-height: var(--fs-max-h, 320px);
		padding: 0.4rem;
		border-radius: 16px;
		background: #ffffff;
		border: 1px solid rgba(15,23,42,0.08);
		box-shadow: 0 24px 48px -16px rgba(8,37,72,0.35), 0 6px 14px -8px rgba(8,37,72,0.2);
		font-family: var(--font-body, inherit);
		color: var(--navy);
		text-align: left;
		animation: fs-in 0.16s ease-out;
	}
	.fs-panel.above { transform: translateY(-100%); animation-name: fs-in-above; }
	@keyframes fs-in { from { opacity: 0; transform: translateY(-4px); } }
	@keyframes fs-in-above { from { opacity: 0; transform: translateY(calc(-100% + 4px)); } }

	.fs-search {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
		margin-bottom: 0.3rem;
		padding: 0 0.75rem;
		border-radius: 11px;
		background: #f4f5f7;
		color: #8a919c;
	}
	.fs-search:focus-within { box-shadow: inset 0 0 0 2px rgba(155,17,30,0.35); background: #ffffff; }
	.fs-search input {
		flex: 1;
		min-width: 0;
		height: 40px;
		border: 0;
		outline: none;
		background: transparent;
		font: inherit;
		font-size: 16px; /* no zoom-on-focus on iOS */
		color: var(--navy);
	}
	.fs-search input::placeholder { color: #8a919c; }

	.fs-list {
		list-style: none;
		margin: 0;
		padding: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: thin;
	}
	.fs-opt {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 42px;
		padding: 0.45rem 0.7rem;
		border-radius: 10px;
		font-size: 0.93rem;
		font-weight: 500;
		line-height: 1.3;
		cursor: pointer;
	}
	.fs-opt.all { font-weight: 600; color: #4a525e; }
	.fs-opt.active { background: #f1f3f6; }
	.fs-opt[aria-selected='true'] { font-weight: 700; color: var(--navy); }
	.fs-opt-label { flex: 1; min-width: 0; }
	.fs-count {
		flex-shrink: 0;
		min-width: 1.6rem;
		padding: 0.05rem 0.4rem;
		border-radius: 50px;
		font-size: 0.72rem;
		font-weight: 700;
		text-align: center;
		font-variant-numeric: tabular-nums;
		color: var(--navy);
		background: rgba(11,52,102,0.08);
	}
	.fs-check { flex-shrink: 0; color: var(--cta); visibility: hidden; }
	.fs-opt[aria-selected='true'] .fs-check { visibility: visible; }
	.fs-empty { padding: 0.8rem 0.7rem; font-size: 0.9rem; color: #8a919c; }

	@media (prefers-reduced-motion: reduce) {
		.fs-panel { animation: none; }
	}
</style>

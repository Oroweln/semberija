<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { networkingPosts } from '$lib/data';
	import { reveal } from '$lib/actions/reveal';

	const types_sr = ['Svi', 'Partnerstvo', 'Investicija', 'Saradnja'];
	const types_en = ['All', 'Partnership', 'Investment', 'Collaboration'];
	let active = $state(0);
	let search = $state('');

	const filteredPosts = $derived(
		networkingPosts.filter((post) => {
			const type = i18n.lang === 'sr' ? post.type_sr : post.type_en;
			const title = (i18n.lang === 'sr' ? post.title_sr : post.title_en).toLowerCase();
			const desc = (i18n.lang === 'sr' ? post.desc_sr : post.desc_en).toLowerCase();
			const q = search.toLowerCase();
			const matchSearch = !q || title.includes(q) || desc.includes(q) || post.company.toLowerCase().includes(q);
			const matchType = active === 0 || type === (i18n.lang === 'sr' ? types_sr[active] : types_en[active]);
			return matchSearch && matchType;
		})
	);
</script>

<svelte:head>
	<title>{i18n.t.nav.network} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<p class="page-label">{i18n.t.nav.network}</p>
		<h1>
			{i18n.lang === 'sr' ? 'B2B umrežavanje' : 'B2B Networking'}
		</h1>
		<p class="page-sub">
			{i18n.lang === 'sr'
				? 'Povežite se sa partnerima, investitorima i saradnicima u regionu'
				: 'Connect with partners, investors, and collaborators in the region'}
		</p>

		<div class="filter-row">
			<div class="search-wrap">
				<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
				</svg>
				<input
					type="text"
					placeholder={i18n.t.ui.searchNetwork}
					bind:value={search}
					class="search-input"
				/>
			</div>

			<div class="type-select-wrap">
				<svg class="type-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="6 9 12 15 18 9"/>
				</svg>
				<select class="type-select" bind:value={active}>
					{#each (i18n.lang === 'sr' ? types_sr : types_en) as type, i}
						<option value={i}>{type}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</div>

<div class="net-body reveal-card" use:reveal>
	<div class="container">
		{#if filteredPosts.length === 0}
			<div class="empty">
				<p>{i18n.t.ui.noResults}</p>
			</div>
		{:else}
			<div class="net-grid">
				{#each filteredPosts as post}
					<article class="net-card">
						<span class="net-type">
							{i18n.lang === 'sr' ? post.type_sr : post.type_en}
						</span>
						<h3>{i18n.lang === 'sr' ? post.title_sr : post.title_en}</h3>
						<p>{i18n.lang === 'sr' ? post.desc_sr : post.desc_en}</p>
						<div class="net-footer">
							<div class="net-company">
								<div class="net-avatar">{post.company.charAt(0)}</div>
								<span>{post.company}</span>
							</div>
							<a href="/kontakt" class="net-btn">
								{i18n.lang === 'sr' ? 'Kontaktiraj' : 'Contact'}
							</a>
						</div>
					</article>
				{/each}
			</div>
		{/if}

		<div class="post-cta">
			<h3>
				{i18n.lang === 'sr'
					? 'Imate poslovnu prijedlog?'
					: 'Have a business proposal?'}
			</h3>
			<p>
				{i18n.lang === 'sr'
					? 'Objavite vašu poslovnu ideju ili potrebu i povežite se sa pravim partnerima.'
					: 'Post your business idea or need and connect with the right partners.'}
			</p>
			<a href="/kontakt" class="btn-emerald">
				{i18n.lang === 'sr' ? 'Objavi post' : 'Post Now'}
			</a>
		</div>
	</div>
</div>
</div>

<style>
	.page-wrap {
		max-width: 1440px;
		margin: 0 auto;
		padding: calc(92px + 1.25rem) clamp(1rem, 3vw, 2rem) 3rem;
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	.page-top {
		background: var(--card-blue);
		color: white;
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow:
		inset 0 8px 20px -4px rgba(0,0,0,0.4),
		inset 0 -2px 6px -2px rgba(255,255,255,0.05),
		inset 8px 0 20px -10px rgba(0,0,0,0.25),
		inset -8px 0 20px -10px rgba(0,0,0,0.25);
		border: 1px solid rgba(255,255,255,0.05);
	}
	.container {
		max-width: var(--max-w);
		margin: 0 auto;
	}
	.page-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--silver);
		margin-bottom: 0.75rem;
	}
	.page-top h1 {
		font-family: var(--font-serif);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		margin-bottom: 0.75rem;
	}
	.page-sub {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 2rem;
	}
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.search-wrap {
		position: relative;
		flex: 1 1 320px;
		max-width: 480px;
	}

	.search-icon {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
	}

	.search-input {
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius);
		color: white;
		font-family: var(--font-sans);
		font-size: 0.95rem;
		padding: 0.8rem 1rem 0.8rem 2.75rem;
		outline: none;
		transition: border-color 0.2s, background 0.2s;
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	.search-input:focus {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(154,164,178, 0.6);
	}

	.type-select-wrap {
		position: relative;
		flex: 1 1 200px;
		max-width: 260px;
	}

	.type-select-icon {
		position: absolute;
		right: 0.9rem;
		top: 50%;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
		pointer-events: none;
	}

	.type-select {
		width: 100%;
		appearance: none;
		-webkit-appearance: none;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: var(--radius);
		color: white;
		font-family: var(--font-sans);
		font-size: 0.95rem;
		padding: 0.8rem 2.5rem 0.8rem 1rem;
		outline: none;
		cursor: pointer;
		transition: border-color 0.2s, background 0.2s;
	}

	.type-select:hover,
	.type-select:focus {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(154,164,178, 0.6);
	}

	.type-select option {
		background: var(--card-blue);
		color: white;
	}

	.empty {
		text-align: center;
		padding: 4rem 0;
		margin-bottom: 4rem;
		color: var(--muted);
	}
	.net-body {
		background: radial-gradient(140% 140% at 25% 15%, #ffffff 0%, #f2f3f6 100%);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-bento), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -16px 30px -20px rgba(15,23,42,0.14);
		border: 1px solid rgba(255,255,255,0.4);
	}
	.net-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-bottom: 4rem;
	}
	.net-card {
		background: var(--soft-white);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		border: 1px solid rgba(8, 14, 26, 0.05);
		display: flex;
		flex-direction: column;
		transition: background 0.2s;
	}
	.net-card:hover { background: white; }
	.net-type {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--navy-mid);
		margin-bottom: 0.75rem;
		display: block;
	}
	.net-card h3 {
		font-family: var(--font-serif);
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 0.75rem;
	}
	.net-card p {
		font-size: 0.87rem;
		color: var(--muted);
		line-height: 1.65;
		flex: 1;
		margin-bottom: 1.5rem;
	}
	.net-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}
	.net-company {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.8rem;
		color: var(--muted);
	}
	.net-avatar {
		width: 28px;
		height: 28px;
		background: var(--card-blue);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-serif);
		font-size: 0.75rem;
		font-weight: 700;
		color: white;
		flex-shrink: 0;
	}
	.net-btn {
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--navy-mid);
		background: rgba(15, 61, 62, 0.06);
		text-decoration: none;
		padding: 0.4rem 0.9rem;
		border-radius: var(--radius-sm);
		transition: background 0.2s;
		white-space: nowrap;
	}
	.net-btn:hover {
		background: rgba(15, 61, 62, 0.12);
	}
	.post-cta {
		background: var(--card-blue);
		border-radius: var(--radius-xl);
		padding: 3rem;
		color: white;
		text-align: center;
		box-shadow:
			inset 0 8px 20px -4px rgba(0,0,0,0.4),
			inset 0 -2px 6px -2px rgba(255,255,255,0.05),
			inset 8px 0 20px -10px rgba(0,0,0,0.25),
			inset -8px 0 20px -10px rgba(0,0,0,0.25);
	}
	.post-cta h3 {
		font-family: var(--font-serif);
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
	}
	.post-cta p {
		font-size: 1rem;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 2rem;
	}
	.btn-emerald {
		display: inline-block;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--dark);
		background: var(--silver);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: var(--radius);
	}
	@media (min-width: 600px) {
		.net-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 768px) {
		.net-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>

<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { networkingPosts } from '$lib/data';

	const types_sr = ['Svi', 'Partnerstvo', 'Investicija', 'Saradnja'];
	const types_en = ['All', 'Partnership', 'Investment', 'Collaboration'];
	let active = $state(0);
</script>

<svelte:head>
	<title>{i18n.t.nav.network} — Semberija.app</title>
</svelte:head>

<div class="page-top">
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

		<div class="type-filters">
			{#each (i18n.lang === 'sr' ? types_sr : types_en) as type, i}
				<button class="type-btn" class:active={active === i} onclick={() => (active = i)}>
					{type}
				</button>
			{/each}
		</div>
	</div>
</div>

<div class="net-body">
	<div class="container">
		<div class="net-grid">
			{#each networkingPosts as post}
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

<style>
	.page-top {
		background: var(--emerald);
		color: white;
		padding: 8rem var(--section-px) 3rem;
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
		color: var(--gold);
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
	.type-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.type-btn {
		font-family: var(--font-sans);
		font-size: 0.8rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.65);
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 50px;
		padding: 0.35rem 1rem;
		cursor: pointer;
		transition: all 0.2s;
	}
	.type-btn:hover,
	.type-btn.active {
		background: var(--gold);
		color: var(--dark);
		border-color: var(--gold);
	}
	.net-body {
		background: var(--beige);
		padding: 3rem var(--section-px) 6rem;
	}
	.net-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 4rem;
	}
	.net-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0, 0, 0, 0.06);
		display: flex;
		flex-direction: column;
	}
	.net-type {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--emerald);
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
		background: var(--emerald);
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
		color: var(--emerald);
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
		background: var(--emerald);
		border-radius: var(--radius-xl);
		padding: 3rem;
		color: white;
		text-align: center;
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
		background: var(--gold);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: var(--radius);
	}
	@media (max-width: 768px) {
		.net-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

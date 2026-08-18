<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
</script>

<svelte:head>
	<title>{i18n.t.nav.services} — Semberija.app</title>
</svelte:head>

<div class="page-top">
	<div class="container">
		<p class="page-label">{i18n.t.services.label}</p>
		<h1>{i18n.t.services.heading}</h1>
		<p class="page-sub">{i18n.t.services.sub}</p>
	</div>
</div>

<div class="svc-body">
	<div class="container">
		<div class="svc-grid">
			{#each i18n.t.services.items as svc, i}
				<div class="svc-card">
					<div class="svc-num">0{i + 1}</div>
					<h3>{svc.title}</h3>
					<p>{svc.desc}</p>
					<a href="/kontakt" class="svc-link">
						{i18n.t.ui.requestQuote}
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M5 12h14M12 5l7 7-7 7"/>
						</svg>
					</a>
				</div>
			{/each}
		</div>

		<div class="svc-cta">
			<div class="svc-cta-img">
				<img src="/dvorovi%20bazeni.jpg" alt="Bijeljina" loading="lazy" />
			</div>
			<div class="svc-cta-text">
				<h2>{i18n.t.ui.transformHeading}</h2>
				<p>{i18n.t.ui.transformDesc}</p>
				<a href="/kontakt" class="btn-gold">{i18n.t.ui.freeConsult}</a>
			</div>
		</div>
	</div>
</div>

<style>
	.page-top {
		background: var(--emerald);
		color: white;
		padding: 8rem var(--section-px) 4rem;
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
	}
	.svc-body {
		background: var(--beige);
		padding: 3rem var(--section-px) 6rem;
	}
	.svc-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-bottom: 4rem;
	}
	.svc-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2.25rem 2rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0, 0, 0, 0.06);
		display: flex;
		flex-direction: column;
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.svc-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
	}
	.svc-num {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		font-weight: 700;
		color: rgba(15, 61, 62, 0.1);
		line-height: 1;
		margin-bottom: 0.75rem;
	}
	.svc-card h3 {
		font-family: var(--font-serif);
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 0.65rem;
	}
	.svc-card p {
		font-size: 0.88rem;
		color: var(--muted);
		line-height: 1.65;
		flex: 1;
		margin-bottom: 1.5rem;
	}
	.svc-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.83rem;
		font-weight: 600;
		color: var(--emerald);
		text-decoration: none;
		transition: gap 0.2s;
	}
	.svc-link:hover {
		gap: 0.65rem;
	}
	.svc-cta {
		background: white;
		border-radius: var(--radius-xl);
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		box-shadow: var(--shadow);
	}
	.svc-cta-img img {
		width: 100%;
		height: 100%;
		min-height: 340px;
		object-fit: cover;
	}
	.svc-cta-text {
		padding: 3.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.svc-cta-text h2 {
		font-family: var(--font-serif);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 1rem;
		line-height: 1.2;
	}
	.svc-cta-text p {
		font-size: 0.95rem;
		color: var(--muted);
		line-height: 1.7;
		margin-bottom: 2rem;
	}
	.btn-gold {
		display: inline-block;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--dark);
		background: var(--gold);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: var(--radius);
		align-self: flex-start;
	}
	@media (max-width: 768px) {
		.svc-grid {
			grid-template-columns: 1fr;
		}
		.svc-cta {
			grid-template-columns: 1fr;
		}
		.svc-cta-text {
			padding: 2rem;
		}
	}
</style>

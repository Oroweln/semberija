<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
</script>

<svelte:head>
	<title>{i18n.lang === 'sr' ? 'Oglasi' : 'Advertising'} — Semberija.app</title>
</svelte:head>

<div class="page-top">
	<div class="container">
		<p class="page-label">{i18n.lang === 'sr' ? 'Oglašavanje' : 'Advertising'}</p>
		<h1>{i18n.lang === 'sr' ? 'Istaknite vaš brend na platformi' : 'Promote your brand on the platform'}</h1>
		<p class="page-sub">{i18n.lang === 'sr' ? 'Ciljano oglašavanje unutar regionalne poslovne zajednice' : 'Targeted advertising within the regional business community'}</p>
	</div>
</div>

<div class="adv-body">
	<div class="container">
		<div class="adv-grid">
			{#each (i18n.lang === 'sr'
				? [
					{ title: 'Slider na početnoj', desc: 'Vaš vizual i poruka na vrhu početne stranice — vidljivo svim posjetiteljima odmah pri dolasku.' },
					{ title: 'Istaknuti profil', desc: 'Vaša firma prioritetno prikazana u pretragama, kategorijama i preporukama platforme.' },
					{ title: 'Banner oglasi', desc: 'Statični ili animirani banneri na ključnim mjestima platforme sa visokom vidljivošću.' },
					{ title: 'Sponzorisana kategorija', desc: 'Brendirajte čitavu kategoriju i budite dominantni izbor za klijente u tom sektoru.' }
				  ]
				: [
					{ title: 'Homepage Slider', desc: 'Your visual and message at the top of the homepage — visible to all visitors immediately upon arrival.' },
					{ title: 'Featured Listing', desc: 'Your company prioritized in searches, categories, and platform recommendations.' },
					{ title: 'Banner Ads', desc: 'Static or animated banners in high-visibility positions across the platform.' },
					{ title: 'Sponsored Category', desc: 'Brand an entire category and be the dominant choice for clients in that sector.' }
				  ]
			) as opt, i}
				<div class="adv-card">
					<div class="adv-num">{String(i + 1).padStart(2, '0')}</div>
					<h3>{opt.title}</h3>
					<p>{opt.desc}</p>
				</div>
			{/each}
		</div>

		<div class="adv-info">
			<img src="/nova%20godina%20bijeljina.jpg" alt="Bijeljina" class="adv-hero-img" loading="lazy" />
			<div class="adv-info-text">
				<h2>
					{i18n.lang === 'sr'
						? 'Dosegnite pravu poslovnu publiku'
						: 'Reach the right business audience'}
				</h2>
				<p>
					{i18n.lang === 'sr'
						? 'Semberija.app je platforma koju koriste vlasnici firmi, menadžeri i donosioci odluka u regionu. Vaše oglašavanje dostiže upravo tu publiku — lokalno, precizno, poslovno.'
						: 'Semberija.app is used by business owners, managers, and decision-makers in the region. Your advertising reaches exactly that audience — locally, precisely, professionally.'}
				</p>
				<ul class="adv-benefits">
					{#each (i18n.lang === 'sr' ? ['Ciljana B2B publika', 'Profesionalni kontekst', 'Regionalna prepoznatljivost', 'Fleksibilni formati i pozicije'] : ['Targeted B2B audience', 'Professional context', 'Regional brand recognition', 'Flexible formats and positions']) as b}
						<li>
							<span class="benefit-dot"></span>
							{b}
						</li>
					{/each}
				</ul>
				<a href="/kontakt" class="btn-emerald">{i18n.lang === 'sr' ? 'Kontaktirajte nas' : 'Contact Us'}</a>
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
	.adv-body {
		background: var(--beige);
		padding: 3rem var(--section-px) 6rem;
	}
	.adv-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
		margin-bottom: 4rem;
	}
	.adv-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2rem 1.75rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0, 0, 0, 0.06);
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.adv-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-md);
	}
	.adv-num {
		font-family: var(--font-serif);
		font-size: 2.2rem;
		font-weight: 700;
		color: var(--gold);
		opacity: 0.4;
		line-height: 1;
		margin-bottom: 0.75rem;
	}
	.adv-card h3 {
		font-family: var(--font-serif);
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 0.6rem;
	}
	.adv-card p {
		font-size: 0.85rem;
		color: var(--muted);
		line-height: 1.65;
	}
	.adv-info {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 4rem;
		align-items: center;
		background: white;
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow);
	}
	.adv-hero-img {
		width: 100%;
		height: 100%;
		min-height: 380px;
		object-fit: cover;
	}
	.adv-info-text {
		padding: 3.5rem;
	}
	.adv-info-text h2 {
		font-family: var(--font-serif);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 1rem;
		line-height: 1.2;
	}
	.adv-info-text p {
		font-size: 0.95rem;
		color: var(--muted);
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}
	.adv-benefits {
		list-style: none;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.adv-benefits li {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-size: 0.9rem;
		color: var(--dark);
		font-weight: 500;
	}
	.benefit-dot {
		width: 7px;
		height: 7px;
		background: var(--gold);
		border-radius: 50%;
		flex-shrink: 0;
	}
	.btn-emerald {
		display: inline-block;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: white;
		background: var(--emerald);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: var(--radius);
	}
	@media (max-width: 1024px) {
		.adv-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 768px) {
		.adv-grid {
			grid-template-columns: 1fr;
		}
		.adv-info {
			grid-template-columns: 1fr;
		}
		.adv-hero-img {
			min-height: 220px;
		}
		.adv-info-text {
			padding: 2rem;
		}
	}
</style>

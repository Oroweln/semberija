<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { enquiryUrl } from '$lib/enquiry';
</script>

<svelte:head>
	<title>{i18n.lang === 'sr' ? 'Oglasi' : 'Advertising'} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<p class="page-label">{i18n.t.promo.label}</p>
		<h1>{i18n.t.promo.heading}</h1>
		<p class="page-sub">{i18n.t.promo.desc}</p>
		<a href={enquiryUrl('oglasavanje')} class="btn-offer">
			{i18n.t.promo.cta}
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
		</a>
	</div>
</div>

<div class="adv-body reveal-card" use:reveal>
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
				<a href={enquiryUrl('oglasavanje')} class="btn-emerald">{i18n.t.promo.cta}</a>
			</div>
		</div>
	</div>
</div>
</div>

<style>
	/* Primary "request an offer" button in the promotion header */
	.btn-offer {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		margin-top: 2rem;
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--cta-text);
		background: var(--cta);
		padding: 1rem 2rem;
		border-radius: 10px;
		box-shadow: 0 10px 24px -8px rgba(155,17,30,0.55), inset 0 1px 0 rgba(255,255,255,0.18);
		transition: background 0.2s, transform 0.2s;
	}
	.btn-offer:hover { background: var(--cta-hover); transform: translateY(-2px); }
	.btn-offer svg { transition: transform 0.2s; }
	.btn-offer:hover svg { transform: translateX(3px); }
	.btn-emerald { text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }

	.page-wrap {
		max-width: 1440px;
		margin: 0 auto;
		padding: calc(var(--nav-h) + 1.25rem) clamp(1rem, 3vw, 2rem) 3rem;
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	.page-top {
		background: var(--surface-dark);
		color: white;
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-dark-raised);
		border: 1px solid rgba(255,255,255,0.05);
	}
	.container {
		max-width: var(--max-w);
		margin: 0 auto;
	}
	.page-label {
		font-size: 0.85rem;
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
		color: rgba(255, 255, 255, 0.85);
	}
	.adv-body {
		background: var(--surface-light);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-light-raised);
		border: 1px solid rgba(255,255,255,0.4);
	}
	.adv-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-bottom: 4rem;
	}
	.adv-card {
		background: var(--soft-white);
		border-radius: var(--radius-lg);
		padding: 2rem 1.75rem;
		border: 1px solid rgba(8, 14, 26, 0.05);
		transition: transform 0.2s, background 0.2s;
	}
	.adv-card:hover {
		transform: translateY(-3px);
		background: white;
	}
	.adv-num {
		font-family: var(--font-serif);
		font-size: 2.2rem;
		font-weight: 700;
		color: var(--silver);
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
		grid-template-columns: 1fr;
		gap: 4rem;
		align-items: center;
		background: var(--soft-white);
		border-radius: var(--radius-xl);
		overflow: hidden;
		border: 1px solid rgba(8,14,26,0.05);
	}
	.adv-hero-img {
		width: 100%;
		height: 100%;
		min-height: 220px;
		object-fit: cover;
	}
	.adv-info-text {
		padding: 2rem;
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
		background: var(--silver);
		border-radius: 50%;
		flex-shrink: 0;
	}
	.btn-emerald {
		display: inline-block;
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--cta-text);
		background: var(--cta);
		text-decoration: none;
		padding: 0.95rem 2.1rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.adv-grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.adv-info {
			grid-template-columns: 1fr 1.2fr;
		}
		.adv-hero-img {
			min-height: 380px;
		}
		.adv-info-text {
			padding: 3.5rem;
		}
	}
	@media (min-width: 1024px) {
		.adv-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>

<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>{i18n.t.investments.heading} — Semberija.app</title>
</svelte:head>

<div class="page-wrap">
<div class="page-top reveal-card" use:reveal>
	<div class="container">
		<p class="page-label">{i18n.t.investments.label}</p>
		<h1>{i18n.t.investments.heading}</h1>
		<p class="page-sub">{i18n.t.investments.sub}</p>
	</div>
</div>

<div class="opp-body reveal-card" use:reveal>
	<div class="container">
		<div class="opp-grid">
			{#each ([
				{ type: i18n.lang === 'sr' ? 'Investicija' : 'Investment', title: i18n.lang === 'sr' ? 'Hladnjača kapaciteta 2000 t' : '2000t Cold Storage Facility', desc: i18n.lang === 'sr' ? 'Tražimo investitora za izgradnju hladnjače u okolini Bijeljine.' : 'Seeking investor for cold storage construction near Bijeljina.', range: '€150.000 – €300.000' },
				{ type: i18n.lang === 'sr' ? 'Partnerstvo' : 'Partnership', title: i18n.lang === 'sr' ? 'Distribucija prehrambenih proizvoda' : 'Food Product Distribution', desc: i18n.lang === 'sr' ? 'Tražimo pouzdanog partnera za distribuciju.' : 'Looking for a reliable distribution partner.', range: i18n.lang === 'sr' ? 'Na dogovor' : 'Negotiable' },
				{ type: i18n.lang === 'sr' ? 'Saradnja' : 'Collaboration', title: i18n.lang === 'sr' ? 'IT outsourcing za lokalne firme' : 'IT Outsourcing for Local Companies', desc: i18n.lang === 'sr' ? 'Agencija traži dugoročne saradnike za IT usluge.' : 'Agency seeking long-term collaborators for IT services.', range: i18n.lang === 'sr' ? 'Dugoročno' : 'Long-term' }
			]) as opp}
				<article class="opp-card">
					<div class="opp-header">
						<span class="opp-type">{opp.type}</span>
						<span class="opp-range">{opp.range}</span>
					</div>
					<h3>{opp.title}</h3>
					<p>{opp.desc}</p>
					<a href="/kontakt" class="opp-btn">
						{i18n.lang === 'sr' ? 'Zainteresovan sam' : 'I am interested'}
					</a>
				</article>
			{/each}
		</div>

		<div class="post-opp">
			<div class="post-img">
				<img src="/etno%20selo%20bijeljina.jpg" alt="Semberija" loading="lazy" />
			</div>
			<div class="post-text">
				<p class="post-label">{i18n.lang === 'sr' ? 'Objavi svoju' : 'Post your own'}</p>
				<h2>
					{i18n.lang === 'sr'
						? 'Imate poslovnu priliku ili ideju?'
						: 'Have a business opportunity or idea?'}
				</h2>
				<p>
					{i18n.lang === 'sr'
						? 'Objavite investiciju, partnerstvo ili saradnju i povežite se sa pravim partnerima kroz mrežu Semberija.app.'
						: 'Post an investment, partnership, or collaboration opportunity and connect with the right partners through the Semberija.app network.'}
				</p>
				<a href="/kontakt" class="btn-emerald">
					{i18n.lang === 'sr' ? 'Objavi prilike' : 'Post Opportunity'}
				</a>
			</div>
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
		position: relative;
		overflow: hidden;
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
	}
	.opp-body {
		background: radial-gradient(140% 140% at 25% 15%, #ffffff 0%, #f2f3f6 100%);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-bento), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -16px 30px -20px rgba(15,23,42,0.14);
		border: 1px solid rgba(255,255,255,0.4);
	}
	.opp-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-bottom: 4rem;
	}
	.opp-card {
		background: var(--soft-white);
		border-radius: var(--radius-lg);
		padding: 2rem;
		border: 1px solid rgba(8, 14, 26, 0.05);
		display: flex;
		flex-direction: column;
		transition: transform 0.2s, background 0.2s;
	}
	.opp-card:hover {
		transform: translateY(-3px);
		background: white;
	}
	.opp-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}
	.opp-type {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--navy-mid);
	}
	.opp-range {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--silver);
	}
	.opp-card h3 {
		font-family: var(--font-serif);
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 0.75rem;
	}
	.opp-card p {
		font-size: 0.87rem;
		color: var(--muted);
		line-height: 1.65;
		flex: 1;
		margin-bottom: 1.5rem;
	}
	.opp-btn {
		display: block;
		font-family: var(--font-sans);
		font-size: 0.85rem;
		font-weight: 600;
		color: white;
		background: var(--card-blue);
		text-decoration: none;
		padding: 0.65rem 1rem;
		border-radius: var(--radius-sm);
		text-align: center;
		transition: background 0.2s;
	}
	.opp-btn:hover {
		background: var(--card-blue-light);
	}
	.post-opp {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
		align-items: center;
		background: var(--soft-white);
		border-radius: var(--radius-xl);
		overflow: hidden;
		border: 1px solid rgba(8,14,26,0.05);
	}
	.post-img img {
		width: 100%;
		height: 220px;
		object-fit: cover;
	}
	.post-text {
		padding: 2rem;
	}
	.post-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--silver);
		margin-bottom: 0.75rem;
	}
	.post-text h2 {
		font-family: var(--font-serif);
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--dark);
		margin-bottom: 1rem;
	}
	.post-text p {
		font-size: 0.95rem;
		color: var(--muted);
		line-height: 1.7;
		margin-bottom: 1.75rem;
	}
	.btn-emerald {
		display: inline-block;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: white;
		background: var(--card-blue);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: var(--radius);
	}
	@media (min-width: 600px) {
		.opp-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 768px) {
		.opp-grid {
			grid-template-columns: repeat(3, 1fr);
		}
		.post-opp {
			grid-template-columns: 1fr 1fr;
		}
		.post-img img {
			height: 360px;
		}
		.post-text {
			padding: 3rem;
		}
	}
</style>

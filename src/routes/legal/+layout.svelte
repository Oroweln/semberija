<script lang="ts">
	let { children } = $props();
</script>

<div class="page-wrap">
	{@render children()}
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

	:global(.legal-top) {
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

	:global(.legal-top .container) {
		max-width: 900px;
		margin: 0 auto;
	}

	:global(.legal-top .breadcrumb) {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
		margin-bottom: 1rem;
	}

	:global(.legal-top .breadcrumb a) {
		color: rgba(255, 255, 255, 0.5);
		text-decoration: none;
	}

	:global(.legal-top .breadcrumb a:hover) {
		color: rgba(255, 255, 255, 0.8);
	}

	:global(.legal-top h1) {
		font-family: var(--font-serif);
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	:global(.legal-top .updated) {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.5);
	}

	:global(.legal-body) {
		background: radial-gradient(140% 140% at 25% 15%, #ffffff 0%, #f2f3f6 100%);
		padding: var(--section-py) var(--section-px);
		border-radius: var(--radius-bento);
		box-shadow: var(--shadow-bento), inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -16px 30px -20px rgba(15,23,42,0.14);
		border: 1px solid rgba(255,255,255,0.4);
	}

	:global(.legal-body .container) {
		max-width: 900px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: start;
	}

	:global(.legal-content) {
		background: var(--soft-white);
		border-radius: var(--radius-xl);
		padding: 2rem;
		border: 1px solid rgba(8,14,26,0.05);
	}

	:global(.legal-content .lead) {
		font-size: 1.05rem;
		color: var(--dark);
		line-height: 1.7;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.07);
	}

	:global(.legal-content h2) {
		font-family: var(--font-serif);
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--navy-mid);
		margin: 2.25rem 0 0.75rem;
	}

	:global(.legal-content h2:first-of-type) {
		margin-top: 0;
	}

	:global(.legal-content h3) {
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--dark);
		margin: 1.25rem 0 0.5rem;
	}

	:global(.legal-content p) {
		font-size: 0.92rem;
		color: #444;
		line-height: 1.75;
		margin-bottom: 0.85rem;
	}

	:global(.legal-content ul),
	:global(.legal-content ol) {
		margin: 0.5rem 0 1rem 1.25rem;
	}

	:global(.legal-content li) {
		font-size: 0.92rem;
		color: #444;
		line-height: 1.7;
		margin-bottom: 0.3rem;
	}

	:global(.legal-content a) {
		color: var(--navy-mid);
		text-decoration: none;
	}

	:global(.legal-content a:hover) {
		text-decoration: underline;
	}

	:global(.legal-content .company-block) {
		background: var(--soft-white);
		border-left: 3px solid var(--silver);
		border-radius: 0 var(--radius) var(--radius) 0;
		padding: 1.25rem 1.5rem;
		margin: 1rem 0 1.25rem;
		font-size: 0.9rem;
		line-height: 1.8;
		color: var(--dark);
	}

	:global(.legal-nav) {
		position: static;
		order: -1;
		background: var(--soft-white);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		border: 1px solid rgba(8,14,26,0.05);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	:global(.legal-nav h4) {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--silver);
		width: 100%;
		margin-bottom: 0.4rem;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.07);
	}

	:global(.legal-nav a) {
		font-size: 0.83rem;
		font-weight: 500;
		color: var(--muted);
		text-decoration: none;
		padding: 0.45rem 0.6rem;
		border-radius: var(--radius-sm);
		transition: color 0.2s, background 0.2s;
	}

	:global(.legal-nav a:hover),
	:global(.legal-nav a.active) {
		color: var(--navy-mid);
		background: rgba(15, 61, 62, 0.06);
	}

	@media (min-width: 768px) {
		:global(.legal-body .container) {
			grid-template-columns: 1fr 220px;
			gap: 4rem;
		}

		:global(.legal-nav) {
			position: sticky;
			top: 116px;
			order: 0;
			flex-direction: column;
			flex-wrap: nowrap;
			gap: 0.1rem;
		}

		:global(.legal-nav h4) {
			width: auto;
			margin-bottom: 0.75rem;
			padding-bottom: 0.75rem;
		}

		:global(.legal-content) {
			padding: 3rem;
		}
	}
</style>

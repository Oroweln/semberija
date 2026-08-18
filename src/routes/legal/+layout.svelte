<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(.legal-top) {
		background: var(--emerald);
		color: white;
		padding: 8rem var(--section-px) 3rem;
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
		background: var(--beige);
		padding: 3rem var(--section-px) 6rem;
	}

	:global(.legal-body .container) {
		max-width: 900px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 220px;
		gap: 4rem;
		align-items: start;
	}

	:global(.legal-content) {
		background: white;
		border-radius: var(--radius-xl);
		padding: 3rem;
		box-shadow: var(--shadow-sm);
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
		color: var(--emerald);
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
		color: var(--emerald);
		text-decoration: none;
	}

	:global(.legal-content a:hover) {
		text-decoration: underline;
	}

	:global(.legal-content .company-block) {
		background: var(--beige);
		border-left: 3px solid var(--gold);
		border-radius: 0 var(--radius) var(--radius) 0;
		padding: 1.25rem 1.5rem;
		margin: 1rem 0 1.25rem;
		font-size: 0.9rem;
		line-height: 1.8;
		color: var(--dark);
	}

	:global(.legal-nav) {
		position: sticky;
		top: 90px;
		background: white;
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	:global(.legal-nav h4) {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 0.75rem;
		padding-bottom: 0.75rem;
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
		color: var(--emerald);
		background: rgba(15, 61, 62, 0.06);
	}

	@media (max-width: 768px) {
		:global(.legal-body .container) {
			grid-template-columns: 1fr;
		}

		:global(.legal-nav) {
			position: static;
			order: -1;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.4rem;
		}

		:global(.legal-nav h4) {
			width: 100%;
			margin-bottom: 0.4rem;
			padding-bottom: 0.4rem;
		}

		:global(.legal-content) {
			padding: 2rem;
		}
	}
</style>

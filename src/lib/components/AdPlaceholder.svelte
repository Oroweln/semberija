<script lang="ts">
	interface Props {
		width?: string;
		height?: string;
		label?: string;
		variant?: 'banner' | 'sidebar' | 'square' | 'leaderboard';
	}

	let { width, height, label = 'Advertisement', variant = 'banner' }: Props = $props();

	const sizes: Record<string, { w: string; h: string }> = {
		banner: { w: '100%', h: '90px' },
		sidebar: { w: '300px', h: '250px' },
		square: { w: '250px', h: '250px' },
		leaderboard: { w: '100%', h: '120px' },
	};

	const resolvedWidth = $derived(width ?? sizes[variant].w);
	const resolvedHeight = $derived(height ?? sizes[variant].h);
</script>

<div
	class="ad-placeholder ad-{variant}"
	style="width:{resolvedWidth};height:{resolvedHeight}"
	aria-label={label}
	role="img"
>
	<span class="ad-label">{label}</span>
	<span class="ad-dims">{resolvedWidth} × {resolvedHeight}</span>
</div>

<style>
	.ad-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
		background: repeating-linear-gradient(
			45deg,
			rgba(200, 169, 106, 0.06),
			rgba(200, 169, 106, 0.06) 10px,
			rgba(200, 169, 106, 0.02) 10px,
			rgba(200, 169, 106, 0.02) 20px
		);
		border: 1.5px dashed rgba(200, 169, 106, 0.4);
		border-radius: var(--radius, 10px);
		color: var(--muted, #6b7280);
		max-width: 100%;
	}

	.ad-label {
		font-family: var(--font-sans, sans-serif);
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--gold, #c8a96a);
	}

	.ad-dims {
		font-family: var(--font-sans, sans-serif);
		font-size: 0.65rem;
		color: var(--muted, #6b7280);
		opacity: 0.7;
	}
</style>

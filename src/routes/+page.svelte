<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { domesticFirms as companies } from '$lib/data';
	import { onMount, onDestroy } from 'svelte';

	let heroCanvas: HTMLCanvasElement;
	let renderer: import('three').WebGLRenderer | null = null;
	let animId: number;

	onMount(() => {
		let onResize: () => void;

		(async () => {
		const THREE = await import('three');
		const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
		const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
		const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');

		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x040c2e);

		const getCameraZ = () => window.innerWidth < 700 ? 30 : 18;

		const camera = new THREE.PerspectiveCamera(55, heroCanvas.offsetWidth / heroCanvas.offsetHeight, 0.1, 1000);
		camera.position.set(0, 4, getCameraZ());
		camera.lookAt(0, 0, 0);

		renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, antialias: true });
		renderer.setSize(heroCanvas.offsetWidth, heroCanvas.offsetHeight);
		renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.2;

		// Bake a basic room environment so metalness has something to reflect
		const pmrem = new THREE.PMREMGenerator(renderer);
		scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
		pmrem.dispose();

		const controls = new OrbitControls(camera, heroCanvas);
		controls.enableDamping = true;
		controls.dampingFactor = 0.06;
		controls.minDistance = 5;
		controls.maxDistance = 40;
		controls.enableZoom = true;
		controls.zoomSpeed = 0.8;

		scene.add(new THREE.AmbientLight(0xffffff, 2));
		const keyLight = new THREE.PointLight(0xfff5e0, 3, 200);
		keyLight.position.set(12, 8, 10);
		scene.add(keyLight);
		const fillLight = new THREE.PointLight(0x3a7bd5, 0.6, 200);
		fillLight.position.set(-10, -4, 6);
		scene.add(fillLight);

		const starGeo = new THREE.BufferGeometry();
		const starPositions = new Float32Array(3600);
		for (let i = 0; i < 3600; i++) starPositions[i] = (Math.random() - 0.5) * 400;
		starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
		scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, sizeAttenuation: true })));

		const loader = new GLTFLoader();
		const loadModel = (url: string) =>
			new Promise<import('three').Group>((resolve, reject) => loader.load(url, g => resolve(g.scene), undefined, reject));

		const [mapGltf, grbGltf] = await Promise.all([
			loadModel('/semberijamap.glb'),
			loadModel('/semberijagrb.glb')
		]);

		const planet = mapGltf;
		const planetMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0e0e0,      // Svetlo siva
    metalness: 1.0,       // Puna metalnost
    roughness: 0.15,      // Mala hrapavost za blagi sjaj
    envMapIntensity: 1.0, // Jačina refleksije okruženja
    clearcoat: 0.5        // Dodaje "lak" preko metala za dublji sjaj
});
		planet.traverse(obj => {
			if ((obj as import('three').Mesh).isMesh) (obj as import('three').Mesh).material = planetMat;
		});
		const planetBox = new THREE.Box3().setFromObject(planet);
		const planetSize = new THREE.Vector3();
		planetBox.getSize(planetSize);
		planet.scale.setScalar(4.4 / Math.max(planetSize.x, planetSize.y, planetSize.z));
		const planetPivot = new THREE.Group();
		const planetCenter = new THREE.Vector3();
		new THREE.Box3().setFromObject(planet).getCenter(planetCenter);
		planet.position.set(-planetCenter.x, -planetCenter.y, -planetCenter.z);
		planetPivot.add(planet);
		scene.add(planetPivot);

		const ORBIT_RADIUS = 8.5;
		const orbitPivot = new THREE.Object3D();
		orbitPivot.rotation.x = 0.28;
		scene.add(orbitPivot);

		const moon = grbGltf;
		const moonBox = new THREE.Box3().setFromObject(moon);
		const moonSize = new THREE.Vector3();
		moonBox.getSize(moonSize);
		moon.scale.setScalar(1.0 / Math.max(moonSize.x, moonSize.y, moonSize.z));
		const moonWrapper = new THREE.Group();
		const moonCenter = new THREE.Vector3();
		new THREE.Box3().setFromObject(moon).getCenter(moonCenter);
		moon.position.set(-moonCenter.x, -moonCenter.y, -moonCenter.z);
		moonWrapper.add(moon);
		moonWrapper.position.set(ORBIT_RADIUS, 0, 0);
		orbitPivot.add(moonWrapper);

		const ring = new THREE.Mesh(
			new THREE.RingGeometry(ORBIT_RADIUS - 0.05, ORBIT_RADIUS + 0.05, 128),
			new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide, transparent: true, opacity: 0.15 })
		);
		ring.rotation.x = Math.PI / 2;
		orbitPivot.add(ring);

		function animate() {
			animId = requestAnimationFrame(animate);
			planetPivot.rotation.y += 0.0018;
			orbitPivot.rotation.y += 0.006;
			moonWrapper.rotation.y += 0.008;
			controls.update();
			renderer!.render(scene, camera);
		}
		animate();

		onResize = () => {
			if (!renderer) return;
			camera.aspect = heroCanvas.offsetWidth / heroCanvas.offsetHeight;
			camera.position.z = getCameraZ();
			camera.updateProjectionMatrix();
			renderer.setSize(heroCanvas.offsetWidth, heroCanvas.offsetHeight);
		};
		window.addEventListener('resize', onResize);
		})();

		return () => { if (onResize) window.removeEventListener('resize', onResize); };
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		cancelAnimationFrame(animId);
		renderer?.dispose();
	});

	const featuredCompanies = $derived(companies.filter(c => c.featured).slice(0, 6));
</script>

<svelte:head>
	<title>Semberija.app — {i18n.t.hero.headline}</title>
	<meta name="description" content={i18n.t.hero.sub} />
</svelte:head>

<!-- ─── HERO ─── -->
<section class="hero">
	<canvas bind:this={heroCanvas} class="hero-canvas"></canvas>
	<div class="hero-overlay"></div>

	<div class="hero-content">
		<span class="hero-tag">{i18n.t.hero.tag}</span>
		<h1 class="hero-headline">{i18n.t.hero.headline}</h1>
		<p class="hero-sub">{i18n.t.hero.sub}</p>
		<div class="hero-btns">
			<a href="/mreza" class="btn-primary">{i18n.t.hero.ctaNetwork}</a>
			<a href="/firme" class="btn-ghost">{i18n.t.hero.ctaCompanies}</a>
			<a href="/investicije" class="btn-ghost">{i18n.t.hero.ctaInvest}</a>
		</div>
	</div>

	<button
		class="hero-scroll"
		onclick={() => document.getElementById('below-hero')?.scrollIntoView({ behavior: 'smooth' })}
	>
		<span class="hero-scroll-label">{i18n.t.ui.explore}</span>
		<span class="hero-scroll-line"></span>
	</button>
</section>

<!-- ─── STATS ─── -->
<section class="stats-bar" id="below-hero">
	{#each i18n.t.stats as stat}
		<div class="stat-item">
			<span class="stat-value">{stat.value}</span>
			<span class="stat-label">{stat.label}</span>
		</div>
	{/each}
</section>

<!-- ─── WHY SEMBERIJA ─── -->
<section class="section section-light">
	<div class="container">
		<div class="section-header">
			<span class="section-tag">{i18n.t.why.label}</span>
			<h2>{i18n.t.why.heading}</h2>
		</div>
		<div class="why-grid">
			{#each i18n.t.why.items as item}
				<div class="why-card">
					<div class="why-icon">
						{#if item.icon === 'location'}
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
						{:else if item.icon === 'growth'}
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
						{:else if item.icon === 'agriculture'}
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
						{:else if item.icon === 'diaspora'}
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
						{:else}
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
						{/if}
					</div>
					<h3>{item.title}</h3>
					<p>{item.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── NETWORK ─── -->
<section class="section section-dark">
	<div class="container">
		<div class="section-header section-header-light">
			<span class="section-tag-light">{i18n.t.network.label}</span>
			<h2>{i18n.t.network.heading}</h2>
			<p class="section-sub-light">{i18n.t.network.sub}</p>
		</div>
		<div class="network-grid">
			{#each i18n.t.network.items as item, i}
				<div class="network-card">
					<div class="network-num">0{i + 1}</div>
					<h3>{item.title}</h3>
					<p>{item.desc}</p>
				</div>
			{/each}
		</div>
		<div class="section-cta">
			<a href="/mreza" class="btn-primary">{i18n.t.hero.ctaNetwork}</a>
		</div>
	</div>
</section>

<!-- ─── FEATURED COMPANIES ─── -->
<section class="section section-light">
	<div class="container">
		<div class="section-header">
			<span class="section-tag">{i18n.t.companies.heading}</span>
			<h2>{i18n.t.companies.heading}</h2>
			<p class="section-sub">{i18n.t.companies.sub}</p>
		</div>
		<div class="companies-grid">
			{#each featuredCompanies as company}
				<article class="company-card">
					<div class="company-top">
						<div class="company-avatar" style="background: {company.color}">
							{company.initials}
						</div>
						<div class="company-meta">
							<span class="company-category">{i18n.lang === 'sr' ? company.category_sr : company.category_en}</span>
							<span class="company-city">{company.city}</span>
						</div>
					</div>
					<h3 class="company-name">{company.name}</h3>
					<p class="company-desc">{i18n.lang === 'sr' ? company.desc_sr : company.desc_en}</p>
					<a href="/kontakt" class="company-btn">{i18n.t.companies.inquire}</a>
				</article>
			{/each}
		</div>
		<div class="section-cta">
			<a href="/firme" class="btn-outline">{i18n.t.companies.viewAll}</a>
		</div>
	</div>
</section>

<!-- ─── INVESTMENTS ─── -->
<section class="section section-navy">
	<div class="container">
		<div class="section-header section-header-light">
			<span class="section-tag-light">{i18n.t.investments.label}</span>
			<h2>{i18n.t.investments.heading}</h2>
			<p class="section-sub-light">{i18n.t.investments.sub}</p>
		</div>
		<div class="invest-grid">
			{#each i18n.t.investments.categories as cat}
				<a href="/investicije" class="invest-chip">{cat}</a>
			{/each}
		</div>
		<div class="section-cta">
			<a href="/investicije" class="btn-primary">{i18n.t.investments.cta}</a>
		</div>
	</div>
</section>

<!-- ─── DIASPORA ─── -->
<section class="section section-light">
	<div class="container diaspora-layout">
		<div class="diaspora-text">
			<span class="section-tag">{i18n.t.diaspora.label}</span>
			<h2>{i18n.t.diaspora.heading}</h2>
			<p class="section-sub">{i18n.t.diaspora.sub}</p>
			<ul class="diaspora-list">
				{#each i18n.t.diaspora.items as item}
					<li>
						<span class="diaspora-dot"></span>
						{item}
					</li>
				{/each}
			</ul>
			<a href="/dijaspora" class="btn-primary">{i18n.t.diaspora.cta}</a>
		</div>
		<div class="diaspora-visual">
			<div class="diaspora-globe">
				<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="100" cy="100" r="90" stroke="rgba(6,182,212,0.2)" stroke-width="1"/>
					<circle cx="100" cy="100" r="70" stroke="rgba(6,182,212,0.15)" stroke-width="1"/>
					<circle cx="100" cy="100" r="50" stroke="rgba(6,182,212,0.1)" stroke-width="1"/>
					<ellipse cx="100" cy="100" rx="90" ry="35" stroke="rgba(6,182,212,0.15)" stroke-width="1"/>
					<ellipse cx="100" cy="100" rx="90" ry="65" stroke="rgba(6,182,212,0.1)" stroke-width="1"/>
					<line x1="100" y1="10" x2="100" y2="190" stroke="rgba(6,182,212,0.12)" stroke-width="1"/>
					{#each [30, 60, 120, 150] as x}
						<line x1={x} y1="10" x2={x} y2="190" stroke="rgba(6,182,212,0.08)" stroke-width="1"/>
					{/each}
					<circle cx="100" cy="100" r="6" fill="var(--cyan)" opacity="0.8"/>
					<circle cx="60" cy="70" r="4" fill="var(--blue-light)" opacity="0.6"/>
					<circle cx="145" cy="65" r="4" fill="var(--blue-light)" opacity="0.6"/>
					<circle cx="130" cy="135" r="4" fill="var(--blue-light)" opacity="0.6"/>
					<circle cx="55" cy="140" r="4" fill="var(--blue-light)" opacity="0.6"/>
					<line x1="100" y1="100" x2="60" y2="70" stroke="rgba(6,182,212,0.4)" stroke-width="1.5"/>
					<line x1="100" y1="100" x2="145" y2="65" stroke="rgba(6,182,212,0.4)" stroke-width="1.5"/>
					<line x1="100" y1="100" x2="130" y2="135" stroke="rgba(6,182,212,0.4)" stroke-width="1.5"/>
					<line x1="100" y1="100" x2="55" y2="140" stroke="rgba(6,182,212,0.4)" stroke-width="1.5"/>
				</svg>
			</div>
		</div>
	</div>
</section>

<!-- ─── DIGITAL SERVICES ─── -->
<section class="section section-dark">
	<div class="container">
		<div class="section-header section-header-light">
			<span class="section-tag-light">{i18n.t.services.label}</span>
			<h2>{i18n.t.services.heading}</h2>
			<p class="section-sub-light">{i18n.t.services.sub}</p>
		</div>
		<div class="services-grid">
			{#each i18n.t.services.items as svc, i}
				<div class="service-card">
					<div class="service-num">0{i + 1}</div>
					<h3>{svc.title}</h3>
					<p>{svc.desc}</p>
				</div>
			{/each}
		</div>
		<div class="section-cta">
			<a href="/usluge" class="btn-primary">{i18n.t.services.label}</a>
		</div>
	</div>
</section>

<!-- ─── FINAL CTA ─── -->
<section class="cta-section">
	<div class="cta-glow"></div>
	<div class="container cta-inner">
		<h2>{i18n.t.cta.heading}</h2>
		<p>{i18n.t.cta.sub}</p>
		<a href="/kontakt" class="btn-primary btn-lg">{i18n.t.cta.btn}</a>
	</div>
</section>

<style>
	/* ── Shared ── */
	.container { max-width: var(--max-w); margin: 0 auto; }

	.section { padding: var(--section-py) var(--section-px); }
	.section-light { background: var(--soft-white); }
	.section-dark  { background: var(--navy-mid); color: white; }
	.section-navy  { background: var(--navy); color: white; }

	.section-header {
		text-align: center;
		max-width: 640px;
		margin: 0 auto 4rem;
	}
	.section-header-light { color: white; }

	.section-tag {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--blue);
		background: rgba(26,86,219,0.08);
		border: 1px solid rgba(26,86,219,0.2);
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		margin-bottom: 1rem;
	}
	.section-tag-light {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--cyan);
		background: rgba(6,182,212,0.1);
		border: 1px solid rgba(6,182,212,0.25);
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		margin-bottom: 1rem;
	}

	.section-header h2,
	.section-header-light h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.8rem, 3.5vw, 2.8rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--navy);
		margin-bottom: 0.75rem;
	}
	.section-header-light h2 { color: white; }

	.section-sub { font-size: 1rem; color: var(--muted); line-height: 1.65; }
	.section-sub-light { font-size: 1rem; color: rgba(255,255,255,0.6); line-height: 1.65; }

	.section-cta { text-align: center; margin-top: 3rem; }

	/* ── Buttons ── */
	.btn-primary {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--navy);
		background: linear-gradient(135deg, var(--cyan), var(--blue-light));
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: 10px;
		transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
		box-shadow: 0 0 20px rgba(6,182,212,0.25);
	}
	.btn-primary:hover {
		opacity: 0.92;
		transform: translateY(-2px);
		box-shadow: 0 0 32px rgba(6,182,212,0.5);
	}
	.btn-primary.btn-lg { padding: 1rem 2.5rem; font-size: 1rem; }

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 500;
		color: rgba(255,255,255,0.8);
		background: rgba(255,255,255,0.08);
		border: 1px solid rgba(255,255,255,0.2);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: 10px;
		transition: all 0.2s;
	}
	.btn-ghost:hover {
		background: rgba(255,255,255,0.14);
		border-color: rgba(255,255,255,0.4);
		color: white;
	}

	.btn-outline {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-sans);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--blue);
		background: transparent;
		border: 1.5px solid var(--blue);
		text-decoration: none;
		padding: 0.75rem 1.75rem;
		border-radius: 10px;
		transition: all 0.2s;
	}
	.btn-outline:hover {
		background: var(--blue);
		color: white;
	}

	/* ── HERO ── */
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.hero-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
		cursor: grab;
	}
	.hero-canvas:active { cursor: grabbing; }

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(4,12,46,0.45) 0%,
			rgba(4,12,46,0.25) 50%,
			rgba(4,12,46,0.75) 100%
		);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 820px;
		padding: 8rem var(--section-px) 4rem;
		color: white;
		pointer-events: none;
	}

	.hero-tag {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--cyan);
		margin-bottom: 1.5rem;
		opacity: 0.85;
	}

	.hero-headline {
		font-family: var(--font-heading);
		font-size: clamp(3rem, 7vw, 6rem);
		font-weight: 800;
		line-height: 1.0;
		letter-spacing: -0.04em;
		color: white;
		margin-bottom: 1.25rem;
	}

	.hero-sub {
		font-size: clamp(1rem, 2vw, 1.2rem);
		font-weight: 300;
		color: rgba(255,255,255,0.7);
		line-height: 1.6;
		max-width: 560px;
		margin: 0 auto 2.5rem;
	}

	.hero-btns {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		flex-wrap: wrap;
		pointer-events: all;
	}

	.hero-scroll {
		position: absolute;
		bottom: 2.5rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
		padding: 0.5rem 1rem;
		animation: scroll-bob 3s ease infinite;
	}

	.hero-scroll:hover .hero-scroll-label { opacity: 1; letter-spacing: 0.22em; }
	.hero-scroll:hover .hero-scroll-line { height: 56px; opacity: 0.9; }

	.hero-scroll-label {
		font-family: var(--font-sans);
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.55);
		transition: opacity 0.3s, letter-spacing 0.3s;
	}

	.hero-scroll-line {
		display: block;
		width: 1px;
		height: 44px;
		background: linear-gradient(to bottom, rgba(6,182,212,0.7), transparent);
		transition: height 0.3s, opacity 0.3s;
	}

	@keyframes scroll-bob {
		0%, 100% { opacity: 0.55; transform: translateX(-50%) translateY(0); }
		50%       { opacity: 1;    transform: translateX(-50%) translateY(5px); }
	}

	/* ── STATS ── */
	.stats-bar {
		background: var(--graphite);
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0;
		border-top: 1px solid rgba(255,255,255,0.06);
		border-bottom: 1px solid rgba(255,255,255,0.06);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem 3.5rem;
		border-right: 1px solid rgba(255,255,255,0.06);
	}
	.stat-item:last-child { border-right: none; }

	.stat-value {
		font-family: var(--font-heading);
		font-size: 2.4rem;
		font-weight: 800;
		color: var(--cyan);
		line-height: 1;
		margin-bottom: 0.35rem;
		letter-spacing: -0.04em;
	}

	.stat-label {
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.4);
	}

	/* ── WHY ── */
	.why-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 1.25rem;
	}

	.why-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 2rem 1.5rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0,0,0,0.05);
		transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
	}
	.why-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-md);
		border-color: rgba(6,182,212,0.2);
	}

	.why-icon {
		width: 48px;
		height: 48px;
		background: rgba(26,86,219,0.07);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--blue);
		margin-bottom: 1rem;
	}

	.why-card h3 {
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}
	.why-card p { font-size: 0.82rem; color: var(--muted); line-height: 1.6; }

	/* ── NETWORK ── */
	.network-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
	}

	.network-card {
		background: rgba(255,255,255,0.04);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: var(--radius-lg);
		padding: 2rem 1.75rem;
		transition: background 0.25s, border-color 0.25s;
	}
	.network-card:hover {
		background: rgba(6,182,212,0.06);
		border-color: rgba(6,182,212,0.25);
	}

	.network-num {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 800;
		color: rgba(6,182,212,0.2);
		line-height: 1;
		margin-bottom: 0.75rem;
	}

	.network-card h3 {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.5rem;
	}
	.network-card p { font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.6; }

	/* ── COMPANIES ── */
	.companies-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.company-card {
		background: white;
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		box-shadow: var(--shadow-sm);
		border: 1px solid rgba(0,0,0,0.05);
		display: flex;
		flex-direction: column;
		transition: transform 0.25s, box-shadow 0.25s;
	}
	.company-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }

	.company-top { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 1rem; }

	.company-avatar {
		width: 44px; height: 44px;
		border-radius: 10px;
		display: flex; align-items: center; justify-content: center;
		font-family: var(--font-heading);
		font-size: 0.85rem; font-weight: 700;
		color: white; flex-shrink: 0;
	}

	.company-meta { display: flex; flex-direction: column; gap: 0.15rem; }

	.company-category {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--blue);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.company-city { font-size: 0.75rem; color: var(--muted); }

	.company-name {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}

	.company-desc {
		font-size: 0.82rem;
		color: var(--muted);
		line-height: 1.6;
		flex: 1;
		margin-bottom: 1.25rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.company-btn {
		display: block;
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--blue);
		background: rgba(26,86,219,0.06);
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		text-align: center;
		transition: background 0.2s;
	}
	.company-btn:hover { background: rgba(26,86,219,0.12); }

	/* ── INVESTMENTS ── */
	.invest-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.invest-chip {
		font-family: var(--font-sans);
		font-size: 0.85rem;
		font-weight: 500;
		color: rgba(255,255,255,0.7);
		background: rgba(255,255,255,0.05);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 50px;
		padding: 0.5rem 1.25rem;
		text-decoration: none;
		transition: all 0.2s;
	}
	.invest-chip:hover {
		background: rgba(6,182,212,0.12);
		border-color: rgba(6,182,212,0.4);
		color: var(--cyan);
	}

	/* ── DIASPORA ── */
	.diaspora-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6rem;
		align-items: center;
		padding: 0 var(--section-px);
	}

	.diaspora-text .section-tag { margin-bottom: 1rem; }

	.diaspora-text h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.75rem, 3.5vw, 2.5rem);
		font-weight: 800;
		color: var(--navy);
		letter-spacing: -0.03em;
		margin-bottom: 1rem;
	}

	.diaspora-text .section-sub { margin-bottom: 1.75rem; }

	.diaspora-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		margin-bottom: 2rem;
	}

	.diaspora-list li {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-size: 0.9rem;
		color: var(--navy);
		font-weight: 500;
	}

	.diaspora-dot {
		width: 7px; height: 7px;
		background: var(--cyan);
		border-radius: 50%;
		flex-shrink: 0;
	}

	.diaspora-visual { display: flex; align-items: center; justify-content: center; }

	.diaspora-globe {
		width: clamp(200px, 30vw, 340px);
		opacity: 0.8;
	}

	/* ── SERVICES ── */
	.services-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.service-card {
		background: rgba(255,255,255,0.04);
		border: 1px solid rgba(255,255,255,0.08);
		border-radius: var(--radius-lg);
		padding: 2rem 1.75rem;
		transition: background 0.25s, border-color 0.25s;
	}
	.service-card:hover {
		background: rgba(6,182,212,0.06);
		border-color: rgba(6,182,212,0.25);
	}

	.service-num {
		font-family: var(--font-heading);
		font-size: 2.2rem;
		font-weight: 800;
		color: rgba(6,182,212,0.18);
		line-height: 1;
		margin-bottom: 0.75rem;
	}

	.service-card h3 {
		font-family: var(--font-heading);
		font-size: 1.05rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.5rem;
	}
	.service-card p { font-size: 0.85rem; color: rgba(255,255,255,0.5); line-height: 1.6; }

	/* ── FINAL CTA ── */
	.cta-section {
		position: relative;
		background: var(--navy-mid);
		padding: clamp(80px, 12vw, 140px) var(--section-px);
		text-align: center;
		overflow: hidden;
		border-top: 1px solid rgba(255,255,255,0.06);
	}

	.cta-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 300px;
		background: radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, transparent 70%);
		pointer-events: none;
	}

	.cta-inner {
		position: relative;
		z-index: 1;
		padding: 0 var(--section-px);
	}

	.cta-inner h2 {
		font-family: var(--font-heading);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		color: white;
		letter-spacing: -0.04em;
		margin-bottom: 1rem;
	}

	.cta-inner p {
		font-size: 1.05rem;
		color: rgba(255,255,255,0.55);
		margin-bottom: 2.5rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}

	/* ── Responsive ── */
	@media (max-width: 1200px) {
		.why-grid { grid-template-columns: repeat(3, 1fr); }
	}
	@media (max-width: 1024px) {
		.network-grid { grid-template-columns: repeat(2, 1fr); }
		.companies-grid { grid-template-columns: repeat(2, 1fr); }
		.services-grid { grid-template-columns: repeat(2, 1fr); }
		.diaspora-layout { grid-template-columns: 1fr; gap: 3rem; }
		.diaspora-visual { display: none; }
	}
	@media (max-width: 768px) {
		.why-grid { grid-template-columns: repeat(2, 1fr); }
		.stat-item { padding: 1.5rem 2rem; }
	}
	@media (max-width: 600px) {
		.why-grid { grid-template-columns: 1fr; }
		.network-grid { grid-template-columns: 1fr; }
		.companies-grid { grid-template-columns: 1fr; }
		.services-grid { grid-template-columns: 1fr; }
		.hero-btns { display: none; }
		.hero-scroll { bottom: 5rem; }
	}
</style>

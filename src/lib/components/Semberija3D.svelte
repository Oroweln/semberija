<script lang="ts">
	import { onMount } from 'svelte';

	// 3D scene: the Semberija map (static/semberijamap.glb) stands upright in silver,
	// and the coat of arms (static/semberijagrb.glb) spins while orbiting it on a visible ring.
	// three.js is loaded lazily; nothing renders for reduced motion, no WebGL or load errors.
	let { label = 'Semberija' }: { label?: string } = $props();

	let host: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ready = $state(false);

	onMount(() => {
		let disposed = false;
		let cleanup = () => {};
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		(async () => {
			const THREE = await import('three');
			const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
			if (disposed) return;

			let renderer: InstanceType<typeof THREE.WebGLRenderer>;
			try {
				renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
			} catch {
				return;
			}
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			renderer.toneMapping = THREE.ACESFilmicToneMapping;

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
			camera.position.set(0, 0.6, 7.2);
			camera.lookAt(0, 0, 0);

			scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa4b2, 1.6));
			const key = new THREE.DirectionalLight(0xffffff, 2.4);
			key.position.set(3, 5, 4);
			scene.add(key);
			const rim = new THREE.DirectionalLight(0xc8d6ff, 1.2);
			rim.position.set(-4, 2, -3);
			scene.add(rim);

			const loader = new GLTFLoader();
			const [mapGltf, grbGltf] = await Promise.all([
				loader.loadAsync('/semberijamap.glb'),
				loader.loadAsync('/semberijagrb.glb')
			]).catch(() => [null, null]);
			if (!mapGltf || !grbGltf || disposed) {
				renderer.dispose();
				return;
			}

			// Centre an object on a pivot and scale its largest side to `size`.
			function normalise(obj: InstanceType<typeof THREE.Object3D>, size: number) {
				const box = new THREE.Box3().setFromObject(obj);
				const dims = box.getSize(new THREE.Vector3());
				obj.position.sub(box.getCenter(new THREE.Vector3()));
				const pivot = new THREE.Group();
				pivot.add(obj);
				pivot.scale.setScalar(size / Math.max(dims.x, dims.y, dims.z));
				return pivot;
			}

			// Silver metal needs something to reflect: a soft studio environment
			const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
			const pmrem = new THREE.PMREMGenerator(renderer);
			scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

			// Map: standing upright (as exported), in polished silver
			const map = normalise(mapGltf.scene, 2.5);
			const silver = new THREE.MeshStandardMaterial({ color: 0xeef1f5, metalness: 1, roughness: 0.18, envMapIntensity: 1.6 });
			map.traverse((o) => {
				if ((o as InstanceType<typeof THREE.Mesh>).isMesh) (o as InstanceType<typeof THREE.Mesh>).material = silver;
			});
			const mapBase = new THREE.Group();
			mapBase.add(map);
			scene.add(mapBase);

			// Coat of arms orbits around the map on a slightly tilted path
			const grb = normalise(grbGltf.scene, 0.95);
			const orbit = new THREE.Group();
			orbit.rotation.x = 0.22;
			orbit.rotation.z = -0.12;
			const grbHolder = new THREE.Group();
			grbHolder.add(grb);
			orbit.add(grbHolder);
			scene.add(orbit);
			const R = 1.85;

			// Visible orbit path: a thin ring the crest travels along (passes behind the map)
			const ring = new THREE.Mesh(
				new THREE.TorusGeometry(R, 0.006, 8, 200),
				new THREE.MeshStandardMaterial({ color: 0x3a7bd5, emissive: 0x1c5aa8, emissiveIntensity: 0.7, metalness: 0.3, roughness: 0.35 })
			);
			ring.rotation.x = Math.PI / 2;
			orbit.add(ring);

			function resize() {
				const w = host.clientWidth;
				const h = host.clientHeight;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
			}
			resize();
			const ro = new ResizeObserver(resize);
			ro.observe(host);

			let raf = 0;
			let visible = true;
			let t = 0;
			const clock = new THREE.Clock();
			const render = () => renderer.render(scene, camera);

			const tick = () => {
				raf = requestAnimationFrame(tick);
				const dt = Math.min(clock.getDelta(), 0.05);
				if (!visible) return;
				t += dt;
				mapBase.rotation.y = Math.sin(t * 0.3) * 0.45;       // map sways gently, so the silver catches the light
				const angle = t * 0.6;                               // coat of arms orbits
				grbHolder.position.set(Math.sin(angle) * R, Math.sin(t * 1.3) * 0.06, Math.cos(angle) * R);
				grbHolder.rotation.y += dt * 1.6;                    // and spins around itself
				render();
			};

			const io = new IntersectionObserver(([entry]) => {
				visible = entry.isIntersecting;
				clock.getDelta();
			});
			io.observe(host);

			if (reduceMotion) { grbHolder.position.set(R * 0.7, 0, R * 0.7); render(); }
			else tick();
			ready = true;

			cleanup = () => {
				cancelAnimationFrame(raf);
				pmrem.dispose();
				io.disconnect();
				ro.disconnect();
				renderer.dispose();
			};
		})();

		return () => {
			disposed = true;
			cleanup();
		};
	});
</script>

<div class="scene" bind:this={host} role="img" aria-label={label}>
	<canvas bind:this={canvas} class:ready></canvas>
</div>

<style>
	.scene {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		max-height: 420px;
		border-radius: var(--radius-xl);
		background:
			radial-gradient(70% 60% at 50% 45%, rgba(64,120,200,0.14) 0%, transparent 70%),
			linear-gradient(180deg, #ffffff 0%, #f1f3f7 100%);
		border: 1px solid rgba(15,23,42,0.07);
		box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(15,23,42,0.12);
		overflow: hidden;
	}
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.6s ease;
	}
	canvas.ready { opacity: 1; }
</style>

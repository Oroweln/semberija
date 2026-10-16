<script lang="ts">
	import { onMount } from 'svelte';

	// Footer background illustration: the coat of arms (static/semberijagrb.glb) drawn as a
	// line illustration (feature edges only, hidden lines removed) in the footer's silver-grey,
	// rendered once in a fixed three-quarter pose so it still reads as 3D. No animation.
	// three.js and the model load only when the footer approaches the viewport; the parent
	// positions and fades this layer. On any failure nothing is shown.
	let host: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ready = $state(false);

	onMount(() => {
		let disposed = false;
		let cleanup = () => {};

		async function init() {
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

			const gltf = await new GLTFLoader().loadAsync('/semberijagrb.glb').catch(() => null);
			if (!gltf || disposed) {
				renderer.dispose();
				return;
			}

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
			camera.position.set(0, 0.2, 6);
			camera.lookAt(0, 0, 0);

			// Centre and scale the model
			const obj = gltf.scene;
			obj.updateMatrixWorld(true);
			const box = new THREE.Box3().setFromObject(obj);
			const dims = box.getSize(new THREE.Vector3());
			const center = box.getCenter(new THREE.Vector3());
			const pivot = new THREE.Group();
			pivot.scale.setScalar(2.9 / Math.max(dims.x, dims.y, dims.z));
			// Fixed three-quarter pose so the depth shows
			pivot.rotation.set(0.1, -0.6, 0.03);
			scene.add(pivot);

			// Invisible occluder (depth only) hides lines on the far side; lines draw the feature edges
			const occluder = new THREE.MeshBasicMaterial({
				colorWrite: false,
				polygonOffset: true,
				polygonOffsetFactor: 1,
				polygonOffsetUnits: 1
			});
			const ink = new THREE.LineBasicMaterial({ color: 0xd4d9df, transparent: true, opacity: 0.9 });
			const disposables: { dispose(): void }[] = [occluder, ink];

			obj.traverse((o) => {
				const mesh = o as InstanceType<typeof THREE.Mesh>;
				if (!mesh.isMesh) return;
				const geo = mesh.geometry.clone();
				geo.applyMatrix4(mesh.matrixWorld);
				geo.translate(-center.x, -center.y, -center.z);
				const solid = new THREE.Mesh(geo, occluder);
				const edges = new THREE.EdgesGeometry(geo, 25);
				const lines = new THREE.LineSegments(edges, ink);
				pivot.add(solid, lines);
				disposables.push(geo, edges);
			});

			const render = () => renderer.render(scene, camera);
			function resize() {
				const w = host.clientWidth;
				const h = host.clientHeight;
				if (!w || !h) return;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				// Refit for narrow/tall boxes (phones) so the crest is never cropped:
				// the horizontal field of view shrinks with the aspect, so move back.
				const d = 6 * Math.max(1, 1 / camera.aspect);
				camera.position.set(0, 0.2 * (d / 6), d);
				camera.lookAt(0, 0, 0);
				camera.updateProjectionMatrix();
				render();
			}
			resize();
			const ro = new ResizeObserver(resize);
			ro.observe(host);
			ready = true;

			cleanup = () => {
				ro.disconnect();
				disposables.forEach((d) => d.dispose());
				renderer.dispose();
			};
		}

		// Load lazily, shortly before the footer scrolls into view
		const io = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				io.disconnect();
				init();
			},
			{ rootMargin: '400px 0px' }
		);
		io.observe(host);

		return () => {
			disposed = true;
			io.disconnect();
			cleanup();
		};
	});
</script>

<div class="crest" bind:this={host} aria-hidden="true">
	<canvas bind:this={canvas} class:ready></canvas>
</div>

<style>
	.crest {
		position: absolute;
		inset: 0;
	}
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 1.2s ease;
	}
	canvas.ready { opacity: 1; }
	@media (prefers-reduced-motion: reduce) {
		canvas { transition: none; }
	}
</style>

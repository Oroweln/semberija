export function reveal(node: HTMLElement, opts: { threshold?: number; delay?: number } = {}) {
	if (opts.delay) node.style.transitionDelay = `${opts.delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				node.classList.add('reveal-visible');
				observer.disconnect();
			}
		},
		{ threshold: opts.threshold ?? 0.15 }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

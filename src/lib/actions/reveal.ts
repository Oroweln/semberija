// Fades an element in when it scrolls into view.
// Triggers as soon as the element's top edge is 10% above the bottom of the viewport. A
// visible-ratio threshold is not used by default: for very tall elements (long lists) a
// ratio like 0.15 can be larger than the whole viewport, which kept them hidden far too long.
export function reveal(node: HTMLElement, opts: { threshold?: number; delay?: number } = {}) {
	if (opts.delay) node.style.transitionDelay = `${opts.delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				node.classList.add('reveal-visible');
				observer.disconnect();
			}
		},
		{ threshold: opts.threshold ?? 0, rootMargin: '0px 0px -10% 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

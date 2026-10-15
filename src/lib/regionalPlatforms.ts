// Other ZOE MILANO regional platforms shown in the homepage carousel.
// Descriptions are in i18n.t.regions.items[id].
//
// Approved images: drop files into src/lib/assets/platforms/ named
//   <id>-logo.(svg|png|webp)        e.g. lombardia-logo.svg
//   <id>-screenshot.(webp|jpg|png)  e.g. lombardia-screenshot.webp
// They are picked up automatically; until then a styled placeholder is shown.
const assets = import.meta.glob('$lib/assets/platforms/*.{svg,png,jpg,jpeg,webp}', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

function findAsset(id: string, kind: 'logo' | 'screenshot') {
	const key = Object.keys(assets).find((path) => path.split('/').pop()?.startsWith(`${id}-${kind}.`));
	return key ? assets[key] : null;
}

export const regionalPlatforms = [
	{ id: 'lombardia', name: 'Lombardia.app', url: 'https://lombardia.app/' },
	{ id: 'veneto', name: 'Veneto.app', url: 'https://veneto.app/' }
].map((p) => ({ ...p, logo: findAsset(p.id, 'logo'), screenshot: findAsset(p.id, 'screenshot') }));

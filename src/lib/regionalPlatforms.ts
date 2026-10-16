// Other ZOE MILANO regional platforms shown in the homepage carousel.
// Descriptions are in i18n.t.regions.items[id].
// region: place shown on the card (local name, not translated); hue: accent colour of the card preview.
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
	{ id: 'lombardia', name: 'Lombardia.app', url: 'https://lombardia.app/', region: 'Lombardia, Italia', hue: 218 },
	{ id: 'veneto', name: 'Veneto.app', url: 'https://veneto.app/', region: 'Veneto, Italia', hue: 178 },
	{ id: 'ibiza', name: 'IbizaToday.app', url: 'https://ibizatoday.app/', region: 'Ibiza, España', hue: 24 },
	{ id: 'liguria', name: 'Liguria.app', url: 'https://liguria.app/', region: 'Liguria, Italia', hue: 200 },
	{ id: 'montalcino', name: 'Montalcino.app', url: 'https://montalcino.app/', region: 'Toscana, Italia', hue: 345 },
	{ id: 'sannio', name: 'Sannio.app', url: 'https://sannio.app/', region: 'Campania, Italia', hue: 140 },
	{ id: 'fvgitalia', name: 'FVGItalia.app', url: 'https://fvgitalia.app/it', region: 'Friuli Venezia Giulia, Italia', hue: 262 }
].map((p) => ({ ...p, logo: findAsset(p.id, 'logo'), screenshot: findAsset(p.id, 'screenshot') }));

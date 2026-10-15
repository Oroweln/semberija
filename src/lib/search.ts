// Shared company search used by the homepage search panel and /firme.
// Only companies already shown on the site are searchable: the approved
// domestic firms (visibleFirmSlugs) and all investors/partners.
import { domesticFirms, investors, visibleFirmSlugs } from '$lib/data';

export type Company = (typeof domesticFirms)[number];
export type SearchFilters = { q: string; cat: string; city: string; sector?: string };

export const visibleDomestic: Company[] = domesticFirms.filter((c) => visibleFirmSlugs.includes(c.slug));

// Business sectors for the homepage ecosystem overview. Each groups existing
// directory categories (matched on the Serbian category name).
export const sectors = [
	{ id: 'poljoprivreda-hrana', cats: ['Poljoprivreda', 'Prehrambena industrija', 'Hrana i piće'] },
	{ id: 'proizvodnja', cats: ['Industrija', 'Drvna industrija', 'Avio industrija', 'Automobilska industrija', 'Farmaceutika', 'Moda i tekstil', 'Energetika'] },
	{ id: 'gradjevina', cats: ['Građevina', 'Nekretnine'] },
	{ id: 'trgovina', cats: ['Maloprodaja'] },
	{ id: 'transport', cats: ['Transport i logistika'] },
	{ id: 'it', cats: ['IT i tehnologija'] },
	{ id: 'usluge', cats: ['Poslovne usluge', 'Pravne usluge', 'Finansije'] },
	{ id: 'turizam', cats: ['Ugostiteljstvo'] }
] as const;

export type SectorId = (typeof sectors)[number]['id'];

export function inSector(c: Company, sectorId: string) {
	const sector = sectors.find((s) => s.id === sectorId);
	return !!sector && (sector.cats as readonly string[]).includes(c.category_sr);
}

// Number of visible companies per sector (sectors with 0 are not shown)
export function sectorCount(sectorId: string) {
	return [...visibleDomestic, ...investors].filter((c) => inSector(c, sectorId)).length;
}

// Category names exist in Serbian and English; other languages use English (as elsewhere on the site).
export function categoryOf(c: Company, lang: string) {
	return lang === 'sr' ? c.category_sr : c.category_en;
}

function descOf(c: Company, lang: string) {
	return lang === 'sr' ? c.desc_sr : c.desc_en;
}

// Text search covers name, industry and description (where products and services are described).
export function matches(c: Company, f: SearchFilters, lang: string) {
	const q = f.q.trim().toLowerCase();
	const matchText =
		!q ||
		c.name.toLowerCase().includes(q) ||
		categoryOf(c, lang).toLowerCase().includes(q) ||
		descOf(c, lang).toLowerCase().includes(q);
	const matchCat = !f.cat || categoryOf(c, lang) === f.cat;
	const matchCity = !f.city || c.city === f.city;
	const matchSector = !f.sector || inSector(c, f.sector);
	return matchText && matchCat && matchCity && matchSector;
}

const sortedUnique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

// Filter options come straight from the data, so only real values are offered.
export function industryOptions(lang: string, list: Company[] = [...visibleDomestic, ...investors]) {
	return sortedUnique(list.map((c) => categoryOf(c, lang)));
}

export function locationOptions(list: Company[] = [...visibleDomestic, ...investors]) {
	return sortedUnique(list.map((c) => c.city));
}

// Build the /firme URL for a search.
export function searchUrl(f: SearchFilters) {
	const params = new URLSearchParams();
	if (f.q.trim()) params.set('q', f.q.trim());
	if (f.cat) params.set('cat', f.cat);
	if (f.city) params.set('city', f.city);
	const qs = params.toString();
	return '/firme' + (qs ? '?' + qs : '');
}

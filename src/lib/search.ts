// Shared company search used by the homepage search panel and /kompanije.
// Only companies already shown on the site are searchable: the approved
// domestic firms (visibleFirmSlugs) and all investors/partners.
import { domesticFirms, investors, visibleFirmSlugs } from '$lib/data';
import type { Lang } from '$lib/i18n.svelte';
import { industries, industryById, industryOfCategory, locations, inLocation } from '$lib/taxonomy';

export type Company = (typeof domesticFirms)[number];
// cat: main industry id (see taxonomy.ts), or an original category name (subcategory links)
// loc: location id (country / Republika Srpska / Semberija); city: exact city (older links)
export type SearchFilters = { q: string; cat: string; city: string; loc?: string; sector?: string };

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

// Text search covers name, industry (main and original) and description (where products and services are described).
export function matches(c: Company, f: SearchFilters, lang: string) {
	const q = f.q.trim().toLowerCase();
	const main = industryOfCategory(c.category_sr)?.label[lang as Lang];
	const matchText =
		!q ||
		c.name.toLowerCase().includes(q) ||
		categoryOf(c, lang).toLowerCase().includes(q) ||
		(!!main && main.toLowerCase().includes(q)) ||
		descOf(c, lang).toLowerCase().includes(q);
	return matchText && matchesCategory(c, f.cat) && (!f.city || c.city === f.city) && (!f.loc || inLocation(c.city, f.loc)) && (!f.sector || inSector(c, f.sector));
}

export function matchesCategory(c: Company, cat: string) {
	if (!cat) return true;
	const ind = industryById(cat);
	return ind ? ind.cats.includes(c.category_sr) : c.category_sr === cat || c.category_en === cat;
}

export type FilterOption = { value: string; label: string; count: number; keywords?: string };

const allCompanies = () => [...visibleDomestic, ...investors];

// Main industries in their fixed order, only those with companies in `list`.
// `keywords` holds the original categories so the dropdown search also finds subcategories.
export function industryOptions(lang: string, list: Company[] = allCompanies()): FilterOption[] {
	return industries
		.map((ind) => {
			const members = list.filter((c) => ind.cats.includes(c.category_sr));
			const keywords = [...new Set(members.flatMap((c) => [c.category_sr, c.category_en]))].join(' ');
			return { value: ind.id, label: ind.label[lang as Lang], count: members.length, keywords };
		})
		.filter((o) => o.count > 0);
}

// Locations in their fixed order, only those with companies in `list`.
export function locationOptions(lang: string, list: Company[] = allCompanies()): FilterOption[] {
	return locations
		.map((loc) => ({ value: loc.id, label: loc.label[lang as Lang], count: list.filter((c) => inLocation(c.city, loc.id)).length }))
		.filter((o) => o.count > 0);
}

// Build the /kompanije URL for a search.
export function searchUrl(f: SearchFilters) {
	const params = new URLSearchParams();
	if (f.q.trim()) params.set('q', f.q.trim());
	if (f.cat) params.set('cat', f.cat);
	if (f.loc) params.set('loc', f.loc);
	if (f.city) params.set('city', f.city);
	const qs = params.toString();
	return '/kompanije' + (qs ? '?' + qs : '');
}

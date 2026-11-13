// Filter taxonomy for company search: 12 main industries and a country-based location list.
// Company records keep their original `category_sr`/`category_en` (shown as the subcategory)
// and their original `city` — these groups only map them for filtering.
import type { Lang } from '$lib/i18n.svelte';

type Label = Record<Lang, string>;

// ─── INDUSTRIES ───
// `cats` lists the original Serbian category names that belong to each main industry.
export const industries: { id: string; label: Label; cats: string[] }[] = [
	{
		id: 'poljoprivreda',
		label: { sr: 'Poljoprivreda i agrar', en: 'Agriculture & Agribusiness', it: 'Agricoltura e agroindustria', ru: 'Сельское хозяйство и агросектор', de: 'Landwirtschaft und Agrarwirtschaft' },
		cats: ['Poljoprivreda']
	},
	{
		id: 'prehrambena',
		label: { sr: 'Prehrambena industrija', en: 'Food Industry', it: 'Industria alimentare', ru: 'Пищевая промышленность', de: 'Lebensmittelindustrie' },
		cats: ['Prehrambena industrija', 'Hrana i piće']
	},
	{
		id: 'proizvodnja',
		label: { sr: 'Proizvodnja i industrija', en: 'Manufacturing & Industry', it: 'Produzione e industria', ru: 'Производство и промышленность', de: 'Produktion und Industrie' },
		cats: ['Industrija', 'Drvna industrija', 'Avio industrija', 'Automobilska industrija', 'Moda i tekstil']
	},
	{
		id: 'gradjevinarstvo',
		label: { sr: 'Građevinarstvo', en: 'Construction', it: 'Edilizia', ru: 'Строительство', de: 'Bauwesen' },
		cats: ['Građevina', 'Nekretnine']
	},
	{
		id: 'transport',
		label: { sr: 'Transport i logistika', en: 'Transport & Logistics', it: 'Trasporti e logistica', ru: 'Транспорт и логистика', de: 'Transport und Logistik' },
		cats: ['Transport i logistika']
	},
	{
		id: 'trgovina',
		label: { sr: 'Trgovina', en: 'Trade', it: 'Commercio', ru: 'Торговля', de: 'Handel' },
		cats: ['Maloprodaja']
	},
	{
		id: 'it',
		label: { sr: 'IT i tehnologija', en: 'IT & Technology', it: 'IT e tecnologia', ru: 'IT и технологии', de: 'IT und Technologie' },
		cats: ['IT i tehnologija']
	},
	{
		id: 'energetika',
		label: { sr: 'Energetika', en: 'Energy', it: 'Energia', ru: 'Энергетика', de: 'Energie' },
		cats: ['Energetika', 'Komunalne usluge']
	},
	{
		id: 'finansije-pravo',
		label: { sr: 'Finansije i pravo', en: 'Finance & Law', it: 'Finanza e diritto', ru: 'Финансы и право', de: 'Finanzen und Recht' },
		cats: ['Finansije', 'Pravne usluge']
	},
	{
		id: 'poslovne-usluge',
		label: { sr: 'Poslovne usluge', en: 'Business Services', it: 'Servizi alle imprese', ru: 'Деловые услуги', de: 'Unternehmensdienstleistungen' },
		cats: ['Poslovne usluge', 'Mediji', 'Mediji i eventi', 'Obrazovanje']
	},
	{
		id: 'turizam',
		label: { sr: 'Turizam i ugostiteljstvo', en: 'Tourism & Hospitality', it: 'Turismo e ospitalità', ru: 'Туризм и гостеприимство', de: 'Tourismus und Gastgewerbe' },
		cats: ['Ugostiteljstvo']
	},
	{
		id: 'zdravstvo',
		label: { sr: 'Zdravstvo i farmacija', en: 'Healthcare & Pharma', it: 'Sanità e farmaceutica', ru: 'Здравоохранение и фармацевтика', de: 'Gesundheit und Pharma' },
		cats: ['Zdravstvo', 'Farmaceutika']
	}
];

export const industryById = (id: string) => industries.find((i) => i.id === id);

// Main industry of an original category (Serbian name)
export function industryOfCategory(categorySr: string) {
	return industries.find((i) => i.cats.includes(categorySr));
}

// ─── LOCATIONS ───
type CountryId = 'ba' | 'rs' | 'me' | 'hr' | 'si' | 'mk' | 'it' | 'de' | 'at' | 'ch' | 'cz' | 'sk' | 'es' | 'bg';

// Full place data for every `city` value used in the company records (kept for future
// city/region filtering). `entity` is the BiH entity; `semberija` marks the local area.
type Place = { country: CountryId; region?: string; entity?: 'republika-srpska'; semberija?: boolean };

const places: Record<string, Place> = {
	// Bosna i Hercegovina — Republika Srpska, Semberija
	Bijeljina: { country: 'ba', entity: 'republika-srpska', region: 'Semberija', semberija: true },
	Janja: { country: 'ba', entity: 'republika-srpska', region: 'Semberija', semberija: true },
	Dvorovi: { country: 'ba', entity: 'republika-srpska', region: 'Semberija', semberija: true },
	// Srbija
	Beograd: { country: 'rs', region: 'Beograd' },
	Kragujevac: { country: 'rs', region: 'Šumadija' },
	Vranje: { country: 'rs', region: 'Pčinjski okrug' },
	Subotica: { country: 'rs', region: 'Vojvodina' },
	'Novi Sad': { country: 'rs', region: 'Vojvodina' },
	Ruma: { country: 'rs', region: 'Vojvodina' },
	'Pančevo': { country: 'rs', region: 'Vojvodina' },
	Kikinda: { country: 'rs', region: 'Vojvodina' },
	// Italija
	Milano: { country: 'it', region: 'Lombardia' },
	Bergamo: { country: 'it', region: 'Lombardia' },
	Brescia: { country: 'it', region: 'Lombardia' },
	Como: { country: 'it', region: 'Lombardia' },
	Cisliano: { country: 'it', region: 'Lombardia' },
	'Sesto San Giovanni': { country: 'it', region: 'Lombardia' },
	Lombardia: { country: 'it', region: 'Lombardia' },
	Torino: { country: 'it', region: 'Piemonte' },
	Roma: { country: 'it', region: 'Lazio' },
	Napoli: { country: 'it', region: 'Campania' },
	'Torre Annunziata': { country: 'it', region: 'Campania' },
	'Giugliano in Campania': { country: 'it', region: 'Campania' },
	Gragnano: { country: 'it', region: 'Campania' },
	Campania: { country: 'it', region: 'Campania' },
	'Sud Italia': { country: 'it' }
};

export const placeOf = (city: string): Place | undefined => places[city];

// Location filter options, in display order. Only options with matching companies are shown.
export const locations: { id: string; label: Label; match: (p: Place) => boolean }[] = [
	{
		id: 'semberija',
		label: { sr: 'Bijeljina i Semberija', en: 'Bijeljina & Semberija', it: 'Bijeljina e Semberija', ru: 'Биелина и Семберия', de: 'Bijeljina und Semberija' },
		match: (p) => !!p.semberija
	},
	{
		id: 'republika-srpska',
		label: { sr: 'Republika Srpska', en: 'Republika Srpska', it: 'Republika Srpska', ru: 'Республика Сербская', de: 'Republika Srpska' },
		match: (p) => p.entity === 'republika-srpska'
	},
	...(
		[
			['ba', { sr: 'Bosna i Hercegovina', en: 'Bosnia and Herzegovina', it: 'Bosnia ed Erzegovina', ru: 'Босния и Герцеговина', de: 'Bosnien und Herzegowina' }],
			['rs', { sr: 'Srbija', en: 'Serbia', it: 'Serbia', ru: 'Сербия', de: 'Serbien' }],
			['me', { sr: 'Crna Gora', en: 'Montenegro', it: 'Montenegro', ru: 'Черногория', de: 'Montenegro' }],
			['hr', { sr: 'Hrvatska', en: 'Croatia', it: 'Croazia', ru: 'Хорватия', de: 'Kroatien' }],
			['si', { sr: 'Slovenija', en: 'Slovenia', it: 'Slovenia', ru: 'Словения', de: 'Slowenien' }],
			['mk', { sr: 'Sjeverna Makedonija', en: 'North Macedonia', it: 'Macedonia del Nord', ru: 'Северная Македония', de: 'Nordmazedonien' }],
			['it', { sr: 'Italija', en: 'Italy', it: 'Italia', ru: 'Италия', de: 'Italien' }],
			['de', { sr: 'Njemačka', en: 'Germany', it: 'Germania', ru: 'Германия', de: 'Deutschland' }],
			['at', { sr: 'Austrija', en: 'Austria', it: 'Austria', ru: 'Австрия', de: 'Österreich' }],
			['ch', { sr: 'Švajcarska', en: 'Switzerland', it: 'Svizzera', ru: 'Швейцария', de: 'Schweiz' }],
			['cz', { sr: 'Češka', en: 'Czechia', it: 'Cechia', ru: 'Чехия', de: 'Tschechien' }],
			['sk', { sr: 'Slovačka', en: 'Slovakia', it: 'Slovacchia', ru: 'Словакия', de: 'Slowakei' }],
			['es', { sr: 'Španija', en: 'Spain', it: 'Spagna', ru: 'Испания', de: 'Spanien' }],
			['bg', { sr: 'Bugarska', en: 'Bulgaria', it: 'Bulgaria', ru: 'Болгария', de: 'Bulgarien' }]
		] as [CountryId, Label][]
	).map(([id, label]) => ({ id, label, match: (p: Place) => p.country === id }))
];

export const locationById = (id: string) => locations.find((l) => l.id === id);

export function inLocation(city: string, locationId: string) {
	const p = places[city];
	const loc = locationById(locationId);
	return !!p && !!loc && loc.match(p);
}

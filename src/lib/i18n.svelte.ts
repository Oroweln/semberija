export type Lang = 'sr' | 'en' | 'it' | 'ru' | 'de';

const sr = {
	nav: {
		home: 'Početna',
		companies: 'Kompanije',
		investments: 'Investicije',
		network: 'Mreža',
		diaspora: 'B2B',
		services: 'Digitalne usluge',
		news: 'Vijesti',
		events: 'Događaji',
		about: 'O nama',
		contact: 'Kontakt',
		businessNetwork: 'Poslovna mreža',
		listCta: 'Pridruži se platformi',
		explore: 'Istraži',
		business: 'Biznis',
		platform: 'Platforma',
		industries: 'Djelatnosti',
		directory: 'Poslovni direktorijum',
		search: 'Pretraga',
		b2b: 'B2B povezivanje',
		international: 'Međunarodna saradnja',
		enquiries: 'Poslovni upiti',
		promote: 'Promocija kompanija',
		opportunities: 'Poslovne prilike',
		platformOverview: 'Pregled platforme'
	},
	hero: {
		tag: 'Bijeljina · Semberija · Republika Srpska',
		headline: 'Semberija posluje. Mi povezujemo.',
		sub: 'Povezujemo kompanije, proizvođače, distributere, investitore i poslovne partnere kroz digitalnu platformu koja otvara nove mogućnosti za saradnju, investicije i međunarodni razvoj.',
		ctaNetwork: 'Istraži mrežu',
		ctaCompanies: 'Pronađi kompanije',
		ctaInvest: 'Investiraj u regiju',
		subheading: 'Regionalna poslovna platforma',
		ctaPlatform: 'Istraži platformu'
	},
	bizSearch: {
		heading: 'Otkrijte poslovne mogućnosti Bijeljine i Semberije',
		desc: 'Pronađite kompanije, proizvode, usluge, djelatnosti i potencijalne poslovne partnere na jednom mjestu.',
		placeholder: 'Pretražite kompanije, proizvode, usluge ili djelatnosti...',
		industry: 'Djelatnost',
		location: 'Lokacija',
		allIndustries: 'Sve djelatnosti',
		allLocations: 'Sve lokacije',
		cta: 'Pretraži kompanije',
		popular: 'Popularni sektori:'
	},
	ecosystem: {
		label: 'Sektori',
		heading: 'Poslovni ekosistem Bijeljine i Semberije',
		desc: 'Od poljoprivrede i proizvodnje do trgovine, logistike, tehnologije i profesionalnih usluga — istražite kompanije i sektore koji oblikuju privredu našeg kraja.',
		companies: 'Kompanije',
		explore: 'Istraži sektor',
		active: 'Sektor',
		clear: 'Ukloni filter',
		sectors: {
			'poljoprivreda-hrana': 'Poljoprivreda i prehrambena industrija',
			'proizvodnja': 'Proizvodnja i industrija',
			'gradjevina': 'Građevinarstvo i nekretnine',
			'trgovina': 'Trgovina i distribucija',
			'transport': 'Transport i logistika',
			'it': 'IT i digitalne usluge',
			'usluge': 'Profesionalne usluge',
			'turizam': 'Turizam i ugostiteljstvo'
		} as Record<string, string>
	},
	funding: {
		label: 'Platforma',
		heading: 'Fondovi i podsticaji',
		desc: 'Istražite javne pozive, bespovratna sredstva, subvencije, digitalne vaučere i programe podrške za kompanije i preduzetnike iz Bijeljine, Republike Srpske i Bosne i Hercegovine.',
		cta: 'Istraži podsticaje',
		formCta: 'Pošaljite upit',
		overviewHeading: 'Vrste finansiranja i podrške',
		instruments: [
			{ title: 'Javni pozivi', desc: 'Pozivi institucija i programa za dodjelu sredstava kompanijama, preduzetnicima i organizacijama.' },
			{ title: 'Bespovratna sredstva', desc: 'Finansijska podrška koja se ne vraća, uz ispunjavanje uslova i namjensko korištenje sredstava.' },
			{ title: 'Subvencije', desc: 'Podsticaji za zapošljavanje, proizvodnju, poljoprivredu, izvoz ili investicije, prema važećim programima.' },
			{ title: 'Digitalni vaučeri', desc: 'Potencijalni instrument za sufinansiranje digitalizacije. Dostupnost zavisi od aktuelnih poziva i uslova.' },
			{ title: 'Programi podrške', desc: 'Savjetodavna, obrazovna i razvojna podrška za mala i srednja preduzeća i preduzetnike.' }
		],
		statusHeading: 'Trenutno stanje',
		statusDesc: 'Na platformi trenutno ne objavljujemo pojedinačne pozive. Kada budu dodati, svaki će sadržati zvanični izvor, uslove za učešće, rok i datum posljednje provjere.',
		disclaimerHeading: 'Važno',
		disclaimer: 'Semberija.app i ZOE MILANO nisu institucija koja dodjeljuje sredstva i ne garantuju odobrenje. Uslove i rokove uvijek provjerite kod zvaničnog izvora poziva.',
		zoeHeading: 'Digitalizacija uz ZOE MILANO',
		zoeDesc: 'Za projekte digitalizacije koji ispunjavaju uslove poziva, ZOE MILANO može pružiti relevantne usluge digitalnog razvoja — web, aplikacije, automatizaciju i sisteme.',
		zoeCta: 'Digitalne usluge',
		premiumTag: 'Premium · BandiHub',
		premiumNote: 'Detaljne informacije o fondovima, javnim pozivima i digitalnim vaučerima biće dostupne Premium članovima, uz mogućnost pristupa putem mobilne aplikacije.',
		soon: 'U pripremi',
		formHeading: 'Upit za finansiranje',
		formSub: 'Opišite kompaniju i projekat, a mi ćemo vam se javiti sa informacijama o mogućim izvorima podrške.',
		prefill: 'Zainteresovan/a sam za mogućnosti finansiranja i podsticaja za: '
	},
	premium: {
		label: 'Članstvo',
		heading: 'Otkrijte Premium pogodnosti',
		desc: 'Registracija je dovoljna za korištenje platforme. Premium članstvo donosi dodatne pogodnosti — bez obaveze.',
		items: [
			{ title: 'BandiHub', desc: 'Detaljne informacije o fondovima, javnim pozivima i digitalnim vaučerima.' },
			{ title: 'Napredne funkcije', desc: 'Prošireni pristup informacijama i alatima platforme.' },
			{ title: 'Mobilna aplikacija', desc: 'Pristup Premium sadržaju putem planirane mobilne aplikacije.' }
		],
		optional: 'Premium nije uslov za registraciju.',
		more: 'Saznaj više'
	},
	platform: {
		label: 'Platforma',
		heading: 'Jedna platforma. Više poslovnih mogućnosti.',
		desc: 'Semberija.app povezuje kompanije iz Bijeljine i Semberije sa poslovnim partnerima, investitorima i međunarodnim tržištima kroz jedinstven digitalni ekosistem.',
		more: 'Saznaj više o platformi',
		statusDev: 'U razvoju',
		statusSoon: 'Uskoro',
		modulesHeading: 'Poslovni moduli platforme',
		modules: [
			{ title: 'Poslovni direktorijum', desc: 'Predstavite kompaniju, proizvode i usluge potencijalnim partnerima.', detail: 'Profil kompanije u direktorijumu prikazuje djelatnost, lokaciju i ponudu, a kompanije se mogu pretraživati po nazivu, djelatnosti i lokaciji.', cta: 'Pregledaj kompanije' },
			{ title: 'B2B povezivanje', desc: 'Pronađite dobavljače, proizvođače, distributere i poslovne partnere.', detail: 'Opišite koga tražite — partnera, distributera, dobavljača ili investitora — i mi pomažemo da se povežete sa odgovarajućim kompanijama.', cta: 'Pronađi partnera' },
			{ title: 'Investicije', desc: 'Istražite investicione mogućnosti i razvojni potencijal regije.', detail: 'Pregled investicionih oblasti i projekata u Bijeljini i Semberiji, od poljoprivrede i proizvodnje do energetike i nekretnina.', cta: 'Istraži investicije' },
			{ title: 'Fondovi i podsticaji', desc: 'Istražite javne pozive, bespovratna sredstva, subvencije, digitalne vaučere i programe podrške za kompanije i preduzetnike iz Bijeljine, Republike Srpske i Bosne i Hercegovine.', detail: 'Pregled vrsta javnog finansiranja i programa podrške, uz mogućnost da nam pošaljete upit za vašu kompaniju. Odvojeno od privatnih investicionih prilika.', cta: 'Istraži podsticaje' },
			{ title: 'Međunarodna saradnja', desc: 'Povežite se sa poslovnim tržištima Srbije, Italije i šire.', detail: 'Mreža partnera i dijaspore otvara put ka tržištima Srbije, Italije i drugih zemalja, uz podršku pri prvom kontaktu.', cta: 'Zatraži povezivanje' },
			{ title: 'Poslovni upiti', desc: 'Predstavite ponudu ili potražnju i zatražite poslovno povezivanje.', detail: 'Objavite šta nudite ili tražite — saradnju, distribuciju, investiciju ili uslugu — i pregledajte upite drugih kompanija.', cta: 'Pošalji poslovni upit' },
			{ title: 'Promocija kompanija', desc: 'Povećajte vidljivost kroz istaknute profile i promotivne pozicije.', detail: 'Istaknuti profili i promotivne pozicije na platformi pomažu da vaša kompanija bude prva koju partneri vide.', cta: 'Promoviši kompaniju' },
			{ title: 'Digitalne usluge', desc: 'Web razvoj, aplikacije, brendiranje, marketing i poslovna rješenja.', detail: 'Tim za digitalne usluge pomaže kompanijama da unaprijede online prisustvo, prodaju i poslovne procese.', cta: 'Pogledaj usluge' },
			{ title: 'Mobilna aplikacija', desc: 'Digitalna poslovna platforma u razvoju za mobilne uređaje.', detail: 'Mobilna verzija platforme je u razvoju. Prijavite se za rani pristup i budite među prvima koji će je koristiti.', cta: 'Zatraži rani pristup' }
		],
		benefitsLabel: 'Prednosti registracije',
		benefitsHeading: 'Zašto registrovati kompaniju?',
		benefitsDesc: 'Registracija na Semberija.app otvara vrata novim poslovnim kontaktima, partnerstvima i tržištima.',
		benefits: [
			{ title: 'Profil kompanije', desc: 'Predstavite djelatnost, proizvode i usluge na jednom mjestu.' },
			{ title: 'Vidljivost za partnere', desc: 'Budite pronađeni od strane domaćih i međunarodnih kompanija.' },
			{ title: 'Pristup investitorima', desc: 'Predstavite razvojne projekte i potrebe za ulaganjem.' },
			{ title: 'Poslovni upiti', desc: 'Šaljite i primajte ponude i zahtjeve za saradnju.' },
			{ title: 'Međunarodna mreža', desc: 'Povežite se sa tržištima Srbije, Italije i dijasporom.' },
			{ title: 'Digitalna podrška', desc: 'Koristite digitalne usluge za rast i bolju vidljivost.' }
		],
		joinHeading: 'Spremni za nove poslovne prilike?',
		joinDesc: 'Pridružite se platformi i predstavite svoju kompaniju partnerima u regiji i svijetu.'
	},
	joinCta: {
		heading: 'Vaša kompanija zaslužuje veću vidljivost.',
		desc: 'Predstavite svoje poslovanje, pronađite nove partnere i otvorite vrata regionalnoj i međunarodnoj saradnji.',
		benefits: ['Predstavite kompaniju', 'Pronađite poslovne partnere', 'Otkrijte nove mogućnosti', 'Proširite poslovanje na nova tržišta'],
		promote: 'Promoviši kompaniju'
	},
	howItWorks: {
		label: 'Kako funkcioniše',
		heading: 'Od predstavljanja do poslovne saradnje.',
		online: 'Dostupno online',
		manual: 'Putem upita',
		note: 'Koraci označeni sa „Putem upita“ trenutno se obavljaju uz podršku našeg tima — pošaljete nam podatke ili upit, a mi vas vodimo dalje.',
		steps: [
			{ title: 'Registrujte kompaniju', desc: 'Pošaljite osnovne podatke o kompaniji putem kontakt forme. Profil trenutno kreira naš tim — samostalna registracija je u pripremi.', link: 'Pošalji podatke' },
			{ title: 'Predstavite proizvode, usluge i poslovne potrebe', desc: 'Navedite šta nudite i šta tražite. Na osnovu vaših podataka uređujemo profil kompanije u poslovnom direktorijumu.', link: '' },
			{ title: 'Pronađite potencijalne partnere', desc: 'Pretražite kompanije po nazivu, djelatnosti i lokaciji ili pregledajte sektore i investitore.', link: 'Pretraži kompanije' },
			{ title: 'Započnite poslovnu saradnju', desc: 'Pošaljite poslovni upit ili zatražite povezivanje — naš tim posreduje u prvom kontaktu sa kompanijom.', link: 'Pošalji poslovni upit' }
		]
	},
	regions: {
		label: 'Regionalne platforme',
		heading: 'Povezujemo regije. Otvaramo nova tržišta.',
		desc: 'Semberija.app dio je šire vizije kompanije ZOE MILANO, koja kroz razvoj regionalnih digitalnih platformi povezuje kompanije, tržišta i međunarodne poslovne mogućnosti.',
		cta: 'Posjeti platformu',
		attribution: 'Digitalne platforme razvija ZOE MILANO.',
		prev: 'Prethodna platforma',
		next: 'Sljedeća platforma',
		newTab: '(otvara se u novom prozoru)',
		slide: 'Platforma',
		items: {
			lombardia: 'Digitalna poslovna platforma za kompanije, investicije i međunarodnu saradnju u Lombardiji.',
			veneto: 'Regionalna digitalna platforma za poslovno povezivanje i razvoj u italijanskoj regiji Veneto.',
			ibiza: 'Digitalna platforma za Ibizu koja povezuje lokalne kompanije, usluge i poslovne prilike na ostrvu.',
			liguria: 'Regionalna digitalna platforma za kompanije, turizam i poslovnu saradnju u Liguriji.',
			montalcino: 'Digitalna platforma za Montalcino i Toskanu — vinarstvo, lokalna proizvodnja i poslovne veze.',
			sannio: 'Regionalna platforma za Sannio u Kampaniji, posvećena lokalnim kompanijama i razvoju područja.',
			fvgitalia: 'Digitalna poslovna platforma za regiju Friuli Venezia Giulia i njene kompanije, tržišta i partnerstva.'
		} as Record<string, string>
	},
	aboutPage: {
		label: 'O nama',
		heading: 'Semberija.app — Iz Bijeljine prema svijetu.',
		intro: [
			'Semberija.app je regionalna digitalna poslovna platforma posvećena povezivanju kompanija, preduzetnika, investitora i poslovnih partnera iz Bijeljine i Semberije sa regionalnim i međunarodnim tržištima.',
			'Platforma je nastala iz lične povezanosti sa Bijeljinom i uvjerenja da njen privredni potencijal zaslužuje veću vidljivost.'
		],
		platform: {
			label: 'O platformi',
			heading: 'Više od poslovnog direktorijuma',
			body: [
				'Semberija.app razvija digitalni ekosistem za predstavljanje kompanija, poslovno povezivanje, investicije i međunarodnu saradnju.',
				'Cilj je da lokalnim preduzećima omogućimo bolju digitalnu vidljivost i lakši pristup novim poslovnim kontaktima i tržištima.'
			]
		},
		vision: {
			label: 'Naša vizija',
			heading: 'Lokalni potencijal. Međunarodne mogućnosti.',
			body: [
				'Bijeljina i Semberija imaju snažnu tradiciju poljoprivrede, proizvodnje, trgovine i preduzetništva.',
				'Vjerujemo da kvalitetni proizvodi, znanje i poslovni kapaciteti ovog kraja mogu pronaći svoje mjesto i na širem međunarodnom tržištu.',
				'Naša vizija je da kroz savremenu tehnologiju, profesionalnu promociju i poslovno povezivanje doprinesemo većoj vidljivosti i razvoju regionalne privrede.'
			]
		},
		offer: {
			label: 'Platforma',
			heading: 'Šta omogućava Semberija.app',
			items: [
				'Predstavljanje kompanija i usluga',
				'Poslovno i B2B povezivanje',
				'Investicione mogućnosti',
				'Međunarodna saradnja',
				'Digitalna promocija i razvoj'
			],
			closing: 'Semberija.app razvija se kao dugoročna digitalna infrastruktura za povezivanje kompanija, tržišta i poslovnih mogućnosti.'
		},
		founder: {
			label: 'O osnivaču',
			name: 'Zorana Petrović',
			role: 'Osnivač Semberija.app | Founder & CEO, ZOE MILANO d.o.o.',
			places: 'Beograd · Milano · Bijeljina',
			body: [
				'Semberija.app nastala je na inicijativu Zorane Petrović, preduzetnice i kreativne strateginje, osnivača i direktora kompanije ZOE MILANO.',
				'Odrastala je i školovala se u Milanu, a njeno profesionalno iskustvo obuhvata kreativni razvoj, digitalne platforme, marketing i međunarodne projekte.',
				'Sa Bijeljinom je povezuju porodični korijeni. Njena majka, prof. Zorica Petrović, rođena je u Bijeljini, kao i drugi članovi njene porodice. Porodično nasljeđe uključuje i baku, odlikovanu za hrabrost tokom Drugog svjetskog rata.',
				'Zorana godinama dolazi u Bijeljinu i kroz lično iskustvo prepoznaje potencijal lokalne proizvodnje, preduzetništva i poslovnog razvoja.',
				'Upravo iz te povezanosti nastala je ideja da se međunarodno iskustvo, digitalna tehnologija i savremeni marketing iskoriste za bolju promociju Bijeljine i njene privrede.'
			],
			quoteLabel: 'Vizija osnivača',
			quote: '„Bijeljina je grad sa kojim me povezuju porodični korijeni i kojem se godinama vraćam. Vjerujem da kompanije, proizvodi i ljudi ovog kraja zaslužuju veću međunarodnu vidljivost. Semberija.app je nastala sa željom da poveže taj potencijal sa novim tržištima i poslovnim mogućnostima.“',
			quoteRole: 'Osnivač, Semberija.app'
		},
		zoe: {
			label: 'ZOE MILANO',
			heading: 'Ideja, kreativnost i tehnologija',
			body: [
				'Semberija.app je projekat kompanije ZOE MILANO d.o.o. iz Beograda, koja razvija digitalne platforme, mobilne aplikacije, B2B ekosisteme i međunarodne poslovne projekte.',
				'Kompanija povezuje kreativnu strategiju, tehnologiju, digitalni marketing i poslovni razvoj, sa ciljem stvaranja savremenih digitalnih rješenja za kompanije i tržišta.'
			],
			credits: [
				{
					label: 'Ideja i osnivač',
					value: 'Zorana Petrović'
				},
				{
					label: 'Razvoj platforme',
					value: 'ZOE MILANO d.o.o.'
				}
			],
			cta: 'Posjetite ZOE MILANO'
		},
		future: {
			label: 'Naša budućnost',
			heading: 'Iz Bijeljine prema novim tržištima',
			body: [
				'Semberija.app nastala je sa ciljem da poveže lokalni poslovni potencijal sa regionalnim i međunarodnim mogućnostima.',
				'Želimo da kompanijama iz Bijeljine i Semberije pružimo prostor za profesionalno predstavljanje, promociju i uspostavljanje novih poslovnih kontakata.'
			],
			closing: 'Ovo je tek početak.'
		},
		cta: {
			heading: 'Budite dio poslovne budućnosti Bijeljine.',
			desc: 'Predstavite svoju kompaniju, povežite se sa potencijalnim partnerima i istražite nove mogućnosti za razvoj.',
			contact: 'Kontaktiraj nas'
		}
	},
	enquiry: {
		typeLabel: 'Vrsta upita',
		types: {
			registracija: 'Registracija kompanije',
			preuzimanje: 'Preuzimanje profila kompanije',
			b2b: 'B2B povezivanje',
			oglasavanje: 'Oglašavanje i promocija',
			medjunarodna: 'Međunarodna saradnja',
			usluge: 'Digitalne usluge',
			ostalo: 'Ostalo'
		},
		hints: {
			registracija: 'Pošaljite podatke o kompaniji — naš tim priprema profil u poslovnom direktorijumu.',
			preuzimanje: 'Vaša kompanija je već na listi? Zatražite preuzimanje profila kako biste potvrdili i dopunili podatke.',
			b2b: 'Opišite kakvog partnera tražite — dobavljača, distributera, proizvođača ili investitora.',
			oglasavanje: 'Zatražite ponudu za istaknuti profil, banner oglase ili druge promotivne pozicije.',
			medjunarodna: 'Recite nam koja tržišta vas zanimaju — Srbija, Italija ili šire.',
			usluge: 'Web razvoj, aplikacije, brendiranje i marketing — opišite svoju potrebu.',
			ostalo: 'Pošaljite nam poruku i javićemo vam se.'
		},
		companySection: 'Podaci o kompaniji',
		contactSection: 'Kontakt podaci',
		industry: 'Djelatnost',
		industryPlaceholder: 'Izaberite djelatnost',
		industryOther: 'Druga djelatnost',
		location: 'Lokacija',
		locationPlaceholder: 'npr. Bijeljina',
		website: 'Web stranica',
		phone: 'Telefon',
		products: 'Proizvodi i usluge',
		productsPlaceholder: 'Šta vaša kompanija proizvodi ili nudi?',
		offers: 'Poslovna ponuda',
		offersPlaceholder: 'Šta nudite partnerima — kapacitete, saradnju, distribuciju...',
		interests: 'Partnerski interesi',
		interestsPlaceholder: 'Kakve partnere ili saradnju tražite?',
		markets: 'Ciljna tržišta',
		marketsPlaceholder: 'npr. Srbija, Italija, EU',
		role: 'Vaša funkcija u kompaniji',
		rolePlaceholder: 'npr. direktor, vlasnik',
		optional: 'neobavezno'
	},
	listing: {
		public: 'Javno dostupni podaci',
		verified: 'Verifikovan član',
		publicHint: 'Podaci su prikupljeni iz javno dostupnih izvora.',
		verifiedHint: 'Kompanija je registrovana i potvrdila podatke.',
		claim: 'Vaša kompanija? Preuzmite profil',
		inquire: 'Pošalji upit'
	},
	advertising: {
		title: 'Oglasi',
		formatsHeading: 'Oglasni formati',
		options: [
			{ title: 'Slider na početnoj', desc: 'Vaš vizual i poruka na vrhu početne stranice — vidljivo svim posjetiocima odmah pri dolasku.' },
			{ title: 'Istaknuti profil', desc: 'Vaša firma prioritetno prikazana u pretragama, kategorijama i preporukama platforme.' },
			{ title: 'Banner oglasi', desc: 'Statični ili animirani baneri na ključnim mjestima platforme sa visokom vidljivošću.' },
			{ title: 'Sponzorisana kategorija', desc: 'Brendirajte čitavu kategoriju i budite dominantni izbor za klijente u tom sektoru.' }
		],
		audienceHeading: 'Dosegnite pravu poslovnu publiku',
		audienceDesc: 'Semberija.app je platforma koju koriste vlasnici firmi, menadžeri i donosioci odluka u regionu. Vaše oglašavanje dostiže upravo tu publiku — lokalno, precizno, poslovno.',
		benefits: ['Ciljana B2B publika', 'Profesionalni kontekst', 'Regionalna prepoznatljivost', 'Fleksibilni formati i pozicije']
	},
	promo: {
		label: 'Promocija',
		heading: 'Promovišite svoju kompaniju na Semberija.app',
		desc: 'Povećajte vidljivost svog poslovanja kroz istaknute profile, digitalno oglašavanje i promotivne mogućnosti.',
		cta: 'Zatraži ponudu'
	},
	seo: {
		homeTitle: 'Semberija.app | Poslovna platforma Bijeljine i Semberije',
		homeDesc: 'Otkrijte kompanije, poslovne partnere, investicije i mogućnosti saradnje u Bijeljini i Semberiji. Regionalna digitalna B2B platforma.',
		aboutTitle: 'O nama | Semberija.app — Vizija i osnivač',
		platformTitle: 'Platforma | Semberija.app — Poslovno povezivanje i investicije'
	},
	legal: {
		statement: 'Semberija.app je nezavisna privatna digitalna poslovna platforma koju razvija ZOE MILANO d.o.o. Nije zvanični portal Grada Bijeljina niti organa javne vlasti.',
		copyright: '© 2026 Semberija.app — Razvija i upravlja ZOE MILANO d.o.o.',
		langNotice: 'Pravni dokumenti su trenutno dostupni na engleskom jeziku. Prevod na srpski je u pripremi.',
		privacy: 'Privatnost',
		terms: 'Uslovi korišćenja',
		cookies: 'Kolačići',
		gdpr: 'GDPR',
		disclaimer: 'Odricanje odgovornosti'
	},
	networking: {
		heading: 'B2B umrežavanje',
		sub: 'Povežite se sa partnerima, investitorima i saradnicima u regionu.',
		types: ['Svi', 'Partnerstvo', 'Investicija', 'Saradnja'],
		contact: 'Kontaktiraj',
		proposalHeading: 'Imate poslovni prijedlog?',
		proposalDesc: 'Objavite vašu poslovnu ideju ili potrebu i povežite se sa pravim partnerima.',
		kindsHeading: 'Šta možete objaviti'
	},
	opportunities: {
		sub: 'Investicije, partnerstva i saradnje iz Bijeljine i Semberije na jednom mjestu.',
		kindsHeading: 'Vrste prilika',
		kinds: [
			{ title: 'Investicija', desc: 'Projekti kojima je potreban kapital — od proizvodnje i poljoprivrede do nekretnina i energetike.' },
			{ title: 'Partnerstvo', desc: 'Prilike za zajedničke projekte, distribuciju i ulazak na nova tržišta.' },
			{ title: 'Saradnja', desc: 'Dugoročna poslovna saradnja, usluge i outsourcing između kompanija.' }
		],
		postLabel: 'Objavi svoju',
		postHeading: 'Imate poslovnu priliku ili ideju?',
		postDesc: 'Objavite investiciju, partnerstvo ili saradnju i povežite se sa pravim partnerima kroz mrežu Semberija.app.',
		interested: 'Zainteresovan/a sam'
	},
	board: {
		enqTitle: 'Još nema objavljenih poslovnih upita',
		enqDesc: 'Budite prvi: pošaljite ponudu ili potražnju i naš tim će je objaviti i povezati vas sa zainteresovanim kompanijama.',
		oppTitle: 'Prve poslovne prilike su u pripremi',
		oppDesc: 'Imate investicioni projekat, ponudu za partnerstvo ili saradnju? Pošaljite nam detalje i predstavićemo ga na platformi.',
		submit: 'Pošalji poslovni upit',
		submitOpp: 'Predstavi priliku'
	},
	formStatus: {
		notConfigured: 'Slanje putem forme trenutno nije dostupno. Molimo pošaljite nam poruku direktno na email:',
		sendFailed: 'Poruka nije poslata zbog tehničke greške. Molimo pokušajte ponovo ili nam pišite direktno na email:',
		invalid: 'Provjerite ime, email adresu i poruku pa pokušajte ponovo.',
		sending: 'Slanje...'
	},
	stats: [
		{ value: '', label: 'Kompanija u direktorijumu' },
		{ value: '', label: 'Poslovnih sektora' },
		{ value: '', label: 'Investicionih oblasti' },
		{ value: 'EU', label: 'Izvozna tržišta' }
	],
	why: {
		label: 'Prednosti',
		heading: 'Zašto Bijeljina i Semberija?',
		sub: 'Bijeljina i Semberija predstavljaju prostor snažne privredne tradicije, proizvodnje, preduzetništva i novih mogućnosti za poslovni razvoj.',
		items: [
			{
				icon: 'location',
				title: 'Strateška lokacija',
				desc: 'Regija pozicionirana između ključnih balkanskih tržišta i evropskih poslovnih ruta.'
			},
			{
				icon: 'growth',
				title: 'Poslovni razvoj',
				desc: 'Rastuće okruženje za proizvodnju, logistiku, usluge i preduzetništvo.'
			},
			{
				icon: 'agriculture',
				title: 'Poljoprivreda i proizvodnja',
				desc: 'Snažan regionalni potencijal u poljoprivredi, prehrambenoj industriji i preradi.'
			},
			{
				icon: 'diaspora',
				title: 'Povezivanje sa dijasporom',
				desc: 'Povezujemo globalnu dijasporu sa lokalnim kompanijama, kapitalom i prilikama.'
			},
			{
				icon: 'digital',
				title: 'Digitalni razvoj',
				desc: 'Podrška tehnologiji, digitalnim uslugama i modernoj poslovnoj transformaciji.'
			}
		]
	},
	network: {
		label: 'Ekosistem',
		heading: 'Poslovna mreža regije',
		sub: 'Mjesto gdje se kompanije, investitori, dijaspora i partneri susreću, sarađuju i rastu.',
		items: [
			{ title: 'Partnerstva', desc: 'Povezujemo kompanije sa novim poslovnim partnerima i prilikama za saradnju.' },
			{ title: 'Distributeri', desc: 'Pomažemo biznisima da pronađu regionalne i međunarodne distributivne partnere.' },
			{ title: 'Investicije', desc: 'Predstavljamo investicione projekte, poslovne ideje i razvojni potencijal.' },
			{ title: 'B2B veze', desc: 'Direktno povezivanje između kompanija, usluga, dobavljača i tržišta.' }
		]
	},
	investments: {
		label: 'Investicije',
		heading: 'Investiraj u Semberiju',
		sub: 'Istražite regionalni poslovni potencijal u logistici, poljoprivredi, proizvodnji, nekretninama i digitalnim uslugama.',
		cta: 'Istražite investicije',
		categories: [
			{
				name: 'Logistika',
				desc: 'Regija je logistički čvor između Beograda, Sarajeva i Zagreba, sa pristupom koridoru Vc i rijeci Savi.',
				highlights: ['Pristup koridoru Vc i riječnoj luci', 'Rastuća potražnja za skladišnim i distributivnim centrima', 'Kvalifikovana radna snaga za transport i logistiku']
			},
			{
				name: 'Poljoprivreda',
				desc: 'Semberija je jedna od najplodnijih poljoprivrednih regija u BiH, poznata po žitaricama, povrću i voćarstvu.',
				highlights: ['Preko 40.000 ha obradivog zemljišta', 'Tradicija u ratarstvu, povrtlarstvu i stočarstvu', 'Blizina prerađivačke industrije i izvoznih tržišta']
			},
			{
				name: 'Proizvodnja',
				desc: 'Industrijska tradicija i dostupna radna snaga čine regiju atraktivnom za proizvodne pogone i prerađivačku industriju.',
				highlights: ['Niži troškovi radne snage u odnosu na EU', 'Razvijena industrijska infrastruktura', 'Podsticaji za nova proizvodna postrojenja']
			},
			{
				name: 'Skladišta',
				desc: 'Strateška pozicija na raskrsnici regionalnih puteva čini Semberiju idealnom lokacijom za skladišne i distributivne centre.',
				highlights: ['Blizina glavnih transportnih pravaca', 'Dostupno zemljište za izgradnju skladišnih kapaciteta', 'Rastuća potreba za distribucijom u regionu']
			},
			{
				name: 'Nekretnine',
				desc: 'Tržište nekretnina u razvoju, sa prilikama u stambenoj, poslovnoj i industrijskoj gradnji.',
				highlights: ['Pristupačne cijene zemljišta u odnosu na region', 'Rastuća potražnja za poslovnim prostorom', 'Prilike u stambenoj i turističkoj izgradnji']
			},
			{
				name: 'Solarna energija',
				desc: 'Povoljni klimatski uslovi i neiskorišteno zemljište otvaraju prostor za investicije u solarne elektrane.',
				highlights: ['Visok broj sunčanih dana godišnje', 'Dostupno zemljište za solarne parkove', 'Podsticaji za obnovljive izvore energije']
			},
			{
				name: 'Outsourcing',
				desc: 'Konkurentni troškovi poslovanja i obrazovana radna snaga čine regiju privlačnom za autsorsing centre.',
				highlights: ['Konkurentni troškovi u odnosu na EU', 'Rastuća baza obrazovane radne snage', 'Vremenska zona pogodna za saradnju sa Evropom']
			},
			{
				name: 'Digitalne usluge',
				desc: 'Rastući digitalni sektor sa potencijalom za IT kompanije, startupe i pružaoce digitalnih usluga.',
				highlights: ['Sve veći broj IT stručnjaka u regiji', 'Niži operativni troškovi u odnosu na zapadnu Evropu', 'Podrška lokalnoj digitalnoj transformaciji']
			}
		],
		detailTag: 'Investiciona prilika',
		detailHighlights: 'Ključne prednosti',
		detailBack: 'Sve investicione kategorije',
		detailInquireHeading: 'Pošaljite upit',
		detailInquireSub: 'Ispunite formular ispod i naš tim će vas kontaktirati u vezi sa ovom investicionom prilikom.',
		detailPrefill: 'Zainteresovan/a sam za investicionu priliku: '
	},
	b2b: {
		label: 'B2B Matchmaking',
		heading: 'Pronađite pravog poslovnog partnera',
		sub: 'Naša usluga poslovnog povezivanja spaja kompanije iz Semberije sa partnerima, dobavljačima, distributerima i investitorima — u regiji i dijaspori.',
		cta: 'Zatražite povezivanje',
		items: [
			{
				title: 'Pronađite partnera',
				desc: 'Tražite strateškog poslovnog partnera za zajednički projekat, širenje ili novo tržište? Povezujemo vas sa odgovarajućim kompanijama iz regije.',
				highlights: ['Poslovni partneri iz Bijeljine i Semberije', 'Podrška u pregovorima i uspostavljanju saradnje', 'Fokus na dugoročna partnerstva']
			},
			{
				title: 'Pronađite distributera',
				desc: 'Pomažemo proizvođačima i brendovima da pronađu pouzdane distributere za nova tržišta u regiji i inostranstvu.',
				highlights: ['Mreža distributera u regiji i dijaspori', 'Podrška pri izlasku na nova tržišta', 'Provjera pouzdanosti potencijalnih partnera']
			},
			{
				title: 'Pronađite dobavljača',
				desc: 'Povezujemo kompanije sa pouzdanim dobavljačima sirovina, materijala i usluga u Semberiji i regionu.',
				highlights: ['Pristup bazi dobavljača iz regije', 'Poređenje ponuda i uslova', 'Podrška u pregovaranju cijena i rokova']
			},
			{
				title: 'Pronađite investitora',
				desc: 'Predstavljamo vaš poslovni projekat investitorima iz regije i dijaspore koji traže prilike za ulaganje.',
				highlights: ['Direktan pristup zainteresovanim investitorima', 'Pomoć u pripremi investicione prezentacije', 'Diskretnost i profesionalna podrška']
			},
			{
				title: 'Dijaspora mreža',
				desc: 'Povezujemo domaće kompanije sa preduzetnicima iz dijaspore radi saradnje, izvoza i zajedničkih poslovnih prilika.',
				highlights: ['Pristup mreži poslovnih ljudi iz dijaspore', 'Prilike za izvoz i međunarodnu saradnju', 'Podrška u komunikaciji i organizaciji sastanaka']
			}
		],
		detailTag: 'Matchmaking usluga',
		detailHighlights: 'Kako vam pomažemo',
		detailBack: 'Sve matchmaking usluge',
		detailInquireHeading: 'Zatražite povezivanje',
		detailInquireSub: 'Opišite šta tražite i naš tim će vam pronaći odgovarajuće poslovne kontakte.',
		detailPrefill: 'Zainteresovan/a sam za: ',
		processHeading: 'Kako izgleda povezivanje',
		privacyNote: 'Vaši podaci koriste se samo za odgovor na ovaj upit.',
		process: [
			{ title: 'Pošaljite upit', desc: 'Opišite šta tražite: vrstu partnera, tržište i obim saradnje.' },
			{ title: 'Biramo odgovarajuće kontakte', desc: 'Naš tim pregleda upit i bira kompanije iz regije i dijaspore koje odgovaraju vašim potrebama.' },
			{ title: 'Povezujemo vas', desc: 'Posredujemo u prvom kontaktu i pomažemo da saradnja krene u pravom smjeru.' }
		]
	},
	services: {
		label: 'Digitalne usluge',
		heading: 'Digitalna rješenja za moderno poslovanje',
		sub: 'Pomažemo kompanijama da rastu kroz moderne digitalne alate, brendiranje, automatizaciju i online vidljivost.',
		cta: 'Pogledaj usluge',
		items: [
			{
				title: 'Web razvoj',
				desc: 'Moderne web stranice, platforme i poslovni sistemi.',
				highlights: ['Responzivan dizajn prilagođen svim uređajima', 'Brzo učitavanje i optimizovana izrada', 'Skalabilna rješenja za rast poslovanja']
			},
			{
				title: 'SEO & Marketing',
				desc: 'Digitalna vidljivost, rast i online pozicioniranje.',
				highlights: ['Optimizacija za pretraživače (SEO)', 'Ciljane digitalne kampanje', 'Praćenje i analiza rezultata']
			},
			{
				title: 'AI automatizacija',
				desc: 'Pametna rješenja za automatizaciju poslovnih procesa.',
				highlights: ['Automatizacija ponavljajućih zadataka', 'Chatbotovi i AI podrška korisnicima', 'Integracija sa postojećim sistemima']
			},
			{
				title: 'Brendiranje & dizajn',
				desc: 'Premium vizualni identitet i digitalna prezentacija.',
				highlights: ['Kompletan vizuelni identitet i logo', 'Konzistentan brend na svim kanalima', 'Prezentacije i marketinški materijali']
			},
			{
				title: 'CRM & sistemi',
				desc: 'Alati za bolje prodaje, komunikaciju i poslovnu organizaciju.',
				highlights: ['Centralizovano upravljanje klijentima', 'Automatizacija prodajnog procesa', 'Bolja interna komunikacija i organizacija']
			},
			{
				title: 'Konsalting',
				desc: 'Strateško savjetovanje za digitalnu transformaciju i rast.',
				highlights: ['Analiza trenutnog poslovanja i procesa', 'Strateški plan digitalne transformacije', 'Podrška u implementaciji i praćenju rezultata']
			}
		],
		detailTag: 'Digitalna usluga',
		detailHighlights: 'Šta dobijate',
		detailBack: 'Sve digitalne usluge',
		detailInquireHeading: 'Zatražite ponudu',
		detailInquireSub: 'Ispunite formular ispod i naš tim će vas kontaktirati sa ponudom za ovu uslugu.',
		detailPrefill: 'Zainteresovan/a sam za uslugu: '
	},
	news: {
		label: 'Vijesti',
		heading: 'Poslovne & regionalne vijesti',
		sub: 'Fokusirani isključivo na biznis, ekonomiju, investicije, tehnologiju, dijasporu i regionalni razvoj.',
		categories: ['Biznis', 'Investicije', 'Tehnologija', 'Dijaspora', 'Logistika', 'Poljoprivreda', 'Nekretnine', 'Startup scena']
	},
	events: {
		label: 'Događaji',
		heading: 'Poslovni događaji i okupljanja',
		sub: 'Konferencije, sajmovi i poslovna okupljanja u Bijeljini, Semberiji i regionu.',
		typesLabel: 'Šta ćemo pratiti',
		types: ['Konferencije', 'Sajmovi', 'B2B susreti', 'Radionice i edukacije', 'Networking okupljanja', 'Investicioni forumi']
	},
	companies: {
		label: 'Direktorijum',
		heading: 'Istaknute firme',
		sub: 'Profesionalni profili kompanija iz različitih sektora privrede',
		showMore: 'Prikaži više',
		viewAll: 'Prikaži sve',
		inquire: 'Pošalji upit',
		featured: 'Istaknuto',
		localTab: 'Domaće firme',
		investorsTab: 'Investitori i partneri',
		localSub: 'Kompanije registrovane u Bijeljini i Semberiji',
		investorsSub: 'Kompanije van regije otvorene za B2B saradnju',
		visibilityHeading: 'Učinite svoju firmu vidljivom',
		visibilitySub: 'Registrujte svoju firmu na platformi i budite vidljivi lokalnim i regionalnim partnerima.'
	},
	cta: {
		heading: 'Pridruži se poslovnoj mreži',
		sub: 'Postanite dio rastućeg ekosistema koji povezuje kompanije, investitore i dijasporu',
		btn: 'Počni danas'
	},
	footer: {
		tagline: 'Regionalna poslovna mreža.',
		desc: 'Semberija.app je moderni regionalni poslovni ekosistem koji povezuje kompanije, investicije, dijasporu i digitalne prilike.',
		colPlatform: 'Platforma',
		colCompany: 'Kompanija',
		colContact: 'Kontakt',
		address: 'Bijeljina, Republika Srpska, BiH',
		email: 'info@zoemilano.com',
		copyright: '© 2026 Semberija.app. Sva prava zadržana.',
		newsletter: 'Pratite poslovne vijesti'
	},
	adSlot: {
		tag: 'Oglasni prostor',
		available: 'Slobodno',
		title: 'Vaš brend ovdje',
		desc: 'Predstavite svoju firmu posjetiocima koji traže poslovne partnere u Semberiji.',
		cta: 'Rezervišite prostor',
		format: 'Format'
	},
	ui: {
		explore: 'Istraži',
		searchPlaceholder: 'Pretraži...',
		searchNetwork: 'Pretraži mrežu...',
		all: 'Sve',
		noResults: 'Nema rezultata za vašu pretragu.',
		noResultsShort: 'Nema rezultata.',
		learnMore: 'Saznaj više',
		contactUs: 'Kontaktirajte nas',
		requestQuote: 'Zatraži ponudu',
		freeConsult: 'Besplatna konsultacija',
		location: 'Lokacija',
		categories: 'Kategorije djelatnosti',
		categoriesSub: 'Pronađite firme prema sektoru i vrsti djelatnosti',
		companiesLocal: 'Firme u Bijeljini i Semberiji',
		investorsLabel: 'Investitori i partneri',
		networkTypes: ['Traži partnera', 'Traži distributera', 'Nudi saradnju', 'Izvoz proizvoda', 'Investicioni interes', 'B2B zahtjev'],
		transformHeading: 'Transformišite vaše poslovanje digitalno',
		transformDesc: 'Kontaktirajte nas za besplatnu konsultaciju. Naš tim je tu da pomogne vašoj firmi da uspješno pređe na digitalno poslovanje.',
		investSoon: 'Investicioni projekti uskoro',
		investSoonDesc: 'Radimo na prikupljanju investicionih projekata iz regije. Kontaktirajte nas ako imate projekat.',
		newsSoon: 'Vijesti uskoro',
		newsSoonDesc: 'Radimo na prikupljanju poslovnih vijesti i regionalnih informacija. Pratite nas za najnovije.',
		eventsSoon: 'Događaji uskoro',
		eventsSoonDesc: 'Radimo na prikupljanju poslovnih konferencija, sajmova i regionalnih okupljanja. Kontaktirajte nas ako organizujete događaj koji želite da predstavimo.',
		joinB2b: 'Zatražite poslovno povezivanje',
		joinB2bDesc: 'Recite nam šta vam je potrebno — partnera, dobavljača, distributera ili investitora — i mi ćemo vas povezati sa pravim kontaktima.',
		contact: {
			heading: 'Kontaktirajte nas',
			sub: 'Registrujte firmu, zatražite uslugu ili nam pošaljite poruku',
			processLabel: 'Kako obrađujemo upit',
			process: [
				{ title: 'Pošaljete upit', desc: 'Izaberete vrstu upita i popunite samo polja koja su za nju potrebna.' },
				{ title: 'Pregledamo podatke', desc: 'Naš tim pregleda upit i, po potrebi, traži dodatne informacije.' },
				{ title: 'Javljamo se email-om', desc: 'Odgovor i prijedlog sljedećih koraka šaljemo na adresu koju ste naveli.' }
			],
			regTitle: 'Registracija firme',
			regDesc: 'Registrujte svoju firmu na platformi i povećajte vidljivost. Popunite formular i kontaktiramo vas u roku od 24h.',
			digitalTitle: 'Digitalne usluge',
			digitalDesc: 'Zainteresovani ste za web stranicu, brendiranje ili neku drugu digitalnu uslugu? Kontaktirajte nas za besplatnu procjenu.',
			advertisingTitle: 'Oglašavanje',
			advertisingDesc: 'Za informacije o reklamnim pozicijama, cijenama i dostupnosti, pišite nam direktno.',
			subject: 'Tema',
			optListing: 'Registracija firme',
			optService: 'Digitalne usluge',
			optAdvertising: 'Oglašavanje',
			optNetworking: 'Umrežavanje / Prilike',
			optOther: 'Ostalo',
			fullName: 'Ime i prezime',
			namePlaceholder: 'Vaše ime',
			emailPlaceholder: 'vasa@email.com',
			companyName: 'Naziv firme',
			companyPlaceholder: 'Vaša firma d.o.o.',
			message: 'Poruka',
			messagePlaceholder: 'Opišite šta tražite ili kakva vam je potreba...',
			send: 'Pošalji poruku',
			sent: 'Poruka je poslata!',
			sentDesc: 'Hvala na interesu. Kontaktiramo vas u kratkom roku.',
			newMessage: 'Nova poruka'
		}
	}
};

const en = {
	nav: {
		home: 'Home',
		companies: 'Companies',
		investments: 'Investment',
		network: 'Network',
		diaspora: 'B2B',
		services: 'Digital Services',
		news: 'News',
		events: 'Events',
		about: 'About',
		contact: 'Contact',
		businessNetwork: 'Business Network',
		listCta: 'Join the Platform',
		explore: 'Explore',
		business: 'Business',
		platform: 'Platform',
		industries: 'Industries',
		directory: 'Business Directory',
		search: 'Search',
		b2b: 'B2B Matchmaking',
		international: 'International Business',
		enquiries: 'Business Enquiries',
		promote: 'Promote Your Business',
		opportunities: 'Business Opportunities',
		platformOverview: 'Platform Overview'
	},
	hero: {
		tag: 'Bijeljina · Semberija · Republika Srpska',
		headline: 'Where Semberija Does Business. We Connect.',
		sub: 'Connecting companies, manufacturers, distributors, investors and business partners through a digital platform designed to create new opportunities for collaboration, investment and international growth.',
		ctaNetwork: 'Explore Network',
		ctaCompanies: 'Find Companies',
		ctaInvest: 'Invest in the Region',
		subheading: 'Regional Business Platform',
		ctaPlatform: 'Explore the Platform'
	},
	bizSearch: {
		heading: 'Discover Business Opportunities in Bijeljina and Semberija',
		desc: 'Find companies, products, services, industries and potential business partners in one place.',
		placeholder: 'Search companies, products, services or industries...',
		industry: 'Industry',
		location: 'Location',
		allIndustries: 'All industries',
		allLocations: 'All locations',
		cta: 'Search Companies',
		popular: 'Popular sectors:'
	},
	ecosystem: {
		label: 'Sectors',
		heading: 'The Business Ecosystem of Bijeljina and Semberija',
		desc: 'From agriculture and manufacturing to trade, logistics, technology and professional services, explore the companies and industries shaping the region\'s economy.',
		companies: 'Companies',
		explore: 'Explore sector',
		active: 'Sector',
		clear: 'Clear filter',
		sectors: {
			'poljoprivreda-hrana': 'Agriculture & Food Industry',
			'proizvodnja': 'Manufacturing & Industry',
			'gradjevina': 'Construction & Real Estate',
			'trgovina': 'Trade & Distribution',
			'transport': 'Transport & Logistics',
			'it': 'IT & Digital Services',
			'usluge': 'Professional Services',
			'turizam': 'Tourism & Hospitality'
		} as Record<string, string>
	},
	funding: {
		label: 'Platform',
		heading: 'Funding & Incentives',
		desc: 'Explore public funding calls, grants, subsidies, digital vouchers and business support programmes relevant to companies and entrepreneurs in Bijeljina, Republika Srpska and Bosnia and Herzegovina.',
		cta: 'Explore funding',
		formCta: 'Send an enquiry',
		overviewHeading: 'Types of funding and support',
		instruments: [
			{ title: 'Public calls', desc: 'Calls from institutions and programmes awarding funds to companies, entrepreneurs and organisations.' },
			{ title: 'Grants', desc: 'Non-repayable financial support, subject to eligibility and use for the stated purpose.' },
			{ title: 'Subsidies', desc: 'Incentives for employment, production, agriculture, exports or investment under current programmes.' },
			{ title: 'Digital vouchers', desc: 'A potential instrument for co-financing digitalisation. Availability depends on current calls and conditions.' },
			{ title: 'Support programmes', desc: 'Advisory, training and development support for SMEs and entrepreneurs.' }
		],
		statusHeading: 'Current status',
		statusDesc: 'We do not currently publish individual calls on the platform. When they are added, each will include the official source, eligibility requirements, the deadline and the date it was last verified.',
		disclaimerHeading: 'Important',
		disclaimer: 'Semberija.app and ZOE MILANO are not a funding authority and do not guarantee approval. Always check conditions and deadlines with the official source of the call.',
		zoeHeading: 'Digitalisation with ZOE MILANO',
		zoeDesc: 'For digitalisation projects that meet a call\'s conditions, ZOE MILANO can provide relevant digital development services — websites, apps, automation and systems.',
		zoeCta: 'Digital services',
		premiumTag: 'Premium · BandiHub',
		premiumNote: 'Detailed funding opportunities, grant calls and digital vouchers will be available to Premium members, with access also planned through the mobile app.',
		soon: 'In preparation',
		formHeading: 'Funding enquiry',
		formSub: 'Describe your company and project, and we will get back to you with information on possible sources of support.',
		prefill: 'I am interested in funding and incentive opportunities for: '
	},
	premium: {
		label: 'Membership',
		heading: 'Discover Premium benefits',
		desc: 'Registration is all you need to use the platform. Premium membership adds extra benefits — with no obligation.',
		items: [
			{ title: 'BandiHub', desc: 'Detailed information on funding, grant calls and digital vouchers.' },
			{ title: 'Advanced features', desc: 'Extended access to platform information and tools.' },
			{ title: 'Mobile app', desc: 'Access to Premium content through the planned mobile app.' }
		],
		optional: 'Premium is not required to register.',
		more: 'Learn more'
	},
	platform: {
		label: 'Platform',
		heading: 'One Platform. More Business Opportunities.',
		desc: 'Semberija.app connects companies from Bijeljina and the wider Semberija region with business partners, investors and international markets through an integrated digital ecosystem.',
		more: 'Learn more about the platform',
		statusDev: 'In development',
		statusSoon: 'Coming soon',
		modulesHeading: 'Platform business modules',
		modules: [
			{ title: 'Business Directory', desc: 'Showcase your company, products and services to potential partners.', detail: 'A directory profile shows your industry, location and offer, and companies can be searched by name, industry and location.', cta: 'Browse Companies' },
			{ title: 'B2B Matchmaking', desc: 'Discover suppliers, manufacturers, distributors and business partners.', detail: 'Tell us who you are looking for — a partner, distributor, supplier or investor — and we help you connect with the right companies.', cta: 'Find a Partner' },
			{ title: 'Investment', desc: 'Explore investment opportunities and regional development potential.', detail: 'An overview of investment areas and projects in Bijeljina and Semberija, from agriculture and manufacturing to energy and real estate.', cta: 'Explore Investment' },
			{ title: 'Funding & Incentives', desc: 'Explore public funding calls, grants, subsidies, digital vouchers and business support programmes relevant to companies and entrepreneurs in Bijeljina, Republika Srpska and Bosnia and Herzegovina.', detail: 'An overview of public funding instruments and support programmes, with an enquiry form for your company. Separate from private investment opportunities.', cta: 'Explore funding' },
			{ title: 'International Business', desc: 'Connect with business markets in Serbia, Italy and beyond.', detail: 'Our partner and diaspora network opens the way to markets in Serbia, Italy and other countries, with support for the first contact.', cta: 'Request a Connection' },
			{ title: 'Business Enquiries', desc: 'Submit an offer or request and seek potential business connections.', detail: 'Publish what you offer or need — cooperation, distribution, investment or a service — and browse enquiries from other companies.', cta: 'Submit a Business Enquiry' },
			{ title: 'Business Promotion', desc: 'Increase visibility through featured profiles and promotional placements.', detail: 'Featured profiles and promotional placements on the platform help your company be the first one partners see.', cta: 'Promote Your Business' },
			{ title: 'Digital Services', desc: 'Web development, apps, branding, marketing and business solutions.', detail: 'Our digital services team helps companies improve their online presence, sales and business processes.', cta: 'Explore Services' },
			{ title: 'Mobile App', desc: 'A mobile business platform currently in development.', detail: 'A mobile version of the platform is in development. Sign up for early access and be among the first to use it.', cta: 'Request Early Access' }
		],
		benefitsLabel: 'Registration benefits',
		benefitsHeading: 'Why register your company?',
		benefitsDesc: 'Registering on Semberija.app opens the door to new business contacts, partnerships and markets.',
		benefits: [
			{ title: 'Company profile', desc: 'Present your industry, products and services in one place.' },
			{ title: 'Visibility to partners', desc: 'Be found by domestic and international companies.' },
			{ title: 'Access to investors', desc: 'Present development projects and investment needs.' },
			{ title: 'Business enquiries', desc: 'Send and receive offers and cooperation requests.' },
			{ title: 'International network', desc: 'Connect with markets in Serbia, Italy and the diaspora.' },
			{ title: 'Digital support', desc: 'Use digital services for growth and better visibility.' }
		],
		joinHeading: 'Ready for new business opportunities?',
		joinDesc: 'Join the platform and present your company to partners in the region and worldwide.'
	},
	joinCta: {
		heading: 'Your Business Deserves Greater Visibility.',
		desc: 'Showcase your business, discover new partners and open the door to regional and international cooperation.',
		benefits: ['Showcase Your Company', 'Find Business Partners', 'Discover New Opportunities', 'Expand into New Markets'],
		promote: 'Promote Your Business'
	},
	howItWorks: {
		label: 'How it works',
		heading: 'From Business Visibility to Collaboration.',
		online: 'Available online',
		manual: 'Via enquiry',
		note: 'Steps marked “Via enquiry” are currently handled with the help of our team — you send us your details or request, and we guide you from there.',
		steps: [
			{ title: 'Register Your Company', desc: 'Send your company\'s basic details through the contact form. Profiles are currently set up by our team — self-service registration is in preparation.', link: 'Send Details' },
			{ title: 'Showcase Your Products, Services and Business Needs', desc: 'Tell us what you offer and what you are looking for. We use your details to prepare your company profile in the business directory.', link: '' },
			{ title: 'Discover Potential Partners', desc: 'Search companies by name, industry and location, or browse sectors and investors.', link: 'Search Companies' },
			{ title: 'Start Building Business Relationships', desc: 'Send a business enquiry or request a connection — our team facilitates the first contact with the company.', link: 'Submit a Business Enquiry' }
		]
	},
	regions: {
		label: 'Regional platforms',
		heading: 'Connecting Regions. Opening New Markets.',
		desc: 'Semberija.app is part of ZOE MILANO\'s broader vision of developing regional digital platforms that connect companies, markets and international business opportunities.',
		cta: 'Visit Platform',
		attribution: 'Digital platforms developed by ZOE MILANO.',
		prev: 'Previous platform',
		next: 'Next platform',
		newTab: '(opens in a new tab)',
		slide: 'Platform',
		items: {
			lombardia: 'A digital business platform connecting companies, investment and international cooperation across Lombardy.',
			veneto: 'A regional digital platform supporting business connections and development across Italy\'s Veneto region.',
			ibiza: 'A digital platform for Ibiza connecting local businesses, services and opportunities across the island.',
			liguria: 'A regional digital platform for companies, tourism and business cooperation in Liguria.',
			montalcino: 'A digital platform for Montalcino and Tuscany: wine making, local production and business connections.',
			sannio: 'A regional platform for Sannio in Campania, dedicated to local companies and the area\'s development.',
			fvgitalia: 'A digital business platform for Friuli Venezia Giulia and its companies, markets and partnerships.'
		} as Record<string, string>
	},
	aboutPage: {
		label: 'About',
		heading: 'Semberija.app — From Bijeljina to the World.',
		intro: [
			'Semberija.app is a regional digital business platform dedicated to connecting companies, entrepreneurs, investors and business partners from Bijeljina and the wider Semberija region with regional and international markets.',
			'The platform was born from a personal connection to Bijeljina and the belief that its economic potential deserves greater visibility.'
		],
		platform: {
			label: 'About the Platform',
			heading: 'More Than a Business Directory',
			body: [
				'Semberija.app is developing a digital ecosystem for company visibility, business matchmaking, investment opportunities and international cooperation.',
				'Our goal is to help local businesses strengthen their digital presence and gain easier access to new business contacts and markets.'
			]
		},
		vision: {
			label: 'Our Vision',
			heading: 'Local Potential. International Opportunities.',
			body: [
				'Bijeljina and Semberija have a strong tradition of agriculture, manufacturing, trade and entrepreneurship.',
				'We believe that the region\'s products, expertise and business capabilities have the potential to reach a much wider international market.',
				'Our vision is to support regional economic development through modern technology, professional promotion and meaningful business connections.'
			]
		},
		offer: {
			label: 'The Platform',
			heading: 'What Semberija.app Enables',
			items: [
				'Business Profiles and Visibility',
				'Business and B2B Connections',
				'Investment Opportunities',
				'International Cooperation',
				'Digital Promotion and Development'
			],
			closing: 'Semberija.app is being developed as long-term digital infrastructure connecting companies, markets and business opportunities.'
		},
		founder: {
			label: 'About the Founder',
			name: 'Zorana Petrović',
			role: 'Founder, Semberija.app | Founder & CEO, ZOE MILANO',
			places: 'Belgrade · Milan · Bijeljina',
			body: [
				'Semberija.app was founded by Zorana Petrović, entrepreneur and creative strategist, and Founder & CEO of ZOE MILANO.',
				'Having grown up and studied in Milan, her professional background spans creative development, digital platforms, marketing and international projects.',
				'Her connection to Bijeljina is deeply personal. Her mother, Prof. Zorica Petrović, was born in Bijeljina, as were other members of her family. Her family heritage also includes her grandmother, who received a decoration for bravery during the Second World War.',
				'Zorana has visited Bijeljina regularly over the years, gaining first-hand insight into the potential of local manufacturing, entrepreneurship and business development.',
				'This personal connection inspired her to bring together international experience, digital technology and modern marketing to help promote Bijeljina and its business community.'
			],
			quoteLabel: 'Founder\'s Vision',
			quote: '“Bijeljina is a city connected to my family roots and a place I have returned to for many years. I believe that the companies, products and people of this region deserve greater international visibility. Semberija.app was created to help connect that potential with new markets and business opportunities.”',
			quoteRole: 'Founder, Semberija.app'
		},
		zoe: {
			label: 'ZOE MILANO',
			heading: 'Ideas, Creativity and Technology',
			body: [
				'Semberija.app is a project developed by ZOE MILANO d.o.o., a Belgrade-based company specializing in digital platforms, mobile applications, B2B ecosystems and international business projects.',
				'The company combines creative strategy, technology, digital marketing and business development to create modern digital solutions for companies and markets.'
			],
			credits: [
				{
					label: 'Concept and Founder',
					value: 'Zorana Petrović'
				},
				{
					label: 'Platform Development',
					value: 'ZOE MILANO d.o.o.'
				}
			],
			cta: 'Visit ZOE MILANO'
		},
		future: {
			label: 'Our Future',
			heading: 'From Bijeljina to New Markets',
			body: [
				'Semberija.app was created to connect local business potential with regional and international opportunities.',
				'Our ambition is to give companies from Bijeljina and Semberija a professional environment to showcase their businesses, increase visibility and establish new commercial connections.'
			],
			closing: 'This is just the beginning.'
		},
		cta: {
			heading: 'Be Part of Bijeljina\'s Business Future.',
			desc: 'Showcase your company, connect with potential partners and explore new opportunities for growth.',
			contact: 'Contact Us'
		}
	},
	enquiry: {
		typeLabel: 'Enquiry type',
		types: {
			registracija: 'Company registration',
			preuzimanje: 'Claim a company profile',
			b2b: 'B2B connections',
			oglasavanje: 'Advertising and promotion',
			medjunarodna: 'International cooperation',
			usluge: 'Digital services',
			ostalo: 'Other'
		},
		hints: {
			registracija: 'Send us your company details — our team prepares your profile in the business directory.',
			preuzimanje: 'Is your company already listed? Request to claim the profile to confirm and complete its details.',
			b2b: 'Describe the partner you are looking for — a supplier, distributor, manufacturer or investor.',
			oglasavanje: 'Request an offer for a featured profile, banner ads or other promotional placements.',
			medjunarodna: 'Tell us which markets interest you — Serbia, Italy or beyond.',
			usluge: 'Web development, apps, branding and marketing — describe what you need.',
			ostalo: 'Send us a message and we will get back to you.'
		},
		companySection: 'Company details',
		contactSection: 'Contact details',
		industry: 'Industry',
		industryPlaceholder: 'Select an industry',
		industryOther: 'Other industry',
		location: 'Location',
		locationPlaceholder: 'e.g. Bijeljina',
		website: 'Website',
		phone: 'Phone',
		products: 'Products and services',
		productsPlaceholder: 'What does your company make or offer?',
		offers: 'Business offers',
		offersPlaceholder: 'What you offer partners — capacity, cooperation, distribution...',
		interests: 'Partnership interests',
		interestsPlaceholder: 'What kind of partners or cooperation are you looking for?',
		markets: 'Target markets',
		marketsPlaceholder: 'e.g. Serbia, Italy, EU',
		role: 'Your role in the company',
		rolePlaceholder: 'e.g. director, owner',
		optional: 'optional'
	},
	listing: {
		public: 'Publicly sourced',
		verified: 'Verified member',
		publicHint: 'Details were collected from publicly available sources.',
		verifiedHint: 'The company is registered and has confirmed its details.',
		claim: 'Your company? Claim this profile',
		inquire: 'Send Enquiry'
	},
	advertising: {
		title: 'Advertising',
		formatsHeading: 'Advertising formats',
		options: [
			{ title: 'Homepage slider', desc: 'Your visual and message at the top of the homepage — visible to every visitor right on arrival.' },
			{ title: 'Featured listing', desc: 'Your company prioritised in searches, categories and platform recommendations.' },
			{ title: 'Banner ads', desc: 'Static or animated banners in high-visibility positions across the platform.' },
			{ title: 'Sponsored category', desc: 'Brand an entire category and be the dominant choice for clients in that sector.' }
		],
		audienceHeading: 'Reach the right business audience',
		audienceDesc: 'Semberija.app is used by business owners, managers and decision-makers in the region. Your advertising reaches exactly that audience — locally, precisely, professionally.',
		benefits: ['Targeted B2B audience', 'Professional context', 'Regional brand recognition', 'Flexible formats and positions']
	},
	promo: {
		label: 'Promotion',
		heading: 'Promote Your Business on Semberija.app',
		desc: 'Increase your business visibility through featured profiles, digital advertising and promotional opportunities.',
		cta: 'Request an Offer'
	},
	seo: {
		homeTitle: 'Semberija.app | Bijeljina & Semberija Business Platform',
		homeDesc: 'Discover companies, business partners, investment opportunities and B2B connections in Bijeljina and the wider Semberija region.',
		aboutTitle: 'About | Semberija.app — Vision & Founder',
		platformTitle: 'Platform | Semberija.app — B2B Connections & Investment'
	},
	legal: {
		statement: 'Semberija.app is an independent privately developed digital business platform operated by ZOE MILANO d.o.o. It is not an official website of the City of Bijeljina or any public authority.',
		copyright: '© 2026 Semberija.app — Developed and operated by ZOE MILANO d.o.o.',
		langNotice: '',
		privacy: 'Privacy',
		terms: 'Terms',
		cookies: 'Cookies',
		gdpr: 'GDPR',
		disclaimer: 'Disclaimer'
	},
	networking: {
		heading: 'B2B Networking',
		sub: 'Connect with partners, investors and collaborators in the region.',
		types: ['All', 'Partnership', 'Investment', 'Collaboration'],
		contact: 'Contact',
		proposalHeading: 'Have a business proposal?',
		proposalDesc: 'Post your business idea or need and connect with the right partners.',
		kindsHeading: 'What you can post'
	},
	opportunities: {
		sub: 'Investments, partnerships and collaborations from Bijeljina and Semberija in one place.',
		kindsHeading: 'Types of opportunities',
		kinds: [
			{ title: 'Investment', desc: 'Projects that need capital — from manufacturing and agriculture to real estate and energy.' },
			{ title: 'Partnership', desc: 'Opportunities for joint projects, distribution and entering new markets.' },
			{ title: 'Collaboration', desc: 'Long-term business cooperation, services and outsourcing between companies.' }
		],
		postLabel: 'Post your own',
		postHeading: 'Have a business opportunity or idea?',
		postDesc: 'Post an investment, partnership or collaboration opportunity and connect with the right partners through the Semberija.app network.',
		interested: 'I am interested'
	},
	board: {
		enqTitle: 'No business enquiries published yet',
		enqDesc: 'Be the first: send us an offer or request and our team will publish it and connect you with interested companies.',
		oppTitle: 'The first business opportunities are being prepared',
		oppDesc: 'Have an investment project, partnership offer or cooperation idea? Send us the details and we will present it on the platform.',
		submit: 'Submit a Business Enquiry',
		submitOpp: 'Present an Opportunity'
	},
	formStatus: {
		notConfigured: 'Sending through the form is currently unavailable. Please email us directly at:',
		sendFailed: 'Your message was not sent due to a technical error. Please try again or email us directly at:',
		invalid: 'Please check your name, email address and message, then try again.',
		sending: 'Sending...'
	},
	stats: [
		{ value: '', label: 'Companies in the Directory' },
		{ value: '', label: 'Business Sectors' },
		{ value: '', label: 'Investment Areas' },
		{ value: 'EU', label: 'Export Markets' }
	],
	why: {
		label: 'Advantages',
		heading: 'Why Bijeljina and Semberija?',
		sub: 'Bijeljina and the wider Semberija region offer a strong tradition of enterprise, manufacturing, agriculture and emerging opportunities for business development.',
		items: [
			{
				icon: 'location',
				title: 'Strategic Location',
				desc: 'A region positioned between key Balkan markets and European business routes.'
			},
			{
				icon: 'growth',
				title: 'Business Development',
				desc: 'A growing environment for production, logistics, services and entrepreneurship.'
			},
			{
				icon: 'agriculture',
				title: 'Agriculture & Manufacturing',
				desc: 'Strong regional potential in agriculture, food production and processing.'
			},
			{
				icon: 'diaspora',
				title: 'Diaspora Connections',
				desc: 'Connecting global diaspora with local companies, capital and opportunities.'
			},
			{
				icon: 'digital',
				title: 'Digital Development',
				desc: 'Supporting technology, digital services and modern business transformation.'
			}
		]
	},
	network: {
		label: 'Ecosystem',
		heading: 'Business Network of the Region',
		sub: 'A place for companies, investors, diaspora and partners to connect, collaborate and grow.',
		items: [
			{ title: 'Partnerships', desc: 'Connecting companies with new business partners and collaboration opportunities.' },
			{ title: 'Distributors', desc: 'Helping businesses find regional and international distribution partners.' },
			{ title: 'Investments', desc: 'Presenting investment projects, business ideas and development potential.' },
			{ title: 'B2B Connections', desc: 'Direct connection between companies, services, suppliers and markets.' }
		]
	},
	investments: {
		label: 'Investments',
		heading: 'Invest in Semberija',
		sub: 'Explore regional business potential in logistics, agriculture, production, real estate and digital services.',
		cta: 'Explore Investments',
		categories: [
			{
				name: 'Logistics',
				desc: 'The region is a logistics hub between Belgrade, Sarajevo and Zagreb, with access to Corridor Vc and the Sava River.',
				highlights: ['Access to Corridor Vc and the river port', 'Growing demand for warehousing and distribution centers', 'Skilled workforce in transport and logistics']
			},
			{
				name: 'Agriculture',
				desc: 'Semberija is one of the most fertile agricultural regions in Bosnia and Herzegovina, known for grain, vegetables and fruit production.',
				highlights: ['Over 40,000 hectares of arable land', 'Strong tradition in crop farming, vegetables and livestock', 'Proximity to processing industry and export markets']
			},
			{
				name: 'Production',
				desc: 'An industrial tradition and available workforce make the region attractive for manufacturing plants and processing industries.',
				highlights: ['Lower labor costs compared to the EU', 'Developed industrial infrastructure', 'Incentives for new production facilities']
			},
			{
				name: 'Warehousing',
				desc: 'A strategic position at the crossroads of regional routes makes Semberija an ideal location for warehousing and distribution centers.',
				highlights: ['Proximity to major transport routes', 'Available land for warehouse development', 'Growing demand for regional distribution']
			},
			{
				name: 'Real Estate',
				desc: 'A developing real estate market, with opportunities in residential, commercial and industrial construction.',
				highlights: ['Affordable land prices compared to the region', 'Growing demand for commercial space', 'Opportunities in residential and tourism development']
			},
			{
				name: 'Solar Energy',
				desc: 'Favorable climate conditions and unused land open opportunities for investment in solar power plants.',
				highlights: ['High number of sunny days per year', 'Available land for solar parks', 'Incentives for renewable energy']
			},
			{
				name: 'Outsourcing',
				desc: 'Competitive operating costs and an educated workforce make the region attractive for outsourcing centers.',
				highlights: ['Competitive costs compared to the EU', 'Growing pool of educated talent', 'Time zone convenient for collaboration with Europe']
			},
			{
				name: 'Digital Services',
				desc: 'A growing digital sector with potential for IT companies, startups and digital service providers.',
				highlights: ['A growing number of IT professionals in the region', 'Lower operating costs compared to Western Europe', 'Support for local digital transformation']
			}
		],
		detailTag: 'Investment Opportunity',
		detailHighlights: 'Key Advantages',
		detailBack: 'All Investment Categories',
		detailInquireHeading: 'Send an Inquiry',
		detailInquireSub: 'Fill in the form below and our team will contact you about this investment opportunity.',
		detailPrefill: 'I am interested in the investment opportunity: '
	},
	b2b: {
		label: 'B2B Matchmaking',
		heading: 'Find the Right Business Partner',
		sub: 'Our B2B matchmaking service connects companies from Semberija with partners, suppliers, distributors and investors — across the region and the diaspora.',
		cta: 'Request a Match',
		items: [
			{
				title: 'Find a Partner',
				desc: 'Looking for a strategic business partner for a joint project, expansion or new market? We connect you with suitable companies from the region.',
				highlights: ['Business partners from Bijeljina and Semberija', 'Support in negotiations and setting up cooperation', 'Focus on long-term partnerships']
			},
			{
				title: 'Find a Distributor',
				desc: 'We help manufacturers and brands find reliable distributors for new markets in the region and abroad.',
				highlights: ['Distributor network across the region and diaspora', 'Support entering new markets', 'Reliability checks on potential partners']
			},
			{
				title: 'Find a Supplier',
				desc: 'We connect companies with reliable suppliers of raw materials, components and services in Semberija and the region.',
				highlights: ['Access to a regional supplier base', 'Comparison of offers and terms', 'Support negotiating prices and deadlines']
			},
			{
				title: 'Find an Investor',
				desc: 'We present your business project to investors from the region and diaspora looking for investment opportunities.',
				highlights: ['Direct access to interested investors', 'Help preparing your investment pitch', 'Discretion and professional support']
			},
			{
				title: 'Diaspora Network',
				desc: 'We connect local companies with diaspora entrepreneurs for cooperation, exports and joint business opportunities.',
				highlights: ['Access to a network of diaspora business people', 'Opportunities for exports and international cooperation', 'Support with communication and setting up meetings']
			}
		],
		detailTag: 'Matchmaking Service',
		detailHighlights: 'How We Help',
		detailBack: 'All Matchmaking Services',
		detailInquireHeading: 'Request a Match',
		detailInquireSub: 'Describe what you\'re looking for and our team will find you the right business contacts.',
		detailPrefill: 'I am interested in: ',
		processHeading: 'How the connection works',
		privacyNote: 'Your details are used only to reply to this enquiry.',
		process: [
			{ title: 'Send an enquiry', desc: 'Describe what you are looking for: the type of partner, the market and the scope of cooperation.' },
			{ title: 'We select the right contacts', desc: 'Our team reviews your enquiry and selects companies from the region and the diaspora that fit your needs.' },
			{ title: 'We connect you', desc: 'We facilitate the first contact and help the cooperation start in the right direction.' }
		]
	},
	services: {
		label: 'Digital Services',
		heading: 'Digital Solutions for Modern Business',
		sub: 'Helping companies grow through modern digital tools, branding, automation and online visibility.',
		cta: 'View Services',
		items: [
			{
				title: 'Web Development',
				desc: 'Modern websites, platforms and business systems.',
				highlights: ['Responsive design across all devices', 'Fast loading and optimized builds', 'Scalable solutions that grow with your business']
			},
			{
				title: 'SEO & Marketing',
				desc: 'Digital visibility, growth and online positioning.',
				highlights: ['Search engine optimization (SEO)', 'Targeted digital campaigns', 'Performance tracking and analytics']
			},
			{
				title: 'AI Automation',
				desc: 'Smart solutions for business process automation.',
				highlights: ['Automation of repetitive tasks', 'Chatbots and AI-powered customer support', 'Integration with existing systems']
			},
			{
				title: 'Branding & Design',
				desc: 'Premium visual identity and digital presentation.',
				highlights: ['Complete visual identity and logo design', 'Consistent brand across all channels', 'Presentations and marketing materials']
			},
			{
				title: 'CRM & Systems',
				desc: 'Tools for better sales, communication and business organization.',
				highlights: ['Centralized customer management', 'Sales process automation', 'Improved internal communication and organization']
			},
			{
				title: 'Consulting',
				desc: 'Strategic advisory for digital transformation and growth.',
				highlights: ['Analysis of current operations and processes', 'Strategic digital transformation plan', 'Support with implementation and results tracking']
			}
		],
		detailTag: 'Digital Service',
		detailHighlights: 'What You Get',
		detailBack: 'All Digital Services',
		detailInquireHeading: 'Request a Quote',
		detailInquireSub: 'Fill in the form below and our team will get back to you with a quote for this service.',
		detailPrefill: 'I am interested in the service: '
	},
	news: {
		label: 'News',
		heading: 'Business & Regional News',
		sub: 'Focused exclusively on business, economy, investments, technology, diaspora and regional development.',
		categories: ['Business', 'Investments', 'Technology', 'Diaspora', 'Logistics', 'Agriculture', 'Real Estate', 'Startup Scene']
	},
	events: {
		label: 'Events',
		heading: 'Business Events & Gatherings',
		sub: 'Conferences, fairs and business gatherings in Bijeljina, Semberija and the region.',
		typesLabel: 'What we will cover',
		types: ['Conferences', 'Trade fairs', 'B2B meetings', 'Workshops & training', 'Networking meetups', 'Investment forums']
	},
	companies: {
		label: 'Directory',
		heading: 'Featured Companies',
		sub: 'Professional company profiles from across the regional economy',
		showMore: 'Show More',
		viewAll: 'Show All',
		inquire: 'Send Inquiry',
		featured: 'Featured',
		localTab: 'Local Businesses',
		investorsTab: 'Investors & Partners',
		localSub: 'Companies registered in Bijeljina and Semberija',
		investorsSub: 'Companies outside the region open to B2B cooperation',
		visibilityHeading: 'Make Your Company Visible',
		visibilitySub: 'Register your company on the platform and get discovered by local and regional partners.'
	},
	cta: {
		heading: 'Join the Business Network',
		sub: 'Become part of a growing ecosystem connecting companies, investors and diaspora',
		btn: 'Get Started'
	},
	footer: {
		tagline: 'Regional Business Network.',
		desc: 'Semberija.app is a modern regional business ecosystem connecting companies, investments, diaspora and digital opportunities.',
		colPlatform: 'Platform',
		colCompany: 'Company',
		colContact: 'Contact',
		address: 'Bijeljina, Republika Srpska, BiH',
		email: 'info@zoemilano.com',
		copyright: '© 2026 Semberija.app. All rights reserved.',
		newsletter: 'Follow business news'
	},
	adSlot: {
		tag: 'Advertising space',
		available: 'Available',
		title: 'Your brand here',
		desc: 'Put your business in front of visitors looking for partners in Semberija.',
		cta: 'Reserve this space',
		format: 'Format'
	},
	ui: {
		explore: 'Explore',
		searchPlaceholder: 'Search...',
		searchNetwork: 'Search network...',
		all: 'All',
		noResults: 'No results for your search.',
		noResultsShort: 'No results.',
		learnMore: 'Learn more',
		contactUs: 'Contact Us',
		requestQuote: 'Request Quote',
		freeConsult: 'Free Consultation',
		location: 'Location',
		categories: 'Business Categories',
		categoriesSub: 'Find companies by sector and type of activity',
		companiesLocal: 'Companies in Bijeljina & Semberija',
		investorsLabel: 'Investors & Partners',
		networkTypes: ['Looking for a partner', 'Looking for a distributor', 'Offering cooperation', 'Export products', 'Investment interest', 'Business request'],
		transformHeading: 'Transform your business digitally',
		transformDesc: 'Contact us for a free consultation. Our team is here to help your company successfully transition to digital operations.',
		investSoon: 'Investment Projects Coming Soon',
		investSoonDesc: 'We are collecting investment projects from the region. Contact us if you have a project.',
		newsSoon: 'News Coming Soon',
		newsSoonDesc: 'We are building a curated business news feed focused on economy, investments and regional development. Stay tuned.',
		eventsSoon: 'Events Coming Soon',
		eventsSoonDesc: 'We are building a curated list of business conferences, fairs and regional gatherings. Contact us if you are organizing an event you would like featured.',
		joinB2b: 'Request Business Matchmaking',
		joinB2bDesc: 'Tell us what you need — a partner, supplier, distributor or investor — and we\'ll connect you with the right contacts.',
		contact: {
			heading: 'Get in Touch',
			sub: 'Register your company, request a service, or send us a message',
			processLabel: 'How we handle your enquiry',
			process: [
				{ title: 'You send an enquiry', desc: 'Choose the enquiry type and fill in only the fields it needs.' },
				{ title: 'We review the details', desc: 'Our team reviews your enquiry and asks for more information if needed.' },
				{ title: 'We reply by email', desc: 'We send our reply and suggested next steps to the address you provided.' }
			],
			regTitle: 'Company Registration',
			regDesc: 'Register your company on the platform and increase visibility. Fill in the form and we will contact you within 24 hours.',
			digitalTitle: 'Digital Services',
			digitalDesc: 'Interested in a website, branding, or other digital service? Contact us for a free assessment.',
			advertisingTitle: 'Advertising',
			advertisingDesc: 'For information about advertising positions, pricing, and availability, write to us directly.',
			subject: 'Subject',
			optListing: 'Company Registration',
			optService: 'Digital Services',
			optAdvertising: 'Advertising',
			optNetworking: 'Networking / Opportunities',
			optOther: 'Other',
			fullName: 'Full Name',
			namePlaceholder: 'Your name',
			emailPlaceholder: 'your@email.com',
			companyName: 'Company Name',
			companyPlaceholder: 'Your Company LLC',
			message: 'Message',
			messagePlaceholder: 'Describe what you are looking for or what you need...',
			send: 'Send Message',
			sent: 'Message sent!',
			sentDesc: 'Thank you for your interest. We will contact you shortly.',
			newMessage: 'New Message'
		}
	}
};

const it = {
	nav: {
		home: 'Home',
		companies: 'Aziende',
		investments: 'Investimenti',
		network: 'Rete',
		diaspora: 'B2B',
		services: 'Servizi Digitali',
		news: 'News',
		events: 'Eventi',
		about: 'Chi siamo',
		contact: 'Contatti',
		businessNetwork: 'Rete Business',
		listCta: 'Unisciti alla piattaforma',
		explore: 'Esplora',
		business: 'Business',
		platform: 'Piattaforma',
		industries: 'Settori',
		directory: 'Elenco aziende',
		search: 'Cerca',
		b2b: 'Matchmaking B2B',
		international: 'Business internazionale',
		enquiries: 'Richieste commerciali',
		promote: 'Promuovi la tua azienda',
		opportunities: 'Opportunità di business',
		platformOverview: 'Panoramica della piattaforma'
	},
	hero: {
		tag: 'Bijeljina · Semberija · Repubblica Srpska',
		headline: 'Dove la Semberija fa business. Noi connettiamo.',
		sub: 'Colleghiamo aziende, produttori, distributori, investitori e partner commerciali attraverso una piattaforma digitale che apre nuove opportunità di collaborazione, investimento e crescita internazionale.',
		ctaNetwork: 'Esplora la rete',
		ctaCompanies: 'Trova aziende',
		ctaInvest: 'Investi nella regione',
		subheading: 'Piattaforma business regionale',
		ctaPlatform: 'Esplora la piattaforma'
	},
	bizSearch: {
		heading: 'Scopri le opportunità di business di Bijeljina e della Semberija',
		desc: 'Trova aziende, prodotti, servizi, settori e potenziali partner commerciali in un unico posto.',
		placeholder: 'Cerca aziende, prodotti, servizi o settori...',
		industry: 'Settore',
		location: 'Località',
		allIndustries: 'Tutti i settori',
		allLocations: 'Tutte le località',
		cta: 'Cerca aziende',
		popular: 'Settori più cercati:'
	},
	ecosystem: {
		label: 'Settori',
		heading: 'L\'ecosistema economico di Bijeljina e della Semberija',
		desc: 'Dall\'agricoltura e dalla produzione al commercio, alla logistica, alla tecnologia e ai servizi professionali: scopri le aziende e i settori che plasmano l\'economia della regione.',
		companies: 'Aziende',
		explore: 'Esplora il settore',
		active: 'Settore',
		clear: 'Rimuovi filtro',
		sectors: {
			'poljoprivreda-hrana': 'Agricoltura e industria alimentare',
			'proizvodnja': 'Produzione e industria',
			'gradjevina': 'Edilizia e immobiliare',
			'trgovina': 'Commercio e distribuzione',
			'transport': 'Trasporti e logistica',
			'it': 'IT e servizi digitali',
			'usluge': 'Servizi professionali',
			'turizam': 'Turismo e ospitalità'
		} as Record<string, string>
	},
	funding: {
		label: 'Piattaforma',
		heading: 'Fondi e incentivi',
		desc: 'Scopri bandi pubblici, contributi a fondo perduto, sovvenzioni, voucher digitali e programmi di sostegno per aziende e imprenditori di Bijeljina, della Republika Srpska e della Bosnia ed Erzegovina.',
		cta: 'Esplora gli incentivi',
		formCta: 'Invia una richiesta',
		overviewHeading: 'Tipi di finanziamento e sostegno',
		instruments: [
			{ title: 'Bandi pubblici', desc: 'Bandi di istituzioni e programmi che assegnano fondi ad aziende, imprenditori e organizzazioni.' },
			{ title: 'Contributi a fondo perduto', desc: 'Sostegno finanziario non rimborsabile, subordinato ai requisiti e all\'uso previsto.' },
			{ title: 'Sovvenzioni', desc: 'Incentivi per occupazione, produzione, agricoltura, export o investimenti secondo i programmi in vigore.' },
			{ title: 'Voucher digitali', desc: 'Possibile strumento di cofinanziamento della digitalizzazione. La disponibilità dipende dai bandi e dalle condizioni attuali.' },
			{ title: 'Programmi di sostegno', desc: 'Supporto consulenziale, formativo e di sviluppo per PMI e imprenditori.' }
		],
		statusHeading: 'Stato attuale',
		statusDesc: 'Al momento non pubblichiamo singoli bandi sulla piattaforma. Quando verranno aggiunti, ciascuno riporterà la fonte ufficiale, i requisiti, la scadenza e la data dell\'ultima verifica.',
		disclaimerHeading: 'Importante',
		disclaimer: 'Semberija.app e ZOE MILANO non sono un ente erogatore e non garantiscono l\'approvazione. Verifica sempre condizioni e scadenze presso la fonte ufficiale del bando.',
		zoeHeading: 'Digitalizzazione con ZOE MILANO',
		zoeDesc: 'Per i progetti di digitalizzazione che soddisfano le condizioni di un bando, ZOE MILANO può fornire servizi di sviluppo digitale pertinenti — siti web, app, automazione e sistemi.',
		zoeCta: 'Servizi digitali',
		premiumTag: 'Premium · BandiHub',
		premiumNote: 'Le informazioni dettagliate su fondi, bandi pubblici e voucher digitali saranno disponibili per i membri Premium, con accesso previsto anche tramite l\'app mobile.',
		soon: 'In preparazione',
		formHeading: 'Richiesta di finanziamento',
		formSub: 'Descrivi la tua azienda e il progetto: ti risponderemo con informazioni sulle possibili fonti di sostegno.',
		prefill: 'Sono interessato/a alle opportunità di finanziamento e incentivi per: '
	},
	premium: {
		label: 'Iscrizione',
		heading: 'Scopri i vantaggi Premium',
		desc: 'La registrazione basta per usare la piattaforma. L\'iscrizione Premium aggiunge vantaggi extra — senza alcun obbligo.',
		items: [
			{ title: 'BandiHub', desc: 'Informazioni dettagliate su fondi, bandi pubblici e voucher digitali.' },
			{ title: 'Funzioni avanzate', desc: 'Accesso esteso alle informazioni e agli strumenti della piattaforma.' },
			{ title: 'App mobile', desc: 'Accesso ai contenuti Premium tramite l\'app mobile prevista.' }
		],
		optional: 'Premium non è necessario per registrarsi.',
		more: 'Scopri di più'
	},
	platform: {
		label: 'Piattaforma',
		heading: 'Una piattaforma. Più opportunità di business.',
		desc: 'Semberija.app collega le aziende di Bijeljina e della Semberija con partner commerciali, investitori e mercati internazionali attraverso un ecosistema digitale integrato.',
		more: 'Scopri di più sulla piattaforma',
		statusDev: 'In sviluppo',
		statusSoon: 'Prossimamente',
		modulesHeading: 'Moduli business della piattaforma',
		modules: [
			{ title: 'Elenco aziende', desc: 'Presenta la tua azienda, i prodotti e i servizi ai potenziali partner.', detail: 'Il profilo nell\'elenco mostra settore, località e offerta, e le aziende si possono cercare per nome, settore e località.', cta: 'Sfoglia le aziende' },
			{ title: 'Matchmaking B2B', desc: 'Trova fornitori, produttori, distributori e partner commerciali.', detail: 'Dicci chi stai cercando — un partner, un distributore, un fornitore o un investitore — e ti aiutiamo a entrare in contatto con le aziende giuste.', cta: 'Trova un partner' },
			{ title: 'Investimenti', desc: 'Esplora le opportunità di investimento e il potenziale di sviluppo della regione.', detail: 'Una panoramica delle aree e dei progetti di investimento a Bijeljina e nella Semberija, dall\'agricoltura e dalla produzione all\'energia e all\'immobiliare.', cta: 'Esplora gli investimenti' },
			{ title: 'Fondi e incentivi', desc: 'Scopri bandi pubblici, contributi a fondo perduto, sovvenzioni, voucher digitali e programmi di sostegno per aziende e imprenditori di Bijeljina, della Republika Srpska e della Bosnia ed Erzegovina.', detail: 'Una panoramica degli strumenti di finanziamento pubblico e dei programmi di sostegno, con un modulo di richiesta per la tua azienda. Separato dalle opportunità di investimento private.', cta: 'Esplora gli incentivi' },
			{ title: 'Business internazionale', desc: 'Entra in contatto con i mercati di Serbia, Italia e oltre.', detail: 'La nostra rete di partner e della diaspora apre la strada ai mercati di Serbia, Italia e altri paesi, con supporto per il primo contatto.', cta: 'Richiedi un contatto' },
			{ title: 'Richieste commerciali', desc: 'Presenta un\'offerta o una richiesta e cerca nuovi contatti commerciali.', detail: 'Pubblica ciò che offri o cerchi — collaborazione, distribuzione, investimento o servizio — e consulta le richieste di altre aziende.', cta: 'Invia una richiesta' },
			{ title: 'Promozione aziende', desc: 'Aumenta la visibilità con profili in evidenza e spazi promozionali.', detail: 'Profili in evidenza e spazi promozionali sulla piattaforma aiutano la tua azienda a essere la prima che i partner vedono.', cta: 'Promuovi la tua azienda' },
			{ title: 'Servizi digitali', desc: 'Sviluppo web, app, branding, marketing e soluzioni aziendali.', detail: 'Il nostro team di servizi digitali aiuta le aziende a migliorare presenza online, vendite e processi aziendali.', cta: 'Scopri i servizi' },
			{ title: 'App mobile', desc: 'Una piattaforma business mobile in fase di sviluppo.', detail: 'La versione mobile della piattaforma è in sviluppo. Registrati per l\'accesso anticipato e sii tra i primi a usarla.', cta: 'Richiedi l\'accesso anticipato' }
		],
		benefitsLabel: 'Vantaggi della registrazione',
		benefitsHeading: 'Perché registrare la tua azienda?',
		benefitsDesc: 'La registrazione su Semberija.app apre la porta a nuovi contatti commerciali, partnership e mercati.',
		benefits: [
			{ title: 'Profilo aziendale', desc: 'Presenta settore, prodotti e servizi in un unico posto.' },
			{ title: 'Visibilità per i partner', desc: 'Fatti trovare da aziende nazionali e internazionali.' },
			{ title: 'Accesso agli investitori', desc: 'Presenta progetti di sviluppo ed esigenze di investimento.' },
			{ title: 'Richieste commerciali', desc: 'Invia e ricevi offerte e richieste di collaborazione.' },
			{ title: 'Rete internazionale', desc: 'Entra in contatto con i mercati di Serbia, Italia e la diaspora.' },
			{ title: 'Supporto digitale', desc: 'Usa i servizi digitali per crescere e migliorare la visibilità.' }
		],
		joinHeading: 'Pronto per nuove opportunità di business?',
		joinDesc: 'Unisciti alla piattaforma e presenta la tua azienda ai partner nella regione e nel mondo.'
	},
	joinCta: {
		heading: 'La tua azienda merita più visibilità.',
		desc: 'Presenta la tua attività, trova nuovi partner e apri le porte alla collaborazione regionale e internazionale.',
		benefits: ['Presenta la tua azienda', 'Trova partner commerciali', 'Scopri nuove opportunità', 'Espanditi su nuovi mercati'],
		promote: 'Promuovi la tua azienda'
	},
	howItWorks: {
		label: 'Come funziona',
		heading: 'Dalla visibilità alla collaborazione.',
		online: 'Disponibile online',
		manual: 'Su richiesta',
		note: 'I passaggi contrassegnati con «Su richiesta» sono attualmente gestiti con il supporto del nostro team: ci invii i tuoi dati o la tua richiesta e ti guidiamo noi.',
		steps: [
			{ title: 'Registra la tua azienda', desc: 'Invia i dati di base della tua azienda tramite il modulo di contatto. Al momento i profili vengono creati dal nostro team: la registrazione autonoma è in preparazione.', link: 'Invia i dati' },
			{ title: 'Presenta prodotti, servizi ed esigenze aziendali', desc: 'Indica cosa offri e cosa cerchi. Con i tuoi dati prepariamo il profilo aziendale nell\'elenco aziende.', link: '' },
			{ title: 'Trova potenziali partner', desc: 'Cerca aziende per nome, settore e località, oppure esplora settori e investitori.', link: 'Cerca aziende' },
			{ title: 'Avvia una collaborazione', desc: 'Invia una richiesta commerciale o chiedi un contatto: il nostro team facilita il primo contatto con l\'azienda.', link: 'Invia una richiesta' }
		]
	},
	regions: {
		label: 'Piattaforme regionali',
		heading: 'Colleghiamo le regioni. Apriamo nuovi mercati.',
		desc: 'Semberija.app fa parte della visione più ampia di ZOE MILANO, che sviluppa piattaforme digitali regionali per collegare aziende, mercati e opportunità di business internazionali.',
		cta: 'Visita la piattaforma',
		attribution: 'Piattaforme digitali sviluppate da ZOE MILANO.',
		prev: 'Piattaforma precedente',
		next: 'Piattaforma successiva',
		newTab: '(si apre in una nuova scheda)',
		slide: 'Piattaforma',
		items: {
			lombardia: 'Piattaforma digitale per aziende, investimenti e cooperazione internazionale in Lombardia.',
			veneto: 'Piattaforma digitale regionale per le connessioni e lo sviluppo del business in Veneto.',
			ibiza: 'Piattaforma digitale per Ibiza che collega aziende, servizi e opportunità dell\'isola.',
			liguria: 'Piattaforma digitale regionale per aziende, turismo e cooperazione d\'impresa in Liguria.',
			montalcino: 'Piattaforma digitale per Montalcino e la Toscana: vino, produzioni locali e connessioni d\'impresa.',
			sannio: 'Piattaforma regionale per il Sannio, in Campania, dedicata alle aziende locali e allo sviluppo del territorio.',
			fvgitalia: 'Piattaforma digitale per il Friuli Venezia Giulia, le sue aziende, i mercati e le partnership.'
		} as Record<string, string>
	},
	aboutPage: {
		label: 'Chi siamo',
		heading: 'Semberija.app — Da Bijeljina verso il mondo.',
		intro: [
			'Semberija.app è una piattaforma digitale regionale dedicata a collegare aziende, imprenditori, investitori e partner commerciali di Bijeljina e della Semberija con i mercati regionali e internazionali.',
			'La piattaforma nasce da un legame personale con Bijeljina e dalla convinzione che il suo potenziale economico meriti maggiore visibilità.'
		],
		platform: {
			label: 'La piattaforma',
			heading: 'Più di un elenco aziendale',
			body: [
				'Semberija.app sviluppa un ecosistema digitale per la presentazione delle aziende, i contatti commerciali, gli investimenti e la cooperazione internazionale.',
				'L\'obiettivo è offrire alle imprese locali una migliore visibilità digitale e un accesso più semplice a nuovi contatti commerciali e mercati.'
			]
		},
		vision: {
			label: 'La nostra visione',
			heading: 'Potenziale locale. Opportunità internazionali.',
			body: [
				'Bijeljina e la Semberija hanno una forte tradizione nell\'agricoltura, nella produzione, nel commercio e nell\'imprenditoria.',
				'Crediamo che i prodotti di qualità, le competenze e le capacità imprenditoriali di questo territorio possano trovare spazio anche sul mercato internazionale.',
				'La nostra visione è contribuire a una maggiore visibilità e crescita dell\'economia regionale attraverso tecnologie moderne, promozione professionale e contatti commerciali.'
			]
		},
		offer: {
			label: 'Cosa offriamo',
			heading: 'Cosa offre Semberija.app',
			items: [
				'Presentazione di aziende e servizi',
				'Contatti commerciali e B2B',
				'Opportunità di investimento',
				'Cooperazione internazionale',
				'Promozione e sviluppo digitale'
			],
			closing: 'Semberija.app si sviluppa come un\'infrastruttura digitale a lungo termine per collegare aziende, mercati e opportunità di business.'
		},
		founder: {
			label: 'La fondatrice',
			name: 'Zorana Petrović',
			role: 'Fondatrice di Semberija.app | Founder & CEO, ZOE MILANO d.o.o.',
			places: 'Belgrado · Milano · Bijeljina',
			body: [
				'Semberija.app nasce su iniziativa di Zorana Petrović, imprenditrice e strategist creativa, fondatrice e direttrice di ZOE MILANO.',
				'È cresciuta e ha studiato a Milano; la sua esperienza professionale comprende sviluppo creativo, piattaforme digitali, marketing e progetti internazionali.',
				'È legata a Bijeljina dalle sue radici familiari. Sua madre, la prof.ssa Zorica Petrović, è nata a Bijeljina, così come altri membri della famiglia. L\'eredità familiare comprende anche la nonna, decorata al valore durante la Seconda guerra mondiale.',
				'Da anni Zorana torna a Bijeljina e, per esperienza diretta, riconosce il potenziale della produzione locale, dell\'imprenditoria e dello sviluppo economico.',
				'Proprio da questo legame è nata l\'idea di mettere l\'esperienza internazionale, la tecnologia digitale e il marketing moderno al servizio della promozione di Bijeljina e della sua economia.'
			],
			quoteLabel: 'La visione della fondatrice',
			quote: '«Bijeljina è una città a cui mi legano le radici familiari e in cui torno da anni. Credo che le aziende, i prodotti e le persone di questo territorio meritino una maggiore visibilità internazionale. Semberija.app è nata dal desiderio di collegare questo potenziale con nuovi mercati e opportunità di business.»',
			quoteRole: 'Fondatrice, Semberija.app'
		},
		zoe: {
			label: 'ZOE MILANO',
			heading: 'Idee, creatività e tecnologia',
			body: [
				'Semberija.app è un progetto di ZOE MILANO d.o.o. di Belgrado, azienda che sviluppa piattaforme digitali, app mobili, ecosistemi B2B e progetti di business internazionali.',
				'L\'azienda unisce strategia creativa, tecnologia, marketing digitale e sviluppo del business per creare soluzioni digitali moderne per aziende e mercati.'
			],
			credits: [
				{
					label: 'Idea e fondatrice',
					value: 'Zorana Petrović'
				},
				{
					label: 'Sviluppo della piattaforma',
					value: 'ZOE MILANO d.o.o.'
				}
			],
			cta: 'Visita ZOE MILANO'
		},
		future: {
			label: 'Il nostro futuro',
			heading: 'Da Bijeljina verso nuovi mercati',
			body: [
				'Semberija.app nasce per collegare il potenziale economico locale con le opportunità regionali e internazionali.',
				'Vogliamo offrire alle aziende di Bijeljina e della Semberija uno spazio per presentarsi in modo professionale, promuoversi e stabilire nuovi contatti commerciali.'
			],
			closing: 'Questo è solo l\'inizio.'
		},
		cta: {
			heading: 'Fai parte del futuro economico di Bijeljina.',
			desc: 'Presenta la tua azienda, entra in contatto con potenziali partner ed esplora nuove opportunità di crescita.',
			contact: 'Contattaci'
		}
	},
	enquiry: {
		typeLabel: 'Tipo di richiesta',
		types: {
			registracija: 'Registrazione azienda',
			preuzimanje: 'Rivendica un profilo aziendale',
			b2b: 'Contatti B2B',
			oglasavanje: 'Pubblicità e promozione',
			medjunarodna: 'Cooperazione internazionale',
			usluge: 'Servizi digitali',
			ostalo: 'Altro'
		},
		hints: {
			registracija: 'Inviaci i dati della tua azienda: il nostro team preparerà il profilo nell\'elenco aziende.',
			preuzimanje: 'La tua azienda è già presente? Richiedi il profilo per confermare e completare i dati.',
			b2b: 'Descrivi il partner che cerchi: fornitore, distributore, produttore o investitore.',
			oglasavanje: 'Richiedi un\'offerta per un profilo in evidenza, banner o altri spazi promozionali.',
			medjunarodna: 'Indicaci quali mercati ti interessano: Serbia, Italia o altri.',
			usluge: 'Sviluppo web, app, branding e marketing: descrivi la tua esigenza.',
			ostalo: 'Inviaci un messaggio e ti risponderemo.'
		},
		companySection: 'Dati dell\'azienda',
		contactSection: 'Dati di contatto',
		industry: 'Settore',
		industryPlaceholder: 'Seleziona un settore',
		industryOther: 'Altro settore',
		location: 'Località',
		locationPlaceholder: 'es. Bijeljina',
		website: 'Sito web',
		phone: 'Telefono',
		products: 'Prodotti e servizi',
		productsPlaceholder: 'Cosa produce o offre la tua azienda?',
		offers: 'Offerta commerciale',
		offersPlaceholder: 'Cosa offri ai partner: capacità, collaborazione, distribuzione...',
		interests: 'Interessi di partnership',
		interestsPlaceholder: 'Che tipo di partner o collaborazione cerchi?',
		markets: 'Mercati di riferimento',
		marketsPlaceholder: 'es. Serbia, Italia, UE',
		role: 'Il tuo ruolo nell\'azienda',
		rolePlaceholder: 'es. direttore, titolare',
		optional: 'facoltativo'
	},
	listing: {
		public: 'Fonti pubbliche',
		verified: 'Membro verificato',
		publicHint: 'I dati provengono da fonti pubblicamente disponibili.',
		verifiedHint: 'L\'azienda è registrata e ha confermato i dati.',
		claim: 'È la tua azienda? Rivendica il profilo',
		inquire: 'Invia richiesta'
	},
	advertising: {
		title: 'Pubblicità',
		formatsHeading: 'Formati pubblicitari',
		options: [
			{ title: 'Slider in homepage', desc: 'Il tuo visual e il tuo messaggio in cima alla homepage — visibili a ogni visitatore appena arriva.' },
			{ title: 'Profilo in evidenza', desc: 'La tua azienda in primo piano nelle ricerche, nelle categorie e nei suggerimenti della piattaforma.' },
			{ title: 'Banner pubblicitari', desc: 'Banner statici o animati nelle posizioni più visibili della piattaforma.' },
			{ title: 'Categoria sponsorizzata', desc: 'Brandizza un\'intera categoria e diventa la scelta di riferimento per i clienti di quel settore.' }
		],
		audienceHeading: 'Raggiungi il pubblico business giusto',
		audienceDesc: 'Semberija.app è usata da imprenditori, manager e decisori della regione. La tua pubblicità raggiunge proprio questo pubblico — in modo locale, preciso e professionale.',
		benefits: ['Pubblico B2B mirato', 'Contesto professionale', 'Visibilità regionale del marchio', 'Formati e posizioni flessibili']
	},
	promo: {
		label: 'Promozione',
		heading: 'Promuovi la tua azienda su Semberija.app',
		desc: 'Aumenta la visibilità della tua attività con profili in evidenza, pubblicità digitale e opportunità promozionali.',
		cta: 'Richiedi un\'offerta'
	},
	seo: {
		homeTitle: 'Semberija.app | Piattaforma business di Bijeljina e Semberija',
		homeDesc: 'Scopri aziende, partner commerciali, opportunità di investimento e contatti B2B a Bijeljina e nella regione della Semberija.',
		aboutTitle: 'Chi siamo | Semberija.app — Visione e fondatrice',
		platformTitle: 'Piattaforma | Semberija.app — Contatti B2B e investimenti'
	},
	legal: {
		statement: 'Semberija.app è una piattaforma digitale indipendente e privata, gestita da ZOE MILANO d.o.o. Non è il sito ufficiale della Città di Bijeljina né di alcuna autorità pubblica.',
		copyright: '© 2026 Semberija.app — Sviluppata e gestita da ZOE MILANO d.o.o.',
		langNotice: 'I documenti legali sono attualmente disponibili in inglese.',
		privacy: 'Privacy',
		terms: 'Termini',
		cookies: 'Cookie',
		gdpr: 'GDPR',
		disclaimer: 'Esclusione di responsabilità'
	},
	networking: {
		heading: 'Networking B2B',
		sub: 'Entra in contatto con partner, investitori e collaboratori della regione.',
		types: ['Tutti', 'Partnership', 'Investimento', 'Collaborazione'],
		contact: 'Contatta',
		proposalHeading: 'Hai una proposta commerciale?',
		proposalDesc: 'Pubblica la tua idea o esigenza commerciale e trova i partner giusti.',
		kindsHeading: 'Cosa puoi pubblicare'
	},
	opportunities: {
		sub: 'Investimenti, partnership e collaborazioni da Bijeljina e Semberija in un unico posto.',
		kindsHeading: 'Tipi di opportunità',
		kinds: [
			{ title: 'Investimento', desc: 'Progetti che richiedono capitale — dalla produzione e agricoltura agli immobili e all\'energia.' },
			{ title: 'Partnership', desc: 'Opportunità per progetti comuni, distribuzione e ingresso in nuovi mercati.' },
			{ title: 'Collaborazione', desc: 'Collaborazione commerciale a lungo termine, servizi e outsourcing tra aziende.' }
		],
		postLabel: 'Pubblica la tua',
		postHeading: 'Hai un\'opportunità o un\'idea di business?',
		postDesc: 'Pubblica un investimento, una partnership o una collaborazione e trova i partner giusti attraverso la rete Semberija.app.',
		interested: 'Sono interessato/a'
	},
	board: {
		enqTitle: 'Nessuna richiesta commerciale pubblicata',
		enqDesc: 'Sii il primo: inviaci un\'offerta o una richiesta, il nostro team la pubblicherà e ti metterà in contatto con le aziende interessate.',
		oppTitle: 'Le prime opportunità sono in preparazione',
		oppDesc: 'Hai un progetto d\'investimento, una proposta di partnership o di collaborazione? Inviaci i dettagli e lo presenteremo sulla piattaforma.',
		submit: 'Invia una richiesta',
		submitOpp: 'Presenta un\'opportunità'
	},
	formStatus: {
		notConfigured: 'L\'invio tramite modulo non è al momento disponibile. Scrivici direttamente a:',
		sendFailed: 'Il messaggio non è stato inviato per un errore tecnico. Riprova o scrivici direttamente a:',
		invalid: 'Controlla nome, indirizzo email e messaggio, poi riprova.',
		sending: 'Invio...'
	},
	stats: [
		{ value: '', label: 'Aziende nell\'elenco' },
		{ value: '', label: 'Settori economici' },
		{ value: '', label: 'Aree d\'investimento' },
		{ value: 'UE', label: 'Mercati di esportazione' }
	],
	why: {
		label: 'Vantaggi',
		heading: 'Perché Bijeljina e la Semberija?',
		sub: 'Bijeljina e la più ampia regione della Semberija offrono una forte tradizione imprenditoriale, manifatturiera e agricola e nuove opportunità di sviluppo del business.',
		items: [
			{ icon: 'location', title: 'Posizione strategica', desc: 'Una regione posizionata tra i principali mercati balcanici e le rotte commerciali europee.' },
			{ icon: 'growth', title: 'Sviluppo del business', desc: 'Un ambiente in crescita per produzione, logistica, servizi e imprenditoria.' },
			{ icon: 'agriculture', title: 'Agricoltura e manifattura', desc: 'Forte potenziale regionale in agricoltura, produzione alimentare e trasformazione.' },
			{ icon: 'diaspora', title: 'Legami con la diaspora', desc: 'Collegare la diaspora globale con aziende locali, capitali e opportunità.' },
			{ icon: 'digital', title: 'Sviluppo digitale', desc: 'Supporto alla tecnologia, ai servizi digitali e alla trasformazione aziendale moderna.' }
		]
	},
	network: {
		label: 'Ecosistema',
		heading: 'Rete aziendale della regione',
		sub: 'Un luogo per aziende, investitori, diaspora e partner per connettersi, collaborare e crescere.',
		items: [
			{ title: 'Partnership', desc: 'Connettere le aziende con nuovi partner commerciali e opportunità di collaborazione.' },
			{ title: 'Distributori', desc: 'Aiutare le aziende a trovare partner di distribuzione regionali e internazionali.' },
			{ title: 'Investimenti', desc: 'Presentare progetti di investimento, idee imprenditoriali e potenziale di sviluppo.' },
			{ title: 'Connessioni B2B', desc: 'Connessione diretta tra aziende, servizi, fornitori e mercati.' }
		]
	},
	investments: {
		label: 'Investimenti',
		heading: 'Investi in Semberija',
		sub: 'Esplora il potenziale commerciale regionale in logistica, agricoltura, produzione, immobiliare e servizi digitali.',
		cta: 'Esplora investimenti',
		categories: [
			{
				name: 'Logistica',
				desc: 'La regione è un polo logistico tra Belgrado, Sarajevo e Zagabria, con accesso al Corridoio Vc e al fiume Sava.',
				highlights: ['Accesso al Corridoio Vc e al porto fluviale', 'Domanda crescente di magazzini e centri di distribuzione', 'Manodopera qualificata nel trasporto e nella logistica']
			},
			{
				name: 'Agricoltura',
				desc: 'Semberija è una delle regioni agricole più fertili della Bosnia ed Erzegovina, nota per cereali, ortaggi e frutta.',
				highlights: ['Oltre 40.000 ettari di terreno coltivabile', 'Forte tradizione in agricoltura, orticoltura e allevamento', 'Vicinanza all\'industria di trasformazione e ai mercati di esportazione']
			},
			{
				name: 'Produzione',
				desc: 'Una tradizione industriale e manodopera disponibile rendono la regione attraente per impianti produttivi e industrie di trasformazione.',
				highlights: ['Costi del lavoro inferiori rispetto alla UE', 'Infrastruttura industriale sviluppata', 'Incentivi per nuovi impianti produttivi']
			},
			{
				name: 'Magazzinaggio',
				desc: 'Una posizione strategica all\'incrocio di rotte regionali rende Semberija una location ideale per magazzini e centri di distribuzione.',
				highlights: ['Vicinanza alle principali rotte di trasporto', 'Terreni disponibili per lo sviluppo di magazzini', 'Domanda crescente di distribuzione regionale']
			},
			{
				name: 'Immobiliare',
				desc: 'Un mercato immobiliare in sviluppo, con opportunità nella costruzione residenziale, commerciale e industriale.',
				highlights: ['Prezzi dei terreni accessibili rispetto alla regione', 'Domanda crescente di spazi commerciali', 'Opportunità nello sviluppo residenziale e turistico']
			},
			{
				name: 'Energia solare',
				desc: 'Condizioni climatiche favorevoli e terreni inutilizzati aprono opportunità di investimento in impianti solari.',
				highlights: ['Alto numero di giornate di sole all\'anno', 'Terreni disponibili per parchi solari', 'Incentivi per le energie rinnovabili']
			},
			{
				name: 'Outsourcing',
				desc: 'Costi operativi competitivi e manodopera qualificata rendono la regione attraente per i centri di outsourcing.',
				highlights: ['Costi competitivi rispetto alla UE', 'Bacino crescente di talenti qualificati', 'Fuso orario comodo per collaborare con l\'Europa']
			},
			{
				name: 'Servizi digitali',
				desc: 'Un settore digitale in crescita con potenziale per aziende IT, startup e fornitori di servizi digitali.',
				highlights: ['Numero crescente di professionisti IT nella regione', 'Costi operativi inferiori rispetto all\'Europa occidentale', 'Supporto alla trasformazione digitale locale']
			}
		],
		detailTag: 'Opportunità di investimento',
		detailHighlights: 'Vantaggi principali',
		detailBack: 'Tutte le categorie di investimento',
		detailInquireHeading: 'Invia una richiesta',
		detailInquireSub: 'Compila il modulo qui sotto e il nostro team ti contatterà in merito a questa opportunità di investimento.',
		detailPrefill: 'Sono interessato/a all\'opportunità di investimento: '
	},
	b2b: {
		label: 'B2B Matchmaking',
		heading: 'Trova il partner commerciale giusto',
		sub: 'Il nostro servizio di B2B matchmaking collega le aziende di Semberija con partner, fornitori, distributori e investitori — nella regione e nella diaspora.',
		cta: 'Richiedi un abbinamento',
		items: [
			{
				title: 'Trova un partner',
				desc: 'Cerchi un partner commerciale strategico per un progetto congiunto, un\'espansione o un nuovo mercato? Ti mettiamo in contatto con aziende adatte della regione.',
				highlights: ['Partner commerciali di Bijeljina e della Semberija', 'Supporto nelle trattative e nell\'avvio della collaborazione', 'Focus su partnership di lungo termine']
			},
			{
				title: 'Trova un distributore',
				desc: 'Aiutiamo produttori e brand a trovare distributori affidabili per nuovi mercati nella regione e all\'estero.',
				highlights: ['Rete di distributori nella regione e nella diaspora', 'Supporto nell\'ingresso in nuovi mercati', 'Verifica dell\'affidabilità dei potenziali partner']
			},
			{
				title: 'Trova un fornitore',
				desc: 'Colleghiamo le aziende con fornitori affidabili di materie prime, componenti e servizi a Semberija e nella regione.',
				highlights: ['Accesso a una base di fornitori della regione', 'Confronto di offerte e condizioni', 'Supporto nella negoziazione di prezzi e tempistiche']
			},
			{
				title: 'Trova un investitore',
				desc: 'Presentiamo il tuo progetto imprenditoriale a investitori della regione e della diaspora in cerca di opportunità di investimento.',
				highlights: ['Accesso diretto a investitori interessati', 'Aiuto nella preparazione della presentazione di investimento', 'Discrezione e supporto professionale']
			},
			{
				title: 'Rete della diaspora',
				desc: 'Colleghiamo le aziende locali con imprenditori della diaspora per collaborazioni, esportazioni e opportunità commerciali congiunte.',
				highlights: ['Accesso a una rete di imprenditori della diaspora', 'Opportunità di esportazione e collaborazione internazionale', 'Supporto nella comunicazione e nell\'organizzazione degli incontri']
			}
		],
		detailTag: 'Servizio di matchmaking',
		detailHighlights: 'Come ti aiutiamo',
		detailBack: 'Tutti i servizi di matchmaking',
		detailInquireHeading: 'Richiedi un abbinamento',
		detailInquireSub: 'Descrivi cosa stai cercando e il nostro team troverà i contatti commerciali giusti per te.',
		detailPrefill: 'Sono interessato/a a: ',
		processHeading: 'Come funziona il collegamento',
		privacyNote: 'I tuoi dati vengono usati solo per rispondere a questa richiesta.',
		process: [
			{ title: 'Invia una richiesta', desc: 'Descrivi cosa cerchi: il tipo di partner, il mercato e la portata della collaborazione.' },
			{ title: 'Selezioniamo i contatti giusti', desc: 'Il nostro team esamina la richiesta e seleziona aziende della regione e della diaspora adatte alle tue esigenze.' },
			{ title: 'Ti mettiamo in contatto', desc: 'Facilitiamo il primo contatto e aiutiamo la collaborazione a partire nella giusta direzione.' }
		]
	},
	services: {
		label: 'Servizi digitali',
		heading: 'Soluzioni digitali per il business moderno',
		sub: 'Aiutare le aziende a crescere attraverso strumenti digitali moderni, branding, automazione e visibilità online.',
		cta: 'Scopri i servizi',
		items: [
			{
				title: 'Sviluppo web',
				desc: 'Siti web moderni, piattaforme e sistemi aziendali.',
				highlights: ['Design responsive su tutti i dispositivi', 'Caricamento veloce e sviluppo ottimizzato', 'Soluzioni scalabili che crescono con il business']
			},
			{
				title: 'SEO & Marketing',
				desc: 'Visibilità digitale, crescita e posizionamento online.',
				highlights: ['Ottimizzazione per i motori di ricerca (SEO)', 'Campagne digitali mirate', 'Monitoraggio e analisi dei risultati']
			},
			{
				title: 'Automazione AI',
				desc: 'Soluzioni intelligenti per l\'automazione dei processi aziendali.',
				highlights: ['Automazione delle attività ripetitive', 'Chatbot e assistenza clienti basata su AI', 'Integrazione con i sistemi esistenti']
			},
			{
				title: 'Branding & Design',
				desc: 'Identità visiva premium e presentazione digitale.',
				highlights: ['Identità visiva completa e logo', 'Brand coerente su tutti i canali', 'Presentazioni e materiali di marketing']
			},
			{
				title: 'CRM & Sistemi',
				desc: 'Strumenti per vendite migliori, comunicazione e organizzazione aziendale.',
				highlights: ['Gestione centralizzata dei clienti', 'Automazione del processo di vendita', 'Migliore comunicazione e organizzazione interna']
			},
			{
				title: 'Consulenza',
				desc: 'Consulenza strategica per la trasformazione digitale e la crescita.',
				highlights: ['Analisi delle operazioni e dei processi attuali', 'Piano strategico di trasformazione digitale', 'Supporto nell\'implementazione e nel monitoraggio dei risultati']
			}
		],
		detailTag: 'Servizio digitale',
		detailHighlights: 'Cosa ottieni',
		detailBack: 'Tutti i servizi digitali',
		detailInquireHeading: 'Richiedi un preventivo',
		detailInquireSub: 'Compila il modulo qui sotto e il nostro team ti contatterà con un preventivo per questo servizio.',
		detailPrefill: 'Sono interessato/a al servizio: '
	},
	news: {
		label: 'News',
		heading: 'News aziendali e regionali',
		sub: 'Focalizzati esclusivamente su business, economia, investimenti, tecnologia, diaspora e sviluppo regionale.',
		categories: ['Business', 'Investimenti', 'Tecnologia', 'Diaspora', 'Logistica', 'Agricoltura', 'Immobiliare', 'Startup']
	},
	events: {
		label: 'Eventi',
		heading: 'Eventi e incontri di business',
		sub: 'Conferenze, fiere e incontri aziendali a Bijeljina, Semberija e nella regione.',
		typesLabel: 'Cosa seguiremo',
		types: ['Conferenze', 'Fiere', 'Incontri B2B', 'Workshop e formazione', 'Incontri di networking', 'Forum sugli investimenti']
	},
	companies: {
		label: 'Elenco',
		heading: 'Aziende in evidenza',
		sub: 'Profili aziendali professionali dall\'economia regionale',
		showMore: 'Mostra di più',
		viewAll: 'Mostra tutte',
		inquire: 'Invia richiesta',
		featured: 'In evidenza',
		localTab: 'Aziende locali',
		investorsTab: 'Investitori e partner',
		localSub: 'Aziende registrate a Bijeljina e Semberija',
		investorsSub: 'Aziende esterne alla regione aperte alla cooperazione B2B',
		visibilityHeading: 'Rendi visibile la tua azienda',
		visibilitySub: 'Registra la tua azienda sulla piattaforma e fatti scoprire da partner locali e regionali.'
	},
	cta: {
		heading: 'Unisciti alla rete aziendale',
		sub: 'Diventa parte di un ecosistema in crescita che collega aziende, investitori e diaspora',
		btn: 'Inizia ora'
	},
	footer: {
		tagline: 'Rete Business Regionale.',
		desc: 'Semberija.app è un moderno ecosistema aziendale regionale che collega aziende, investimenti, diaspora e opportunità digitali.',
		colPlatform: 'Piattaforma',
		colCompany: 'Azienda',
		colContact: 'Contatto',
		address: 'Bijeljina, Republika Srpska, BiH',
		email: 'info@zoemilano.com',
		copyright: '© 2026 Semberija.app. Tutti i diritti riservati.',
		newsletter: 'Segui le news aziendali'
	},
	adSlot: {
		tag: 'Spazio pubblicitario',
		available: 'Disponibile',
		title: 'Il tuo marchio qui',
		desc: 'Presenta la tua azienda ai visitatori che cercano partner in Semberija.',
		cta: 'Prenota lo spazio',
		format: 'Formato'
	},
	ui: {
		explore: 'Esplora',
		searchPlaceholder: 'Cerca...',
		searchNetwork: 'Cerca nella rete...',
		all: 'Tutte',
		noResults: 'Nessun risultato per la tua ricerca.',
		noResultsShort: 'Nessun risultato.',
		learnMore: 'Scopri di più',
		contactUs: 'Contattaci',
		requestQuote: 'Richiedi preventivo',
		freeConsult: 'Consulenza gratuita',
		location: 'Posizione',
		categories: 'Categorie di attività',
		categoriesSub: 'Trova aziende per settore e tipo di attività',
		companiesLocal: 'Aziende a Bijeljina e Semberija',
		investorsLabel: 'Investitori e partner',
		networkTypes: ['Cerca un partner', 'Cerca un distributore', 'Offre cooperazione', 'Esporta prodotti', 'Interesse investimento', 'Richiesta B2B'],
		transformHeading: 'Trasforma digitalmente la tua azienda',
		transformDesc: 'Contattaci per una consulenza gratuita. Il nostro team è qui per aiutare la tua azienda a passare con successo alle operazioni digitali.',
		investSoon: 'Progetti di investimento in arrivo',
		investSoonDesc: 'Stiamo raccogliendo progetti di investimento dalla regione. Contattaci se hai un progetto.',
		newsSoon: 'News in arrivo',
		newsSoonDesc: 'Stiamo costruendo un feed di news aziendali curato su economia, investimenti e sviluppo regionale. Restate sintonizzati.',
		eventsSoon: 'Eventi in arrivo',
		eventsSoonDesc: 'Stiamo raccogliendo conferenze aziendali, fiere e incontri regionali. Contattaci se organizzi un evento che vorresti fosse presentato.',
		joinB2b: 'Richiedi un abbinamento commerciale',
		joinB2bDesc: 'Dicci di cosa hai bisogno — un partner, un fornitore, un distributore o un investitore — e ti metteremo in contatto con i contatti giusti.',
		contact: {
			heading: 'Contattaci',
			sub: 'Registra la tua azienda, richiedi un servizio o inviaci un messaggio',
			processLabel: 'Come gestiamo la tua richiesta',
			process: [
				{ title: 'Invii la richiesta', desc: 'Scegli il tipo di richiesta e compila solo i campi necessari.' },
				{ title: 'Esaminiamo i dettagli', desc: 'Il nostro team esamina la richiesta e, se necessario, chiede ulteriori informazioni.' },
				{ title: 'Rispondiamo via email', desc: 'Inviamo la risposta e i prossimi passi suggeriti all\'indirizzo indicato.' }
			],
			regTitle: 'Registrazione azienda',
			regDesc: 'Registra la tua azienda sulla piattaforma e aumenta la visibilità. Compila il modulo e ti contatteremo entro 24 ore.',
			digitalTitle: 'Servizi digitali',
			digitalDesc: 'Interessato a un sito web, branding o altro servizio digitale? Contattaci per una valutazione gratuita.',
			advertisingTitle: 'Pubblicità',
			advertisingDesc: 'Per informazioni su posizioni pubblicitarie, prezzi e disponibilità, scrivici direttamente.',
			subject: 'Oggetto',
			optListing: 'Registrazione azienda',
			optService: 'Servizi digitali',
			optAdvertising: 'Pubblicità',
			optNetworking: 'Networking / Opportunità',
			optOther: 'Altro',
			fullName: 'Nome e cognome',
			namePlaceholder: 'Il tuo nome',
			emailPlaceholder: 'tua@email.com',
			companyName: 'Nome azienda',
			companyPlaceholder: 'La tua Azienda S.r.l.',
			message: 'Messaggio',
			messagePlaceholder: 'Descrivi cosa stai cercando o di cosa hai bisogno...',
			send: 'Invia messaggio',
			sent: 'Messaggio inviato!',
			sentDesc: 'Grazie per il tuo interesse. Ti contatteremo a breve.',
			newMessage: 'Nuovo messaggio'
		}
	}
};

const ru = {
	nav: {
		home: 'Главная',
		companies: 'Компании',
		investments: 'Инвестиции',
		network: 'Сеть',
		diaspora: 'B2B',
		services: 'Цифровые услуги',
		news: 'Новости',
		events: 'События',
		about: 'О нас',
		contact: 'Контакт',
		businessNetwork: 'Бизнес-сеть',
		listCta: 'Присоединиться к платформе',
		explore: 'Обзор',
		business: 'Бизнес',
		platform: 'Платформа',
		industries: 'Отрасли',
		directory: 'Бизнес-каталог',
		search: 'Поиск',
		b2b: 'B2B-подбор партнёров',
		international: 'Международное сотрудничество',
		enquiries: 'Деловые запросы',
		promote: 'Продвижение компании',
		opportunities: 'Деловые возможности',
		platformOverview: 'Обзор платформы'
	},
	hero: {
		tag: 'Биелина · Семберия · Республика Сербская',
		headline: 'Семберия ведёт бизнес. Мы соединяем.',
		sub: 'Мы объединяем компании, производителей, дистрибьюторов, инвесторов и деловых партнёров на цифровой платформе, открывающей новые возможности для сотрудничества, инвестиций и международного развития.',
		ctaNetwork: 'Исследовать сеть',
		ctaCompanies: 'Найти компании',
		ctaInvest: 'Инвестировать в регион',
		subheading: 'Региональная бизнес-платформа',
		ctaPlatform: 'Изучить платформу'
	},
	bizSearch: {
		heading: 'Откройте деловые возможности Биелины и Семберии',
		desc: 'Находите компании, продукты, услуги, отрасли и потенциальных деловых партнёров в одном месте.',
		placeholder: 'Ищите компании, продукты, услуги или отрасли...',
		industry: 'Отрасль',
		location: 'Местоположение',
		allIndustries: 'Все отрасли',
		allLocations: 'Все местоположения',
		cta: 'Найти компании',
		popular: 'Популярные секторы:'
	},
	ecosystem: {
		label: 'Сектора',
		heading: 'Деловая экосистема Биелины и Семберии',
		desc: 'От сельского хозяйства и производства до торговли, логистики, технологий и профессиональных услуг — откройте для себя компании и отрасли, формирующие экономику региона.',
		companies: 'Компании',
		explore: 'Смотреть сектор',
		active: 'Сектор',
		clear: 'Сбросить фильтр',
		sectors: {
			'poljoprivreda-hrana': 'Сельское хозяйство и пищевая промышленность',
			'proizvodnja': 'Производство и промышленность',
			'gradjevina': 'Строительство и недвижимость',
			'trgovina': 'Торговля и дистрибуция',
			'transport': 'Транспорт и логистика',
			'it': 'IT и цифровые услуги',
			'usluge': 'Профессиональные услуги',
			'turizam': 'Туризм и гостеприимство'
		} as Record<string, string>
	},
	funding: {
		label: 'Платформа',
		heading: 'Фонды и стимулы',
		desc: 'Изучите открытые конкурсы, безвозвратные гранты, субсидии, цифровые ваучеры и программы поддержки для компаний и предпринимателей Биелины, Республики Сербской и Боснии и Герцеговины.',
		cta: 'Изучить стимулы',
		formCta: 'Отправить запрос',
		overviewHeading: 'Виды финансирования и поддержки',
		instruments: [
			{ title: 'Открытые конкурсы', desc: 'Конкурсы учреждений и программ, распределяющих средства между компаниями, предпринимателями и организациями.' },
			{ title: 'Безвозвратные гранты', desc: 'Финансовая поддержка без возврата при соблюдении условий и целевом использовании средств.' },
			{ title: 'Субсидии', desc: 'Стимулы для занятости, производства, сельского хозяйства, экспорта или инвестиций по действующим программам.' },
			{ title: 'Цифровые ваучеры', desc: 'Возможный инструмент софинансирования цифровизации. Доступность зависит от текущих конкурсов и условий.' },
			{ title: 'Программы поддержки', desc: 'Консультационная, образовательная и развивающая поддержка малого и среднего бизнеса и предпринимателей.' }
		],
		statusHeading: 'Текущее состояние',
		statusDesc: 'Сейчас мы не публикуем на платформе отдельные конкурсы. Когда они появятся, у каждого будут указаны официальный источник, условия участия, срок и дата последней проверки.',
		disclaimerHeading: 'Важно',
		disclaimer: 'Semberija.app и ZOE MILANO не являются органом, распределяющим средства, и не гарантируют одобрение. Всегда проверяйте условия и сроки у официального источника конкурса.',
		zoeHeading: 'Цифровизация с ZOE MILANO',
		zoeDesc: 'Для проектов цифровизации, соответствующих условиям конкурса, ZOE MILANO может предоставить соответствующие услуги цифровой разработки — сайты, приложения, автоматизацию и системы.',
		zoeCta: 'Цифровые услуги',
		premiumTag: 'Premium · BandiHub',
		premiumNote: 'Подробная информация о фондах, открытых конкурсах и цифровых ваучерах будет доступна участникам Premium, с планируемым доступом через мобильное приложение.',
		soon: 'В подготовке',
		formHeading: 'Запрос о финансировании',
		formSub: 'Опишите компанию и проект, и мы свяжемся с вами с информацией о возможных источниках поддержки.',
		prefill: 'Меня интересуют возможности финансирования и стимулы для: '
	},
	premium: {
		label: 'Членство',
		heading: 'Откройте преимущества Premium',
		desc: 'Для пользования платформой достаточно регистрации. Членство Premium даёт дополнительные преимущества — без обязательств.',
		items: [
			{ title: 'BandiHub', desc: 'Подробная информация о фондах, конкурсах и цифровых ваучерах.' },
			{ title: 'Расширенные функции', desc: 'Расширенный доступ к информации и инструментам платформы.' },
			{ title: 'Мобильное приложение', desc: 'Доступ к контенту Premium через планируемое мобильное приложение.' }
		],
		optional: 'Premium не требуется для регистрации.',
		more: 'Подробнее'
	},
	platform: {
		label: 'Платформа',
		heading: 'Одна платформа. Больше деловых возможностей.',
		desc: 'Semberija.app связывает компании Биелины и Семберии с деловыми партнёрами, инвесторами и международными рынками в единой цифровой экосистеме.',
		more: 'Подробнее о платформе',
		statusDev: 'В разработке',
		statusSoon: 'Скоро',
		modulesHeading: 'Бизнес-модули платформы',
		modules: [
			{ title: 'Бизнес-каталог', desc: 'Представьте компанию, продукты и услуги потенциальным партнёрам.', detail: 'Профиль в каталоге показывает отрасль, местоположение и предложение; компании можно искать по названию, отрасли и местоположению.', cta: 'Смотреть компании' },
			{ title: 'B2B-подбор партнёров', desc: 'Находите поставщиков, производителей, дистрибьюторов и деловых партнёров.', detail: 'Расскажите, кого вы ищете — партнёра, дистрибьютора, поставщика или инвестора, — и мы поможем связаться с подходящими компаниями.', cta: 'Найти партнёра' },
			{ title: 'Инвестиции', desc: 'Изучайте инвестиционные возможности и потенциал развития региона.', detail: 'Обзор инвестиционных направлений и проектов в Биелине и Семберии — от сельского хозяйства и производства до энергетики и недвижимости.', cta: 'Смотреть инвестиции' },
			{ title: 'Фонды и стимулы', desc: 'Изучите открытые конкурсы, безвозвратные гранты, субсидии, цифровые ваучеры и программы поддержки для компаний и предпринимателей Биелины, Республики Сербской и Боснии и Герцеговины.', detail: 'Обзор инструментов государственного финансирования и программ поддержки, а также форма запроса для вашей компании. Отдельно от частных инвестиционных возможностей.', cta: 'Изучить стимулы' },
			{ title: 'Международное сотрудничество', desc: 'Выходите на рынки Сербии, Италии и других стран.', detail: 'Сеть партнёров и диаспоры открывает путь на рынки Сербии, Италии и других стран, с поддержкой при первом контакте.', cta: 'Запросить контакт' },
			{ title: 'Деловые запросы', desc: 'Разместите предложение или запрос и найдите деловых партнёров.', detail: 'Опубликуйте, что вы предлагаете или ищете — сотрудничество, дистрибуцию, инвестиции или услугу, — и просматривайте запросы других компаний.', cta: 'Отправить деловой запрос' },
			{ title: 'Продвижение компаний', desc: 'Повышайте узнаваемость с помощью избранных профилей и рекламных мест.', detail: 'Избранные профили и рекламные места на платформе помогают вашей компании первой попадать в поле зрения партнёров.', cta: 'Продвигать компанию' },
			{ title: 'Цифровые услуги', desc: 'Веб-разработка, приложения, брендинг, маркетинг и бизнес-решения.', detail: 'Наша команда цифровых услуг помогает компаниям улучшить онлайн-присутствие, продажи и бизнес-процессы.', cta: 'Смотреть услуги' },
			{ title: 'Мобильное приложение', desc: 'Мобильная бизнес-платформа в разработке.', detail: 'Мобильная версия платформы находится в разработке. Запишитесь на ранний доступ и станьте одним из первых пользователей.', cta: 'Запросить ранний доступ' }
		],
		benefitsLabel: 'Преимущества регистрации',
		benefitsHeading: 'Зачем регистрировать компанию?',
		benefitsDesc: 'Регистрация на Semberija.app открывает путь к новым деловым контактам, партнёрствам и рынкам.',
		benefits: [
			{ title: 'Профиль компании', desc: 'Представьте отрасль, продукты и услуги в одном месте.' },
			{ title: 'Видимость для партнёров', desc: 'Вас найдут отечественные и международные компании.' },
			{ title: 'Доступ к инвесторам', desc: 'Представляйте проекты развития и потребности в инвестициях.' },
			{ title: 'Деловые запросы', desc: 'Отправляйте и получайте предложения и запросы о сотрудничестве.' },
			{ title: 'Международная сеть', desc: 'Выходите на рынки Сербии, Италии и к диаспоре.' },
			{ title: 'Цифровая поддержка', desc: 'Используйте цифровые услуги для роста и лучшей видимости.' }
		],
		joinHeading: 'Готовы к новым деловым возможностям?',
		joinDesc: 'Присоединяйтесь к платформе и представьте свою компанию партнёрам в регионе и по всему миру.'
	},
	joinCta: {
		heading: 'Ваша компания заслуживает большей известности.',
		desc: 'Представьте свой бизнес, найдите новых партнёров и откройте путь к региональному и международному сотрудничеству.',
		benefits: ['Представьте компанию', 'Найдите деловых партнёров', 'Откройте новые возможности', 'Выходите на новые рынки'],
		promote: 'Продвигать компанию'
	},
	howItWorks: {
		label: 'Как это работает',
		heading: 'От представления к деловому сотрудничеству.',
		online: 'Доступно онлайн',
		manual: 'По запросу',
		note: 'Шаги с отметкой «По запросу» сейчас выполняются при поддержке нашей команды: вы отправляете нам данные или запрос, а мы помогаем дальше.',
		steps: [
			{ title: 'Зарегистрируйте компанию', desc: 'Отправьте основные данные о компании через контактную форму. Сейчас профили создаёт наша команда — самостоятельная регистрация в подготовке.', link: 'Отправить данные' },
			{ title: 'Представьте продукты, услуги и деловые потребности', desc: 'Расскажите, что вы предлагаете и что ищете. На основе ваших данных мы подготовим профиль компании в бизнес-каталоге.', link: '' },
			{ title: 'Найдите потенциальных партнёров', desc: 'Ищите компании по названию, отрасли и местоположению или просматривайте сектора и инвесторов.', link: 'Найти компании' },
			{ title: 'Начните деловое сотрудничество', desc: 'Отправьте деловой запрос или запросите контакт — наша команда поможет установить первый контакт с компанией.', link: 'Отправить деловой запрос' }
		]
	},
	regions: {
		label: 'Региональные платформы',
		heading: 'Соединяем регионы. Открываем новые рынки.',
		desc: 'Semberija.app — часть более широкой стратегии компании ZOE MILANO, которая развивает региональные цифровые платформы, связывающие компании, рынки и международные деловые возможности.',
		cta: 'Перейти на платформу',
		attribution: 'Цифровые платформы разработаны ZOE MILANO.',
		prev: 'Предыдущая платформа',
		next: 'Следующая платформа',
		newTab: '(откроется в новой вкладке)',
		slide: 'Платформа',
		items: {
			lombardia: 'Цифровая бизнес-платформа для компаний, инвестиций и международного сотрудничества в Ломбардии.',
			veneto: 'Региональная цифровая платформа для деловых связей и развития в итальянском регионе Венето.',
			ibiza: 'Цифровая платформа Ибицы, объединяющая местные компании, услуги и деловые возможности острова.',
			liguria: 'Региональная цифровая платформа для компаний, туризма и делового сотрудничества в Лигурии.',
			montalcino: 'Цифровая платформа Монтальчино и Тосканы: виноделие, местное производство и деловые связи.',
			sannio: 'Региональная платформа Саннио в Кампании для местных компаний и развития территории.',
			fvgitalia: 'Цифровая бизнес-платформа региона Фриули-Венеция-Джулия, его компаний, рынков и партнёрств.'
		} as Record<string, string>
	},
	aboutPage: {
		label: 'О нас',
		heading: 'Semberija.app — из Биелины в мир.',
		intro: [
			'Semberija.app — региональная цифровая бизнес-платформа, которая связывает компании, предпринимателей, инвесторов и деловых партнёров из Биелины и Семберии с региональными и международными рынками.',
			'Платформа появилась благодаря личной связи с Биелиной и убеждению, что её экономический потенциал заслуживает большей известности.'
		],
		platform: {
			label: 'О платформе',
			heading: 'Больше, чем бизнес-каталог',
			body: [
				'Semberija.app развивает цифровую экосистему для представления компаний, деловых связей, инвестиций и международного сотрудничества.',
				'Наша цель — обеспечить местным компаниям лучшую цифровую видимость и более простой доступ к новым деловым контактам и рынкам.'
			]
		},
		vision: {
			label: 'Наше видение',
			heading: 'Местный потенциал. Международные возможности.',
			body: [
				'Биелина и Семберия обладают сильными традициями сельского хозяйства, производства, торговли и предпринимательства.',
				'Мы уверены, что качественные продукты, знания и деловой потенциал этого края могут найти своё место и на более широком международном рынке.',
				'Наше видение — способствовать большей известности и развитию региональной экономики с помощью современных технологий, профессионального продвижения и деловых связей.'
			]
		},
		offer: {
			label: 'Платформа',
			heading: 'Что даёт Semberija.app',
			items: [
				'Представление компаний и услуг',
				'Деловые и B2B-связи',
				'Инвестиционные возможности',
				'Международное сотрудничество',
				'Цифровое продвижение и развитие'
			],
			closing: 'Semberija.app развивается как долгосрочная цифровая инфраструктура, связывающая компании, рынки и деловые возможности.'
		},
		founder: {
			label: 'Об основательнице',
			name: 'Zorana Petrović',
			role: 'Основательница Semberija.app | Founder & CEO, ZOE MILANO d.o.o.',
			places: 'Белград · Милан · Биелина',
			body: [
				'Semberija.app создана по инициативе Зораны Петрович — предпринимателя и креативного стратега, основательницы и директора компании ZOE MILANO.',
				'Она выросла и получила образование в Милане; её профессиональный опыт охватывает креативную разработку, цифровые платформы, маркетинг и международные проекты.',
				'С Биелиной её связывают семейные корни. Её мать, профессор Зорица Петрович, родилась в Биелине, как и другие члены её семьи. Семейное наследие включает и бабушку, награждённую за храбрость во время Второй мировой войны.',
				'Зорана уже много лет приезжает в Биелину и на собственном опыте видит потенциал местного производства, предпринимательства и развития бизнеса.',
				'Именно из этой связи родилась идея использовать международный опыт, цифровые технологии и современный маркетинг для лучшего продвижения Биелины и её экономики.'
			],
			quoteLabel: 'Видение основательницы',
			quote: '«Биелина — город, с которым меня связывают семейные корни и в который я возвращаюсь уже много лет. Я верю, что компании, продукты и люди этого края заслуживают большей международной известности. Semberija.app создана, чтобы связать этот потенциал с новыми рынками и деловыми возможностями».',
			quoteRole: 'Основательница, Semberija.app'
		},
		zoe: {
			label: 'ZOE MILANO',
			heading: 'Идея, креативность и технологии',
			body: [
				'Semberija.app — проект компании ZOE MILANO d.o.o. из Белграда, которая разрабатывает цифровые платформы, мобильные приложения, B2B-экосистемы и международные бизнес-проекты.',
				'Компания объединяет креативную стратегию, технологии, цифровой маркетинг и развитие бизнеса, создавая современные цифровые решения для компаний и рынков.'
			],
			credits: [
				{
					label: 'Идея и основательница',
					value: 'Zorana Petrović'
				},
				{
					label: 'Разработка платформы',
					value: 'ZOE MILANO d.o.o.'
				}
			],
			cta: 'Посетить ZOE MILANO'
		},
		future: {
			label: 'Наше будущее',
			heading: 'Из Биелины на новые рынки',
			body: [
				'Semberija.app создана, чтобы связать местный деловой потенциал с региональными и международными возможностями.',
				'Мы хотим дать компаниям из Биелины и Семберии пространство для профессионального представления, продвижения и новых деловых контактов.'
			],
			closing: 'Это только начало.'
		},
		cta: {
			heading: 'Станьте частью делового будущего Биелины.',
			desc: 'Представьте свою компанию, установите связи с потенциальными партнёрами и откройте новые возможности для развития.',
			contact: 'Связаться с нами'
		}
	},
	enquiry: {
		typeLabel: 'Тип запроса',
		types: {
			registracija: 'Регистрация компании',
			preuzimanje: 'Подтверждение профиля компании',
			b2b: 'B2B-связи',
			oglasavanje: 'Реклама и продвижение',
			medjunarodna: 'Международное сотрудничество',
			usluge: 'Цифровые услуги',
			ostalo: 'Другое'
		},
		hints: {
			registracija: 'Отправьте данные о компании — наша команда подготовит профиль в бизнес-каталоге.',
			preuzimanje: 'Ваша компания уже в списке? Запросите профиль, чтобы подтвердить и дополнить данные.',
			b2b: 'Опишите, какого партнёра вы ищете — поставщика, дистрибьютора, производителя или инвестора.',
			oglasavanje: 'Запросите предложение по избранному профилю, баннерам или другим рекламным местам.',
			medjunarodna: 'Расскажите, какие рынки вас интересуют — Сербия, Италия или другие.',
			usluge: 'Веб-разработка, приложения, брендинг и маркетинг — опишите вашу задачу.',
			ostalo: 'Отправьте нам сообщение, и мы свяжемся с вами.'
		},
		companySection: 'Данные компании',
		contactSection: 'Контактные данные',
		industry: 'Отрасль',
		industryPlaceholder: 'Выберите отрасль',
		industryOther: 'Другая отрасль',
		location: 'Местоположение',
		locationPlaceholder: 'напр. Биелина',
		website: 'Веб-сайт',
		phone: 'Телефон',
		products: 'Продукты и услуги',
		productsPlaceholder: 'Что производит или предлагает ваша компания?',
		offers: 'Деловое предложение',
		offersPlaceholder: 'Что вы предлагаете партнёрам — мощности, сотрудничество, дистрибуцию...',
		interests: 'Партнёрские интересы',
		interestsPlaceholder: 'Каких партнёров или какое сотрудничество вы ищете?',
		markets: 'Целевые рынки',
		marketsPlaceholder: 'напр. Сербия, Италия, ЕС',
		role: 'Ваша должность в компании',
		rolePlaceholder: 'напр. директор, владелец',
		optional: 'необязательно'
	},
	listing: {
		public: 'Открытые источники',
		verified: 'Проверенный участник',
		publicHint: 'Данные собраны из общедоступных источников.',
		verifiedHint: 'Компания зарегистрирована и подтвердила данные.',
		claim: 'Ваша компания? Подтвердите профиль',
		inquire: 'Отправить запрос'
	},
	advertising: {
		title: 'Реклама',
		formatsHeading: 'Рекламные форматы',
		options: [
			{ title: 'Слайдер на главной', desc: 'Ваш визуал и сообщение в верхней части главной страницы — их видит каждый посетитель сразу при входе.' },
			{ title: 'Выделенный профиль', desc: 'Ваша компания в приоритете в поиске, категориях и рекомендациях платформы.' },
			{ title: 'Баннерная реклама', desc: 'Статичные или анимированные баннеры на самых заметных местах платформы.' },
			{ title: 'Спонсорская категория', desc: 'Брендируйте целую категорию и станьте главным выбором клиентов в этом секторе.' }
		],
		audienceHeading: 'Достигайте нужной деловой аудитории',
		audienceDesc: 'Semberija.app пользуются владельцы компаний, менеджеры и лица, принимающие решения в регионе. Ваша реклама доходит именно до этой аудитории — локально, точно, профессионально.',
		benefits: ['Целевая B2B-аудитория', 'Профессиональный контекст', 'Узнаваемость бренда в регионе', 'Гибкие форматы и размещения']
	},
	promo: {
		label: 'Продвижение',
		heading: 'Продвигайте свою компанию на Semberija.app',
		desc: 'Повышайте известность своего бизнеса с помощью избранных профилей, цифровой рекламы и рекламных возможностей.',
		cta: 'Запросить предложение'
	},
	seo: {
		homeTitle: 'Semberija.app | Бизнес-платформа Биелины и Семберии',
		homeDesc: 'Компании, деловые партнёры, инвестиционные возможности и B2B-связи в Биелине и регионе Семберия.',
		aboutTitle: 'О нас | Semberija.app — Видение и основательница',
		platformTitle: 'Платформа | Semberija.app — B2B-связи и инвестиции'
	},
	legal: {
		statement: 'Semberija.app — независимая частная цифровая бизнес-платформа, которой управляет ZOE MILANO d.o.o. Она не является официальным сайтом города Биелина или какого-либо органа власти.',
		copyright: '© 2026 Semberija.app — Разработка и управление: ZOE MILANO d.o.o.',
		langNotice: 'Юридические документы в настоящее время доступны на английском языке.',
		privacy: 'Конфиденциальность',
		terms: 'Условия',
		cookies: 'Cookie',
		gdpr: 'GDPR',
		disclaimer: 'Отказ от ответственности'
	},
	networking: {
		heading: 'B2B-нетворкинг',
		sub: 'Находите партнёров, инвесторов и коллег по бизнесу в регионе.',
		types: ['Все', 'Партнёрство', 'Инвестиции', 'Сотрудничество'],
		contact: 'Связаться',
		proposalHeading: 'Есть деловое предложение?',
		proposalDesc: 'Опубликуйте свою бизнес-идею или запрос и найдите подходящих партнёров.',
		kindsHeading: 'Что можно опубликовать'
	},
	opportunities: {
		sub: 'Инвестиции, партнёрства и сотрудничество из Биелины и Семберии в одном месте.',
		kindsHeading: 'Виды возможностей',
		kinds: [
			{ title: 'Инвестиции', desc: 'Проекты, которым нужен капитал, — от производства и сельского хозяйства до недвижимости и энергетики.' },
			{ title: 'Партнёрство', desc: 'Возможности для совместных проектов, дистрибуции и выхода на новые рынки.' },
			{ title: 'Сотрудничество', desc: 'Долгосрочное деловое сотрудничество, услуги и аутсорсинг между компаниями.' }
		],
		postLabel: 'Опубликуйте свою',
		postHeading: 'Есть деловая возможность или идея?',
		postDesc: 'Опубликуйте инвестиционный проект, партнёрство или сотрудничество и найдите подходящих партнёров через сеть Semberija.app.',
		interested: 'Мне интересно'
	},
	board: {
		enqTitle: 'Деловых запросов пока нет',
		enqDesc: 'Будьте первыми: отправьте предложение или запрос — наша команда опубликует его и свяжет вас с заинтересованными компаниями.',
		oppTitle: 'Первые деловые возможности готовятся',
		oppDesc: 'Есть инвестиционный проект, предложение о партнёрстве или сотрудничестве? Пришлите детали, и мы представим его на платформе.',
		submit: 'Отправить деловой запрос',
		submitOpp: 'Представить возможность'
	},
	formStatus: {
		notConfigured: 'Отправка через форму сейчас недоступна. Пожалуйста, напишите нам напрямую:',
		sendFailed: 'Сообщение не отправлено из-за технической ошибки. Попробуйте ещё раз или напишите нам напрямую:',
		invalid: 'Проверьте имя, адрес электронной почты и сообщение и попробуйте ещё раз.',
		sending: 'Отправка...'
	},
	stats: [
		{ value: '', label: 'Компаний в каталоге' },
		{ value: '', label: 'Секторов экономики' },
		{ value: '', label: 'Инвестиционных направлений' },
		{ value: 'ЕС', label: 'Экспортные рынки' }
	],
	why: {
		label: 'Преимущества',
		heading: 'Почему Биелина и Семберия?',
		sub: 'Биелина и регион Семберия — это сильные традиции предпринимательства, производства и сельского хозяйства, а также новые возможности для развития бизнеса.',
		items: [
			{ icon: 'location', title: 'Стратегическое расположение', desc: 'Регион между ключевыми балканскими рынками и европейскими деловыми маршрутами.' },
			{ icon: 'growth', title: 'Развитие бизнеса', desc: 'Растущая среда для производства, логистики, услуг и предпринимательства.' },
			{ icon: 'agriculture', title: 'Сельское хозяйство и производство', desc: 'Сильный региональный потенциал в сельском хозяйстве, пищевой промышленности и переработке.' },
			{ icon: 'diaspora', title: 'Связи с диаспорой', desc: 'Соединяем глобальную диаспору с местными компаниями, капиталом и возможностями.' },
			{ icon: 'digital', title: 'Цифровое развитие', desc: 'Поддержка технологий, цифровых услуг и современной бизнес-трансформации.' }
		]
	},
	network: {
		label: 'Экосистема',
		heading: 'Бизнес-сеть региона',
		sub: 'Место, где компании, инвесторы, диаспора и партнёры встречаются, сотрудничают и растут.',
		items: [
			{ title: 'Партнёрства', desc: 'Соединяем компании с новыми деловыми партнёрами и возможностями для сотрудничества.' },
			{ title: 'Дистрибьюторы', desc: 'Помогаем бизнесу найти региональных и международных партнёров по дистрибуции.' },
			{ title: 'Инвестиции', desc: 'Представляем инвестиционные проекты, бизнес-идеи и потенциал развития.' },
			{ title: 'B2B-связи', desc: 'Прямое соединение между компаниями, услугами, поставщиками и рынками.' }
		]
	},
	investments: {
		label: 'Инвестиции',
		heading: 'Инвестируйте в Семберию',
		sub: 'Исследуйте региональный бизнес-потенциал в логистике, сельском хозяйстве, производстве, недвижимости и цифровых услугах.',
		cta: 'Исследовать инвестиции',
		categories: [
			{
				name: 'Логистика',
				desc: 'Регион является логистическим узлом между Белградом, Сараево и Загребом, с доступом к коридору Vc и реке Сава.',
				highlights: ['Доступ к коридору Vc и речному порту', 'Растущий спрос на складские и распределительные центры', 'Квалифицированная рабочая сила в сфере транспорта и логистики']
			},
			{
				name: 'Сельское хозяйство',
				desc: 'Семберия — один из самых плодородных сельскохозяйственных регионов Боснии и Герцеговины, известный зерновыми, овощами и фруктами.',
				highlights: ['Более 40 000 га пахотных земель', 'Сильные традиции земледелия, овощеводства и животноводства', 'Близость к перерабатывающей промышленности и экспортным рынкам']
			},
			{
				name: 'Производство',
				desc: 'Промышленные традиции и доступная рабочая сила делают регион привлекательным для производственных и перерабатывающих предприятий.',
				highlights: ['Более низкие затраты на рабочую силу по сравнению с ЕС', 'Развитая промышленная инфраструктура', 'Льготы для новых производственных объектов']
			},
			{
				name: 'Складирование',
				desc: 'Стратегическое положение на пересечении региональных маршрутов делает Семберию идеальным местом для складских и распределительных центров.',
				highlights: ['Близость к основным транспортным маршрутам', 'Доступные земельные участки для строительства складов', 'Растущий спрос на региональную дистрибуцию']
			},
			{
				name: 'Недвижимость',
				desc: 'Развивающийся рынок недвижимости с возможностями в жилом, коммерческом и промышленном строительстве.',
				highlights: ['Доступные цены на землю по сравнению с регионом', 'Растущий спрос на коммерческие площади', 'Возможности в жилом и туристическом строительстве']
			},
			{
				name: 'Солнечная энергия',
				desc: 'Благоприятные климатические условия и неиспользуемые земли открывают возможности для инвестиций в солнечные электростанции.',
				highlights: ['Большое количество солнечных дней в году', 'Доступные земли для солнечных парков', 'Льготы для возобновляемых источников энергии']
			},
			{
				name: 'Аутсорсинг',
				desc: 'Конкурентные операционные расходы и образованная рабочая сила делают регион привлекательным для аутсорсинговых центров.',
				highlights: ['Конкурентные расходы по сравнению с ЕС', 'Растущий пул образованных специалистов', 'Часовой пояс, удобный для сотрудничества с Европой']
			},
			{
				name: 'Цифровые услуги',
				desc: 'Растущий цифровой сектор с потенциалом для IT-компаний, стартапов и поставщиков цифровых услуг.',
				highlights: ['Растущее число IT-специалистов в регионе', 'Более низкие операционные расходы по сравнению с Западной Европой', 'Поддержка локальной цифровой трансформации']
			}
		],
		detailTag: 'Инвестиционная возможность',
		detailHighlights: 'Ключевые преимущества',
		detailBack: 'Все инвестиционные категории',
		detailInquireHeading: 'Отправить запрос',
		detailInquireSub: 'Заполните форму ниже, и наша команда свяжется с вами по поводу этой инвестиционной возможности.',
		detailPrefill: 'Меня интересует инвестиционная возможность: '
	},
	b2b: {
		label: 'B2B Мэтчмейкинг',
		heading: 'Найдите подходящего бизнес-партнёра',
		sub: 'Наша услуга B2B-мэтчмейкинга соединяет компании из Семберии с партнёрами, поставщиками, дистрибьюторами и инвесторами — в регионе и диаспоре.',
		cta: 'Запросить подбор',
		items: [
			{
				title: 'Найти партнёра',
				desc: 'Ищете стратегического бизнес-партнёра для совместного проекта, расширения или нового рынка? Мы свяжем вас с подходящими компаниями региона.',
				highlights: ['Бизнес-партнёры из Биелины и Семберии', 'Поддержка в переговорах и организации сотрудничества', 'Фокус на долгосрочные партнёрства']
			},
			{
				title: 'Найти дистрибьютора',
				desc: 'Помогаем производителям и брендам найти надёжных дистрибьюторов для новых рынков в регионе и за рубежом.',
				highlights: ['Сеть дистрибьюторов в регионе и диаспоре', 'Поддержка при выходе на новые рынки', 'Проверка надёжности потенциальных партнёров']
			},
			{
				title: 'Найти поставщика',
				desc: 'Соединяем компании с надёжными поставщиками сырья, комплектующих и услуг в Семберии и регионе.',
				highlights: ['Доступ к базе поставщиков региона', 'Сравнение предложений и условий', 'Поддержка в переговорах о ценах и сроках']
			},
			{
				title: 'Найти инвестора',
				desc: 'Представляем ваш бизнес-проект инвесторам из региона и диаспоры, ищущим возможности для вложений.',
				highlights: ['Прямой доступ к заинтересованным инвесторам', 'Помощь в подготовке инвестиционной презентации', 'Конфиденциальность и профессиональная поддержка']
			},
			{
				title: 'Сеть диаспоры',
				desc: 'Соединяем местные компании с предпринимателями из диаспоры для сотрудничества, экспорта и совместных бизнес-возможностей.',
				highlights: ['Доступ к сети бизнесменов диаспоры', 'Возможности для экспорта и международного сотрудничества', 'Поддержка в общении и организации встреч']
			}
		],
		detailTag: 'Услуга мэтчмейкинга',
		detailHighlights: 'Как мы помогаем',
		detailBack: 'Все услуги мэтчмейкинга',
		detailInquireHeading: 'Запросить подбор',
		detailInquireSub: 'Опишите, что вы ищете, и наша команда найдёт для вас подходящие бизнес-контакты.',
		detailPrefill: 'Меня интересует: ',
		processHeading: 'Как проходит знакомство',
		privacyNote: 'Ваши данные используются только для ответа на этот запрос.',
		process: [
			{ title: 'Отправьте запрос', desc: 'Опишите, что вы ищете: тип партнёра, рынок и масштаб сотрудничества.' },
			{ title: 'Подбираем подходящие контакты', desc: 'Наша команда изучает запрос и подбирает компании из региона и диаспоры, которые соответствуют вашим задачам.' },
			{ title: 'Знакомим вас', desc: 'Мы организуем первый контакт и помогаем сотрудничеству начаться в правильном направлении.' }
		]
	},
	services: {
		label: 'Цифровые услуги',
		heading: 'Цифровые решения для современного бизнеса',
		sub: 'Помогаем компаниям расти с помощью современных цифровых инструментов, брендинга, автоматизации и онлайн-видимости.',
		cta: 'Смотреть услуги',
		items: [
			{
				title: 'Веб-разработка',
				desc: 'Современные сайты, платформы и бизнес-системы.',
				highlights: ['Адаптивный дизайн для всех устройств', 'Быстрая загрузка и оптимизированная разработка', 'Масштабируемые решения для роста бизнеса']
			},
			{
				title: 'SEO & Маркетинг',
				desc: 'Цифровая видимость, рост и онлайн-позиционирование.',
				highlights: ['Поисковая оптимизация (SEO)', 'Таргетированные digital-кампании', 'Отслеживание и анализ результатов']
			},
			{
				title: 'AI автоматизация',
				desc: 'Умные решения для автоматизации бизнес-процессов.',
				highlights: ['Автоматизация повторяющихся задач', 'Чат-боты и AI-поддержка клиентов', 'Интеграция с существующими системами']
			},
			{
				title: 'Брендинг & Дизайн',
				desc: 'Премиальный визуальный идентитет и цифровая презентация.',
				highlights: ['Полный визуальный идентитет и логотип', 'Единый бренд на всех каналах', 'Презентации и маркетинговые материалы']
			},
			{
				title: 'CRM & Системы',
				desc: 'Инструменты для лучших продаж, коммуникации и бизнес-организации.',
				highlights: ['Централизованное управление клиентами', 'Автоматизация процесса продаж', 'Улучшенная внутренняя коммуникация и организация']
			},
			{
				title: 'Консалтинг',
				desc: 'Стратегическое консультирование по цифровой трансформации и росту.',
				highlights: ['Анализ текущих операций и процессов', 'Стратегический план цифровой трансформации', 'Поддержка внедрения и отслеживания результатов']
			}
		],
		detailTag: 'Цифровая услуга',
		detailHighlights: 'Что вы получаете',
		detailBack: 'Все цифровые услуги',
		detailInquireHeading: 'Запросить предложение',
		detailInquireSub: 'Заполните форму ниже, и наша команда свяжется с вами с предложением по этой услуге.',
		detailPrefill: 'Меня интересует услуга: '
	},
	news: {
		label: 'Новости',
		heading: 'Деловые и региональные новости',
		sub: 'Фокусируемся исключительно на бизнесе, экономике, инвестициях, технологиях, диаспоре и региональном развитии.',
		categories: ['Бизнес', 'Инвестиции', 'Технологии', 'Диаспора', 'Логистика', 'Сельское хозяйство', 'Недвижимость', 'Стартапы']
	},
	events: {
		label: 'События',
		heading: 'Деловые события и встречи',
		sub: 'Конференции, выставки и деловые встречи в Биелине, Семберии и регионе.',
		typesLabel: 'Что мы будем освещать',
		types: ['Конференции', 'Ярмарки', 'B2B-встречи', 'Семинары и обучение', 'Нетворкинг-встречи', 'Инвестиционные форумы']
	},
	companies: {
		label: 'Каталог',
		heading: 'Избранные компании',
		sub: 'Профессиональные профили компаний из различных секторов региональной экономики',
		showMore: 'Показать больше',
		viewAll: 'Показать все',
		inquire: 'Отправить запрос',
		featured: 'Рекомендуем',
		localTab: 'Местные компании',
		investorsTab: 'Инвесторы и партнёры',
		localSub: 'Компании, зарегистрированные в Биелине и Семберии',
		investorsSub: 'Компании за пределами региона, открытые для B2B-сотрудничества',
		visibilityHeading: 'Сделайте вашу компанию видимой',
		visibilitySub: 'Зарегистрируйте свою компанию на платформе, и вас найдут местные и региональные партнёры.'
	},
	cta: {
		heading: 'Присоединяйтесь к бизнес-сети',
		sub: 'Станьте частью растущей экосистемы, объединяющей компании, инвесторов и диаспору',
		btn: 'Начать'
	},
	footer: {
		tagline: 'Региональная бизнес-сеть.',
		desc: 'Semberija.app — современная региональная бизнес-экосистема, объединяющая компании, инвестиции, диаспору и цифровые возможности.',
		colPlatform: 'Платформа',
		colCompany: 'Компания',
		colContact: 'Контакт',
		address: 'Биелина, Republika Srpska, BiH',
		email: 'info@zoemilano.com',
		copyright: '© 2026 Semberija.app. Все права защищены.',
		newsletter: 'Следите за деловыми новостями'
	},
	adSlot: {
		tag: 'Рекламное место',
		available: 'Свободно',
		title: 'Ваш бренд здесь',
		desc: 'Представьте свою компанию посетителям, которые ищут партнёров в Семберии.',
		cta: 'Забронировать место',
		format: 'Формат'
	},
	ui: {
		explore: 'Исследовать',
		searchPlaceholder: 'Поиск...',
		searchNetwork: 'Поиск в сети...',
		all: 'Все',
		noResults: 'Нет результатов для вашего поиска.',
		noResultsShort: 'Нет результатов.',
		learnMore: 'Узнать больше',
		contactUs: 'Свяжитесь с нами',
		requestQuote: 'Запросить коммерческое предложение',
		freeConsult: 'Бесплатная консультация',
		location: 'Местоположение',
		categories: 'Категории деятельности',
		categoriesSub: 'Найдите компании по сектору и виду деятельности',
		companiesLocal: 'Компании в Биелине и Семберии',
		investorsLabel: 'Инвесторы и партнёры',
		networkTypes: ['Ищу партнёра', 'Ищу дистрибьютора', 'Предлагаю сотрудничество', 'Экспорт продуктов', 'Инвестиционный интерес', 'B2B-запрос'],
		transformHeading: 'Трансформируйте бизнес цифровыми методами',
		transformDesc: 'Свяжитесь с нами для бесплатной консультации. Наша команда поможет вашей компании успешно перейти к цифровым операциям.',
		investSoon: 'Инвестиционные проекты скоро',
		investSoonDesc: 'Мы собираем инвестиционные проекты из региона. Свяжитесь с нами, если у вас есть проект.',
		newsSoon: 'Новости скоро',
		newsSoonDesc: 'Мы создаём тематический деловой новостной поток, посвящённый экономике, инвестициям и региональному развитию. Следите за обновлениями.',
		eventsSoon: 'События скоро появятся',
		eventsSoonDesc: 'Мы собираем деловые конференции, выставки и региональные встречи. Свяжитесь с нами, если вы организуете мероприятие, которое хотите разместить.',
		joinB2b: 'Запросить бизнес-подбор',
		joinB2bDesc: 'Расскажите, что вам нужно — партнёр, поставщик, дистрибьютор или инвестор — и мы свяжем вас с нужными контактами.',
		contact: {
			heading: 'Свяжитесь с нами',
			sub: 'Зарегистрируйте компанию, запросите услугу или отправьте нам сообщение',
			processLabel: 'Как мы обрабатываем запрос',
			process: [
				{ title: 'Вы отправляете запрос', desc: 'Выберите тип запроса и заполните только необходимые поля.' },
				{ title: 'Мы изучаем данные', desc: 'Наша команда рассматривает запрос и при необходимости запрашивает дополнительную информацию.' },
				{ title: 'Отвечаем по email', desc: 'Ответ и предлагаемые следующие шаги мы отправим на указанный вами адрес.' }
			],
			regTitle: 'Регистрация компании',
			regDesc: 'Зарегистрируйте компанию на платформе и увеличьте видимость. Заполните форму, и мы свяжемся с вами в течение 24 часов.',
			digitalTitle: 'Цифровые услуги',
			digitalDesc: 'Интересует сайт, брендинг или другая цифровая услуга? Свяжитесь с нами для бесплатной оценки.',
			advertisingTitle: 'Реклама',
			advertisingDesc: 'Для получения информации о рекламных позициях, ценах и доступности пишите нам напрямую.',
			subject: 'Тема',
			optListing: 'Регистрация компании',
			optService: 'Цифровые услуги',
			optAdvertising: 'Реклама',
			optNetworking: 'Нетворкинг / Возможности',
			optOther: 'Другое',
			fullName: 'Имя и фамилия',
			namePlaceholder: 'Ваше имя',
			emailPlaceholder: 'vasha@email.com',
			companyName: 'Название компании',
			companyPlaceholder: 'Ваша Компания ООО',
			message: 'Сообщение',
			messagePlaceholder: 'Опишите, что вы ищете или что вам нужно...',
			send: 'Отправить сообщение',
			sent: 'Сообщение отправлено!',
			sentDesc: 'Спасибо за интерес. Мы свяжемся с вами в ближайшее время.',
			newMessage: 'Новое сообщение'
		}
	}
};

const de = {
	nav: {
		home: 'Startseite',
		companies: 'Unternehmen',
		investments: 'Investitionen',
		network: 'Netzwerk',
		diaspora: 'B2B',
		services: 'Digitale Dienste',
		news: 'News',
		events: 'Veranstaltungen',
		about: 'Über uns',
		contact: 'Kontakt',
		businessNetwork: 'Business-Netzwerk',
		listCta: 'Plattform beitreten',
		explore: 'Entdecken',
		business: 'Business',
		platform: 'Plattform',
		industries: 'Branchen',
		directory: 'Firmenverzeichnis',
		search: 'Suche',
		b2b: 'B2B-Matchmaking',
		international: 'Internationale Zusammenarbeit',
		enquiries: 'Geschäftsanfragen',
		promote: 'Unternehmen bewerben',
		opportunities: 'Geschäftschancen',
		platformOverview: 'Plattform-Überblick'
	},
	hero: {
		tag: 'Bijeljina · Semberija · Republika Srpska',
		headline: 'Wo Semberija Geschäfte macht. Wir verbinden.',
		sub: 'Wir verbinden Unternehmen, Hersteller, Händler, Investoren und Geschäftspartner über eine digitale Plattform, die neue Möglichkeiten für Zusammenarbeit, Investitionen und internationales Wachstum eröffnet.',
		ctaNetwork: 'Netzwerk erkunden',
		ctaCompanies: 'Unternehmen finden',
		ctaInvest: 'In die Region investieren',
		subheading: 'Regionale Business-Plattform',
		ctaPlatform: 'Plattform entdecken'
	},
	bizSearch: {
		heading: 'Entdecken Sie Geschäftschancen in Bijeljina und Semberija',
		desc: 'Finden Sie Unternehmen, Produkte, Dienstleistungen, Branchen und potenzielle Geschäftspartner an einem Ort.',
		placeholder: 'Unternehmen, Produkte, Dienstleistungen oder Branchen suchen...',
		industry: 'Branche',
		location: 'Standort',
		allIndustries: 'Alle Branchen',
		allLocations: 'Alle Standorte',
		cta: 'Unternehmen suchen',
		popular: 'Beliebte Branchen:'
	},
	ecosystem: {
		label: 'Branchen',
		heading: 'Das Wirtschaftsökosystem von Bijeljina und Semberija',
		desc: 'Von Landwirtschaft und Produktion bis zu Handel, Logistik, Technologie und professionellen Dienstleistungen – entdecken Sie die Unternehmen und Branchen, die die Wirtschaft der Region prägen.',
		companies: 'Unternehmen',
		explore: 'Branche entdecken',
		active: 'Branche',
		clear: 'Filter entfernen',
		sectors: {
			'poljoprivreda-hrana': 'Landwirtschaft & Lebensmittelindustrie',
			'proizvodnja': 'Produktion & Industrie',
			'gradjevina': 'Bau & Immobilien',
			'trgovina': 'Handel & Vertrieb',
			'transport': 'Transport & Logistik',
			'it': 'IT & digitale Dienste',
			'usluge': 'Professionelle Dienstleistungen',
			'turizam': 'Tourismus & Gastgewerbe'
		} as Record<string, string>
	},
	funding: {
		label: 'Plattform',
		heading: 'Förderungen & Anreize',
		desc: 'Entdecken Sie öffentliche Ausschreibungen, Zuschüsse, Subventionen, digitale Gutscheine und Förderprogramme für Unternehmen und Gründer in Bijeljina, der Republika Srpska und Bosnien und Herzegowina.',
		cta: 'Förderungen entdecken',
		formCta: 'Anfrage senden',
		overviewHeading: 'Arten von Förderung und Unterstützung',
		instruments: [
			{ title: 'Öffentliche Ausschreibungen', desc: 'Ausschreibungen von Institutionen und Programmen, die Mittel an Unternehmen, Gründer und Organisationen vergeben.' },
			{ title: 'Zuschüsse', desc: 'Nicht rückzahlbare finanzielle Unterstützung, abhängig von den Voraussetzungen und der zweckgebundenen Verwendung.' },
			{ title: 'Subventionen', desc: 'Anreize für Beschäftigung, Produktion, Landwirtschaft, Export oder Investitionen im Rahmen geltender Programme.' },
			{ title: 'Digitale Gutscheine', desc: 'Ein mögliches Instrument zur Kofinanzierung der Digitalisierung. Die Verfügbarkeit hängt von aktuellen Ausschreibungen und Bedingungen ab.' },
			{ title: 'Förderprogramme', desc: 'Beratungs-, Schulungs- und Entwicklungsunterstützung für KMU und Gründer.' }
		],
		statusHeading: 'Aktueller Stand',
		statusDesc: 'Derzeit veröffentlichen wir keine einzelnen Ausschreibungen auf der Plattform. Sobald sie hinzugefügt werden, enthält jede die offizielle Quelle, die Teilnahmevoraussetzungen, die Frist und das Datum der letzten Überprüfung.',
		disclaimerHeading: 'Wichtig',
		disclaimer: 'Semberija.app und ZOE MILANO sind keine Fördereinrichtung und garantieren keine Bewilligung. Prüfen Sie Bedingungen und Fristen immer bei der offiziellen Quelle der Ausschreibung.',
		zoeHeading: 'Digitalisierung mit ZOE MILANO',
		zoeDesc: 'Für Digitalisierungsprojekte, die die Bedingungen einer Ausschreibung erfüllen, kann ZOE MILANO passende digitale Entwicklungsleistungen erbringen — Websites, Apps, Automatisierung und Systeme.',
		zoeCta: 'Digitale Dienste',
		premiumTag: 'Premium · BandiHub',
		premiumNote: 'Detaillierte Informationen zu Förderungen, Ausschreibungen und digitalen Gutscheinen werden Premium-Mitgliedern zur Verfügung stehen, mit geplantem Zugang auch über die mobile App.',
		soon: 'In Vorbereitung',
		formHeading: 'Förderanfrage',
		formSub: 'Beschreiben Sie Ihr Unternehmen und Ihr Projekt — wir melden uns mit Informationen zu möglichen Förderquellen.',
		prefill: 'Ich interessiere mich für Förder- und Anreizmöglichkeiten für: '
	},
	premium: {
		label: 'Mitgliedschaft',
		heading: 'Premium-Vorteile entdecken',
		desc: 'Für die Nutzung der Plattform genügt die Registrierung. Die Premium-Mitgliedschaft bietet zusätzliche Vorteile — ohne Verpflichtung.',
		items: [
			{ title: 'BandiHub', desc: 'Detaillierte Informationen zu Förderungen, Ausschreibungen und digitalen Gutscheinen.' },
			{ title: 'Erweiterte Funktionen', desc: 'Erweiterter Zugang zu Informationen und Werkzeugen der Plattform.' },
			{ title: 'Mobile App', desc: 'Zugang zu Premium-Inhalten über die geplante mobile App.' }
		],
		optional: 'Premium ist für die Registrierung nicht erforderlich.',
		more: 'Mehr erfahren'
	},
	platform: {
		label: 'Plattform',
		heading: 'Eine Plattform. Mehr Geschäftschancen.',
		desc: 'Semberija.app verbindet Unternehmen aus Bijeljina und der Region Semberija mit Geschäftspartnern, Investoren und internationalen Märkten in einem integrierten digitalen Ökosystem.',
		more: 'Mehr über die Plattform',
		statusDev: 'In Entwicklung',
		statusSoon: 'Demnächst',
		modulesHeading: 'Business-Module der Plattform',
		modules: [
			{ title: 'Firmenverzeichnis', desc: 'Präsentieren Sie Ihr Unternehmen, Ihre Produkte und Dienstleistungen potenziellen Partnern.', detail: 'Das Profil im Verzeichnis zeigt Branche, Standort und Angebot; Unternehmen lassen sich nach Name, Branche und Standort suchen.', cta: 'Unternehmen ansehen' },
			{ title: 'B2B-Matchmaking', desc: 'Finden Sie Lieferanten, Hersteller, Händler und Geschäftspartner.', detail: 'Sagen Sie uns, wen Sie suchen — Partner, Händler, Lieferanten oder Investoren — und wir helfen Ihnen, die passenden Unternehmen zu finden.', cta: 'Partner finden' },
			{ title: 'Investitionen', desc: 'Entdecken Sie Investitionsmöglichkeiten und das Entwicklungspotenzial der Region.', detail: 'Ein Überblick über Investitionsbereiche und Projekte in Bijeljina und Semberija, von Landwirtschaft und Produktion bis zu Energie und Immobilien.', cta: 'Investitionen entdecken' },
			{ title: 'Förderungen & Anreize', desc: 'Entdecken Sie öffentliche Ausschreibungen, Zuschüsse, Subventionen, digitale Gutscheine und Förderprogramme für Unternehmen und Gründer in Bijeljina, der Republika Srpska und Bosnien und Herzegowina.', detail: 'Ein Überblick über öffentliche Förderinstrumente und Unterstützungsprogramme, mit Anfrageformular für Ihr Unternehmen. Getrennt von privaten Investitionsmöglichkeiten.', cta: 'Förderungen entdecken' },
			{ title: 'Internationale Zusammenarbeit', desc: 'Verbinden Sie sich mit Märkten in Serbien, Italien und darüber hinaus.', detail: 'Unser Partner- und Diaspora-Netzwerk öffnet den Weg zu Märkten in Serbien, Italien und weiteren Ländern, mit Unterstützung beim ersten Kontakt.', cta: 'Kontakt anfragen' },
			{ title: 'Geschäftsanfragen', desc: 'Stellen Sie ein Angebot oder eine Anfrage ein und finden Sie Geschäftskontakte.', detail: 'Veröffentlichen Sie, was Sie anbieten oder suchen — Zusammenarbeit, Vertrieb, Investition oder Dienstleistung — und sehen Sie Anfragen anderer Unternehmen.', cta: 'Geschäftsanfrage senden' },
			{ title: 'Unternehmenswerbung', desc: 'Steigern Sie Ihre Sichtbarkeit mit hervorgehobenen Profilen und Werbeplätzen.', detail: 'Hervorgehobene Profile und Werbeplätze auf der Plattform sorgen dafür, dass Partner Ihr Unternehmen zuerst sehen.', cta: 'Unternehmen bewerben' },
			{ title: 'Digitale Dienste', desc: 'Webentwicklung, Apps, Branding, Marketing und Business-Lösungen.', detail: 'Unser Team für digitale Dienste hilft Unternehmen, Online-Präsenz, Vertrieb und Geschäftsprozesse zu verbessern.', cta: 'Dienste ansehen' },
			{ title: 'Mobile App', desc: 'Eine mobile Business-Plattform in Entwicklung.', detail: 'Eine mobile Version der Plattform ist in Entwicklung. Melden Sie sich für den frühen Zugang an und gehören Sie zu den Ersten.', cta: 'Frühen Zugang anfragen' }
		],
		benefitsLabel: 'Vorteile der Registrierung',
		benefitsHeading: 'Warum Ihr Unternehmen registrieren?',
		benefitsDesc: 'Die Registrierung bei Semberija.app öffnet die Tür zu neuen Geschäftskontakten, Partnerschaften und Märkten.',
		benefits: [
			{ title: 'Unternehmensprofil', desc: 'Präsentieren Sie Branche, Produkte und Dienstleistungen an einem Ort.' },
			{ title: 'Sichtbarkeit für Partner', desc: 'Werden Sie von nationalen und internationalen Unternehmen gefunden.' },
			{ title: 'Zugang zu Investoren', desc: 'Präsentieren Sie Entwicklungsprojekte und Investitionsbedarf.' },
			{ title: 'Geschäftsanfragen', desc: 'Senden und empfangen Sie Angebote und Kooperationsanfragen.' },
			{ title: 'Internationales Netzwerk', desc: 'Verbinden Sie sich mit Märkten in Serbien, Italien und der Diaspora.' },
			{ title: 'Digitale Unterstützung', desc: 'Nutzen Sie digitale Dienste für Wachstum und bessere Sichtbarkeit.' }
		],
		joinHeading: 'Bereit für neue Geschäftschancen?',
		joinDesc: 'Treten Sie der Plattform bei und präsentieren Sie Ihr Unternehmen Partnern in der Region und weltweit.'
	},
	joinCta: {
		heading: 'Ihr Unternehmen verdient mehr Sichtbarkeit.',
		desc: 'Präsentieren Sie Ihr Unternehmen, finden Sie neue Partner und öffnen Sie die Tür zu regionaler und internationaler Zusammenarbeit.',
		benefits: ['Unternehmen präsentieren', 'Geschäftspartner finden', 'Neue Chancen entdecken', 'In neue Märkte expandieren'],
		promote: 'Unternehmen bewerben'
	},
	howItWorks: {
		label: 'So funktioniert\'s',
		heading: 'Von der Sichtbarkeit zur Zusammenarbeit.',
		online: 'Online verfügbar',
		manual: 'Auf Anfrage',
		note: 'Mit „Auf Anfrage“ markierte Schritte werden derzeit mit Unterstützung unseres Teams erledigt — Sie senden uns Ihre Angaben oder Anfrage, und wir begleiten Sie weiter.',
		steps: [
			{ title: 'Unternehmen registrieren', desc: 'Senden Sie die wichtigsten Angaben zu Ihrem Unternehmen über das Kontaktformular. Profile werden derzeit von unserem Team angelegt — die Selbstregistrierung ist in Vorbereitung.', link: 'Angaben senden' },
			{ title: 'Produkte, Dienstleistungen und Geschäftsbedarf präsentieren', desc: 'Teilen Sie uns mit, was Sie anbieten und suchen. Auf Basis Ihrer Angaben erstellen wir Ihr Profil im Firmenverzeichnis.', link: '' },
			{ title: 'Potenzielle Partner finden', desc: 'Suchen Sie Unternehmen nach Name, Branche und Standort oder entdecken Sie Branchen und Investoren.', link: 'Unternehmen suchen' },
			{ title: 'Geschäftliche Zusammenarbeit starten', desc: 'Senden Sie eine Geschäftsanfrage oder fragen Sie einen Kontakt an — unser Team begleitet den ersten Kontakt mit dem Unternehmen.', link: 'Geschäftsanfrage senden' }
		]
	},
	regions: {
		label: 'Regionale Plattformen',
		heading: 'Wir verbinden Regionen. Wir öffnen neue Märkte.',
		desc: 'Semberija.app ist Teil der umfassenderen Vision von ZOE MILANO, regionale digitale Plattformen zu entwickeln, die Unternehmen, Märkte und internationale Geschäftschancen verbinden.',
		cta: 'Plattform besuchen',
		attribution: 'Digitale Plattformen entwickelt von ZOE MILANO.',
		prev: 'Vorherige Plattform',
		next: 'Nächste Plattform',
		newTab: '(öffnet in neuem Tab)',
		slide: 'Plattform',
		items: {
			lombardia: 'Eine digitale Business-Plattform für Unternehmen, Investitionen und internationale Zusammenarbeit in der Lombardei.',
			veneto: 'Eine regionale digitale Plattform für Geschäftskontakte und Entwicklung in der italienischen Region Venetien.',
			ibiza: 'Eine digitale Plattform für Ibiza, die lokale Unternehmen, Dienstleistungen und Chancen auf der Insel verbindet.',
			liguria: 'Eine regionale digitale Plattform für Unternehmen, Tourismus und Zusammenarbeit in Ligurien.',
			montalcino: 'Eine digitale Plattform für Montalcino und die Toskana: Weinbau, lokale Produktion und Geschäftskontakte.',
			sannio: 'Eine regionale Plattform für Sannio in Kampanien, für lokale Unternehmen und die Entwicklung der Region.',
			fvgitalia: 'Eine digitale Business-Plattform für Friaul-Julisch Venetien und seine Unternehmen, Märkte und Partnerschaften.'
		} as Record<string, string>
	},
	aboutPage: {
		label: 'Über uns',
		heading: 'Semberija.app — Von Bijeljina in die Welt.',
		intro: [
			'Semberija.app ist eine regionale digitale Business-Plattform, die Unternehmen, Unternehmer, Investoren und Geschäftspartner aus Bijeljina und Semberija mit regionalen und internationalen Märkten verbindet.',
			'Die Plattform entstand aus einer persönlichen Verbundenheit mit Bijeljina und der Überzeugung, dass ihr wirtschaftliches Potenzial mehr Sichtbarkeit verdient.'
		],
		platform: {
			label: 'Über die Plattform',
			heading: 'Mehr als ein Firmenverzeichnis',
			body: [
				'Semberija.app entwickelt ein digitales Ökosystem für Unternehmenspräsentation, Geschäftskontakte, Investitionen und internationale Zusammenarbeit.',
				'Unser Ziel ist es, lokalen Unternehmen mehr digitale Sichtbarkeit und einen leichteren Zugang zu neuen Geschäftskontakten und Märkten zu ermöglichen.'
			]
		},
		vision: {
			label: 'Unsere Vision',
			heading: 'Lokales Potenzial. Internationale Chancen.',
			body: [
				'Bijeljina und Semberija verfügen über eine starke Tradition in Landwirtschaft, Produktion, Handel und Unternehmertum.',
				'Wir sind überzeugt, dass die hochwertigen Produkte, das Wissen und die wirtschaftlichen Kapazitäten dieser Region auch auf dem internationalen Markt ihren Platz finden können.',
				'Unsere Vision ist es, durch moderne Technologie, professionelle Vermarktung und Geschäftsvernetzung zu mehr Sichtbarkeit und Entwicklung der regionalen Wirtschaft beizutragen.'
			]
		},
		offer: {
			label: 'Die Plattform',
			heading: 'Was Semberija.app bietet',
			items: [
				'Präsentation von Unternehmen und Dienstleistungen',
				'Geschäfts- und B2B-Vernetzung',
				'Investitionsmöglichkeiten',
				'Internationale Zusammenarbeit',
				'Digitale Vermarktung und Entwicklung'
			],
			closing: 'Semberija.app entsteht als langfristige digitale Infrastruktur, die Unternehmen, Märkte und Geschäftschancen verbindet.'
		},
		founder: {
			label: 'Über die Gründerin',
			name: 'Zorana Petrović',
			role: 'Gründerin von Semberija.app | Founder & CEO, ZOE MILANO d.o.o.',
			places: 'Belgrad · Mailand · Bijeljina',
			body: [
				'Semberija.app entstand auf Initiative von Zorana Petrović, Unternehmerin und Kreativstrategin, Gründerin und Geschäftsführerin von ZOE MILANO.',
				'Sie ist in Mailand aufgewachsen und hat dort ihre Ausbildung erhalten; ihre berufliche Erfahrung umfasst kreative Entwicklung, digitale Plattformen, Marketing und internationale Projekte.',
				'Mit Bijeljina verbinden sie familiäre Wurzeln. Ihre Mutter, Prof. Zorica Petrović, wurde in Bijeljina geboren, ebenso wie weitere Mitglieder ihrer Familie. Zum Familienerbe gehört auch ihre Großmutter, die im Zweiten Weltkrieg für ihre Tapferkeit ausgezeichnet wurde.',
				'Zorana kommt seit Jahren nach Bijeljina und erkennt aus eigener Erfahrung das Potenzial der lokalen Produktion, des Unternehmertums und der wirtschaftlichen Entwicklung.',
				'Aus dieser Verbundenheit entstand die Idee, internationale Erfahrung, digitale Technologie und modernes Marketing für eine bessere Präsentation Bijeljinas und seiner Wirtschaft zu nutzen.'
			],
			quoteLabel: 'Die Vision der Gründerin',
			quote: '„Bijeljina ist eine Stadt, mit der mich familiäre Wurzeln verbinden und in die ich seit Jahren zurückkehre. Ich bin überzeugt, dass die Unternehmen, Produkte und Menschen dieser Region mehr internationale Sichtbarkeit verdienen. Semberija.app ist aus dem Wunsch entstanden, dieses Potenzial mit neuen Märkten und Geschäftschancen zu verbinden.“',
			quoteRole: 'Gründerin, Semberija.app'
		},
		zoe: {
			label: 'ZOE MILANO',
			heading: 'Idee, Kreativität und Technologie',
			body: [
				'Semberija.app ist ein Projekt der ZOE MILANO d.o.o. aus Belgrad, die digitale Plattformen, mobile Apps, B2B-Ökosysteme und internationale Geschäftsprojekte entwickelt.',
				'Das Unternehmen verbindet kreative Strategie, Technologie, digitales Marketing und Geschäftsentwicklung, um moderne digitale Lösungen für Unternehmen und Märkte zu schaffen.'
			],
			credits: [
				{
					label: 'Idee und Gründerin',
					value: 'Zorana Petrović'
				},
				{
					label: 'Entwicklung der Plattform',
					value: 'ZOE MILANO d.o.o.'
				}
			],
			cta: 'ZOE MILANO besuchen'
		},
		future: {
			label: 'Unsere Zukunft',
			heading: 'Von Bijeljina zu neuen Märkten',
			body: [
				'Semberija.app wurde geschaffen, um das lokale wirtschaftliche Potenzial mit regionalen und internationalen Chancen zu verbinden.',
				'Wir möchten Unternehmen aus Bijeljina und Semberija einen Raum für professionelle Präsentation, Vermarktung und neue Geschäftskontakte bieten.'
			],
			closing: 'Das ist erst der Anfang.'
		},
		cta: {
			heading: 'Werden Sie Teil der wirtschaftlichen Zukunft Bijeljinas.',
			desc: 'Präsentieren Sie Ihr Unternehmen, vernetzen Sie sich mit potenziellen Partnern und entdecken Sie neue Chancen für Wachstum.',
			contact: 'Kontaktieren Sie uns'
		}
	},
	enquiry: {
		typeLabel: 'Art der Anfrage',
		types: {
			registracija: 'Unternehmensregistrierung',
			preuzimanje: 'Unternehmensprofil beanspruchen',
			b2b: 'B2B-Kontakte',
			oglasavanje: 'Werbung und Promotion',
			medjunarodna: 'Internationale Zusammenarbeit',
			usluge: 'Digitale Dienste',
			ostalo: 'Sonstiges'
		},
		hints: {
			registracija: 'Senden Sie uns Ihre Unternehmensdaten — unser Team erstellt Ihr Profil im Firmenverzeichnis.',
			preuzimanje: 'Ist Ihr Unternehmen bereits gelistet? Beanspruchen Sie das Profil, um die Angaben zu bestätigen und zu ergänzen.',
			b2b: 'Beschreiben Sie, welchen Partner Sie suchen — Lieferant, Händler, Hersteller oder Investor.',
			oglasavanje: 'Fordern Sie ein Angebot für ein hervorgehobenes Profil, Banner oder andere Werbeplätze an.',
			medjunarodna: 'Sagen Sie uns, welche Märkte Sie interessieren — Serbien, Italien oder darüber hinaus.',
			usluge: 'Webentwicklung, Apps, Branding und Marketing — beschreiben Sie Ihren Bedarf.',
			ostalo: 'Senden Sie uns eine Nachricht, wir melden uns bei Ihnen.'
		},
		companySection: 'Unternehmensdaten',
		contactSection: 'Kontaktdaten',
		industry: 'Branche',
		industryPlaceholder: 'Branche auswählen',
		industryOther: 'Andere Branche',
		location: 'Standort',
		locationPlaceholder: 'z. B. Bijeljina',
		website: 'Website',
		phone: 'Telefon',
		products: 'Produkte und Dienstleistungen',
		productsPlaceholder: 'Was stellt Ihr Unternehmen her oder bietet es an?',
		offers: 'Geschäftsangebot',
		offersPlaceholder: 'Was Sie Partnern bieten — Kapazitäten, Kooperation, Vertrieb...',
		interests: 'Partnerschaftsinteressen',
		interestsPlaceholder: 'Welche Partner oder Zusammenarbeit suchen Sie?',
		markets: 'Zielmärkte',
		marketsPlaceholder: 'z. B. Serbien, Italien, EU',
		role: 'Ihre Funktion im Unternehmen',
		rolePlaceholder: 'z. B. Geschäftsführer, Inhaber',
		optional: 'optional'
	},
	listing: {
		public: 'Öffentliche Quellen',
		verified: 'Verifiziertes Mitglied',
		publicHint: 'Die Angaben stammen aus öffentlich zugänglichen Quellen.',
		verifiedHint: 'Das Unternehmen ist registriert und hat seine Angaben bestätigt.',
		claim: 'Ihr Unternehmen? Profil beanspruchen',
		inquire: 'Anfrage senden'
	},
	advertising: {
		title: 'Werbung',
		formatsHeading: 'Werbeformate',
		options: [
			{ title: 'Slider auf der Startseite', desc: 'Ihr Visual und Ihre Botschaft ganz oben auf der Startseite — für jeden Besucher sofort sichtbar.' },
			{ title: 'Hervorgehobenes Profil', desc: 'Ihr Unternehmen erscheint bevorzugt in Suchen, Kategorien und Empfehlungen der Plattform.' },
			{ title: 'Bannerwerbung', desc: 'Statische oder animierte Banner an gut sichtbaren Stellen der Plattform.' },
			{ title: 'Gesponserte Kategorie', desc: 'Branden Sie eine ganze Kategorie und werden Sie die erste Wahl der Kunden in dieser Branche.' }
		],
		audienceHeading: 'Erreichen Sie das richtige Business-Publikum',
		audienceDesc: 'Semberija.app wird von Unternehmern, Managern und Entscheidern in der Region genutzt. Ihre Werbung erreicht genau dieses Publikum — lokal, präzise, professionell.',
		benefits: ['Gezieltes B2B-Publikum', 'Professioneller Kontext', 'Regionale Markenbekanntheit', 'Flexible Formate und Platzierungen']
	},
	promo: {
		label: 'Promotion',
		heading: 'Bewerben Sie Ihr Unternehmen auf Semberija.app',
		desc: 'Steigern Sie die Sichtbarkeit Ihres Unternehmens mit hervorgehobenen Profilen, digitaler Werbung und Werbemöglichkeiten.',
		cta: 'Angebot anfordern'
	},
	seo: {
		homeTitle: 'Semberija.app | Business-Plattform für Bijeljina & Semberija',
		homeDesc: 'Entdecken Sie Unternehmen, Geschäftspartner, Investitionsmöglichkeiten und B2B-Kontakte in Bijeljina und der Region Semberija.',
		aboutTitle: 'Über uns | Semberija.app — Vision & Gründerin',
		platformTitle: 'Plattform | Semberija.app — B2B-Kontakte & Investitionen'
	},
	legal: {
		statement: 'Semberija.app ist eine unabhängige, privat entwickelte digitale Business-Plattform, betrieben von ZOE MILANO d.o.o. Sie ist keine offizielle Website der Stadt Bijeljina oder einer Behörde.',
		copyright: '© 2026 Semberija.app — Entwickelt und betrieben von ZOE MILANO d.o.o.',
		langNotice: 'Die rechtlichen Dokumente sind derzeit auf Englisch verfügbar.',
		privacy: 'Datenschutz',
		terms: 'Nutzungsbedingungen',
		cookies: 'Cookies',
		gdpr: 'DSGVO',
		disclaimer: 'Haftungsausschluss'
	},
	networking: {
		heading: 'B2B-Networking',
		sub: 'Vernetzen Sie sich mit Partnern, Investoren und Kooperationspartnern in der Region.',
		types: ['Alle', 'Partnerschaft', 'Investition', 'Zusammenarbeit'],
		contact: 'Kontaktieren',
		proposalHeading: 'Haben Sie einen Geschäftsvorschlag?',
		proposalDesc: 'Veröffentlichen Sie Ihre Geschäftsidee oder Ihren Bedarf und finden Sie die richtigen Partner.',
		kindsHeading: 'Was Sie veröffentlichen können'
	},
	opportunities: {
		sub: 'Investitionen, Partnerschaften und Kooperationen aus Bijeljina und Semberija an einem Ort.',
		kindsHeading: 'Arten von Chancen',
		kinds: [
			{ title: 'Investition', desc: 'Projekte mit Kapitalbedarf — von Produktion und Landwirtschaft bis Immobilien und Energie.' },
			{ title: 'Partnerschaft', desc: 'Chancen für gemeinsame Projekte, Vertrieb und den Eintritt in neue Märkte.' },
			{ title: 'Zusammenarbeit', desc: 'Langfristige Geschäftsbeziehungen, Dienstleistungen und Outsourcing zwischen Unternehmen.' }
		],
		postLabel: 'Eigene veröffentlichen',
		postHeading: 'Haben Sie eine Geschäftschance oder Idee?',
		postDesc: 'Veröffentlichen Sie eine Investition, Partnerschaft oder Kooperation und finden Sie über das Semberija.app-Netzwerk die richtigen Partner.',
		interested: 'Ich bin interessiert'
	},
	board: {
		enqTitle: 'Noch keine Geschäftsanfragen veröffentlicht',
		enqDesc: 'Seien Sie der Erste: Senden Sie uns ein Angebot oder eine Anfrage — unser Team veröffentlicht sie und verbindet Sie mit interessierten Unternehmen.',
		oppTitle: 'Die ersten Geschäftschancen werden vorbereitet',
		oppDesc: 'Sie haben ein Investitionsprojekt, ein Partnerschafts- oder Kooperationsangebot? Senden Sie uns die Details, wir präsentieren es auf der Plattform.',
		submit: 'Geschäftsanfrage senden',
		submitOpp: 'Chance präsentieren'
	},
	formStatus: {
		notConfigured: 'Das Senden über das Formular ist derzeit nicht verfügbar. Bitte schreiben Sie uns direkt an:',
		sendFailed: 'Ihre Nachricht wurde wegen eines technischen Fehlers nicht gesendet. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an:',
		invalid: 'Bitte prüfen Sie Name, E-Mail-Adresse und Nachricht und versuchen Sie es erneut.',
		sending: 'Wird gesendet...'
	},
	stats: [
		{ value: '', label: 'Unternehmen im Verzeichnis' },
		{ value: '', label: 'Wirtschaftssektoren' },
		{ value: '', label: 'Investitionsbereiche' },
		{ value: 'EU', label: 'Exportmärkte' }
	],
	why: {
		label: 'Vorteile',
		heading: 'Warum Bijeljina und Semberija?',
		sub: 'Bijeljina und die Region Semberija stehen für eine starke Tradition in Unternehmertum, Produktion und Landwirtschaft sowie für neue Chancen der Geschäftsentwicklung.',
		items: [
			{ icon: 'location', title: 'Strategische Lage', desc: 'Eine Region zwischen den wichtigsten Balkanmärkten und europäischen Geschäftsrouten.' },
			{ icon: 'growth', title: 'Geschäftsentwicklung', desc: 'Ein wachsendes Umfeld für Produktion, Logistik, Dienstleistungen und Unternehmertum.' },
			{ icon: 'agriculture', title: 'Landwirtschaft & Produktion', desc: 'Starkes regionales Potenzial in Landwirtschaft, Lebensmittelproduktion und Verarbeitung.' },
			{ icon: 'diaspora', title: 'Diaspora-Verbindungen', desc: 'Verbindung der globalen Diaspora mit lokalen Unternehmen, Kapital und Chancen.' },
			{ icon: 'digital', title: 'Digitale Entwicklung', desc: 'Unterstützung von Technologie, digitalen Diensten und moderner Unternehmenstransformation.' }
		]
	},
	network: {
		label: 'Ökosystem',
		heading: 'Business-Netzwerk der Region',
		sub: 'Ein Ort, an dem Unternehmen, Investoren, Diaspora und Partner sich vernetzen, zusammenarbeiten und wachsen.',
		items: [
			{ title: 'Partnerschaften', desc: 'Unternehmen mit neuen Geschäftspartnern und Kooperationsmöglichkeiten verbinden.' },
			{ title: 'Distributoren', desc: 'Unternehmen helfen, regionale und internationale Vertriebspartner zu finden.' },
			{ title: 'Investitionen', desc: 'Investitionsprojekte, Geschäftsideen und Entwicklungspotenzial präsentieren.' },
			{ title: 'B2B-Verbindungen', desc: 'Direkte Verbindung zwischen Unternehmen, Diensten, Lieferanten und Märkten.' }
		]
	},
	investments: {
		label: 'Investitionen',
		heading: 'Investieren Sie in Semberija',
		sub: 'Erkunden Sie regionales Geschäftspotenzial in Logistik, Landwirtschaft, Produktion, Immobilien und digitalen Diensten.',
		cta: 'Investitionen erkunden',
		categories: [
			{
				name: 'Logistik',
				desc: 'Die Region ist ein Logistikknotenpunkt zwischen Belgrad, Sarajevo und Zagreb mit Zugang zum Korridor Vc und dem Fluss Save.',
				highlights: ['Zugang zum Korridor Vc und zum Flusshafen', 'Wachsende Nachfrage nach Lager- und Distributionszentren', 'Qualifizierte Arbeitskräfte im Transport- und Logistikbereich']
			},
			{
				name: 'Landwirtschaft',
				desc: 'Semberija ist eine der fruchtbarsten landwirtschaftlichen Regionen Bosnien und Herzegowinas, bekannt für Getreide, Gemüse und Obst.',
				highlights: ['Über 40.000 Hektar Ackerland', 'Starke Tradition im Ackerbau, Gemüseanbau und in der Viehzucht', 'Nähe zur Verarbeitungsindustrie und zu Exportmärkten']
			},
			{
				name: 'Produktion',
				desc: 'Eine industrielle Tradition und verfügbare Arbeitskräfte machen die Region attraktiv für Produktionsstätten und die Verarbeitungsindustrie.',
				highlights: ['Niedrigere Arbeitskosten im Vergleich zur EU', 'Entwickelte industrielle Infrastruktur', 'Anreize für neue Produktionsstätten']
			},
			{
				name: 'Lagerung',
				desc: 'Eine strategische Lage am Kreuzungspunkt regionaler Routen macht Semberija zu einem idealen Standort für Lager- und Distributionszentren.',
				highlights: ['Nähe zu wichtigen Transportrouten', 'Verfügbare Flächen für den Bau von Lagerkapazitäten', 'Wachsender Bedarf an regionaler Distribution']
			},
			{
				name: 'Immobilien',
				desc: 'Ein sich entwickelnder Immobilienmarkt mit Chancen im Wohn-, Gewerbe- und Industriebau.',
				highlights: ['Erschwingliche Grundstückspreise im regionalen Vergleich', 'Wachsende Nachfrage nach Gewerbeflächen', 'Chancen im Wohnbau und Tourismussektor']
			},
			{
				name: 'Solarenergie',
				desc: 'Günstige klimatische Bedingungen und ungenutzte Flächen eröffnen Investitionsmöglichkeiten in Solarkraftwerke.',
				highlights: ['Hohe Anzahl an Sonnentagen pro Jahr', 'Verfügbare Flächen für Solarparks', 'Anreize für erneuerbare Energien']
			},
			{
				name: 'Outsourcing',
				desc: 'Wettbewerbsfähige Betriebskosten und gut ausgebildete Arbeitskräfte machen die Region attraktiv für Outsourcing-Zentren.',
				highlights: ['Wettbewerbsfähige Kosten im Vergleich zur EU', 'Wachsender Pool gut ausgebildeter Fachkräfte', 'Zeitzone, die die Zusammenarbeit mit Europa erleichtert']
			},
			{
				name: 'Digitale Dienste',
				desc: 'Ein wachsender digitaler Sektor mit Potenzial für IT-Unternehmen, Startups und Anbieter digitaler Dienstleistungen.',
				highlights: ['Wachsende Zahl von IT-Fachkräften in der Region', 'Niedrigere Betriebskosten im Vergleich zu Westeuropa', 'Unterstützung der lokalen digitalen Transformation']
			}
		],
		detailTag: 'Investitionsmöglichkeit',
		detailHighlights: 'Wichtigste Vorteile',
		detailBack: 'Alle Investitionskategorien',
		detailInquireHeading: 'Anfrage senden',
		detailInquireSub: 'Füllen Sie das Formular unten aus, und unser Team wird sich bezüglich dieser Investitionsmöglichkeit bei Ihnen melden.',
		detailPrefill: 'Ich interessiere mich für die Investitionsmöglichkeit: '
	},
	b2b: {
		label: 'B2B Matchmaking',
		heading: 'Finden Sie den richtigen Geschäftspartner',
		sub: 'Unser B2B-Matchmaking-Service verbindet Unternehmen aus Semberija mit Partnern, Lieferanten, Vertriebspartnern und Investoren — in der Region und der Diaspora.',
		cta: 'Matching anfragen',
		items: [
			{
				title: 'Partner finden',
				desc: 'Suchen Sie einen strategischen Geschäftspartner für ein gemeinsames Projekt, eine Expansion oder einen neuen Markt? Wir verbinden Sie mit passenden Unternehmen aus der Region.',
				highlights: ['Geschäftspartner aus Bijeljina und Semberija', 'Unterstützung bei Verhandlungen und beim Aufbau der Zusammenarbeit', 'Fokus auf langfristige Partnerschaften']
			},
			{
				title: 'Vertriebspartner finden',
				desc: 'Wir helfen Herstellern und Marken, zuverlässige Vertriebspartner für neue Märkte in der Region und im Ausland zu finden.',
				highlights: ['Vertriebsnetzwerk in der Region und der Diaspora', 'Unterstützung beim Markteintritt', 'Zuverlässigkeitsprüfung potenzieller Partner']
			},
			{
				title: 'Lieferanten finden',
				desc: 'Wir verbinden Unternehmen mit zuverlässigen Lieferanten für Rohstoffe, Komponenten und Dienstleistungen in Semberija und der Region.',
				highlights: ['Zugang zu einer regionalen Lieferantenbasis', 'Vergleich von Angeboten und Konditionen', 'Unterstützung bei Preis- und Terminverhandlungen']
			},
			{
				title: 'Investor finden',
				desc: 'Wir präsentieren Ihr Geschäftsprojekt Investoren aus der Region und der Diaspora, die nach Investitionsmöglichkeiten suchen.',
				highlights: ['Direkter Zugang zu interessierten Investoren', 'Unterstützung bei der Erstellung Ihres Investment-Pitches', 'Diskretion und professionelle Unterstützung']
			},
			{
				title: 'Diaspora-Netzwerk',
				desc: 'Wir verbinden lokale Unternehmen mit Unternehmern aus der Diaspora für Zusammenarbeit, Export und gemeinsame Geschäftsmöglichkeiten.',
				highlights: ['Zugang zu einem Netzwerk von Geschäftsleuten der Diaspora', 'Möglichkeiten für Export und internationale Zusammenarbeit', 'Unterstützung bei Kommunikation und Terminorganisation']
			}
		],
		detailTag: 'Matchmaking-Service',
		detailHighlights: 'Wie wir helfen',
		detailBack: 'Alle Matchmaking-Services',
		detailInquireHeading: 'Matching anfragen',
		detailInquireSub: 'Beschreiben Sie, wonach Sie suchen, und unser Team findet die passenden Geschäftskontakte für Sie.',
		detailPrefill: 'Ich interessiere mich für: ',
		processHeading: 'So funktioniert die Vermittlung',
		privacyNote: 'Ihre Daten werden nur zur Beantwortung dieser Anfrage verwendet.',
		process: [
			{ title: 'Anfrage senden', desc: 'Beschreiben Sie, was Sie suchen: Art des Partners, Markt und Umfang der Zusammenarbeit.' },
			{ title: 'Wir wählen passende Kontakte', desc: 'Unser Team prüft die Anfrage und wählt Unternehmen aus der Region und der Diaspora, die zu Ihren Anforderungen passen.' },
			{ title: 'Wir bringen Sie zusammen', desc: 'Wir vermitteln den ersten Kontakt und helfen, dass die Zusammenarbeit in die richtige Richtung startet.' }
		]
	},
	services: {
		label: 'Digitale Dienste',
		heading: 'Digitale Lösungen für modernes Business',
		sub: 'Unternehmen beim Wachstum durch moderne digitale Tools, Branding, Automatisierung und Online-Sichtbarkeit unterstützen.',
		cta: 'Dienstleistungen ansehen',
		items: [
			{
				title: 'Webentwicklung',
				desc: 'Moderne Websites, Plattformen und Geschäftssysteme.',
				highlights: ['Responsives Design für alle Geräte', 'Schnelle Ladezeiten und optimierte Entwicklung', 'Skalierbare Lösungen, die mit Ihrem Unternehmen wachsen']
			},
			{
				title: 'SEO & Marketing',
				desc: 'Digitale Sichtbarkeit, Wachstum und Online-Positionierung.',
				highlights: ['Suchmaschinenoptimierung (SEO)', 'Zielgerichtete digitale Kampagnen', 'Erfolgsmessung und Analyse']
			},
			{
				title: 'KI-Automatisierung',
				desc: 'Intelligente Lösungen zur Automatisierung von Geschäftsprozessen.',
				highlights: ['Automatisierung wiederkehrender Aufgaben', 'Chatbots und KI-gestützter Kundensupport', 'Integration in bestehende Systeme']
			},
			{
				title: 'Branding & Design',
				desc: 'Premium visuelle Identität und digitale Präsentation.',
				highlights: ['Vollständige visuelle Identität und Logo', 'Einheitlicher Markenauftritt über alle Kanäle', 'Präsentationen und Marketingmaterialien']
			},
			{
				title: 'CRM & Systeme',
				desc: 'Tools für bessere Verkäufe, Kommunikation und Geschäftsorganisation.',
				highlights: ['Zentrales Kundenmanagement', 'Automatisierung des Vertriebsprozesses', 'Bessere interne Kommunikation und Organisation']
			},
			{
				title: 'Beratung',
				desc: 'Strategische Beratung für digitale Transformation und Wachstum.',
				highlights: ['Analyse aktueller Abläufe und Prozesse', 'Strategischer Plan zur digitalen Transformation', 'Unterstützung bei Umsetzung und Erfolgskontrolle']
			}
		],
		detailTag: 'Digitale Dienstleistung',
		detailHighlights: 'Was Sie erhalten',
		detailBack: 'Alle digitalen Dienste',
		detailInquireHeading: 'Angebot anfordern',
		detailInquireSub: 'Füllen Sie das Formular unten aus, und unser Team meldet sich mit einem Angebot für diesen Service bei Ihnen.',
		detailPrefill: 'Ich interessiere mich für den Service: '
	},
	news: {
		label: 'News',
		heading: 'Business & regionale News',
		sub: 'Ausschließlich auf Business, Wirtschaft, Investitionen, Technologie, Diaspora und regionale Entwicklung fokussiert.',
		categories: ['Business', 'Investitionen', 'Technologie', 'Diaspora', 'Logistik', 'Landwirtschaft', 'Immobilien', 'Startups']
	},
	events: {
		label: 'Veranstaltungen',
		heading: 'Geschäftsveranstaltungen & Treffen',
		sub: 'Konferenzen, Messen und Geschäftstreffen in Bijeljina, Semberija und der Region.',
		typesLabel: 'Was wir abdecken',
		types: ['Konferenzen', 'Messen', 'B2B-Treffen', 'Workshops & Schulungen', 'Networking-Treffen', 'Investitionsforen']
	},
	companies: {
		label: 'Verzeichnis',
		heading: 'Ausgewählte Unternehmen',
		sub: 'Professionelle Unternehmensprofile aus der regionalen Wirtschaft',
		showMore: 'Mehr anzeigen',
		viewAll: 'Alle anzeigen',
		inquire: 'Anfrage senden',
		featured: 'Empfohlen',
		localTab: 'Lokale Unternehmen',
		investorsTab: 'Investoren & Partner',
		localSub: 'In Bijeljina und Semberija registrierte Unternehmen',
		investorsSub: 'Unternehmen außerhalb der Region, offen für B2B-Kooperation',
		visibilityHeading: 'Machen Sie Ihr Unternehmen sichtbar',
		visibilitySub: 'Registrieren Sie Ihr Unternehmen auf der Plattform und werden Sie von lokalen und regionalen Partnern entdeckt.'
	},
	cta: {
		heading: 'Dem Business-Netzwerk beitreten',
		sub: 'Teil eines wachsenden Ökosystems werden, das Unternehmen, Investoren und Diaspora verbindet',
		btn: 'Jetzt starten'
	},
	footer: {
		tagline: 'Regionales Business-Netzwerk.',
		desc: 'Semberija.app ist ein modernes regionales Business-Ökosystem, das Unternehmen, Investitionen, Diaspora und digitale Chancen verbindet.',
		colPlatform: 'Plattform',
		colCompany: 'Unternehmen',
		colContact: 'Kontakt',
		address: 'Bijeljina, Republika Srpska, BiH',
		email: 'info@zoemilano.com',
		copyright: '© 2026 Semberija.app. Alle Rechte vorbehalten.',
		newsletter: 'Business-News verfolgen'
	},
	adSlot: {
		tag: 'Werbefläche',
		available: 'Verfügbar',
		title: 'Ihre Marke hier',
		desc: 'Präsentieren Sie Ihr Unternehmen Besuchern, die Partner in Semberija suchen.',
		cta: 'Fläche reservieren',
		format: 'Format'
	},
	ui: {
		explore: 'Erkunden',
		searchPlaceholder: 'Suchen...',
		searchNetwork: 'Netzwerk durchsuchen...',
		all: 'Alle',
		noResults: 'Keine Ergebnisse für Ihre Suche.',
		noResultsShort: 'Keine Ergebnisse.',
		learnMore: 'Mehr erfahren',
		contactUs: 'Kontaktieren Sie uns',
		requestQuote: 'Angebot anfordern',
		freeConsult: 'Kostenlose Beratung',
		location: 'Standort',
		categories: 'Geschäftskategorien',
		categoriesSub: 'Finden Sie Unternehmen nach Sektor und Tätigkeitsart',
		companiesLocal: 'Unternehmen in Bijeljina & Semberija',
		investorsLabel: 'Investoren & Partner',
		networkTypes: ['Suche Partner', 'Suche Distributor', 'Biete Kooperation', 'Exportprodukte', 'Investitionsinteresse', 'B2B-Anfrage'],
		transformHeading: 'Transformieren Sie Ihr Unternehmen digital',
		transformDesc: 'Kontaktieren Sie uns für eine kostenlose Beratung. Unser Team hilft Ihrem Unternehmen beim erfolgreichen Übergang zum digitalen Betrieb.',
		investSoon: 'Investitionsprojekte demnächst',
		investSoonDesc: 'Wir sammeln Investitionsprojekte aus der Region. Kontaktieren Sie uns, wenn Sie ein Projekt haben.',
		newsSoon: 'News demnächst',
		newsSoonDesc: 'Wir bauen einen kuratierten Business-News-Feed auf, der sich auf Wirtschaft, Investitionen und regionale Entwicklung konzentriert. Bleiben Sie dran.',
		eventsSoon: 'Veranstaltungen folgen bald',
		eventsSoonDesc: 'Wir stellen eine Übersicht über Wirtschaftskonferenzen, Messen und regionale Treffen zusammen. Kontaktieren Sie uns, wenn Sie eine Veranstaltung vorstellen möchten.',
		joinB2b: 'Business-Matching anfragen',
		joinB2bDesc: 'Sagen Sie uns, was Sie brauchen — einen Partner, Lieferanten, Vertriebspartner oder Investor — und wir verbinden Sie mit den richtigen Kontakten.',
		contact: {
			heading: 'Kontaktieren Sie uns',
			sub: 'Registrieren Sie Ihr Unternehmen, fordern Sie einen Service an oder senden Sie uns eine Nachricht',
			processLabel: 'So bearbeiten wir Ihre Anfrage',
			process: [
				{ title: 'Sie senden eine Anfrage', desc: 'Wählen Sie die Art der Anfrage und füllen Sie nur die nötigen Felder aus.' },
				{ title: 'Wir prüfen die Angaben', desc: 'Unser Team prüft Ihre Anfrage und fragt bei Bedarf nach weiteren Informationen.' },
				{ title: 'Wir antworten per E-Mail', desc: 'Antwort und vorgeschlagene nächste Schritte senden wir an die angegebene Adresse.' }
			],
			regTitle: 'Unternehmensregistrierung',
			regDesc: 'Registrieren Sie Ihr Unternehmen auf der Plattform und erhöhen Sie die Sichtbarkeit. Füllen Sie das Formular aus und wir kontaktieren Sie innerhalb von 24 Stunden.',
			digitalTitle: 'Digitale Dienste',
			digitalDesc: 'Interessiert an einer Website, Branding oder einem anderen digitalen Service? Kontaktieren Sie uns für eine kostenlose Bewertung.',
			advertisingTitle: 'Werbung',
			advertisingDesc: 'Für Informationen zu Werbepositionen, Preisen und Verfügbarkeit schreiben Sie uns direkt.',
			subject: 'Betreff',
			optListing: 'Unternehmensregistrierung',
			optService: 'Digitale Dienste',
			optAdvertising: 'Werbung',
			optNetworking: 'Vernetzung / Chancen',
			optOther: 'Sonstiges',
			fullName: 'Vor- und Nachname',
			namePlaceholder: 'Ihr Name',
			emailPlaceholder: 'ihre@email.com',
			companyName: 'Unternehmensname',
			companyPlaceholder: 'Ihr Unternehmen GmbH',
			message: 'Nachricht',
			messagePlaceholder: 'Beschreiben Sie, was Sie suchen oder was Sie benötigen...',
			send: 'Nachricht senden',
			sent: 'Nachricht gesendet!',
			sentDesc: 'Vielen Dank für Ihr Interesse. Wir werden Sie in Kürze kontaktieren.',
			newMessage: 'Neue Nachricht'
		}
	}
};

type Translations = typeof sr;

const translations: Record<Lang, Translations> = { sr, en, it, ru, de };

export const langMeta: Record<Lang, { label: string }> = {
	sr: { label: 'Srpski' },
	en: { label: 'English' },
	it: { label: 'Italiano' },
	ru: { label: 'Русский' },
	de: { label: 'Deutsch' }
};

class I18nStore {
	lang = $state<Lang>('sr');

	get t(): Translations {
		return translations[this.lang];
	}

	setLang(lang: Lang) {
		this.lang = lang;
	}

	toggle() {
		const order: Lang[] = ['sr', 'en', 'it', 'ru', 'de'];
		this.lang = order[(order.indexOf(this.lang) + 1) % order.length];
	}
}

export const i18n = new I18nStore();

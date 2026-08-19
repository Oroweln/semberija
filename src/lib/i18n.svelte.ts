export type Lang = 'sr' | 'en' | 'it' | 'ru' | 'de';

const sr = {
	nav: {
		home: 'Početna',
		companies: 'Firme',
		investments: 'Investicije',
		network: 'Mreža',
		diaspora: 'B2B',
		services: 'Digitalne usluge',
		news: 'Vijesti',
		events: 'Događaji',
		about: 'O nama',
		contact: 'Kontakt',
		businessNetwork: 'Poslovna mreža',
		listCta: 'Pridruži se mreži'
	},
	hero: {
		tag: 'Bijeljina · Semberija · Republika Srpska',
		headline: 'Regionalna poslovna mreža',
		sub: 'Povezujemo kompanije, investicije, dijasporu i digitalne prilike u jednom ekosistemu.',
		ctaNetwork: 'Istraži mrežu',
		ctaCompanies: 'Pregledaj firme',
		ctaInvest: 'Investiraj u regiju'
	},
	stats: [
		{ value: '50+', label: 'Registrovanih firmi' },
		{ value: '15', label: 'Poslovnih kategorija' },
		{ value: '8', label: 'Investicionih projekata' },
		{ value: 'EU', label: 'Izvozna tržišta' }
	],
	why: {
		label: 'Prednosti',
		heading: 'Zašto Semberija',
		items: [
			{
				icon: 'location',
				title: 'Strateška lokacija',
				desc: 'Regija pozicionirana između ključnih balkanskih tržišta i evropskih poslovnih ruta.'
			},
			{
				icon: 'growth',
				title: 'Poslovni rast',
				desc: 'Rastuće okruženje za proizvodnju, logistiku, usluge i preduzetništvo.'
			},
			{
				icon: 'agriculture',
				title: 'Poljoprivreda i proizvodnja',
				desc: 'Snažan regionalni potencijal u poljoprivredi, prehrambenoj industriji i preradi.'
			},
			{
				icon: 'diaspora',
				title: 'Dijaspora mreža',
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
				desc: 'Tražite strateškog poslovnog partnera za zajednički projekat, širenje ili novo tržište? Povezujemo vas sa provjerenim kompanijama.',
				highlights: ['Provjereni poslovni partneri iz regije', 'Podrška u pregovorima i uspostavljanju saradnje', 'Fokus na dugoročna partnerstva']
			},
			{
				title: 'Pronađite distributera',
				desc: 'Pomažemo proizvođačima i brendovima da pronađu pouzdane distributere za nova tržišta u regiji i inostranstvu.',
				highlights: ['Mreža distributera u regiji i dijaspori', 'Podrška pri izlasku na nova tržišta', 'Provjera pouzdanosti potencijalnih partnera']
			},
			{
				title: 'Pronađite dobavljača',
				desc: 'Povezujemo kompanije sa pouzdanim dobavljačima sirovina, materijala i usluga u Semberiji i regionu.',
				highlights: ['Pristup provjerenoj bazi dobavljača', 'Poređenje ponuda i uslova', 'Podrška u pregovaranju cijena i rokova']
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
		detailPrefill: 'Zainteresovan/a sam za: '
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
		sub: 'Konferencije, sajmovi i poslovna okupljanja u Bijeljini, Semberiji i regionu.'
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
	about: {
		label: 'O nama',
		heading: 'O platformi Semberija.app',
		sub: 'Regionalni poslovni ekosistem koji povezuje kompanije, investitore i dijasporu Bijeljine i Semberije.',
		storyHeading: 'Naša priča',
		story: [
			'Semberija.app je nastala sa ciljem da poslovnoj zajednici Bijeljine i Semberije pruži jedinstven digitalni prostor za predstavljanje, povezivanje i rast.',
			'Vjerujemo da regija ima ogroman potencijal — u poljoprivredi, proizvodnji, logistici i digitalnim uslugama — i da taj potencijal zaslužuje platformu koja ga čini vidljivim lokalno i globalno.'
		],
		values: [
			{ title: 'Regionalni fokus', desc: 'Posvećeni smo isključivo poslovnoj zajednici Bijeljine i Semberije.' },
			{ title: 'Transparentnost', desc: 'Jasne informacije o firmama, prilikama i investicijama, bez posrednika.' },
			{ title: 'Povezivanje', desc: 'Spajamo lokalne kompanije, investitore i dijasporu na jednom mjestu.' },
			{ title: 'Digitalni rast', desc: 'Podstičemo modernizaciju i digitalnu transformaciju regionalnog biznisa.' }
		],
		ctaHeading: 'Postanite dio naše mreže',
		ctaSub: 'Registrujte svoju firmu ili nas kontaktirajte za više informacija o saradnji.',
		ctaBtn: 'Kontaktirajte nas'
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
		investments: 'Investments',
		network: 'Network',
		diaspora: 'B2B',
		services: 'Digital Services',
		news: 'News',
		events: 'Events',
		about: 'About',
		contact: 'Contact',
		businessNetwork: 'Business Network',
		listCta: 'Join the Network'
	},
	hero: {
		tag: 'Bijeljina · Semberija · Republic of Srpska',
		headline: 'Regional Business Network',
		sub: 'Connecting companies, investments, diaspora and digital opportunities across the region.',
		ctaNetwork: 'Explore Network',
		ctaCompanies: 'View Companies',
		ctaInvest: 'Invest in the Region'
	},
	stats: [
		{ value: '50+', label: 'Registered Companies' },
		{ value: '15', label: 'Business Categories' },
		{ value: '8', label: 'Investment Projects' },
		{ value: 'EU', label: 'Export Markets' }
	],
	why: {
		label: 'Advantages',
		heading: 'Why Semberija',
		items: [
			{
				icon: 'location',
				title: 'Strategic Location',
				desc: 'A region positioned between key Balkan markets and European business routes.'
			},
			{
				icon: 'growth',
				title: 'Business Growth',
				desc: 'A growing environment for production, logistics, services and entrepreneurship.'
			},
			{
				icon: 'agriculture',
				title: 'Agriculture & Production',
				desc: 'Strong regional potential in agriculture, food production and processing.'
			},
			{
				icon: 'diaspora',
				title: 'Diaspora Network',
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
				desc: 'Looking for a strategic business partner for a joint project, expansion or new market? We connect you with vetted companies.',
				highlights: ['Vetted business partners from the region', 'Support in negotiations and setting up cooperation', 'Focus on long-term partnerships']
			},
			{
				title: 'Find a Distributor',
				desc: 'We help manufacturers and brands find reliable distributors for new markets in the region and abroad.',
				highlights: ['Distributor network across the region and diaspora', 'Support entering new markets', 'Reliability checks on potential partners']
			},
			{
				title: 'Find a Supplier',
				desc: 'We connect companies with reliable suppliers of raw materials, components and services in Semberija and the region.',
				highlights: ['Access to a vetted supplier base', 'Comparison of offers and terms', 'Support negotiating prices and deadlines']
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
		detailPrefill: 'I am interested in: '
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
		sub: 'Conferences, fairs and business gatherings in Bijeljina, Semberija and the region.'
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
	about: {
		label: 'About Us',
		heading: 'About Semberija.app',
		sub: 'A regional business ecosystem connecting companies, investors and diaspora across Bijeljina and Semberija.',
		storyHeading: 'Our Story',
		story: [
			'Semberija.app was created to give the business community of Bijeljina and Semberija a single digital space to present themselves, connect and grow.',
			'We believe the region holds enormous potential — in agriculture, production, logistics and digital services — and that potential deserves a platform that makes it visible both locally and globally.'
		],
		values: [
			{ title: 'Regional Focus', desc: 'We are dedicated exclusively to the business community of Bijeljina and Semberija.' },
			{ title: 'Transparency', desc: 'Clear information about companies, opportunities and investments, without middlemen.' },
			{ title: 'Connection', desc: 'Bringing local companies, investors and diaspora together in one place.' },
			{ title: 'Digital Growth', desc: 'Encouraging modernization and digital transformation of regional business.' }
		],
		ctaHeading: 'Become Part of Our Network',
		ctaSub: 'Register your company or contact us to learn more about collaboration.',
		ctaBtn: 'Contact Us'
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
		listCta: 'Unisciti alla rete'
	},
	hero: {
		tag: 'Bijeljina · Semberija · Repubblica Srpska',
		headline: 'Rete Business Regionale',
		sub: 'Collegare aziende, investimenti, diaspora e opportunità digitali in tutta la regione.',
		ctaNetwork: 'Esplora la rete',
		ctaCompanies: 'Vedi aziende',
		ctaInvest: 'Investi nella regione'
	},
	stats: [
		{ value: '50+', label: 'Aziende registrate' },
		{ value: '15', label: 'Categorie business' },
		{ value: '8', label: 'Progetti di investimento' },
		{ value: 'UE', label: 'Mercati di esportazione' }
	],
	why: {
		label: 'Vantaggi',
		heading: 'Perché Semberija',
		items: [
			{ icon: 'location', title: 'Posizione strategica', desc: 'Una regione posizionata tra i principali mercati balcanici e le rotte commerciali europee.' },
			{ icon: 'growth', title: 'Crescita aziendale', desc: 'Un ambiente in crescita per produzione, logistica, servizi e imprenditoria.' },
			{ icon: 'agriculture', title: 'Agricoltura e produzione', desc: 'Forte potenziale regionale in agricoltura, produzione alimentare e trasformazione.' },
			{ icon: 'diaspora', title: 'Rete diaspora', desc: 'Collegare la diaspora globale con aziende locali, capitali e opportunità.' },
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
				desc: 'Cerchi un partner commerciale strategico per un progetto congiunto, un\'espansione o un nuovo mercato? Ti mettiamo in contatto con aziende verificate.',
				highlights: ['Partner commerciali verificati nella regione', 'Supporto nelle trattative e nell\'avvio della collaborazione', 'Focus su partnership di lungo termine']
			},
			{
				title: 'Trova un distributore',
				desc: 'Aiutiamo produttori e brand a trovare distributori affidabili per nuovi mercati nella regione e all\'estero.',
				highlights: ['Rete di distributori nella regione e nella diaspora', 'Supporto nell\'ingresso in nuovi mercati', 'Verifica dell\'affidabilità dei potenziali partner']
			},
			{
				title: 'Trova un fornitore',
				desc: 'Colleghiamo le aziende con fornitori affidabili di materie prime, componenti e servizi a Semberija e nella regione.',
				highlights: ['Accesso a una base di fornitori verificati', 'Confronto di offerte e condizioni', 'Supporto nella negoziazione di prezzi e tempistiche']
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
		detailPrefill: 'Sono interessato/a a: '
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
		sub: 'Conferenze, fiere e incontri aziendali a Bijeljina, Semberija e nella regione.'
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
	about: {
		label: 'Chi siamo',
		heading: 'Chi è Semberija.app',
		sub: 'Un ecosistema commerciale regionale che collega aziende, investitori e la diaspora di Bijeljina e Semberija.',
		storyHeading: 'La nostra storia',
		story: [
			'Semberija.app è nata per offrire alla comunità imprenditoriale di Bijeljina e Semberija uno spazio digitale unico per presentarsi, connettersi e crescere.',
			'Crediamo che la regione abbia un enorme potenziale — nell\'agricoltura, nella produzione, nella logistica e nei servizi digitali — un potenziale che merita una piattaforma capace di renderlo visibile a livello locale e globale.'
		],
		values: [
			{ title: 'Focus regionale', desc: 'Ci dedichiamo esclusivamente alla comunità imprenditoriale di Bijeljina e Semberija.' },
			{ title: 'Trasparenza', desc: 'Informazioni chiare su aziende, opportunità e investimenti, senza intermediari.' },
			{ title: 'Connessione', desc: 'Uniamo aziende locali, investitori e diaspora in un unico luogo.' },
			{ title: 'Crescita digitale', desc: 'Promuoviamo la modernizzazione e la trasformazione digitale del business regionale.' }
		],
		ctaHeading: 'Entra a far parte della nostra rete',
		ctaSub: 'Registra la tua azienda o contattaci per saperne di più sulla collaborazione.',
		ctaBtn: 'Contattaci'
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
		listCta: 'Присоединиться к сети'
	},
	hero: {
		tag: 'Биелина · Семберия · Республика Сербская',
		headline: 'Региональная бизнес-сеть',
		sub: 'Объединяем компании, инвестиции, диаспору и цифровые возможности в одной экосистеме.',
		ctaNetwork: 'Исследовать сеть',
		ctaCompanies: 'Смотреть компании',
		ctaInvest: 'Инвестировать в регион'
	},
	stats: [
		{ value: '50+', label: 'Зарегистрированных компаний' },
		{ value: '15', label: 'Бизнес-категорий' },
		{ value: '8', label: 'Инвестиционных проектов' },
		{ value: 'ЕС', label: 'Экспортные рынки' }
	],
	why: {
		label: 'Преимущества',
		heading: 'Почему Семберия',
		items: [
			{ icon: 'location', title: 'Стратегическое расположение', desc: 'Регион между ключевыми балканскими рынками и европейскими деловыми маршрутами.' },
			{ icon: 'growth', title: 'Деловой рост', desc: 'Растущая среда для производства, логистики, услуг и предпринимательства.' },
			{ icon: 'agriculture', title: 'Сельское хозяйство и производство', desc: 'Сильный региональный потенциал в сельском хозяйстве, пищевой промышленности и переработке.' },
			{ icon: 'diaspora', title: 'Сеть диаспоры', desc: 'Соединяем глобальную диаспору с местными компаниями, капиталом и возможностями.' },
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
				desc: 'Ищете стратегического бизнес-партнёра для совместного проекта, расширения или нового рынка? Мы свяжем вас с проверенными компаниями.',
				highlights: ['Проверенные бизнес-партнёры из региона', 'Поддержка в переговорах и организации сотрудничества', 'Фокус на долгосрочные партнёрства']
			},
			{
				title: 'Найти дистрибьютора',
				desc: 'Помогаем производителям и брендам найти надёжных дистрибьюторов для новых рынков в регионе и за рубежом.',
				highlights: ['Сеть дистрибьюторов в регионе и диаспоре', 'Поддержка при выходе на новые рынки', 'Проверка надёжности потенциальных партнёров']
			},
			{
				title: 'Найти поставщика',
				desc: 'Соединяем компании с надёжными поставщиками сырья, комплектующих и услуг в Семберии и регионе.',
				highlights: ['Доступ к проверенной базе поставщиков', 'Сравнение предложений и условий', 'Поддержка в переговорах о ценах и сроках']
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
		detailPrefill: 'Меня интересует: '
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
		sub: 'Конференции, выставки и деловые встречи в Биелине, Семберии и регионе.'
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
	about: {
		label: 'О нас',
		heading: 'О платформе Semberija.app',
		sub: 'Региональная бизнес-экосистема, объединяющая компании, инвесторов и диаспору Биелины и Семберии.',
		storyHeading: 'Наша история',
		story: [
			'Semberija.app была создана, чтобы дать деловому сообществу Биелины и Семберии единое цифровое пространство для представления, взаимодействия и роста.',
			'Мы верим, что регион обладает огромным потенциалом — в сельском хозяйстве, производстве, логистике и цифровых услугах — и этот потенциал заслуживает платформы, которая сделает его видимым как локально, так и на мировом уровне.'
		],
		values: [
			{ title: 'Региональный фокус', desc: 'Мы работаем исключительно с деловым сообществом Биелины и Семберии.' },
			{ title: 'Прозрачность', desc: 'Понятная информация о компаниях, возможностях и инвестициях без посредников.' },
			{ title: 'Связь', desc: 'Объединяем местные компании, инвесторов и диаспору в одном месте.' },
			{ title: 'Цифровой рост', desc: 'Поддерживаем модернизацию и цифровую трансформацию регионального бизнеса.' }
		],
		ctaHeading: 'Станьте частью нашей сети',
		ctaSub: 'Зарегистрируйте свою компанию или свяжитесь с нами, чтобы узнать больше о сотрудничестве.',
		ctaBtn: 'Связаться с нами'
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
		listCta: 'Netzwerk beitreten'
	},
	hero: {
		tag: 'Bijeljina · Semberija · Republika Srpska',
		headline: 'Regionales Business-Netzwerk',
		sub: 'Wir verbinden Unternehmen, Investitionen, Diaspora und digitale Chancen in einer Region.',
		ctaNetwork: 'Netzwerk erkunden',
		ctaCompanies: 'Unternehmen ansehen',
		ctaInvest: 'In die Region investieren'
	},
	stats: [
		{ value: '50+', label: 'Registrierte Unternehmen' },
		{ value: '15', label: 'Business-Kategorien' },
		{ value: '8', label: 'Investitionsprojekte' },
		{ value: 'EU', label: 'Exportmärkte' }
	],
	why: {
		label: 'Vorteile',
		heading: 'Warum Semberija',
		items: [
			{ icon: 'location', title: 'Strategische Lage', desc: 'Eine Region zwischen den wichtigsten Balkanmärkten und europäischen Geschäftsrouten.' },
			{ icon: 'growth', title: 'Unternehmenswachstum', desc: 'Ein wachsendes Umfeld für Produktion, Logistik, Dienstleistungen und Unternehmertum.' },
			{ icon: 'agriculture', title: 'Landwirtschaft & Produktion', desc: 'Starkes regionales Potenzial in Landwirtschaft, Lebensmittelproduktion und Verarbeitung.' },
			{ icon: 'diaspora', title: 'Diaspora-Netzwerk', desc: 'Verbindung der globalen Diaspora mit lokalen Unternehmen, Kapital und Chancen.' },
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
				desc: 'Suchen Sie einen strategischen Geschäftspartner für ein gemeinsames Projekt, eine Expansion oder einen neuen Markt? Wir verbinden Sie mit geprüften Unternehmen.',
				highlights: ['Geprüfte Geschäftspartner aus der Region', 'Unterstützung bei Verhandlungen und beim Aufbau der Zusammenarbeit', 'Fokus auf langfristige Partnerschaften']
			},
			{
				title: 'Vertriebspartner finden',
				desc: 'Wir helfen Herstellern und Marken, zuverlässige Vertriebspartner für neue Märkte in der Region und im Ausland zu finden.',
				highlights: ['Vertriebsnetzwerk in der Region und der Diaspora', 'Unterstützung beim Markteintritt', 'Zuverlässigkeitsprüfung potenzieller Partner']
			},
			{
				title: 'Lieferanten finden',
				desc: 'Wir verbinden Unternehmen mit zuverlässigen Lieferanten für Rohstoffe, Komponenten und Dienstleistungen in Semberija und der Region.',
				highlights: ['Zugang zu einer geprüften Lieferantenbasis', 'Vergleich von Angeboten und Konditionen', 'Unterstützung bei Preis- und Terminverhandlungen']
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
		detailPrefill: 'Ich interessiere mich für: '
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
		sub: 'Konferenzen, Messen und Geschäftstreffen in Bijeljina, Semberija und der Region.'
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
	about: {
		label: 'Über uns',
		heading: 'Über Semberija.app',
		sub: 'Ein regionales Business-Ökosystem, das Unternehmen, Investoren und die Diaspora aus Bijeljina und Semberija verbindet.',
		storyHeading: 'Unsere Geschichte',
		story: [
			'Semberija.app wurde geschaffen, um der Geschäftswelt von Bijeljina und Semberija einen einzigen digitalen Raum zur Präsentation, Vernetzung und Weiterentwicklung zu bieten.',
			'Wir glauben, dass die Region ein enormes Potenzial besitzt — in der Landwirtschaft, Produktion, Logistik und bei digitalen Dienstleistungen — und dass dieses Potenzial eine Plattform verdient, die es lokal wie global sichtbar macht.'
		],
		values: [
			{ title: 'Regionaler Fokus', desc: 'Wir widmen uns ausschließlich der Geschäftswelt von Bijeljina und Semberija.' },
			{ title: 'Transparenz', desc: 'Klare Informationen über Unternehmen, Möglichkeiten und Investitionen, ohne Vermittler.' },
			{ title: 'Vernetzung', desc: 'Wir bringen lokale Unternehmen, Investoren und die Diaspora an einem Ort zusammen.' },
			{ title: 'Digitales Wachstum', desc: 'Wir fördern die Modernisierung und digitale Transformation des regionalen Geschäftslebens.' }
		],
		ctaHeading: 'Werden Sie Teil unseres Netzwerks',
		ctaSub: 'Registrieren Sie Ihr Unternehmen oder kontaktieren Sie uns für weitere Informationen zur Zusammenarbeit.',
		ctaBtn: 'Kontaktieren Sie uns'
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

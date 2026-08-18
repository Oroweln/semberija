export type Lang = 'sr' | 'en' | 'it' | 'ru' | 'de';

const sr = {
	nav: {
		home: 'Početna',
		companies: 'Firme',
		investments: 'Investicije',
		network: 'Mreža',
		diaspora: 'Dijaspora',
		services: 'Digitalne usluge',
		news: 'Vijesti',
		contact: 'Kontakt',
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
		label: 'Zašto Semberija',
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
		label: 'Poslovna mreža',
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
		categories: ['Logistika', 'Poljoprivreda', 'Proizvodnja', 'Skladišta', 'Nekretnine', 'Solarna energija', 'Outsourcing', 'Digitalne usluge'],
		cta: 'Istražite investicije'
	},
	diaspora: {
		label: 'Dijaspora',
		heading: 'Dijaspora i regionalne veze',
		sub: 'Povezujemo dijasporu sa lokalnim poslovanjem, investicionim prilikama i regionalnim razvojem.',
		items: ['Investiraj kod kuće', 'Poslovno umrežavanje', 'Dijaspora biznis klub', 'Regionalni događaji', 'Investor Matching'],
		cta: 'Pridruži se dijaspora mreži'
	},
	services: {
		label: 'Digitalne usluge',
		heading: 'Digitalna rješenja za moderno poslovanje',
		sub: 'Pomažemo kompanijama da rastu kroz moderne digitalne alate, brendiranje, automatizaciju i online vidljivost.',
		items: [
			{ title: 'Web razvoj', desc: 'Moderne web stranice, platforme i poslovni sistemi.' },
			{ title: 'SEO & Marketing', desc: 'Digitalna vidljivost, rast i online pozicioniranje.' },
			{ title: 'AI automatizacija', desc: 'Pametna rješenja za automatizaciju poslovnih procesa.' },
			{ title: 'Brendiranje & dizajn', desc: 'Premium vizualni identitet i digitalna prezentacija.' },
			{ title: 'CRM & sistemi', desc: 'Alati za bolje prodaje, komunikaciju i poslovnu organizaciju.' },
			{ title: 'Konsalting', desc: 'Strateško savjetovanje za digitalnu transformaciju i rast.' }
		]
	},
	news: {
		label: 'Vijesti',
		heading: 'Poslovne & regionalne vijesti',
		sub: 'Fokusirani isključivo na biznis, ekonomiju, investicije, tehnologiju, dijasporu i regionalni razvoj.',
		categories: ['Biznis', 'Investicije', 'Tehnologija', 'Dijaspora', 'Logistika', 'Poljoprivreda', 'Nekretnine', 'Startup scena']
	},
	companies: {
		heading: 'Istaknute firme',
		sub: 'Profesionalni profili kompanija iz različitih sektora privrede',
		viewAll: 'Sve firme',
		inquire: 'Pošalji upit',
		featured: 'Istaknuto',
		localTab: 'Domaće firme',
		investorsTab: 'Investitori i partneri',
		localSub: 'Kompanije registrovane u Bijeljini i Semberiji',
		investorsSub: 'Kompanije van regije otvorene za B2B saradnju'
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
		email: 'info@semberija.app',
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
		joinDiaspora: 'Pridruži se dijaspora mreži',
		joinDiasporaDesc: 'Povežite se sa regionalnim kompanijama, investicionim prilikama i poslovnom zajednicom dijaspore.',
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
		diaspora: 'Diaspora',
		services: 'Digital Services',
		news: 'News',
		contact: 'Contact',
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
		label: 'Why Semberija',
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
		label: 'Business Network',
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
		categories: ['Logistics', 'Agriculture', 'Production', 'Warehousing', 'Real Estate', 'Solar Energy', 'Outsourcing', 'Digital Services'],
		cta: 'Explore Investments'
	},
	diaspora: {
		label: 'Diaspora',
		heading: 'Diaspora & Regional Connections',
		sub: 'Connecting diaspora with local business, investment opportunities and regional development.',
		items: ['Invest Back Home', 'Business Networking', 'Diaspora Business Club', 'Regional Events', 'Investor Matching'],
		cta: 'Join Diaspora Network'
	},
	services: {
		label: 'Digital Services',
		heading: 'Digital Solutions for Modern Business',
		sub: 'Helping companies grow through modern digital tools, branding, automation and online visibility.',
		items: [
			{ title: 'Web Development', desc: 'Modern websites, platforms and business systems.' },
			{ title: 'SEO & Marketing', desc: 'Digital visibility, growth and online positioning.' },
			{ title: 'AI Automation', desc: 'Smart solutions for business process automation.' },
			{ title: 'Branding & Design', desc: 'Premium visual identity and digital presentation.' },
			{ title: 'CRM & Systems', desc: 'Tools for better sales, communication and business organization.' },
			{ title: 'Consulting', desc: 'Strategic advisory for digital transformation and growth.' }
		]
	},
	news: {
		label: 'News',
		heading: 'Business & Regional News',
		sub: 'Focused exclusively on business, economy, investments, technology, diaspora and regional development.',
		categories: ['Business', 'Investments', 'Technology', 'Diaspora', 'Logistics', 'Agriculture', 'Real Estate', 'Startup Scene']
	},
	companies: {
		heading: 'Featured Companies',
		sub: 'Professional company profiles from across the regional economy',
		viewAll: 'All Companies',
		inquire: 'Send Inquiry',
		featured: 'Featured',
		localTab: 'Local Businesses',
		investorsTab: 'Investors & Partners',
		localSub: 'Companies registered in Bijeljina and Semberija',
		investorsSub: 'Companies outside the region open to B2B cooperation'
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
		email: 'info@semberija.app',
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
		joinDiaspora: 'Join the Diaspora Network',
		joinDiasporaDesc: 'Connect with regional companies, investment opportunities and the diaspora business community.',
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
		diaspora: 'Diaspora',
		services: 'Servizi Digitali',
		news: 'News',
		contact: 'Contatti',
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
		label: 'Perché Semberija',
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
		label: 'Rete aziendale',
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
		categories: ['Logistica', 'Agricoltura', 'Produzione', 'Magazzinaggio', 'Immobiliare', 'Energia solare', 'Outsourcing', 'Servizi digitali'],
		cta: 'Esplora investimenti'
	},
	diaspora: {
		label: 'Diaspora',
		heading: 'Diaspora e connessioni regionali',
		sub: 'Connettere la diaspora con il business locale, le opportunità di investimento e lo sviluppo regionale.',
		items: ['Investi a casa', 'Networking aziendale', 'Diaspora Business Club', 'Eventi regionali', 'Investor Matching'],
		cta: 'Unisciti alla rete diaspora'
	},
	services: {
		label: 'Servizi digitali',
		heading: 'Soluzioni digitali per il business moderno',
		sub: 'Aiutare le aziende a crescere attraverso strumenti digitali moderni, branding, automazione e visibilità online.',
		items: [
			{ title: 'Sviluppo web', desc: 'Siti web moderni, piattaforme e sistemi aziendali.' },
			{ title: 'SEO & Marketing', desc: 'Visibilità digitale, crescita e posizionamento online.' },
			{ title: 'Automazione AI', desc: 'Soluzioni intelligenti per l\'automazione dei processi aziendali.' },
			{ title: 'Branding & Design', desc: 'Identità visiva premium e presentazione digitale.' },
			{ title: 'CRM & Sistemi', desc: 'Strumenti per vendite migliori, comunicazione e organizzazione aziendale.' },
			{ title: 'Consulenza', desc: 'Consulenza strategica per la trasformazione digitale e la crescita.' }
		]
	},
	news: {
		label: 'News',
		heading: 'News aziendali e regionali',
		sub: 'Focalizzati esclusivamente su business, economia, investimenti, tecnologia, diaspora e sviluppo regionale.',
		categories: ['Business', 'Investimenti', 'Tecnologia', 'Diaspora', 'Logistica', 'Agricoltura', 'Immobiliare', 'Startup']
	},
	companies: {
		heading: 'Aziende in evidenza',
		sub: 'Profili aziendali professionali dall\'economia regionale',
		viewAll: 'Tutte le aziende',
		inquire: 'Invia richiesta',
		featured: 'In evidenza',
		localTab: 'Aziende locali',
		investorsTab: 'Investitori e partner',
		localSub: 'Aziende registrate a Bijeljina e Semberija',
		investorsSub: 'Aziende esterne alla regione aperte alla cooperazione B2B'
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
		email: 'info@semberija.app',
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
		joinDiaspora: 'Unisciti alla rete diaspora',
		joinDiasporaDesc: 'Connettiti con aziende regionali, opportunità di investimento e la comunità aziendale della diaspora.',
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
		diaspora: 'Диаспора',
		services: 'Цифровые услуги',
		news: 'Новости',
		contact: 'Контакт',
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
		label: 'Почему Семберия',
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
		label: 'Бизнес-сеть',
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
		categories: ['Логистика', 'Сельское хозяйство', 'Производство', 'Складирование', 'Недвижимость', 'Солнечная энергия', 'Аутсорсинг', 'Цифровые услуги'],
		cta: 'Исследовать инвестиции'
	},
	diaspora: {
		label: 'Диаспора',
		heading: 'Диаспора и региональные связи',
		sub: 'Соединяем диаспору с местным бизнесом, инвестиционными возможностями и региональным развитием.',
		items: ['Инвестируй на родине', 'Деловой нетворкинг', 'Бизнес-клуб диаспоры', 'Региональные события', 'Подбор инвесторов'],
		cta: 'Присоединиться к сети диаспоры'
	},
	services: {
		label: 'Цифровые услуги',
		heading: 'Цифровые решения для современного бизнеса',
		sub: 'Помогаем компаниям расти с помощью современных цифровых инструментов, брендинга, автоматизации и онлайн-видимости.',
		items: [
			{ title: 'Веб-разработка', desc: 'Современные сайты, платформы и бизнес-системы.' },
			{ title: 'SEO & Маркетинг', desc: 'Цифровая видимость, рост и онлайн-позиционирование.' },
			{ title: 'AI автоматизация', desc: 'Умные решения для автоматизации бизнес-процессов.' },
			{ title: 'Брендинг & Дизайн', desc: 'Премиальный визуальный идентитет и цифровая презентация.' },
			{ title: 'CRM & Системы', desc: 'Инструменты для лучших продаж, коммуникации и бизнес-организации.' },
			{ title: 'Консалтинг', desc: 'Стратегическое консультирование по цифровой трансформации и росту.' }
		]
	},
	news: {
		label: 'Новости',
		heading: 'Деловые и региональные новости',
		sub: 'Фокусируемся исключительно на бизнесе, экономике, инвестициях, технологиях, диаспоре и региональном развитии.',
		categories: ['Бизнес', 'Инвестиции', 'Технологии', 'Диаспора', 'Логистика', 'Сельское хозяйство', 'Недвижимость', 'Стартапы']
	},
	companies: {
		heading: 'Избранные компании',
		sub: 'Профессиональные профили компаний из различных секторов региональной экономики',
		viewAll: 'Все компании',
		inquire: 'Отправить запрос',
		featured: 'Рекомендуем',
		localTab: 'Местные компании',
		investorsTab: 'Инвесторы и партнёры',
		localSub: 'Компании, зарегистрированные в Биелине и Семберии',
		investorsSub: 'Компании за пределами региона, открытые для B2B-сотрудничества'
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
		email: 'info@semberija.app',
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
		joinDiaspora: 'Присоединиться к сети диаспоры',
		joinDiasporaDesc: 'Свяжитесь с региональными компаниями, инвестиционными возможностями и деловым сообществом диаспоры.',
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
		diaspora: 'Diaspora',
		services: 'Digitale Dienste',
		news: 'News',
		contact: 'Kontakt',
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
		label: 'Warum Semberija',
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
		label: 'Business-Netzwerk',
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
		categories: ['Logistik', 'Landwirtschaft', 'Produktion', 'Lagerung', 'Immobilien', 'Solarenergie', 'Outsourcing', 'Digitale Dienste'],
		cta: 'Investitionen erkunden'
	},
	diaspora: {
		label: 'Diaspora',
		heading: 'Diaspora & regionale Verbindungen',
		sub: 'Verbindung der Diaspora mit lokalem Business, Investitionsmöglichkeiten und regionalem Entwicklung.',
		items: ['In der Heimat investieren', 'Business-Networking', 'Diaspora Business Club', 'Regionale Events', 'Investor Matching'],
		cta: 'Diaspora-Netzwerk beitreten'
	},
	services: {
		label: 'Digitale Dienste',
		heading: 'Digitale Lösungen für modernes Business',
		sub: 'Unternehmen beim Wachstum durch moderne digitale Tools, Branding, Automatisierung und Online-Sichtbarkeit unterstützen.',
		items: [
			{ title: 'Webentwicklung', desc: 'Moderne Websites, Plattformen und Geschäftssysteme.' },
			{ title: 'SEO & Marketing', desc: 'Digitale Sichtbarkeit, Wachstum und Online-Positionierung.' },
			{ title: 'KI-Automatisierung', desc: 'Intelligente Lösungen zur Automatisierung von Geschäftsprozessen.' },
			{ title: 'Branding & Design', desc: 'Premium visuelle Identität und digitale Präsentation.' },
			{ title: 'CRM & Systeme', desc: 'Tools für bessere Verkäufe, Kommunikation und Geschäftsorganisation.' },
			{ title: 'Beratung', desc: 'Strategische Beratung für digitale Transformation und Wachstum.' }
		]
	},
	news: {
		label: 'News',
		heading: 'Business & regionale News',
		sub: 'Ausschließlich auf Business, Wirtschaft, Investitionen, Technologie, Diaspora und regionale Entwicklung fokussiert.',
		categories: ['Business', 'Investitionen', 'Technologie', 'Diaspora', 'Logistik', 'Landwirtschaft', 'Immobilien', 'Startups']
	},
	companies: {
		heading: 'Ausgewählte Unternehmen',
		sub: 'Professionelle Unternehmensprofile aus der regionalen Wirtschaft',
		viewAll: 'Alle Unternehmen',
		inquire: 'Anfrage senden',
		featured: 'Empfohlen',
		localTab: 'Lokale Unternehmen',
		investorsTab: 'Investoren & Partner',
		localSub: 'In Bijeljina und Semberija registrierte Unternehmen',
		investorsSub: 'Unternehmen außerhalb der Region, offen für B2B-Kooperation'
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
		email: 'info@semberija.app',
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
		joinDiaspora: 'Diaspora-Netzwerk beitreten',
		joinDiasporaDesc: 'Vernetzen Sie sich mit regionalen Unternehmen, Investitionsmöglichkeiten und der Diaspora-Business-Community.',
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

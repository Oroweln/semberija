// Platform modules: link targets and availability, in the same order as
// i18n.t.platform.modules (titles, descriptions and CTA labels live there).
// status: 'dev' = in development, 'soon' = coming soon, undefined = available.
export type ModuleStatus = 'dev' | 'soon' | undefined;

// id: stable key (icons are chosen by id, so modules can be reordered safely).
export type ModuleId =
	| 'directory' | 'b2b' | 'investments' | 'funding' | 'international'
	| 'enquiries' | 'promotion' | 'services' | 'app';

export const platformModules: { id: ModuleId; href: string; status?: ModuleStatus }[] = [
	{ id: 'directory', href: '/firme' },                     // 01 Business Directory
	{ id: 'b2b', href: '/b2b' },                             // 02 B2B Matchmaking
	{ id: 'investments', href: '/investicije' },             // 03 Investment (private investment opportunities)
	{ id: 'funding', href: '/fondovi' },                     // 04 Funding & Incentives (public funding; separate from Investment)
	{ id: 'international', href: '/b2b/dijaspora-mreza' },   // 05 International Business
	{ id: 'enquiries', href: '/umrezavanje' },               // 06 Business Enquiries
	{ id: 'promotion', href: '/oglasi' },                    // 07 (promotion page; offers via ?tip=oglasavanje) Business Promotion
	{ id: 'services', href: '/usluge' },                     // 08 Digital Services
	{ id: 'app', href: '/kontakt?tip=ostalo', status: 'dev' } // 09 Mobile App (early access request)
];

// "How it works" steps, in the same order as i18n.t.howItWorks.steps.
// mode: 'online' = self-service on the site today; 'manual' = handled by the team via an enquiry.
export const howSteps: { href?: string; mode: 'online' | 'manual' }[] = [
	{ href: '/kontakt?tip=registracija', mode: 'manual' }, // 01 Register (no self-service sign-up yet)
	{ mode: 'manual' },                        // 02 Profile content prepared by the team
	{ href: '/firme', mode: 'online' },        // 03 Search the directory
	{ href: '/umrezavanje', mode: 'manual' }   // 04 Business enquiry, team facilitates contact
];

// Platform modules: link targets and availability, in the same order as
// i18n.t.platform.modules (titles, descriptions and CTA labels live there).
// status: 'dev' = in development, 'soon' = coming soon, undefined = available.
export type ModuleStatus = 'dev' | 'soon' | undefined;

export const platformModules: { href: string; status?: ModuleStatus }[] = [
	{ href: '/firme' },                  // 01 Business Directory
	{ href: '/b2b' },                    // 02 B2B Matchmaking
	{ href: '/investicije' },            // 03 Investment
	{ href: '/b2b/dijaspora-mreza' },    // 04 International Business
	{ href: '/umrezavanje' },            // 05 Business Enquiries
	{ href: '/oglasi' },                 // 06 (promotion page; offers via ?tip=oglasavanje) Business Promotion
	{ href: '/usluge' },                 // 07 Digital Services
	{ href: '/kontakt?tip=ostalo', status: 'dev' }  // 08 Mobile App (early access request)
];

// "How it works" steps, in the same order as i18n.t.howItWorks.steps.
// mode: 'online' = self-service on the site today; 'manual' = handled by the team via an enquiry.
export const howSteps: { href?: string; mode: 'online' | 'manual' }[] = [
	{ href: '/kontakt?tip=registracija', mode: 'manual' }, // 01 Register (no self-service sign-up yet)
	{ mode: 'manual' },                        // 02 Profile content prepared by the team
	{ href: '/firme', mode: 'online' },        // 03 Search the directory
	{ href: '/umrezavanje', mode: 'manual' }   // 04 Business enquiry, team facilitates contact
];

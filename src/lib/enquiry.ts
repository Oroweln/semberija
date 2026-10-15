// Enquiry types for the contact form. The type is chosen in the form or preset
// with /kontakt?tip=<id>&firma=<company name>. Labels live in i18n.t.enquiry.
export const enquiryTypes = ['registracija', 'preuzimanje', 'b2b', 'oglasavanje', 'medjunarodna', 'usluge', 'ostalo'] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export type EnquiryField =
	| 'company' | 'industry' | 'location' | 'website' | 'phone' | 'role'
	| 'products' | 'offers' | 'interests' | 'markets';

// Which company fields each enquiry type asks for (name, email and message are always shown).
// `required` fields are marked with * in the form.
export const enquiryFields: Record<EnquiryType, { fields: EnquiryField[]; required: EnquiryField[] }> = {
	registracija: { fields: ['company', 'industry', 'location', 'website', 'phone', 'products', 'offers', 'interests', 'markets'], required: ['company', 'industry', 'location'] },
	preuzimanje:  { fields: ['company', 'role', 'website', 'phone', 'products', 'offers', 'interests', 'markets'], required: ['company', 'role'] },
	b2b:          { fields: ['company', 'industry', 'phone', 'products', 'interests', 'markets'], required: [] },
	oglasavanje:  { fields: ['company', 'website', 'phone'], required: ['company'] },
	medjunarodna: { fields: ['company', 'industry', 'phone', 'products', 'markets', 'interests'], required: [] },
	usluge:       { fields: ['company', 'website', 'phone'], required: [] },
	ostalo:       { fields: ['company'], required: [] }
};

export function isEnquiryType(v: string | null): v is EnquiryType {
	return !!v && (enquiryTypes as readonly string[]).includes(v);
}

// Link to the contact form with a preset enquiry type (and optional company).
export function enquiryUrl(type: EnquiryType, company?: string) {
	const params = new URLSearchParams({ tip: type });
	if (company) params.set('firma', company);
	return '/kontakt?' + params.toString();
}

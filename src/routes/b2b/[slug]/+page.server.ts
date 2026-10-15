import type { Actions } from './$types';
import { handleEnquiry } from '$lib/server/enquiry';

export const actions: Actions = {
	default: async ({ request }) => handleEnquiry(request, 'B2B upit')
};

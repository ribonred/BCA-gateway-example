export const errorResponse = (errors) => {
	const response = {
		errors: errors.errors,
		meta: errors.meta,
	};

	delete response.errors.meta;

	return response;
};
export const errorPartnerResponse = errors => errors;
export const tokenResponse = (code, status, msg, data) => data;
export const partnerResponse = (code, status, msg, data) => data;
export const successResponse = (code, status, msg, data) => ({
	meta: {
		code,
		status,
		message: msg,
	},
	data,
});

export const successPaginationResponse = (code, status, msg, data, draw, recordsTotal, recordsFiltered) => ({
	meta: {
		code,
		status,
		message: msg,
		draw,
		recordsTotal,
		recordsFiltered,
	},
	data,
});

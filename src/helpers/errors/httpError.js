import { httpCode } from '../response';

class HTTPError extends Error {
	constructor(message, errors) {
		super(message);
		this.name = this.constructor.name;
		this.errors = errors;
		Error.captureStackTrace(this, this.constructor);
	}
}

export const notFound = (errors) => {
	const error = new HTTPError('Error occurred', errors);
	error.status = httpCode.CLIENT_ERROR.NOT_FOUND.code;
	return error;
};

export const badRequest = (errors) => {
	const error = new HTTPError('Error occurred', errors);
	error.status = httpCode.CLIENT_ERROR.BAD_REQUEST.code;
	return error;
};

export const unAuthorize = (errors) => {
	const error = new HTTPError('Error occurred', errors);
	error.status = httpCode.CLIENT_ERROR.UNAUTHORIZED.code;
	return error;
};

export const forbidden = (errors) => {
	const error = new HTTPError('Error occurred', errors);
	error.status = httpCode.CLIENT_ERROR.FORBIDDEN.code;
	return error;
};

export const internalServerError = (errors) => {
	const error = new HTTPError('Error occurred', errors);
	error.status = httpCode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;
	return error;
};

export const serviceRequestError = (errors, status = 400) => {
	const error = new HTTPError('Error occurred', errors);
	error.status = status;
	return error;
};

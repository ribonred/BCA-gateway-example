import flatted from 'flatted';
import { cloneDeep } from 'lodash';
import { logger } from '../modules';

const asterisk = '***';

const attributesRedaction = (response) => {
	const data = cloneDeep(response);

	// start removing voucher code
	if (data && data.data && data.data.voucher_code) data.data.voucher_code = asterisk;
	if (data && data.data && Array.isArray(data.data)) {
		data.data.map((each, i) => {
			if (each.voucher_code) data.data[i].voucher_code = asterisk;
			return each;
		});
	}
	// end removing voucher code

	// start removing authorization
	if (data && data.headers && data.headers.authorization) data.headers.authorization = asterisk;
	// end removing authorization

	return data;
};

const getDataContext = res => ({
	requestId: res.locals.requestId,
	requestDate: res.locals.requestDate,
});

export const warn = (message, data) => {
	logger.warn(message, { dataContext: flatted.stringify(data) });
};

export const error = (message, data) => {
	logger.error(message, { dataContext: flatted.stringify(data) });
};

export const verbose = (message, data) => {
	logger.verbose(message, { dataContext: flatted.stringify(data) });
};

export const debug = (data) => {
	logger.info(data);
};

export const silly = (message, data) => {
	logger.silly(message, { dataContext: flatted.stringify(data) });
};

export const infoWithContext = (res, message, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, data);
	logger.info(message, { dataContext: flatted.stringify(newDataContext) });
};

export const errorWithContext = (res, message, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, data);
	logger.error(message, { dataContext: flatted.stringify(newDataContext) });
};

export const warnWithContext = (res, message, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, data);
	logger.warn(message, { dataContext: flatted.stringify(newDataContext) });
};

export const verboseWithContext = (res, message, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, data);
	logger.verbose(message, { dataContext: flatted.stringify(newDataContext) });
};

export const debugWithContext = (res, message, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, data);
	logger.debug(message, { dataContext: flatted.stringify(newDataContext) });
};

export const sillyWithContext = (res, message, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, data);
	logger.silly(message, { dataContext: flatted.stringify(newDataContext) });
};

export const startProfile = (res, name, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, data);
	logger.profile(name, { dataContext: flatted.stringify(newDataContext) });
};

export const endProfile = (res, name, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, data);
	logger.profile(name, { dataContext: flatted.stringify(newDataContext) });
};

export const originalError = (res, message, data) => {
	const dataContext = getDataContext(res);
	const newDataContext = Object.assign(dataContext, {
		message: data.errors.message,
		stack: data.errors.stack,
	});
	logger.error(message, { dataContext: flatted.stringify(newDataContext) });
};

export const startRequest = (data) => {
	logger.info('START_REQUEST', attributesRedaction(data));
};

export const profiling = (res, user) => {
	logger.info('PROFILING', {
		requestId: res.locals.requestId,
		user,
	});
};

export const errorException = (res, data) => {
	logger.error('ERROR_EXCEPTION', {
		requestId: res.locals.requestId,
		...data,
		originalError: data.originalError ? data.originalError.toString() : null,
		stack: data.originalError ? data.originalError.stack : null,
	});
};

export const rawResponse = (res, data) => {
	logger.info('RAW_RESPONSE', {
		requestId: res.locals.requestId,
		rawResponse: data,
	});
};

export const axiosResponse = (data, requestId, message = 'MODULE_RESPONSE') => {
	logger.info(message, {
		requestId,
		formattedRequest: {
			headers: data.config.headers,
			endpoint: data.config.url,
			method: data.config.method,
		},
		formattedResponse: {
			code: data.status,
			data: data.data,
		},
	});
};

export const callbackResponse = (data, requestId, message = 'CALLBACK_RESPONSE') => {
	logger.info(message, {
		requestId,
		formattedRequest: {
			headers: data.config.headers,
			endpoint: data.config.url,
			method: data.config.method,
			payload: data.config.data,

		},
		formattedResponse: {
			code: data.status,
			data: data.data,
		},
	});
};
export const callbackErrorResponse = (data, requestId, message = 'CALLBACK_RESPONSE') => {
	logger.info(message, {
		requestId,
		axiosResponse: flatted.stringify(data),
		formattedRequest: {
			headers: data.config.headers,
			endpoint: data.config.url,
			method: data.config.method,
			payload: data.config.data,
		},
		formattedResponse: {
			code: data.status,
			data: data.data,
		},
	});
};

export const axiosErrorResponse = (data, requestId, message = 'MODULE_RESPONSE') => {
	logger.info(message, {
		requestId,
		axiosResponse: flatted.stringify(data),
		formattedResponse: {
			code: data.status,
			data: data.data,
		},
	});
};

export const info = (data, requestId, message) => {
	logger.info(message, {
		requestId,
		data,
	});
};
export const accessControl = (data, message = 'ACCESS_CONTROL') => {
	logger.info(message, {
		ipAddr: data,
	});
};

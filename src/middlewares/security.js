import _ from 'lodash';
// import config from 'config';
import { logger, utilities, errors } from '../helpers';

const requiredKeys = (req, res, next) => {
	logger.infoWithContext(res, '=== Headers Validation Started ===', null);
	const requiredHeaders = [
		// {
		// 	key: config.headers.AUTHORIZATION,
		// 	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		// },
	];

	const requestHeaders = utilities.lowerCaseKeyObject(req.headers);
	const requestMethods = req.method.toUpperCase();

	let key = -1;
	res.locals.headers = {};
	for (let i = 0; i < requiredHeaders.length; i += 1) {
		if (!_.has(requestHeaders, requiredHeaders[i].key)) {
			if (requiredHeaders[i].methods.includes(requestMethods)) {
				key = i;
				break;
			}
		}
		res.locals.headers[requiredHeaders[i].key] = requestHeaders[requiredHeaders[i].key];
	}

	if (key > -1) {
		logger.warnWithContext(res, '=== Missing Required header key ===', { name: requiredHeaders[key].key });
		return next(errors.httpError.badRequest([new errors.internalError.InCompleteKeyError(`header: ${requiredHeaders[key].key}`)]));
	}
	logger.infoWithContext(res, '=== Headers Validation Ended ===', null);
	return next();
};

export {
	requiredKeys,
};

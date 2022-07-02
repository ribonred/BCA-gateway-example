import uuid from 'uuid';
import { logger } from '../helpers';

const initiate = (req, res, next) => {
	if (!req.headers['request-id'] || req.headers['request-id'] === '' || req.headers['request-id'] === null) req.headers['request-id'] = uuid('v4');
	res.locals.requestId = req.headers['request-id'];

	logger.startRequest({
		requestId: req.headers['request-id'],
		user: req.user,
		headers: req.headers,
		method: req.method,
		originalUrl: req.originalUrl,
		query: JSON.stringify(req.query),
		body: req.body,
	});

	next();
};

export {
	initiate,
};

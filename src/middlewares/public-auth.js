import { verifyAccessToken } from '../modules/jwt';
import { errors, validators, logger } from '../helpers';

const verifyToken = async (req, res, headers) => {
	let token = headers.authorization;
	if (token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length);
	}

	const decodedJwt = verifyAccessToken(token);

	req.user = {
		name: decodedJwt.payload.name,
		email: decodedJwt.payload.email,
		id_channel: decodedJwt.payload.id_channel,
	};

	logger.profiling(res, req.user);
};

export const closedAuth = async (req, res, next) => {
	try {
		const { headers } = req;

		const errorValidator = [];
		const errs = [];

		errorValidator.push(validators.required(headers, 'authorization', 'header'));

		errorValidator.forEach((each) => {
			if (each.error) errs.push(each.error);
		});

		if (errs.length > 0) throw errors.httpError.badRequest(errs);

		if (headers.authorization) {
			await verifyToken(req, res, headers);
		}

		next();
	} catch (error) {
		next(error);
	}
};

export const openAuth = async (req, res, next) => {
	try {
		const { headers } = req;

		req.user = {
			userType: 'anonymous',
		};

		if (headers.authorization) {
			await verifyToken(req, res, headers);
		}
		next();
	} catch (error) {
		next(error);
	}
};

export const onlyChannel = async (req, res, next) => {
	try {
		if (!req.user.id_channel) {
			throw new errors.internalError.Forbidden();
		}
		next();
	} catch (error) {
		next(error);
	}
};

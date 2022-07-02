import { verifyAccessToken } from '../modules/jwt';
import { errors, validators, logger } from '../helpers';
import { login } from '../modules/core';

const verifyToken = async (req, res, headers) => {
	let token = headers.authorization;
	if (token.startsWith('Bearer ')) {
		// Remove Bearer from string
		token = token.slice(7, token.length);
	}

	const decodedJwt = verifyAccessToken(token);
	req.user = {
		id: decodedJwt.payload.id,
		app_id: decodedJwt.payload.app_id,
		app_key: decodedJwt.payload.app_key,
	};
	const user = await login(req.user);
	logger.profiling(res, req.user);
	return user;
};
const validateRole = async (req, res, role) => {
	if (req.headers.authorization) {
		const client = await verifyToken(req, res, req.headers);
		if (client.role !== role) {
			throw errors.httpError.unAuthorize('Unauthorized');
		}
	}
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

		if (errs.length > 0) throw errors.httpError.unAuthorize(errs);

		if (headers.authorization) {
			await verifyToken(req, res, headers);
		}

		next();
	} catch (error) {
		next(error);
	}
};

export const PartnerAuth = async (req, res, next) => {
	try {
		const { headers } = req;
		const errorValidator = [];
		const errs = [];

		errorValidator.push(validators.required(headers, 'authorization', 'header'));

		errorValidator.forEach((each) => {
			if (each.error) errs.push(each.error);
		});

		if (errs.length > 0) throw errors.httpError.unAuthorize(errs);
		await validateRole(req, res, 'ACQUIRER');


		next();
	} catch (error) {
		next(error);
	}
};
export const adminAuth = async (req, res, next) => {
	try {
		const { headers } = req;
		const errorValidator = [];
		const errs = [];

		errorValidator.push(validators.required(headers, 'authorization', 'header'));

		errorValidator.forEach((each) => {
			if (each.error) errs.push(each.error);
		});

		if (errs.length > 0) throw errors.httpError.unAuthorize(errs);
		await validateRole(req, res, 'ADMIN');


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

import * as errors from '../helpers/errors';
import { httpResponse } from '../helpers/response';
import serializers from '../serializers';
import { RequestPayloadTransformer } from '../transformers';

export const ValidatorSerializer = (seralizerClass) => {
	// eslint-disable-next-line no-prototype-builtins
	if (!serializers.hasOwnProperty(seralizerClass)) { throw new errors.internalError.UnknownError(`'${seralizerClass}' seralizer class is not exist`, null); }

	return async (req, res, next) => {
		try {
			const validated = await serializers[seralizerClass].validateAsync(req.body);
			req.body = validated;
			next();
		} catch (err) {
			//* Pass err to next
			if (err.isJoi) {
				next(errors.httpError.badRequest(err.message));
			}
			next(errors.httpError.badRequest(err));
		}
	};
};
/* eslint-disable */

export const PartnerValidatorSerializer = (seralizerClass) => {
	// TODO: handled payload key error from BCA
	// eslint-disable-next-line no-prototype-builtins
	if (!serializers.hasOwnProperty(seralizerClass)) { throw new errors.internalError.UnknownError(`'${seralizerClass}' seralizer class is not exist`, null); }

	return async (req, res, next) => {
		try {
			const validated = await serializers[seralizerClass].validateAsync(req.body);
			req.body = validated;
			next();
		} catch (err) {
			//* Pass err to next
			if (err.isJoi) {
				const invalidResponse = new RequestPayloadTransformer(req.body);
				const missingKey = err.message.split(' ')[0].replace('"', '').replace('"', '');
				invalidResponse.formMissingkey(missingKey);
				// TODO: is it ok return here with response?
				// eslint error here, please uncomment line 24 to see error
				return httpResponse.okToken(res, 'invalid payload', invalidResponse.resultPayload);
			}
			next(errors.httpError.badRequest(err));
		}
	};
};

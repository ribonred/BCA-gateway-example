import _ from 'lodash';
import { utilities } from '.';
import * as errors from './errors';

const validatorWrapper = fn => (body, key, value) => {
	try {
		fn(body, key, value);
		return { data: true, error: null };
	} catch (e) {
		return { data: null, error: e };
	}
};


/**
  * Validate existence value of key.
  * @param body A body key from req.
  * @param key A field name.
  * @param object A variable object
  * @param array A variable array
  */
export const required = validatorWrapper((body, key, placement = 'body') => {
	if (!_.has(body, key)) throw new errors.internalError.InCompleteKeyError(key, null, placement);
	if (body[key] === '' || body[key] === null) throw new errors.internalError.InCompleteValueError(key, null, placement);
});
export const requiredBody = validatorWrapper((body, key, placement = 'body') => {
	if (!_.has(body, key)) throw new errors.internalError.InCompleteKeyError(key, null, placement);
});

export const number = validatorWrapper((body, key) => {
	if (!utilities.isNumber(Number(body[key]))) {
		throw new errors.internalError.InvalidTypeError(key, null);
	}
});

export const string = validatorWrapper((body, key) => {
	if (!utilities.isString(body[key])) {
		throw new errors.internalError.InvalidTypeError(key, null);
	}
});

export const email = validatorWrapper((body, key) => {
	if (!utilities.validateEmail(body[key])) {
		throw new errors.internalError.InvalidTypeError(key, null);
	}
});

export const inObject = validatorWrapper((body, key, object) => {
	if (body[key] && Object.values(object).indexOf(body[key].toUpperCase()) < 0) {
		throw new errors.internalError.InvalidOptionError(key, null);
	}
});
export const inArray = validatorWrapper((body, key, array) => {
	if (!array.includes(body[key])) {
		throw new errors.internalError.InvalidOptionError(key, null);
	}
});
export const integer = validatorWrapper((body, key) => {
	if (!utilities.isInteger(Number(body[key]))) {
		throw new errors.internalError.InvalidTypeError(key, null);
	}
});
export const decimal = validatorWrapper((body, key) => {
	if (!utilities.isDecimal(Number(body[key]))) {
		throw new errors.internalError.InvalidTypeError(key, null);
	}
});
export const boolean = validatorWrapper((body, key) => {
	if (typeof body[key] !== 'boolean') {
		throw new errors.internalError.InvalidTypeError(key, null);
	}
});

export const checkIsBefore = validatorWrapper((key, start, end) => {
	if (Date.parse(start) > Date.parse(end)) {
		throw new errors.internalError.forbiden(key[0], key[1], null);  // eslint-disable-line
	}
});

export const dateTime = validatorWrapper((body, key) => {
	const dtRegex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
	if (!dtRegex.test(body[key])) throw new errors.internalError.InvalidTypeError(key, null);
});

export const image = validatorWrapper((file, key) => {
	if (!file) throw new errors.internalError.InvalidFileTypeError(key, 'jpeg, jpg or png');
});

export const isArray = validatorWrapper((body, key) => {
	if (!Array.isArray(body[key])) {
		throw new errors.internalError.InvalidTypeError(key);
	}
});

export const max = validatorWrapper((body, key, value) => {
	if (typeof body[key] === 'number') {
		if (Number(body[key]) > value) {
			throw new errors.internalError.InvalidMaxValueError(key, value);
		}
	} else if (body[key].length > value) {
		throw new errors.internalError.InvalidMaxLengthError(key, value);
	}
});

export const min = validatorWrapper((body, key, value) => {
	if (typeof body[key] === 'number') {
		if (Number(body[key]) < value) {
			throw new errors.internalError.InvalidMinValueError(key, value);
		}
	} else if (body[key].length < value) {
		throw new errors.internalError.InvalidMinLengthError(key, value);
	}
});

export const validateCvvNumber = validatorWrapper((body, key) => {
	if (!utilities.validateCvvNumber(body[key])) {
		throw new errors.internalError.InvalidTypeError(key, null);
	}
});

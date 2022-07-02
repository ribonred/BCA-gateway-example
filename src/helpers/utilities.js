import _ from 'lodash';
import moment from 'moment';
import config from 'config';

export const validateEmail = (email) => {
	const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const validatePhoneNumber = (phone) => {
	// only 10-13 character
	// +62 XXXXXXXXXXXX (space after +62 and 9-12 character)
	// +62XXXXXXXXXXXX (no space after +62 and 9-12 character)
	// +62 XXXX-XXXX-XXXX (space after +62 and 9-12 character with strip(-) between 3-4 character)
	// +62XXXX-XXXX-XXXX (no space after +62 and 9-12 character with strip(-) between 3-4 character)
	// 0XXXXXXXXXXXX (after 0 and add 9-12 character)
	// 0XXX-XXXX-XXXX (after 0 and 9-12 character with strip(-) between 3-4 character)
	const regex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;
	return regex.test(phone);
};

export const validateCvvNumber = (cvv) => {
	const regex = /^[0-9]{3,4}$/;
	return regex.test(cvv);
};

export const isNumber = (number) => {
	const re = /^[0-9]+([,.][0-9]+)?$/g;
	return re.test(number);
};

export const isString = value => typeof value === 'string' || value instanceof String;

export const isInteger = number => Number.isInteger(Number(number));

export const promiseWrapper = promise => (
	promise
		.then(data => ({ data, error: null }))
		.catch(error => ({ data: null, error }))
);

export const controllerWrapper = fn => async (req, res, next) => {
	try {
		return await fn(req, res, next);
	} catch (err) {
		return next(err);
	}
};

export const validateDate = (date) => {
	const re = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/; // eslint-disable-line
	return re.test(date);
};

export const validateLength = (word, minLength = 6) => (word.length >= minLength);

export const validateSex = (sex) => {
	const sexArray = ['MALE', 'FEMALE'];
	if (sexArray.indexOf(sex) > -1) {
		return true;
	}
	return false;
};

export const validateStatus = (status) => {
	const stattusArray = ['ACTIVE', 'INACTIVE', 'DELETED'];
	if (stattusArray.indexOf(status) > -1) {
		return true;
	}
	return false;
};

export const validateYesNo = (status) => {
	const yesnoArray = ['YES', 'NO'];
	if (yesnoArray.indexOf(status) > -1) {
		return true;
	}
	return false;
};

export const validateAppType = (type) => {
	const typeArr = ['FRONT', 'BACK-OFFICE'];
	if (typeArr.indexOf(type) > -1) {
		return true;
	}
	return false;
};

/**
  * Converts iso date string (mysql returned date time) into consumable date time format for UV front end .
  * @param isoDate An iso date (mysql returned date time) string.
  * @param utcOffset A utc offset value. Default value is 420.
	* @param format A date time format. Default value is 'YYYY-MM-DD HH:mm:ss'.
  */
// eslint-disable-next-line max-len
export const convertDateTime = (isoDate, headers = { device_utc_offset: 420 }, format = 'YYYY-MM-DD HH:mm:ss') => (isoDate && isoDate !== '0000-00-00 00:00:00' ? moment(isoDate).utcOffset(parseInt(headers.device_utc_offset, 10)).format(format).toString() : null);

export function noOrder(orderNo) {
	let angka = parseInt(orderNo.substr(orderNo.length - 4)) + 1;  // eslint-disable-line
	const strNew = orderNo.substr(0, (orderNo.length - 6));
	angka = angka.toString().padStart(5, '0');
	return `${strNew}-${angka}`;
}

export const lowerCaseKeyObject = object => _.mapKeys(object, (v, k) => k.toLowerCase());

export async function asyncForEach(array, callback) {
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < array.length; index++) {
		// eslint-disable-next-line no-await-in-loop
		await callback(array[index], index, array);
	}
}

export const pad = (str, max) => {
	const string = str.toString();
	return string.length < max ? pad(`0${string}`, max) : string;
};

export const toBase64 = (value) => {
	const base64 = Buffer.from(value).toString('base64');
	return base64;
};

export const fromBase64 = value => Buffer.from(value, 'base64').toString('utf8');

export const sanitizeHTML = (string) => {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'\'': '&#x27;',
		'/': '&#x2F;',
		'`': '&grave;',
	};
	const regex = /[&<>"'/]/ig;
	return string.replace(regex, match => (map[match]));
};

export const YesNoEnum = {
	YES: 'YES',
	NO: 'NO',
};

export const generateVaNumber = () => {
	const companyCode = config.accounts.bca;
	const checkSum = Math.floor(Math.random() * (99 - 10 + 1) + 10); // generate 2 digit from 10 - 99.
	const dateNow = moment();
	const epoch = parseInt(dateNow.format('X'), 10) / 100; // get epoch time in seconds. 10 digit.
	const va = `${companyCode}${epoch.toFixed(0)}${checkSum}`;
	return va;
};

export const generateInvoice = (clientId) => {
	const ids = clientId.toString().padStart(5, '0');
	const dateNow = moment();
	const epoch = parseInt(dateNow.format('X'), 10);
	const checkSum = Math.floor(Math.random() * (999 - 100 + 1) + 100); // generate 3 digit from 100 - 999.

	const invoiceNumber = `${ids}-${epoch}-${checkSum}`;
	return invoiceNumber;
};

export const vaExpirationTime = () => {
	let dateNow = new Date();
	dateNow = moment(dateNow).add(config.accounts.va_expiration_in_minutes, 'minutes');
	return convertDateTime(dateNow);
};

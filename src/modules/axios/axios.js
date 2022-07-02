import axios from 'axios';
import { errors } from '../../helpers';

const patch = async (auth, url, data) => {
	try {
		const response = await axios({
			method: 'PATCH',
			timeout: 4000,
			url,
			headers: {
				'Content-Type': 'application/json',
				Authorization: auth,
			},
			data,
		});
		return response.data;
	} catch (err) {
		throw errors.httpError.serviceRequestError(err.response);
	}
};
const post = async (auth, url, data) => {
	try {
		const response = await axios({
			method: 'POST',
			timeout: 4000,
			url,
			headers: {
				'Content-Type': 'application/json',
				Authorization: auth,
			},
			data,
		});
		return response.data;
	} catch (err) {
		throw errors.httpError.serviceRequestError(err.response);
	}
};
const get = async (auth, url) => {
	try {
		const response = await axios({
			method: 'GET',
			timeout: 4000,
			url,
			headers: {
				'Content-Type': 'application/json',
				Authorization: auth,
			},
		});
		return response;
	} catch (err) {
		throw errors.httpError.serviceRequestError(err.response);
	}
};
const getData = async (headers, url) => {
	try {
		const response = await axios({
			method: 'GET',
			timeout: 4000,
			url,
			headers,
		});
		return response;
	} catch (err) {
		throw errors.httpError.serviceRequestError(err.response);
	}
};
module.exports = {
	get,
	patch,
	post,
	getData,
};

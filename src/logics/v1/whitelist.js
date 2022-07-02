// import {
// 	errors,
// } from '../../helpers';

import { Whitelist } from '../../data/models';


const addWhitelist = async (payload) => {
	await Whitelist.create(null, payload);
	return payload;
};

export {
	addWhitelist,
};

const Joi = require('joi');

const whitelistSerializer = Joi.object({
	ip_cidr: Joi.array().items(Joi.string().required().ip({
		version: [
			'ipv4',
		],
		cidr: 'required',
	})),
});


export {
	whitelistSerializer,
};

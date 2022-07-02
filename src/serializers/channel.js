const Joi = require('joi');


const createChannelSerializer = Joi.object({
	// serilizer changes
	role: Joi.string().optional().default('MERCHANT').valid('MERCHANT', 'ADMIN', 'ACQUIRER'),
	name: Joi.string().required(),
	url_callback: Joi.string().uri(
		{
			scheme: [
				'http',
				'https',
			],
		},
	).required(),
});


export {
	createChannelSerializer,
};

const Joi = require('joi');


const requestVaSerializer = Joi.object({
	// serilizer changes
	customer_name: Joi.string().optional(),
	amount_to_pay: Joi.number().precision(2).required(),
	client_bill_number: Joi.string().optional(),
	description: Joi.string().optional(),
});


module.exports = requestVaSerializer;

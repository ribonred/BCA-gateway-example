
import {
	generateInvoice, vaExpirationTime, generateVaNumber, convertDateTime,
} from '../../helpers/utilities';
import { Inquiry } from '../../data/models';

const createVa = async (user, body, requestId) => {
	const datenow = new Date();
	const inquiry = await Inquiry.create(null, {
		...body,
		client_id: user.id,
		uv_bill_number: generateInvoice(user.id),
		expire_at: vaExpirationTime(),
		client_request_id: requestId,
		customer_number: generateVaNumber(),
		created_at: convertDateTime(datenow),
		modified_at: convertDateTime(datenow),
		client_transaction_date: convertDateTime(datenow),

	});

	const InsertedData = await Inquiry.findById(null, inquiry[0]);
	return {
		va_number: InsertedData.customer_number,
		va_expiration_time: InsertedData.expire_at,
		va_amount: InsertedData.amount_to_pay,
		va_currency: InsertedData.currency_code,
		va_bill_number: InsertedData.uv_bill_number,
		va_merchant_request_id: InsertedData.client_request_id,
		va_merchant_bill_number: InsertedData.client_bill_number,
	};
};

export {
	createVa,
};

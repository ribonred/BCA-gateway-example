
import axios from 'axios';
import { ChannelManagement } from '../data/models';
import * as logger from './logger';

export const callback = async (inquiry, callbackRequestId) => {
	const channel = await ChannelManagement.findOne(null, {
		id: inquiry.client_id,
	});
	const payload = {
		uv_bill_number: inquiry.uv_bill_number,
		client_bill_number: inquiry.client_bill_number,
		paid_amount: inquiry.paid_amount,
		va_number: inquiry.customer_number,
		transaction_date: inquiry.acquirer_transaction_date,
		flag: inquiry.payment_flag_status,
		status: JSON.parse(inquiry.payment_flag_reason),
	};
	const requestConfig = {
		method: 'POST',
		timeout: 4000,
		url: channel.url_callback,
		headers: {
			'Content-Type': 'application/json',
			'request-id': callbackRequestId,
		},
		data: payload,
	};
	axios(requestConfig).then((response) => { logger.callbackResponse(response, callbackRequestId); }).catch((err) => {
		logger.callbackErrorResponse(err.response, callbackRequestId);
	});
};

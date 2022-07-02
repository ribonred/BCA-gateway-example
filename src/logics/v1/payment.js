import moment from 'moment';
import uuid from 'uuid';
import { Inquiry } from '../../data/models';
import { PaymentTransformer } from '../../transformers';
import { convertDateTime } from '../../helpers/utilities';
import { callback } from '../../helpers/callback';


const updateInquiryData = async (inquiry, body, transformer, callbackRequestId) => {
	// update inquiry table
	const makeMoment = moment(body.TransactionDate, 'DD/MM/YYYY HH:mm:ss');
	const txDate = convertDateTime(makeMoment.toDate());
	const payload = {
		acquirer_request_id: body.RequestID,
		channel_type: body.ChannelType,
		acquier_transaction_date: txDate,
		additional_data: body.AdditionalData || '',
		paid_at: !transformer.invalid ? convertDateTime(new Date()) : null,
		modified_at: convertDateTime(new Date()),
		paid: !transformer.invalid,
		paid_amount: transformer.resultPayload.PaidAmount,
		payment_flag_status: transformer.resultPayload.PaymentFlagStatus,
		payment_flag_reason: JSON.stringify(transformer.resultPayload.PaymentFlagReason),
		customer_name: body.CustomerName,
		callback_id: callbackRequestId,
	};
	await Inquiry.update(null, inquiry.id, payload);
};


const validatePayment = async (res, body, requestId) => {
	// transform response payload and check
	const response = new PaymentTransformer(body);
	// get va number that has been inquired / true
	const inquiry = await Inquiry.findOne(null, {
		customer_number: body.CustomerNumber,
	});

	if (!inquiry) {
		response.formNotFoundInquiryResponse();
		return response;
	}
	// reject if already paid
	if (inquiry.paid) {
		response.formAlreadyPaidResponse();
		return response;
	}
	response.validatePayment(inquiry);

	const callbackRequestId = uuid.v4();
	await updateInquiryData(inquiry, body, response, callbackRequestId);
	await callback(inquiry, callbackRequestId);


	return response;
};
export {
	validatePayment,
};

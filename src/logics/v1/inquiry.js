
import moment from 'moment';
import { Inquiry } from '../../data/models';
import { InquiryTransformer } from '../../transformers';
import { convertDateTime } from '../../helpers/utilities';


const updateInquiryData = async (inquiry, body, transformer) => {
	// update inquiry table
	const makeMoment = moment(body.TransactionDate, 'DD/MM/YYYY HH:mm:ss');
	const txDate = convertDateTime(makeMoment.toDate());
	const payload = {
		acquirer_request_id: body.RequestID,
		channel_type: body.ChannelType,
		acquier_transaction_date: txDate,
		additional_data: body.AdditionalData || '',
		inquired_at: convertDateTime(new Date()),
		modified_at: convertDateTime(new Date()),
		inquired: 1,
		inquiry_status: transformer.resultPayload.InquiryStatus,
		inquiry_reason: JSON.stringify(transformer.resultPayload.InquiryReason),
	};
	await Inquiry.update(null, inquiry.id, payload);
};

const validateVa = async (res, body, requestId) => {
	// transform response payload and check
	const response = new InquiryTransformer(body);
	const inquiry = await Inquiry.findOne(null, {
		customer_number: body.CustomerNumber,
	});

	if (!inquiry) {
		response.formNotFoundInquiryResponse();
		return response;
	}
	// reject if already paid & not update inquiry
	if (inquiry.paid) {
		response.formAlreadyPaidResponse();
		return response;
	}
	response.validateInquiry(inquiry);
	await updateInquiryData(inquiry, body, response);

	return response;
};

export {
	validateVa,
};

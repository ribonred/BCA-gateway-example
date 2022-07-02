const Joi = require('joi');


const languageSerializer = Joi.object({
	Indonesia: Joi.string().required(),
	English: Joi.string().required(),

});

const inquiryBillDetailsSerializer = Joi.object({
	BillReference: Joi.number().required(),
	BillAmount: Joi.number().required(),
	BillNumber: Joi.string().required(),
	BillSubCompany: Joi.string().required(),
});
const paymentBillDetailsSerializer = Joi.object({
	BillDescription: languageSerializer,
	BillAmount: Joi.number().optional(),
	BillNumber: Joi.string().optional(),
	BillSubCompany: Joi.string().optional(),
});
const requestInquirySerializer = Joi.object({
	CompanyCode: Joi.number().required(),
	CustomerNumber: Joi.string().required(),
	RequestID: Joi.string().required(),
	ChannelType: Joi.string().required(),
	TransactionDate: Joi.string(),
	AdditionalData: Joi.string().optional(),
});

const responseInquirySerializer = Joi.object({
	InquiryStatus: Joi.number().required(),
	InquiryReason: languageSerializer,
	CompanyCode: Joi.number().required(),
	CustomerNumber: Joi.string().required(),
	RequestID: Joi.string().required(),
	AdditionalData: Joi.string().optional(),
	CustomerName: Joi.string().optional(),
	CurrencyCode: Joi.string().optional(),
	TotalAmount: Joi.number().optional(),
	SubCompany: Joi.string().optional(),
	DetailBills: Joi.array().items(
		inquiryBillDetailsSerializer,
	).optional(),
	FreeText: languageSerializer,
});
const requestPaymentSerializer = Joi.object({
	CompanyCode: Joi.number().required(),
	CustomerNumber: Joi.string().required(),
	RequestID: Joi.string().required(),
	ChannelType: Joi.string().required(),
	CustomerName: Joi.string().required(),
	CurrencyCode: Joi.string().required(),
	PaidAmount: Joi.number().required(),
	TotalAmount: Joi.number().required(),
	SubCompany: Joi.string().optional(),
	// need to validate string format dd/mm/yyyy hh:mm:ss
	TransactionDate: Joi.string(),
	Reference: Joi.number().optional(),
	DetailBills: Joi.array().items(
		paymentBillDetailsSerializer,
	).optional(),
	FlagAdvice: Joi.string().required(),
	AdditionalData: Joi.string().optional(),
});


export {
	requestInquirySerializer,
	responseInquirySerializer,
	requestPaymentSerializer,
};

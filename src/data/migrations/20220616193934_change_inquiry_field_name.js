exports.up = (knex, Promise) => knex.schema.alterTable('uv_inquiry', (table) => {
	table.renameColumn('CustomerNumber', 'customer_number');
	table.renameColumn('CustomerName', 'customer_name');
	table.renameColumn('CurrencyCode', 'currency_code');
	table.renameColumn('ClientBillNumber', 'client_bill_number');
	table.renameColumn('UvBillNumber', 'uv_bill_number');
	table.renameColumn('RequestID', 'acquirer_request_id');
	table.renameColumn('ClientRequestID', 'client_request_id');
	table.renameColumn('ChannelType', 'channel_type');
	table.renameColumn('AdditionalData', 'additional_data');
	table.renameColumn('InquiryStatus', 'inquiry_status');
	table.renameColumn('InquiryReason', 'inquiry_reason');
	table.renameColumn('AmountToPay', 'amount_to_pay');
	table.renameColumn('PaidAmount', 'paid_amount');
});

exports.down = (knex, Promise) => knex.schema.dropTable('uv_inquiry');

import baseModel from '../../helpers/model';
import knex from '../knex';

const name = 'Inquiry';
const tableName = 'uv_inquiry';
const pk = `${tableName}.id`;


const props = [
	'id',
	'customer_number',
	'customer_name',
	'currency_code',
	'client_bill_number',
	'uv_bill_number',
	'acquirer_request_id',
	'client_request_id',
	'channel_type',
	'additional_data',
	'inquired',
	'paid',
	'client_id',
	'inquiry_status',
	'inquiry_reason',
	'amount_to_pay',
	'paid_amount',
	'client_transaction_date',
	'acquier_transaction_date',
	'inquired_at',
	'paid_at',
	'expire_at',
	'created_at',
	'modified_at',
	'description',
	'payment_flag_reason',
	'payment_flag_status',
	'callback_id',
];

const selectableProps = props.map(each => `${tableName}.${each}`);

export default ({
	...baseModel({
		knex,
		name,
		tableName,
		selectableProps,
	}),
	pk,
	props,
});

import baseModel from '../../helpers/model';
import knex from '../knex';

const name = 'InquiryHistory';
const tableName = 'uv_inquiry_history';
const pk = `${tableName}.id`;

const props = [
	'id',
	'customer_number',
	'acquirer_request_id',
	'client_id',
	'data',
	'created_at',
	'modified_at',
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

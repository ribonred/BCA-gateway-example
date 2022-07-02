import baseModel from '../../helpers/model';
import knex from '../knex';

const name = 'Channel';
const tableName = 'uv_channels';
const pk = `${tableName}.id`;

const props = [
	'id',
	'name',
	'only_redeemed_once',
	'status',
	'created_by',
	'modified_by',
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

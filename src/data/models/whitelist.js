import baseModel from '../../helpers/model';
import knex from '../knex';

const name = 'Whitelist';
const tableName = 'whitelist';
const pk = `${tableName}.id`;


const props = [
	'ip_cidr',
	'created_by',
	'created_at',
	'modified_at',
	'id',
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

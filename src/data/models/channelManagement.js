import baseModel from '../../helpers/model';
import knex from '../knex';

const name = 'ChannelManagement';
const tableName = 'uv_channel_managements';
const pk = `${tableName}.id`;

const props = [
	'id',
	'name',
	'app_id',
	'app_key',
	'url_callback',
	'status',
	'role',
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

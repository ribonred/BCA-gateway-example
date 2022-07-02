exports.up = (knex, Promise) => knex.schema.alterTable('uv_inquiry_history', (table) => {
	table.renameColumn('CustomerNumber', 'customer_number');
	table.renameColumn('RequestID', 'acquirer_request_id');
	table.renameColumn('ClientId', 'client_id');
});

exports.down = (knex, Promise) => knex.schema.dropTable('uv_inquiry_history');

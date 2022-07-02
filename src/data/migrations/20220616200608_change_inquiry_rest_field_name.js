
exports.up = (knex, Promise) => knex.schema.alterTable('uv_inquiry', (table) => {
	table.renameColumn('AcquirerTransactionDate', 'acquier_transaction_date');
	table.renameColumn('ClientId', 'client_id');
	table.renameColumn('PaymentFlagReason', 'payment_flag_reason');
	table.renameColumn('PaymentFlagStatus', 'payment_flag_status');
});

exports.down = (knex, Promise) => knex.schema.dropTable('uv_inquiry');

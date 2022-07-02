exports.up = (knex, Promise) => knex.schema.alterTable('uv_inquiry_history', (table) => {
	table.string('callback_id').nullable();
});

exports.down = (knex, Promise) => knex.schema.dropTable('uv_inquiry_history');

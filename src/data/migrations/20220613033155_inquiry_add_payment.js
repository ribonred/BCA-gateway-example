exports.up = (knex, Promise) => knex.schema.alterTable('uv_inquiry', (table) => {
	table.string('PaymentFlagReason').nullable();
	table.string('PaymentFlagStatus').nullable();
});
exports.down = (knex, Promise) => knex.schema.dropTable('uv_inquiry');

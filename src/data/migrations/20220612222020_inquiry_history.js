exports.up = (knex, Promise) => knex.schema.createTable('uv_inquiry_history', (table) => {
	table.increments();
	table.string('CustomerNumber').nullable();
	table.string('RequestID').notNullable();
	table.integer('ClientId').unsigned();
	table.foreign('ClientId').references('uv_channel_managements.id').onDelete('NO ACTION');
	table.string('data').nullable();
	table.timestamp('created_at').defaultTo(knex.fn.now());
	table.timestamp('modified_at').defaultTo(knex.fn.now());
});

exports.down = (knex, Promise) => knex.schema.dropTable('uv_inquiry_history');

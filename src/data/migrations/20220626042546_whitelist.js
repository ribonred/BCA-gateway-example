exports.up = (knex, Promise) => knex.schema.createTable('whitelist', (table) => {
	table.increments();
	table.string('ip_cidr').notNullable();
	table.integer('created_by').unsigned();
	table.foreign('created_by').references('uv_channel_managements.id').onDelete('NO ACTION');
	table.timestamp('created_at').defaultTo(knex.fn.now());
	table.timestamp('modified_at').defaultTo(knex.fn.now());
});

exports.down = (knex, Promise) => knex.schema.dropTable('whitelist');

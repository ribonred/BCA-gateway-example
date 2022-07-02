exports.up = (knex, Promise) => knex.schema.createTable('uv_channel_managements', (table) => {
	table.increments();
	table.string('name').notNullable();
	table.string('app_id').notNullable();
	table.string('app_key').notNullable();
	table.string('url_callback').nullable();
	table.string('ip_whitelist').nullable();
	table.string('status').defaultTo('ACTIVE'); // ACTIVE, INACTIVE
	table.string('role').defaultTo('MERCHANT'); // MERCHANT or ACQUIRER
	table.timestamp('created_at').defaultTo(knex.fn.now());
	table.timestamp('modified_at').defaultTo(knex.fn.now());
});

exports.down = (knex, Promise) => knex.schema.dropTable('uv_channel_managements');

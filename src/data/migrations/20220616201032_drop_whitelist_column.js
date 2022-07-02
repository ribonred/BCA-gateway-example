

exports.up = (knex, Promise) => knex.schema.alterTable('uv_channel_managements', (table) => {
	table.dropColumn('ip_whitelist');
});

exports.down = (knex, Promise) => knex.schema.dropTable('uv_channel_managements');

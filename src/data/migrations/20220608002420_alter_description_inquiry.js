exports.up = (knex, Promise) => knex.schema.alterTable('uv_inquiry', (table) => {
	table.string('description').nullable();
});

exports.down = (knex, Promise) => { };

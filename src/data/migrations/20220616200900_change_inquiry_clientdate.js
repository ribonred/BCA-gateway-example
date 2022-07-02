

exports.up = (knex, Promise) => knex.raw('ALTER TABLE uv_inquiry CHANGE COLUMN ClientTransactionDate client_transaction_date TIMESTAMP');

exports.down = (knex, Promise) => knex.schema.dropTable('uv_inquiry');

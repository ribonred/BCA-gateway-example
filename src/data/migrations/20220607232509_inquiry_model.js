exports.up = (knex, Promise) => knex.schema.createTable('uv_inquiry', (table) => {
	table.increments();
	table.string('CustomerNumber').unique().notNullable();
	table.string('CustomerName').nullable();
	table.string('CurrencyCode').defaultTo('IDR');
	table.string('ClientBillNumber').nullable();
	table.string('UvBillNumber').notNullable();
	table.string('RequestID').nullable();
	table.string('ClientRequestID').notNullable();
	table.string('ChannelType').nullable();
	table.string('AdditionalData').nullable();
	table.boolean('inquired').notNullable().defaultTo(false);
	table.boolean('paid').notNullable().defaultTo(false);
	table.integer('ClientId').unsigned();
	table.foreign('ClientId').references('uv_channel_managements.id').onDelete('NO ACTION');
	table.integer('InquiryStatus').nullable();
	table.string('InquiryReason').nullable();
	table.decimal('AmountToPay', { precision: 2 }).notNullable();
	table.decimal('PaidAmount', { precision: 2 }).nullable();
	table.timestamp('ClientTransactionDate').defaultTo(knex.fn.now());
	table.timestamp('AcquirerTransactionDate').nullable();
	table.timestamp('inquired_at').nullable();
	table.timestamp('paid_at').nullable();
	table.timestamp('expire_at').nullable();
	table.timestamp('created_at').defaultTo(knex.fn.now());
	table.timestamp('modified_at').defaultTo(knex.fn.now());
});

exports.down = (knex, Promise) => knex.schema.dropTable('uv_inquiry');

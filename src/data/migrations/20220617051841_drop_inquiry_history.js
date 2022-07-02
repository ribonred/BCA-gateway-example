exports.up = async knex => knex.schema.dropTableIfExists('uv_inquiry_history');
exports.down = async knex => knex.schema.dropTableIfExists('uv_inquiry_history');

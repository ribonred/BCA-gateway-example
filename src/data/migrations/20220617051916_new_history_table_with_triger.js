
const CREATING_TABLE_HISTORY = `
CREATE TABLE IF NOT EXISTS uv_inquiry_history LIKE uv_inquiry;
`;
const REVISION_HISTORY = `
ALTER TABLE uv_inquiry_history
DROP KEY uv_inquiry_customernumber_unique;
ALTER TABLE uv_inquiry_history MODIFY COLUMN id int(11) NOT NULL, 
DROP PRIMARY KEY, ADD action VARCHAR(6) DEFAULT 'insert' FIRST, 
ADD revision INT(6) NOT NULL AUTO_INCREMENT AFTER action,
ADD change_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER revision,
ADD PRIMARY KEY (revision);`;
// duplicate table uv_inquiry to uv_inquiry_history
// drop primary key and add action, revision, change_time
// now primary key is (revision) column in this table
const WRAPPER_SQL = CREATING_TABLE_HISTORY + REVISION_HISTORY;

exports.up = async knex => knex.raw(WRAPPER_SQL);

exports.down = async knex => knex.schema.dropTableIfExists('uv_inquiry_history');

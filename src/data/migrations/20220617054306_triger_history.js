// this will create record if any change in uv_inquiry table
// this is mysql triger function
// if you have permission denied please do this in your SQL databases https://developer.aliyun.com/article/255216
// or simply create sql with args like in the mysql/docker-compose.yml file
const DROP_TRIGER = `
DROP TRIGGER IF EXISTS uv_inquiry__ai;
DROP TRIGGER IF EXISTS uv_inquiry__au;
DROP TRIGGER IF EXISTS uv_inquiry__bd;
`;
exports.up = async (knex) => {
	const db = knex.client.database();
	const SQL_TRIGER = `
    DROP TRIGGER IF EXISTS \`${db}\`.uv_inquiry__ai;
    DROP TRIGGER IF EXISTS \`${db}\`.uv_inquiry__au;
    DROP TRIGGER IF EXISTS \`${db}\`.uv_inquiry__bd;
    
    CREATE TRIGGER \`${db}\`.uv_inquiry__ai AFTER INSERT ON \`${db}\`.uv_inquiry FOR EACH ROW
        INSERT INTO \`${db}\`.uv_inquiry_history SELECT 'insert', NULL, NOW(), d.*
        FROM \`${db}\`.uv_inquiry AS d WHERE d.id = NEW.id;
    
    CREATE TRIGGER \`${db}\`.uv_inquiry__au AFTER UPDATE ON \`${db}\`.uv_inquiry FOR EACH ROW
        INSERT INTO \`${db}\`.uv_inquiry_history SELECT 'update', NULL, NOW(), d.*
        FROM \`${db}\`.uv_inquiry AS d WHERE d.id = NEW.id;
    
    CREATE TRIGGER \`${db}\`.uv_inquiry__bd BEFORE DELETE ON \`${db}\`.uv_inquiry FOR EACH ROW
        INSERT INTO \`${db}\`.uv_inquiry_history SELECT 'delete', NULL, NOW(), d.*
        FROM \`${db}\`.uv_inquiry AS d WHERE d.id = OLD.id;`;
	return knex.raw(SQL_TRIGER);
};

exports.down = async knex => knex.raw(DROP_TRIGER);


exports.seed = async (knex, Promise) => {
	const dataSeed = [
		{
			id: 1, ip_cidr: '127.0.0.1', created_by: 3, created_at: '2022-06-07 17:09:41', modified_at: '2022-06-07 17:09:41',
		},
	];
	await knex('whitelist').insert(dataSeed).onConflict(['id', 'ip_cidr'])
		.merge();
};

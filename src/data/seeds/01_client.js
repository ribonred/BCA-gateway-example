/* eslint-disable */
exports.seed = async (knex, Promise) => {
	const dataSeed = [
		{
			id: 1, name: 'NERO', app_id: 'ENFKDCEXZTLQJUXTRXCMTHLUCRHYBFHD', app_key: 'Ubj1vHlKHaAh7vJ5dHVsRehPcaq6JClR', url_callback: 'http://localhost:8000/callback', status: 'ACTIVE', role: 'MERCHANT', created_at: '2022-06-07 17:09:41', modified_at: '2022-06-07 17:09:41',
		},
		{
			id: 2, name: 'BCA', app_id: 'ENFKDCEXZTLQJUXTRXMTCHLUCRHYBDFHH', app_key: 'Ubj1vHlKHaAh7vJ5dHVsRehPcaq6JZck', url_callback: 'http://localhost:8000/callback', status: 'ACTIVE', role: 'ACQUIRER', created_at: '2022-06-07 17:09:41', modified_at: '2022-06-07 17:09:41',
		},
		{
			id: 3, name: 'UVADMIN', app_id: 'ZTLQJUXTRXCHLUCRHYBDCEXZTLQYT', app_key: 'VsRehPcaq6JZckaVsRevJ5caq6JZckca', url_callback: 'http://localhost:8000/callback', status: 'ACTIVE', role: 'ADMIN', created_at: '2022-06-07 17:09:41', modified_at: '2022-06-07 17:09:41',
		},
	];
	await knex('uv_channel_managements').insert(dataSeed).onConflict(['id', 'name'])
		.merge();
};

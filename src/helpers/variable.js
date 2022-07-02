module.exports = {
	current_env: process.env.NODE_ENV,
	env: {
		local: 'localhost',
		development: 'development',
		staging: 'staging',
		production: 'production',
		test: 'test',
	},
	development: {
		xApiKey: 'secret-xApiKey-for-developer',
		xDeviceNotificationCode: 'secret-xDeviceNotificationCode-for-developer',
	},
	product_voucher: {
		voucher_status: {
			redeem: 'REDEEMED',
		},
		voucher_type: {
			is_ultravoucher: {
				yes: 'YES',
				no: 'NO',
			},
		},
	},
};

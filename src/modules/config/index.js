import { Whitelist } from '../../data/models';


const getConfig = (code) => {
	const returnedData = {
		url: process.env[code],
		config: process.env[`${code}_CONFIG`],
	};

	return returnedData;
};


const listAccessControlOptions = async iplist => ({
	mode: 'allow',
	allows: iplist,
});
const allowAllAccessControlOptions = async () => ({
	mode: 'deny',
});
const dbAccessControlOptions = async () => {
	try {
		const whitelist = await Whitelist.findAll(null, 'ip_cidr');
		const iplist = whitelist.map(each => each.ip_cidr);
		const options = {
			mode: 'allow',
			allows: iplist,
		};
		return options;
	} catch (err) {
		return {
			mode: 'allow',
			allows: [],
		};
	}
};

export {
	getConfig,
	dbAccessControlOptions,
	listAccessControlOptions,
	allowAllAccessControlOptions,
};

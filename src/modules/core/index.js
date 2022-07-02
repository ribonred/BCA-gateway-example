import { ChannelManagement } from '../../data/models';
import { errors } from '../../helpers';


const login = async (client) => {
	const findChannel = await ChannelManagement.findOne(null, {
		app_id: client.app_id,
		app_key: client.app_key,
	});
	if (!findChannel) throw errors.httpError.unAuthorize('bad credentials app_id / app_key');
	return findChannel;
};

export {
	login,
};

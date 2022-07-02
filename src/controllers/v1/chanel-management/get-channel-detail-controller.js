import {
	utilities, responses, /* validators, errors, */
} from '../../../helpers';

import { v1 } from '../../../logics';

const getChannelDetailController = async (req, res) => {
	const response = await v1.channelManagementLogic.getChannelDetail(req.params.id);

	responses.httpResponse.ok(res, 'Successfully get a channel', response);
};

export default utilities.controllerWrapper(getChannelDetailController);

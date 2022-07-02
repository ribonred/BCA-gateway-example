import {
	utilities, responses, /* validators, errors, */
} from '../../../helpers';

import { v1 } from '../../../logics';

const postChannelController = async (req, res) => {
	const { body } = req;
	const response = await v1.channelManagementLogic.createChannel(body);

	responses.httpResponse.ok(res, 'Successfully create a channel', response);
};

export default utilities.controllerWrapper(postChannelController);

import {
	utilities, responses, /* validators, errors, */
} from '../../../helpers';

import { v1 } from '../../../logics';

const getChannelController = async (_req, res) => {
	const response = await v1.channelManagementLogic.getListChannel();

	responses.httpResponse.ok(res, 'Successfully get all channel', response);
};

export default utilities.controllerWrapper(getChannelController);

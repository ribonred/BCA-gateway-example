import {
	utilities, responses, /* validators, errors, */
} from '../../../helpers';

import { v1 } from '../../../logics';

const updateChannelController = async (req, res) => {
	const response = await v1.channelManagementLogic.updateChannel(req.params.id, req.body);

	responses.httpResponse.ok(res, 'Successfully update a channel', response);
};

export default utilities.controllerWrapper(updateChannelController);

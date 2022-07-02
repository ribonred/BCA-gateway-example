import {
	utilities, responses, /* validators, errors, */
} from '../../../helpers';

import { v1 } from '../../../logics';

const deleteChannelController = async (req, res) => {
	const response = await v1.channelManagementLogic.deleteChannel(req.params.id);

	responses.httpResponse.ok(res, 'Successfully delete a channel', response);
};

export default utilities.controllerWrapper(deleteChannelController);

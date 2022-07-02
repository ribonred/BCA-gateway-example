import {
	utilities, responses, /* validators, errors, */
} from '../../../helpers';

import { v1 } from '../../../logics';

const createWhitelistController = async (_req, res) => {
	const { body } = _req;
	const payload = body.ip_cidr.map(ip => ({ ip_cidr: ip, created_by: _req.user.id }));
	const response = await v1.WhitelistLogic.addWhitelist(payload);

	responses.httpResponse.ok(res, 'Successfully added ip', response);
};

export default utilities.controllerWrapper(createWhitelistController);

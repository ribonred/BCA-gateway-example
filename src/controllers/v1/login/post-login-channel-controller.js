import {
	utilities,
	responses,
	validators,
	errors,
} from '../../../helpers';

import { v1 } from '../../../logics';

const postLoginChannelController = async (req, res) => {
	const { headers } = req;

	const errorValidator = [];
	const errs = [];

	errorValidator.push(validators.required(headers, 'authorization', 'header'));
	errorValidator.push(validators.string(headers, 'authorization', 'header'));

	const authorization = (Buffer.from(headers.authorization.split(' ')[1], 'base64').toString()).split(':');

	const data = {
		app_id: authorization[0],
		app_key: authorization[1],
	};

	errorValidator.push(validators.required(data, 'app_id'));
	errorValidator.push(validators.required(data, 'app_key'));

	errorValidator.forEach((each) => {
		if (each.error) errs.push(each.error);
	});

	if (errs.length > 0) throw errors.httpError.badRequest(errs);

	const response = await v1.loginLogic.loginChannel(data);

	responses.httpResponse.okToken(res, 'Successfully get token channel', response);
};

export default utilities.controllerWrapper(postLoginChannelController);

import {
	utilities,
	responses,
	validators,
	errors,
} from '../../../helpers';

import { v1 } from '../../../logics';

const postRefreshTokenChannelController = async (req, res) => {
	const { body } = req;

	const errorValidator = [];
	const errs = [];

	errorValidator.push(validators.required(body, 'refresh_token', 'body'));
	errorValidator.push(validators.string(body, 'refresh_token', 'body'));

	errorValidator.forEach((each) => {
		if (each.error) errs.push(each.error);
	});

	if (errs.length > 0) throw errors.httpError.badRequest(errs);

	const response = await v1.loginLogic.refreshTokenChannel(body);

	responses.httpResponse.ok(res, 'Successfully refresh token channel', response);
};

export default utilities.controllerWrapper(postRefreshTokenChannelController);

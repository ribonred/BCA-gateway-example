import { renewToken } from '../../modules/jwt';
import { login } from '../../modules/core';
import { transformToken, transformRefreshToken } from '../../transformers/channel-transformer';


/**
 * Function for login channel
 */
const loginChannel = async (headers) => {
	let result = await login(headers);
	result = transformToken(result);
	return result;
};

/**
 * This function is used for generating channel's new access token from refresh token
 */
const refreshTokenChannel = async (token) => {
	let result = await renewToken(token);
	result = transformRefreshToken(result.payload);
	return result;
};

export {
	loginChannel,
	refreshTokenChannel,
};

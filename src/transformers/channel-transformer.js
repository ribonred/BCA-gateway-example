import config from 'config';
import { generateAccessToken, generateRefreshToken } from '../modules/jwt';


const transform = (each) => {
	const result = {
		id: each.app_id,
		name: each.name,
		app_key: each.name,
		url_callback: each.url_callback,
		status: each.status,
	};

	return result;
};

const transformToken = (each) => {
	const dataToEncode = {
		id: each.id,
		app_id: each.app_id,
		app_key: each.app_key,
	};
	const AccessToken = generateAccessToken(dataToEncode);
	const RefreshToken = generateRefreshToken(dataToEncode);
	return {
		token_type: 'Bearer',
		expires_in: config.jwtOption.expire_second,
		scope: 'resource.WRITE resource.READ',
		access_token: AccessToken,
		refresh_token: RefreshToken,
	};
};
const transformRefreshToken = (each) => {
	const dataToEncode = {
		id: each.id,
		app_id: each.app_id,
		app_key: each.app_key,
	};
	const AccessToken = generateAccessToken(dataToEncode);
	const RefreshToken = generateRefreshToken(dataToEncode);
	return {
		access_token: AccessToken,
		refresh_token: RefreshToken,
		expires_in: config.jwtOption.expire_second,
	};
};

const transformLogin = (each) => {
	// deprecated this method
	// will use for another maybe, so let it stay
	const result = {
		name: each.name,
		token_type: 'Bearer',
		expires_in: 3600,
		scope: 'resource.WRITE resource.READ',
		access_token: each.access_token,
		refresh_token: each.refresh_token,
	};

	return result;
};

const transformMany = array => array.map(each => transform(each));

export {
	transform,
	transformMany,
	transformLogin,
	transformToken,
	transformRefreshToken,
};

import jwt from 'jsonwebtoken';
import config from 'config';
import { errors } from '../helpers';

export const generateAccessToken = (data) => {
	const accessTokenKey = `${config.app.secretKey}-access`;
	const accessToken = jwt.sign(data, accessTokenKey, config.jwtOption.accessTokenOption);

	return accessToken;
};

export const generateRefreshToken = (data) => {
	const refreshTokenKey = `${config.app.secretKey}-refresh`;
	const refreshToken = jwt.sign(data, refreshTokenKey, config.jwtOption.refreshTokenOption);
	return refreshToken;
};


export const verifyAccessToken = (token) => {
	try {
		const options = config.jwtOption.accessTokenOption;
		jwt.verify(token, `${config.app.secretKey}-access`, options);
		return jwt.decode(token, { complete: true });
	} catch (error) {
		if (error.name !== 'TokenExpiredError') {
			throw new errors.internalError.UnauthorizedError();
		}
		throw new errors.internalError.ExpiredError('Access Token');
	}
};

export const verifyRefreshToken = (token) => {
	try {
		const options = config.jwtOption.refreshTokenOption;
		jwt.verify(token, `${config.app.secretKey}-refresh`, options);
		return jwt.decode(token, { complete: true });
	} catch (error) {
		if (error.name !== 'TokenExpiredError') {
			throw new errors.internalError.UnauthorizedError();
		}
		throw new errors.internalError.ExpiredError('Refresh Token');
	}
};
export const renewToken = data => verifyRefreshToken(data.refresh_token);

import * as apiResponse from './apiResponse';
import HTTP_CODE from './httpCode';
import INTERNAL_CODE from './internalCode';
import * as logger from '../logger';

/**
 * Good Response http handler
 */
export const okToken = (res, message, data) => {
	const response = apiResponse.tokenResponse(INTERNAL_CODE.SUCCESS.OK.code, INTERNAL_CODE.SUCCESS.OK.status, message, data);
	logger.rawResponse(res, response);
	res.status(HTTP_CODE.SUCCESS.OK.code)
		.send(response);
};
export const ok = (res, message, data) => {
	const response = apiResponse.successResponse(INTERNAL_CODE.SUCCESS.OK.code, INTERNAL_CODE.SUCCESS.OK.status, message, data);
	logger.rawResponse(res, response);
	res.status(HTTP_CODE.SUCCESS.OK.code)
		.send(response);
};

export const okPagination = (res, message, data, draw, recordsTotal, recordsFiltered) => {
	const response = apiResponse.successPaginationResponse(INTERNAL_CODE.SUCCESS.OK.code, INTERNAL_CODE.SUCCESS.OK.status, message, data, draw, recordsTotal, recordsFiltered);
	logger.rawResponse(res, response);
	res.status(HTTP_CODE.SUCCESS.OK.code)
		.send(response);
};

export const created = (res, message, data) => {
	res.status(HTTP_CODE.SUCCESS.CREATED.code)
		.send(apiResponse.successResponse(INTERNAL_CODE.SUCCESS.CREATED.code, INTERNAL_CODE.SUCCESS.CREATED.status, message, data));
};

/**
 * Bad Response http handler
 */
export const notFound = (res, errors) => {
	res.status(HTTP_CODE.CLIENT_ERROR.NOT_FOUND.code)
		.send(apiResponse.errorResponse(errors));
};
export const badRequest = (res, errors) => {
	res.status(HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code)
		.send(apiResponse.errorResponse(errors));
};
export const badRequestPartner = (res, errors) => {
	res.status(HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code)
		.send(apiResponse.errorPartnerResponse(errors));
};
export const unauthorized = (res, errors) => {
	res.status(HTTP_CODE.CLIENT_ERROR.UNAUTHORIZED.code)
		.send(apiResponse.errorResponse(errors));
};
export const forbidden = (res, errors) => {
	res.status(HTTP_CODE.CLIENT_ERROR.FORBIDDEN.code)
		.send(apiResponse.errorResponse(errors));
};
export const internalServerError = (res, errors) => {
	res.status(HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code)
		.send(apiResponse.errorResponse(errors));
};
export const commonError = (res, errors, responseCode) => {
	res.status(responseCode)
		.send(apiResponse.errorResponse(errors));
};

/**
 * Handler general error
 */
export const errorHandler = (res, responseCode, errors) => {
	switch (responseCode) {
	case HTTP_CODE.CLIENT_ERROR.NOT_FOUND.code: {
		notFound(res, errors);
		break;
	}
	case HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code: {
		badRequest(res, errors);
		break;
	}
	case HTTP_CODE.CLIENT_ERROR.UNAUTHORIZED.code: {
		unauthorized(res, errors);
		break;
	}
	case HTTP_CODE.CLIENT_ERROR.FORBIDDEN.code: {
		forbidden(res, errors);
		break;
	}
	case HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code: {
		internalServerError(res, errors);
		break;
	}
	default: {
		commonError(res, errors, responseCode);
		break;
	}
	}
};

// export const badRequest = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST.code, INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST.status, messages, data),
// 	};
// 	throw obj;
// };
// export const unauthorized = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.UNAUTHORIZED.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.UNAUTHORIZED.code, INTERNAL_CODE.CLIENT_ERROR.UNAUTHORIZED.status, messages, data),
// 	};
// 	throw obj;
// };
// export const serverError = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code,
// 		json_format:
//             apiResponse.errorResponse(INTERNAL_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code, INTERNAL_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.status, messages, data),
// 	};
// 	throw obj;
// };
// // bad request apiResponse
// export const badRequestKey = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST_KEY.code, INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST_KEY.status, messages, data),
// 	};
// 	throw obj;
// };
// export const badRequestValue = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST_VALUE.code, INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST_VALUE.status, messages, data),
// 	};
// 	throw obj;
// };
// export const badRequestType = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST_TYPE.code, INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST_TYPE.status, messages, data),
// 	};
// 	throw obj;
// };
// export const badRequestFormat = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST_FORMAT.code, INTERNAL_CODE.CLIENT_ERROR.BAD_REQUEST_FORMAT.status, messages, data),
// 	};
// 	throw obj;
// };
// export const duplicateValue = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.DUPLICATE_VALUE.code, INTERNAL_CODE.CLIENT_ERROR.DUPLICATE_VALUE.status, messages, data),
// 	};
// 	throw obj;
// };
// export const insufficientBalance = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.INSUFFICIENT_BALLANCE.code, INTERNAL_CODE.CLIENT_ERROR.INSUFFICIENT_BALANCE.status, messages, data),
// 	};
// 	throw obj;
// };
// export const alreadyProcessed = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.ALREADY_PROCESSED.code, INTERNAL_CODE.CLIENT_ERROR.ALREADY_PROCESSED.status, messages, data),
// 	};
// 	throw obj;
// };
// export const outsideOption = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.OUTSIDE_OPTION.code, INTERNAL_CODE.CLIENT_ERROR.OUTSIDE_OPTION.status, messages, data),
// 	};
// 	throw obj;
// };
// // unathorized apiResponse
// export const invalidAuth = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.UNAUTHORIZED.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.INVALID_AUTH.code, INTERNAL_CODE.CLIENT_ERROR.INVALID_AUTH.status, messages, data),
// 	};
// 	throw obj;
// };
// export const expiredAuth = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.UNAUTHORIZED.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.EXPIRED_AUTH.code, INTERNAL_CODE.CLIENT_ERROR.EXPIRED_AUTH.status, messages, data),
// 	};
// 	throw obj;
// };
// // forbiden apiResponse
// export const forbiddenAccess = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.FORBIDDEN.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.FORBIDDEN.code, INTERNAL_CODE.CLIENT_ERROR.FORBIDDEN.status, messages, data),
// 	};
// 	throw obj;
// };
// // not found apiResponse
// export const notFound = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.NOT_FOUND.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.NOT_FOUND.code, INTERNAL_CODE.CLIENT_ERROR.NOT_FOUND.status, messages, data),
// 	};
// 	throw obj;
// };
// // method forbiden apiResponse
// export const forbiddenMethod = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.CLIENT_ERROR.METHOD_NOT_ALLOWED.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.CLIENT_ERROR.FORBIDDEN_METHOD.code, INTERNAL_CODE.CLIENT_ERROR.FORBIDDEN_METHOD.status, messages, data),
// 	};
// 	throw obj;
// };
// // failed apiResponse
// export const errorFind = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.SERVER_ERROR.FAILED_FIND_RESOURCE.code, INTERNAL_CODE.SERVER_ERROR.FAILED_FIND_RESOURCE.status, messages, data),
// 	};
// 	throw obj;
// };
// export const errorCreate = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.SERVER_ERROR.FAILED_CREATE_RESOURCE.code, INTERNAL_CODE.SERVER_ERROR.FAILED_CREATE_RESOURCE.status, messages, data),
// 	};
// 	throw obj;
// };
// export const errorUpdate = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.SERVER_ERROR.FAILED_UPDATE_RESOURCE.code, INTERNAL_CODE.SERVER_ERROR.FAILED_UPDATE_RESOURCE.status, messages, data),
// 	};
// 	throw obj;
// };
// export const errorDelete = (messages, data) => {
// 	const obj = {
// 		http_status: HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code,
// 		json_format: apiResponse.errorResponse(INTERNAL_CODE.SERVER_ERROR.FAILED_DELETE_RESOURCE.code, INTERNAL_CODE.SERVER_ERROR.FAILED_DELETE_RESOURCE.status, messages, data),
// 	};
// 	throw obj;
// };
// // other service error
// export const errorService = (error) => {
// 	const obj = { http_status: error.status, json_format: error.data };
// 	throw obj;
// };

import format from './format';
import * as messages from './message';
import { internalCode, httpCode } from '../response';

class DomainError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

class ResourceNotFoundError extends DomainError {
	constructor(key, data, error) {
		super(messages.notFoundResource(key));
		this.data = format(internalCode.CLIENT_ERROR.NOT_FOUND, messages.notFoundResource(key), data);
		this.status = 404;
		this.originalError = error;
	}
}

class ValueMissMatch extends DomainError {
	constructor(key, data, error) {
		super(messages.somethingWentWrong);
		this.data = format(internalCode.SERVER_ERROR.VALUE_MISSMATCH, messages.somethingWentWrong, data);
		this.status = 500;
		this.originalError = error;
	}
}

class InvalidBodyError extends DomainError {
	constructor(key, data) {
		super(messages.invalidBody(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.invalidBody(key), data);
		this.status = 400;
	}
}
class InvalidPayloadError extends DomainError {
	constructor(key, data) {
		super(messages.serializerError(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.serializerError(key), data);
		this.status = 400;
	}
}

class InCompleteKeyError extends DomainError {
	constructor(key, data, placement) {
		super(messages.incompleteKey(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST_KEY, messages.incompleteKey(key, placement), data);
		this.status = 400;
	}
}

class InCompleteValueError extends DomainError {
	constructor(key, data, placement = 'body') {
		super(messages.incompleteValue(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST_VALUE, messages.incompleteValue(key, placement), data);
	}
}

class InvalidEmailOrPasswordError extends DomainError {
	constructor(data) {
		super(messages.invalidEmailOrPassword());
		this.data = format(internalCode.CLIENT_ERROR.INVALID_AUTH, messages.invalidEmailOrPassword(), data);
		this.status = 400;
	}
}

class InvalidTypeError extends DomainError {
	constructor(key, data) {
		super(messages.invalidType(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST_TYPE, messages.invalidType(key), data);
	}
}

class InvalidFileTypeError extends DomainError {
	constructor(key, message, data) {
		super(messages.invalidType(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST_TYPE, messages.invalidFileType(key, message), data);
	}
}

class FindResourceError extends DomainError {
	constructor(key, data, error) {
		super(messages.errorFindResource(key));
		this.data = format(internalCode.SERVER_ERROR.FAILED_FIND_RESOURCE, messages.errorFindResource(key), data || undefined);
		this.originalError = error;
	}
}

class CreateResourceError extends DomainError {
	constructor(key, data, error) {
		super(messages.errorCreateResource(key));
		this.data = format(internalCode.SERVER_ERROR.FAILED_CREATE_RESOURCE, messages.errorCreateResource(key), data || undefined);
		this.originalError = error;
	}
}

class UpdateResourceError extends DomainError {
	constructor(key, data, error) {
		super(messages.errorUpdateResource(key));
		this.data = format(internalCode.SERVER_ERROR.FAILED_UPDATE_RESOURCE, messages.errorUpdateResource(key), data || undefined);
		this.originalError = error;
	}
}

class DeleteResourceError extends DomainError {
	constructor(key, data) {
		super(messages.errorDeleteResource(key));
		this.data = format(internalCode.SERVER_ERROR.FAILED_DELETE_RESOURCE, messages.errorDeleteResource(key), data);
	}
}

class InvalidFormatError extends DomainError {
	constructor(key, data) {
		super(messages.invalidFormat(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST_FORMAT, messages.invalidFormat(key), data);
	}
}

class AlreadyUsedError extends DomainError {
	constructor(key, data) {
		super(messages.alreadyUsed(key));
		this.data = format(internalCode.CLIENT_ERROR.DUPLICATE_VALUE, messages.alreadyUsed(key), data);
		this.status = 400;
	}
}

class InvalidOptionError extends DomainError {
	constructor(key, data) {
		super(messages.invalidOption(key));
		this.data = format(internalCode.CLIENT_ERROR.OUTSIDE_OPTION, messages.invalidOption(key), data || undefined);
	}
}

class LoginError extends DomainError {
	constructor(data) {
		super(messages.loginError());
		this.data = format(internalCode.CLIENT_ERROR.INVALID_AUTH, messages.loginError(), data);
	}
}

class UnauthorizedError extends DomainError {
	constructor(data) {
		super(messages.unauthorized());
		this.data = format(internalCode.CLIENT_ERROR.UNAUTHORIZED, messages.unauthorized(), data);
		this.status = 401;
	}
}

class ExpiredError extends DomainError {
	constructor(key, data) {
		super(messages.expired(key));
		this.data = format(internalCode.CLIENT_ERROR.EXPIRED_AUTH, messages.expired(key), data);
		this.status = 401;
	}
}

class InvalidMaxLengthError extends DomainError {
	constructor(key, value, data) {
		super(messages.invalidMaxLength(key, value));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.invalidMaxLength(key, value), data);
	}
}

class InvalidMinLengthError extends DomainError {
	constructor(key, value, data) {
		super(messages.invalidMinLength(key, value));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.invalidMinLength(key, value), data);
	}
}

class InvalidMaxValueError extends DomainError {
	constructor(key, value, data) {
		super(messages.invalidMaxValue(key, value));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.invalidMaxValue(key, value), data);
	}
}

class MaxFileSizeError extends DomainError {
	constructor(key, data) {
		super(messages.invalidMaxValue(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.maxFileSize(key), data);
	}
}

class InvalidMinValueError extends DomainError {
	constructor(key, value, data) {
		super(messages.invalidMinValue(key, value));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.invalidMinValue(key, value), data);
	}
}

class Forbidden extends DomainError {
	constructor(key, value, data) {
		super(messages.forbidden());
		this.data = format(internalCode.CLIENT_ERROR.FORBIDDEN, messages.forbidden(), data);
		this.status = 403;
	}
}

class UnavailableStock extends DomainError {
	constructor(data) {
		super(messages.unavailableStock());
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.unavailableStock(data.name), data);
		this.status = 400;
	}
}

class GeneralError extends DomainError {
	constructor(key, data) {
		super(messages.generalRequestErrors(key));
		this.data = format(internalCode.CLIENT_ERROR.GENERAL_ERRORS, messages.generalRequestErrors(key), data);
	}
}

class InvalidProcess extends DomainError {
	constructor(key, data) {
		super(messages.generalRequestErrors(key));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.invalidProcess(key), data);
		this.status = 400;
	}
}

class ExpiredVoucher extends DomainError {
	constructor(key, data) {
		super(messages.expiredVoucher());
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.expiredVoucher(key), data);
		this.status = 400;
	}
}

class AlreadyRedeemed extends DomainError {
	constructor(data) {
		super(messages.alreadyRedeemed(data));
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.alreadyRedeemed(data));
		this.status = 400;
	}
}

class VoucherNotFound extends DomainError {
	constructor() {
		super(messages.invalidVoucherCode());
		this.data = format(internalCode.CLIENT_ERROR.BAD_REQUEST, messages.invalidVoucherCode());
		this.status = 400;
	}
}

class PromoLimitError extends DomainError {
	constructor(additionalMessage) {
		super(messages.promoLimit(additionalMessage));
		this.data = format(internalCode.CLIENT_ERROR.PROMO_LIMIT_ERROR, messages.promoLimit(additionalMessage));
		this.status = 400;
	}
}

class PromoEndedError extends DomainError {
	constructor() {
		super(messages.promoEnded());
		this.data = format(internalCode.CLIENT_ERROR.PROMO_ENDED_ERROR, messages.promoEnded());
		this.status = 400;
	}
}

class DoublePromoPaymentMethodError extends DomainError {
	constructor() {
		super(messages.promoEnded());
		this.data = format(internalCode.CLIENT_ERROR.DOUBLE_PROMO_PAYMENT_METHOD_ERROR, messages.doublePromoPaymentMethod());
		this.status = 400;
	}
}

class ExpiredVoucherError extends DomainError {
	constructor(key, value, data) {
		super(messages.expiredVoucher(key));
		this.data = format(internalCode.CLIENT_ERROR.EXPIRED_VOUCHER, messages.expiredVoucher(key), data);
		this.status = httpCode.CLIENT_ERROR.BAD_REQUEST.code;
	}
}

class UnknownError extends DomainError {
	constructor(key, data, error) {
		super(messages.errorFindResource(key));
		this.data = format(internalCode.SERVER_ERROR.INTERNAL_SERVER_ERROR, messages.somethingWentWrong, data || undefined);
		this.originalError = error;
	}
}

export {
	ResourceNotFoundError,
	InvalidBodyError,
	InCompleteKeyError,
	InCompleteValueError,
	InvalidEmailOrPasswordError,
	InvalidTypeError,
	InvalidFileTypeError,
	FindResourceError,
	CreateResourceError,
	UpdateResourceError,
	DeleteResourceError,
	InvalidFormatError,
	AlreadyUsedError,
	InvalidOptionError,
	LoginError,
	UnauthorizedError,
	ExpiredError,
	InvalidMaxLengthError,
	InvalidMinLengthError,
	InvalidMaxValueError,
	InvalidMinValueError,
	Forbidden,
	MaxFileSizeError,
	UnavailableStock,
	GeneralError,
	InvalidProcess,
	ValueMissMatch,
	ExpiredVoucher,
	AlreadyRedeemed,
	VoucherNotFound,
	PromoLimitError,
	PromoEndedError,
	DoublePromoPaymentMethodError,
	ExpiredVoucherError,
	UnknownError,
	InvalidPayloadError,
};

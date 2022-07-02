// code,
// 	status,
// 	messages: msg,
// 	data,

const errorFormat = (internalCode, message, data) => ({
	code: internalCode.code,
	status: internalCode.status,
	message,
	data,
});

export default errorFormat;

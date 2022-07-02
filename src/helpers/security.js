const charEncoding = {
	ascii: 'ascii',
	utf8: 'utf8',
	utf16le: 'utf16le',
	ucs2: 'ucs2',
	base64: 'base64',
	latin1: 'latin1',
	binary: 'binary',
	hex: 'hex',
};

const encodedString = (text, encoding) => {
	const buff = Buffer.from(text);
	return buff.toString(encoding);
};

const decodeString = (text, fromEncoding, toEncoding) => {
	const buff = Buffer.from(text, fromEncoding);
	return buff.toString(toEncoding);
};

export {
	encodedString,
	decodeString,
	charEncoding,
};

import {
	requestInquirySerializer,
	responseInquirySerializer,
	requestPaymentSerializer,
} from './inquiry';

import { createChannelSerializer } from './channel';
import { whitelistSerializer } from './whitelist';

const vaSerializer = require('./request-va');

module.exports = {
	createChannelSerializer,
	vaSerializer,
	requestInquirySerializer,
	responseInquirySerializer,
	requestPaymentSerializer,
	whitelistSerializer,
};

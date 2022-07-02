import { v1Controller } from '../../controllers';
import { validatorMidleware, authMiddleware } from '../../middlewares';

export default (routes) => {
	routes.post('/order/request-va', authMiddleware.closedAuth, validatorMidleware.ValidatorSerializer('vaSerializer'), v1Controller.requestVa.requestVaController);
	routes.post('/order/inquiry',
		authMiddleware.PartnerAuth,
		validatorMidleware.PartnerValidatorSerializer('requestInquirySerializer'),
		v1Controller.requestVa.inquiryVaController);
	routes.post('/order/payment',
		authMiddleware.PartnerAuth,
		validatorMidleware.PartnerValidatorSerializer('requestPaymentSerializer'),
		v1Controller.requestVa.paymentVaController);
};

import {
	responses,
	utilities,
} from '../../../helpers';
import { v1 } from '../../../logics';


const inquiryVaController = async (req, res) => {
	const { body } = req;
	const response = await v1.InquiryVa.validateVa(res, body, req.headers['request-id']);
	if (response.invalid) {
		//  TODO: need to map this if error or not found repsonses
		return responses.httpResponse.okToken(res, 'Failed inquiry Va', response.resultPayload);
	}
	// TODO: need to adapt without wrapper response for BCA, for now using okToken
	return responses.httpResponse.okToken(res, 'Successfully inquiry Va', response.resultPayload);
};
export default utilities.controllerWrapper(inquiryVaController);

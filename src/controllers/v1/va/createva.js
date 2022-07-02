import {
	responses,
	utilities,
} from '../../../helpers';
import { v1 } from '../../../logics';


const requestVaController = async (req, res) => {
	const { body } = req;
	const response = await v1.VaLogic.createVa(req.user, body, req.headers['request-id']);

	responses.httpResponse.ok(res, 'Successfully create Va', response);
};
export default utilities.controllerWrapper(requestVaController);

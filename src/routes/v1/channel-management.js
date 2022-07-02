import { v1Controller } from '../../controllers';
import { validatorMidleware, authMiddleware } from '../../middlewares';


export default (routes) => {
	routes.get('/channel', authMiddleware.adminAuth, v1Controller.channelManagement.getChannelController);
	routes.post('/channel', authMiddleware.adminAuth, validatorMidleware.ValidatorSerializer('createChannelSerializer'), v1Controller.channelManagement.postChannelController);
	routes.get('/channel/:id', authMiddleware.adminAuth, v1Controller.channelManagement.getChannelDetailController);
	routes.delete('/channel/:id', authMiddleware.adminAuth, v1Controller.channelManagement.deleteChannelController);
	routes.patch('/channel/:id', authMiddleware.adminAuth, v1Controller.channelManagement.updateChannelController);
};

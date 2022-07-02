import { v1Controller } from '../../controllers';
import { validatorMidleware, authMiddleware } from '../../middlewares';

export default (routes) => {
	routes.post('/whitelist', authMiddleware.adminAuth, validatorMidleware.ValidatorSerializer('whitelistSerializer'), v1Controller.whitelist.createWhitelistController);
	// routes.get('/whitelist', v1Controller.login.postRefreshTokenChannelController);
};

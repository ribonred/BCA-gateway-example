import { v1Controller } from '../../controllers';
// import { publicAuthMiddleware } from '../../middlewares';

export default (routes) => {
	routes.post('/auth/token', v1Controller.login.postLoginChannelController);
	routes.post('/auth/refresh-token', v1Controller.login.postRefreshTokenChannelController);
	// routes.post('/public/channel/refresh-token', publicAuthMiddleware , v1Controller.login.postRefreshTokenChannelController);
};

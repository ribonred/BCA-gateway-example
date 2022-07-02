import { Router } from 'express';
import login from './login-routes';
import channelManagement from './channel-management';
import va from './va';
import whitelist from './whitelis-route';

const routes = Router();

login(routes);
channelManagement(routes);
va(routes);
whitelist(routes);

export default routes;

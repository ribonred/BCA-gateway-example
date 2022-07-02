import config from 'config';
import app from './app';
import { logger } from './helpers';

const port = process.env.PORT || config.app.port;

app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});

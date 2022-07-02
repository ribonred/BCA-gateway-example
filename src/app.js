import { } from 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { v1Routes } from './routes';
import {
	parsers,
	responses,
	errors,
	logger,
} from './helpers';
import { requestMiddleware, AccessControlMiddleware } from './middlewares';
import { testDb } from './helpers/checkDbCon';
import { dbAccessControlOptions } from './modules/config';
// config modules access control
// import { dbAccessControlOptions, listAccessControlOptions, allowAllAccessControlOptions } from './modules/config';

testDb();
// allow list of ip in database
const ipcontrol = new AccessControlMiddleware(dbAccessControlOptions);
// allow list of ip
// const ipcontrol = new AccessControlMiddleware(listAccessControlOptions, ['127.0.0.1']);
// allow all ip
// const ipcontrol = new AccessControlMiddleware(allowAllAccessControlOptions);
logger.info(`node env: ${process.env.NODE_ENV}`);
const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.enable('trust proxy');
// whitelist ip from DB
app.use(ipcontrol);
app.use(parsers.jsonParser);
app.use(parsers.urlencodedExtendedParser);

app.use(requestMiddleware.initiate);

app.use('/h2h-payment-gateway/v1/', v1Routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	next(errors.httpError.notFound(new errors.internalError.ResourceNotFoundError('URL', null)));
});

app.use((err, req, res, next) => {
	const appErrors = [];
	const data = err.errors || err;

	if (Array.isArray(data)) {
		for (let i = 0; i < data.length; i += 1) {
			appErrors.push(data[i].data);
		}
	} else {
		appErrors.push(data.data || data);
	}

	let { originalError } = err;

	if (appErrors[0] instanceof Error) {
		[originalError] = appErrors;
		appErrors.shift();
		const overidedError = (new errors.internalError.UnknownError()).data;
		appErrors.push(overidedError);
	}

	logger.errorException(res, { status: err.status || err.http_status || 500, appErrors, originalError });

	responses.httpResponse.errorHandler(res, err.status || 500, { errors: appErrors, meta: { 'request-id': res.locals.requestId } });
});


export default app;

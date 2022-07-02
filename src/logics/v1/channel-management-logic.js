import generateApiKey from 'generate-api-key';
import {
	errors,
} from '../../helpers';

import { ChannelManagement } from '../../data/models';
import { convertDateTime } from '../../helpers/utilities';


const createChannel = async (body) => {
	const appId = generateApiKey({ method: 'base62' });
	const appKey = generateApiKey({ method: 'string', min: 32, max: 32 });

	const findChannel = await ChannelManagement.findOne(null, {
		name: body.name,
	});
	if (findChannel) throw errors.httpError.badRequest('Channel name already exist');

	const tryInsert = await ChannelManagement.create(null, {
		name: body.name,
		app_id: appId,
		app_key: appKey,
		url_callback: body.url_callback,
		role: body.role,
		created_at: convertDateTime(new Date()),
		modified_at: convertDateTime(new Date()),
	});

	return {
		id: tryInsert[0],
		app_id: appId,
		app_key: appKey,
	};
};

const getListChannel = async () => {
	let channels = await ChannelManagement.findAll(null);
	channels = JSON.parse(JSON.stringify(channels));
	channels.map(channel => channel);
	if (channels.length === 0) throw errors.httpError.notFound('No channel found');

	return channels;
};

const getChannelDetail = async (id) => {
	const channel = await ChannelManagement.findById(null, id);
	if (!channel) throw errors.httpError.notFound('Channel not found');

	return channel;
};

const deleteChannel = async (id) => {
	const channel = await ChannelManagement.destroy(null, id);
	if (!channel) throw errors.httpError.notFound('Channel not found');

	return channel;
};

const updateChannel = async (id, body) => {
	const payload = {
		name: body.name,
		url_callback: body.url_callback,
		status: body.status,
		modified_at: convertDateTime(new Date()),
	};

	const channel = await ChannelManagement.update(null, id, payload);
	if (!channel) throw errors.httpError.notFound('Channel not found');

	return channel;
};

export {
	createChannel,
	getListChannel,
	getChannelDetail,
	deleteChannel,
	updateChannel,
};

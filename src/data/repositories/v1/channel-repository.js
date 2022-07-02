import { errors } from '../../../helpers';
import { Channel } from '../../models';

const findChannelById = async (trx, idChannel) => {
	try {
		const result = await Channel.findOne(trx, {
			id: idChannel,
		});
		return result;
	} catch (error) {
		throw new errors.internalError.FindResourceError('channel by id', null, error);
	}
};

export {
	findChannelById,
};

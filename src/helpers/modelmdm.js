// The guts of a model that uses mdmjs to store and retrieve data from a
// database using the provided `mdm` instance. Custom functionality can be
// composed on top of this set of common guts.
//
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)

module.exports = ({
	mdm = {},
	name = 'name',
	tableName = 'tablename',
	selectableProps = [],
	timeout = 1000,
}) => {
	const create = (trx = null, data) => {
		const props = data;
		delete props.id; // not allowed to set `id`

		const query = mdm.insert(props)
			.into(tableName)
			.timeout(timeout);

		if (trx) {
			query.transacting(trx);
		}

		return query;
	};

	const findAll = (trx = null, props = null) => {
		const query = mdm.select(props || selectableProps)
			.from(tableName)
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};

	const find = (trx = null, filters = {}, props = null) => {
		const query = mdm.select(props || selectableProps)
			.from(tableName)
			.where(filters)
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};

	// Same as `find` but only returns the first match if >1 are found.
	const findOne = (trx = null, filters, props = null) => {
		find(filters, props)
			.then((results) => {
				if (trx) {
					results.transacting(trx);
				}
				if (!Array.isArray(results)) return results;
				return results[0];
			});
	};

	const findById = (trx, id) => {
		const query = mdm.select(selectableProps)
			.from(tableName)
			.where({ id })
			.timeout(timeout)
			.then((results) => {
				if (trx) {
					results.transacting(trx);
				}
				if (!Array.isArray(results)) return results;
				return results[0];
			});
		return query;
	};

	const update = (trx = null, id, data) => {
		const props = data;
		delete props.id; // not allowed to set `id`

		const query = mdm.update(props)
			.from(tableName)
			.where({ id })
			.returning(selectableProps)
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};

	const destroy = (trx = null, id) => {
		const query = mdm.del()
			.from(tableName)
			.where({ id })
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
	};

	const query = () => mdm.from(tableName)
		.timeout(timeout);

	const upsert = (trx = null, data) => {
		const q = trx || mdm;
		if (trx) {
			q.transacting(trx);
		}
		const firstData = data[0] ? data[0] : data;
		return q.raw(`${mdm(tableName).insert(data).toQuery()} ON DUPLICATE KEY UPDATE ${
			Object.getOwnPropertyNames(firstData).map(field => `${field}=VALUES(${field})`).join(', ')}`)
			.then(dbRes => (Object.values(dbRes)[0].insertId)).catch((err) => {
				throw err;
			});
	};

	return {
		name,
		tableName,
		selectableProps,
		timeout,
		create,
		findAll,
		find,
		findOne,
		findById,
		update,
		destroy,
		query,
		upsert,
	};
};

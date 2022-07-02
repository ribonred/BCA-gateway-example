// The guts of a model that uses Knexjs to store and retrieve data from a
// database using the provided `knex` instance. Custom functionality can be
// composed on top of this set of common guts.
//
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)

export default ({
	knex = {},
	name = 'name',
	tableName = 'tablename',
	selectableProps = [],
	timeout = 5000,
}) => {
	const create = (trx = null, properties) => {
		const props = properties;

		delete props.id; // not allowed to set `id`

		const query = knex.insert(props)
			.into(tableName)
			.timeout(timeout);

		if (trx) {
			query.transacting(trx);
		}

		return query;
	};

	const findAll = (trx = null, props = null) => {
		const query = knex.select(props || selectableProps)
			.from(tableName)
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}

		return query;
	};

	const find = (trx = null, filters = {}, props = null) => {
		const query = knex.select(props || selectableProps)
			.from(tableName)
			.where(filters)
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};

	// Same as `find` but only returns the first match if >1 are found.
	const findOne = (trx = null, filters, props = null) => find(trx, filters, props)
		.then((results) => {
			if (trx) {
				results.transacting(trx);
			}
			if (!Array.isArray(results)) return results;
			return results[0];
		});

	const findById = (trx = null, id) => (trx || knex).select(selectableProps)
		.from(tableName)
		.where({ id })
		.timeout(timeout)
		.then((results) => {
			if (!Array.isArray(results)) return results;
			return results[0];
		});

	const findMax = (trx = null, filters = {}, props = null) => {
		const query = knex.max(props || selectableProps)
			.from(tableName)
			.where(filters)
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};

	const update = (trx = null, id, properties) => {
		const props = properties;

		delete props.id; // not allowed to set `id`

		const query = knex.update(props)
			.from(tableName)
			.where({ id })
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};

	const updateWhere = (trx = null, filters, properties) => {
		const props = properties;

		delete props.id; // not allowed to set `id`

		const query = knex.update(props)
			.from(tableName)
			.where(filters)
			.timeout(timeout);
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};

	const destroy = (trx = null, id = false, filters = { id: null }) => {
		const query = knex.del()
			.from(tableName)
			.timeout(timeout);
		if (id) {
			query.where({ id });
		} else {
			query.where(filters);
		}
		if (trx) {
			query.transacting(trx);
		}
		return query;
	};

	const query = () => knex.from(tableName)
		.timeout(timeout);

	const upsert = (trx = null, data) => {
		const q = trx || knex;
		if (trx) {
			q.transacting(trx);
		}
		const firstData = data[0] ? data[0] : data;
		return q.raw(`${knex(tableName).insert(data).toQuery()} ON DUPLICATE KEY UPDATE ${
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
		findMax,
		updateWhere,
	};
};

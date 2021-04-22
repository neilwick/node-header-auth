const db = require('../config/db');

module.exports = class {
	static async getUser(user, hash) {
		let connection = await db.getConnection();
		const rows = await connection.query(
			'SELECT userId, user FROM `user` WHERE `user` = ? AND `hash` = ? LIMIT 1',
			[user, hash]
		);
		if (rows.length > 0) {
			return { user: rows[0] };
		}

		return { user: null };
	}
};

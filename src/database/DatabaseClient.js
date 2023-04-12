const fs = require('node:fs');
var path = require('path');

class DatabaseClient {
	static findAll() {
		const dbPath = path.join(__dirname + '/socialmedia.json');
		const settings = { encoding: 'utf-8' };
		return fs.readFileSync(dbPath, settings, (err, data) => {
			if (err) throw new Error(err);
			return data;
		});
	}
}

module.exports = DatabaseClient;

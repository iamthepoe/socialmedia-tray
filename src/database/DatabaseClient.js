const fs = require('fs');
const path = require('path');

class DatabaseClient {
	static dbPath = path.join(__dirname, 'socialmedia.json');
	static findAll() {
		const settings = { encoding: 'utf-8' };
		let data = fs.readFileSync(this.dbPath, settings);
		return JSON.parse(data);
	}

	static create(socialmedia) {
		const { name, url, windowOptions } = socialmedia;
		const checked = true;
		const data = this.findAll();
		data.push({ name, url, windowOptions, checked });
		fs.writeFileSync(this.dbPath, JSON.stringify(data));
		return data[data.length - 1];
	}
}

module.exports = DatabaseClient;

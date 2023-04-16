const fs = require('fs');
const path = require('path');

class DatabaseClient {
	static dbPath = path.join(__dirname, 'socialmedia.json');
	
	static findAll() {
		const settings = { encoding: 'utf-8' };
		let data = fs.readFileSync(this.dbPath, settings);
		return JSON.parse(data);
	}

	static updateAll(data){
		fs.writeFileSync(this.dbPath, JSON.stringify(data));
		return true;
	}

	static saveIcon(name, icon){
		try{
			fs.copyFileSync(icon.path, path.join(__dirname, '../icons/' + name + path.extname(icon.name)));
			return true;
		}catch(e){
			throw e;
		}
	}

	static create(socialmedia, icon) {
		const { name, url, windowOptions } = socialmedia;
		const checked = true;
		const data = this.findAll();
		data.push({ name, url, windowOptions, checked });
		fs.writeFileSync(this.dbPath, JSON.stringify(data));
		this.saveIcon(name, icon);
		return data[data.length - 1];
	}
}

module.exports = DatabaseClient;

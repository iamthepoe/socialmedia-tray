const DatabaseClient = require('../database/DatabaseClient.js');
const SocialMediaList = DatabaseClient.findAll();

module.exports = SocialMediaList;

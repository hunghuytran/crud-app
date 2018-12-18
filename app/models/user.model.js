const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	roles: { type: String, default: 'admin' }
});

module.exports = mongoose.model('User', UserSchema);
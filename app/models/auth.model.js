const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AuthSchema = Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	token: { type: String, default: '', required: true }
});

module.exports = mongoose.model('Auth', AuthSchema);
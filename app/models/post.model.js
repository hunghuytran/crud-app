const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	title: { type: String, required: true },
	contents: { type: String, required: true },
	timestamps: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
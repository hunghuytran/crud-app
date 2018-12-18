var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

const User = require('./app/models/user.model.js');

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000

/*
let user = new User({
	username: 'admin',
	password: 'pass',
	roles: 'admin'
})

user.save()
*/

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
.catch((err) => {
	console.log('Connection to mongodb has failed.');
	process.exit();
});


require('./app/routes/post.routes.js')(app);
require('./app/routes/auth.routes.js')(app);

var server = app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
});

module.exports = server;

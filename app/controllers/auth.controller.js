const User = require('../models/user.model.js');
const Auth = require('../models/auth.model.js');
const jwt = require('jsonwebtoken');


exports.signin = async (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	try {
		let user = await User.findOne({ username, password })

		if(!user) {
			return res.status(404).send({ message: 'Your username or password is incorrect. Please check them and try again' });
		} else {
			let token = {
				user: user,
				token: jwt.sign({username}, process.env.AUTH_SECRET_KEY, { expiresIn: '1h' })
			}

			var auth = new Auth(token);
			auth.save();
			return res.send(token);
		}
	} catch (err) {
		return res.send({ message: err })
	}
};

exports.signout = async (req, res) => {
	let token = await Auth.findOneAndDelete({ token: req.params.token })

	try {
		if(!token) {
			return res.status(404).send({ message: 'Invalid token.' });
		} else {
			return res.send({ message: 'You have successfully logged out!'});
		}
	} catch (err) {
		res.send({ message: err })
	}
};

exports.verify = async (req, res, next) => {
	var object = await Auth.findOne({ token: req.params.token });

	try {
		if(!object) {
			return res.send({ message: 'Token is not supplied.' });
		} else {
			jwt.verify(object.token, process.env.AUTH_SECRET_KEY, function(error, decoded) {
				if(error) return res.send('Token is invalid.');
				next();
			})
		}
	} catch (err) {
		res.send({ message: err });
	}
}
const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');
const Auth = require('../models/auth.model.js');

exports.create = async (req, res) => {
	let auth = await Auth.findOne({token:req.params.token}).populate('user')
	let post = new Post({
		title: req.body.title,
		contents: req.body.contents
	});

	try {
		if(!auth) {
			return res.send({ message: 'Token is invalid.' });
		} else {
			if(auth.user.roles != 'admin') return res.send({ message: 'Access denied.' });
			let newPost = await post.save()
			return res.send(newPost);
		}
	} catch (err) {
		res.send({ message: err })
	}
};

exports.findAll = async (req, res) => {
	let posts = await Post.find();

	try {
		if(!posts) {
			return res.send({ message: 'No posts were found.' });
		} else {
			res.send(posts);
		}
	} catch (err) {
		res.send({ message: err })
	}
}

exports.update = async (req, res) => {

	let auth = await Auth.findOneAndUpdate({ token: req.params.token }).populate('user');
	let post = await Post.findOneAndUpdate({ _id: req.params.id },
	{ title: req.body.title, contents: req.body.contents, timestamps: Date.now() },
	{ new: true });

	try {
		if(!auth) {
			return res.send({ message: 'Token is invalid.' });
		} else {
			if(auth.user.roles !== 'admin') return res.send({ message: 'Access denied.' });
			res.send(post);
		}
	}
	catch (err) {
		res.send({ message: err })
	}
};

exports.delete = async (req, res) => {
    let post = await Post.findOneAndDelete({ _id: req.params.id })
    
    try {
    	res.send({message:"successful deleted post."});
    } catch (err) {
    	res.send({ message: err });
    }
};
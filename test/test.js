let server = require('../server.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

const User = require('../app/models/user.model.js');
const Post = require('../app/models/post.model.js');
const Auth = require('../app/models/auth.model.js');

chai.use(chaiHttp);
describe('Application test!', () => {

	before((done) => { 
		let post = new Post({
			title: 'Hello world.',
			contents: 'goodbye.'
		})
		post.save()
		done();
	});

	describe('Testing user with admin privilege.', () => {
		let token = null;
		let id = null;

		it('admin should be able to signin.',  (done) => {
			let user = new User({
				username: 'admin',
				password: 'pass',
				roles: 'admin'
			})

			user.save()
			chai.request(server)
			.post('/auth/signin')
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('user');
				res.body.should.have.property('token');
				token = res.body.token;
				done();
			})
		})

		it('admin should be able to create a post.', (done) => {
			let post = {
			title: 'hello world',
			contents: 'description'
			}

			chai.request(server)
			.post(`/api/posts/${token}`)
			.send(post)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('title');
				res.body.should.have.property('contents');
				res.body.should.have.property('timestamps');
				id = res.body._id;
				done();
			})
		})

		it('admin should be able to read the posts.', (done) => {
			chai.request(server)
			.get(`/api/posts/${token}`)
			.end((err, res) => {
				res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	done();
			})
		})

		it('admin should be able to update post.', (done) => {
			let post = {
				title: 'new world',
				contents: 'old world'
			}

			chai.request(server)
			.put(`/api/posts/${id}/${token}`)
			.send(post)
			.end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('title').eql('new world');
			  	res.body.should.have.property('contents').eql('old world');
			  	done();
			})
		})

		it('admin should be able to delete a post.', (done) => {
			chai.request(server)
			.delete(`/api/posts/${id}/${token}`)
			.end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.have.property('message').eql('successful deleted post.');
			  	done();
			})
		})

		it('admin should be able to sign out.', (done) => {
			chai.request(server)
			.delete(`/auth/signout/${token}`)
			.end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.have.property('message').eql('You have successfully logged out!');
			  	done();
			})
		});
	})

	describe('Testing normal user.', () => {
		let token = null;
		let id = null;

		it('normal user should be able to signin.',  (done) => {
			let user = new User({
				username: 'normal',
				password: 'pass',
				roles: 'normal'
			})

			user.save()
			chai.request(server)
			.post('/auth/signin')
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('user');
				res.body.should.have.property('token');
				token = res.body.token;
				done();
			})
		})

		it('normal user should be able to read the posts.', (done) => {
			chai.request(server)
			.get(`/api/posts/${token}`)
			.end((err, res) => {
				res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	done();
			})
		})

		it('normal user should not be able to create a post', (done) => {
			let createPost = {
				title: 'failure',
				contents: 'operation'	
			}
			chai.request(server)
			.post(`/api/posts/${token}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('message').eql('Access denied.')
				done();
			})
		})

		it('normal user should not be able to update post.', (done) => {
			let update = {
				title: 'new world',
				contents: 'old world'
			}

			Post.findOne({title:'Hello world.'}, function(err, res){
				id = res._id

				chai.request(server)
				.put(`/api/posts/${id}/${token}`)
				.send(update)
				.end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Access denied.');
				  	done();
				})
			})
		})


		it('normal user should be able to delete a post.', (done) => {
			chai.request(server)
			.delete(`/api/posts/${id}/${token}`)
			.end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.have.property('message').eql('successful deleted post.');
			  	done();
			})
		})

		it('normal user should be able to sign out.', (done) => {
			chai.request(server)
			.delete(`/auth/signout/${token}`)
			.end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.have.property('message').eql('You have successfully logged out!');
			  	done();
			})
		});
	})

	after(function() {
		User.deleteMany({}, function(err) {});
		Post.deleteMany({}, function(err) {});
		Auth.deleteMany({}, function(err) {});
	})
});
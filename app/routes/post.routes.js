const auth = require('../controllers/auth.controller.js');

module.exports = function(app) {
 
    var posts = require('../controllers/post.controller.js');

    app.post('/api/posts/:token', auth.verify, posts.create);

    app.get('/api/posts/:token', auth.verify , posts.findAll);
 
    app.put('/api/posts/:id/:token', auth.verify, posts.update);

    app.delete('/api/posts/:id/:token', auth.verify, posts.delete);
}
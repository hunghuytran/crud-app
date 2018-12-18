module.exports = function(app) {
    
    var auth = require('../controllers/auth.controller.js');

    app.post('/auth/signin', auth.signin);

    app.delete('/auth/signout/:token', auth.signout);
}
var express = require('express')
  , router = express.Router()
  , User = require('../models/user')
  , ObjectId = require('mongodb').ObjectID

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) throw err;
        var usersArray = new Array;
        users.forEach(function(obj) {
            //console.log(obj.id);
            usersArray.push({id: obj.id, name: obj.name, email: obj.email});
        });
        res.render('users/users', {users: usersArray})
    });
    
});

router.get('/:id', function (req, res, next) {
    //res.send('get user by ID:' + req.params.id);
    User.find({"_id": req.params.id}, function(err, user) {
        if (err) throw err;
        console.log(user);
        res.render('users/user', {user: user})
    });
});

module.exports = router;
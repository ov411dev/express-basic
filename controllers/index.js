var express = require('express')
  , router = express.Router()
  , User = require('../models/user')

// middleware to use for all requests
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // do logging
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Request from - ' + ip);
    next(); // make sure we go to the next routes and don't stop here
});

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))
router.use(require('./search'))

router.get('/', function(req, res) {
  res.render('index')
})

router.get('/register', function (req, res, next) {
    res.render('users/register', {reg:'register'})
});

router.post('/register', function (req, res, next) {
    
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
    
    var userData = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password 
    });

    userData.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully!');
    });
/*
chris.save(function(err){
  if (err) throw err;
  console.log('indexing ... ');
  chris.on('es-indexed', function(err, res){
    if (err) throw err;
    console.log(res);
    });
  });
*/
    res.render('users/register', {reg:'success'})
});

module.exports = router
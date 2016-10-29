var express = require('express')
  , router = express.Router()
  , Business = require('../models/business')
  , User = require('../models/user')
  , mongoosastic = require('mongoosastic')

/* search business */
router.post('/search/business', function(req, res, next) {
    var from = req.body.from ? req.body.from : 0;
    var size = req.body.size ? req.body.size : 30;
    var distance = req.body.distance ? req.body.distance : 10;
    var search_str = req.query.q;
    var words = search_str.split(" ");

    var must = [];
    must.push({"match" : { "name": words[0] }});
    if(words.length > 1) {
        must.push({"match" : { "name": words[0] + " " + words[1] }});
    }
    var should = [];
    should.push({"match" : { "category": words[0] }});
    var bool = { must, should };
    var search_query = {
        "filtered":{  
         "query":{ bool },
         "filter":{  
            "geo_distance":{  
               "distance": distance + "km",
               "location":{  
                  "lat":43.8156,
                  "lon":-79.4533
               }
            }
         }
      }
    };
    //res.send(search_query);
    Business.search(search_query, 
    { from: from, size: size }, function(err, results) { 
        res.send(results.hits);
    });
});

/* search category */
router.post('/search/category', function(req, res, next) {
    Business.search({"match_all":{}}, 
    { aggs : {"tag":{"terms":{"field":"category","size":200}}}}, function(err, results) {
        res.send(results);
    });
});

/* search user */
router.get('/search/user', function(req, res, next) {
    User.search({query_string: {query: req.query.q }}, function(err, results) {
        console.log(results);
        res.send(results);
        //res.send(req.query.q);
        /*
        results.forEach(function(obj) {
            //console.log(obj.id);
            usersArray.push({id: obj.id, name: obj.name, email: obj.email});
        });
        res.render('users/users', {users: usersArray})
        */
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var controllers =require('../controllers');


router.get('/', function(req, res, next) {
    controllers.newsfeed.findnews({}, function (err, response) {
        console.log(response);
        res.render('index', {title:'home',news:response});
    })
});


module.exports = router;

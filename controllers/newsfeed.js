var MongoClient = require('mongodb').MongoClient;
var constants   =require('../constants');

var mongoConnectionUrl=constants.constant.mongoConnectionUrl;

var findnews  = function(criteria,callback) {
    MongoClient.connect(mongoConnectionUrl, function (err, db) {
        if (err)
            throw err;
        else {
            db.db('newsdata').collection('newsdata').find({}).sort({pubdate:1}).toArray(function (err, resp) {
                if (err) throw err;
                else {
                    console.log(resp);
                    callback(null,resp);
                }
            });
        }
    });
};

var savenewsindb =function (item,callback) {
    var result = {};
    result.title = item.title;
    result.description = item.description;
    result.summary = item.summary;
    result.pubdate = item.pubdate;
    result.link = item.link;
    result.image = item.image;
    MongoClient.connect(mongoConnectionUrl,function(err,db)
    {
        if(err)
            throw err;
        else
        {
            db.db('newsdata').collection('newsdata').find({title:result.title}).toArray(function(err,resp)
            {
                if(err) throw err;
                else
                {
                    if(resp.length==0){
                        db.db('newsdata').collection('newsdata').save(result,function(err,result)
                        {
                            if(err) throw err;
                        });
                    }
                }
            });

        }
    });
}

module.exports ={
    'findnews' : findnews,
    'savenewsindb' : savenewsindb
}

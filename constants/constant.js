var mongoConnectionUrl = 'mongodb://vgarg:qwerty1@ds163156.mlab.com:63156/newsdata';

var categoryurls = [ { url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    name: 'Top Stories' },
    { url: 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms',
        name: 'Sports' },
    { url: 'https://timesofindia.indiatimes.com/rssfeeds/1221656.cms',
        name: 'Most Recent Stories' } ];

module.exports={
    'categoryurls' :categoryurls,
    'mongoConnectionUrl' :mongoConnectionUrl
}
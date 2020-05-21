var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {  
    hosts: [
      //'https://[username]:[password]@[server]:[port]/'
      'http://localhost:9200/'
                  ]
});

module.exports = client;

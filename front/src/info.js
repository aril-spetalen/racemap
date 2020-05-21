var searchClient = require('./client.js');

searchClient.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
});

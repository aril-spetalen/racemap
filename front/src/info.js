var searchClient = require('./client.js');

searchClient.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
});

searchClient.count({index: 'races',type: 'race'},function(err,resp,status) {  
    console.log('races:',resp);
});

searchClient.count({index: 'races',type: 'club'},function(err,resp,status) {  
    console.log('clubs:',resp);
});


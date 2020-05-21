var client = require('./client.js');

client.search({  
  index: 'races',
  type: 'race',
  _source: ['name','clubName', 'fromDate', 'toDate'],
  size: 5,
  body: {
    query: {
      match: { 'name': 'cup' }
    },
  }
}, function (error, response,status) {
  if (error){
    console.log('search error: '+error)
  }
  else {
    console.log('--- Response ---');
    console.log('Total hits: ',response.hits.total);
    console.log('--- Hits ---');
    response.hits.hits.forEach(function(hit){
      console.log(hit);
    })
  }
});

var client = require('./client.js');

let querysting = '';
if (process.argv[2] && process.argv[2] === 'q') {
    console.log('This script only accepts queries with a label q: "query.js q=<query>"');
} else {
    querystring = process.argv[2].split('=')[1]
    console.log('input searh query:', querystring);
}


let query = function (querystring) {
  client.search({  
  index: 'races',
  type: 'race',
  _source: ['name','clubName', 'fromDate', 'toDate'],
  size: 5,
  body: {
    query: {
      match: { 'name': querystring }
    },
  }
}, function (error, response,status) {
  if (error){
    console.log('search error: '+error)
  }
  else {
    const result = {hits:[]};
    console.log('--- Response ---');
    console.log('Total hits: ',response.hits.total);
    console.log('--- Hits ---');
    response.hits.hits.forEach(function(hit){
      result.hits.push(hit);

      console.log(hit);
    })
    
    // return result;
  }
})};

query(querystring);
// module.export query ;

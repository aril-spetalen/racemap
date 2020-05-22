var client = require('./client.js');

let querysting = '';
if (process.argv[2] && process.argv[2] === 'q') {
    console.log('After \'while, Crocodile!');
} else {
    querystring = process.argv[2].split('=')[1]

    console.log('See ya later, Alligator!');
    console.log('input args:', querystring);
}


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
    console.log('--- Response ---');
    console.log('Total hits: ',response.hits.total);
    console.log('--- Hits ---');
    response.hits.hits.forEach(function(hit){
      console.log(hit);
    })
  }
});

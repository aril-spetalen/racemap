var client = require('./client.js');
var process = require('process');

let search = function(querystring) {
  return new Promise(function(resolve, reject) {

    console.log('querystring:', querystring);
    client.search({
      index: 'races',
      type: 'race',
      _source: ['name','clubName', 'fromDate', 'toDate'],
      size: 5,
      body: {
        query: {
          match: { 'name': querystring}
        },
      }
    }, (err, result) => {
      console.log('err:', err);
      console.log('result:', result);
      if  (err) {
        console.log(err);
        reject(err);
      } else {
        console.log('returning result from query.js:', result);
        resolve(result);
      }
    });
  });
};


// query(querystring);
module.exports = { search }

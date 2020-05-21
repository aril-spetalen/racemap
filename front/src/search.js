var client = require('./client.js');

client.search({  
  index: 'races',
  type: 'race',
  body: {
    query: {
      match: { "clubName": "Kongelig Norsk Seilforening" }
    },
  }
},function (error, response,status) {
  if (error){
    console.log("search error: "+error)
  }
  else {
    console.log("--- Response ---");
    console.log(response);
    console.log("--- Hits ---");
    response.hits.hits.forEach(function(hit){
      console.log(hit);
    })
  }
});


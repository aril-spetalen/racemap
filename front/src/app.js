var express = require('express');
var app = express();
var path = require('path');
var query = require('./query');
var router = express.Router;
const bodyParser = require('body-parser');


let searchRaces = async (race) => {
  console.log('now putting race to index:', race.regId);
  race['doctype'] = 'race';
  const response = await client.search({
    index: 'races',
    id: race.regId,
    body: race
  })
  .catch( (error) => {
    console.log('error trying to add club to index:', error);
  });
}


app.use(bodyParser.json({ extended: true }));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/pub/doc/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.post('/query_handler', (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log("got query_handler request with payload:", req.body);
  // now ask ElasticSearch for a response on this query!
  return query.search(req.body.query).then(result => {
    console.log("search result:", result);
    res.json(result);
  });
  console.log('r:', r);
  res.json(r);

  /* query.search (req.body.query)
  .then( (result) => {
    console.log('result class:', typeof(result));
    console.log("es query result:", result);
    res.json(result);
  }); */
});

//add the router
app.use(express.static(__dirname + '/pub/doc'));
app.use(express.static(__dirname + '/pub/js'));
app.use('pub', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

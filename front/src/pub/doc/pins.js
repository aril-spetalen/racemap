
      var queryInput = document.querySelector('input#raceQuery');
      var searchButton = document.querySelector('input#searchButton');
      var searchResult = document.querySelector('#response');

      function performSearch(query) {
        // build the querystring
        esQuery = JSON.stringify({"query": query});
        const url = 'query_handler';
        console.log('post to query_handler the following query:', esQuery);

        fetch(url, {
          method: 'POST',
          headers:{'content-type': 'application/json'},
          body: esQuery
        }).then(function(response) {
          response.json().then((data) => {
            searchResult.textContent = JSON.stringify(data);
            console.log("typeof data:", typeof(data));
            console.log("data.hits:", data.hits);
            let races = data.hits.hits;
            races.forEach(race => {
              console.log(race._source.coordinates.coordinate);
              var m = L.marker([race._source.coordinates.coordinate.lat, race._source.coordinates.coordinate.lon]);
              m.bindPopup(`<b>${race._source.name}</b><br>${race._source.clubName}<br><a href=\"https:\/\/manage2sail.com${race._source.link}\">${race._source.name}</a>`).openPopup();
              m.addTo(map);
            });
          });
        });
      };

      window.addEventListener('keydown',function(e) {
        if(e.keyIdentifier=='U+000A' || e.keyIdentifier=='Enter' || e.keyCode==13) {
          if(e.target.nodeName=='INPUT' && e.target.type=='search') {
            e.preventDefault();
            return false;
          }
        }
      }, true);
      // queryInput.onsearch = ( () => {
      //   var query = queryInput.value;
      //   performSearch(query);
      // });
      searchButton.onclick = ( () => {
        var query = queryInput.value;
        performSearch(query);
      })

      // performSearch('cup');
      // queryInput.value = 'cup';
      // searchButton.click();

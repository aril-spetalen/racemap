      var map = L.map('map').setView([59.692867, 10.764526], 8);
      L.tileLayer('https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}', {
        attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
      }).addTo(map);
      var marker = L.marker([59.932867, 10.764526]).addTo(map);

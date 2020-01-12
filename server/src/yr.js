import fetch from 'node-fetch';


const yr = {
  coordinates: async (location) => {
    let result = {};
    await fetch(`http://stadnamn.nrk.no/api/yr/search/${location}`)
      .then(res => res.json())
      .then((json) => {
      if (json && json._embedded && json._embedded.location && json._embedded.location.length > 0) {
        result = {
          location: location,
          coordinate: json._embedded.location[0].coordinate

        }
      }
    });

    return result;
  }
};

export default yr;

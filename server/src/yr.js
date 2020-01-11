import fetch from 'node-fetch';


const yr = {
    coordinates: async (locations) => {
        let result = [];
        for (let location of locations) {
            await fetch(`http://stadnamn.nrk.no/api/yr/search/${location.name}`)
                .then(res => res.json())
                .then((json) => {
                    if (json && json._embedded && json._embedded.location && json._embedded.location.length > 0) {
                        result.push({
                            location: location.name,
                            coordinate: json._embedded.location[0].coordinate

                        })
                    }
                });
        }

        return result;
    }
};

export default yr;
const requestPromise = require('request-promise');
const parser = require('cheerio'); 
let year = 2020;
let month = null;
let countryCode = 'NOR';
const baseURL = 'https://manage2sail.com';
/*
 * let urls = [`https://manage2sail.com/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=1`,
            `https://manage2sail.com/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=2`,
            `https://manage2sail.com/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=3`];
*/

const urls = [`${baseURL}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=1`,
            `${baseURL}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=2`,
            `${baseURL}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=3`];
class Club {
  constructor(name, id, webSiteM2S) {
    this.name = name;
    this.id = id;
    this.webSiteM2S = webSiteM2S;

    // the following should not be paramters to the contstructor, but
    // found after a following the webSiteM2S and parse this.
    /*
     * this.address = address;

    this.coordinates = getCoordinates(this.address); 
    */
  }
  setPostCode(code) {
    this.postCode = code;
  }

  setWebSite(site) {
    this.webSite = site;
  }

  setEmail(email) {
    this.email = email;
  }

  setPhone(phone) {
    this.phone = phone;
  }
}

/*
export let setClubDetails = (url, club) => {
  requestPromise(url)
  .then(function(html){
    let details = parser.load(html); //
    let   address = details('table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim()
    club.setPostCode(address)
    return club;
  })
  .catch(function(err){
    console.log(err);
    throw(err);
});
}
*/

let clubs;

let column = (entry) => {
  let number = -1;
    switch (entry) {
      case "logo":
        number = 1;
        break;

      case "name":
        number = 2;
        break;
    }
  return number;
}

let selector = (entity, number) => {
  return `table > tbody > tr:nth-child(${number}) > td > a`;
}

let getData = (entity, i) => {
  return clubs(selector(entity, i)).text().trim();
}

let getClubLink = (i) => {
  let href = clubs(`table > tbody > tr:nth-child(${i}) > td:nth-child(2) > a`).attr('href');
  return href
}

let getId = (entity, i) => {
  let href = clubs(`table > tbody > tr:nth-child(${i}) > td:nth-child(${column(entity)}) > a`).attr('href');
  return href.split('/')[4];
}

let numClubs = (html) => {
  clubs = parser.load(html); //
  return clubs('body > div.container > div.page-content > div.page-block > table > tbody > tr').length
}

let getClubs = (html) => {
  let c = []
  clubs = parser.load(html); //
  for (var i = 1; i <= numClubs(html); i++) {
    let club = new Club(
        getData('name', i),
        getId('name', i),
        getClubLink(i));
        
    // c[club.id] = club;
    c.push(club);
  }
  // TODO: this does not set postCode persistently:
  //c.forEach(club => setClubDetails(baseURL + club.webSiteM2S, club))
  // c.forEach(club => club.setClubDetails());
  // console.log(c);
  return c;  
}

/*
let getClubsByUrl = new Promise((resolve, reject, url) => {
  let htmls = [];
  let c = []

  requestPromise(url)
      .then(function(html){
            htmls.push(html);
            let clubs = getClubs(html);
            c = clubs;

            console.log("number of clubs listed at given url:", clubs.length);
            return c ;
      })
      .catch(function(err){
            // console.log(err);
            throw(err);
  }).then( () => {
     resolve(c);  
     // TODO understand:
     // console.log("c is not returned..:", c);
  });
  // console.log("final c:", c);
});
*/

/*
let all = []
let allClubs = () => {
  let c1 = getClubsByUrl(urls[0]);
  let c2 = getClubsByUrl(urls[1]);
  let c3 = getClubsByUrl(urls[2]);
  Promise.all([c1, c2, c3]).then( (values) => {
    //console.log("returning num clubs a:", all.length);
    console.log("c1 num clubs:", c1.length);
    return c1 + c2 + c3;
  }).then((c) => {
    all = c1 + c2 + c3;
    return c 
  }).catch((e) => {
    console.log("error:", e);
    return e;
  });
  // console.log("returning num clubs b:", c1.length);
  console.log("all:", all);
  return all 
}
*/

// ???urls.forEach(url) (() => {
// }

/* this works:
let clubList = []

urls.forEach(url => {
  requestPromise(url)
    .then(function(html){
      let c = getClubs(html);
      clubList = clubList + getClubs(html);
      // console.log(c['b346dfdc-4d8b-47a3-a101-787d395c8711']);
      // console.log(c['b346dfdc-4d8b-47a3-a101-787d395c8711'].id);
      console.log("number of clubs listed at given url:", c.length);
      // console.log(clubList);
      return c;

      // TODO add some details to each club here?
    })
    .catch(function(err){
      // console.log(err);
      throw(err);
  });
})
console.log(clubList);

*/

// locationService ripoff, could this work?
const clubService = {
  clubs : async (urls) => {
    let index = {};
    urls.forEach( (url) => {
      requestPromise(url)
        .then(function(html){
          let clubs = getClubs(html);
          clubs.forEach(club => {
            // clubIndex[club.id] = club;
            index[club.id] = club;
          })
          return;
        })
        .catch(function(err){
          console.log(err);
          throw(err);
        });
    return index;
    }); // }, clubIndex)
  //resolve(index);
  }
}


module.exports = {
  getData,
  numClubs,
  getClubs,
  clubService
}

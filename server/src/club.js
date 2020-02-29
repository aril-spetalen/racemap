const fetch = require('node-fetch');
const requestPromise = require('request-promise');
const parser = require('cheerio'); 
const details = require('./details');

let year = 2020;
let month = null;
let countryCode = 'NOR';
const baseURL = 'https://manage2sail.com';

const urls = [`${baseURL}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=1`,
              `${baseURL}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=2`,
              `${baseURL}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=3`];

class Club {
  constructor(name, id, webSiteM2S) {
    this.name = name;
    this.id = id;
    this.webSiteM2S = webSiteM2S;
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

let getClubs = async (html) => {
  let c = [];
  clubs = parser.load(html); //
  for (var i = 1; i <= numClubs(html); i++) {
    let club = new Club(
        getData('name', i),
        getId('name', i),
        getClubLink(i));
        
    const d = await details.getDetailsByUrl(`${baseURL}${club.webSiteM2S}`);
    d.getAll().forEach( pair => {
      club[pair[0]] = pair[1];
    })
    // const coord = await details.getCoordinates(d)
    // console.log("coords retrieved:", coord);
    // club['coordinates'] = coord;
    // club['coordinates'] = await details.getCoordinates(d);

    c[club.id] = club;
    c.push(club);
  }
  return c;  
}

let getClubsWithCoordinates = async (clubs) => {
  let c2 = []
  for(const club of clubs) {
    await details.getCoordinates(club)
      .then( c => {
        club["coordinates"] = c;
        c2.push(club);
      })
      .catch(error => {
        console.log('error getting coordinates per club:', error);
      });
  }
  return c2;
}
 
// https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808
async function fetchClubs (url) {
  let html = await fetch(url);
  let body = await html.text();
  let clubs = await getClubs(body);
  let clubs2 = await getClubsWithCoordinates(clubs);
  return clubs2;
}

// https://stackoverflow.com/questions/50006595/using-promise-all-to-fetch-a-list-of-urls-with-await-statements
async function fetchAllClubs(urls) {
  let matrix = Promise.all(
    urls.map(url=>fetchClubs(url)
      .then(clubs)
      .catch(error => ({ error, url }))
    )
  )
  return matrix.then( (matrix) =>
  {
    const clubList = matrix.flat();
    let index = {}
    clubList.forEach(club => {
      index[club['id']] = club;
    })
    return index;
  });
}


module.exports = {
  getData,
  numClubs,
  getClubs,
  fetchAllClubs,
  fetchClubs
}

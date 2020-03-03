const fetch = require('node-fetch')
const requestPromise = require('request-promise');
const parser = require('cheerio'); 
let year = 2020;
let month = null;
let countryCode = 'NOR';
let url = `https://manage2sail.com/no/search?filterYear=${year}&filterMonth=${month}&filterCountry=${countryCode}&filterRegion=&filterClass=&filterClubId=&filterScoring=&paged=false&filterText=`;

class Regatta {
  constructor(year, fromDate, toDate, name, country, place, clubName, regId, clubId, link) {
    this.year = year;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.name = name;
    this.country = country;
    this.place = place;
    this.clubName = clubName;
    this.regId = regId;
    this.clubId = clubId;
    this.link = link;
  }

  setClubLink(link) {
    this.clubLink = link;
  }


}

let regattas;

let column = (entry) => {
  let number = -1;
    switch (entry) {
      case "year":
        number = 1;
        break;

      case "fromDate":
        number = 2;
        break;

      case "toDate":
        number = 3;
        break;

      case "regName":
        number = 4;
        break;

      case "country":
        number = 5;
        break;

      case "place":
        number = 6;
        break;

      case "clubName":
        number = 7;
        break;
    }
  return number;
}

let selector = (entity, number) => {
  return `div.loadable > div > table > tbody > tr:nth-child(${number}) > td:nth-child(${column(entity)})`;
}

let getData = (entity, i) => {
  return regattas(selector(entity, i)).text().trim();
}

let getYear = (i) => {
  return Number(getData('year', i));
}
  
let getRegLink = (i) => {
  let href = regattas(`div.loadable > div > table > tbody > tr:nth-child(${i}) > td:nth-child(4) > a`).attr('href');
  return href
}

let getClubId = (i) => {
  let href = regattas(`div.loadable > div > table > tbody > tr:nth-child(${i}) > td:nth-child(7) > a`).attr('href');
  return href.split('/')[4];
}

let getId = (entity, i) => {
  let href = regattas(`div.loadable > div > table > tbody > tr:nth-child(${i}) > td:nth-child(${column(entity)}) > a`).attr('href');
  return href.split('/')[3];
}

let numRegattas = (html) => {
  regattas = parser.load(html); //
  return regattas('div.loadable > div > table > tbody > tr').length
}

let getRegattas = (html) => {
  let r= [];
  regattas = parser.load(html); //
  for (var i = 1; i <= numRegattas(html); i++) {
    let reg = new Regatta(
        getYear(i), 
        getData('fromDate', i),
        getData('toDate', i),
        getData('regName', i),
        getData('country', i),
        getData('place', i),
        getData('clubName', i),
        getId('regName', i),
        getClubId(i),
        getRegLink(i));

    r.push(reg);
  }
  return r;  
}

async function fetchRegattas(url) {
  let html = await fetch(url);
  let body = await html.text();
  let regattas = await getRegattas(body);
  return regattas;
}


requestPromise(url)
  .then(function(html){
    // success!
    let r = getRegattas(html);
    // console.log(r);
    // console.log("number of regattas listed for 2020:", r.length);
    return r;
  })
  .catch(function(err){
    // handle error
    // console.log(err);
    throw(err);
});

module.exports = {
  fetchRegattas,
  getRegattas,
  numRegattas
}

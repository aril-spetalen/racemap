const requestPromise = require('request-promise');
const parser = require('cheerio'); 
let year = 2020;
let month = null;
let countryCode = 'NOR';
const baseURL = 'https://manage2sail.com';
let urls = [`https://manage2sail.com/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=1`,
            `https://manage2sail.com/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=2`];

class Club {
  constructor(name, id, webSiteM2S) {
    this.name = name;
    this.id = id;
    this.webSiteM2S = webSiteM2S;

    // the following should not be paramters to the contstructor, but
    // found after a following the webSiteM2S and parse this.
    /*
     * this.address = address;
    this.postCode = postCode;
    this.postNumber = postNumber;
    this.webSite = webSite;
    this.email = email;
    this.phone = phone; 

    this.coordinates = getCoordinates(this.address); 
    */
  }
  setPostCode(code) {
    this.postCode = code;
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

export let getData = (entity, i) => {
  return clubs(selector(entity, i)).text().trim();
}

let getClubLink = (i) => {
  let href = clubs(`table > tbody > tr:nth-child(${i}) > td:nth-child(2) > a`).attr('href');
  return href
}

let getId = (entity, i) => {
  let href = clubs(`table > tbody > tr:nth-child(${i}) > td:nth-child(${column(entity)}) > a`).attr('href');
  return href.split('/')[6];
  //return href;
}

export let numClubs = (html) => {
  clubs = parser.load(html); //
  return clubs('body > div.container > div.page-content > div.page-block > table > tbody > tr').length
}

export let getClubs = (html) => {
  let c = [];
  clubs = parser.load(html); //
  for (var i = 1; i <= numClubs(html); i++) {
    let club = new Club(
        getData('name', i),
        getId('name', i),
        getClubLink(i));
        
    c.push(club);
  }
  // TODO: this does not set postCode persistently:
  //c.forEach(club => setClubDetails(baseURL + club.webSiteM2S, club))
  // c.forEach(club => club.setClubDetails());
  // console.log(c);
  return c;  
}


requestPromise(urls[0])
  .then(function(html){
    // success!
    let c = getClubs(html);
    //console.log(c);
    //console.log("number of clubs listed for 2020:", c.length);
    return c;
  })
  .catch(function(err){
    // handle error
    // console.log(err);
    throw(err);
});



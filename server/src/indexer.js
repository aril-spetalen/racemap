const rf = require('./race');
const cf = require('./club');
const df = require('./details');
const fs = require('fs');
const path = require('path');
const parser = require('cheerio');
const requestPromise = require('request-promise');

let year = 2020;
let month = null;
let countryCode = 'NOR';
let baseUrl = 'https://manage2sail.com';
let racesUrl = `${baseUrl}/no/search?filterYear=${year}&filterMonth=${month}&filterCountry=${countryCode}&filterRegion=&filterClass=&filterClubId=&filterScoring=&paged=false&filterText=`;

// get all races, in format one could feed to a search index
let races = {}
Promise.resolve(requestPromise(racesUrl)
    .then(function(html){
          // success!
          let r = rf.getRegattas(html);
          // console.log(r);
          // console.log("number of regattas listed for 2020:", r.length);
          r.forEach((race) => {
            races[race.regId] = race;
          });

          return;
      })
      .catch(function(err){
          // handle error
          // console.log(err);
          throw(err);
})).then(() => { 

  // TODO: add logic here.
  // console.log(races);
});

// create a wrapper function for the above, to export??
/*export const getRaceIndex = async (url) => {
  let races = {}
  Promise.resolve(requestPromise(url)
    .then(function(html){
          let r = rf.getRegattas(html);
          // console.log(r);
          //console.log("number of regattas listed for 2020:", r.length);
          r.forEach((race) => {
            races[race.regId] = race;
          });

          // Ok: console.log(races);
          return races;
    })
    .catch(function(err){
          console.log(err);
          throw(err);
  })).then((idx) => { 

  console.log(idx);
  console.log("..inside getRaceIndex");
  // TODO: Fill in here!
  /* 
   * { '528a0353-f170-4869-9a45-263b93c03205':
   *    Regatta {
   *      year: 2020,
   *      fromDate: '04.04.',
   *      toDate: '11.04.',
   *      name: 'Laser Clinic Malcesine Easter 2020',
   *      country: '',
   *      place: '',
   *      clubName: 'NORGES SEILFORBUND',
   *      regId: '528a0353-f170-4869-9a45-263b93c03205',
   *      link: '/no/event/528a0353-f170-4869-9a45-263b93c03205' },
   *    'bbe2b4be-4b29-4791-bc5b-dada0c6212bf':
   *    Regatta {
   *      year: 2020,
   *      fromDate: '04.04.',
   *      toDate: '12.04.',
   *      name: 'Treningsleir Garda påsken 2020',
   *      country: '',
   *      place: '',
   *      clubName: 'Kongelig Norsk Seilforening',
   *      regId: 'bbe2b4be-4b29-4791-bc5b-dada0c6212bf',
   *      link: '/no/event/bbe2b4be-4b29-4791-bc5b-dada0c6212bf' },
   *      ...
   */
  /*
  
  });
}

getRaceIndex(racesUrl);
*/




/*
requestPromise(cf.urls[0])
    .then(function(html){
          // success!
          let c = cf.getClubs(html);
          //console.log(c);
          console.log("number of clubs listed at given url:", c.length);
          return c;
    })
    .catch(function(err){
          // handle error
          // console.log(err);
          throw(err);
});

*/

/*
let urls = cf.urls;
Promise.all(getClubs(urls[0])).then( (clubs) => {
    clubs.forEach( (club) => {
          console.log("Array return from promiseList object ", club);
            })
});
*/

const rf = require('./race');
//const cf = require('./club');
import { getData, numClubs, getClubs, clubService, fetchAllClubs, fetchClubs } from '../src/club';
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

let urls = [`${baseUrl}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=1`,
            `${baseUrl}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=2`,
            `${baseUrl}/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=3`];

let clubLink = ((clubId) => {
  return `/en-US/Club/Detail/${clubId}`;
});

let races = {}
let clubIndex = {}

// get clubList

/*
 * let clubs = {};
(async () => {
  clubs = clubService.clubs(urls);
})();
*/

// let async clubs = clubService.clubs(urls);
// console.log('clubs from service:', clubs);

urls.forEach( (url) => {
    requestPromise(url)
      .then(function(html){
        let clubs = getClubs(html);
        clubs.forEach(club => {
          clubIndex[club.id] = club;
        })
        // console.log(clubIndex); // correct here!
        
        return;
        // TODO add some details to each club here?
        })
      .catch(function(err){
        console.log(err);
        throw(err);
    });
}, clubIndex)
  // resolve(clubIndex)
// );
// .then(console.log('clubIndex:', clubIndex)); // nothing here.. wrong scope?

// get all races, in a format one could feed to a search index
console.log('parsing races URL:', racesUrl);
Promise.resolve(requestPromise(racesUrl, races)
  .then(function(html){
    // success!
    let r = rf.getRegattas(html);
    console.log("number of regattas listed for 2020:", r.length);
    r.forEach((race) => {
      races[race.regId] = race;
      races[race.regId].setClubLink(clubLink(race.clubId));
    });
    // console.log('num races:', Object.keys(races).length);
    // console.log('first:', races[Object.keys(races)[0]]);
    return 0;
  })
  .catch(function(err){
     throw(err);
})).then(() => { 
  // TODO: add more logic here.
  // console.log('race index now:',races);
  // TODO: make sure there is no race conditions for the clubs:
  // console.log('after, clubIndex:', clubIndex);
});

/*
fetchClubs(urls[0])
    .then(data => console.log(data))
    .catch(reason => console.log(reason.message))
*/
fetchAllClubs(urls)
    .then(data => console.log("received allClubs:", data))
    .catch(reason => console.log(reason.message))

// Promise.resolve(fetchClubs(urls[0]))
//   .then( (all) => console.log(all));
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
   *    ...
   */


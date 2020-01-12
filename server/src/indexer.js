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
let url = `https://manage2sail.com/no/search?filterYear=${year}&filterMonth=${month}&filterCountry=${countryCode}&filterRegion=&filterClass=&filterClubId=&filterScoring=&paged=false&filterText=`;

// get all races, in format one could feed to a search index
/*let races = {}
Promise.resolve(requestPromise(url)
    .then(function(html){
          // success!
          let r = rf.getRegattas(html);
          // console.log(r);
          console.log("number of regattas listed for 2020:", r.length);
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

  console.log(races);
});
*/
// create a wrapper function for the above, to export??
export const getRaceIndex = async (url) => {
  let races = {}
  Promise.resolve(requestPromise(url)
    .then(function(html){
          // success!
          let r = rf.getRegattas(html);
          // console.log(r);
          //console.log("number of regattas listed for 2020:", r.length);
          r.forEach((race) => {
            races[race.regId] = race;
          });

          return races;
    })
    .catch(function(err){
          // handle error
          console.log(err);
          throw(err);
  })).then(() => { 

  // console.log("races returned : ", races);
  return races;
  });
}

//getRaceIndex(url);


let clubs = [rr]
Promise.all(clubs).then( (clubs) => {
    clubs.forEach( (club) => {
          console.log("Array return from promiseList object ", club);
            })
});

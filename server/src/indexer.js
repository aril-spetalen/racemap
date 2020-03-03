import { getData, numClubs, getClubs, clubService, fetchAllClubs, fetchClubs } from '../src/club';
import { numRegattas, fetchRegattas, getRegattas } from '../src/race';
const df = require('./details');
const fs = require('fs');
const path = require('path');
const parser = require('cheerio');
const { Client } = require('@elastic/elasticsearch')
const elastic = new Client({ node: 'http://localhost:9200' })
const http = require('http');
const net = require('net');


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

// function to index data
// TODO: set up elastic with host and port, ref. 
// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-reference.html
let putRace = async (race) => {
  console.log('now putting race to index:', race.regId);
  const response = await elastic.index({
    index: 'races',
    type: 'race',
    id: race.regId,
    body: race
  });
}

fetchAllClubs(urls)
  .then(data => {
    // console.log("Receiving all clubs:", data);
    // clubIndex = data;
    
  })
  .catch(reason => console.log(reason.message));


// get all races, in a format one could feed to a search index
let f = fetchRegattas(racesUrl)
  .then(async (r) => {
    r.forEach((race) => {
      races[race.regId] = race;
      races[race.regId].setClubLink(clubLink(race.clubId));
    });
    console.log('num races:', Object.keys(races).length);
    console.log('first:', races[Object.keys(races)[0]]);
    await putRace(races[Object.keys(races)[0]]);

    return races;
  })
  .catch(reason => console.log(reason.message));

  /* works, but can I use it?
Promise.resolve(f)
  .then((races) => {
    console.log('final races:', races);
  });
  */

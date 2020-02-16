require("babel-core/register");
require("babel-polyfill");

const cd = require('../src/details');
const fs = require('fs');
const path = require('path');
const asfFile = fs.readFileSync(path.resolve(__dirname, './aalesundSeilForening.html'), 'utf8');
const knsFile = fs.readFileSync(path.resolve(__dirname, './kns.html'), 'utf8');
const parser = require('cheerio');

import { coordinates } from '../src/yr';


let asfDetails = cd.getDetails(asfFile);
let knsDetails = cd.getDetails(knsFile);
let clubs = [asfDetails, knsDetails]



test('coordinates of Aalesund SF is { lat: 62.46937, lon: 6.20505 }', () => {
  coordinates('Nørvevika')
    .then((result) => {
      expect(result.coordinate).toEqual({ lat: 62.46937, lon: 6.20505 });
    })
    .catch((err) => {
      console.log('an exception occurred:', err);
  });
});


test('address of aalesund sf is Nørvevika', () => {
  expect(asfDetails.address).toBe('Nørvevika');
});

test('email of aalesund sf is andreas@olarsen.no', () => {
  expect(asfDetails.email).toBe('andreas@olarsen.no');
});

test('phone for KNS is 0047 23 27 56 00', () => {
  expect(knsDetails.phone).toBe('0047 23 27 56 00');
});

const cd = require('../src/details');
const fs = require('fs');
const path = require('path');
const asfFile = fs.readFileSync(path.resolve(__dirname, './aalesundSeilForening.html'), 'utf8');
const knsFile = fs.readFileSync(path.resolve(__dirname, './kns.html'), 'utf8');
const parser = require('cheerio');


let asfDetails = cd.getDetails(asfFile);
let knsDetails = cd.getDetails(knsFile);
let clubs = [asfDetails, knsDetails]

/*
 * Promise.all(clubs).then( (clubs) => {
  clubs.forEach( (club) => {
    console.log("Array return from promiseList object ", club);
  })
}); */


test('address of aalesund sf is Nørvevika', () => {
  expect(asfDetails.address).toBe('Nørvevika');
});

test('email of aalesund sf is andreas@olarsen.no', () => {
  expect(asfDetails.email).toBe('andreas@olarsen.no');
});

test('phone for KNS is 0047 23 27 56 00', () => {
  expect(knsDetails.phone).toBe('0047 23 27 56 00');
});

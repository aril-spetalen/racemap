const idxer = require('../src/indexer');
const fs = require('fs');
const path = require('path');
const mockHtml = fs.readFileSync(path.resolve(__dirname, './m2s.html'), 'utf8');
const parser = require('cheerio');

const year = 2020;
const month = '';
const countryCode = "NOR";
let url = `https://manage2sail.com/no/search?filterYear=${year}&filterMonth=${month}&filterCountry=${countryCode}&filterRegion=&filterClass=&filterClubId=&filterScoring=&paged=false&filterText=`;

let idx = {}
Promise.resolve(idxer.getRaceIndex(url))
  .then((i) => {
    idx = i
  });

test('wiring up unit tests; first regatta should have year 2020.', () => {
  expect(idx.keys().length).toBe(20);
});

  /*
   *
test('number of regattas in m2s.html is 23', () => {
  expect(rf.numRegattas(mockHtml)).toBe(23);
});

test('number of regattas retrieved is 23', () => {
  expect(r.length).toBe(23);
});

test('second regatta has Id == bbe2b4be-4b29-4791-bc5b-dada0c6212bf', () => {
  expect(r[1].regId).toBe('bbe2b4be-4b29-4791-bc5b-dada0c6212bf');
});

test('last regatta should have toDate == 20.09.', () => {
  expect(r[22].toDate).toBe('20.09.');
});
*/

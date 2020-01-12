const rf = require('../src/race');
const fs = require('fs');
const path = require('path');
const mockHtml = fs.readFileSync(path.resolve(__dirname, './m2s.html'), 'utf8');
const parser = require('cheerio');


let r = rf.getRegattas(mockHtml);

test('wiring up unit tests; first regatta should have year 2020.', () => {
  expect(r[0].year).toBe(2020);
});

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


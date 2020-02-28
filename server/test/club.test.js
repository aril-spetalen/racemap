const cf = require('../src/club');
import { getData, numClubs, getClubs } from '../src/club';
const fs = require('fs');
const path = require('path');
const mockHtml = fs.readFileSync(path.resolve(__dirname, './clubs.html'), 'utf8');
const parser = require('cheerio');
const url = 'https://manage2sail.com/en-US/Club/SearchClubs?filterCountry=NOR&filterText=&page=1'


test('number of clubs in m2sClubs1.html is 15', async () => {
  // ;(async () => {
     let c = await getClubs(mockHtml);
     expect(numClubs(mockHtml)).toBe(15);
  // });
}, 10000);

test('name of club 3 is Åsgårdstrand Seilforening', async () => {
  //expect(c['b346dfdc-4d8b-47a3-a101-787d395c8711'].name).toBe('Åsgårdstrand Seilforening');
  let c = await getClubs(mockHtml);
  expect(c[2].name).toBe('Åsgårdstrand Seilforening');
}, 10000);

test('ID of club 3 is b346dfdc-4d8b-47a3-a101-787d395c8711', async () => {
  //expect(c['b346dfdc-4d8b-47a3-a101-787d395c8711'].id).toBe('b346dfdc-4d8b-47a3-a101-787d395c8711');
  let c = await getClubs(mockHtml);
  expect(c[2].id).toBe('b346dfdc-4d8b-47a3-a101-787d395c8711');
}, 10000);

test('I can add a phone number to the club', async () => {
  let c = await getClubs(mockHtml);
  const phoneNum = 93458224
  c[2].setPhone(phoneNum);
  expect(c[2].phone).toBe(phoneNum);
}, 10000);

test('WebSiteM2S of club 3 is /en-US/Club/Detail/b346dfdc-4d8b-47a3-a101-787d395c8711', async () => {
  // expect(c['b346dfdc-4d8b-47a3-a101-787d395c8711'].webSiteM2S).toBe('https://manage2sail.com/en-US/Club/Detail/b346dfdc-4d8b-47a3-a101-787d395c8711');
  let c = await getClubs(mockHtml);
  expect(c[2].webSiteM2S).toBe('/en-US/Club/Detail/b346dfdc-4d8b-47a3-a101-787d395c8711');
}, 10000);

/*
test('can get clubs by url', () => {
  expect(clubs[1]).toBe({});
});
*/

/*
test('postCode of club 3 is https://manage2sail.com/en-US/Club/Detail/b346dfdc-4d8b-47a3-a101-787d395c8711', () => {
  expect(c[2].postCode).toBe('https://manage2sail.com/en-US/Club/Detail/b346dfdc-4d8b-47a3-a101-787d395c8711');
});
*/


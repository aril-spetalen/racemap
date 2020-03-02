const regeneratorRuntime = require("regenerator-runtime");
const requestPromise = require('request-promise');
const parser = require('cheerio'); 
import { coordinates } from './yr';
let year = 2020;
let month = null;
let countryCode = 'NOR';
const baseURL = 'https://manage2sail.com';
const ID = 'c5e066ba-cffd-4db7-b4fc-3c5cda091ba6';
let url = `https://manage2sail.com/en-US/Club/Detail/${ID}`;

class ClubDetails {
  constructor(address, city, postCode, country, webSite, email, phone) {
    this.address = address,
    this.city = city,
    this.postCode = postCode,
    this.country = country,
    this.webSite = webSite,
    this.email = email,
    this.phone = phone
  }
  setCoordinates(coordinates) {
    this.coordinates = coordinates;
  }
  getAll() {
    return Object.entries(this);
  }
}

let details;

const getCoordinates = async (details) => {
  let retVal = {};
  let location = details.address ? details.address : details.city;
  let loc = location.split(' ')[0];
  await coordinates(loc)
    .then((c) => {
      retVal = c;
    })
    .catch( (error) => {
      console.log('error getting coordinates:', error);
    });
  return retVal;
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

let getDataRow = (parser, i) => {
  let data = details(`table > tbody > tr:nth-child(${i}) > td:nth-child(${column(entity)}) > a`).attr('href');
  return href.split('/')[6];
  //return href;
}

let selector = (row) => {
    return `#details > table > tbody > tr:nth-child(${row}) > td:nth-child(2)`;
}

let valueSelector = (row) => {
    return `#details > table > tbody > tr:nth-child(${row}) > td:nth-child(2)`;
}

let keySelector = (row) => {
    return `#details > table > tbody > tr:nth-child(${row}) > td:nth-child(1)`;
}

let selectorByEntity = (entity) => {
    return `#details > table > tbody > tr > td[value="Address"]:next-sibling > td:nth-child(2)`;
}

let getDetails = (html) => {
  let dp = parser.load(html); //

  let address = '';
  let city = '';
  let postCode = '';
  let country = '';
  let webSite = '';
  let email = '';
  let phone = '';
  let det = {};
  [1,2,3,4,5,6,7].forEach(index => {
    let key = dp(keySelector(index)).text().trim();
    key = key && key.split(":")[0].trim().toLowerCase();
    let value = dp(valueSelector(index)).text().trim();
    det[key] = value;
  });

  let details = new ClubDetails(
    det["address"],
    det["city"],
    det["postCode"],
    det["country"],
    det["webSite"],
    det["email"],
    det["phone"]);
  // getCoordinates(details);

  return details;  
}

const getDetailsByUrl = async (url) => {
  const r = requestPromise(url)
  .then(function(html){
    let cd = getDetails(html);
    //console.log(cd);
    //console.log("number of clubs listed for 2020:", c.length);
    return cd;
  })
  .catch(function(err){
    // handle error
    // console.log(err);
    throw(err);
})
return r;
}

/*
 * let numArr = [1,2,3,4,5];
let nums=[];

let promiseList = new Promise(function(resolve,reject){
    setTimeout(()=>{
              numArr.forEach((val)=>{
                        nums.push(val);
                            });
                  resolve(nums);
                   },5000)
})


Promise.all([promiseList]).then((arrList)=>{
    arrList.forEach((array)=>{
          console.log("Array return from promiseList object ",array);    
            })

     });

*/ 



module.exports = {
  getDetails,
  getDetailsByUrl,
  getCoordinates
}

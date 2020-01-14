const requestPromise = require('request-promise');
const parser = require('cheerio'); 
import yr from './yr';
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
}

let details;

function coordinates() {
  return { "aalesund": '62\°28\'09.7\"N 6\°12\'18.2\"E'}
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

export let getDetails = (html) => {
  let dp = parser.load(html); //

  //let address = dp(`#details > table > tbody > tr > td:contains("Address")`).parent() //.next().text().trim();
  //let address = dp(`#details > table > tbody > tr > td:contains("Address")`).children["1"];
  // console.log(addressLine);
  
  /*
  let address = "adr";
  const addressPromise = new Promise(function(addressLine, resolve, reject) {
      let lineParser = parser.load(addressLine);// = dp(:w
      resolve(lineParser('td:nth-child(2)').text().trim()); 
  });

  addressPromise.then(function(value) {
      console.log("promise return value:", value);
      address = value;
      });
      */
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

  return details;  
}


requestPromise(url)
  .then(function(html){
    // success!
    let cd = getDetails(html);
    //console.log(cd);
    //console.log("number of clubs listed for 2020:", c.length);
    return cd;
  })
  .catch(function(err){
    // handle error
    // console.log(err);
    throw(err);
});

/*
 *
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

/*
await yr.coordinates(document.locations);
let async coord = () => await yr.coordinates(['Oslo', "aalesund"]);
console.log(coord);
*/

/*
export const findLocation = {
  forClub: async (address) => {
    //console.log('now finding coords for club');
    const coordinates = await yr.coordinates(address);
    //console.log('coordinates:', coordinates);

    return coordinates;
  }
};
*/



const csvtojson = require('../node_modules/csvtojson');

csvtojson({
      noheader: true,
      checkType: true,
      delimiter: ';',
      headers: ['code','title','img']
})
.fromFile("./codes.csv")
.then( json => {
    console.log(JSON.stringify(json,null,2));
})
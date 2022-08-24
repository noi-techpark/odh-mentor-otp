
const csvtojson = require('../node_modules/csvtojson');
const fs = require('fs');

csvtojson({
      noheader: true,
      checkType: true,
      delimiter: ';',
      headers: ['code','title','img']
})
.fromFile("./codes.csv")
.then( json => {
    console.log(JSON.stringify(json,null,2));

    json.forEach(item => {
        /*"code": 0,
        "title": "Spento",
        "img":*/
        const filename = `./images/${item.code}.png`;

        const data =  Buffer.from(item.img, 'base64');

        fs.writeFile(filename, data, err => {
            if (err)
                console.log(err);
            else {
                console.log('created',filename)
            }
        })
    })
})

const fs = require('fs')

const csvtojson = require('../node_modules/csvtojson');

const detect = require('../node_modules/detect-file-type');

csvtojson({
      noheader: true,
      checkType: true,
      delimiter: ';',
      headers: ['code','title','img']
})
.fromFile("./codes.csv")
.then( json => {

    //console.log(JSON.stringify(json,null,2));

    json.forEach(async item => {
        /*"code": 0,
        "title": "Spento",
        "img":*/

        const data =  Buffer.from(item.img, 'base64');

        detect.fromBuffer(data, (err,res) => {
            if(res) {

                const {ext,mime} =  res;

                const filename = `./images/${item.code}.${ext}`;

                if (!fs.existsSync(filename)) {

                    fs.writeFile(filename, data, err => {
                        if (err)
                            console.log(err);
                        else {
                            console.log('created',filename, mime)
                        }
                    })
                }
            }
        });

    })
})
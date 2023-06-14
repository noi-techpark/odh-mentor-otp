<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# DEBUGGING

```
npm i
npm run dev
```


browse:
http://localhost:8087/testSearch?text=magic


sample mapping fields from this:

// 20201111010909
// https://tourism.opendatahub.com/api/Accommodation?language=de&poitype=447&active=true&fields=Id,AccoDetail.de.Name,Latitude,Longitude&pagesize=100

{
  "OnlineResults": -1,
  "ResultId": "",
  "TotalResults": 9592,
  "TotalPages": 96,
  "CurrentPage": 1,
  "Seed": null,
  "Items": [
    {
      "Id": "2657B7CBCB85380B253D2FBE28AF100E",
      "AccoDetail.de.Name": "1477 Reichhalter",
      "Latitude": 46.615101,
      "Longitude": 11.143296
    },
    {
      "Id": "C93CE627A8497E697C657CF53028F9D2",
      "AccoDetail.de.Name": "360 Grad - Bundeswehr Sozialwerk",
      "Latitude": 46.660809,
      "Longitude": 11.180298
    },
    
    ....

## Pelias logging levels

https://github.com/winstonjs/winston#logging-levels



# GTFS2BBOX

This tool auto running whe build container is start with DOWNLOAD_DATA=True
calculate bounding box of Openstreetmap data with buffer from GTFS data bounds.
it generate a ```osm.url``` file in data dir ```/opt/odh-mentor-otp/```.
This steps can be skipped using the pre-built [osm.url](osm.url) file.


## USAGE

1) download and unzip gtfs in data directory:
```bash
cd /opt/odh-mentor-otp/
wget http://example.com/200804_ExportGTFS.zip
unzip -o /opt/odh-mentor-otp/200804_ExportGTFS.zip -d /opt/odh-mentor-otp/200804_ExportGTFS
```
don't remove orginal gtfs zip file.

2) generate urls list to download .osm files
```bash
cd ./gtfs2bbox/
npm install
node bboxes.js /opt/odh-mentor-otp/200804_ExportGTFS --overpass > /opt/odh-mentor-otp/osm.url
```

3) check contents of file ```/opt/odh-mentor-otp/osm.url``` like this:
```javascript
https://overpass-api.de/api/map?bbox=9.880233649086051,46.30580331792924,10.397045932724035,46.66553146341906
https://overpass-api.de/api/map?bbox=9.880233649086051,46.66553146341906,10.397045932724035,47.025259608908875
...
```
a list of urls of small pieces of osm data needed to fill the area occupied by the gtfs data.
These can be downloaded separately or by ```build``` service and they will then be merged during the OTP building graph.

This 3 steps must be done again in case the GTFS data is updated and is larger as a spatial extent
and could be included as an automatic operation in the build image.


directory ```../data/200804_ExportGTFS``` contains gtfs files(stops.txt...)

generate single bounding box with 10km of buffer around gtfs, default output is JSON
```bash
$ node bbox.js ../data/
```
output:
```json
{
    "stops": 4669,
    "buffer": 5,
    "bboxes": [
        [
            10.045198235794025,
            46.04124495172635,
            12.81614276420598,
            47.29382838996485
        ]
    ],
    "overpass": "https://overpass-api.de/api/map?bbox=10.045198235794025,46.04124495172635,12.81614276420598,47.29382838996485",    
    "bboxfinder": "http://bboxfinder.com/#46.04124495172635,10.045198235794025,47.29382838996485,12.81614276420598"
}
```

list only overpass url in txt
```bash
$ node bbox.js ../data/200804_ExportGTFS --overpass
```

output:
```text
https://overpass-api.de/api/map?bbox=10.045198235794025,46.04124495172635,12.81614276420598,47.29382838996485
```

## DOWNLOAD using multiple bboxes

Useful when overpass response is too large bounding box or memory!
Generate a list of multiple sub bounding boxes, removing areas without gtfs
```bash
$ node bboxes.js ../data/200804_ExportGTFS --overpass > ../data/osm.url
```



## Experimental

parallel download via nodejs/wget

```bash
$ node bboxes.js ../data/200804_ExportGTFS | node fetch-osm-wget.js
```
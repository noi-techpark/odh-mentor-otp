
# OpenTripPlanner Openmove Docker Services

This project contains a Docker images for stable
[OpenTripPlanner](http://opentripplanner.org) releases.
*docker-compose* is required.

## Services

defined in docker-compose.yml

```otp-build``` build a new OTP graph by /data directory

```otp``` run a new instance of OTP by /data


## Scripts

```docker-entrypoint.sh``` download and build data graph

```otp.sh``` a shortcut for command `java -jar otp.jar`

```gtfs2bbox``` nodejs script to calculate bounding box of gtfs data and async download Openstreetmap Data

others:
```otp_trentino.sh``` historical openmove script

## Download data

calculate bounding box with buffer for GTFS directory

1)download and unzip gtfs in data directory:
```bash
cd ./data
wget http://example.source.gtfs.com/200804_ExportGTFS.zip
unzip -o ./data/200804_ExportGTFS.zip -d ./data/gtfs
```

calculate api overpass urls to download .osm files
```bash
cd gtfs2bbox/
npm install
node bboxes.js ../data/gtfs --overpass > ../data/osm.url
```
contents of file ```../data/osm.url```
```javascript
https://overpass-api.de/api/map?bbox=9.880233649086051,46.30580331792924,10.397045932724035,46.66553146341906
https://overpass-api.de/api/map?bbox=9.880233649086051,46.66553146341906,10.397045932724035,47.025259608908875
https://overpass-api.de/api/map?bbox=10.397045932724035,45.94607517243942,10.91385821636202,46.30580331792924
...
```

## First build Graph and Cache

```bash
docker-compose up build
```

## Execute OTP instance

```bash
docker-compose up otp
```

After the graph has been built, the planner is available at port *8080*.

### Environment variables

**JAVA_MX**: The amount of heap space available to OpenTripPlanner. (The `otp`
             command adds `-Xmx$JAVA_MX` to the `java` command.) Default: 2G


### Experimental

async parallel download osm data, see gtfs2bbox directory
```bash
cd gtfs2bbox/
node bboxes.js ../data/200804_ExportGTFS  | node fetch-osm-wget.js
```

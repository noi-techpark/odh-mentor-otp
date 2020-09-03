
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

calculate bounding box with buffer from GTFS directory

```bash
unzip -o ./data/200804_ExportGTFS.zip -d ./data/200804_ExportGTFS
```

```bash
cd gtfs2bbox/
npm install
node bbox.js ../data/200804_ExportGTFS | node fetch-osm-wget.js
```

**output**:
```javascript
{
	stops: 4669,
	buffer: 10,	//buffered in kilometers
	bbox:
	'46.01005848495291,10.000282971097848,47.32428314950289,12.86105887382695',
	bboxfinder:
	'http://bboxfinder.com/#46.01005848495291,10.000282971097848,47.32428314950289,12.86105887382695'
}
```

### Experimental

async parallel download osm data, see gtfs2bbox directory
```bash
cd gtfs2bbox/
node bboxes.js ../data/200804_ExportGTFS  | node fetch-osm-wget.js
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
             command adds `-Xmx$JAVA_MX` to the `java` command.) Default: 4G


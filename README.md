
# OpenTripPlanner Openmove Docker Services

This project contains a Docker images for stable
[OpenTripPlanner](http://opentripplanner.org) releases.
*docker-compose* and *Nodejs* is required.

## Table of contents

- [Gettings started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Source code](#source-code)
  - [Execute with Docker](#execute-with-docker)
- [Information](#information)

## Getting started

calculate bounding box of Openstreetmap data with buffer from GTFS data bounds.
it generate a ```osm.url``` file in data dir '''/opt/odh-mentor-otp/''' 

1) download and unzip gtfs in data directory:
```bash
cd /opt/odh-mentor-otp/
wget http://example.source.gtfs.com/200804_ExportGTFS.zip
unzip -o /opt/odh-mentor-otp/200804_ExportGTFS.zip -d /opt/odh-mentor-otp/200804_ExportGTFS
```

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

### Services

defined in docker-compose.yml, both of these services are defined by the same docker image which behaves differently according to the defined environment parameters.

```build``` build a new OTP graph by gtfs file in /opt/odh-mentor-otp/ directory, automatically stopped on finish, ```docker logs``` notice if the building was successful.

```otp``` run a new instance of OTP by /opt/odh-mentor-otp/, distribute API rest and default UI on port 8080, need restart: "always"

### Volumes

```/opt/odh-mentor-otp/:/data/``` the path used in reading and writing in which the Osm, Altimetric data are downloaded. It must contains the GTFS zip file before building the graph. Here where the graph generated will be written by OTP, in path:
```/opt/odh-mentor-otp/openmove/Graph.obj```

### Scripts

```docker-entrypoint.sh``` download and build data graph

```otp.jar``` compiled version of Opentriplanner(it will be downloaded automatically)

```otp.sh``` a shortcut for command `java -jar otp.jar`

```gtfs2bbox``` nodejs tool to calculate bounding boxes of Openstreetmap intersects GTFS data for downloading, create a list of overpass downloadable urls


### Environment

```JAVA_MX``` the amount of heap space available to OpenTripPlanner. (The `otp.sh` script adds `-Xmx$JAVA_MX` to the `java` command.) Default: 2G

```BUILD_GRAPH``` if *True* force the re/construction of the roads graph starting from the data: osm, gtfs, srtm.
	Generate a new *Graph.obj* file in the path ```/opt/odh-mentor-otp/openmove/Graph.obj```

```DOWNLOAD_DATA``` if *True* download openstreetmap and terrain model data around the gtfs file

```BACKUP_GRAPH``` if *True* create also a backup copy for each new graph in path ```/opt/odh-mentor-otp/Graph.obj.%y-%m-%d.tgz```


### Prerequisites

To build the project, the following prerequisites must be met:

- Docker
- Docker-compose
- Nodejs 10/12.x(only for building the osm.url file if not exists)

If you want to run the application using [Docker](https://www.docker.com/), the environment is already set up with all dependencies for you. You only have to install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) and follow the instruction in the [dedicated section](#execute-with-docker).

### Source code

Get a copy of the repository:

```bash
ToDo: git clone https://github.com/noi-techpark/odh-mentor-otp.git
```

Change directory:

```bash
ToDo: cd odh-mentor-otp
```

### Execute with Docker

Copy the file `.env.example` to `.env` and adjust the configuration parameters.

Then you can start the application using the following command:
#### First build Graph and Cache

```bash
docker-compose up build
```

#### Execute OTP instance

```bash
docker-compose up otp
```

After the graph has been built, the planner is available at port *8080*.


## Information

### Guidelines

Find [here](https://opendatahub.readthedocs.io/en/latest/guidelines.html) guidelines for developers.

### Support

ToDo: For support, please contact [info@opendatahub.bz.it](mailto:info@opendatahub.bz.it).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `development` branch.

- Make sure the tests are passing.

- Create a pull request against the `development` branch.

A more detailed description can be found here: [https://github.com/noi-techpark/documentation/blob/master/contributors.md](https://github.com/noi-techpark/documentation/blob/master/contributors.md).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/java-boilerplate](https://github.com/noi-techpark/java-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.


## Table of contents

- [Gettings started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Docker environment](#docker)
- [Information](#information)

## Getting started

### Prerequisites

To build the project, the following prerequisites must be met:

- Docker
- Docker-compose

If you want to run the application using [Docker](https://www.docker.com/). \
The environment is already set up with all dependencies for you. You only have to install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)


## Services

defined in docker-compose.yml, both of these services are defined by the same docker image which behaves differently according to the defined environment parameters.

```build``` build a new OTP graph by gtfs file in /opt/odh-mentor-otp/ directory, automatically stopped on finish, ```docker logs``` notice if the building was successful.

```otp``` run a new instance of OTP by /opt/odh-mentor-otp/, distribute API rest and default UI on port 8080, need restart: "always"

```journey/``` static javascript client side react/redux UI component to interact with Opentriplanner instance.

```gbfs/``` service that fetch bikesharing data from ODH and provide them as GBFS for otp.

```geocoder/``` nodejs simplified implementation of Pelias Geocoder


#### Scripts and Configurations

The configuration structure used by services is defined by [<serviceDirectory>/config.yml](config.md)

```docker-entrypoint.sh``` download and build data graph

```otp.sh``` a script to run otp by command line

```otp-unofficial.sh``` a script to run otp unofficial version by command line

```router-config.json``` define OTP updaters(GTFS-RT) and router settings from environment vars

```build-config.json``` default OTP build config from environment vars

```osm.url``` a pregenerated urls list of downloadable Openstreetmap data for SouthTyrol area.

```gtfs2bbox/``` nodejs tool to calculate bounding boxes of Openstreetmap intersects GTFS data for downloading, create a list of overpass downloadable urls

### Docker Environment

In each service directory the file `.env.example` list the default env vars by service.
Below is a list of env variables for each container:

##### otp

```JAVA_MX``` the amount of heap space available to OpenTripPlanner. (The `otp.sh` script adds `-Xmx$JAVA_MX` to the `java` command.) Default: 2G

```OTP_OFFICIAL``` if *True* will use the OpenTripPlanner Official Version, otherwise the IBI-Group Version [(see Compatibility)](#compatibility)

##### build

in addition to those of *otp* vars

```BUILD_GRAPH``` if *True* force the re/construction of the roads graph starting from the data: osm, gtfs, srtm. Generate a new *Graph.obj* file in the path ```/opt/odh-mentor-otp/openmove/Graph.obj```

```DOWNLOAD_DATA``` if *True* download openstreetmap and terrain model data around the gtfs file

```BACKUP_GRAPH``` if *True* create also a backup copy for each new graph in path */opt/odh-mentor-otp/Graph.obj.%y-%m-%d.tgz*

```UPDATERS``` if *True* create the router-config.json with GBFS/GTFS-RT updaters

```GBFS_HOST``` host path to GBFS service

```GBFS_VERSION``` gbfs version 1 or 2.1 (rebuild graph is required)

```GTFS_URL``` gtfs source ftp uri of gtfs .zip file to download

```GTFS_URL_UPDATETIME``` gtfs source time interval in cronjob style (i.e. `*/30 * * * *` for every 30 minutes)

```GTFS_URL_UPDATEHOOK``` url hook to restart build service

```GTFS_FILE``` the name of gtfs zip file to auto download Openstreetmap data

```GTFS_RT_URL``` gtfs-realtime url with trip updates (rebuild graph is required)

```GTFS_FEED_ID``` gtfs feed id which the gtfs-rt refers to. This is the defined by the  'feed_id' value (unofficial) inside feed_info.txt, if not defined this should be "1" (rebuild graph is required)

```OTP_OFFICIAL``` if *True* will use the OpenTripPlanner Official Version, otherwise the IBI-Group Version [(see Compatibility)](#compatibility)

```CARSHARING_HOST``` host path to Carsharing service

```PARKING_HOST``` host path to parking service

```CHARGER_HOST``` host path to charger service

#### geocoder

```API_HOST``` deployed hostname of OpenTripPlanner api default: ```localhost``` (name of deployed)

```API_PATH``` aboslute url path ```/otp/routers/openmove```

```API_PORT``` port default ```8080``` (port of internal service otp)

```HERE_APPID``` here geocoder api appId params

```HERE_APPCODE``` here geocoder api appCode params

### Building Arguments

Below is a list of Docker args variables for each container:

#### otp, builder

```OTP_VERSION``` version of OpenTripPlanner binary downloaded from official repos, default is 1.4.0

#### journey

```API_HOST``` deployed hostname of OpenTripPlanner api default: ```localhost``` (name of deployed)

```API_PATH``` aboslute url path ```/otp/routers/openmove```

```API_PORT``` port default ```8080``` (port of internal service otp)

```GEOCODER_BASEURL``` default pelias geoder instance http://localhost/geocoder/v1

```PARKING_BASEURL``` host path to Parking to show in map

```CHARGER_BASEURL``` host path to Charger stationsto show in map

```GOOGLE_ANALYTICS_ID``` google analytics tracking code UA-XXXXX-Y

#### Compatibility

In OpenTripPlanner is not allowed running a graph built with a different version.
In case you change the OpenTripPlanner version or switch from/to [openmove/OpenTripPlanner](https://github.com/openmove/OpenTripPlanner) Version **you have to rebuild the graph**.

#### First build Graph and Cache

```bash
docker-compose up build
```

#### Execute OTP instance

```bash
docker-compose up otp
```
After the graph has been built, the planner is available at port *8080*.

#### Volumes

```/opt/odh-mentor-otp/:/data/``` the path used in reading and writing in which the Osm, Altimetric data are downloaded. It must contains the GTFS zip file before building the graph. Here where the graph generated will be written by OTP, in path:
```/opt/odh-mentor-otp/openmove/Graph.obj```


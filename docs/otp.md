# OpenTripPlanner

This project is a Openmove fork of [OpenTripPlanner](http://opentripplanner.org) release:

https://github.com/openmove/OpenTripPlanner

## Services

defined in docker-compose.yml

```otp-build``` build a new OTP graph by /data directory

```otp``` run a new instance of OTP by /data


## Scripts

```docker-entrypoint.sh``` download and build data graph

```otp.sh``` a shortcut for command `java -jar otp.jar`

```gtfs2bbox``` nodejs script to calculate bounding box of gtfs data and async download Openstreetmap Data



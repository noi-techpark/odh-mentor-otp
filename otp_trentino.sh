#!/bin/bash
#this create a docker image with otp with Trentino data.

#original: https://gist.github.com/zabuTNT/73ddf2d5e520db75751185cba854417a
#
BASE=otp/
FOLDER=data
DIR=$BASE$FOLDER
PORT=9090
mkdir -p $DIR
#create dockerfile
echo "FROM openmove/opentripplanner:1.4.1" > $BASE/Dockerfile
echo "COPY $FOLDER/ /data" >> $BASE/Dockerfile
#create ignore
echo "**/*.osm
**/*.osm.pbf
**/*.zip
**/*.tif" > $DIR/.dockerignore

#download updated maps
#Trentino
#curl 'https://overpass-api.de/api/map?bbox=10.4233,45.6601,11.9778,46.4908' -o $DIR/trento.osm
#TODO aggiungere pv per progress download

#download new gtfs TT
#curl http://www.ttesercizio.it/opendata/google_transit_extraurbano_tte.zip -o $DIR/extraurbano_trento.zip
#curl http://www.ttesercizio.it/opendata/google_transit_urbano_tte.zip -o $DIR/urbano_trento.zip

########################################
# Website where you can find SRTM data #
# http://srtm.csi.cgiar.org/srtmdata/  #
########################################

#Triveneto
#curl http://srtm.csi.cgiar.org/wp-content/uploads/files/srtm_5x5/TIFF/srtm_39_03.zip -L -o /tmp/srtm_39_03.zip

#unzip SRTM files
#unzip -o srtm_39_03.zip -x "*.tfw" "*.hdr" "*.txt" -d $DIR

#build graph
# docker run \
#         -e JAVA_MX=16G \
#         -v $PWD/$DIR:/data \
#         -p $PORT:8080 \
#         openmove/opentripplanner:1.4.1 \
# 	otp.sh --build /data

mkdir -p $DIR/openmove/

#copy graph in folder
cp $DIR/Graph.obj $DIR/openmove/
rm -f $DIR/Graph.obj

#build docker image of otp
docker build -t otp $BASE


#RUN WITH
#docker run \
#   -e JAVA_MX=4G \
#   -p 8080:8080 \
#   otp:latest \
#   otp.sh --graphs /data --router openmove --server
######
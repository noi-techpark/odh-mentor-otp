#!/bin/bash

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

#curl -s 'ftp://ftp.sta.bz.it/gtfs/google_transit_shp.zip' -o /tmp/gtfs_$NEW_UUID.zip
curl -s "${GTFS_URL}" -o /tmp/gtfs_$NEW_UUID.zip

SHA=$(sha256sum /tmp/gtfs_$NEW_UUID.zip | cut -d " " -f 1)
OLD=""
if [ -f "$HOME/gtfs_hash.txt" ]; then
  OLD=$(cat $HOME/gtfs_hash.txt)
fi
if [ "${SHA}" = "${OLD}" ]; then
  #no need to update, remove tmp file
  rm /tmp/gtfs_$NEW_UUID.zip
else
  echo $SHA > $HOME/gtfs_hash.txt

  #TODO
  #mv /tmp/gtfs_$NEW_UUID.zip /data/$GTFS_FILE.zip
  
  #TODO
  #launch build container via aws hook
  # curl -s https://aws.launch.otp.builder/token=123456abcdef
fi
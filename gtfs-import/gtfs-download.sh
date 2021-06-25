#!/bin/bash

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

HASH_FILE=$HOME/gtfs_hash.txt

if [ -z "${GTFS_URL}" ]; then
  echo "env variable GTFS_URL is empty"
  exit 0
fi

#curl -s 'ftp://ftp.sta.bz.it/gtfs/google_transit_shp.zip' -o /tmp/gtfs_$NEW_UUID.zip
curl -s "${GTFS_URL}" -o /tmp/gtfs_$NEW_UUID.zip

echo "Download new gtfs and checksum..."

SHA=$(sha256sum /tmp/gtfs_$NEW_UUID.zip | cut -d " " -f 1)

echo "new checksum $SHA"

OLD=""
if [ -f "${HASH_FILE}" ]; then
  OLD=$(cat $HASH_FILE)
fi

if [ "${SHA}" = "${OLD}" ]; then
  
  echo "gtfs not changed!"
  
  rm /tmp/gtfs_$NEW_UUID.zip
else
  echo $SHA > $HASH_FILE

  mv /tmp/gtfs_$NEW_UUID.zip /data/$GTFS_FILE.zip
  
  echo "run rebuild hook ${GTFS_URL_UPDATEHOOK}"

  curl -s $GTFS_URL_UPDATEHOOK
fi

#!/bin/sh

TIME=$(date +%x_%H:%M:%S)
DATE="[${TIME}]"
LOGFILE=/data/gtfs_download.log

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

HASH_FILE=$HOME/gtfs_hash.txt

if [ -z "${GTFS_URL}" ]; then
  echo "${DATE} env variable GTFS_URL is empty" >> $LOGFILE
  exit 0
fi

echo -e "\n" >> $LOGFILE
echo "${DATE} Download new gtfs and checksum..." >> $LOGFILE

curl -s "${GTFS_URL}" -o /tmp/gtfs_$NEW_UUID.zip

ls -l /tmp/gtfs_$NEW_UUID.zip >> $LOGFILE

SHA=$(sha256sum /tmp/gtfs_$NEW_UUID.zip | cut -d " " -f 1)

echo "${DATE} new checksum $SHA" >> $LOGFILE

OLD=""
if [ -f "${HASH_FILE}" ]; then
  OLD=$(cat $HASH_FILE)
fi

if [ "${SHA}" = "${OLD}" ]; then
  
  echo "${DATE} gtfs not changed!" >> $LOGFILE
  
  rm /tmp/gtfs_$NEW_UUID.zip
else
  echo $SHA > $HASH_FILE

  mv /tmp/gtfs_$NEW_UUID.zip /data/$GTFS_FILE
  
  #After new File is moved delete all old files
  #find /data/ -name 'gtfs*' -mindepth 1 -mtime +1 -delete
  
  echo "${DATE} run rebuild hook..." >> $LOGFILE   

  #curl -s $GTFS_URL_UPDATEHOOK

  RESP=$(curl --user $GTFS_UPDATEHOOK_USER --write-out '%{http_code}' --silent --output /dev/null $GTFS_URL_UPDATEHOOK)

  echo "hook http response: ${RESP}" >> $LOGFILE
fi

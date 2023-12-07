#!/bin/sh

# SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
#
# SPDX-License-Identifier: AGPL-3.0-or-later

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

if [ ! -f /tmp/gtfs_$NEW_UUID.zip ]; then
    echo "New gtfs file not found!" >> $LOGFILE

elif [ "${SHA}" = "${OLD}" ]; then
  
  echo "${DATE} gtfs not changed!" >> $LOGFILE
  
  rm /tmp/gtfs_$NEW_UUID.zip
else
  echo $SHA > $HASH_FILE

  mv /tmp/gtfs_$NEW_UUID.zip /data/$GTFS_FILE
  
  #After new File is moved delete all old files
  echo "Deleting old gtfs files..." >> $LOGFILE
  find /data/ -name 'gtfs*.zip' -mindepth 1 -mtime +1 >> $LOGFILE
  find /data/ -name 'gtfs*.zip' -mindepth 1 -mtime +1 -delete
  
  echo "${DATE} run rebuild hook..." >> $LOGFILE   

  # Call github action, which in turn launches the calculate job
  RESP=$(curl \
    --write-out '%{http_code}' \
    --silent --output /dev/null  \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GTFS_WORKFLOW_AUTH_TOKEN"\
    -H "X-GitHub-Api-Version: 2022-11-28" \
    $GTFS_WORKFLOW_DISPATCH_URL \
    -d "{\"ref\":\"${GTFS_WORKFLOW_BRANCH}\"}")

  echo "hook http response: ${RESP}" >> $LOGFILE
fi

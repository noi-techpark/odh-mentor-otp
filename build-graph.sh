#!/bin/bash -e

# SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
#
# SPDX-License-Identifier: CC0-1.0

source .otp-version

WGET="wget --progress=bar:force:noscroll"

# OSM
NORTH_EAST_URL=https://download.geofabrik.de/europe/italy/nord-est-latest.osm.pbf
NORTH_EAST_PBF=data/italy-nord-est.osm.pbf
SOUTH_TYROL_PBF=data/south-tyrol.osm.pbf
# elevation
ELEVATION_URL=https://srtm.csi.cgiar.org/wp-content/uploads/files/srtm_5x5/TIFF/srtm_39_03.zip
ELEVATION_ZIP=data/srtm_39_03.zip
# parking
PARKING_NETEX_URL=https://transmodel.api.opendatahub.com/netex/parking
PARKING_NETEX_XML=data/shared-data.xml
PARKING_NETEX_ZIP=data/parking-netex.zip

# when on github actions then install the required tools
if [ -n "${CI+isset}" ]; then
  sudo apt-get -qq install osmium-tool pyosmium wget zip
fi

mkdir -p data

if [ ! -f "${NORTH_EAST_PBF}" ]; then
  ${WGET} ${NORTH_EAST_URL} -O ${NORTH_EAST_PBF}
else
  echo "Checking for updates for existing OSM file"
  pyosmium-up-to-date ${NORTH_EAST_PBF}
fi

# cut out South Tyrol from the large North East Italy extract
echo "Extracting ${SOUTH_TYROL_PBF} from ${NORTH_EAST_PBF}"
osmium extract ${NORTH_EAST_PBF} --polygon south-tyrol.geojson -o ${SOUTH_TYROL_PBF} --overwrite

if [ ! -f "${ELEVATION_ZIP}" ]; then
  ${WGET} ${ELEVATION_URL} -O ${ELEVATION_ZIP}
  unzip -o ${ELEVATION_ZIP} -d data
fi

# download parking data and put it into a zip
rm -f ${PARKING_NETEX_XML} ${PARKING_NETEX_ZIP}
wget ${PARKING_NETEX_URL} -O ${PARKING_NETEX_XML}

zip --junk-paths ${PARKING_NETEX_ZIP} ${PARKING_NETEX_XML}


# actually do graph build
docker run \
  -v .:/var/opentripplanner/:z \
  --rm \
  -e JAVA_TOOL_OPTIONS="-Xmx6G" \
  "${OTP_IMAGE}" --abortOnUnknownConfig --build --save

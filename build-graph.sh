#!/bin/sh

# SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
#
# SPDX-License-Identifier: CC0-1.0

mkdir -p data

NORTH_EASTH_PBF=data/italy-nord-est.osm.pbf
SOUTH_TYROL_PBF=data/south-tyrol.osm.pbf

OTP_IMAGE=docker.io/opentripplanner/opentripplanner:2.5.0_2024-01-19T14-50

wget https://download.geofabrik.de/europe/italy/nord-est-latest.osm.pbf -O ${NORTH_EASTH_PBF} --no-clobber
osmium extract ${NORTH_EASTH_PBF} --polygon south-tyrol.geojson -o ${SOUTH_TYROL_PBF} --overwrite

podman run \
  -v .:/var/opentripplanner/:z \
  --rm \
  -e JAVA_TOOL_OPTIONS="Xmx16G" \
  ${OTP_IMAGE} --build --save

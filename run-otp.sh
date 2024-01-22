#!/bin/sh

# SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
#
# SPDX-License-Identifier: CC0-1.0

OTP_IMAGE=docker.io/opentripplanner/opentripplanner:2.5.0_2024-01-19T14-50

docker run \
  -it \
  -v .:/var/opentripplanner/:z \
  --rm \
  -e JAVA_TOOL_OPTIONS="-Xmx6G" \
  -p 8080:8080 \
  ${OTP_IMAGE} --load --serve

#!/bin/sh

# SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
#
# SPDX-License-Identifier: CC0-1.0

exec java -Xmx"$JAVA_MX" -jar /usr/local/share/java/otp-unofficial.jar "$@"

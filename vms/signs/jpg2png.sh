#!/bin/bash

# SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
#
# SPDX-License-Identifier: CC0-1.0

#
ls -1 ./images/*.jpg | xargs -n 1 bash -c 'convert "$0" "${0%.jpg}.png"'
rm -f ./images/*.jpg
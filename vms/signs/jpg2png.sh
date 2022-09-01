#!/bin/bash
#
ls -1 ./images/*.jpg | xargs -n 1 bash -c 'convert "$0" "${0%.jpg}.png"'
rm -f ./images/*.jpg
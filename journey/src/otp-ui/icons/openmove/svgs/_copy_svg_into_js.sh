#!/bin/bash

# SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
#
# SPDX-License-Identifier: AGPL-3.0-or-later

for f in *.svg;
do
	fjs=$(echo $f | sed 's/svg/js/g')
	echo -e "\n\n\n/*" >> $fjs
	cat $f >> $fjs
	echo -e "\n\n\n*/" >> $fjs
done

#!/bin/bash

for f in *.svg;
do
	fjs=$(echo $f | sed 's/svg/js/g')
	echo -e "\n\n\n/*" >> $fjs
	cat $f >> $fjs
	echo -e "\n\n\n*/" >> $fjs
done

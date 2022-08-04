#!/usr/bin/env bash

#for auto download gtfs
crond
if [ -v GTFS_URL_UPDATETIME ]; then  
(crontab -l ; echo "$GTFS_URL_UPDATETIME" /gtfs-import-task/gtfs-download.sh) | crontab -
fi

if [ "${DOWNLOAD_DATA}" = "True" ]; then
	#TODO move to file download-data.sh
	#
	#
	# online tool selection:
	#
	# free 90m: http://dwtkns.com/srtm
	#
	# SRTM 30m: http://dwtkns.com/srtm30m/
	# require login https://urs.earthdata.nasa.gov/
	#

	srtmurl="http://srtm.csi.cgiar.org/wp-content/uploads/files/srtm_5x5/TIFF/srtm_39_03.zip"
	srtmzip=/data/srtm_39_03.zip
	srtmfile=/data/srtm_39_03.tif

	if [ ! -f $srtmzip ]; then
		#TODO check srtm data and download by bbox of gtfs
		echo "Download altimetric data SRTM..."
		curl -L $srtmurl -o $srtmzip
	fi
	if [ ! -f $srtmfile ]; then
		echo "Unzip altimetric data SRTM..."
		unzip -qo -d /data $srtmzip -x "*.tfw" "*.hdr" "*.txt"
		#rm -f $srtmzip
		#fix srtm data with gdal
		gdal_edit.py -unsetnodata $srtmfile
	fi

	if [ -f "/data/${GTFS_FILE}" ]; then

		zipfile="/data/${GTFS_FILE}"
		unzipdir="${zipfile%.zip}"
		if [ ! -d $unzipdir ]; then
			mkdir -p $unzipdir
			echo "unzip gtfs file... ${zipfile}"
			unzip -qo -d "$unzipdir" "$zipfile"
		fi

		#TODO manage multiple gtfs zipfiles
		#
		echo "Openstreetmap calculation of downloadable urls from gtfs..."

		node /gtfs2bbox/bboxes.js $unzipdir --overpass > /data/osm.url

		#head -n2 /data/osm.url > /data/osm.url.tmp
		#cp /data/osm.url.tmp /data/osm.url
		#for DEBUG speed up the download

		countfiles=$(wc -l < /data/osm.url)

		echo "Openstreetmap downloading... ${countfiles} .osm files in data dir"

		if [ -s /data/osm.url ]; then
			#file is not empty

			while read -r url ; do
				name=$(echo $url | cut -d '=' -f2 | sed 's/[,\.]/_/g') #clear name
				fileout="/data/${name}.osm"
				if [ ! -f $fileout ]; then
					echo "Osm file downloading... $url"

					curl -o "$fileout" "$url"

					sleep 1
					#prevent request ban
				else
					echo "Osm file downloaded $fileout"
				fi
			done < /data/osm.url
		else
			echo "Openstreetmap osm.url file is empty!"
		fi
		#
		#TODO join osm files into one:(osmconvert is faster than otp)
		#	osmconvert *.osm  -o=../trentino.osm
		#
		#TODO filter data
		#http://docs.opentripplanner.org/en/dev-2.x/Preparing-OSM/
		#
		#TEST POVO little bbox curl 'https://overpass-api.de/api/map?bbox=11.145640,46.058827,11.166111,46.070020' -o ./data/povo.osm
	else
		echo "File GTFS not found! /data/${GTFS_FILE}"
		#echo "File /data/osm.url not found! see README to generate it"
	fi
	#
	# TODO use scripts in ./gtfs2bbox after dowloaded gtfs data
	# bbox.js, bboxes.js and fetch-osm-wget.js or
	# #curl 'https://overpass-api.de/api/map?bbox=10.4233,45.6601,11.9778,46.4908' -o $DIR/trento.OSM
fi

if [ "${BUILD_GRAPH}" = "True" ]; then

	node /conf/envconfig.js /conf/build-config.json > /data/build-config.json

	if [ "${UPDATERS}" = "True" ]; then
		node /conf/envconfig.js /conf/router-config.json > /data/router-config.json
	fi

	echo "Building graph file... /data/Graph.obj"

	#BUILD GRAPH
	if [ "${OTP_OFFICIAL}" = "False" ]; then
		otp-unofficial.sh --build /data
	else
		otp.sh --build /data
	fi

	mkdir -p /data/openmove

	if [ -f /data/Graph.obj ]; then

		#BUILD GRAPH BACKUP

		if [ "${BACKUP_GRAPH}" = "True" ]; then
			backupfile=$(date +"Graph.obj.%y-%m-%d.tgz")
			echo "Create new backup... $backupfile"
			tar -C /data -czf $backupfile Graph.obj
		fi

		mv -f /data/Graph.obj /data/openmove/Graph.obj
	else
		echo "Error to build /data/Graph.obj"
		exit 1
	fi
	#TODO check graph valid,size,bounding box

	exit 0
	#TODO shutdown the machine and gen logs
else
	if [ "${OTP_OFFICIAL}" = "False" ]; then
		otp-unofficial.sh --graphs /data --router openmove --server --autoReload
	else
		otp.sh --graphs /data --router openmove --server --autoReload
	fi

fi

if [ ! -f /data/openmove/Graph.obj ]; then
	echo "File GRAPH not found! /data/openmove/Graph.obj build a new graph!"
	exit 1
fi

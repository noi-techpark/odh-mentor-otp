#!/usr/bin/env bash
#
if [ "${DOWNLOAD_DATA}" = "True" ]; then
	#TODO move to file download-data.sh
	
	srtmurl="http://srtm.csi.cgiar.org/wp-content/uploads/files/srtm_5x5/TIFF/srtm_39_03.zip"
	srtmzip=/data/srtm_39_03.zip
	srtmfile=/data/srtm_39_03.tif

	if [ ! -f $srtmfile ]; then
		#TODO check srtm data and download by bbox of gtfs
		echo "Download altimetric data SRTM..."
		curl -L $srtmurl -o $srtmzip
		unzip -qo -d /data $srtmzip -x "*.tfw" "*.hdr" "*.txt"
		rm -f $srtmzip
	fi

	#if [ -f "/data/${GTFS_FILE}" ]; then
	if [ -f "/data/osm.url" ]; then

		# zipfile="/data/${GTFS_FILE}"
		# unzipdir="${zipfile%.zip}"
		# if [ ! -d $unzipdir ]; then
		# 	mkdir -p $unzipdir
		# 	echo "unzip gtfs file... ${zipfile}"
		# 	unzip -qo -d "$unzipdir" "$zipfile"
		# fi

		#TODO manage multiple gtfs zipfiles
		#echo "TODO download based on gtfs bbox"
		#osmurl=$(node gtfs2bbox/bbox.js $unzipdir --overpass)
		#print only overpass url to download data
		countfiles=$(wc -l < /data/osm.url)
		echo "Openstreetmap downloading... ${countfiles} files"
		#echo $osmurl > /data/osm.url

		#if [ -f /data/osm.url ]; then

			while read -r url ; do
				name=$(echo $url | cut -d '=' -f2 | sed 's/[,\.]/_/g') #clear name
				fileout="/data/${name}.osm"
				if [ ! -f $fileout ]; then
					echo "Osm file downloading... $url"
					curl -o "$fileout" "$url"
				else
					echo "Osm file downloaded $fileout"
				fi
			done < /data/osm.url
		#fi
		#
		#TODO join osm files into one:(osmconvert is faster than otp)
		#	osmconvert *.osm  -o=../trentino.osm
		#
		#TODO filter data
		#http://docs.opentripplanner.org/en/dev-2.x/Preparing-OSM/
		#
		#TEST POVO little bbox curl 'https://overpass-api.de/api/map?bbox=11.145640,46.058827,11.166111,46.070020' -o ./data/povo.osm
	else
		#echo "File GTFS not found! /data/${GTFS_FILE}"
		echo "File /data/osm.url not found! see README to generate it"
	fi
	#
	# TODO use scripts in ./gtfs2bbox after dowloaded gtfs data
	# bbox.js, bboxes.js and fetch-osm-wget.js or 
	# #curl 'https://overpass-api.de/api/map?bbox=10.4233,45.6601,11.9778,46.4908' -o $DIR/trento.OSM
fi

if [ "${BUILD_GRAPH}" = "True" ]; then
	#TODO check gtfs data
	#TODO use build-config.json
	# https://docs.opentripplanner.org/en/latest/Configuration/

	echo "Building graph file... /data/Graph.obj"

	#BUILD GRAPH
	otp.sh --build /data

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
	otp.sh --graphs /data --router openmove --server --insecure
fi

if [ ! -f /data/openmove/Graph.obj ]; then
	echo "File GRAPH not found! /data/openmove/Graph.obj build a new graph!"
	exit 1
fi

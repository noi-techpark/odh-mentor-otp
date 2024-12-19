#!/bin/bash -e

CURL="curl --location --fail --show-error -#"

# Configuration
SAXON_URL="https://github.com/Saxonica/Saxon-HE/releases/download/SaxonHE12-5/SaxonHE12-5J.zip"
SAXON_ZIP="saxon.zip"
SAXON_JAR="saxon/saxon-he-12.5.jar"
INPUT_XML="sta.netex.xml"
XSL_FILE="transform-scheduled-stop-point-ids.xsl"
OUTPUT_XML="output.xml"

if [ ! -f "${SAXON_JAR}" ]; then
  $CURL $SAXON_URL -o $SAXON_ZIP
  unzip $SAXON_ZIP
fi

echo "Running Saxon transformation..."
java -jar "$SAXON_JAR" -s:"$INPUT_XML" -xsl:"$XSL_FILE" -o:"$OUTPUT_XML"
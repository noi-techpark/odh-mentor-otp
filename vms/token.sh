#!/bin/bash

# get token
#https://docs.opendatahub.com/en/latest/guidelines/authentication.html#grant-token

if [ -f .env ]
then
#  export $(cat .env | xargs)
	source .env
fi

# if [ -f .token ]
# then
# #  export $(cat .env | xargs)
# 	cat .token
# 	exit
# fi
#echo "$API_USER - $API_PASS"

#CLIENT_ID=odh-mobility-analytics
CLIENT_ID=odh-generic-client
#CLIENT_ID=odh-mobility-v2

#PAYLOAD="grant_type=password&username=$API_USER&password=$API_PASS&client_id=$CLIENTID"

curl -X POST -L "https://auth.opendatahub.bz.it/auth/realms/noi/protocol/openid-connect/token" \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode "username=${API_USER}" \
--data-urlencode "password=${API_PASS}" \
--data-urlencode "client_id=${CLIENT_ID}" | jq . | tee .token.json
# | jq .access_token | tr -d '\"' > .token
#--data-urlencode 'client_secret=the_client_secret'
#cat .token

jq .access_token .token.json | tr -d '"' > .token
jq .refresh_token .token.json | tr -d '"' > .token_ref

sed -i -ze 's/\n$//' .token
sed -i '/TOKEN/d' .env
echo "TOKEN=$(cat .token)" >> .env

#
##get data
# curl -v -X GET "${API_HOST}/v2/flat,node/VMS/*/latest?limit=5" \
#     -H "content-type: application/json"
#     #-H "Authorization: bearer ${TOKEN}"

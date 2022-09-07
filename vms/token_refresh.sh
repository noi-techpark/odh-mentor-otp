#!/bin/bash

# get token
#https://docs.opendatahub.com/en/latest/guidelines/authentication.html#grant-token

if [ -f .env ]
then
	source .env
fi

if [ -f .token_ref ]
then
	TOKEN_REF=$(cat .token_ref)
	#cat .token_ref
	#exit
fi
#echo "$API_USER - $API_PASS"

#CLIENT_ID=odh-mobility-analytics
CLIENT_ID=odh-generic-client
#CLIENT_ID=odh-mobility-v2

#PAYLOAD="grant_type=password&username=$API_USER&password=$API_PASS&client_id=$CLIENTID"
~$ curl -X POST -L "https://auth.opendatahub.bz.it/auth/realms/noi/protocol/openid-connect/token" \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=refresh_token' \
--data-urlencode "refresh_token=${TOKEN_REF}" \
--data-urlencode "lient_id=${CLIENT_ID}"

jq .access_token token.json | tr -d '"' > .token
jq .refresh_token token.json | tr -d '"' > .token_ref

sed -i -ze 's/\n$//' .token
echo "TOKEN=$(cat .token)" >> .env

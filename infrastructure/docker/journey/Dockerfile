FROM node:16.14.0-alpine3.14
#for next upgrades https://github.com/openmove/odh-mentor-otp/issues/126

ARG API_HOST=http://localhost
ARG	API_PATH=/otp/routers/default
ARG	API_PORT=8080
ARG FOLDER=/
ARG GEOCODER_BASEURL=http://localhost/geocoder
ARG PARKING_BASEURL=http://localhost/parking
ARG DRT_BASEURL=http://localhost/drt
ARG CHARGER_BASEURL=http://localhost/charger
ARG CARSHARING_BASEURL=http://localhost/carsharing
ARG TRAFFIC_BASEURL=http://localhost/traffic
ARG GOOGLE_ANALYTICS_ID=''
ARG MATOMO_BASE_URL=https://digital.matomo.cloud/
ARG MATOMO_SITE_ID=20

ENV API_HOST=$API_HOST \
	API_PATH=$API_PATH \
	API_PORT=$API_PORT \
	FOLDER=$FOLDER \
	GEOCODER_BASEURL=$GEOCODER_BASEURL \
	PARKING_BASEURL=$PARKING_BASEURL \
	DRT_BASEURL=$DRT_BASEURL \
	CHARGER_BASEURL=$CHARGER_BASEURL \
	CARSHARING_BASEURL=$CARSHARING_BASEURL \
	TRAFFIC_BASEURL=$TRAFFIC_BASEURL \
	GOOGLE_ANALYTICS_ID=$GOOGLE_ANALYTICS_ID \
	MATOMO_BASE_URL=${MATOMO_BASE_URL} \
	MATOMO_SITE_ID=${MATOMO_SITE_ID}

#TODO ENV NODE_ENV=production
#before resolve npm dependecies

RUN apk add --no-cache \
	bash \
	nginx && \
	mkdir -p /run/nginx && \
	mkdir -p /var/www/html

RUN mkdir -p /journey

COPY ./journey /journey

WORKDIR /journey

RUN yarn install

RUN yarn build && mv dist/* /var/www/html/

COPY ./infrastructure/docker/journey/docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

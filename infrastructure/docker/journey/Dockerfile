FROM node:12-buster-slim

ARG API_HOST=http://localhost
ARG	API_PATH=/otp/routers/default
ARG	API_PORT=8080
ARG FOLDER=/
ARG GEOCODER_BASEURL=http://localhost/geocoder/v1
ARG PARKING_BASEURL=http://localhost/parking
ARG DRT_BASEURL=http://localhost/drt
ARG CHARGER_BASEURL=http://localhost/charger
ARG CARSHARING_BASEURL=http://localhost/carsharing

ENV API_HOST=$API_HOST \
	API_PATH=$API_PATH \
	API_PORT=$API_PORT \
	FOLDER=$FOLDER \
	GEOCODER_BASEURL=$GEOCODER_BASEURL \
	PARKING_BASEURL=$PARKING_BASEURL \
	DRT_BASEURL=$DRT_BASEURL \
	CHARGER_BASEURL=$CHARGER_BASEURL \
	CARSHARING_BASEURL=$CARSHARING_BASEURL

RUN	apt-get -qq update && \
	apt-get -y install nginx git && \
	rm -f /var/www/html/index.nginx-debian.html

RUN mkdir -p /journey

COPY ./journey /journey

WORKDIR /journey

RUN rm -fr node_modules

RUN npm install
RUN npm run genconfig

WORKDIR /journey/app

RUN rm -fr node_modules

RUN yarn install

RUN	yarn build && mv dist/* /var/www/html/

COPY ./infrastructure/docker/journey/docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

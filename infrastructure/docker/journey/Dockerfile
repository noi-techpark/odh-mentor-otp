FROM node:12-buster-slim

ARG API_HOST=http://localhost
ARG	API_PATH=/otp/routers/default
ARG	API_PORT=8080
ARG FOLDER=/
ARG GEOCODER_BASEURL=http://localhost/geocoder/v1

ENV API_HOST=$API_HOST \
	API_PATH=$API_PATH \
	API_PORT=$API_PORT \
	FOLDER=$FOLDER \
	GEOCODER_BASEURL=$GEOCODER_BASEURL

RUN	apt-get -qq update && \
	apt-get -y install nginx && \
	rm -f /var/www/html/index.nginx-debian.html

RUN mkdir -p /otp-app

WORKDIR /otp-app

COPY ./otp-app/app ./app
COPY ./otp-app/config.yml .
COPY ./otp-app/config.yml .
COPY ./otp-app/envtmpl.js .

#valorize env vars inside app/config.yml
RUN npm run genconfig

RUN cd ./app && \
	yarn install

RUN cd /otp-app/app/ && \
	yarn build -o /var/www/html/dist

RUN mkdir -p /var/www/html/it /var/www/html/en /var/www/html/de

RUN	cd /var/www/html/ && \
	cp -r ./dist/* ./ && \
	cp -r ./dist/* ./it/ && \
	cp -r ./dist/* ./en/ && \
	cp -r ./dist/* ./de/

COPY ./otp-app/language_it.js /var/www/html/language.js
COPY ./otp-app/language_it.js /var/www/html/it/language.js
COPY ./otp-app/language_en.js /var/www/html/en/language.js

COPY ./infrastructure/docker/journey/docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

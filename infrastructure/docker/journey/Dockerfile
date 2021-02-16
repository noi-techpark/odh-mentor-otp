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

RUN mkdir -p /journey

WORKDIR /journey

COPY ./journey/app ./app
COPY ./journey/package.json .
COPY ./journey/config.yml .
COPY ./journey/envtmpl.js .

#valorize env vars inside app/config.yml
RUN npm install && npm run genconfig

RUN cd ./app && \
	yarn install

RUN	cd ./app && \
	yarn build && \
	mv dist /var/www/html/

#RUN mkdir -p /var/www/html/it /var/www/html/en /var/www/html/de

RUN	cd /var/www/html/ && \
#	ls -l ./dist && \
	cp ./dist/* ./ && \
	cp -r ./dist ./it && \
	cp -r ./dist ./en && \
	cp -r ./dist ./de

COPY ./journey/language_it.js /var/www/html/language.js
COPY ./journey/language_it.js /var/www/html/it/language.js
COPY ./journey/language_en.js /var/www/html/en/language.js
COPY ./journey/language_de.js /var/www/html/de/language.js

COPY ./infrastructure/docker/journey/docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

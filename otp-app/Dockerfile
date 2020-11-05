FROM node:12-buster-slim

ARG API_HOST=http://localhost
ARG	API_PATH=/otp/routers/default
ARG	API_PORT=8080
ARG FOLDER=/

ENV API_HOST=$API_HOST \
	API_PATH=$API_PATH \
	API_PORT=$API_PORT \
	FOLDER=$FOLDER

RUN	apt-get -qq update && \
	apt-get -y install nginx && \
	rm -f /var/www/html/index.nginx-debian.html

RUN mkdir -p /otp-app

WORKDIR /otp-app

COPY ./app/ ./app/
COPY ./envtmpl.js .
COPY ./config.yml .

RUN cd app && \
	yarn install

#valorize config ${VAR} vars with env vars
RUN sh -c 'node envtmpl.js config.yml > /otp-app/app/lib/config.yml'

#COPY ./style.css /var/www/html/
#COPY ./index.html /var/www/html/

RUN cd /otp-app/app/ && \
	yarn build -o /var/www/html/dist

RUN mkdir -p /var/www/html/it /var/www/html/en /var/www/html/de

RUN	cd /var/www/html/ && \
	cp -r ./dist/* ./ && \
	cp -r ./dist/* ./it/ && \
	cp -r ./dist/* ./en/ && \
	cp -r ./dist/* ./de/

COPY ./language_it.js /var/www/html/language.js
COPY ./language_it.js /var/www/html/it/language.js
COPY ./language_en.js /var/www/html/en/language.js

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

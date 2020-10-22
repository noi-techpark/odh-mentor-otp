FROM node:12-buster-slim

ARG API_HOST=http://localhost
ARG	API_PATH=/otp/routers/default
ARG	API_PORT=8080
ARG	BRAND=OpenMove
ARG	TITLE=OpenMove
ARG	FOLDER=it

ENV API_HOST=$API_HOST \
	API_PATH=$API_PATH \
	API_PORT=$API_PORT \
	BRAND=$BRAND \
	TITLE=$TITLE \
	FOLDER=$FOLDER

RUN	apt-get -qq update && \
	apt-get -y install \
	nginx

RUN mkdir -p /otp-app

WORKDIR /otp-app

COPY ./app-it/ ./app-it/
COPY ./envtmpl.js .
COPY ./config.yml .

RUN cd app-it && \
	yarn install


#valorize config ${VAR} vars with env vars
RUN sh -c 'node envtmpl.js config.yml > /otp-app/app-it/lib/config.yml'

RUN cd /otp-app/app-it/ && \
	yarn build && \
	rm -f /var/www/html/index.nginx-debian.html && \
	cp -fr dist /var/www/html/$FOLDER/

COPY ./style.css /var/www/html/

COPY ./index.html /var/www/html/

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

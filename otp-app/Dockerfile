FROM node:12-buster-slim

ARG API_HOST=http://otp
ARG	API_PATH=/otp/routers/default
ARG	API_PORT=8080

ENV API_HOST=$API_HOST \
	API_PATH=$API_PATH \
	API_PORT=$API_PORT \
	FOLDER=$FOLDER

RUN	apt-get -qq update && \
	apt-get -y install \
	nginx

RUN mkdir -p /otp-app

WORKDIR /otp-app

COPY ./app/ ./app/
COPY ./envtmpl.js .
COPY ./config.yml .

RUN cd app && \
	yarn install


#valorize config ${VAR} vars with env vars
RUN sh -c 'node envtmpl.js config.yml > /otp-app/app/lib/config.yml'

RUN cd /otp-app/app/ && \
	yarn build && \
	rm -f /var/www/html/index.nginx-debian.html && \
	cp -fr dist /var/www/html/

COPY ./style.css /var/www/html/
COPY ./index.html /var/www/html/

#language for this distro
COPY ./language_it.js /var/www/html/dist/language.js

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

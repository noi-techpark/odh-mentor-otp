FROM node:12-buster-slim

ARG OTP_UI_BRANCH=master
ARG OTP_RR_BRANCH=mentor-meran

ARG API_HOST=http://localhost
ARG	API_PATH=/otp/routers/default
ARG	API_PORT=8080

ENV API_HOST=$API_HOST \
	API_PATH=$API_PATH \
	API_PORT=$API_PORT

RUN	apt-get -qq update && \
	apt-get -y install \
	nginx \
	git-core

RUN mkdir -p /otp-app

WORKDIR /otp-app

RUN echo "Cloning otp-ui..." && \
    git clone --single-branch --branch $OTP_UI_BRANCH https://github.com/openmove/otp-ui.git

RUN echo "Cloning otp-react-redux..." && \
    git clone --single-branch --branch $OTP_RR_BRANCH https://github.com/openmove/otp-react-redux.git

RUN cd otp-react-redux && \
	yarn install

COPY ./config.yml .
COPY ./envtmpl.js .

RUN sh -c 'node envtmpl.js config.yml > /otp-app/otp-react-redux/config.yml'

RUN cd otp-react-redux && \
	yarn build && \
	rm -f /var/www/html/index.nginx-debian.html && \
	cp -fr dist /var/www/html/

COPY ./style.css /var/www/html/

COPY ./index.html /var/www/html/

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

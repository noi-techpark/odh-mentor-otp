FROM node:12-buster-slim

ARG OTP_UI_BRANCH=master
ARG OTP_RR_BRANCH=mentor-meran

RUN	apt-get -qq update && \
	apt-get -y install \
	nginx \
	git-core

RUN mkdir -p /otp-app

WORKDIR /otp-app

RUN echo "Cloning otp-ui branch ${OTP_UI_BRANCH}..." && \
    git clone --single-branch --branch $OTP_UI_BRANCH https://github.com/openmove/otp-ui.git

RUN echo "Cloning otp-react-redux branch ${OTP_RR_BRANCH}..." && \
    git clone --single-branch --branch $OTP_RR_BRANCH https://github.com/openmove/otp-react-redux.git

RUN cd otp-react-redux && \
	yarn install && \
	npm install underscore

COPY ./config.yml otp-react-redux/config.yml

COPY ./env2yml.js 

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

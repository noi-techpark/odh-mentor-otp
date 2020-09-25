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
	yarn install

COPY ./config.yml otp-react-redux/config.yml

RUN cd otp-react-redux && \
	yarn build && \
	cp -fr dist /usr/share/nginx/html/


COPY ./style.css /usr/share/nginx/html/style.css

COPY ./index.html /usr/share/nginx/html/index.html

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

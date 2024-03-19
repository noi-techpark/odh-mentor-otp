FROM node:21.7.1-alpine3.18

RUN apk add --no-cache \
	bash \
	git \
	nginx && \
	mkdir -p /run/nginx && \
	mkdir -p /var/www/html

RUN git clone https://github.com/opentripplanner/otp-react-redux.git

COPY otp-react-redux-config ./otp-react-redux

WORKDIR /otp-react-redux

RUN yarn install
RUN env YAML_CONFIG=$PWD/config.yml yarn build && mv dist/* /var/www/html/

COPY ./infrastructure/docker/journey/docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]
FROM node:12.18.2-alpine3.11

ARG OTP_VERSION=1.4.0

ENV BRANCH=v1.4.0 \
    BRANCH_ALIAS=1.4.0 \
    JAVA_MX=4G \
    GBFS_VERSION=1

RUN apk add --no-cache \
    openjdk8-jre \
    unzip \
    bash \
    curl \
    gdal-tools

RUN mkdir -p /usr/local/share/java
RUN mkdir -p /var/otp

RUN curl -o /usr/local/share/java/otp.jar https://repo1.maven.org/maven2/org/opentripplanner/otp/$OTP_VERSION/otp-$OTP_VERSION-shaded.jar
COPY otp-unofficial.jar /usr/local/share/java/otp-unofficial.jar

COPY otp.sh /usr/local/bin/
COPY otp-unofficial.sh /usr/local/bin/

COPY infrastructure/docker/otp/docker-entrypoint.sh /docker-entrypoint.sh

COPY ./gtfs2bbox /gtfs2bbox

RUN cd /gtfs2bbox && \
	npm install

RUN chmod 755 /usr/local/bin/*
RUN chmod 755 /docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

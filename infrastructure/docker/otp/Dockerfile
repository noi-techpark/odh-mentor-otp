FROM node:12.18.2-alpine3.11

ARG OTP_VERSION=1.4.0
ARG GTFS_URL_UPDATETIME=daily

ENV JAVA_MX=4G \
    GBFS_VERSION=1 \
    GTFS_URL=ftp://ftp.sta.bz.it/gtfs/google_transit_shp.zip \
    GTFS_URL_UPDATETIME=$GTFS_URL_UPDATETIME \
    GTFS_URL_UPDATEHOOK=''

RUN apk add --no-cache \
    openjdk8-jre \
    unzip \
    bash \
    curl \
    gdal-tools

RUN mkdir -p /usr/local/share/java
RUN mkdir -p /var/otp
RUN mkdir -p /conf

RUN curl -o /usr/local/share/java/otp.jar https://repo1.maven.org/maven2/org/opentripplanner/otp/$OTP_VERSION/otp-$OTP_VERSION-shaded.jar

#COPY otp-unofficial.jar /usr/local/share/java/otp-unofficial.jar
COPY otp-parent-support.jar /usr/local/share/java/otp-unofficial.jar

COPY otp.sh /usr/local/bin/
COPY otp-unofficial.sh /usr/local/bin/

COPY infrastructure/docker/otp/docker-entrypoint.sh /docker-entrypoint.sh

COPY build-config.json /conf/
COPY router-config.json /conf/
COPY envconfig.js /conf/

COPY ./gtfs2bbox /gtfs2bbox
COPY ./gtfs-import /gtfs-import

RUN cp /gtfs-import/gtfs-download.sh /etc/periodic/$GTFS_URL_UPDATETIME/gtfsdownload
RUN chmod 755 /etc/periodic/$GTFS_URL_UPDATETIME/gtfsdownload
RUN echo "Created gtfs auto download task at file"
RUN ls -l /etc/periodic/$GTFS_URL_UPDATETIME/gtfsdownload

RUN cd /gtfs2bbox && \
	npm install

RUN chmod 755 /usr/local/bin/*
RUN chmod 755 /docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

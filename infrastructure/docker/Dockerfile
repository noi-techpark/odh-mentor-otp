#FROM openjdk:8-jre-alpine3.9

FROM timbru31/java-node:8-jre

ARG OTP_VERSION=1.4.0

ENV BRANCH=v1.4.0 \
    BRANCH_ALIAS=1.4.0 \
    JAVA_MX=4G

RUN	apt-get -qq update && \
	apt-get -y install unzip bash curl

RUN mkdir -p /usr/local/share/java
RUN mkdir -p /var/otp

RUN curl -o /usr/local/share/java/otp.jar https://repo1.maven.org/maven2/org/opentripplanner/otp/$OTP_VERSION/otp-$OTP_VERSION-shaded.jar

COPY otp.sh /usr/local/bin/

COPY infrastructure/docker/docker-entrypoint.sh /docker-entrypoint.sh

COPY ./gtfs2bbox /gtfs2bbox

RUN cd /gtfs2bbox && \
	npm install

RUN chmod 755 /usr/local/bin/*
RUN chmod 755 /docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

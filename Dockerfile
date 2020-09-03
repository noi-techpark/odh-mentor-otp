FROM openjdk:8-jre-alpine3.9
#TODO https://github.com/timbru31/docker-java-node

MAINTAINER openmove <info@openmove.com>

ENV BRANCH=v1.4.0 \
    BRANCH_ALIAS=1.4.0 \
    JAVA_MX=4G

RUN apk update
RUN apk --no-cache add bash curl

RUN mkdir -p /usr/local/share/java

#TODO download jar
#https://repo1.maven.org/maven2/org/opentripplanner/otp/1.4.0/otp-1.4.0-shaded.jar


COPY otp.jar /usr/local/share/java/otp.jar
COPY otp.sh /usr/local/bin/

COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod 755 /usr/local/bin/*
RUN chmod 755 /docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

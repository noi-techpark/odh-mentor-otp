FROM openjdk:8-jre-alpine3.9

ENV BRANCH=v1.4.0 \
    BRANCH_ALIAS=1.4.0 \
    JAVA_MX=4G

RUN apk update
RUN apk --no-cache add bash curl

RUN mkdir -p /usr/local/share/java
RUN mkdir -p /var/otp

COPY otp.jar /usr/local/share/java/otp.jar
COPY otp.sh /usr/local/bin/
COPY otp-keystore /var/otp/keystore

COPY infrastructure/docker/docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod 755 /usr/local/bin/*
RUN chmod 755 /docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/bin/bash"]
CMD ["/docker-entrypoint.sh"]

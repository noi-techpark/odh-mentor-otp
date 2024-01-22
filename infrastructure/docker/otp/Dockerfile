FROM docker.io/opentripplanner/opentripplanner:2.5.0_2024-01-19T14-50

WORKDIR /var/otp

ADD router-config.json /var/otp/
ADD graph.obj /var/otp/

ENTRYPOINT java $JAVA_OPTS -cp @/app/jib-classpath-file @/app/jib-main-class-file /var/otp/ --load --serve
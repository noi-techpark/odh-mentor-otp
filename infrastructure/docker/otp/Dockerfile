# Simon, do you know how we could use the value from .otp-version here?
FROM opentripplanner/opentripplanner:2.7.0_2025-01-20T10-51

WORKDIR /var/otp

ADD router-config.json otp-config.json /var/otp/
ADD graph.obj /var/otp/

ENTRYPOINT java $JAVA_OPTS -cp @/app/jib-classpath-file @/app/jib-main-class-file /var/otp/ --load --serve
FROM ghcr.io/mobidata-bw/x2gbfs:2024-04-02T16-37

ARG CARSHARING_BASEURL=https://carsharing.otp.opendatahub.testingmachine.eu

ENV CARSHARING_BASEURL=$CARSHARING_BASEURL

# create a "fake" cron job with sleep 60 and endless while loop
ENTRYPOINT while true; do python -m x2gbfs.x2gbfs -p noi -b ${CARSHARING_BASEURL}; sleep 60; done;


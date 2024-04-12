FROM ghcr.io/mobidata-bw/x2gbfs:2024-04-02T16-37

# create a "fake" cron job with sleep
# and with docker compose "restart: unless-stopped" 
RUN echo "sleep 60..."
RUN sleep 60
RUN echo "done."

ENTRYPOINT ["python", "-m", "x2gbfs.x2gbfs", "-p", "noi", "-b", "https://carsharing.otp.opendatahub.testingmachine.eu"]


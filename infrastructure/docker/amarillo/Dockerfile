FROM ghcr.io/mfdz/amarillo:main

RUN apt-get update && apt-get install -y wget zip && rm -r /var/lib/apt/lists/*

# Download stop sources
RUN wget -O sta.gtfs.zip https://gtfs.api.opendatahub.com/v1/dataset/sta-time-tables/raw && \
    unzip -d stops/ sta.gtfs.zip stops.txt && \
    mv stops/stops.txt stops/stops_gtfs.csv && \
    rm sta.gtfs.zip

# Remove preexisting config
RUN rm /app/conf/region/* && \
    rm /app/conf/agency/*

# Overwrite config
COPY ./amarillo /app

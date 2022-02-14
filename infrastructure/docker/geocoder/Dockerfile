FROM node:14.16.0-alpine3.11

WORKDIR /home

COPY geocoder/ ./

RUN npm install

CMD ["node", "index.js"]

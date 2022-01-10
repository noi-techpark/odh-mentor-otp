FROM node:14.16.0-alpine3.11

WORKDIR /home

COPY carsharing/ ./

RUN npm install

EXPOSE 8091
CMD ["node", "index.js"]

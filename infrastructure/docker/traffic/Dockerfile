FROM node:14.16.0-alpine3.11

WORKDIR /home

COPY traffic/ ./

RUN npm install

CMD ["node", "index.js"]

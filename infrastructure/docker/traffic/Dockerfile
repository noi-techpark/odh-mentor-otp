FROM node:16.14.0-alpine3.14

WORKDIR /home

COPY traffic/ ./

RUN npm install

CMD ["node", "index.js"]

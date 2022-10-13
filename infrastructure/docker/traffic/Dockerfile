FROM node:16.14.0-alpine3.14

WORKDIR /home

COPY base /base
RUN cd /base && npm install

COPY traffic/ ./
RUN npm install

CMD ["node", "index.js"]

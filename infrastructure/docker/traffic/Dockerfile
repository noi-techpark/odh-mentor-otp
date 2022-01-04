FROM node:14.16.0-alpine3.11

WORKDIR /home

COPY traffic/ ./

RUN npm install

EXPOSE 8094
CMD ["node", "index.js"]

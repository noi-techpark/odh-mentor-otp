FROM node:12.18.2-alpine3.11

WORKDIR /home

COPY drt/ ./

RUN npm install

EXPOSE 8095
CMD ["node", "index.js"]

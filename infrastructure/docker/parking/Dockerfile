FROM node:14.16.0-alpine3.11

WORKDIR /home

COPY parking/ ./

RUN npm install

EXPOSE 8092
CMD ["node", "index.js"]

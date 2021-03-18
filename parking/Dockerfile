FROM node:12.18.2-alpine3.11

WORKDIR /home

COPY ./ ./

RUN npm install

EXPOSE 8090
CMD ["node", "index.js"]

FROM node:12.18.2-alpine3.11

WORKDIR /home

COPY gbfs/ ./

RUN npm install

EXPOSE 8089
CMD ["node", "index.js"]

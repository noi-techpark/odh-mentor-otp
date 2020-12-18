FROM node:12.18.2-alpine3.11

#TODO for debug ENV API_HOST=otp \
# 	API_PORT=8080

WORKDIR /home

COPY ./ ./

RUN npm install

EXPOSE 8088
CMD ["node", "index.js"]

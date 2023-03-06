FROM alpine:latest

WORKDIR /usr/src/node-app

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

CMD npm start

EXPOSE 3000
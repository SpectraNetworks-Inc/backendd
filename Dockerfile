FROM node:21.2-alpine3.18

RUN mkdir -p /usr/src/backendd && chown -R node:node /usr/src/backendd

WORKDIR /usr/src/backendd

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

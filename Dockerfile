FROM docker:latest as docker
FROM node:current-alpine as node
COPY --from=docker . /
FROM alpine:latest as alpine
COPY --from=node . .

RUN apk update && apk upgrade
RUN apk add curl

WORKDIR /hook
COPY ./package*.json .

# Install app dependencies
RUN npm install

COPY . .

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_PRODUCTION=production



EXPOSE ${PORT}
CMD npm start
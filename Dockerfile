FROM docker:latest as docker
FROM node:16-alpine as node

COPY --from=docker . /

RUN apk update && apk upgrade
RUN apk add curl

# Install docker-compose
RUN apk add docker-compose
RUN docker-compose --version

WORKDIR /app
COPY ./package*.json .

# Install app dependencies
RUN npm install

COPY . .

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_PRODUCTION=production



EXPOSE ${PORT}
CMD npm start
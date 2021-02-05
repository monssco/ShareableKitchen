FROM node:14-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY .env /app

RUN node -v
RUN npm install
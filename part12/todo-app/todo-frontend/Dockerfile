FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN CI=true npm test

FROM base AS build

ENV REACT_APP_BACKEND_URL=http://todo-back-prod:3000

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
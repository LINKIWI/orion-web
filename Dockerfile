FROM node:11-alpine as builder
MAINTAINER Kevin Lin <developer@kevinlin.info>

ARG mapbox_api_token
ENV NODE_ENV production

WORKDIR /app
COPY . /app
RUN npm install -g webpack webpack-cli
RUN npm install --dev && npm install
RUN ls node_modules/*
RUN webpack

FROM pierrezemb/gostatic

COPY --from=builder /app/dist /srv/http

EXPOSE 8043
ENTRYPOINT ["/goStatic"]

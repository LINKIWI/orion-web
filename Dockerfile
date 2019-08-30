FROM node:11-alpine as builder
MAINTAINER Kevin Lin <developer@kevinlin.info>

ARG mapbox_api_token
ENV NODE_ENV production

RUN npm install -g webpack webpack-cli dotenv
WORKDIR /app
COPY . /app
RUN npm install
RUN webpack

FROM pierrezemb/gostatic

COPY --from=builder /app/dist /srv/http

EXPOSE 8043
ENTRYPOINT ["/goStatic"]

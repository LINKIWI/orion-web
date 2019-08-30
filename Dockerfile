FROM node:11-alpine as builder
MAINTAINER Kevin Lin <developer@kevinlin.info>

ARG mapbox_api_token
ENV NODE_ENV production

RUN npm install -g webpack@^4.15.1 webpack-cli@^3.0.8
WORKDIR /app
COPY . /app
RUN npm install
RUN webpack

FROM pierrezemb/gostatic

COPY --from=builder /app/dist /srv/http

EXPOSE 8043
ENTRYPOINT ["/goStatic"]

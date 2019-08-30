FROM node:11-alpine as builder
MAINTAINER Kevin Lin <developer@kevinlin.info>

ARG mapbox_api_token
ENV NODE_ENV production

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM pierrezemb/gostatic

COPY --from=builder /app/dist /srv/http

EXPOSE 8043
ENTRYPOINT ["/goStatic"]

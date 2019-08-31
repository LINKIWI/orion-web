FROM node:11-alpine as builder
MAINTAINER Kevin Lin <developer@kevinlin.info>

ARG mapbox_api_token
ENV NODE_ENV production

WORKDIR /app
COPY . /app
RUN npm install -g webpack webpack-cli
RUN npm install --dev && npm install
RUN webpack
FROM nginx:alpine

ENV LISTEN_PORT=80 \
  SERVER_URL=orion-server \
  SERVER_PORT=80

COPY nginx.tmpl /etc/nginx/nginx.tmpl
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD /bin/sh -c "envsubst '\${SERVER_URL} \${SERVER_PORT} \${LISTEN_PORT}' < /etc/nginx/nginx.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;' || cat /etc/nginx/nginx.conf"

FROM node:8.9.3-alpine
MAINTAINER Kevin Lin <developer@kevinlin.info>

ARG mapbox_api_token
ENV NODE_ENV production

RUN npm install -g node-static webpack
WORKDIR /app
COPY . /app
RUN  npm install && npm run build

EXPOSE 80

CMD ["static", "dist", "-a", "0.0.0.0", "-p", "80"]

FROM node:8.9.3-alpine
MAINTAINER Kevin Lin <developer@kevinlin.info>

ARG mapbox_api_token
ENV NODE_ENV production

RUN apk update && apk add curl unzip && npm install -g node-static && npm install

RUN npm run build

EXPOSE 80

CMD ["static", "dist", "-a", "0.0.0.0", "-p", "80"]

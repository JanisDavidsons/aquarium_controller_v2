FROM node:14.18.2-alpine3.14 as build-step

ARG MAX_OLD_SPACE_SIZE=3072
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

RUN mkdir /app
WORKDIR /app
COPY package.json /app
# RUN npm install
COPY . /app
# RUN npm run build

FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
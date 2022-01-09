# FROM node:14.18.2-alpine3.14 as build-step

# RUN mkdir /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build

# FROM nginx

# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-step /app/build /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]


FROM node:10-alpine as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/build /usr/share/nginx/html
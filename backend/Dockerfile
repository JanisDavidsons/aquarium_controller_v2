# for orange pi
FROM arm32v7/ubuntu:latest

#for mac
#FROM ubuntu:22.10

ENV DEBIAN_FRONTEND noninteractive

# Install packages
RUN apt-get update && apt-get install -y sudo apt-utils nano vim php8.1-fpm php8.1-curl \
    php8.1-xml php8.1-phar php8.1-intl php8.1-dom php8.1-xmlreader php8.1-ctype \
    php8.1-mbstring php8.1-gd php8.1-mysql nginx supervisor curl git zip unzip php-zip

RUN mkdir -p /var/tmp/nginx
RUN mkdir -p /var/log/nginx
RUN mkdir -p /etc/supervisor/conf.d/
RUN mkdir -p /backend

RUN curl -sS https://getcomposer.org/installer | php -- \
--install-dir=/usr/bin --filename=composer && chmod +x /usr/bin/composer

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/fpm-pool.conf /etc/php/8.1/fpm/pool.d/www.conf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./run.sh /tmp
RUN chmod +x /tmp/script.sh

# Make sure files/folders needed by the processes
# are accessable when they run under the nobody user
RUN groupadd nobody

RUN chown -R nobody:nobody /run && \
   chown -R nobody:nobody /var/lib/nginx && \
   chown -R nobody:nobody /var/tmp/nginx && \
   chown -R nobody:nobody /var/log/nginx && \
   chown -R nobody:nobody /backend && \
   chown -R nobody:nobody /usr/bin

# Add application
WORKDIR /backend

COPY ./ /backend/

# Switch to use a non-root user from here on
USER nobody

# Expose php
EXPOSE 3001

ENTRYPOINT ["/tmp/run.sh"]

# Configure a healthcheck to validate that everything is up&running
HEALTHCHECK --timeout=10s CMD curl http://127.0.0.1:3001/fpm-ping

FROM arm32v7/ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

# Install packages
RUN apt-get update && apt-get install -y sudo nano vim php7.4-fpm php7.4-mysqli php7.4-json php7.4-curl \
    php7.4-xml php7.4-phar php7.4-intl php7.4-dom php7.4-xmlreader php7.4-ctype \
    php7.4-mbstring php7.4-gd nginx supervisor curl git zip unzip php-zip

RUN mkdir -p /var/tmp/nginx
RUN mkdir -p /var/log/nginx
RUN mkdir -p /etc/supervisor/conf.d/
RUN mkdir -p /backend

RUN curl -sS https://getcomposer.org/installer | php -- \
--install-dir=/usr/bin --filename=composer && chmod +x /usr/bin/composer

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/fpm-pool.conf /etc/php/7.4/fpm/pool.d/www.conf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

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

# RUN composer intall
RUN composer install

# Switch to use a non-root user from here on
USER nobody

# Expose php
EXPOSE 3001

# Let supervisord start nginx & php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Configure a healthcheck to validate that everything is up&running
HEALTHCHECK --timeout=10s CMD curl http://127.0.0.1:3001/fpm-ping

FROM arm32v7/ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

# Install packages
RUN apt-get update && apt-get install -y sudo nano vim php7.4-fpm php7.4-mysqli php7.4-json php7.4-curl \
    php7.4-xml php7.4-phar php7.4-intl php7.4-dom php7.4-xmlreader php7.4-ctype \
    php7.4-mbstring php7.4-gd nginx supervisor curl

RUN mkdir -p /var/tmp/nginx
RUN mkdir -p /var/log/nginx
RUN mkdir -p /etc/supervisor/conf.d/
RUN mkdir -p /app

# RUN chmod -R 777 /run
# RUN chmod -R 777 /var/lib/nginx
# RUN chmod -R 777 /var/tmp/nginx
# RUN chmod -R 777 /var/log/nginx
# RUN chmod -R 777 /app

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/fpm-pool.conf /etc/php/7.4/fpm/pool.d/www.conf
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Make sure files/folders needed by the processes
# are accessable when they run under the nobody user
RUN groupadd nobody

RUN chown -R nobody:nobody /run && \
   chown -R nobody:nobody /var/lib/nginx && \
   chown -R nobody:nobody /var/tmp/nginx && \
   chown -R nobody:nobody /var/log/nginx

# Switch to use a non-root user from here on
USER nobody

# Add application
WORKDIR /app

# COPY ./ /app/
COPY --chown=nobody ./ /app/

# RUN service php7.4-fpm start

# Expose php
EXPOSE 3001

# Let supervisord start nginx & php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Configure a healthcheck to validate that everything is up&running
HEALTHCHECK --timeout=10s CMD curl http://127.0.0.1:3001/fpm-ping

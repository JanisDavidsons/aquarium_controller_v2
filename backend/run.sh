#!/bin/sh

composer install
php artisan migrate --seed
/usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf

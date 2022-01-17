#!/bin/sh

composer install
php artisan migrate:fresh --seed
/usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf

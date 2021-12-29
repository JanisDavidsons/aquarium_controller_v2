#!/bin/sh

cd /var/www/api/
php artisan migrate:fresh --seed

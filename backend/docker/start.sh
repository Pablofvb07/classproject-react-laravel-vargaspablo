#!/bin/bash

# Crear .env desde variables de entorno
cat > /var/www/html/.env << 'ENVFILE'
APP_NAME=AutoStock
APP_ENV=production
APP_DEBUG=false
APP_URL=http://localhost
LOG_CHANNEL=stack
SESSION_DRIVER=cookie
SESSION_DOMAIN=
ENVFILE

echo "APP_KEY=${APP_KEY}" >> /var/www/html/.env
echo "DB_CONNECTION=${DB_CONNECTION:-mysql}" >> /var/www/html/.env
echo "DB_HOST=${DB_HOST}" >> /var/www/html/.env
echo "DB_PORT=${DB_PORT:-3306}" >> /var/www/html/.env
echo "DB_DATABASE=${DB_DATABASE}" >> /var/www/html/.env
echo "DB_USERNAME=${DB_USERNAME}" >> /var/www/html/.env
echo "DB_PASSWORD=${DB_PASSWORD}" >> /var/www/html/.env
echo "SANCTUM_STATEFUL_DOMAINS=${SANCTUM_STATEFUL_DOMAINS:-localhost}" >> /var/www/html/.env

# Verificar que el .env se generó bien
echo "=== .env generado ==="
cat /var/www/html/.env
echo "===================="

# Correr migraciones
php artisan migrate --force

# Limpiar caché
php artisan config:clear
php artisan cache:clear

# Iniciar Apache
apache2-foreground
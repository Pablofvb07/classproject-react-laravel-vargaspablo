#!/bin/bash

# Crear .env desde variables de entorno
cat > /var/www/html/.env << EOF
APP_NAME=${APP_NAME:-AutoStock}
APP_ENV=${APP_ENV:-production}
APP_KEY=${APP_KEY}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-http://localhost}

LOG_CHANNEL=stack

DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}

SANCTUM_STATEFUL_DOMAINS=${SANCTUM_STATEFUL_DOMAINS:-localhost}
SESSION_DRIVER=cookie
SESSION_DOMAIN=
EOF

# Publicar config de Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --force

# Correr migraciones
php artisan migrate --force

# Limpiar y cachear config
php artisan config:clear
php artisan config:cache
php artisan cache:clear

# Iniciar Apache
apache2-foreground
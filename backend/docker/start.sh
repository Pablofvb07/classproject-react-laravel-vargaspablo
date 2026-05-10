#!/bin/bash

# Generar key si no existe
php artisan key:generate --force

# Correr migraciones
php artisan migrate --force

# Limpiar caché
php artisan config:clear
php artisan cache:clear

# Iniciar Apache
apache2-foreground
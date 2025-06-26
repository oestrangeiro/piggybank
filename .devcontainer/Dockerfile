# Base com PHP 8 e suporte a libssl1.1 (Ubuntu 20.04)
FROM php:8.2-apache

# Instala dependências básicas + libssl1.1 + MariaDB client
RUN apt-get update && apt-get install -y \
    libssl1.1 \
    unzip \
    zip \
    git \
    curl \
    mariadb-client \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libmcrypt-dev \
    && docker-php-ext-install pdo pdo_mysql mysqli zip gd

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Ativa reescrita para Apache (necessária para CodeIgniter 4)
RUN a2enmod rewrite

# Define DocumentRoot para CodeIgniter 4 (se estiver na pasta public/)
WORKDIR /var/www/html

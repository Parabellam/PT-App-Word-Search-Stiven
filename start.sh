#!/bin/bash

# Iniciar nginx en segundo plano
echo "Iniciando nginx..."
nginx

# Iniciar el backend de Flask
echo "Iniciando backend Flask..."
cd /app/backend
python app.py 
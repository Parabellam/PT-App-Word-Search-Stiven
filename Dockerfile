# Multi-stage build para Frontend y Backend
FROM node:18-alpine AS frontend-builder

# Configurar directorio de trabajo para frontend
WORKDIR /app/frontend

# Copiar archivos de configuración del frontend
COPY FRONT/package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copiar código fuente del frontend
COPY FRONT/ ./

# Construir la aplicación frontend
RUN npm run build

# Stage para el backend
FROM python:3.11-slim AS backend-builder

# Configurar directorio de trabajo para backend
WORKDIR /app/backend

# Copiar archivos de configuración del backend
COPY BACK/requirements.txt ./

# Instalar dependencias del backend
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código fuente del backend
COPY BACK/ ./

# Stage final
FROM python:3.11-slim

# Instalar nginx para servir el frontend
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Configurar nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Crear directorio para la aplicación
WORKDIR /app

# Copiar backend desde el stage anterior
COPY --from=backend-builder /app/backend /app/backend
COPY --from=backend-builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copiar frontend construido desde el stage anterior
COPY --from=frontend-builder /app/frontend/dist /var/www/html

# Exponer puertos
EXPOSE 80 5000

# Script de inicio
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Comando de inicio
CMD ["/app/start.sh"] 
# Guía de Despliegue con Docker

## Descripción General

Esta guía describe cómo desplegar la aplicación **Buscador de Sopa de Letras** utilizando Docker. La aplicación está compuesta por un frontend en React/TypeScript y un backend en Python/Flask, ambos contenidos en una sola imagen Docker.

## Arquitectura de la Aplicación

La aplicación utiliza una arquitectura de contenedor único que incluye:

- **Frontend**: React 19 con TypeScript, Vite, Tailwind CSS y HeroUI
- **Backend**: Python Flask con CORS habilitado
- **Servidor Web**: Nginx para servir archivos estáticos y proxy al backend
- **Contenedor**: Imagen Docker multi-stage optimizada

## Prerrequisitos

### Software Requerido

1. **Docker** (versión 20.10 o superior)
   - [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
   - [Instrucciones de instalación](https://docs.docker.com/get-docker/)

2. **Docker Compose** (incluido con Docker Desktop)
   - Versión 2.0 o superior

### Recursos del Sistema

- **RAM**: Mínimo 2GB, recomendado 4GB
- **CPU**: 2 cores mínimo
- **Espacio en disco**: 1GB libre para la imagen Docker

## Pasos de Despliegue

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Verificar la Estructura del Proyecto

Asegúrate de que el proyecto contenga los siguientes archivos:

```
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── start.sh
├── .dockerignore
├── BACK/
│   ├── app.py
│   ├── requirements.txt
│   ├── controllers/
│   └── services/
└── FRONT/
    ├── package.json
    ├── src/
    └── ...
```

### 3. Construir la Imagen Docker

#### Opción A: Usando Docker Compose (Recomendado)

```bash
# Construir y ejecutar en un solo comando
docker-compose up --build

# O construir primero y luego ejecutar
docker-compose build
docker-compose up
```

#### Opción B: Usando Docker directamente

```bash
# Construir la imagen
docker build -t buscador-sopa-letras .

# Ejecutar el contenedor
docker run -d -p 80:80 -p 5000:5000 --name buscador-sopa-letras buscador-sopa-letras
```

### 4. Verificar el Despliegue

1. **Acceder a la aplicación**:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

2. **Verificar logs**:
   ```bash
   # Con Docker Compose
   docker-compose logs -f

   # Con Docker directo
   docker logs buscador-sopa-letras
   ```

3. **Verificar servicios**:
   ```bash
   # Verificar contenedores en ejecución
   docker ps

   # Verificar puertos
   netstat -tulpn | grep :80
   netstat -tulpn | grep :5000
   ```

## Configuración Avanzada

### Variables de Entorno

Puedes configurar variables de entorno en el `docker-compose.yml`:

```yaml
environment:
  - FLASK_ENV=production
  - FLASK_DEBUG=False
```

### Puertos Personalizados

Para cambiar los puertos, modifica el `docker-compose.yml`:

```yaml
ports:
  - "8080:80"    # Puerto personalizado para el frontend
  - "5001:5000"  # Puerto personalizado para el backend
```

### Volúmenes para Logs

Los logs de Nginx se montan automáticamente:

```yaml
volumes:
  - ./logs:/var/log/nginx
```

## Comandos Útiles

### Gestión del Contenedor

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Reiniciar servicios
docker-compose restart

# Ver logs en tiempo real
docker-compose logs -f

# Ejecutar comandos dentro del contenedor
docker-compose exec buscador-sopa-letras bash
```

### Mantenimiento

```bash
# Limpiar imágenes no utilizadas
docker image prune

# Limpiar contenedores detenidos
docker container prune

# Limpiar todo (cuidado: elimina datos)
docker system prune -a
```

## Solución de Problemas

### Problemas Comunes

#### 1. Puerto 80 ya en uso

```bash
# Verificar qué está usando el puerto 80
sudo netstat -tulpn | grep :80

# Cambiar puerto en docker-compose.yml
ports:
  - "8080:80"
```

#### 2. Error de permisos en Docker

```bash
# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión o ejecutar
newgrp docker
```

#### 3. Error de memoria insuficiente

```bash
# Aumentar memoria en Docker Desktop
# Settings > Resources > Memory > 4GB
```

#### 4. Error de build del frontend

```bash
# Limpiar cache de npm
docker-compose down
rm -rf FRONT/node_modules
docker-compose up --build
```

### Verificación de Salud

```bash
# Verificar estado del contenedor
docker-compose ps

# Verificar logs de nginx
docker-compose exec buscador-sopa-letras tail -f /var/log/nginx/error.log

# Verificar logs de Flask
docker-compose logs buscador-sopa-letras
```

## Monitoreo y Logs

### Logs de Nginx

```bash
# Acceder a logs de nginx
docker-compose exec buscador-sopa-letras tail -f /var/log/nginx/access.log
docker-compose exec buscador-sopa-letras tail -f /var/log/nginx/error.log
```

### Logs de la Aplicación

```bash
# Ver logs de la aplicación
docker-compose logs -f buscador-sopa-letras
```

## Seguridad

### Configuraciones de Seguridad Incluidas

- Headers de seguridad en Nginx
- CORS configurado en Flask
- Contenedor no-root (cuando sea posible)
- Imagen base oficial de Python

### Recomendaciones Adicionales

1. **Usar secrets para datos sensibles**
2. **Configurar firewall**
3. **Monitorear logs regularmente**
4. **Actualizar imágenes base periódicamente**

## Backup y Recuperación

### Backup de Configuración

```bash
# Backup de archivos de configuración
tar -czf config-backup.tar.gz docker-compose.yml nginx.conf start.sh
```

### Backup de Logs

```bash
# Los logs se guardan automáticamente en ./logs/
# Backup manual
tar -czf logs-backup.tar.gz logs/
```

## Actualización de la Aplicación

### Proceso de Actualización

```bash
# 1. Detener servicios
docker-compose down

# 2. Obtener cambios del repositorio
git pull

# 3. Reconstruir imagen
docker-compose build --no-cache

# 4. Reiniciar servicios
docker-compose up -d
```

### Rollback

```bash
# Si hay problemas, volver a versión anterior
git checkout <TAG_ANTERIOR>
docker-compose down
docker-compose up --build -d
```

## Soporte y Contacto

Para soporte técnico o reportar problemas:

1. Revisar logs de la aplicación
2. Verificar configuración de Docker
3. Consultar esta documentación
4. Contactar al equipo de desarrollo

---

**Nota**: Esta guía asume que tienes permisos de administrador en el sistema donde se ejecuta Docker. En entornos de producción, asegúrate de seguir las políticas de seguridad de tu organización.

# 🔍 Buscador de Sopa de Letras

Una aplicación web moderna para encontrar palabras en matrices de caracteres (sopas de letras) con búsqueda en 8 direcciones.

## 🚀 Características

- **Búsqueda en 8 direcciones**: Horizontal, vertical y diagonal (en ambas direcciones)
- **Interfaz moderna**: React 19 + TypeScript + HeroUI + Tailwind CSS
- **Backend robusto**: Python Flask con algoritmos optimizados
- **Diseño responsive**: Funciona en desktop, tablet y móvil
- **Tema oscuro/claro**: Adaptable a tus preferencias
- **Docker ready**: Despliegue simplificado con contenedores
- **Validación completa**: Frontend y backend con validaciones robustas

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Nginx         │    │   Backend       │
│   React 19      │◄──►│   Proxy         │◄──►│   Flask         │
│   TypeScript    │    │   Static Files  │    │   Python        │
│   HeroUI        │    │   Security      │    │   Algorithms    │
│   Tailwind CSS  │    │   Compression   │    │   CORS          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerrequisitos

- **Docker** (versión 20.10 o superior)
- **Docker Compose** (incluido con Docker Desktop)
- **2GB RAM** mínimo (4GB recomendado)
- **1GB espacio** libre en disco

## 🚀 Despliegue Rápido

### Opción 1: Docker Compose (Recomendado)

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>

# Construir y ejecutar
docker-compose up --build

# Acceder a la aplicación
# Frontend: http://localhost
# Backend API: http://localhost:5000
```

### Opción 2: Docker Directo

```bash
# Construir imagen
docker build -t buscador-sopa-letras .

# Ejecutar contenedor
docker run -d -p 80:80 -p 5000:5000 --name buscador-sopa-letras buscador-sopa-letras
```

## 📖 Documentación

### Guías de Usuario
- **[Guía de Usuario](Documentación/guia-usuario.md)** - Manual completo para usuarios finales
- **[Guía de Despliegue](Documentación/guia-despliegue.md)** - Instrucciones detalladas de despliegue

### Documentación Técnica
- **[Tecnologías Empleadas](Documentación/tecnologias-empleadas.md)** - Stack tecnológico completo
- **[Recursos Especiales](Documentación/recursos-especiales.md)** - Librerías y herramientas utilizadas

## 🎯 Funcionalidades

### Búsqueda de Palabras
- **8 direcciones**: Horizontal, vertical y diagonal
- **Algoritmo optimizado**: Búsqueda eficiente en matrices grandes
- **Case-sensitive**: Búsqueda precisa con mayúsculas/minúsculas
- **Validación de límites**: Respeta los límites de la matriz

### Interfaz de Usuario
- **Diseño moderno**: HeroUI + Tailwind CSS
- **Responsive**: Adaptable a cualquier dispositivo
- **Tema dual**: Claro y oscuro
- **Notificaciones**: Sistema de feedback visual
- **Validación en tiempo real**: Feedback inmediato al usuario

### Backend API
- **RESTful**: Endpoints bien definidos
- **CORS habilitado**: Compatible con frontend
- **Validación robusta**: Verificación de datos de entrada
- **Manejo de errores**: Respuestas informativas
- **Ejemplos incluidos**: Datos de prueba predefinidos

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 19** - Framework de UI
- **TypeScript 5.8** - Tipado estático
- **Vite 6.3** - Build tool
- **HeroUI 2.4** - Componentes UI
- **Tailwind CSS 3.4** - Framework CSS
- **Framer Motion 12.18** - Animaciones
- **Zod 3.25** - Validación de esquemas
- **Notistack 3.0** - Notificaciones

### Backend
- **Python 3.11** - Lenguaje de programación
- **Flask 2.3** - Microframework web
- **Flask-CORS 4.0** - Soporte CORS

### Infraestructura
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación
- **Nginx** - Servidor web y proxy
- **Multi-stage builds** - Optimización de imágenes

## 📁 Estructura del Proyecto

```
├── BACK/                          # Backend Python/Flask
│   ├── app.py                     # Aplicación principal
│   ├── requirements.txt           # Dependencias Python
│   ├── controllers/               # Controladores de rutas
│   │   └── word_search_controller.py
│   └── services/                  # Lógica de negocio
│       └── word_search_service.py
├── FRONT/                         # Frontend React/TypeScript
│   ├── package.json              # Dependencias Node.js
│   ├── src/                      # Código fuente
│   │   ├── components/           # Componentes React
│   │   ├── pages/                # Páginas de la aplicación
│   │   ├── adapters/             # Adaptadores de API
│   │   ├── hooks/                # Custom hooks
│   │   ├── types/                # Tipos TypeScript
│   │   └── utils/                # Utilidades
│   └── public/                   # Archivos públicos
├── Documentación/                 # Documentación del proyecto
│   ├── guia-usuario.md           # Guía para usuarios
│   ├── guia-despliegue.md        # Guía de despliegue
│   ├── tecnologias-empleadas.md  # Stack tecnológico
│   └── recursos-especiales.md    # Recursos utilizados
├── Dockerfile                     # Configuración Docker
├── docker-compose.yml            # Orquestación Docker
├── nginx.conf                    # Configuración Nginx
├── start.sh                      # Script de inicio
├── .dockerignore                 # Archivos ignorados por Docker
└── README.md                     # Este archivo
```

## 🎮 Uso de la Aplicación

### 1. Acceso
- Abre tu navegador y ve a `http://localhost`

### 2. Cargar Ejemplo (Opcional)
- Haz clic en **"📋 Cargar Ejemplo"** para probar la aplicación

### 3. Ingresar Datos
- **Palabras**: Una palabra por línea
- **Matriz**: Caracteres separados por comas

### 4. Buscar
- Haz clic en **"🔍 Buscar Palabras"**
- Revisa los resultados

### 5. Limpiar
- Haz clic en **"🗑️ Limpiar"** para reiniciar

## 🔍 Ejemplo de Uso

### Entrada
**Palabras:**
```
MANATI
LEON
PERRO
```

**Matriz:**
```
N,D,E,K,I,C,A,N,G,U,R,O,G,E,S,X,R,Y,K,V,I,I,Q,G,W,Q,O,D
```

### Salida
- MANATI: ✅ Encontrada
- LEON: ✅ Encontrada  
- PERRO: ✅ Encontrada

## 🛠️ Desarrollo

### Requisitos de Desarrollo
- Node.js 18+
- Python 3.11+
- Docker (opcional)

### Configuración Local

#### Frontend
```bash
cd FRONT
npm install
npm run dev
```

#### Backend
```bash
cd BACK
pip install -r requirements.txt
python app.py
```

### Scripts Disponibles

#### Frontend
```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Build de producción
npm run lint     # Linting del código
npm run preview  # Preview del build
```

#### Docker
```bash
docker-compose up --build    # Construir y ejecutar
docker-compose down          # Detener servicios
docker-compose logs -f       # Ver logs en tiempo real
```

## 🧪 Testing

### Frontend
```bash
cd FRONT
npm run lint     # Verificar código
```

### Backend
```bash
cd BACK
python -m pytest  # Ejecutar tests (si están configurados)
```

## 🔒 Seguridad

### Headers de Seguridad (Nginx)
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

### Validación de Datos
- Frontend: Zod para validación
- Backend: Validación Python
- Sanitización de entrada

### CORS Configuration
- Configuración específica de orígenes
- Métodos HTTP permitidos
- Headers personalizados

## 📊 Monitoreo

### Logs
- **Nginx**: `/var/log/nginx/`
- **Flask**: Logs de aplicación
- **Docker**: `docker-compose logs -f`

### Health Checks
```bash
# Verificar estado del contenedor
docker-compose ps

# Verificar logs
docker-compose logs buscador-sopa-letras
```

## 🚀 Despliegue en Producción

### Variables de Entorno
```yaml
environment:
  - FLASK_ENV=production
  - FLASK_DEBUG=False
```

### Puertos Personalizados
```yaml
ports:
  - "8080:80"    # Puerto personalizado para frontend
  - "5001:5000"  # Puerto personalizado para backend
```

### Volúmenes para Logs
```yaml
volumes:
  - ./logs:/var/log/nginx
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o reportar problemas:

- **Email**: [tu-email@ejemplo.com]
- **Issues**: [GitHub Issues](URL_DEL_REPOSITORIO/issues)
- **Documentación**: [Documentación del proyecto](Documentación/)

## 🙏 Agradecimientos

- **React Team** - Framework de UI
- **Vite Team** - Build tool
- **HeroUI Team** - Componentes UI
- **Tailwind CSS Team** - Framework CSS
- **Flask Team** - Microframework web

---

**¡Disfruta buscando palabras en sopas de letras! 🔍✨**

*© 2024 Buscador de Sopa de Letras. Todos los derechos reservados.* 
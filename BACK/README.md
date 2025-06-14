# Backend - Sopa de Letras API

## Estructura del Proyecto

```
BACK/
├── app.py                 # Archivo principal de la aplicación Flask
├── requirements.txt       # Dependencias del proyecto
├── controllers/          # Controladores (lógica de presentación)
│   └── sopa_controller.py
└── services/             # Servicios (lógica de negocio)
    └── sopa_service.py
```

## Descripción de la Arquitectura

### Controllers (`controllers/`)
- **sopa_controller.py**: Maneja las rutas HTTP y la lógica de presentación
  - `buscar_palabras()`: Endpoint POST `/api/buscar`
  - `obtener_ejemplo()`: Endpoint GET `/api/ejemplo`

### Services (`services/`)
- **sopa_service.py**: Contiene la lógica de negocio
  - `SopaDeLetras`: Clase principal para buscar palabras
  - `parsear_matriz()`: Función para convertir string a matriz
  - `obtener_matriz_ejemplo()`: Retorna la matriz de ejemplo
  - `obtener_palabras_ejemplo()`: Retorna las palabras de ejemplo

## Instalación y Ejecución

1. Instalar dependencias:
```bash
pip install -r requirements.txt
```

2. Ejecutar la aplicación:
```bash
python app.py
```

La aplicación estará disponible en `http://localhost:5000`

## Endpoints

- **POST** `/api/buscar`: Busca palabras en una sopa de letras
- **GET** `/api/ejemplo`: Obtiene el ejemplo predefinido de sopa de letras 
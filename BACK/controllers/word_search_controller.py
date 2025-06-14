from flask import request, jsonify, Blueprint
from services.word_search_service import SopaDeLetras, parsear_matriz, obtener_matriz_ejemplo, obtener_palabras_ejemplo

# Crear Blueprint para las rutas de sopa de letras
sopa_bp = Blueprint('sopa', __name__, url_prefix='/api')

@sopa_bp.route('/buscar', methods=['POST'])
def buscar_palabras():
    """API endpoint para buscar palabras en la sopa de letras"""
    try:
        data = request.get_json()
        
        if not data or 'palabras' not in data or 'matriz' not in data:
            return jsonify({
                'message': 'Se requieren las palabras y la matriz',
                'data': None
            }), 400
        
        palabras = data['palabras']
        matriz_str = data['matriz']
        
        # Parsear la matriz
        matriz = parsear_matriz(matriz_str)
        sopa = SopaDeLetras(matriz)
        
        # Buscar cada palabra
        resultados = []
        for palabra in palabras:
            palabra_limpia = palabra.strip()
            if palabra_limpia:
                encontrada = sopa.buscar_palabra(palabra_limpia)
                resultados.append({
                    'palabra': palabra_limpia,
                    'encontrada': encontrada
                })
        
        return jsonify({
            'message': 'Búsqueda completada exitosamente',
            'data': {
                'resultados': resultados,
                'matriz_parseada': matriz
            }
        })
        
    except Exception as e:
        return jsonify({
            'message': f'Error en el procesamiento: {str(e)}',
            'data': None
        }), 500

@sopa_bp.route('/ejemplo', methods=['GET'])
def obtener_ejemplo():
    """Endpoint para obtener el ejemplo de la prueba"""
    try:
        matriz_ejemplo = obtener_matriz_ejemplo()
        palabras_ejemplo = obtener_palabras_ejemplo()
        
        # Convertir matriz a string
        matriz_str = ','.join([','.join(fila) for fila in matriz_ejemplo])
        
        return jsonify({
            'message': 'Ejemplo cargado exitosamente',
            'data': {
                'matriz': matriz_str,
                'palabras': palabras_ejemplo
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error al cargar el ejemplo: {str(e)}',
            'data': None
        }), 500 
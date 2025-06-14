class SopaDeLetras:
    def __init__(self, matriz):
        self.matriz = matriz
        self.filas = len(matriz)
        self.columnas = len(matriz[0]) if matriz else 0
    
    # Direcciones: horizontal, vertical, diagonal
    direcciones = [
            (0, 1),   # derecha
            (0, -1),  # izquierda
            (1, 0),   # abajo
            (-1, 0),  # arriba
            (1, 1),   # diagonal derecha-abajo
            (1, -1),  # diagonal izquierda-abajo
            (-1, 1),  # diagonal derecha-arriba
            (-1, -1)  # diagonal izquierda-arriba
        ]
    
    def buscar_palabra(self, palabra):
        """Busca una palabra en todas las direcciones posibles"""
        palabra = palabra.upper().strip()
        if not palabra:
            return False
        
        for fila in range(self.filas):
            for col in range(self.columnas):
                for df, dc in self.direcciones:
                    if self._verificar_direccion(palabra, fila, col, df, dc):
                        return True
        return False
    
    def _verificar_direccion(self, palabra, fila_inicio, col_inicio, df, dc):
        """Verifica si una palabra existe en una dirección específica"""
        if fila_inicio + (len(palabra) - 1) * df < 0 or \
           fila_inicio + (len(palabra) - 1) * df >= self.filas or \
           col_inicio + (len(palabra) - 1) * dc < 0 or \
           col_inicio + (len(palabra) - 1) * dc >= self.columnas:
            return False
        
        for i, letra in enumerate(palabra):
            fila = fila_inicio + i * df
            col = col_inicio + i * dc
            if self.matriz[fila][col] != letra:
                return False
        return True


def parsear_matriz(matriz_str):
    """Convierte la cadena de matriz en una lista de listas"""
    # Limpiar y dividir por comas
    matriz_str = matriz_str.strip()
    elementos = [elem.strip() for elem in matriz_str.split(',')]
    
    # Determinar el tamaño de la matriz (asumiendo que es cuadrada)
    n = int(len(elementos) ** 0.5)
    
    # Crear la matriz
    matriz = []
    for i in range(n):
        fila = []
        for j in range(n):
            idx = i * n + j
            if idx < len(elementos):
                fila.append(elementos[idx].upper())
        matriz.append(fila)
    
    return matriz


def obtener_matriz_ejemplo():
    """Retorna la matriz de ejemplo para la prueba"""
    return [
        ['N', 'D', 'E', 'K', 'I', 'C', 'A', 'N', 'G', 'U', 'R', 'O', 'G', 'E'],
        ['S', 'X', 'R', 'Y', 'K', 'V', 'I', 'I', 'Q', 'G', 'W', 'Q', 'O', 'D'],
        ['J', 'A', 'G', 'U', 'A', 'R', 'Z', 'W', 'B', 'N', 'K', 'O', 'U', 'A'],
        ['M', 'L', 'E', 'L', 'E', 'F', 'A', 'N', 'T', 'E', 'H', 'O', 'G', 'W'],
        ['L', 'O', 'B', 'O', 'N', 'U', 'T', 'R', 'I', 'A', 'O', 'U', 'S', 'U'],
        ['W', 'W', 'O', 'S', 'O', 'G', 'A', 'T', 'O', 'V', 'R', 'T', 'M', 'U'],
        ['H', 'L', 'Z', 'N', 'C', 'T', 'Y', 'Z', 'E', 'O', 'X', 'A', 'U', 'R'],
        ['C', 'E', 'C', 'Y', 'T', 'I', 'B', 'U', 'R', 'O', 'N', 'S', 'R', 'O'],
        ['C', 'O', 'N', 'E', 'J', 'O', 'Y', 'U', 'S', 'M', 'R', 'S', 'H', 'T'],
        ['Y', 'N', 'I', 'F', 'E', 'F', 'P', 'T', 'E', 'Z', 'O', 'O', 'S', 'F'],
        ['O', 'S', 'S', 'E', 'R', 'P', 'I', 'E', 'N', 'T', 'E', 'F', 'L', 'G'],
        ['P', 'P', 'V', 'D', 'D', 'X', 'U', 'F', 'A', 'L', 'C', 'O', 'N', 'Y'],
        ['M', 'O', 'N', 'O', 'C', 'U', 'Q', 'W', 'M', 'A', 'N', 'A', 'T', 'I'],
        ['N', 'N', 'X', 'H', 'E', 'B', 'P', 'M', 'U', 'P', 'E', 'R', 'R', 'O']
    ]


def obtener_palabras_ejemplo():
    """Retorna las palabras de ejemplo para la prueba"""
    return [
        'MANATI', 'LEON', 'PERRO', 'LORO', 'GATO', 'TORO', 'CONEJO', 
        'ORUGA', 'TIBURON', 'ELEFANTE', 'ALCON', 'SERPIENTE', 'JAGUAR', 
        'CANGURO', 'LOBO', 'MONO', 'NUTRIA'
    ] 
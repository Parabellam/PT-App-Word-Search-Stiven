interface Resultado {
  palabra: string;
  encontrada: boolean;
}

interface ApiResponse {
  resultados: Resultado[];
  matriz_parseada: string[][];
  error?: string;
}

export type { ApiResponse, Resultado };

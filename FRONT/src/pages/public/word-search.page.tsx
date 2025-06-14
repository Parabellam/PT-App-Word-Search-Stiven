import { useEffect } from "react";
import WordSearchViewModel from "./word-search.viewmodel";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";

const WordSearch = () => {
  const {
    palabras,
    setPalabras,
    matriz,
    setMatriz,
    resultados,
    matrizProcesada,
    loading,
    showResults,
    buscarPalabras,
    limpiarFormulario,
    loadInitialData,
    handlePalabrasKeyDown,
    handleMatrizKeyDown,
  } = WordSearchViewModel();

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600 p-5">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            🔍 Buscador de Sopa de Letras
          </h1>
          <p className="text-lg opacity-90">
            Encuentra palabras en cualquier dirección: horizontal, vertical y
            diagonal
          </p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {/* Form Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 pb-3 border-b-4 border-blue-400">
              📝 Entrada de Datos
            </h2>

            {/* Palabras Input */}
            <div className="mb-6">
              <Textarea
                isClearable
                isDisabled={loading}
                isRequired
                value={palabras}
                onChange={(e) => setPalabras(e.target.value)}
                onClear={() => setPalabras("")}
                onKeyDown={handlePalabrasKeyDown}
                minRows={8}
                classNames={{
                  input: "font-mono",
                  label: "font-semibold",
                }}
                placeholder="Ingresa las palabras que quieres buscar, una por línea...&#10;Ejemplo:&#10;MANATI&#10;LEON&#10;PERRO"
                label="Palabras a buscar (una por línea):"
                labelPlacement="outside"
              />
            </div>

            {/* Matriz Input */}
            <div className="mb-6">
              <Textarea
                isClearable
                isDisabled={loading}
                isRequired
                value={matriz}
                onChange={(e) => setMatriz(e.target.value)}
                onClear={() => setMatriz("")}
                onKeyDown={handleMatrizKeyDown}
                minRows={10}
                classNames={{
                  input: "font-mono",
                  label: "font-semibold",
                }}
                placeholder="Ingresa la matriz de caracteres separada por comas...&#10;Ejemplo: N,D,E,K,I,C,A,N,G,U,R,O,G,E,S,X,R,Y,K,V,I,I,Q,G,W,Q,O,D"
                label="Matriz de caracteres (separada por comas):"
                labelPlacement="outside"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onPress={buscarPalabras}
                className="hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                color="primary"
                isLoading={loading}
                isDisabled={loading}
              >
                🔍 Buscar Palabras
              </Button>
              <Button
                onPress={loadInitialData}
                color="secondary"
                className="hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                isLoading={loading}
                isDisabled={loading}
              >
                📋 Cargar Ejemplo
              </Button>
              <Button
                onPress={limpiarFormulario}
                className="hover:scale-105 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                isLoading={loading}
                isDisabled={loading}
              >
                🗑️ Limpiar
              </Button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <p className="text-lg">🔍 Buscando palabras...</p>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                📊 Resultados
              </h2>

              {/* Results List */}
              <div className="space-y-2 mb-8">
                {resultados.map((resultado, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg border-l-4 dark:bg-gray-700 ${
                      resultado.encontrada
                        ? "bg-green-50 border-green-500"
                        : "bg-red-50 border-red-500"
                    }`}
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {resultado.palabra}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        resultado.encontrada
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {resultado.encontrada
                        ? "✅ Encontrada"
                        : "❌ No encontrada"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Matrix Display */}
              {matrizProcesada.length > 0 && (
                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-x-auto">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    📋 Matriz Procesada
                  </h3>
                  <div className="inline-block">
                    {matrizProcesada.map((fila, filaIndex) => (
                      <div key={filaIndex} className="flex">
                        {fila.map((celda, celdaIndex) => (
                          <div
                            key={celdaIndex}
                            className="w-6 h-6 border border-gray-300 bg-white dark:bg-gray-700 flex items-center justify-center text-sm font-bold"
                          >
                            {celda}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;

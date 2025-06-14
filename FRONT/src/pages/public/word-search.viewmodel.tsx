import { useState } from "react";
import type { Resultado } from "../../types/api-response";
import {
  AdapterCargarEjemplo,
  AdapterBuscarPalabras,
} from "../../adapters/word-search/word-search.adapter";
import useNotify from "../../hooks/useNotify";
import {
  validateForm,
  formatValidationErrors,
} from "./word-search.validations";

const WordSearchViewModel = () => {
  const { notify } = useNotify();
  const [palabras, setPalabras] = useState<string>("");
  const [matriz, setMatriz] = useState<string>("");
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [matrizProcesada, setMatrizProcesada] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  const cargarEjemplo = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await AdapterCargarEjemplo();

      if (response.state && response.data) {
        setPalabras(response.data.palabras.join("\n"));
        setMatriz(response.data.matriz);
        notify(response.msg);
      } else {
        notify(response.msg || "Error al cargar el ejemplo", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const buscarPalabras = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (!palabras.trim() || !matriz.trim()) {
        notify(
          "Por favor, ingresa tanto las palabras como la matriz.",
          "warning"
        );
        return;
      }

      // Validaciones antes de llamar al Adapter
      const validation = validateForm(palabras, matriz);

      if (!validation.isValid) {
        const errorMessage = formatValidationErrors(validation.errors);
        notify(errorMessage, "error");
        return;
      }

      setShowResults(false);

      const palabrasArray = palabras.split("\n").filter((p) => p.trim());

      const response = await AdapterBuscarPalabras(palabrasArray, matriz);

      if (response.state && response.data) {
        setResultados(response.data.resultados);
        setMatrizProcesada(response.data.matriz_parseada);
        setShowResults(true);
        notify(response.msg);
      } else {
        notify(response.msg || "Error en el servidor", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setPalabras("");
    setMatriz("");
    setShowResults(false);
    setResultados([]);
    setMatrizProcesada([]);
  };

  const loadInitialData = async () => {
    await cargarEjemplo();
  };

  const handlePalabrasKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        palabras.substring(0, start) + "\n" + palabras.substring(end);
      setPalabras(newValue);
      // Restaurar el cursor después del salto de línea
      setTimeout(() => {
        textarea.setSelectionRange(start + 1, start + 1);
      }, 0);
    }
  };

  const handleMatrizKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = matriz.substring(0, start) + "," + matriz.substring(end);
      setMatriz(newValue);
      // Restaurar el cursor después de la coma
      setTimeout(() => {
        textarea.setSelectionRange(start + 1, start + 1);
      }, 0);
    }
  };

  return {
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
  };
};

export default WordSearchViewModel;

import RequestHttp from "../httpRequest";

// Adaptador para cargar ejemplo
const AdapterCargarEjemplo = async () => {
  const response = await RequestHttp(null, {
    entry: "api/ejemplo",
    method: "GET",
  });

  if (response.state) {
    return {
      rspHttp: response.responseHttp,
      msg: response.message,
      state: response.state,
      data: {
        palabras: response.data.palabras || [],
        matriz: response.data.matriz || "",
      },
    };
  }

  return {
    rspHttp: response.responseHttp,
    msg: response.message,
    state: response.state,
    error: response.error,
  };
};

// Adaptador para buscar palabras
const AdapterBuscarPalabras = async (palabras: string[], matriz: string) => {
  const response = await RequestHttp(
    { palabras, matriz },
    {
      entry: "api/buscar",
      method: "POST",
    }
  );

  if (response.state) {
    return {
      rspHttp: response.responseHttp,
      msg: response.message,
      state: response.state,
      data: {
        resultados: response.data.resultados || [],
        matriz_parseada: response.data.matriz_parseada || [],
      },
    };
  }

  return {
    rspHttp: response.responseHttp,
    msg: response.message,
    state: response.state,
    error: response.error,
  };
};

export { AdapterCargarEjemplo, AdapterBuscarPalabras };

interface RequestOptions {
  base?: string;
  entry: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  id?: string;
}

const RequestHttp = async (data: unknown, config: RequestOptions) => {
  const { base = "http://localhost:5000", entry, method, id = "" } = config;

  const url = `${base}/${entry}${id}`;

  const requestConfig: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data && method !== "GET") {
    requestConfig.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, requestConfig);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();

    return {
      responseHttp: response.status,
      message: "Success",
      state: true,
      ...result,
    };
  } catch (error) {
    return {
      responseHttp: 500,
      message: (error as Error).message,
      state: false,
      error: (error as Error).message,
    };
  }
};

export default RequestHttp;

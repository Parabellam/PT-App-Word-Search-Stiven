import { z } from "zod";

// Schema validar palabras
const palabrasSchema = z
  .string()
  .min(1, "Las palabras no pueden estar vacías")
  .refine((palabras) => {
    const palabrasArray = palabras.split("\n").filter((p) => p.trim());
    return palabrasArray.length > 0;
  }, "Debe ingresar al menos una palabra")
  .refine(
    (palabras) => {
      const palabrasArray = palabras.split("\n").filter((p) => p.trim());
      return palabrasArray.every((palabra) =>
        /^[A-ZÁÉÍÓÚÑ\s]+$/i.test(palabra.trim())
      );
    },
    (palabras) => {
      const palabrasArray = palabras.split("\n").filter((p) => p.trim());
      const invalidWord = palabrasArray.find(
        (palabra) => !/^[A-ZÁÉÍÓÚÑ\s]+$/i.test(palabra.trim())
      );
      return {
        message: `La palabra "${invalidWord}" contiene caracteres no válidos. Solo se permiten letras.`,
      };
    }
  );

// Schema validar matriz
const matrizSchema = z
  .string()
  .min(1, "La matriz no puede estar vacía")
  .refine((matriz) => {
    const matrizLimpia = matriz.replace(/\s+/g, "").replace(/\n/g, "");
    return /^[A-ZÁÉÍÓÚÑ,]+$/i.test(matrizLimpia);
  }, "La matriz solo puede contener letras separadas por comas")
  .refine((matriz) => {
    const matrizLimpia = matriz.replace(/\s+/g, "").replace(/\n/g, "");
    return !matrizLimpia.endsWith(",");
  }, "La matriz no puede terminar en coma")
  .refine((matriz) => {
    const matrizLimpia = matriz.replace(/\s+/g, "").replace(/\n/g, "");
    return !matrizLimpia.startsWith(",");
  }, "La matriz no puede comenzar con coma")
  .refine((matriz) => {
    const matrizLimpia = matriz.replace(/\s+/g, "").replace(/\n/g, "");
    return !matrizLimpia.includes(",,");
  }, "La matriz no puede tener comas consecutivas")
  .refine((matriz) => {
    const matrizLimpia = matriz.replace(/\s+/g, "").replace(/\n/g, "");
    const elementos = matrizLimpia.split(",");
    return elementos.every((elemento) => elemento.length === 1);
  }, "Cada elemento de la matriz debe ser exactamente una letra")
  .refine((matriz) => {
    const matrizLimpia = matriz.replace(/\s+/g, "").replace(/\n/g, "");
    const elementos = matrizLimpia.split(",").filter(el => el.length > 0);
    return elementos.every((elemento) => /^[A-ZÁÉÍÓÚÑ]$/i.test(elemento));
  }, "Cada elemento debe ser una letra válida");

// Schema principal
export const formSchema = z.object({
  palabras: palabrasSchema,
  matriz: matrizSchema,
});

// Tipos derivados
export type FormData = z.infer<typeof formSchema>;

// Función principal de validación
export const validateForm = (palabras: string, matriz: string) => {
  try {
    const result = formSchema.parse({ palabras, matriz });
    return {
      isValid: true,
      data: result,
      errors: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        data: null,
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }
    return {
      isValid: false,
      data: null,
      errors: [
        { field: "unknown", message: "Error de validación desconocido" },
      ],
    };
  }
};

// Función auxiliar para formatear errores
export const formatValidationErrors = (
  errors: Array<{ field: string; message: string }>
): string => {
  if (errors.length === 0) return "";
  return errors.map((error) => error.message).join("\n");
};

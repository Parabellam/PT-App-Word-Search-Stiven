import { useSnackbar } from "notistack";

const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (
    text: string,
    typeLabel: "success" | "error" | "warning" = "success",
    vertical: "bottom" | "top" = "bottom",
    horizontal: "center" | "left" | "right" = "center",
    autoHideDuration = 5000
  ) => {
    try {
      enqueueSnackbar(text, {
        preventDuplicate: true,
        autoHideDuration: autoHideDuration,
        variant: typeLabel,
        anchorOrigin: {
          vertical: vertical,
          horizontal: horizontal,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { notify };
};

export default useNotify;

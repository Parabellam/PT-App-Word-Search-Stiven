import { useMemo } from "react";
import useTheme from "../../hooks/useTheme";

type ThemeOption = {
  value: "light" | "dark" | "system";
  label: string;
  icon: string;
};

const ThemeToggleViewModel = () => {
  const { theme, changeTheme } = useTheme();

  const themeOptions: ThemeOption[] = useMemo(
    () => [
      {
        value: "light",
        label: "Claro",
        icon: "☀️",
      },
      {
        value: "dark",
        label: "Oscuro",
        icon: "🌙",
      },
      {
        value: "system",
        label: "Sistema",
        icon: "💻",
      },
    ],
    []
  );

  const mainButtonIcon = useMemo(() => {
    const currentOption = themeOptions.find((option) => option.value === theme);
    return currentOption?.icon || "💻";
  }, [theme, themeOptions]);
  return { mainButtonIcon, themeOptions, changeTheme };
};

export default ThemeToggleViewModel;

import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Obtener y aplicar tema inicial
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    applyTheme(savedTheme || "system");
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (
      newTheme === "dark" ||
      (newTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    if (newTheme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", newTheme);
    }

    applyTheme(newTheme);
  };

  return {
    theme,
    isDark,
    changeTheme,
  };
};

export default useTheme;

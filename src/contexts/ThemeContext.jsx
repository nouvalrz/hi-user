import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") ?? "light";
    localStorage.setItem("theme", savedTheme);
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };

import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Button from "./Button";
import { Moon, Sun } from "lucide-react";

function ToggleThemeButton({ className }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button variant="ghost" onClick={toggleTheme} className={className}>
      {theme === "light" ? (
        <Sun className="size-5 " />
      ) : (
        <Moon className="size-5 " />
      )}
    </Button>
  );
}

export default ToggleThemeButton;

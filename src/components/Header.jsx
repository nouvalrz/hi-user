import { LogOut } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router";

import { ThemeContext } from "../contexts/ThemeContext";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import ToggleThemeButton from "./ToggleThemeButton";
import { useAuth } from "@/hooks/useAuth";

function Header() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  return (
    <header className="p-3  border-b border-gray-200 dark:border-gray-600 backdrop-blur bg-white/30 dark:bg-white/5 flex flex-row justify-between items-center fixed top-0 w-full z-50 dark:text-gray-200">
      <p
        className="text-base font-medium cursor-pointer"
        onClick={() => navigate("/employees")}
      >
        Hi Employee 👋
      </p>
      <div className="flex flex-row gap-1 items-center">
        <ToggleThemeButton />
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="size-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;

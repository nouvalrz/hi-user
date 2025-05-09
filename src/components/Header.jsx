import { LogOut } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="p-3 bg-white border-b border-gray-200 flex flex-row justify-between items-center fixed top-0 w-full z-10">
      <p
        className="text-base font-medium text-white rounded-full bg-sky-600 px-4 py-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Hi User 👋
      </p>
      <div className="flex flex-row gap-1 items-center">
        <Button variant="ghost" onClick={toggleTheme}>
          {theme === "light" ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="size-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;

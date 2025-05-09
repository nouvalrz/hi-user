import { LogOut } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

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
      <Button variant="ghost" onClick={handleLogout}>
        <LogOut className="size-4 mr-1" />
        Logout
      </Button>
    </header>
  );
}

export default Header;

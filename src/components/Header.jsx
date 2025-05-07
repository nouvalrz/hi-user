import { LogOut } from "lucide-react";
import Button from "./Button";

function Header() {
  return (
    <header className="p-3 bg-white border-b border-gray-200 flex flex-row justify-between items-center fixed top-0 w-full z-10">
      <p className="text-base font-medium text-sky-600">Hi User 👋</p>
      <Button variant="ghost">
        <LogOut className="size-4 mr-1" />
        Logout
      </Button>
    </header>
  );
}

export default Header;

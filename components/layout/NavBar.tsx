import useAuth from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/lib/interface/User.interface";

const NavBar = () => {
  const { user, handleLogOut } = useAuth();
  const now = new Date();
  if (!user) return null;

  let greeting = "Good morning";
  const hours = now.getHours();
  if (hours >= 12 && hours < 18) {
    greeting = "Good afternoon";
  } else if (hours >= 18) {
    greeting = "Good evening";
  }

  return (
    <nav className="h-16 w-full flex items-center justify-between px-6  shadow">
      <div>
        <span>
          {greeting}, {user?.email}
        </span>
      </div>
      <div className=" flex flex-row gap-2">
        <div className="w-10 h-10 rounded-full bg-blue-200">
          <Avatar className="h-10 w-10  bg-amber-300 rounded-full">
            <AvatarFallback className="rounded-full h-10 w-10 bg-red-400">
              Ua
            </AvatarFallback>
          </Avatar>
        </div>
        <button onClick={handleLogOut} className="text-red-600 ">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

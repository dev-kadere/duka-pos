import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const { user, handleLogOut } = useAuth();

  return (
    <nav className="h-16 w-full flex items-center justify-between px-6 bg-white shadow">
      <div>
        <span>Welcome back, {user?.email}</span>
      </div>
      <div>
        <button onClick={handleLogOut} className="text-red-600 hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

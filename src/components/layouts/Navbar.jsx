import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const activeStyle = {
    color: "#ef4444",
    fontWeight: "600",
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src="Logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">SIMS PPOB</span>
          </Link>
          <div className="flex items-center space-x-8">
            <NavLink
              to="/topup"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="font-semibold text-gray-700 hover:text-red-500"
            >
              Top Up
            </NavLink>
            <NavLink
              to="/transaction"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="font-semibold text-gray-700 hover:text-red-500"
            >
              Transaction
            </NavLink>
            <NavLink
              to="/akun"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="font-semibold text-gray-700 hover:text-red-500"
            >
              Akun
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

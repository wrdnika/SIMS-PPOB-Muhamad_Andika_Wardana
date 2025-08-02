import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle = {
    color: "#ef4444",
    fontWeight: "600",
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavLink to="/" className="text-2xl font-bold text-red-500">
            SIMS PPOB
          </NavLink>
          <div className="flex space-x-8">
            <NavLink
              to="/topup"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="text-gray-600 hover:text-red-500"
            >
              Top Up
            </NavLink>
            <NavLink
              to="/transaction"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="text-gray-600 hover:text-red-500"
            >
              Transaction
            </NavLink>
            <NavLink
              to="/akun"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="text-gray-600 hover:text-red-500"
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

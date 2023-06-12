import React, { useCallback } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    window.location.reload();
  }, []);

  return (
    <header className="text-gray-600 body-font bg-blue-400">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl text-white font-bold">
            Daily Planner
          </span>
        </Link>
        {token ? (
          <button
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/signin">
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 font-bold text-gray-400">
              Log in
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import logo from "../assets/dapurbundalogo.jpg";

const Navigationbar = () => {
  return (
    <section>
      <div className="navbar bg-base-100 shadow-2xl">
        <div className="flex-1 p-4 flex item-center">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-10 h-10 rounded-lg" alt="Logo" />
            <span className="text-xl font-bold ml-3">Dashboard Admin - Dapur Bunda Bahagia</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navigationbar;

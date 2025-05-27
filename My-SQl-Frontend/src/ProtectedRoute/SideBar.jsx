// src/ProtectedRoute/SideBar.js
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaTasks, FaUser } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { logoutAPI } from '../API/api.js';

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAPI();
    navigate("/login");
  };

  return (
    <div
      className="p-3 vh-100 text-white"
      style={{ width: "200px", backgroundColor: "#343a40" }}
    >
      {/* <h4 className="mb-4">Sidebar</h4> */}
      <ul className="list-unstyled">
        <li className="mt-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-warning fw-bold" : "text-white"}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-warning fw-bold" : "text-white"}`
            }
          >
            Profile
          </NavLink>
        </li>
        <hr className="bg-white" />
        <li className="nav-item">
          <NavLink
            to="/dashboard/product"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-warning fw-bold" : "text-white"}`
            }
          >
            <FaTasks className="me-2" />
            Products
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/dashboard/brand"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-warning fw-bold" : "text-white"}`
            }
          >
            <FaUser className="me-2" />
            Brand
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/dashboard/category"
            className={({ isActive }) =>
              `nav-link ${isActive ? "text-warning fw-bold" : "text-white"}`
            }
          >
            <FaUser className="me-2" />
            Category
          </NavLink>
        </li>
        <li className="mt-4">
          <button onClick={handleLogout} className="nav-link text-white">
            <RiLogoutCircleRLine className="me-2" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;

// src/Layout/Layout.js
import { Outlet } from "react-router-dom";
import SideBar from "../ProtectedRoute/SideBar";
import NavbarComponent from "./NavbarComponent";


const Layout = () => {
  return (
    <div>
      <NavbarComponent/>
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ padding: '1rem', flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

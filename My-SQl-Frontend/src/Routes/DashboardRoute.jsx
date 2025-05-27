import { Route } from "react-router-dom";
import Dashboard from "../PAGES/Dashboard";
import Profile from "../PAGES/Profile";
import Brand from "../components/brand/brand";
import Product from "../components/products/product";
import Category from "../components/category/category";
import { Outlet } from "react-router-dom";

const DashboardRoutes = (
  <Route path="dashboard" element={<Outlet />}>
    <Route index element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="category" element={<Category />} />
    <Route path="brand" element={<Brand />} />
    <Route path="product" element={<Product />} />
  </Route>
);

export default DashboardRoutes;

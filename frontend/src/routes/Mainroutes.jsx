import { Route, Routes } from "react-router-dom";

import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductDetails from "../pages/admin/ProductDetails";
import UserProfile from "../pages/user/UserProfile";
import PageNotFound from "../PageNotFound";

import AuthWrapper from "./AuthWrapper";
import AdminWrapper from "./AdminWrapper";


const Mainroutes = () => {

  return (
    <Routes>

      {/* Home */}
      <Route
        path="/"
        element={<Products />}
      />


      {/* Authentication */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* Admin Only */}
      <Route
        path="/admin/create-product"
        element={
          <AdminWrapper>
            <CreateProduct />
          </AdminWrapper>
        }
      />


      {/* Logged-in Users */}
      <Route
        path="/admin/user-profile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />

      <Route
        path="/product/:id"
        element={
          <AuthWrapper>
            <ProductDetails />
          </AuthWrapper>
        }
      />


      {/* 404 */}
      <Route
        path="*"
        element={<PageNotFound />}
      />

    </Routes>
  );
};

export default Mainroutes;
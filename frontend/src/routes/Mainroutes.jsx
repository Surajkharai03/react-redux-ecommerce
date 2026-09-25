import { Route, Routes } from "react-router-dom";

import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";

import CreateProduct from "../pages/admin/CreateProduct";
import ProductDetails from "../pages/admin/ProductDetails";
import UserProfile from "../pages/user/UserProfile";

import PageNotFound from "../PageNotFound";

import AuthWrapper from "./AuthWrapper";
import AdminWrapper from "./AdminWrapper";
import GuestWrapper from "./GuestWrapper";


const Mainroutes = () => {

  return (

    <Routes>


      {/* ================= HOME ================= */}

      <Route
        path="/"
        element={<Products />}
      />


      {/* ================= LOGIN ================= */}

      <Route
        path="/login"
        element={
          <GuestWrapper>
            <Login />
          </GuestWrapper>
        }
      />


      {/* ================= REGISTER ================= */}

      <Route
        path="/register"
        element={
          <GuestWrapper>
            <Register />
          </GuestWrapper>
        }
      />


      {/* ================= CART ================= */}

      <Route
        path="/cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />


      {/* ================= ADMIN ================= */}

      <Route
        path="/admin/create-product"
        element={
          <AdminWrapper>
            <CreateProduct />
          </AdminWrapper>
        }
      />


      {/* ================= USER PROFILE ================= */}

      <Route
        path="/admin/user-profile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />


      {/* ================= PRODUCT DETAILS ================= */}

      <Route
        path="/product/:id"
        element={
          <AuthWrapper>
            <ProductDetails />
          </AuthWrapper>
        }
      />


      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<PageNotFound />}
      />

    </Routes>

  );

};

export default Mainroutes;
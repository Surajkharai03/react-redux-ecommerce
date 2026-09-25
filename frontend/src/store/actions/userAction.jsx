import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducers/userSlice";


// ==========================================
// GET CURRENT USER
// ==========================================

export const asynccurrentuser = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(loaduser(user));
    } else {
      dispatch(loaduser(null));
    }

  } catch (error) {
    console.log("Current User Error:", error);
    dispatch(loaduser(null));
  }
};


// ==========================================
// LOGOUT USER
// ==========================================

export const asynclogoutuser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");

    dispatch(removeuser());

    console.log("Logout Success");

  } catch (error) {
    console.log("Logout Error:", error);
  }
};


// ==========================================
// LOGIN USER
// ==========================================

export const asyncloginuser = (user) => async (dispatch) => {
  try {

    const { data } = await axios.get(
      `/users?email=${encodeURIComponent(user.email)}`
    );

    console.log("Users Found:", data);

    // ACCOUNT DOES NOT EXIST

    if (data.length === 0) {
      return {
        success: false,
        type: "NOT_FOUND",
        message: "You don't have an account.",
      };
    }

    // CHECK PASSWORD

    const loggedInUser = data.find(
      (item) =>
        String(item.password) === String(user.password)
    );

    // WRONG PASSWORD

    if (!loggedInUser) {
      return {
        success: false,
        type: "WRONG_PASSWORD",
        message: "Incorrect password. Please try again.",
      };
    }

    // LOGIN SUCCESS

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    dispatch(loaduser(loggedInUser));

    console.log("Login Success:", loggedInUser);

    return {
      success: true,
      type: "SUCCESS",
      message: "Login successful.",
    };

  } catch (error) {

    console.log("Login Error:", error);

    return {
      success: false,
      type: "ERROR",
      message: "Something went wrong. Please try again.",
    };
  }
};


// ==========================================
// REGISTER USER
// ==========================================

export const asyncregisteuser = (user) => async () => {
  try {

    const newUser = {
      ...user,
      isAdmin: false,
      cart: [],
    };

    const { data } = await axios.post(
      "/users",
      newUser
    );

    console.log("Register Success:", data);

    return data;

  } catch (error) {

    console.log("Register Error:", error);

    return null;
  }
};


// ==========================================
// UPDATE PASSWORD
// ==========================================

export const asyncupdatepassword =
  (id, newPassword) => async (dispatch) => {

    try {

      const { data } = await axios.patch(
        `/users/${id}`,
        {
          password: newPassword,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      dispatch(loaduser(data));

      console.log("Password Updated Successfully");

      return true;

    } catch (error) {

      console.log("Password Update Error:", error);

      return false;
    }
  };


// ==========================================
// DELETE ACCOUNT
// ==========================================

export const asyncdeleteaccount =
  (id) => async (dispatch) => {

    try {

      await axios.delete(`/users/${id}`);

      localStorage.removeItem("user");

      dispatch(removeuser());

      console.log("Account Deleted Successfully");

      return true;

    } catch (error) {

      console.log("Delete Account Error:", error);

      return false;
    }
  };


// ==========================================
// ADD TO CART
// ==========================================

export const asyncaddtocart =
  (userId, productId) => async (dispatch) => {

    try {

      // Get latest user from server

      const { data: user } = await axios.get(
        `/users/${userId}`
      );

      // Make a copy of existing cart

      const cart = [...(user.cart || [])];

      // Check whether product already exists

      const index = cart.findIndex(
        (item) =>
          String(item.id) === String(productId)
      );

      // Product doesn't exist

      if (index === -1) {

        cart.push({
          id: productId,
          quantity: 1,
        });

      }

      // Product already exists

      else {

        cart[index].quantity += 1;

      }

      // Update backend

      const { data } = await axios.patch(
        `/users/${userId}`,
        {
          cart: cart,
        }
      );

      // Update localStorage

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      // Update Redux

      dispatch(loaduser(data));

      console.log("Cart Updated:", data);

    } catch (error) {

      console.log("Add To Cart Error:", error);

    }
  };


// ==========================================
// REMOVE FROM CART
// ==========================================

export const asyncremovefromcart =
  (userId, productId) => async (dispatch) => {

    try {

      const { data: user } = await axios.get(
        `/users/${userId}`
      );

      const cart = (user.cart || []).filter(
        (item) =>
          String(item.id) !== String(productId)
      );

      const { data } = await axios.patch(
        `/users/${userId}`,
        {
          cart: cart,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      dispatch(loaduser(data));

    } catch (error) {

      console.log("Remove Cart Error:", error);

    }
  };


// ==========================================
// UPDATE CART QUANTITY
// ==========================================

export const asyncupdatecart =
  (userId, productId, quantity) => async (dispatch) => {

    try {

      const { data: user } = await axios.get(
        `/users/${userId}`
      );

      const cart = [...(user.cart || [])];

      const index = cart.findIndex(
        (item) =>
          String(item.id) === String(productId)
      );

      if (index !== -1) {

        cart[index].quantity = quantity;

      }

      const { data } = await axios.patch(
        `/users/${userId}`,
        {
          cart: cart,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      dispatch(loaduser(data));

    } catch (error) {

      console.log("Update Cart Error:", error);

    }
  };
import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducers/userSlice";


// GET CURRENT USER

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


// LOGOUT USER

export const asynclogoutuser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");

    dispatch(removeuser());

    console.log("Logout Success");

  } catch (error) {
    console.log("Logout Error:", error);
  }
};


// LOGIN USER

export const asyncloginuser = (user) => async (dispatch) => {
  try {

    // Find account using email
    const { data } = await axios.get(
      `/users?email=${encodeURIComponent(user.email)}`
    );

    console.log("Users Found:", data);


    // --------------------------------
    // ACCOUNT DOES NOT EXIST
    // --------------------------------

    if (data.length === 0) {
      return {
        success: false,
        type: "NOT_FOUND",
        message: "You don't have an account.",
      };
    }


    // --------------------------------
    // CHECK PASSWORD
    // --------------------------------

    const loggedInUser = data.find(
      (item) =>
        String(item.password) === String(user.password)
    );


    // --------------------------------
    // WRONG PASSWORD
    // --------------------------------

    if (!loggedInUser) {
      return {
        success: false,
        type: "WRONG_PASSWORD",
        message: "Incorrect password. Please try again.",
      };
    }


    // --------------------------------
    // LOGIN SUCCESS
    // --------------------------------

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


// REGISTER USER

export const asyncregisteuser = (user) => async () => {
  try {

    const newUser = {
      ...user,
      isAdmin: false,
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


// UPDATE PASSWORD

export const asyncupdatepassword =
  (id, newPassword) => async (dispatch) => {

    try {

      const { data } = await axios.patch(
        `/users/${id}`,
        {
          password: newPassword,
        }
      );

      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      // Update Redux
      dispatch(loaduser(data));

      console.log("Password Updated Successfully");

      return true;

    } catch (error) {

      console.log("Password Update Error:", error);

      return false;
    }
  };


// DELETE ACCOUNT

export const asyncdeleteaccount =
  (id) => async (dispatch) => {

    try {

      await axios.delete(`/users/${id}`);

      // Remove from localStorage
      localStorage.removeItem("user");

      // Remove from Redux
      dispatch(removeuser());

      console.log("Account Deleted Successfully");

      return true;

    } catch (error) {

      console.log("Delete Account Error:", error);

      return false;
    }
  };
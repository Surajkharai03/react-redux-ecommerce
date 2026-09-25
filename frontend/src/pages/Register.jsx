import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { asyncregisteuser } from "../store/actions/userAction";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const RegisterHandler = async (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    user.cart = []

    console.log("REGISTER USER:", user);

    await dispatch(asyncregisteuser(user));

    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit(RegisterHandler)}
      className="flex flex-col w-1/4 justify-start items-start"
    >
      {/* USERNAME */}

      <input
        {...register("username", {
          required: "Username is required",
        })}
        className="outline-0 border-b p-2 text-2xl mb-1"
        type="text"
        placeholder="User Name"
      />

      {errors.username && (
        <p className="text-red-500 mb-3">
          {errors.username.message}
        </p>
      )}

      {/* EMAIL */}

      <input
        {...register("email", {
          required: "Email is required",

          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email",
          },
        })}
        className="outline-0 border-b p-2 text-2xl mb-1"
        type="email"
        placeholder="User Email"
      />

      {errors.email && (
        <p className="text-red-500 mb-3">
          {errors.email.message}
        </p>
      )}

      {/* PASSWORD */}

      <input
        {...register("password", {
          required: "Password is required",

          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        className="outline-0 border-b p-2 text-2xl mb-1"
        type="password"
        placeholder="*********"
      />

      {errors.password && (
        <p className="text-red-500 mb-3">
          {errors.password.message}
        </p>
      )}

      {/* BUTTON */}

      <button
        type="submit"
        className="mt-5 px-4 py-2 bg-pink-800 rounded"
      >
        Register User
      </button>

      {/* LOGIN LINK */}

      <p className="mt-5">
        Already have an account?{" "}

        <Link
          className="text-blue-400"
          to="/login"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
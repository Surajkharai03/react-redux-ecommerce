import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { asyncloginuser } from "../store/actions/userAction";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const LoginHandler = async (user) => {

    // Remove previous error
    setLoginError(null);


    // Login request
    const result = await dispatch(
      asyncloginuser(user)
    );


    // Login successful
    if (result.success) {

      navigate("/");

      return;
    }


    // Login failed
    setLoginError(result);
  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">

      <div className="w-full max-w-md">

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-3xl font-semibold text-white">
            Welcome back
          </h1>

          <p className="text-gray-400 mt-2">
            Sign in to your account to continue.
          </p>

        </div>


        {/* Login Card */}

        <div className="bg-gray-700 border border-gray-600 rounded-2xl p-7 shadow-xl">


          <form
            onSubmit={handleSubmit(LoginHandler)}
            className="space-y-5"
          >


            {/* LOGIN ERROR */}

            {loginError && (

              <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30">

                <p className="text-sm text-red-400">

                  {loginError.message}

                  {loginError.type === "NOT_FOUND" && (
                    <>
                      {" "}
                      <Link
                        to="/register"
                        className="text-pink-400 hover:text-pink-300 font-medium underline underline-offset-2"
                      >
                        Register here
                      </Link>
                    </>
                  )}

                </p>

              </div>

            )}


            {/* EMAIL */}

            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-pink-500 transition"
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-pink-500 transition"
              />

              {errors.password && (
                <p className="text-red-400 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium transition"
            >
              Login
            </button>


          </form>


          {/* REGISTER */}

          <div className="mt-6 pt-6 border-t border-gray-600 text-center">

            <p className="text-sm text-gray-400">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 text-pink-400 hover:text-pink-300 font-medium"
              >
                Create account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};


export default Login;
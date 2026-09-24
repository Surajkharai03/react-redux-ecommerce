import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  asynclogoutuser,
  asyncupdatepassword,
  asyncdeleteaccount,
} from "../../store/actions/userAction";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.usersReducer.users);

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Logout
  const logoutHandler = async () => {
    await dispatch(asynclogoutuser());
    navigate("/");
  };

  // Update password
  const passwordHandler = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (String(currentPassword) !== String(user.password)) {
      alert("Current password is incorrect.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      alert("New password must be different from current password.");
      return;
    }

    const success = await dispatch(
      asyncupdatepassword(user.id, newPassword)
    );

    if (success) {
      alert("Password updated successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    }
  };

  // Delete account
  const deleteAccountHandler = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmation) return;

    const success = await dispatch(
      asyncdeleteaccount(user.id)
    );

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white px-4 py-10">

      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-8">

          <p className="text-sm text-pink-400 font-medium mb-2">
            ACCOUNT
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Account Settings
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your profile, security and account preferences.
          </p>

        </div>


        {/* PROFILE HEADER */}
        <div className="bg-gray-700 border border-gray-600 rounded-2xl overflow-hidden shadow-lg">

          <div className="h-2 bg-pink-600"></div>

          <div className="p-7">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              <div className="flex items-center gap-5">

                {/* Simple Avatar */}
                <div className="w-16 h-16 rounded-xl bg-gray-800 border border-gray-600 flex items-center justify-center">

                  <span className="text-2xl font-semibold text-pink-400">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </span>

                </div>


                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="text-xl font-semibold">
                      {user?.username || "User"}
                    </h2>

                    {user?.isAdmin && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        Admin
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-gray-400 mt-1">
                    {user?.email || "No email available"}
                  </p>

                </div>

              </div>


              <button
                onClick={logoutHandler}
                className="px-5 py-2.5 border border-gray-500 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-600 transition"
              >
                Log out
              </button>

            </div>

          </div>

        </div>


        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* ACCOUNT DETAILS */}
            <div className="bg-gray-700 border border-gray-600 rounded-2xl overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-600">

                <h3 className="font-medium">
                  Account details
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Basic information about your account.
                </p>

              </div>


              <div className="p-6 space-y-5">

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Username
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {user?.username || "Not available"}
                  </p>
                </div>


                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-medium break-all">
                    {user?.email || "Not available"}
                  </p>
                </div>


                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Account type
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {user?.isAdmin ? "Administrator" : "Customer"}
                  </p>
                </div>

              </div>

            </div>


            {/* ADMIN */}
            {user?.isAdmin && (
              <div className="bg-gray-700 border border-gray-600 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-gray-600">

                  <p className="text-xs uppercase tracking-wider text-pink-400">
                    Administration
                  </p>

                  <h3 className="font-medium mt-1">
                    Store management
                  </h3>

                </div>


                <div className="p-6">

                  <p className="text-sm text-gray-400 leading-6">
                    Create and manage products from the administration area.
                  </p>

                  <button
                    onClick={() =>
                      navigate("/admin/create-product")
                    }
                    className="mt-5 w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg text-sm font-medium transition"
                  >
                    Open admin panel
                  </button>

                </div>

              </div>
            )}

          </div>


          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* PASSWORD */}
            <div className="bg-gray-700 border border-gray-600 rounded-2xl overflow-hidden">

              <div className="px-6 py-5 border-b border-gray-600">

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="font-medium">
                      Password & security
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      Keep your account secure by using a strong password.
                    </p>

                  </div>

                  <div className="hidden sm:block text-xs text-gray-500">
                    SECURITY
                  </div>

                </div>

              </div>


              <div className="p-6">

                {!showPasswordForm ? (

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                    <div>

                      <p className="text-sm font-medium">
                        Change your password
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        You will need to enter your current password first.
                      </p>

                    </div>


                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm font-medium transition"
                    >
                      Change password
                    </button>

                  </div>

                ) : (

                  <form
                    onSubmit={passwordHandler}
                    className="max-w-lg"
                  >

                    <div className="space-y-5">

                      {/* Current Password */}
                      <div>

                        <label className="block text-sm font-medium text-gray-300">
                          Current password
                        </label>

                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) =>
                            setCurrentPassword(e.target.value)
                          }
                          placeholder="Enter current password"
                          className="w-full mt-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 outline-none focus:border-pink-500 transition"
                        />

                      </div>


                      {/* New Password */}
                      <div>

                        <label className="block text-sm font-medium text-gray-300">
                          New password
                        </label>

                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) =>
                            setNewPassword(e.target.value)
                          }
                          placeholder="Enter new password"
                          className="w-full mt-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 outline-none focus:border-pink-500 transition"
                        />

                        <p className="text-xs text-gray-500 mt-2">
                          Password must contain at least 6 characters.
                        </p>

                      </div>


                      {/* Confirm Password */}
                      <div>

                        <label className="block text-sm font-medium text-gray-300">
                          Confirm new password
                        </label>

                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value)
                          }
                          placeholder="Confirm new password"
                          className="w-full mt-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 outline-none focus:border-pink-500 transition"
                        />

                      </div>


                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-2">

                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 rounded-lg text-sm font-medium transition"
                        >
                          Update password
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setCurrentPassword("");
                            setNewPassword("");
                            setConfirmPassword("");
                          }}
                          className="px-5 py-2.5 border border-gray-600 hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-300 transition"
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  </form>

                )}

              </div>

            </div>


            {/* DANGER ZONE */}
            <div className="bg-gray-700 border border-red-900/60 rounded-2xl overflow-hidden">

              <div className="px-6 py-5 border-b border-red-900/60">

                <h3 className="font-medium text-red-400">
                  Delete account
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Permanently remove your account from this application.
                </p>

              </div>


              <div className="p-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>

                  <button
                    onClick={deleteAccountHandler}
                    className="px-5 py-2.5 border border-red-500/70 text-red-400 hover:bg-red-500 hover:text-white rounded-lg text-sm font-medium transition"
                  >
                    Delete account
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;
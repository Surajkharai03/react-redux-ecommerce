import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {

  const user = useSelector(
    (state) => state.usersReducer.users
  );

  return (
    <nav className="mb-10 flex justify-center items-center gap-x-5 p-5">

      {/* Home */}
      <NavLink to="/">
        Home
      </NavLink>


      {user ? (
        <>

          {/* Admin Only */}
          {user.isAdmin && (
            <NavLink to="/admin/create-product">
              Create Product
            </NavLink>
          )}


          {/* Logged-in users */}
          <NavLink to="/admin/user-profile">
            Settings
          </NavLink>

        </>
      ) : (

        /* Not logged in */
        <NavLink to="/login">
          Login
        </NavLink>

      )}

    </nav>
  );
};

export default Nav;
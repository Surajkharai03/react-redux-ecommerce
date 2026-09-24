import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthWrapper = (props) => {
  const user = useSelector(
    (state) => state.usersReducer.users
  );

  return user ? props.children : <Navigate to="/login" replace />;
};

export default AuthWrapper;
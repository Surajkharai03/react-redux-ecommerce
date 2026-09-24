import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminWrapper = (props) => {
  const user = useSelector(
    (state) => state.usersReducer.users
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return props.children;
};

export default AdminWrapper;
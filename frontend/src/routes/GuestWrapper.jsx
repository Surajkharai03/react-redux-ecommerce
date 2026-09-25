import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestWrapper = ({ children }) => {
  const { users, isInitialized } = useSelector(
    (state) => state.usersReducer
  );

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (users) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestWrapper;
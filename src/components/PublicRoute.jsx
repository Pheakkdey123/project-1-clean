
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loading from "./Loading";

function PublicRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (session) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;


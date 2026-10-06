import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/storage.js";

// If nobody is logged in, send them to the login page.
export default function ProtectedRoute({ children }) {
  return getCurrentUser() ? children : <Navigate to="/login" />;
}

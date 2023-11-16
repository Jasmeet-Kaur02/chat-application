import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, Chat, Rooms } from "./screens";
import { useUser } from "./context/userContext";

const ProtectedRoutes = ({ children }) => {
  const [user] = useUser();

  if (user) {
    return children;
  }

  return <Navigate to="/signin" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/enter-room"
        element={
          <ProtectedRoutes>
            <Rooms />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

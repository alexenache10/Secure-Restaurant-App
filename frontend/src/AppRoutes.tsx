import { Routes, Route, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import Layout_User from "./layout/layout_user";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

type DecodedToken = {
  role: string; // Rolul utilizatorului (Admin, Classic, etc.)
  exp: number; // Data expirării token-ului
};

const isAdmin = (): boolean => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return false; // Nu există token
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // Verifică dacă rolul este Admin
    if (decoded.role === "Admin") {
      // Verifică și dacă token-ul a expirat
      const currentTime = Date.now() / 1000; // Timpul actual în secunde
      if (decoded.exp > currentTime) {
        return true;
      } else {
        console.error("Token expired.");
      }
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return false;
};

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (isAdmin()) {
    return children;
  }
  return <Navigate to="/not-found" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />

      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute />}>
        {/* Protected routes */}
        <Route
          path="/user-profile"
          element={
            <Layout_User>
              <UserProfilePage />
            </Layout_User>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout_User>
              <ManageRestaurantPage />
            </Layout_User>
          }
        />
      </Route>

      <Route
        path="/register"
        element={
          <Layout_User>
            <RegisterPage />
          </Layout_User>
        }
      />

      <Route
        path="/login"
        element={
          <Layout_User>
            <LoginPage />
          </Layout_User>
        }
      />

      {/* Admin-protected route */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <Layout_User>
              <AdminPage />
            </Layout_User>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <Layout_User>
            <ContactPage />
          </Layout_User>
        }
      />

      <Route
        path="/not-found"
        element={
          <Layout_User>
            <NotFound />
          </Layout_User>
        }
      />

      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};

export default AppRoutes;

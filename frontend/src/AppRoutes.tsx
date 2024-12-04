import { Routes, Route, Navigate } from "react-router-dom";
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
        {/* Protected routes here */}
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

      {/* Conditionally render AdminPage based on isAdmin */}

        <Route
          path="/admin"
          element={
            <Layout_User>
              <AdminPage />
            </Layout_User>
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

import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Main } from "../Layout/Main";
import AddAI from "../Pages/Admin/AddAI";
import Login from "../Pages/Admin/Login";
import VerifyEmail from "../Pages/Admin/VerifyEmail";
import OTP from "../Pages/Admin/OTP";
import ChangePassword from "../Pages/Admin/ChangePassword";
import AIList from "../Pages/Admin/AIList";
import EditAI from "../Pages/Admin/EditAI";
import Dashboard from "../Pages/Admin/Dashboard";
import AdminNavbar from "../Pages/Admin/AdminNavbar";
import FullAI from "../Pages/Home/FullAI";
import AICategoryPage from "../Pages/Home/AICategoryPage";
import NewAI from "../Pages/Home/NewAI";

import AINews from "../Pages/Home/AINews";
import FreeAI from "../Pages/Home/FreeAI";

// Refactored router with nested routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/full_list",
        element: <FullAI />,
      },
      {
        path: "/ai_categories",
        element: <AICategoryPage />,
      },
      {
        path: "/new_ai",
        element: <NewAI />,
      },
      {
        path: "/free_ai",
        element: <FreeAI />,
      },
      {
        path: "/ai_news",
        element: <AINews />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminNavbar />, // AdminNavbar always shows for admin routes
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add_ai",
        element: <AddAI />,
      },
      {
        path: "ai_list",
        element: <AIList />,
      },
      {
        path: "edit_ai",
        element: <EditAI />,
      },
      {
        // Redirect to the Dashboard if no route is matched
        path: "*",
        element: <Dashboard />,
      },
    ],
  },
      {
        path: "admin/login",
        element: <Login />,
      },
      {
        path: "admin/verify_email",
        element: <VerifyEmail />,
      },
      {
        path: "admin/otp",
        element: <OTP />,
      },
      {
        path: "admin/change_password",
        element: <ChangePassword />,
      },
]);


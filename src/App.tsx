import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/Admin/AdminRoute";

// Public pages
import Home from "./pages/Home";
import MoviePost from "./pages/MoviePost";
import Category from "./pages/Category";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DMCA from "./pages/DMCA";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Public layout (header + footer)
import PublicLayout from "./components/Layout/PublicLayout";

// Admin
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AllPosts from "./admin/pages/AllPosts";
import BlogEditor from "./admin/pages/BlogEditor";
import Categories from "./admin/pages/Categories";
import Analytics from "./admin/pages/Analytics";
import Settings from "./admin/pages/Settings";

const SECRET_ROUTE =
  import.meta.env.VITE_ADMIN_SECRET_ROUTE || "xpanel-9x7z";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #2a2a2a",
            },
          }}
        />
        <Routes>
          {/* ─── Public Frontend ─────────────────────────── */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="/post/:slug" element={<MoviePost />} />
            {/* Category uses :name param internally */}
            <Route path="/category/:name" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dmca" element={<DMCA />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* ─── Admin Login (exact secret route) ────────── */}
          <Route
            path={`/${SECRET_ROUTE}`}
            element={<AdminLogin />}
          />

          {/* ─── Protected Admin Panel (sub-routes) ──────── */}
          <Route
            path={`/${SECRET_ROUTE}/*`}
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route
              index
              element={<Navigate to="dashboard" replace />}
            />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all-posts" element={<AllPosts />} />
            <Route path="new-post" element={<BlogEditor mode="new" />} />
            <Route
              path="edit-post/:id"
              element={<BlogEditor mode="edit" />}
            />
            <Route path="categories" element={<Categories />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ─── 404 ─────────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

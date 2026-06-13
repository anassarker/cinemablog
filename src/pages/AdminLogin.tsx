import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Eye, EyeOff, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import MetaTags from "../components/SEO/MetaTags";

const SECRET_ROUTE =
  import.meta.env.VITE_ADMIN_SECRET_ROUTE || "xpanel-9x7z";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAdmin) {
      const from =
        (location.state as { from?: { pathname: string } })?.from
          ?.pathname || `/${SECRET_ROUTE}/dashboard`;
      navigate(from, { replace: true });
    }
  }, [isAdmin, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      const from =
        (location.state as { from?: { pathname: string } })?.from
          ?.pathname || `/${SECRET_ROUTE}/dashboard`;
      navigate(from, { replace: true });
    } catch {
      toast.error("Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaTags title="Admin Login" noIndex={true} />
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e50914]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#f5c518]/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-sm"
        >
          {/* Card */}
          <div className="glass bg-[#111111]/80 border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#e50914] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/40">
                <Film size={26} className="text-white" />
              </div>
              <h1 className="font-bebas text-3xl text-white tracking-widest">
                CINE<span className="text-[#e50914]">BLOG</span> PRO
              </h1>
              <p className="text-gray-600 text-xs mt-1 uppercase tracking-widest">
                Admin Access
              </p>
            </div>

            {/* Lock icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full flex items-center justify-center">
                <Lock size={14} className="text-gray-500" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 uppercase tracking-widest mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  autoComplete="email"
                  required
                  className="input-dark"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600 uppercase tracking-widest mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="input-dark pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-gray-800 text-xs text-center mt-6">
              Unauthorized access is prohibited
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;

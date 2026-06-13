import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Tag,
  Settings,
  ExternalLink,
  LogOut,
  Film,
  X,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const SECRET_ROUTE = import.meta.env.VITE_ADMIN_SECRET_ROUTE || 'xpanel-9x7z';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Dashboard', href: 'dashboard', icon: LayoutDashboard },
  { label: 'All Posts', href: 'all-posts', icon: FileText },
  { label: 'New Post', href: 'new-post', icon: PlusCircle },
  { label: 'Categories', href: 'categories', icon: Tag },
  { label: 'Analytics', href: 'analytics', icon: BarChart3 },
  { label: 'Settings', href: 'settings', icon: Settings },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate(`/${SECRET_ROUTE}`);
  };

  const isActive = (href: string) => location.pathname.includes(href);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#0d0d0d] border-r border-[#1a1a1a] z-50 flex flex-col lg:translate-x-0 transition-transform`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-[#1a1a1a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#e50914] rounded-lg flex items-center justify-center">
              <Film size={16} className="text-white" />
            </div>
            <div>
              <p className="font-bebas text-lg text-white tracking-widest leading-none">
                CINE<span className="text-[#e50914]">BLOG</span>
              </p>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-500 hover:text-white rounded"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              to={`/${SECRET_ROUTE}/${href}`}
              onClick={onClose}
              className={`admin-sidebar-link ${isActive(href) ? 'active' : ''}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-[#1a1a1a] space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-sidebar-link"
          >
            <ExternalLink size={17} />
            View Site
          </a>
          <button
            onClick={handleLogout}
            className="admin-sidebar-link w-full text-left hover:text-red-400"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;

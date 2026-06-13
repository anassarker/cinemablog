import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import AdminSidebar from '../components/Admin/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import MetaTags from '../components/SEO/MetaTags';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <MetaTags
        title="Admin Panel – CineBlog Pro"
        noIndex={true}
      />
      <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar */}
          <header className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white"
              >
                <Menu size={18} />
              </button>
              <div>
                <h1 className="text-white font-semibold text-sm hidden sm:block">Admin Panel</h1>
                <p className="text-gray-600 text-xs hidden sm:block">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a] relative">
                <Bell size={16} />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#e50914] rounded-full" />
              </button>
              <div className="w-8 h-8 rounded-full bg-[#e50914] flex items-center justify-center text-white text-xs font-bold">
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

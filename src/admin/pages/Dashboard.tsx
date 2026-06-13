import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Eye, TrendingUp, PlusCircle, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useAllAdminPosts } from '../../hooks/usePosts';
import { formatDate } from '../../utils/formatDate';

const SECRET_ROUTE = import.meta.env.VITE_ADMIN_SECRET_ROUTE || 'xpanel-9x7z';

const Dashboard: React.FC = () => {
  const { posts, loading } = useAllAdminPosts();

  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const published = posts.filter(p => p.status === 'published').length;
  const drafts = posts.filter(p => p.status === 'draft').length;

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Published', value: published, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Drafts', value: drafts, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'text-[#e50914]', bg: 'bg-red-400/10' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Admin</p>
        </div>
        <Link
          to={`/${SECRET_ROUTE}/new-post`}
          className="btn-primary"
        >
          <PlusCircle size={16} />
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5"
          >
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{loading ? '–' : value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to={`/${SECRET_ROUTE}/new-post`}
          className="bg-gradient-to-br from-[#e50914]/20 to-[#e50914]/5 border border-[#e50914]/20 rounded-xl p-6 flex items-center gap-4 hover:border-[#e50914]/40 transition-colors group"
        >
          <div className="w-12 h-12 bg-[#e50914] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <PlusCircle size={22} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold">Create New Post</p>
            <p className="text-gray-500 text-sm">Add a new movie blog post</p>
          </div>
        </Link>
        <Link
          to={`/${SECRET_ROUTE}/all-posts`}
          className="bg-gradient-to-br from-[#f5c518]/10 to-transparent border border-[#f5c518]/20 rounded-xl p-6 flex items-center gap-4 hover:border-[#f5c518]/40 transition-colors group"
        >
          <div className="w-12 h-12 bg-[#f5c518]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp size={22} className="text-[#f5c518]" />
          </div>
          <div>
            <p className="text-white font-semibold">Manage Posts</p>
            <p className="text-gray-500 text-sm">Edit, publish or delete posts</p>
          </div>
        </Link>
      </div>

      {/* Recent Posts */}
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#2a2a2a] flex items-center justify-between">
          <h2 className="text-white font-semibold">Recent Posts</h2>
          <Link to={`/${SECRET_ROUTE}/all-posts`} className="text-[#e50914] text-sm hover:underline">
            View All
          </Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-600">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest font-medium">Title</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest font-medium hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest font-medium hidden sm:table-cell">Status</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest font-medium hidden lg:table-cell">Views</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest font-medium">Date</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-600 uppercase tracking-widest font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.slice(0, 8).map((post) => (
                  <tr key={post.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-white text-sm font-medium line-clamp-1 max-w-xs">{post.title}</p>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="badge badge-red text-xs">{post.category}</span>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <span className={`badge text-xs ${
                        post.status === 'published' ? 'badge-gold' : 'bg-gray-800 text-gray-400 border-gray-700'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-gray-400 text-sm">{(post.views || 0).toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-gray-600 text-xs">{formatDate(post.publishedAt)}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/${SECRET_ROUTE}/edit-post/${post.id}`}
                          className="p-1.5 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
                        >
                          <Edit size={14} />
                        </Link>
                        <button className="p-1.5 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, PlusCircle, Search, Filter } from 'lucide-react';
import { useAllAdminPosts } from '../../hooks/usePosts';
import { formatDate } from '../../utils/formatDate';
import toast from 'react-hot-toast';

const SECRET_ROUTE = import.meta.env.VITE_ADMIN_SECRET_ROUTE || 'xpanel-9x7z';

const AllPosts: React.FC = () => {
  const { posts, loading, refetch } = useAllAdminPosts();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const { db } = await import('../../config/firebase');
      const { doc, deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'posts', id));
      toast.success('Post deleted');
      refetch();
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const handleToggleStatus = async (id: string, current: string) => {
    const newStatus = current === 'published' ? 'draft' : 'published';
    try {
      const { db } = await import('../../config/firebase');
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'posts', id), { status: newStatus });
      toast.success(`Post ${newStatus}`);
      refetch();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">All Posts</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} total posts</p>
        </div>
        <Link to={`/${SECRET_ROUTE}/new-post`} className="btn-primary">
          <PlusCircle size={16} />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark pl-9"
          />
        </div>
        <div className="relative">
          <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="input-dark pl-9 w-full sm:w-40 appearance-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-600">Loading posts...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600">No posts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest">Post</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest hidden md:table-cell">Category</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest hidden sm:table-cell">Status</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest hidden lg:table-cell">Views</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest hidden xl:table-cell">Date</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-600 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((post, i) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {post.thumbnail && (
                          <img
                            src={post.thumbnail}
                            alt=""
                            className="w-10 h-7 object-cover rounded hidden sm:block"
                          />
                        )}
                        <div>
                          <p className="text-white text-sm font-medium line-clamp-1 max-w-xs">{post.title}</p>
                          <p className="text-gray-600 text-xs">{post.year} · {post.language}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="badge badge-red text-xs">{post.category}</span>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <button
                        onClick={() => handleToggleStatus(post.id, post.status)}
                        className={`badge text-xs cursor-pointer transition-opacity hover:opacity-70 ${
                          post.status === 'published'
                            ? 'badge-gold'
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                      >
                        {post.status}
                      </button>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        <Eye size={12} />
                        {(post.views || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden xl:table-cell">
                      <span className="text-gray-600 text-xs">{formatDate(post.publishedAt)}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/post/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Eye size={14} />
                        </a>
                        <Link
                          to={`/${SECRET_ROUTE}/edit-post/${post.id}`}
                          className="p-1.5 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 rounded-lg bg-[#1a1a1a] text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPosts;

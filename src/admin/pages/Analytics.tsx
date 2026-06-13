import React from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, FileText, Star } from 'lucide-react';
import { useAllAdminPosts } from '../../hooks/usePosts';

const Analytics: React.FC = () => {
  const { posts } = useAllAdminPosts();

  const topPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 10);
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const avgViews = posts.length > 0 ? Math.round(totalViews / posts.length) : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Blog performance overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'text-[#e50914]' },
          { label: 'Avg Views/Post', value: avgViews.toLocaleString(), icon: TrendingUp, color: 'text-blue-400' },
          { label: 'Total Posts', value: posts.length, icon: FileText, color: 'text-green-400' },
          { label: 'Featured', value: posts.filter(p => p.featured).length, icon: Star, color: 'text-[#f5c518]' },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5"
          >
            <Icon size={20} className={`${color} mb-3`} />
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Top Posts */}
      <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#2a2a2a]">
          <h2 className="text-white font-semibold">Top Performing Posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest">#</th>
                <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest">Post</th>
                <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest">Category</th>
                <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest">Views</th>
                <th className="text-left px-5 py-3 text-xs text-gray-600 uppercase tracking-widest">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post, i) => (
                <tr key={post.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50">
                  <td className="px-5 py-3 text-gray-600 font-mono text-sm">{i + 1}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {post.thumbnail && (
                        <img src={post.thumbnail} alt="" className="w-10 h-7 object-cover rounded" />
                      )}
                      <p className="text-white text-sm font-medium line-clamp-1 max-w-xs">{post.title}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="badge badge-red text-xs">{post.category}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1.5 bg-[#e50914] rounded-full"
                        style={{ width: `${Math.round(((post.views || 0) / (topPosts[0]?.views || 1)) * 80)}px` }}
                      />
                      <span className="text-white text-sm">{(post.views || 0).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-[#f5c518] fill-[#f5c518]" />
                      <span className="text-white text-sm">{post.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

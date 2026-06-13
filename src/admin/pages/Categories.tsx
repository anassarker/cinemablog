import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockPosts';
import { useAllAdminPosts } from '../../hooks/usePosts';

const SECRET_ROUTE = import.meta.env.VITE_ADMIN_SECRET_ROUTE || 'xpanel-9x7z';

const Categories: React.FC = () => {
  const { posts } = useAllAdminPosts();

  const categoryStats = CATEGORIES.map(cat => ({
    name: cat,
    count: posts.filter(p => p.category === cat).length,
    published: posts.filter(p => p.category === cat && p.status === 'published').length,
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <p className="text-gray-500 text-sm mt-1">Manage post categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryStats.map(({ name, count, published }) => (
          <div key={name} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#e50914]/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="badge badge-red">{name}</span>
              <span className="text-gray-600 text-xs">{count} posts</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Published</span>
                <span className="text-white font-medium">{published}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Draft</span>
                <span className="text-white font-medium">{count - published}</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to={`/${SECRET_ROUTE}/all-posts`}
                className="text-[#e50914] text-xs hover:underline"
              >
                View posts →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

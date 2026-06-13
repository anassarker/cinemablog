import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import BlogCard from '../components/Blog/BlogCard';
import Loader from '../components/UI/Loader';
import AdBanner from '../components/UI/AdBanner';
import MetaTags from '../components/SEO/MetaTags';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const POSTS_PER_PAGE = 9;

const categoryIcons: Record<string, string> = {
  Action: '💥', Drama: '🎭', Horror: '👻', 'Sci-Fi': '🚀', Thriller: '🔪',
  Comedy: '😂', Romance: '❤️', Animation: '🎨', Documentary: '📽️', Crime: '🔫',
};

const Category: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { posts, loading } = usePosts(name);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <MetaTags
        title={`${name} Movies & Reviews`}
        description={`Browse all ${name} movie reviews and download links on CineBlog Pro.`}
      />
      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{categoryIcons[name || ''] || '🎬'}</span>
            <h1 className="font-bebas text-5xl text-white tracking-wider">{name}</h1>
          </div>
          <p className="text-gray-500">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </div>

        <AdBanner slot="category-top" format="leaderboard" className="mb-8" />

        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {paginatedPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-[#111111] border border-[#2a2a2a] text-gray-400 hover:text-white disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                      page === n
                        ? 'bg-[#e50914] text-white'
                        : 'bg-[#111111] border border-[#2a2a2a] text-gray-400 hover:text-white'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg bg-[#111111] border border-[#2a2a2a] text-gray-400 hover:text-white disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-[#111111] border border-[#2a2a2a] rounded-2xl">
            <p className="text-gray-600 text-lg mb-2">No posts in {name} yet</p>
            <p className="text-gray-700 text-sm">Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight, Flame, Grid3X3 } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import BlogCard from '../components/Blog/BlogCard';
import Loader from '../components/UI/Loader';
import AdBanner from '../components/UI/AdBanner';
import MetaTags from '../components/SEO/MetaTags';
import { CATEGORIES } from '../data/mockPosts';

const categoryIcons: Record<string, string> = {
  Action: '💥',
  Drama: '🎭',
  Horror: '👻',
  'Sci-Fi': '🚀',
  Thriller: '🔪',
  Comedy: '😂',
  Romance: '❤️',
  Animation: '🎨',
  Documentary: '📽️',
  Crime: '🔫',
};

const Home: React.FC = () => {
  const { posts, loading } = usePosts();
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredPosts = posts.filter(p => p.featured).slice(0, 3);
  const latestPosts = posts.slice(0, 12);
  const trendingPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  const filteredPosts = activeCategory === 'All'
    ? latestPosts
    : latestPosts.filter(p => p.category === activeCategory);

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <MetaTags
        title="CineBlog Pro – Movie & TV Show Blog"
        description="Discover the latest movie reviews, TV show blogs, download links, and cinema insights on CineBlog Pro."
      />

      <div className="pt-28 pb-10">
        {/* Top Ad Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <AdBanner slot="top-banner" format="leaderboard" />
        </div>

        {/* Hero / Featured Section */}
        {featuredPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-white font-bold text-xl">
                <Flame size={20} className="text-[#e50914]" />
                Featured
              </h2>
              <Link to="/category/Action" className="text-[#e50914] text-sm hover:underline flex items-center gap-1">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} featured index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Main Layout: Posts + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-3">
              {/* Category Filter */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === 'All'
                      ? 'bg-[#e50914] text-white'
                      : 'bg-[#111111] text-gray-400 border border-[#2a2a2a] hover:text-white'
                  }`}
                >
                  All Movies
                </button>
                {CATEGORIES.slice(0, 6).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-[#e50914] text-white'
                        : 'bg-[#111111] text-gray-400 border border-[#2a2a2a] hover:text-white'
                    }`}
                  >
                    {categoryIcons[cat]} {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2 text-white font-bold text-lg">
                  <Grid3X3 size={18} className="text-gray-500" />
                  {activeCategory === 'All' ? 'Latest Posts' : activeCategory}
                </h2>
                <span className="text-gray-600 text-sm">{filteredPosts.length} posts</span>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredPosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#111111] border border-[#2a2a2a] rounded-2xl">
                  <p className="text-gray-600">No posts in this category yet.</p>
                </div>
              )}

              {/* Mid-content Ad */}
              <div className="mt-8">
                <AdBanner slot="mid-content" format="auto" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Sidebar Ad */}
              <AdBanner slot="sidebar-top" format="rectangle" />

              {/* Trending */}
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[#2a2a2a] bg-[#1a1a1a]">
                  <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                    <TrendingUp size={16} className="text-[#e50914]" />
                    Trending Now
                  </h3>
                </div>
                <div className="divide-y divide-[#1a1a1a]">
                  {trendingPosts.map((post, i) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.slug}`}
                      className="flex items-start gap-3 p-3 hover:bg-[#1a1a1a] transition-colors group"
                    >
                      <span className="font-bebas text-2xl text-gray-800 group-hover:text-[#e50914] transition-colors leading-none mt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium leading-snug line-clamp-2 group-hover:text-[#e50914] transition-colors">
                          {post.title}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                          {(post.views || 0).toLocaleString()} views
                        </p>
                      </div>
                      {post.thumbnail && (
                        <img
                          src={post.thumbnail}
                          alt=""
                          className="w-10 h-14 object-cover rounded shrink-0"
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-[#2a2a2a] bg-[#1a1a1a]">
                  <h3 className="text-white font-semibold text-sm">Browse Categories</h3>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat}
                      to={`/category/${cat}`}
                      className="flex items-center gap-1.5 px-3 py-2.5 bg-[#1a1a1a] rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-[#e50914]/10 hover:border-[#e50914]/30 border border-transparent transition-all"
                    >
                      <span>{categoryIcons[cat]}</span>
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Ad 2 */}
              <AdBanner slot="sidebar-bottom" format="rectangle" />
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-white font-bold text-xl mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/category/${cat}`}
                  className="flex flex-col items-center justify-center gap-2 p-5 bg-[#111111] border border-[#2a2a2a] rounded-xl hover:border-[#e50914]/40 hover:bg-[#e50914]/5 transition-all group text-center"
                >
                  <span className="text-3xl">{categoryIcons[cat]}</span>
                  <span className="text-white text-sm font-semibold group-hover:text-[#e50914] transition-colors">
                    {cat}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer Ad */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <AdBanner slot="footer-banner" format="leaderboard" />
        </div>
      </div>
    </>
  );
};

export default Home;

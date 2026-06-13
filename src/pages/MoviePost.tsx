import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Clock, Globe, Film, User, Layers,
  HardDrive, Calendar, Tag, Copy, ChevronRight, Eye
} from 'lucide-react';
import { usePost, usePosts } from '../hooks/usePosts';
import Loader from '../components/UI/Loader';
import DownloadTab from '../components/Blog/DownloadTab';
import BlogCard from '../components/Blog/BlogCard';
import AdBanner from '../components/UI/AdBanner';
import MetaTags from '../components/SEO/MetaTags';
import { formatDate, estimateReadTime } from '../utils/formatDate';
import toast from 'react-hot-toast';

const MoviePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading } = usePost(slug || '');
  const { posts: allPosts } = usePosts();

  // Related posts (same category, exclude current)
  const related = allPosts
    .filter(p => p.slug !== slug && p.category === post?.category)
    .slice(0, 3);

  // Increment view count
  useEffect(() => {
    if (!post?.id) return;
    const incrementViews = async () => {
      try {
        const { db } = await import('../config/firebase');
        const { doc, updateDoc, increment } = await import('firebase/firestore');
        await updateDoc(doc(db, 'posts', post.id), { views: increment(1) });
      } catch {
        // Not critical
      }
    };
    incrementViews();
  }, [post?.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  if (loading) return <Loader fullScreen />;
  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Post not found</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const readTime = estimateReadTime(post.content);

  const infoItems = [
    { icon: Film, label: 'Genre', value: post.genre },
    { icon: Calendar, label: 'Year', value: post.year },
    { icon: Globe, label: 'Language', value: post.language },
    { icon: Layers, label: 'Quality', value: post.quality },
    { icon: User, label: 'Director', value: post.director },
    { icon: Clock, label: 'Duration', value: post.duration },
    { icon: HardDrive, label: 'File Size', value: post.size },
    { icon: User, label: 'Cast', value: post.cast },
  ].filter(item => item.value);

  return (
    <>
      <MetaTags
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        image={post.thumbnail}
        type="article"
        keywords={post.tags.join(', ')}
      />

      <div className="pt-20">
        {/* Hero Banner */}
        <div className="relative">
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />
          </div>

          {/* Post Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                <Link to="/" className="hover:text-white">Home</Link>
                <ChevronRight size={12} />
                <Link to={`/category/${post.category}`} className="hover:text-white">{post.category}</Link>
                <ChevronRight size={12} />
                <span className="text-gray-400 line-clamp-1">{post.title}</span>
              </nav>

              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="badge badge-red">{post.category}</span>
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="font-bebas text-4xl md:text-6xl text-white leading-tight mb-3">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 flex-wrap text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-[#f5c518] fill-[#f5c518]" />
                  <span className="text-white font-bold">{post.rating}</span>
                  <span>/10</span>
                </div>
                <span className="flex items-center gap-1"><Calendar size={13} />{post.year}</span>
                <span className="flex items-center gap-1"><Clock size={13} />{post.duration}</span>
                <span className="flex items-center gap-1"><Eye size={13} />{post.views?.toLocaleString()} views</span>
                <span className="flex items-center gap-1"><Clock size={13} />{readTime} min read</span>
                <span className="text-[#f5c518] font-bold">{post.quality}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Top Ad */}
          <AdBanner slot="post-top" format="leaderboard" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article */}
            <div className="lg:col-span-2 space-y-6">
              {/* Movie Info Table */}
              {infoItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-[#2a2a2a] bg-[#1a1a1a]">
                    <h2 className="text-white font-bold flex items-center gap-2">
                      <Film size={16} className="text-[#e50914]" />
                      Movie Details
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-0">
                    {infoItems.map(({ icon: Icon, label, value }, i) => (
                      <div
                        key={label}
                        className={`flex items-start gap-3 p-4 ${
                          i < infoItems.length - 1 ? 'border-b border-[#1a1a1a]' : ''
                        } ${label === 'Cast' ? 'sm:col-span-2' : ''}`}
                      >
                        <div className="w-7 h-7 bg-[#e50914]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={13} className="text-[#e50914]" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-xs uppercase tracking-wide">{label}</p>
                          <p className="text-white text-sm font-medium mt-0.5">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6"
              >
                <div
                  className="rich-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </motion.div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag size={14} className="text-gray-600" />
                  {post.tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/search?q=${tag}`}
                      className="text-xs text-gray-500 bg-[#111111] border border-[#2a2a2a] px-3 py-1 rounded-full hover:text-[#e50914] hover:border-[#e50914]/30 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="flex items-center gap-3 bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
                <span className="text-gray-500 text-sm">Share:</span>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-xs text-gray-400 hover:text-white hover:border-[#e50914]/40 transition-all"
                >
                  <Copy size={12} />
                  Copy Link
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-xs text-gray-400 hover:text-white transition-all"
                >
                  𝕏 Share
                </a>
              </div>

              {/* Pre-download Ad (high intent = high CPC) */}
              <AdBanner
                slot="pre-download"
                format="auto"
                label="Sponsored – Before You Download"
              />

              {/* Download Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <DownloadTab downloadLinks={post.downloadLinks} title={post.title} />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Poster */}
              <div className="sticky top-24">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full rounded-2xl border border-[#2a2a2a] shadow-2xl"
                />

                {/* Rating */}
                <div className="mt-4 bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-500 text-sm">IMDb Rating</span>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-[#f5c518] fill-[#f5c518]" />
                      <span className="text-white font-bold text-lg">{post.rating}</span>
                      <span className="text-gray-600">/10</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#f5c518] to-[#e50914] rounded-full"
                      style={{ width: `${parseFloat(post.rating) * 10}%` }}
                    />
                  </div>
                </div>

                {/* Sidebar Ad */}
                <div className="mt-4">
                  <AdBanner slot="post-sidebar" format="rectangle" />
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Related Movies</h2>
                <Link
                  to={`/category/${post.category}`}
                  className="text-[#e50914] text-sm hover:underline"
                >
                  View all {post.category}
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((p, i) => (
                  <BlogCard key={p.id} post={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default MoviePost;

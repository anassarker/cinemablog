import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Clock, Star, Calendar } from 'lucide-react';
import type { Post } from '../../types';
import { formatDate, estimateReadTime } from '../../utils/formatDate';

interface BlogCardProps {
  post: Post;
  featured?: boolean;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false, index = 0 }) => {
  const readTime = estimateReadTime(post.content);

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group overflow-hidden rounded-2xl bg-[#111111] border border-[#2a2a2a] card-hover"
      >
        <Link to={`/post/${post.slug}`} className="block">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

            {/* Featured badge */}
            <div className="absolute top-3 left-3">
              <span className="badge badge-red text-xs">⭐ Featured</span>
            </div>

            {/* Rating */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
              <Star size={12} className="text-[#f5c518] fill-[#f5c518]" />
              <span className="text-white text-xs font-bold">{post.rating}</span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-gold text-xs">{post.category}</span>
                <span className="text-gray-400 text-xs">{post.year}</span>
              </div>
              <h3 className="font-bebas text-3xl text-white leading-tight line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-300 text-sm mt-1 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden card-hover"
    >
      <Link to={`/post/${post.slug}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent" />

          {/* Category */}
          <div className="absolute top-2 left-2">
            <span className="badge badge-red text-xs">{post.category}</span>
          </div>

          {/* Rating */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded">
            <Star size={10} className="text-[#f5c518] fill-[#f5c518]" />
            <span className="text-white text-xs font-bold">{post.rating}</span>
          </div>

          {/* Quality Badge */}
          <div className="absolute bottom-2 right-2">
            <span className="text-xs font-bold text-[#f5c518] bg-black/60 px-1.5 py-0.5 rounded">
              {post.quality}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-base leading-snug mb-2 group-hover:text-[#e50914] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar size={10} />
                {post.year}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={10} />
                {readTime} min
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Eye size={10} />
              {post.views.toLocaleString()}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-[#1a1a1a] flex items-center justify-between">
            <span className="text-gray-600 text-xs">{formatDate(post.publishedAt)}</span>
            <span className="text-[#e50914] text-xs font-semibold group-hover:underline">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;

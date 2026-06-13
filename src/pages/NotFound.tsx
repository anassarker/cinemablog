import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Home, Search } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';

const NotFound: React.FC = () => {
  return (
    <>
      <MetaTags title="404 – Page Not Found" noIndex />
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-6">
            <Film size={36} className="text-gray-700" />
          </div>
          <h1 className="font-bebas text-8xl text-[#e50914] leading-none mb-2">404</h1>
          <h2 className="text-white text-2xl font-bold mb-3">Scene Not Found</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            The page you're looking for has gone off-script. It might have been moved,
            deleted, or perhaps it never existed in this timeline.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/" className="btn-primary">
              <Home size={16} />
              Go Home
            </Link>
            <Link to="/search" className="btn-secondary">
              <Search size={16} />
              Search
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;

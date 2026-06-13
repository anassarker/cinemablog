import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../data/mockPosts';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Movies', href: '/category/Action' },
    { label: 'Drama', href: '/category/Drama' },
    { label: 'Horror', href: '/category/Horror' },
    { label: 'Sci-Fi', href: '/category/Sci-Fi' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a] shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className="bg-[#e50914] py-1.5 px-4 text-center text-xs font-medium text-white tracking-wide hidden md:block">
        🎬 New Movies Added Daily – Browse Latest Downloads
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[#e50914] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Film size={20} className="text-white" />
            </div>
            <div>
              <span className="font-bebas text-2xl text-white tracking-widest">
                CINE<span className="text-[#e50914]">BLOG</span>
              </span>
              <span className="text-[#f5c518] text-xs font-semibold ml-1 align-top">PRO</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm pl-9 pr-4 py-2 rounded-lg w-48 focus:outline-none focus:border-[#e50914] focus:w-64 transition-all duration-300 placeholder-gray-600"
                />
              </div>
            </form>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#1a1a1a] text-gray-300 hover:text-white border border-[#2a2a2a]"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div className="hidden md:flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
          <span className="text-xs text-gray-600 uppercase tracking-widest whitespace-nowrap">Categories:</span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="text-xs text-gray-400 hover:text-[#e50914] whitespace-nowrap px-2 py-1 rounded border border-transparent hover:border-[#2a2a2a] transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#111111] border-t border-[#2a2a2a]"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm pl-9 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-[#e50914] placeholder-gray-600"
                  />
                </div>
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-[#2a2a2a]">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-2 px-3">Categories</p>
                <div className="grid grid-cols-3 gap-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      to={`/category/${cat}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-xs text-gray-400 hover:text-[#e50914] px-2 py-1.5 rounded bg-[#1a1a1a] text-center transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

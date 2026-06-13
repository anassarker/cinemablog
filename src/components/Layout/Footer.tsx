import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { CATEGORIES } from '../../data/mockPosts';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { label: 'X', href: '#' },
    { label: 'FB', href: '#' },
    { label: 'IG', href: '#' },
    { label: 'YT', href: '#' },
    { label: '✉', href: 'mailto:contact@cineblogpro.com' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Latest Movies', href: '/category/Action' },
    { label: 'TV Shows', href: '/category/Drama' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'DMCA', href: '/dmca' },
  ];

  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1a1a1a] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#e50914] rounded-lg flex items-center justify-center">
                <Film size={20} className="text-white" />
              </div>
              <div>
                <span className="font-bebas text-2xl text-white tracking-widest">
                  CINE<span className="text-[#e50914]">BLOG</span>
                </span>
                <span className="text-[#f5c518] text-xs font-semibold ml-1">PRO</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Your ultimate destination for movie reviews, cinematic insights, and the latest in
              film and TV entertainment.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-white hover:border-[#e50914] transition-all text-xs font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat}`}
                    className="text-gray-500 hover:text-[#e50914] text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#e50914]" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-gray-500 hover:text-[#e50914] text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2a2a2a]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">
              Disclaimer
            </h4>
            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              CineBlog Pro is an entertainment blog providing movie information, reviews, and
              external links for educational purposes only.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              We do not host any files on our servers. All download links point to third-party
              external sources.
            </p>
            <div className="flex items-center gap-2">
              <span className="badge badge-red text-xs">DMCA</span>
              <span className="badge badge-gold text-xs">Protected</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            © {year} CineBlog Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'DMCA', href: '/dmca' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

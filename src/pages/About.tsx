import React from 'react';
import { motion } from 'framer-motion';
import { Film, Star, Shield, Globe } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';

const About: React.FC = () => {
  return (
    <>
      <MetaTags
        title="About Us – CineBlog Pro"
        description="Learn about CineBlog Pro – your ultimate movie and TV blog."
      />
      <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-[#e50914] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Film size={32} className="text-white" />
          </div>
          <h1 className="font-bebas text-6xl text-white tracking-wider mb-4">
            About <span className="text-[#e50914]">CineBlog Pro</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Your ultimate destination for movie reviews, TV show blogs, and cinema insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Star,
              title: 'Expert Reviews',
              desc: 'In-depth, honest reviews written by passionate cinephiles who live and breathe film.',
              color: 'text-[#f5c518]',
              bg: 'bg-[#f5c518]/10',
            },
            {
              icon: Globe,
              title: 'Global Cinema',
              desc: 'Covering Hollywood blockbusters to international art house films — we celebrate all cinema.',
              color: 'text-blue-400',
              bg: 'bg-blue-400/10',
            },
            {
              icon: Shield,
              title: 'Original Content',
              desc: 'Every review is 100% original, well-researched, and written with integrity.',
              color: 'text-green-400',
              bg: 'bg-green-400/10',
            },
          ].map(({ icon: Icon, title, desc, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6 text-center"
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 mb-8">
          <h2 className="text-white font-bold text-2xl mb-4">Our Mission</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              CineBlog Pro was founded with a simple mission: to provide film enthusiasts with
              high-quality, thoughtful content about movies and television. We believe that great
              cinema deserves great writing.
            </p>
            <p>
              Our team of dedicated writers watches hundreds of films each year, bringing you
              nuanced reviews that go beyond surface-level criticism. We analyze storytelling,
              cinematography, performances, and cultural impact.
            </p>
            <p>
              Whether you're looking for the latest Hollywood blockbuster review, an obscure
              international gem, or classic films you might have missed, CineBlog Pro has you covered.
            </p>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
          <h2 className="text-white font-bold text-2xl mb-4">What We Cover</h2>
          <ul className="grid grid-cols-2 gap-3">
            {[
              'Hollywood Movies', 'International Cinema', 'TV Series & Shows',
              'Documentary Films', 'Animated Features', 'Classic Cinema',
              'Indie Films', 'Box Office Analysis', 'Award Season Coverage',
              'Streaming Reviews', 'Behind the Scenes', 'Film Industry News',
            ].map(item => (
              <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e50914]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;

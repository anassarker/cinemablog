import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import BlogCard from '../components/Blog/BlogCard';
import MetaTags from '../components/SEO/MetaTags';
import Loader from '../components/UI/Loader';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const { posts, loading } = usePosts();

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const results = query.trim()
    ? posts.filter(post => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q) ||
          post.tags.some(t => t.toLowerCase().includes(q)) ||
          post.genre.toLowerCase().includes(q) ||
          post.cast.toLowerCase().includes(q) ||
          post.director.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <MetaTags
        title={query ? `Search: "${query}"` : 'Search Movies'}
        description={`Search results for "${query}" on CineBlog Pro.`}
        noIndex={true}
      />
      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Search Movies</h1>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search movies, directors, actors..."
                className="input-dark pl-12 py-4 text-base"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 btn-primary py-1.5">
                Search
              </button>
            </div>
          </form>
        </div>

        {query && (
          <div className="mb-6">
            <p className="text-gray-500">
              {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
              <span className="text-white font-semibold">"{query}"</span>
            </p>
          </div>
        )}

        {query && results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20 bg-[#111111] border border-[#2a2a2a] rounded-2xl">
            <SearchIcon size={40} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No results found</p>
            <p className="text-gray-700 text-sm">Try different keywords</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon size={40} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600">Start searching to find movies</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;

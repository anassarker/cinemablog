import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  keywords?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'CineBlog Pro – Movie & TV Show Blog',
  description = 'Your ultimate destination for movie reviews, TV show blogs, download links, and cinema content.',
  image = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  noIndex = false,
  keywords = 'movies, TV shows, cinema, download, review, blog',
}) => {
  const siteName = 'CineBlog Pro';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default MetaTags;

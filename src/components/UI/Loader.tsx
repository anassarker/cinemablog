import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullScreen = false }) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  const spinner = (
    <div
      className={`${sizeMap[size]} border-[#2a2a2a] border-t-[#e50914] rounded-full animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  );
};

export default Loader;

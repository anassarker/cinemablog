import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'banner';
  className?: string;
  label?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  slot = '1234567890',
  format = 'auto',
  className = '',
  label = 'Advertisement',
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000';

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        // Push AdSense ad
        ((window as unknown as Record<string, unknown>).adsbygoogle =
          (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push({} as unknown);
      }
    } catch {
      // AdSense not loaded
    }
  }, []);

  const heightMap = {
    leaderboard: 'min-h-[90px]',
    rectangle: 'min-h-[250px]',
    banner: 'min-h-[60px]',
    auto: 'min-h-[100px]',
  };

  return (
    <div className={`w-full ${className}`}>
      <p className="text-center text-xs text-gray-600 mb-1 uppercase tracking-widest">
        {label}
      </p>
      <div
        ref={adRef}
        className={`w-full bg-[#111111] border border-[#2a2a2a] rounded-lg flex items-center justify-center ${heightMap[format]}`}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
        {/* Fallback placeholder shown when AdSense isn't loaded */}
        <div className="text-gray-700 text-xs text-center pointer-events-none absolute">
          <div className="w-8 h-8 bg-[#1a1a1a] rounded mx-auto mb-2 flex items-center justify-center">
            <span className="text-gray-600 text-lg">📢</span>
          </div>
          <span>Ad Space</span>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import type { DownloadLinks } from '../../types';

interface DownloadTabProps {
  downloadLinks: DownloadLinks;
  title: string;
}

const QUALITY_TABS = ['480p', '720p', '1080p', '4K'] as const;
type QualityTab = typeof QUALITY_TABS[number];

const DownloadTab: React.FC<DownloadTabProps> = ({ downloadLinks, title }) => {
  const [activeTab, setActiveTab] = useState<QualityTab>('1080p');

  const availableTabs = QUALITY_TABS.filter(
    (tab) => downloadLinks[tab] && downloadLinks[tab].length > 0
  );

  const currentLinks = downloadLinks[activeTab] || [];

  const qualityColors: Record<QualityTab, string> = {
    '480p': 'text-gray-400',
    '720p': 'text-blue-400',
    '1080p': 'text-[#f5c518]',
    '4K': 'text-[#e50914]',
  };

  return (
    <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#e50914]/20 to-transparent border-b border-[#2a2a2a] p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#e50914] rounded-xl flex items-center justify-center">
            <Download size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Download Links</h3>
            <p className="text-gray-500 text-xs">{title}</p>
          </div>
        </div>
      </div>

      {/* Quality Tabs */}
      <div className="flex items-center gap-1 p-4 border-b border-[#2a2a2a] overflow-x-auto">
        {QUALITY_TABS.map((tab) => {
          const hasLinks = downloadLinks[tab]?.length > 0;
          return (
            <button
              key={tab}
              onClick={() => hasLinks && setActiveTab(tab)}
              disabled={!hasLinks}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab && hasLinks
                  ? 'bg-[#e50914] text-white shadow-lg shadow-red-900/30'
                  : hasLinks
                  ? 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white border border-[#2a2a2a]'
                  : 'bg-[#0d0d0d] text-gray-700 cursor-not-allowed border border-[#1a1a1a] opacity-50'
              }`}
            >
              <span className={activeTab === tab ? 'text-white' : qualityColors[tab]}>
                {tab}
              </span>
              {!hasLinks && (
                <span className="ml-1 text-xs text-gray-700">N/A</span>
              )}
              {hasLinks && (
                <span className={`ml-1.5 text-xs ${activeTab === tab ? 'text-red-200' : 'text-gray-600'}`}>
                  ({downloadLinks[tab].length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Download Links */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentLinks.length > 0 ? (
              <div className="space-y-3">
                {currentLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl hover:border-[#e50914] hover:bg-[#e50914]/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e50914]/10 border border-[#e50914]/20 flex items-center justify-center group-hover:bg-[#e50914] transition-colors">
                        <Download size={14} className="text-[#e50914] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{link.label}</p>
                        <p className="text-gray-600 text-xs">
                          Quality: <span className={qualityColors[activeTab]}>{activeTab}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 hidden sm:block">External Link</span>
                      <ExternalLink size={14} className="text-gray-500 group-hover:text-[#e50914] transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle size={32} className="text-gray-700 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">
                  No download links available for <span className="text-white">{activeTab}</span>
                </p>
                {availableTabs.length > 0 && (
                  <p className="text-gray-700 text-xs mt-1">
                    Try: {availableTabs.join(', ')}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <div className="mt-5 p-3 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] flex items-start gap-2">
          <Shield size={14} className="text-gray-600 mt-0.5 shrink-0" />
          <p className="text-gray-600 text-xs leading-relaxed">
            All links are external and provided for informational purposes only. CineBlog Pro does not
            host any files. Use at your own risk and ensure compliance with your local laws.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadTab;

import React from 'react';
import { motion } from 'framer-motion';
import MetaTags from '../components/SEO/MetaTags';
import { AlertTriangle, Mail, FileText } from 'lucide-react';

const DMCA: React.FC = () => {
  return (
    <>
      <MetaTags
        title="DMCA Policy – CineBlog Pro"
        description="CineBlog Pro's DMCA policy and copyright takedown procedure."
      />
      <div className="pt-28 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#f5c518]/10 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-[#f5c518]" />
            </div>
            <h1 className="font-bebas text-4xl text-white tracking-wider">DMCA Policy</h1>
          </div>
          <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              icon: FileText,
              title: 'Our Position',
              content: `CineBlog Pro is a blog and content aggregation site. We respect the intellectual property rights of others and expect our users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and will respond to notices of alleged copyright infringement.`,
            },
            {
              icon: AlertTriangle,
              title: 'Disclaimer',
              content: `CineBlog Pro does not host, upload, or store any video files, movies, or other copyrighted media on our servers. All external links provided on this site point to content hosted by third-party websites, servers, or platforms that are not under our control. We have no affiliation with these third-party hosts.

We function purely as a movie information and review blog. The download links displayed are user-submitted or publicly available external links. By clicking any download link, you are connecting directly to third-party servers.`,
            },
            {
              icon: Mail,
              title: 'Filing a DMCA Takedown Request',
              content: `If you believe that your copyrighted work has been linked to in a way that constitutes copyright infringement, please send a written DMCA notice to our designated copyright agent with the following information:

1. Your physical or electronic signature as the copyright owner or authorized agent
2. Identification of the copyrighted work you claim has been infringed
3. Identification of the material you want removed, including URL
4. Your contact information (address, phone, email)
5. A statement that you have a good faith belief the use is not authorized
6. A statement that the information is accurate, under penalty of perjury

Send DMCA notices to: dmca@cineblogpro.com

We will process valid DMCA notices within 72 business hours and remove the infringing links promptly.`,
            },
            {
              icon: FileText,
              title: 'Counter-Notification',
              content: `If you believe your content was removed by mistake, you may file a counter-notification. A valid counter-notification must include: your electronic signature; identification of the removed content and its location; a statement under penalty of perjury that the content was removed by mistake; your name, address, and phone number; and consent to jurisdiction of your local federal district court.`,
            },
          ].map(({ icon: Icon, title, content }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} className="text-[#e50914]" />
                <h2 className="text-white font-bold text-lg">{title}</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{content}</p>
            </motion.div>
          ))}

          <div className="bg-[#e50914]/10 border border-[#e50914]/20 rounded-xl p-6">
            <h2 className="text-white font-bold mb-2">Contact for DMCA</h2>
            <p className="text-gray-400 text-sm mb-3">Send all DMCA-related correspondence to:</p>
            <a href="mailto:dmca@cineblogpro.com" className="text-[#e50914] font-semibold hover:underline">
              dmca@cineblogpro.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DMCA;

import React from 'react';
import { motion } from 'framer-motion';
import MetaTags from '../components/SEO/MetaTags';
import { Shield } from 'lucide-react';

const Privacy: React.FC = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you submit a contact form or newsletter signup. This may include your name, email address, and message content. We also automatically collect certain technical information when you visit our site, including IP addresses, browser type, device information, and pages viewed through standard web analytics tools.`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to: operate and improve our website; respond to your comments and questions; send you technical notices and updates; monitor and analyze trends and usage; and detect and prevent fraudulent transactions and other illegal activities. We do not sell, trade, or rent your personal identification information to others.`,
    },
    {
      title: 'Cookies',
      content: `We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with small amounts of data. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Google AdSense, which we use for advertising, may use cookies to serve ads based on your prior visits to our website or other websites.`,
    },
    {
      title: 'Google AdSense',
      content: `We use Google AdSense to display advertisements on our site. Google uses cookies to serve ads based on a user's prior visits to our website and other sites on the Internet. You may opt out of personalized advertising by visiting Google's Ads Settings. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.`,
    },
    {
      title: 'Third-Party Links',
      content: `Our website contains links to external websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.`,
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.`,
    },
    {
      title: 'Children\'s Privacy',
      content: `Our website is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and become aware that your child has provided us with personal information, please contact us and we will take steps to remove that information.`,
    },
    {
      title: 'Changes to This Policy',
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us at: privacy@cineblogpro.com`,
    },
  ];

  return (
    <>
      <MetaTags
        title="Privacy Policy – CineBlog Pro"
        description="CineBlog Pro's Privacy Policy explaining how we collect and use your data."
      />
      <div className="pt-28 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#e50914]/10 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-[#e50914]" />
            </div>
            <h1 className="font-bebas text-4xl text-white tracking-wider">Privacy Policy</h1>
          </div>
          <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-gray-400 mt-4 leading-relaxed">
            CineBlog Pro ("we", "us", or "our") operates this website. This page informs you of our policies
            regarding the collection, use, and disclosure of personal data when you use our Service.
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map(({ title, content }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6"
            >
              <h2 className="text-white font-bold text-lg mb-3">{i + 1}. {title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Privacy;

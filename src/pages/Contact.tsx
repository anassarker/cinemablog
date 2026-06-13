import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import MetaTags from '../components/SEO/MetaTags';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Message sent! We\'ll respond within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <>
      <MetaTags
        title="Contact Us – CineBlog Pro"
        description="Contact the CineBlog Pro team for inquiries, advertising, or content submissions."
      />
      <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-bebas text-5xl text-white tracking-wider mb-3">Contact Us</h1>
          <p className="text-gray-400">Get in touch with the CineBlog Pro team</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                title: 'Email',
                value: 'contact@cineblogpro.com',
                desc: 'For general inquiries',
              },
              {
                icon: MessageSquare,
                title: 'DMCA / Legal',
                value: 'dmca@cineblogpro.com',
                desc: 'For copyright concerns',
              },
            ].map(({ icon: Icon, title, value, desc }) => (
              <div key={title} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5">
                <div className="w-9 h-9 bg-[#e50914]/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon size={17} className="text-[#e50914]" />
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">{title}</h3>
                <p className="text-[#e50914] text-sm">{value}</p>
                <p className="text-gray-600 text-xs mt-1">{desc}</p>
              </div>
            ))}

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2 text-sm">Response Time</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                We typically respond within 24-48 hours on business days.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6"
          >
            <h2 className="text-white font-bold text-xl mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    placeholder="Your name"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    placeholder="your@email.com"
                    className="input-dark"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Subject</label>
                <select
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  required
                  className="input-dark"
                >
                  <option value="">Select subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="advertising">Advertising</option>
                  <option value="content">Content Submission</option>
                  <option value="dmca">DMCA / Copyright</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  rows={6}
                  placeholder="Your message..."
                  className="input-dark resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full justify-center py-3"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;

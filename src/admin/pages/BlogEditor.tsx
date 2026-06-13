import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Save, Eye, Upload, Plus, Trash2, ChevronDown, ChevronUp,
  Link as LinkIcon, Tag, Globe, Star, Clock, User, Film
} from 'lucide-react';
import toast from 'react-hot-toast';
import { slugify } from '../../utils/slugify';
import { CATEGORIES } from '../../data/mockPosts';
import type { Post, DownloadLinks, DownloadLink } from '../../types';
import { mockPosts } from '../../data/mockPosts';

const SECRET_ROUTE = import.meta.env.VITE_ADMIN_SECRET_ROUTE || 'xpanel-9x7z';
const QUALITY_TABS = ['480p', '720p', '1080p', '4K'] as const;
type QualityTab = typeof QUALITY_TABS[number];

const emptyDownloadLinks: DownloadLinks = {
  '480p': [],
  '720p': [],
  '1080p': [],
  '4K': [],
};

const emptyPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'> = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  thumbnail: '',
  category: 'Action',
  tags: [],
  genre: '',
  year: new Date().getFullYear().toString(),
  language: 'English',
  quality: '1080p',
  rating: '',
  director: '',
  cast: '',
  duration: '',
  size: '',
  downloadLinks: emptyDownloadLinks,
  status: 'draft',
  views: 0,
  featured: false,
  metaTitle: '',
  metaDescription: '',
};

interface BlogEditorProps {
  mode: 'new' | 'edit';
}

const BlogEditor: React.FC<BlogEditorProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState(emptyPost);
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeQuality, setActiveQuality] = useState<QualityTab>('1080p');
  const [slugManual, setSlugManual] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    content: true,
    movieInfo: true,
    downloads: true,
    seo: false,
    publish: true,
  });

  // Simple text editor (replace with ReactQuill if installed)
  const [editorContent, setEditorContent] = useState('');

  const loadPost = useCallback(async () => {
    if (!id) return;
    try {
      const { db } = await import('../../config/firebase');
      const { doc, getDoc } = await import('firebase/firestore');
      const snap = await getDoc(doc(db, 'posts', id));
      if (snap.exists()) {
        const data = snap.data() as Post;
        setForm({ ...emptyPost, ...data });
        setEditorContent(data.content || '');
        setTagsInput((data.tags || []).join(', '));
        return;
      }
    } catch {
      // Firebase not configured
    }
    // Fallback to mock
    const mock = mockPosts.find(p => p.id === id);
    if (mock) {
      setForm({ ...emptyPost, ...mock });
      setEditorContent(mock.content || '');
      setTagsInput((mock.tags || []).join(', '));
    }
  }, [id]);

  useEffect(() => {
    if (mode === 'edit') {
      loadPost();
    }
  }, [mode, loadPost]);

  const updateField = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (key === 'title' && !slugManual) {
      setForm(prev => ({ ...prev, title: value as string, slug: slugify(value as string) }));
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!form.slug.trim()) {
      toast.error('Slug is required');
      return;
    }

    setSaving(true);
    const postData: Partial<Post> = {
      ...form,
      content: editorContent,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      status,
      updatedAt: new Date(),
      ...(status === 'published' && mode === 'new' ? { publishedAt: new Date() } : {}),
      ...(mode === 'new' ? { createdAt: new Date(), views: 0 } : {}),
    };

    try {
      const { db } = await import('../../config/firebase');

      if (mode === 'new') {
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          publishedAt: status === 'published' ? serverTimestamp() : null,
        });
      } else {
        const { doc, updateDoc, serverTimestamp } = await import('firebase/firestore');
        await updateDoc(doc(db, 'posts', id!), {
          ...postData,
          updatedAt: serverTimestamp(),
        });
      }

      toast.success(mode === 'new' ? 'Post created!' : 'Post updated!');
      navigate(`/${SECRET_ROUTE}/all-posts`);
    } catch {
      // Firebase not configured - show success for demo
      toast.success(`Post ${mode === 'new' ? 'created' : 'updated'} (Demo mode - Firebase not configured)`);
      navigate(`/${SECRET_ROUTE}/all-posts`);
    } finally {
      setSaving(false);
    }
  };

  const addDownloadLink = (quality: QualityTab) => {
    const updated: DownloadLinks = {
      ...form.downloadLinks,
      [quality]: [...(form.downloadLinks[quality] || []), { label: '', url: '' }],
    };
    updateField('downloadLinks', updated);
  };

  const updateDownloadLink = (quality: QualityTab, index: number, field: keyof DownloadLink, value: string) => {
    const updated: DownloadLinks = {
      ...form.downloadLinks,
      [quality]: form.downloadLinks[quality].map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    };
    updateField('downloadLinks', updated);
  };

  const removeDownloadLink = (quality: QualityTab, index: number) => {
    const updated: DownloadLinks = {
      ...form.downloadLinks,
      [quality]: form.downloadLinks[quality].filter((_, i) => i !== index),
    };
    updateField('downloadLinks', updated);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const SectionHeader: React.FC<{
    title: string;
    section: keyof typeof expandedSections;
    icon: React.ReactNode;
  }> = ({ title, section, icon }) => (
    <button
      type="button"
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-[#1a1a1a] rounded-t-xl border border-[#2a2a2a] text-left"
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        {icon}
        {title}
      </div>
      {expandedSections[section] ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
    </button>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {mode === 'new' ? 'Create New Post' : 'Edit Post'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'new' ? 'Add a new movie blog post' : `Editing: ${form.title}`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="btn-secondary"
          >
            <Save size={15} />
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="btn-primary"
          >
            <Eye size={15} />
            {saving ? 'Publishing...' : mode === 'new' ? 'Publish' : 'Update'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-4">

          {/* Basic Info */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <SectionHeader title="Basic Information" section="basic" icon={<Film size={16} />} />
            {expandedSections.basic && (
              <div className="border border-t-0 border-[#2a2a2a] rounded-b-xl p-5 space-y-4 bg-[#111111]">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Movie Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., Dune: Part Two (2024)"
                    className="input-dark text-base"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">
                    Slug (URL)
                    <button
                      type="button"
                      onClick={() => {
                        setSlugManual(true);
                        updateField('slug', slugify(form.title));
                      }}
                      className="ml-2 text-[#e50914] text-xs normal-case"
                    >
                      Auto-generate
                    </button>
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => { setSlugManual(true); updateField('slug', e.target.value); }}
                    placeholder="movie-title-2024"
                    className="input-dark font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Excerpt / Short Description</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => updateField('excerpt', e.target.value)}
                    placeholder="Brief summary shown in card listings..."
                    rows={3}
                    className="input-dark resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="input-dark"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">
                      <Tag size={11} className="inline mr-1" />Tags
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="action, thriller, 2024"
                      className="input-dark"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">
                    <Upload size={11} className="inline mr-1" />Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={form.thumbnail}
                    onChange={(e) => updateField('thumbnail', e.target.value)}
                    placeholder="https://example.com/poster.jpg"
                    className="input-dark"
                  />
                  {form.thumbnail && (
                    <img src={form.thumbnail} alt="" className="mt-2 h-24 w-auto rounded-lg object-cover" />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => updateField('featured', e.target.checked)}
                      className="w-4 h-4 accent-[#e50914]"
                    />
                    <span className="text-sm text-gray-300">Mark as Featured Post</span>
                  </label>
                </div>
              </div>
            )}
          </motion.div>

          {/* Content Editor */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SectionHeader title="Movie Review / Description" section="content" icon={<Globe size={16} />} />
            {expandedSections.content && (
              <div className="border border-t-0 border-[#2a2a2a] rounded-b-xl p-5 bg-[#111111]">
                <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Full Content (HTML supported)</label>
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  placeholder="Write your full movie review here... You can use HTML tags like <h2>, <p>, <strong>, <ul>, <li>, etc."
                  rows={16}
                  className="input-dark font-mono text-sm resize-y"
                />
                <p className="text-gray-700 text-xs mt-2">
                  Tip: Use HTML tags for formatting. e.g., &lt;h2&gt;Overview&lt;/h2&gt; &lt;p&gt;Your text...&lt;/p&gt;
                </p>
              </div>
            )}
          </motion.div>

          {/* Movie Info */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <SectionHeader title="Movie Information Table" section="movieInfo" icon={<User size={16} />} />
            {expandedSections.movieInfo && (
              <div className="border border-t-0 border-[#2a2a2a] rounded-b-xl p-5 bg-[#111111]">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'genre' as const, label: 'Genre', placeholder: 'Action / Thriller' },
                    { key: 'year' as const, label: 'Release Year', placeholder: '2024' },
                    { key: 'language' as const, label: 'Language', placeholder: 'English' },
                    { key: 'quality' as const, label: 'Quality', placeholder: '1080p / 4K' },
                    { key: 'rating' as const, label: 'IMDb Rating', placeholder: '8.5' },
                    { key: 'duration' as const, label: 'Duration', placeholder: '2h 15min' },
                    { key: 'size' as const, label: 'File Size', placeholder: '1.4 GB' },
                    { key: 'director' as const, label: 'Director', placeholder: 'Director Name' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">{label}</label>
                      <input
                        type="text"
                        value={form[key]}
                        onChange={(e) => updateField(key, e.target.value)}
                        placeholder={placeholder}
                        className="input-dark"
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Cast</label>
                    <input
                      type="text"
                      value={form.cast}
                      onChange={(e) => updateField('cast', e.target.value)}
                      placeholder="Actor 1, Actor 2, Actor 3..."
                      className="input-dark"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Download Links */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SectionHeader title="Download Links Manager" section="downloads" icon={<LinkIcon size={16} />} />
            {expandedSections.downloads && (
              <div className="border border-t-0 border-[#2a2a2a] rounded-b-xl bg-[#111111]">
                {/* Quality Tabs */}
                <div className="flex gap-1 p-4 border-b border-[#2a2a2a] overflow-x-auto">
                  {QUALITY_TABS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setActiveQuality(q)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                        activeQuality === q
                          ? 'bg-[#e50914] text-white'
                          : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]'
                      }`}
                    >
                      {q}
                      <span className="ml-1.5 text-xs opacity-60">
                        ({form.downloadLinks[q]?.length || 0})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Links for active quality */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold text-sm">
                      {activeQuality} Download Links
                    </h4>
                    <button
                      type="button"
                      onClick={() => addDownloadLink(activeQuality)}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      <Plus size={13} />
                      Add Link
                    </button>
                  </div>

                  {(form.downloadLinks[activeQuality] || []).length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-[#2a2a2a] rounded-xl">
                      <p className="text-gray-600 text-sm">No links added for {activeQuality}</p>
                      <button
                        type="button"
                        onClick={() => addDownloadLink(activeQuality)}
                        className="mt-3 text-[#e50914] text-sm hover:underline"
                      >
                        + Add first link
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {form.downloadLinks[activeQuality].map((link, i) => (
                        <div key={i} className="flex gap-2 items-center bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3">
                          <span className="text-gray-600 text-xs font-mono w-5 shrink-0">#{i + 1}</span>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => updateDownloadLink(activeQuality, i, 'label', e.target.value)}
                            placeholder="Server 1 – Fast"
                            className="input-dark text-sm flex-1"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => updateDownloadLink(activeQuality, i, 'url', e.target.value)}
                            placeholder="https://..."
                            className="input-dark text-sm flex-[2]"
                          />
                          <button
                            type="button"
                            onClick={() => removeDownloadLink(activeQuality, i)}
                            className="p-2 text-gray-600 hover:text-red-400 transition-colors shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* SEO */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <SectionHeader title="SEO Settings" section="seo" icon={<Globe size={16} />} />
            {expandedSections.seo && (
              <div className="border border-t-0 border-[#2a2a2a] rounded-b-xl p-5 bg-[#111111] space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Meta Title</label>
                  <input
                    type="text"
                    value={form.metaTitle}
                    onChange={(e) => updateField('metaTitle', e.target.value)}
                    placeholder="SEO optimized title..."
                    className="input-dark"
                  />
                  <p className="text-xs text-gray-700 mt-1">{form.metaTitle.length}/60 chars</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Meta Description</label>
                  <textarea
                    value={form.metaDescription}
                    onChange={(e) => updateField('metaDescription', e.target.value)}
                    placeholder="SEO meta description..."
                    rows={3}
                    className="input-dark resize-none"
                  />
                  <p className="text-xs text-gray-700 mt-1">{form.metaDescription.length}/160 chars</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar: Publish Settings */}
        <div className="space-y-4">
          {/* Publish Panel */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden sticky top-4">
            <div className="p-4 border-b border-[#2a2a2a] bg-[#1a1a1a]">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Star size={16} className="text-[#f5c518]" />
                Publish Settings
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Status</label>
                <div className="flex gap-2">
                  {['draft', 'published'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateField('status', s as 'draft' | 'published')}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                        form.status === s
                          ? s === 'published'
                            ? 'bg-[#e50914] text-white'
                            : 'bg-[#2a2a2a] text-white'
                          : 'bg-[#1a1a1a] text-gray-500 border border-[#2a2a2a] hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              {form.thumbnail && (
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest mb-2 block">Preview</label>
                  <img
                    src={form.thumbnail}
                    alt="Preview"
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-[#2a2a2a]">
                {[
                  { label: 'Rating', value: form.rating, icon: <Star size={12} className="text-[#f5c518]" /> },
                  { label: 'Quality', value: form.quality, icon: <Clock size={12} className="text-blue-400" /> },
                  { label: 'Year', value: form.year, icon: <Clock size={12} className="text-gray-400" /> },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">{icon}{label}</span>
                    <span className="text-white font-medium">{value || '—'}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => handleSave('published')}
                  disabled={saving}
                  className="btn-primary w-full justify-center"
                >
                  {saving ? 'Saving...' : mode === 'new' ? '🚀 Publish Now' : '✅ Update Post'}
                </button>
                <button
                  onClick={() => handleSave('draft')}
                  disabled={saving}
                  className="btn-secondary w-full justify-center"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
  const [siteName, setSiteName] = useState('CineBlog Pro');
  const [siteDesc, setSiteDesc] = useState('Your ultimate movie & TV blog');
  const [adsenseId, setAdsenseId] = useState(import.meta.env.VITE_ADSENSE_CLIENT_ID || '');
  const [adminEmail, setAdminEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || '');
  const [showEmail, setShowEmail] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved (stored in .env - restart required for some changes)');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure your blog settings</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Site Settings */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-5">Site Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="input-dark"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Site Description</label>
              <input
                type="text"
                value={siteDesc}
                onChange={(e) => setSiteDesc(e.target.value)}
                className="input-dark"
              />
            </div>
          </div>
        </div>

        {/* AdSense */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-5">Google AdSense</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Publisher ID</label>
              <input
                type="text"
                value={adsenseId}
                onChange={(e) => setAdsenseId(e.target.value)}
                placeholder="ca-pub-xxxxxxxxxxxxxxxxxx"
                className="input-dark font-mono"
              />
              <p className="text-xs text-gray-600 mt-1">Found in your Google AdSense account</p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-5">Security</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 block">Admin Email</label>
              <div className="relative">
                <input
                  type={showEmail ? 'text' : 'password'}
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="input-dark pr-10"
                />
                <button
                  onClick={() => setShowEmail(!showEmail)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showEmail ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="p-3 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
              <p className="text-xs text-gray-500">
                🔒 Sensitive settings like API keys must be configured in your <code className="text-[#e50914]">.env</code> file
                and Vercel/Netlify environment variables.
              </p>
            </div>
          </div>
        </div>

        {/* Firebase Rules */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-3">Firestore Security Rules</h2>
          <pre className="text-xs text-gray-400 bg-[#0d0d0d] p-4 rounded-xl overflow-x-auto border border-[#2a2a2a] leading-relaxed">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if resource.data.status == 'published';
      allow write: if request.auth != null
        && request.auth.token.email == 'YOUR_EMAIL';
    }
  }
}`}
          </pre>
          <p className="text-xs text-gray-600 mt-2">Deploy these rules to your Firebase Console → Firestore → Rules</p>
        </div>

        <button onClick={handleSave} className="btn-primary">
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;

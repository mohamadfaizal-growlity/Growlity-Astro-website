import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export default function SettingsView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteTitle: 'Growlity',
    tagline: 'Growth with Sustainability',
    siteLogo: '',
    siteIcon: '',
    wpAddress: 'https://growlity.com',
    siteAddress: 'https://growlity.com',
    adminEmail: 'admin@growlity.com',
    membership: false,
    defaultRole: 'Subscriber',
    siteLanguage: 'en_US',
    timezone: 'UTC+5:30',
    dateFormat: 'F j, Y',
    timeFormat: 'g:i a',
    weekStartsOn: 'Monday',
    wpsLoginUrl: 'https://growlity.com/woven-saloon',
    wpsRedirectionUrl: 'https://growlity.com/404'
  });

  useEffect(() => {
    fetch('/api/sitepins/settings')
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSettings(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/sitepins/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (e) {
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-normal text-slate-800">General Settings</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-1.5 rounded text-sm transition-colors"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6 text-sm text-[#3c434a]">
        
        {/* Site Title */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Site Title</div>
          <div className="sm:w-2/3">
            <input 
              type="text" 
              name="siteTitle"
              value={settings.siteTitle} 
              onChange={handleChange}
              className="w-full max-w-md px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Tagline</div>
          <div className="sm:w-2/3">
            <input 
              type="text" 
              name="tagline"
              value={settings.tagline} 
              onChange={handleChange}
              className="w-full max-w-md px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            />
            <p className="text-[#646970] mt-1 text-xs">In a few words, explain what this site is about. Example: "Just another WordPress site."</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-3 text-sm font-semibold text-[#1d2327]">Site Logo</div>
          <div className="col-span-9">
            <div className="mb-3">
              <div className="w-48 h-24 border border-[#dcdcde] bg-[#f0f0f1] flex items-center justify-center rounded">
                {settings.siteLogo ? (
                  <img src={settings.siteLogo} alt="Site Logo" className="max-w-full max-h-full object-contain p-2" />
                ) : (
                  <div className="text-[#646970] font-bold text-3xl">Logo</div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="siteLogoUpload" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setSettings(prev => ({ ...prev, siteLogo: reader.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }} 
              />
              <button 
                type="button"
                onClick={() => document.getElementById('siteLogoUpload')?.click()}
                className="px-3 py-1 border border-[#2271b1] text-[#2271b1] hover:bg-[#f6f7f7] rounded text-sm transition-colors"
              >
                Upload Site Logo
              </button>
              <button 
                type="button"
                onClick={() => setSettings(prev => ({ ...prev, siteLogo: "" }))}
                className="px-3 py-1 border border-[#d63638] text-[#d63638] hover:bg-[#f6f7f7] rounded text-sm transition-colors"
              >
                Remove Site Logo
              </button>
            </div>
            <p className="text-[#646970] mt-2 text-xs">The Site Logo is used in the header of your website and the dashboard.</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-3 text-sm font-semibold text-[#1d2327]">Site Icon</div>
          <div className="col-span-9">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-24 h-24 bg-slate-100 border border-slate-300 rounded flex items-center justify-center overflow-hidden">
                {settings.siteIcon ? (
                  <img src={settings.siteIcon} alt="Site Icon" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl text-emerald-600 font-bold">G</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="siteIconUpload" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setSettings(prev => ({ ...prev, siteIcon: reader.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }} 
              />
              <button 
                type="button"
                onClick={() => document.getElementById('siteIconUpload')?.click()}
                className="px-3 py-1 border border-[#2271b1] text-[#2271b1] hover:bg-[#f6f7f7] rounded text-sm transition-colors"
              >
                Upload Site Icon
              </button>
              <button 
                type="button"
                onClick={() => setSettings(prev => ({ ...prev, siteIcon: "" }))}
                className="px-3 py-1 border border-[#d63638] text-[#d63638] hover:bg-[#f6f7f7] rounded text-sm transition-colors"
              >
                Remove Site Icon
              </button>
            </div>
            <p className="text-[#646970] mt-2 text-xs">The Site Icon is what you see in browser tabs, bookmark bars, and within the WordPress mobile apps. It should be square and at least <code>512</code> by <code>512</code> pixels.</p>
          </div>
        </div>

        {/* WordPress Address */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">WordPress Address (URL)</div>
          <div className="sm:w-2/3">
            <input 
              type="url" 
              name="wpAddress"
              value={settings.wpAddress} 
              onChange={handleChange}
              className="w-full max-w-md px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Site Address */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Site Address (URL)</div>
          <div className="sm:w-2/3">
            <input 
              type="url" 
              name="siteAddress"
              value={settings.siteAddress} 
              onChange={handleChange}
              className="w-full max-w-md px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            />
            <p className="text-[#646970] mt-1 text-xs">Enter the same address here unless you <a href="#" className="text-[#2271b1] underline">want your site home page to be different from your WordPress installation directory.</a></p>
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Administration Email Address</div>
          <div className="sm:w-2/3">
            <input 
              type="email" 
              name="adminEmail"
              value={settings.adminEmail} 
              onChange={handleChange}
              className="w-full max-w-md px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            />
            <p className="text-[#646970] mt-1 text-xs">This address is used for admin purposes. If you change this, an email will be sent to your new address to confirm it. The new address will not become active until confirmed.</p>
          </div>
        </div>

        {/* Membership */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Membership</div>
          <div className="sm:w-2/3 flex items-center gap-2">
            <input 
              type="checkbox" 
              name="membership"
              id="membership"
              checked={settings.membership} 
              onChange={handleChange}
              className="w-4 h-4 border-[#8c8f94] rounded focus:ring-1 focus:ring-[#2271b1]"
            />
            <label htmlFor="membership">Anyone can register</label>
          </div>
        </div>

        {/* Default Role */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">New User Default Role</div>
          <div className="sm:w-2/3">
            <select 
              name="defaultRole"
              value={settings.defaultRole} 
              onChange={handleChange}
              className="max-w-xs px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            >
              <option value="Subscriber">Subscriber</option>
              <option value="Contributor">Contributor</option>
              <option value="Author">Author</option>
              <option value="Editor">Editor</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>
        </div>

        {/* Site Language */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Site Language</div>
          <div className="sm:w-2/3">
            <select 
              name="siteLanguage"
              value={settings.siteLanguage} 
              onChange={handleChange}
              className="max-w-xs px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            >
              <option value="en_US">English (United States)</option>
              <option value="en_GB">English (UK)</option>
              <option value="es_ES">Español</option>
            </select>
          </div>
        </div>

        {/* Timezone */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Timezone</div>
          <div className="sm:w-2/3">
            <select 
              name="timezone"
              value={settings.timezone} 
              onChange={handleChange}
              className="max-w-xs px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            >
              <option value="UTC">UTC</option>
              <option value="UTC+5:30">UTC+5:30</option>
              <option value="America/New_York">America/New_York</option>
            </select>
            <p className="text-[#646970] mt-1 text-xs">Choose either a city in the same timezone as you or a UTC (Coordinated Universal Time) time offset.</p>
          </div>
        </div>

        {/* Date Format */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Date Format</div>
          <div className="sm:w-2/3 space-y-2">
            {[
              { label: 'June 20, 2026', value: 'F j, Y' },
              { label: '2026-06-20', value: 'Y-m-d' },
              { label: '06/20/2026', value: 'm/d/Y' },
              { label: '20/06/2026', value: 'd/m/Y' }
            ].map(fmt => (
              <label key={fmt.value} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="dateFormat" 
                  value={fmt.value} 
                  checked={settings.dateFormat === fmt.value}
                  onChange={handleChange}
                  className="text-[#2271b1] focus:ring-[#2271b1]"
                />
                <span className="min-w-[120px] inline-block">{fmt.label}</span>
                <code className="text-[#646970] bg-slate-100 px-1 rounded">{fmt.value}</code>
              </label>
            ))}
          </div>
        </div>

        {/* Time Format */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/3 font-semibold pt-1">Time Format</div>
          <div className="sm:w-2/3 space-y-2">
            {[
              { label: '2:42 pm', value: 'g:i a' },
              { label: '2:42 PM', value: 'g:i A' },
              { label: '14:42', value: 'H:i' }
            ].map(fmt => (
              <label key={fmt.value} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="timeFormat" 
                  value={fmt.value} 
                  checked={settings.timeFormat === fmt.value}
                  onChange={handleChange}
                  className="text-[#2271b1] focus:ring-[#2271b1]"
                />
                <span className="min-w-[120px] inline-block">{fmt.label}</span>
                <code className="text-[#646970] bg-slate-100 px-1 rounded">{fmt.value}</code>
              </label>
            ))}
          </div>
        </div>

        {/* Week Starts On */}
        <div className="flex flex-col sm:flex-row gap-4 border-b border-slate-200 pb-8">
          <div className="sm:w-1/3 font-semibold pt-1">Week Starts On</div>
          <div className="sm:w-2/3">
            <select 
              name="weekStartsOn"
              value={settings.weekStartsOn} 
              onChange={handleChange}
              className="max-w-xs px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
            </select>
          </div>
        </div>

        {/* WPS Hide Login */}
        <div className="pt-4">
          <h2 className="text-xl font-medium text-slate-800 mb-2">WPS Hide Login</h2>
          <p className="text-[#646970] mb-6 text-xs">
            Need help? Try the <a href="#" className="text-[#2271b1] underline">support forum</a>. This plugin is kindly brought to you by WPServeur...
          </p>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/3 font-semibold pt-1">Login url</div>
              <div className="sm:w-2/3">
                <div className="flex items-center gap-2">
                  <span className="text-[#646970] bg-slate-100 border border-[#8c8f94] px-3 py-1.5 rounded text-sm">https://growlity.com/</span>
                  <input 
                    type="text" 
                    name="wpsLoginUrl"
                    value={settings.wpsLoginUrl.replace('https://growlity.com/', '')} 
                    onChange={(e) => setSettings(prev => ({...prev, wpsLoginUrl: 'https://growlity.com/' + e.target.value}))}
                    className="flex-1 max-w-[200px] px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
                  />
                </div>
                <p className="text-[#646970] mt-1 text-xs">Protect your website by changing the login URL and preventing access to the wp-login.php page and the wp-admin directory to non-connected people.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/3 font-semibold pt-1">Redirection url</div>
              <div className="sm:w-2/3">
                <div className="flex items-center gap-2">
                  <span className="text-[#646970] bg-slate-100 border border-[#8c8f94] px-3 py-1.5 rounded text-sm">https://growlity.com/</span>
                  <input 
                    type="text" 
                    name="wpsRedirectionUrl"
                    value={settings.wpsRedirectionUrl.replace('https://growlity.com/', '')} 
                    onChange={(e) => setSettings(prev => ({...prev, wpsRedirectionUrl: 'https://growlity.com/' + e.target.value}))}
                    className="flex-1 max-w-[200px] px-3 py-1.5 border border-[#8c8f94] rounded focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] outline-none shadow-sm"
                  />
                </div>
                <p className="text-[#646970] mt-1 text-xs">Redirect URL when someone tries to access the wp-login.php page and the wp-admin directory while not logged in.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="pt-8">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-2 rounded font-medium transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

      </div>
    </div>
  );
}

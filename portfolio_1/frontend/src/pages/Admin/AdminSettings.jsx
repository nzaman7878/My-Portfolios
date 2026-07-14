import { useState, useEffect, useRef } from 'react';
import { useSettings, useUpdateSettings } from '../../hooks/useSettings';
import { apiClient } from '../../api/client';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    hero: { statusTag: '', title: '', subtitle: '', resumeUrl: '' },
    about: { quote: '', paragraphs: '', profileImage: '' },
    philosophy: { mainQuote: '', subtext: '' },
    socials: { email: '', github: '', linkedin: '' }
  });

  const { data: settings, isLoading } = useSettings();

  useEffect(() => {
    if (settings) {
      setFormData({
        hero: settings.hero || {},
        about: {
          ...settings.about,
          paragraphs: settings.about?.paragraphs?.join('\n\n') || ''
        },
        philosophy: settings.philosophy || {},
        socials: settings.socials || {}
      });
    }
  }, [settings]);

  const updateSettingsMutation = useUpdateSettings();

  const handleFormSubmit = () => {
    const dataToSubmit = {
      ...formData,
      about: {
        ...formData.about,
        paragraphs: formData.about.paragraphs.split('\n\n').filter(p => p.trim() !== '')
      }
    };
    updateSettingsMutation.mutate(dataToSubmit);
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataToUpload = new FormData();
    formDataToUpload.append('image', file);

    try {
      setIsUploading(true);
      const res = await apiClient.upload('/api/upload', formDataToUpload);
      if (res.success) {
        handleChange('about', 'profileImage', res.url);
        toast.success('Image uploaded successfully');
      }
    } catch (err) {
      toast.error(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  if (isLoading) return <div className="text-[var(--color-secondary-text)]">Loading settings...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-[var(--color-border-custom)] pb-4">
        <h2 className="text-3xl font-serif font-bold">Global Settings</h2>
        <button 
          onClick={handleSubmit}
          disabled={updateSettingsMutation.isPending}
          className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-background)] font-medium rounded hover:opacity-90 disabled:opacity-50"
        >
          {updateSettingsMutation.isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-12">
        {/* HERO SECTION */}
        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-[var(--color-accent)]">Hero Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Status Tag</label>
              <input type="text" value={formData.hero.statusTag} onChange={(e) => handleChange('hero', 'statusTag', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Resume URL (PDF Link)</label>
              <input type="text" value={formData.hero.resumeUrl} onChange={(e) => handleChange('hero', 'resumeUrl', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Main Title</label>
            <input type="text" value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Subtitle</label>
            <textarea rows="4" value={formData.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-[var(--color-accent)]">About Section</h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Profile Image</label>
            <div className="flex items-center gap-4">
              {formData.about.profileImage && (
                <div className="relative w-16 h-16 rounded overflow-hidden border border-[var(--color-border-custom)]">
                  <img src={formData.about.profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => handleChange('about', 'profileImage', '')} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl text-xs leading-none hover:bg-red-600">&times;</button>
                </div>
              )}
              <div className="flex-1">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} disabled={isUploading} className="block w-full text-sm text-[var(--color-secondary-text)] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-surface)] file:text-[var(--color-primary-text)] hover:file:bg-[var(--color-border-custom)] border-thin p-2 rounded" />
                {isUploading && <span className="text-xs text-[var(--color-accent)] mt-1 block">Uploading image...</span>}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Blockquote</label>
            <input type="text" value={formData.about.quote} onChange={(e) => handleChange('about', 'quote', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Paragraphs (Separate by double enter)</label>
            <textarea rows="8" value={formData.about.paragraphs} onChange={(e) => handleChange('about', 'paragraphs', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-[var(--color-accent)]">Philosophy Section</h3>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Main Quote</label>
            <textarea rows="3" value={formData.philosophy.mainQuote} onChange={(e) => handleChange('philosophy', 'mainQuote', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Subtext</label>
            <input type="text" value={formData.philosophy.subtext} onChange={(e) => handleChange('philosophy', 'subtext', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
          </div>
        </section>

        {/* SOCIALS & CONTACT */}
        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-[var(--color-accent)]">Socials & Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Contact Email</label>
              <input type="email" value={formData.socials.email} onChange={(e) => handleChange('socials', 'email', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">GitHub URL</label>
              <input type="url" value={formData.socials.github} onChange={(e) => handleChange('socials', 'github', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">LinkedIn URL</label>
              <input type="url" value={formData.socials.linkedin} onChange={(e) => handleChange('socials', 'linkedin', e.target.value)} className="bg-[var(--color-surface)] border-thin p-2 rounded text-sm" />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

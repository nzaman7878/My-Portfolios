import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, CheckCircle2, Circle, MailOpen, AlertCircle, Sparkles, 
  Layers, GraduationCap, Briefcase, Mail, BarChart3, Settings, ShieldCheck, 
  Terminal, Server, Code, BookmarkPlus, Ban, Tag, X, FileEdit
} from 'lucide-react';
import { Project, Education, Experience, ContactMessage, SkillCategory, PortfolioStats, SiteSettings as SiteSettingsType } from '../types.js';

interface AdminDashboardProps {
  isAdminLoggedIn: boolean;
  onLoginSuccess: (username: string) => void;
  onLogout: () => void;
  projects: Project[];
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  stats: PortfolioStats;
  siteSettings: SiteSettingsType | null;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isAdminLoggedIn,
  onLoginSuccess,
  onLogout,
  projects,
  education,
  experience,
  skills,
  stats,
  siteSettings,
  onRefreshData
}) => {
  // Login Form States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Sub-navigation Tabs
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'education' | 'experience' | 'skills' | 'messages' | 'settings'>('analytics');

  // Unified notifications
  const [successNotif, setSuccessNotif] = useState('');
  const [errorNotif, setErrorNotif] = useState('');

  // Messages State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMsgList, setLoadingMsgList] = useState(false);

  // Modal / Editing configurations
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    category: 'MERN Stack',
    technologies: '',
    githubLink: '',
    liveLink: '',
    image: '',
    features: ''
  });

  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [eduForm, setEduForm] = useState({
    degree: '',
    institution: '',
    duration: '',
    cgpa: '',
    description: ''
  });

  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [expForm, setExpForm] = useState({
    company: '',
    role: '',
    duration: '',
    description: '',
    technologies: ''
  });

  // Global Settings Form
  const [settingsForm, setSettingsForm] = useState<SiteSettingsType | null>(null);

  useEffect(() => {
    if (siteSettings) {
      setSettingsForm(siteSettings);
    }
  }, [siteSettings]);

  // Fetch administrator messages if token exists
  const fetchMessages = async () => {
    if (!isAdminLoggedIn) return;
    setLoadingMsgList(true);
    try {
      const res = await fetch('/api/contact', {
        
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMsgList(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchMessages();
    }
  }, [isAdminLoggedIn]);

  // Handle Sign In Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      setLoginError('Complete both username and password.');
      return;
    }
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.username);
        setSuccessNotif('Session started successfully.');
        setUsernameInput('');
        setPasswordInput('');
      } else {
        setLoginError(data.error || 'Authentication parameters mismatch.');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Cognitive client timeout. Is the server online?');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Helper trigger action notifications
  const triggerNotification = (success: string, error: string) => {
    if (success) {
      setSuccessNotif(success);
      setTimeout(() => setSuccessNotif(''), 3000);
    }
    if (error) {
      setErrorNotif(error);
      setTimeout(() => setErrorNotif(''), 3000);
    }
    onRefreshData();
  };

  // ===================================
  // PROJECTS MANAGEMENT HANDLERS
  // ===================================
  const handleOpenAddProject = () => {
    setProjectForm({
      name: '',
      description: '',
      category: 'Generative AI',
      technologies: 'React.js, Node.js, Express.js, MongoDB',
      githubLink: '',
      liveLink: '',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      features: 'High semantic query match, RAG continuous flows, Adaptive components'
    });
    setIsAddingProject(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      name: proj.name,
      description: proj.description,
      category: proj.category,
      technologies: proj.technologies.join(', '),
      githubLink: proj.githubLink,
      liveLink: proj.liveLink,
      image: proj.image,
      features: proj.features ? proj.features.join(', ') : ''
    });
  };

  const handleSaveProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(s => s.trim()).filter(Boolean),
      features: projectForm.features.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      let res;
      if (editingProject) {
        // Edit Operation
        res = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
      } else {
        // Create Operation
        res = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        triggerNotification('Project records updated successfully.', '');
        setIsAddingProject(false);
        setEditingProject(null);
      } else {
        const errData = await res.json();
        triggerNotification('', errData.error || 'Project save rejected.');
      }
    } catch (err) {
      console.error(err);
      triggerNotification('', 'Network sync error.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Verify: Are you absolutely sure you want to permanently delete this project record?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'});
      if (res.ok) {
        triggerNotification('Project record deleted.', '');
      } else {
        triggerNotification('', 'Delete request failed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===================================
  // EDUCATION MANAGEMENT HANDLERS
  // ===================================
  const handleOpenAddEdu = () => {
    setEduForm({ degree: '', institution: '', duration: '', cgpa: '', description: '' });
    setIsAddingEducation(true);
  };

  const handleSaveEduSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editingEducation) {
        res = await fetch(`/api/education/${editingEducation.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(eduForm)
        });
      } else {
        res = await fetch('/api/education', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(eduForm)
        });
      }

      if (res.ok) {
        triggerNotification('Educational record stored.', '');
        setIsAddingEducation(false);
        setEditingEducation(null);
      } else {
        triggerNotification('', 'Save action failed.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (!window.confirm("Verify: Delete this educational history?")) return;
    try {
      const res = await fetch(`/api/education/${id}`, {
        method: 'DELETE'});
      if (res.ok) triggerNotification('Educational history file destroyed.', '');
    } catch (err) {
      console.error(err);
    }
  };

  // ===================================
  // EXPERIENCE MANAGEMENT HANDLERS
  // ===================================
  const handleOpenAddExp = () => {
    setExpForm({ company: '', role: '', duration: '', description: '', technologies: '' });
    setIsAddingExperience(true);
  };

  const handleSaveExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...expForm,
      technologies: expForm.technologies.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      let res;
      if (editingExperience) {
        res = await fetch(`/api/experience/${editingExperience.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/experience', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        triggerNotification('Experience operational record indexed.', '');
        setIsAddingExperience(false);
        setEditingExperience(null);
      } else {
        triggerNotification('', 'Experience save failure.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!window.confirm("Verify: Delete career experience listing?")) return;
    try {
      const res = await fetch(`/api/experience/${id}`, {
        method: 'DELETE'});
      if (res.ok) triggerNotification('Experience listing deleted.', '');
    } catch (err) {
      console.error(err);
    }
  };

  // ===================================
  // SKILLS MANAGEMENT CHIP MODIFIERS
  // ===================================
  const handleUpdateSkillsCategory = async (catId: string, skillsArray: string[]) => {
    try {
      const res = await fetch(`/api/skills/${catId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify({ skills: skillsArray })
      });
      if (res.ok) {
        triggerNotification('Skills inventory category altered.', '');
      } else {
        triggerNotification('', 'Skills modification rejected.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkillTag = (catId: string, currentList: string[]) => {
    const freshTag = window.prompt("Enter new skill name to append to list:");
    if (!freshTag || !freshTag.trim()) return;
    if (currentList.some(s => s.toLowerCase() === freshTag.toLowerCase().trim())) {
      alert("Skill tag already exists in index.");
      return;
    }
    const newList = [...currentList, freshTag.trim()];
    handleUpdateSkillsCategory(catId, newList);
  };

  const handleRemoveSkillTag = (catId: string, currentList: string[], tagToRemove: string) => {
    const newList = currentList.filter(t => t !== tagToRemove);
    handleUpdateSkillsCategory(catId, newList);
  };

  // ===================================
  // MESSAGES INBOX HANDLERS
  // ===================================
  const handleMarkMessageRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/contact/${id}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify({ read: !currentStatus })
      });
      if (res.ok) {
        fetchMessages();
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Permanently erase this client contact message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'});
      if (res.ok) {
        fetchMessages();
        triggerNotification('Inbox message deleted.', '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ===================================
  // SETTINGS HANDLERS
  // ===================================
  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsForm) return;

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        triggerNotification('Site configuration synchronized successfully.', '');
      } else {
        triggerNotification('', 'Failed to synchronize site settings.');
      }
    } catch (err) {
      console.error(err);
      triggerNotification('', 'Network sync error.');
    }
  };

  const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({});

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, category: 'profile' | 'hero' | 'about') => {
    const file = e.target.files?.[0];
    if (!file || !settingsForm) return;

    const uploadKey = `${category}-${fieldName}`;
    setIsUploading(prev => ({ ...prev, [uploadKey]: true }));
    const formData = new FormData();
    
    // Use the actual fieldName to help the backend organize uploads
    // If it's a resumeUrl, let's pass 'resume' so the backend knows
    const formFieldName = fieldName === 'resumeUrl' ? 'resume' : fieldName;
    formData.append('image', file); // Multer is looking for 'image' in routes right now
    formData.append('categoryField', formFieldName); // We can send extra data if we want
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          // Note: Do not set Content-Type header when using FormData. The browser sets it with boundary.
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setSettingsForm({
          ...settingsForm,
          [category]: {
            ...settingsForm[category],
            [fieldName]: data.url
          }
        });
        triggerNotification('Image uploaded to Cloudinary successfully.', '');
      } else {
        triggerNotification('', data.message || 'File upload failed.');
      }
    } catch (err) {
      console.error(err);
      triggerNotification('', 'Network error during upload.');
    } finally {
      setIsUploading(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  // ==========================================
  // UNRESTRICTED: LOGIN card if token is null
  // ==========================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-[#070709]">
        <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#121215] border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-xl text-left">
          <div className="text-center">
            <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold mx-auto shadow-md">
              <ShieldCheck size={24} />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              Administrative Sign In
            </h2>
            <p className="mt-2 text-xs text-neutral-500">
              Secured control system. Logs, project updates, and client inboxes.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleLoginSubmit}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">Username</label>
                <input 
                  type="text" 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="admin"
                  className="w-full text-xs px-3 py-2.5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="admin123"
                  className="w-full text-xs px-3 py-2.5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl focus:outline-none"
                  required
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-650 dark:text-red-400 text-xs font-semibold rounded-xl flex items-center space-x-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition active:scale-98"
              >
                {isLoggingIn ? 'Verifying session...' : 'Sign In Now'}
              </button>
            </div>
            
            <div className="border-t border-neutral-100 dark:border-neutral-850 pt-4 text-center">
              <span className="text-[10px] text-neutral-400 block font-medium">Default Credentials: admin / admin123</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD CONTROL PANEL (JWT LOGIN ACTIVE)
  // ==========================================
  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-50 dark:bg-neutral-950 text-left text-xs select-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Action Toast Alerts */}
        <div className="space-y-2 mb-6">
          {successNotif && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-250 rounded-xl font-semibold flex items-center space-x-2">
              <CheckCircle2 size={14} />
              <span>{successNotif}</span>
            </div>
          )}
          {errorNotif && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 rounded-xl font-semibold flex items-center space-x-2">
              <AlertCircle size={14} />
              <span>{errorNotif}</span>
            </div>
          )}
        </div>

        {/* Dashboard Title & Quick Header info */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center space-x-1.5">
                <ShieldCheck size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span>Administration Dashboard Terminal</span>
              </h1>
            </div>
            <p className="text-neutral-500 mt-1 dark:text-neutral-400">
              Welcome back, administrator. Manage portfolio contents, and overview analytical stats logs.
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onLogout}
              className="px-3.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 rounded-xl text-neutral-600 dark:text-neutral-300 font-bold transition select-none"
            >
              Logout Session
            </button>
          </div>
        </div>

        {/* Control grid mapping Sidebar Tabs -> Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar controls */}
          <div className="lg:col-span-3 space-y-2">
            <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-1.5">
              <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wide px-3 block mb-2">Sections Control</span>
              
              <button
                onClick={() => { setActiveTab('analytics'); setEditingProject(null); setIsAddingProject(false); }}
                className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center space-x-2.5 transition active:scale-98 ${
                  activeTab === 'analytics' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950/50'
                }`}
              >
                <BarChart3 size={15} />
                <span>Core Analytics</span>
              </button>

              <button
                onClick={() => { setActiveTab('projects'); setEditingProject(null); setIsAddingProject(false); }}
                className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center space-x-2.5 transition active:scale-98 ${
                  activeTab === 'projects' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950/50'
                }`}
              >
                <Layers size={15} />
                <span>Showcase Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('education'); setEditingEducation(null); setIsAddingEducation(false); }}
                className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center space-x-2.5 transition active:scale-98 ${
                  activeTab === 'education' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950/50'
                }`}
              >
                <GraduationCap size={15} />
                <span>Education Timelines ({education.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('experience'); setEditingExperience(null); setIsAddingExperience(false); }}
                className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center space-x-2.5 transition active:scale-98 ${
                  activeTab === 'experience' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950/50'
                }`}
              >
                <Briefcase size={15} />
                <span>Experiences ({experience.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('skills'); }}
                className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center space-x-2.5 transition active:scale-98 ${
                  activeTab === 'skills' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950/50'
                }`}
              >
                <Code size={15} />
                <span>Skills Matrix Config</span>
              </button>

              <button
                onClick={() => { setActiveTab('messages'); }}
                className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center space-x-2.5 transition active:scale-98 relative ${
                  activeTab === 'messages' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950/50'
                }`}
              >
                <Mail size={15} />
                <span>Inbox Messages ({messages.length})</span>
                {messages.some(m => !m.read) && (
                  <span className="absolute right-3.5 top-3 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>

              <button
                onClick={() => { setActiveTab('settings'); }}
                className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center space-x-2.5 transition active:scale-98 ${
                  activeTab === 'settings' 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-950/50'
                }`}
              >
                <Settings size={15} />
                <span>Global Site Config</span>
              </button>
            </div>
          </div>

          {/* Core Panel contents */}
          <div className="lg:col-span-9">
            
            {/* TAB 1: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                
                {/* Visual Stats Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-extrabold uppercase tracking-wide">Total Visitors</span>
                    <p className="text-2xl font-extrabold text-neutral-900 dark:text-indigo-400 font-mono pr-2">{stats.visitors}</p>
                    <span className="text-[10px] text-neutral-400 block pt-1">Logs automatically incremented</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-extrabold uppercase tracking-wide">Project interactions</span>
                    <p className="text-2xl font-extrabold text-neutral-900 dark:text-indigo-400 font-mono pr-2">{stats.projectClicks}</p>
                    <span className="text-[10px] text-neutral-400 block pt-1">Total details clicks counted</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-extrabold uppercase tracking-wide">Likes Received</span>
                    <p className="text-2xl font-extrabold text-neutral-900 dark:text-indigo-400 font-mono pr-2">{stats.likes}</p>
                    <span className="text-[10px] text-neutral-400 block pt-1">Heart reactions submitted</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-extrabold uppercase tracking-wide">Inbox Messages</span>
                    <p className="text-2xl font-extrabold text-neutral-900 dark:text-indigo-400 font-mono pr-2">{stats.messagesReceived}</p>
                    <span className="text-[10px] text-neutral-400 block pt-1">Total contact submissions received</span>
                  </div>
                </div>

                {/* Operations Terminal Logs */}
                <div className="p-6 bg-neutral-900 text-neutral-200 rounded-3xl border border-neutral-800 shadow-md font-mono space-y-3">
                  <div className="flex items-center space-x-2 pb-3 border-b border-neutral-800">
                    <Terminal size={14} className="text-neutral-500" />
                    <span className="text-xs font-bold text-neutral-200">SYSTEM COGNITIVE ENVIRONMENT LOGS</span>
                  </div>
                  <div className="space-y-1.5 leading-relaxed text-[11px] text-left">
                    <p className="text-neutral-500">[2026-06-13T09:24:00] Initializing Express Container multi-stack microservices...</p>
                    <p className="text-emerald-400">[SYSTEM] Connection resolved: Local disk seed database 'db.json' detected.</p>
                    <p className="text-emerald-400">[SYSTEM] Google Gemini API Client connected gracefully: 'gemini-3.5-flash' enabled.</p>
                    <p className="text-cyan-400">[ANALYTICS] Project list indexes validated; {projects.length} showcase projects available.</p>
                    <p className="text-neutral-400">[INBOX] {messages.filter(m => !m.read).length} unread contact submissions waiting in directory.</p>
                    <p className="text-indigo-400">[AUTH] JWT Session Token active; administrative access verified.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wide">Showcase Project Index</h3>
                  {!isAddingProject && !editingProject && (
                    <button
                      onClick={handleOpenAddProject}
                      className="flex items-center space-x-1 px-3.5 py-2 hover:scale-102 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      <Plus size={14} />
                      <span>Create New Project</span>
                    </button>
                  )}
                </div>

                {/* Add/Edit Form Overlay */}
                {(isAddingProject || editingProject) ? (
                  <form onSubmit={handleSaveProjectSubmit} className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {editingProject ? 'Modify Project Attributes' : 'Register New Portfolio Project'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Project Title</label>
                        <input 
                          type="text"
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Stack/Category</label>
                        <select 
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                        >
                          <option value="Generative AI">Generative AI</option>
                          <option value="MERN Stack">MERN Stack</option>
                          <option value="Full Stack">Full Stack</option>
                          <option value="Mobile Development">Mobile Development</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase">Short Description</label>
                      <textarea 
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        rows={3}
                        className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Technologies used (Comma separated)</label>
                        <input 
                          type="text"
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                          placeholder="React, Node, Express, MongoDB"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Dynamic Highlights list (Comma separated)</label>
                        <input 
                          type="text"
                          value={projectForm.features}
                          onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                          placeholder="PDF core parser, Automated ATS Scoring, Vector indices"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">GitHub Link URL</label>
                        <input 
                          type="url"
                          value={projectForm.githubLink}
                          onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Live Demo Link URL</label>
                        <input 
                          type="url"
                          value={projectForm.liveLink}
                          onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase">Banner Image Link URL</label>
                      <input 
                        type="url"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                      />
                    </div>

                    <div className="flex space-x-3 pt-3">
                      <button 
                        type="submit"
                        className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
                      >
                        {editingProject ? 'Update Specs' : 'Deploy Project Record'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { setIsAddingProject(false); setEditingProject(null); }}
                        className="px-4 py-2 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Project listings */
                  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-400 uppercase font-extrabold tracking-wide">
                          <th className="p-4">Project Image/Title</th>
                          <th className="p-4 hidden sm:table-cell">Stack/Category</th>
                          <th className="p-4">Metrics views</th>
                          <th className="p-4 text-center">Settings Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-y-neutral-200 dark:divide-y-neutral-800">
                        {projects.map((proj) => (
                          <tr key={proj.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-950/40">
                            <td className="p-4">
                              <div className="flex items-center space-x-4">
                                <img src={proj.image} alt="" className="h-10 w-16 object-cover rounded-md border border-neutral-200 dark:border-neutral-800 shrink-0" referrerPolicy="no-referrer" />
                                <div>
                                  <span className="font-extrabold text-neutral-800 dark:text-neutral-200 block">{proj.name}</span>
                                  <span className="text-[10px] text-neutral-400 line-clamp-1 max-w-sm">{proj.description}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 hidden sm:table-cell">
                              <span className="inline-block px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-[9px] font-extrabold text-indigo-700 dark:text-indigo-400 rounded-md">
                                {proj.category}
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-neutral-800 dark:text-neutral-300">
                              {proj.views || 0} hits
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <button 
                                  onClick={() => handleOpenEditProject(proj)}
                                  className="p-1.5 hover:bg-indigo-50 dark:hover:bg-neutral-800 text-indigo-600 rounded transition"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProject(proj.id)}
                                  className="p-1.5 hover:bg-rose-50 dark:hover:bg-neutral-800 text-rose-600 rounded transition"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: EDUCATION */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wide">Academic Degree Roadmap</h3>
                  {!isAddingEducation && !editingEducation && (
                    <button
                      onClick={handleOpenAddEdu}
                      className="flex items-center space-x-1 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      <Plus size={14} />
                      <span>Add Degree Milestone</span>
                    </button>
                  )}
                </div>

                {(isAddingEducation || editingEducation) ? (
                  <form onSubmit={handleSaveEduSubmit} className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase">Scholastic Form</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Degree Title</label>
                        <input 
                          type="text"
                          value={eduForm.degree}
                          onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                          placeholder="MSc Information Technology"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Institution Name</label>
                        <input 
                          type="text"
                          value={eduForm.institution}
                          onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Duration Period</label>
                        <input 
                          type="text"
                          value={eduForm.duration}
                          onChange={(e) => setEduForm({ ...eduForm, duration: e.target.value })}
                          placeholder="2024 - 2026"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">CGPA/Percentage Score</label>
                        <input 
                          type="text"
                          value={eduForm.cgpa}
                          onChange={(e) => setEduForm({ ...eduForm, cgpa: e.target.value })}
                          placeholder="9.2 / 10"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase">MileStone details &amp; coursework</label>
                      <textarea 
                        value={eduForm.description}
                        onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
                        rows={3}
                        className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                      />
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition">Submit Info</button>
                      <button type="button" onClick={() => { setIsAddingEducation(false); setEditingEducation(null); }} className="px-4 py-2 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl">Cancel</button>
                    </div>
                  </form>
                ) : (
                  /* list educational timeline files */
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/55 flex justify-between items-center">
                        <div>
                          <span className="font-extrabold text-neutral-850 dark:text-neutral-100 text-sm">{edu.degree}</span>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{edu.institution} | {edu.duration} | CGPA: {edu.cgpa}</p>
                        </div>
                        <div className="flex space-x-1 shrink-0 ml-4">
                          <button 
                            onClick={() => { setEditingEducation(edu); setEduForm(edu); }}
                            className="p-1.5 hover:bg-indigo-50 dark:hover:bg-neutral-800 text-indigo-600 rounded transition"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteEdu(edu.id)}
                            className="p-1.5 hover:bg-rose-50 dark:hover:bg-neutral-800 text-rose-600 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wide">Experience Records Inventory</h3>
                    <span className="text-[10px] text-neutral-400">Current state is kept empty, but can append values right here.</span>
                  </div>
                  {!isAddingExperience && !editingExperience && (
                    <button
                      onClick={handleOpenAddExp}
                      className="flex items-center space-x-1 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      <Plus size={14} />
                      <span>Append Career Experience</span>
                    </button>
                  )}
                </div>

                {(isAddingExperience || editingExperience) ? (
                  <form onSubmit={handleSaveExpSubmit} className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase">Experience form</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Company Name</label>
                        <input 
                          type="text"
                          value={expForm.company}
                          onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Role Title</label>
                        <input 
                          type="text"
                          value={expForm.role}
                          onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                          placeholder="MERN Lead Engineer, GenAI Integrationist"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Duration Period</label>
                        <input 
                          type="text"
                          value={expForm.duration}
                          onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                          placeholder="June 2025 - Present"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-100 rounded-xl animate-fadeIn"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Technologies (comma separated)</label>
                        <input 
                          type="text"
                          value={expForm.technologies}
                          onChange={(e) => setExpForm({ ...expForm, technologies: e.target.value })}
                          placeholder="React.js, Node.js, GCP"
                          className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-100 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase">Operational description &amp; accomplishments</label>
                      <textarea 
                        value={expForm.description}
                        onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                        rows={3}
                        className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-100 rounded-xl"
                      />
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition">Index record</button>
                      <button type="button" onClick={() => { setIsAddingExperience(false); setEditingExperience(null); }} className="px-4 py-2 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl">Cancel</button>
                    </div>
                  </form>
                ) : (
                  /* list records */
                  <div className="space-y-3">
                    {experience.map((exp) => (
                      <div key={exp.id} className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/55 flex justify-between items-center">
                        <div>
                          <span className="font-extrabold text-neutral-800 dark:text-neutral-200 text-sm">{exp.role}</span>
                          <p className="text-[10px] text-neutral-400 mt-0.5">{exp.company} | Duration: {exp.duration}</p>
                        </div>
                        <div className="flex space-x-1 shrink-0 ml-4">
                          <button 
                            onClick={() => { setEditingExperience(exp); setExpForm({ ...exp, technologies: exp.technologies.join(', ') }); }}
                            className="p-1.5 hover:bg-indigo-50 dark:hover:bg-neutral-800 text-indigo-600 rounded transition"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteExp(exp.id)}
                            className="p-1.5 hover:bg-rose-50 dark:hover:bg-neutral-800 text-rose-600 rounded transition"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {experience.length === 0 && (
                      <div className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl">
                        <Briefcase className="mx-auto text-neutral-300 shrink-0 mb-3" size={24} />
                        <span className="text-[11px] uppercase text-neutral-400 font-extrabold block">No custom experience listed on server db.</span>
                        <p className="text-[11px] text-neutral-400/80 mt-1">Click 'Append Career Experience' header above to register professional history logs.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: SKILLS CONFIGURE */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wide">Skills Category Matrices</h3>
                <p className="text-[11px] text-neutral-400">Modify skills catalogs directly by appending or deleting tags.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((category) => (
                    <div key={category.id} className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/55 rounded-2xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/70">
                          <div className="flex items-center space-x-2">
                            <Tag size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                            <span className="font-extrabold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">{category.name}</span>
                          </div>
                          
                          <button 
                            onClick={() => handleAddSkillTag(category.id, category.skills)}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                          >
                            <Plus size={12} />
                            <span>Add Tag</span>
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {category.skills.map((token, sIdx) => (
                            <span 
                              key={sIdx}
                              className="px-2 py-1 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-[10px] font-medium text-neutral-700 dark:text-neutral-300 rounded-lg flex items-center space-x-1 shadow-xs"
                            >
                              <span>{token}</span>
                              <button 
                                onClick={() => handleRemoveSkillTag(category.id, category.skills, token)}
                                className="text-neutral-400 hover:text-rose-600 shrink-0 select-none pl-1"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wide">Client messages inbox logs</h3>
                  <button onClick={fetchMessages} className="text-xs font-bold text-indigo-600 hover:underline">Refresh Inbox</button>
                </div>

                {loadingMsgList ? (
                  <p className="text-center py-6 text-neutral-400 font-semibold animate-pulse">Syncing mailbox channels...</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((m) => (
                      <div 
                        key={m.id} 
                        className={`p-5 rounded-2xl border transition text-left flex flex-col justify-between ${
                          m.read 
                            ? 'bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200/50 dark:border-neutral-850/50' 
                            : 'bg-white dark:bg-neutral-900 border-indigo-200 dark:border-indigo-900 shadow-sm'
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3 gap-2">
                            <div>
                              <span className="font-extrabold text-neutral-800 dark:text-neutral-200 block text-sm">{m.name}</span>
                              <span className="text-[10px] text-neutral-400 font-mono">{m.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] text-neutral-400 font-mono">{new Date(m.createdAt).toLocaleString()}</span>
                              <button
                                onClick={() => handleMarkMessageRead(m.id, m.read)}
                                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition shrink-0"
                              >
                                {m.read ? (
                                  <span className="text-[9px] bg-neutral-100 dark:bg-neutral-950 text-neutral-500 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Read File</span>
                                ) : (
                                  <span className="text-[9px] bg-rose-50 text-rose-600 dark:bg-rose-950/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider animate-pulse">New Mail</span>
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 space-y-1.5">
                            <span className="text-[10px] text-neutral-400 font-bold uppercase block tracking-wider">Subject</span>
                            <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-100">{m.subject}</h4>
                            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-2 whitespace-pre-line border-t border-neutral-100 dark:border-neutral-850">
                              {m.message}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-850">
                          <button 
                            onClick={() => handleDeleteMessage(m.id)}
                            className="flex items-center space-x-1 px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/25 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-600 rounded-xl transition"
                          >
                            <Trash2 size={13} />
                            <span>Delete permanently</span>
                          </button>
                        </div>
                      </div>
                    ))}

                    {messages.length === 0 && (
                      <div className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl">
                        <Mail className="mx-auto text-neutral-300 shrink-0 mb-3" size={24} />
                        <span className="text-[11px] uppercase text-neutral-400 font-extrabold block">No Client Messages Registered.</span>
                        <p className="text-[11px] text-neutral-400/80 mt-1">Send a test message from the public Contact form to verify communication paths.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 7: GLOBAL SETTINGS */}
            {activeTab === 'settings' && settingsForm && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-100 uppercase tracking-wide">Global Site Configuration</h3>
                </div>

                <form onSubmit={handleSaveSettingsSubmit} className="space-y-6">
                  
                  {/* HERO CONFIG */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-2">Hero Section</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Subtitle</label>
                        <input type="text" value={settingsForm.hero.subtitle} onChange={e => setSettingsForm({ ...settingsForm, hero: { ...settingsForm.hero, subtitle: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Title</label>
                        <input type="text" value={settingsForm.hero.title} onChange={e => setSettingsForm({ ...settingsForm, hero: { ...settingsForm.hero, title: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase">Short Description</label>
                      <input type="text" value={settingsForm.hero.description} onChange={e => setSettingsForm({ ...settingsForm, hero: { ...settingsForm.hero, description: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase">Long Description</label>
                      <textarea rows={3} value={settingsForm.hero.longDescription} onChange={e => setSettingsForm({ ...settingsForm, hero: { ...settingsForm.hero, longDescription: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase flex justify-between">
                          <span>Resume PDF Upload</span>
                          {isUploading['hero-resume'] && <span className="text-indigo-500">Uploading...</span>}
                        </label>
                        <input type="file" accept="application/pdf" onChange={e => handleFileUpload(e, 'resumeUrl', 'hero')} className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Resume PDF URL (Fallback)</label>
                        <input type="url" value={settingsForm.hero.resumeUrl} onChange={e => setSettingsForm({ ...settingsForm, hero: { ...settingsForm.hero, resumeUrl: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                    </div>
                  </div>

                  {/* PROFILE CONFIG */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-2">Profile Widget</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Name</label>
                        <input type="text" value={settingsForm.profile.name} onChange={e => setSettingsForm({ ...settingsForm, profile: { ...settingsForm.profile, name: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Location Text</label>
                        <input type="text" value={settingsForm.profile.location} onChange={e => setSettingsForm({ ...settingsForm, profile: { ...settingsForm.profile, location: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase flex justify-between">
                          <span>Avatar Image Upload</span>
                          {isUploading['profile-image'] && <span className="text-indigo-500">Uploading...</span>}
                        </label>
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'image', 'profile')} className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Avatar Image URL (Fallback)</label>
                        <input type="url" value={settingsForm.profile.image} onChange={e => setSettingsForm({ ...settingsForm, profile: { ...settingsForm.profile, image: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                    </div>
                  </div>

                  {/* ABOUT CONFIG */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-2">About Section</h4>
                    <div className="space-y-1">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase">Section Title</label>
                      <input type="text" value={settingsForm.about.title} onChange={e => setSettingsForm({ ...settingsForm, about: { ...settingsForm.about, title: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase flex justify-between">
                          <span>Side Image Upload</span>
                          {isUploading['about-image'] && <span className="text-indigo-500">Uploading...</span>}
                        </label>
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e, 'image', 'about')} className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Side Image URL (Fallback)</label>
                        <input type="url" value={settingsForm.about.image} onChange={e => setSettingsForm({ ...settingsForm, about: { ...settingsForm.about, image: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase">Paragraphs</label>
                      {settingsForm.about.paragraphs.map((p, idx) => (
                        <div key={idx} className="flex gap-2">
                          <textarea rows={2} value={p} onChange={e => {
                            const newParas = [...settingsForm.about.paragraphs];
                            newParas[idx] = e.target.value;
                            setSettingsForm({ ...settingsForm, about: { ...settingsForm.about, paragraphs: newParas } });
                          }} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                          <button type="button" onClick={() => {
                            const newParas = settingsForm.about.paragraphs.filter((_, i) => i !== idx);
                            setSettingsForm({ ...settingsForm, about: { ...settingsForm.about, paragraphs: newParas } });
                          }} className="text-red-500 px-2 rounded hover:bg-red-50 dark:hover:bg-red-950/30">✕</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => {
                        setSettingsForm({ ...settingsForm, about: { ...settingsForm.about, paragraphs: [...settingsForm.about.paragraphs, ""] } });
                      }} className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400">+ Add Paragraph</button>
                    </div>
                  </div>

                  {/* SOCIAL LINKS */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                    <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 pb-2">Social Links</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">GitHub</label>
                        <input type="url" value={settingsForm.social.github} onChange={e => setSettingsForm({ ...settingsForm, social: { ...settingsForm.social, github: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">LinkedIn</label>
                        <input type="url" value={settingsForm.social.linkedin} onChange={e => setSettingsForm({ ...settingsForm, social: { ...settingsForm.social, linkedin: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase">Twitter</label>
                        <input type="url" value={settingsForm.social.twitter} onChange={e => setSettingsForm({ ...settingsForm, social: { ...settingsForm.social, twitter: e.target.value }})} className="w-full text-xs px-3 py-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 rounded-xl" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition">
                    Save Site Configuration
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors } from '../../utils/validation';
import { initialData } from '../../data';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, X, Folder, Star, Quote, Building2, User } from 'lucide-react';

interface PortfolioForm {
  title: string;
  category: string;
  image: string;
  description: string;
  stats: string[];
  tags: string[];
}

interface TestimonialForm {
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
  rating: number;
}

interface ClientForm {
  name: string;
  category: string;
  logo: string;
}

const PortfolioManager: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, updateContent } = useContent();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials' | 'clients'>('projects');

  // -------------------------------------------------------------
  // PROJECTS STATE
  // -------------------------------------------------------------
  const projects = data?.portfolio || initialData.portfolio || [];
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [projectFormData, setProjectFormData] = useState<PortfolioForm>({
    title: '',
    category: '',
    image: '',
    description: '',
    stats: [],
    tags: []
  });
  const [newStat, setNewStat] = useState('');
  const [newTag, setNewTag] = useState('');
  const [projectErrors, setProjectErrors] = useState<ValidationErrors>({});
  const [deleteProjectDialog, setDeleteProjectDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  // -------------------------------------------------------------
  // TESTIMONIALS STATE
  // -------------------------------------------------------------
  const testimonials = (data?.testimonials && Array.isArray(data.testimonials) && data.testimonials.length > 0)
    ? data.testimonials
    : (initialData.testimonials || []);
  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null);
  const [testimonialFormData, setTestimonialFormData] = useState<TestimonialForm>({
    name: '',
    role: '',
    company: '',
    text: '',
    image: '',
    rating: 5
  });
  const [testimonialErrors, setTestimonialErrors] = useState<ValidationErrors>({});
  const [deleteTestimonialDialog, setDeleteTestimonialDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  // -------------------------------------------------------------
  // CLIENTS STATE
  // -------------------------------------------------------------
  const clients = (data?.clients && Array.isArray(data.clients) && data.clients.length > 0)
    ? data.clients
    : (initialData.clients || []);
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState<number | null>(null);
  const [clientFormData, setClientFormData] = useState<ClientForm>({
    name: '',
    category: '',
    logo: ''
  });
  const [clientErrors, setClientErrors] = useState<ValidationErrors>({});
  const [deleteClientDialog, setDeleteClientDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  // -------------------------------------------------------------
  // PROJECT HANDLERS
  // -------------------------------------------------------------
  const projectValidationRules = {
    title: { required: true, minLength: 3, maxLength: 100, message: 'Title must be between 3 and 100 characters' },
    category: { required: true },
    image: { required: true, custom: (val: string) => val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/'), message: 'Please enter a valid image URL' },
    description: { required: true, minLength: 10, maxLength: 300, message: 'Description must be between 10 and 300 characters' }
  };

  const handleOpenProjectForm = (project?: any) => {
    if (project) {
      setEditingProjectId(project.id);
      setProjectFormData({
        title: project.title,
        category: project.category,
        image: project.image,
        description: project.description,
        stats: project.stats || [],
        tags: project.tags || []
      });
    } else {
      setEditingProjectId(null);
      setProjectFormData({ title: '', category: '', image: '', description: '', stats: [], tags: [] });
    }
    setProjectErrors({});
    setNewStat('');
    setNewTag('');
    setIsProjectFormOpen(true);
  };

  const handleCloseProjectForm = () => {
    setIsProjectFormOpen(false);
    setEditingProjectId(null);
    setProjectFormData({ title: '', category: '', image: '', description: '', stats: [], tags: [] });
    setProjectErrors({});
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valErrors = validateForm(projectFormData, projectValidationRules);
    if (Object.keys(valErrors).length > 0) {
      setProjectErrors(valErrors);
      showToast('error', 'Please fix the errors in the form');
      return;
    }

    if (editingProjectId) {
      updateItem('portfolio', editingProjectId, projectFormData);
      showToast('success', 'Portfolio project updated successfully!');
    } else {
      const newItem = { id: Date.now(), ...projectFormData };
      addItem('portfolio', newItem);
      showToast('success', 'Portfolio project added successfully!');
    }
    handleCloseProjectForm();
  };

  const handleDeleteProject = () => {
    if (deleteProjectDialog.id) {
      deleteItem('portfolio', deleteProjectDialog.id);
      showToast('success', 'Portfolio project deleted successfully!');
      setDeleteProjectDialog({ isOpen: false, id: null });
    }
  };

  const handleRestoreDefaultProjects = () => {
    updateContent('portfolio', initialData.portfolio || []);
    showToast('success', 'Default portfolio projects restored!');
  };

  // -------------------------------------------------------------
  // TESTIMONIAL HANDLERS
  // -------------------------------------------------------------
  const handleOpenTestimonialForm = (t?: any) => {
    if (t) {
      setEditingTestimonialId(t.id);
      setTestimonialFormData({
        name: t.name || '',
        role: t.role || '',
        company: t.company || '',
        text: t.text || '',
        image: t.image || '',
        rating: t.rating || 5
      });
    } else {
      setEditingTestimonialId(null);
      setTestimonialFormData({
        name: '',
        role: '',
        company: '',
        text: '',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        rating: 5
      });
    }
    setTestimonialErrors({});
    setIsTestimonialFormOpen(true);
  };

  const handleCloseTestimonialForm = () => {
    setIsTestimonialFormOpen(false);
    setEditingTestimonialId(null);
    setTestimonialErrors({});
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: ValidationErrors = {};
    if (!testimonialFormData.name.trim()) errors.name = 'Client name is required';
    if (!testimonialFormData.role.trim()) errors.role = 'Role / designation is required';
    if (!testimonialFormData.text.trim()) errors.text = 'Testimonial quote text is required';

    if (Object.keys(errors).length > 0) {
      setTestimonialErrors(errors);
      showToast('error', 'Please fill in all required fields');
      return;
    }

    const currentList = Array.isArray(testimonials) ? [...testimonials] : [];
    if (editingTestimonialId) {
      const updated = currentList.map((item: any) =>
        String(item.id) === String(editingTestimonialId) ? { ...item, ...testimonialFormData } : item
      );
      updateContent('testimonials', updated);
      showToast('success', 'Testimonial updated successfully!');
    } else {
      const newItem = { id: Date.now(), ...testimonialFormData };
      const updated = [...currentList, newItem];
      updateContent('testimonials', updated);
      showToast('success', 'Testimonial added successfully!');
    }
    handleCloseTestimonialForm();
  };

  const handleDeleteTestimonial = () => {
    if (deleteTestimonialDialog.id) {
      const currentList = Array.isArray(testimonials) ? [...testimonials] : [];
      const updated = currentList.filter((item: any) => String(item.id) !== String(deleteTestimonialDialog.id));
      updateContent('testimonials', updated);
      showToast('success', 'Testimonial deleted successfully!');
      setDeleteTestimonialDialog({ isOpen: false, id: null });
    }
  };

  // -------------------------------------------------------------
  // CLIENT HANDLERS
  // -------------------------------------------------------------
  const handleOpenClientForm = (c?: any) => {
    if (c) {
      setEditingClientId(c.id);
      setClientFormData({
        name: c.name || '',
        category: c.category || '',
        logo: c.logo || ''
      });
    } else {
      setEditingClientId(null);
      setClientFormData({
        name: '',
        category: 'Education',
        logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=300'
      });
    }
    setClientErrors({});
    setIsClientFormOpen(true);
  };

  const handleCloseClientForm = () => {
    setIsClientFormOpen(false);
    setEditingClientId(null);
    setClientErrors({});
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: ValidationErrors = {};
    if (!clientFormData.name.trim()) errors.name = 'Client / organization name is required';
    if (!clientFormData.logo.trim()) errors.logo = 'Logo URL is required';

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      showToast('error', 'Please fill in all required fields');
      return;
    }

    const currentList = Array.isArray(clients) ? [...clients] : [];
    if (editingClientId) {
      const updated = currentList.map((item: any) =>
        String(item.id) === String(editingClientId) ? { ...item, ...clientFormData } : item
      );
      updateContent('clients', updated);
      showToast('success', 'Client updated successfully!');
    } else {
      const newItem = { id: Date.now(), ...clientFormData };
      const updated = [...currentList, newItem];
      updateContent('clients', updated);
      showToast('success', 'Client added successfully!');
    }
    handleCloseClientForm();
  };

  const handleDeleteClient = () => {
    if (deleteClientDialog.id) {
      const currentList = Array.isArray(clients) ? [...clients] : [];
      const updated = currentList.filter((item: any) => String(item.id) !== String(deleteClientDialog.id));
      updateContent('clients', updated);
      showToast('success', 'Client deleted successfully!');
      setDeleteClientDialog({ isOpen: false, id: null });
    }
  };

  return (
    <div>
      {/* Header with Sub-tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio & Clients</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage case studies, client testimonials, and industry partner logos
          </p>
        </div>

        {/* Action Button based on active tab */}
        {activeTab === 'projects' && (
          <div className="flex items-center gap-3">
            {projects.length === 0 && (
              <button
                type="button"
                onClick={handleRestoreDefaultProjects}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors shadow-sm text-sm"
              >
                Restore Default Projects
              </button>
            )}
            <button
              onClick={() => handleOpenProjectForm()}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              <Plus size={20} />
              Add Project
            </button>
          </div>
        )}
        {activeTab === 'testimonials' && (
          <button
            onClick={() => handleOpenTestimonialForm()}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={20} />
            Add Testimonial
          </button>
        )}
        {activeTab === 'clients' && (
          <button
            onClick={() => handleOpenClientForm()}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={20} />
            Add Client Logo
          </button>
        )}
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6 gap-2">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm transition-all ${
            activeTab === 'projects'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Folder size={18} />
          Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm transition-all ${
            activeTab === 'testimonials'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Quote size={18} />
          Testimonials ({testimonials.length})
        </button>

        <button
          onClick={() => setActiveTab('clients')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-semibold text-sm transition-all ${
            activeTab === 'clients'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Building2 size={18} />
          Client Logos ({clients.length})
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. PROJECTS TAB CONTENT                                        */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleOpenProjectForm(project)}
                    className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteProjectDialog({ isOpen: true, id: project.id })}
                    className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors shadow"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                  {project.description}
                </p>

                {project.stats && project.stats.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.stats.map((stat: string, idx: number) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                        {stat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
              <Folder size={48} className="mx-auto mb-4 opacity-50" />
              <p className="mb-4">No portfolio projects yet. Click "Add Project" or restore defaults to showcase your case studies.</p>
              <button
                type="button"
                onClick={handleRestoreDefaultProjects}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm inline-flex items-center gap-2"
              >
                Restore Default Projects
              </button>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. TESTIMONIALS TAB CONTENT                                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t: any) => (
            <div
              key={t.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-600 shadow-sm"
                      onError={(e: any) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0D8ABC&color=fff`;
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{t.name}</h4>
                      <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">{t.role}</p>
                      {t.company && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t.company}</p>
                      )}
                    </div>
                  </div>

                  {/* Edit / Delete actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenTestimonialForm(t)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Edit Testimonial"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTestimonialDialog({ isOpen: true, id: t.id })}
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Delete Testimonial"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
              <Quote size={48} className="mx-auto mb-4 opacity-50" />
              <p>No testimonials yet. Click "Add Testimonial" to create one.</p>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. CLIENT LOGOS TAB CONTENT                                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'clients' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {clients.map((c: any) => (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md transition-shadow group relative"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 bg-slate-50 dark:bg-slate-700 p-1 border border-slate-100 dark:border-slate-600 flex items-center justify-center">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e: any) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random&color=fff`;
                  }}
                />
              </div>

              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{c.name}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5 mb-3">{c.category}</span>

              {/* Action Buttons */}
              <div className="flex gap-1 w-full justify-center pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => handleOpenClientForm(c)}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-xs flex items-center gap-1"
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => setDeleteClientDialog({ isOpen: true, id: c.id })}
                  className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-xs flex items-center gap-1"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}

          {clients.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
              <Building2 size={48} className="mx-auto mb-4 opacity-50" />
              <p>No client logos added yet. Click "Add Client Logo" to create one.</p>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PROJECT ADD/EDIT MODAL                                         */}
      {/* ------------------------------------------------------------- */}
      {isProjectFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingProjectId ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={handleCloseProjectForm} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
              <FormField
                label="Project Title"
                name="title"
                value={projectFormData.title}
                onChange={(val) => setProjectFormData({ ...projectFormData, title: val })}
                error={projectErrors.title}
                required
              />
              <FormField
                label="Category"
                name="category"
                value={projectFormData.category}
                onChange={(val) => setProjectFormData({ ...projectFormData, category: val })}
                placeholder="e.g. Education, Healthcare, Hospitality"
                error={projectErrors.category}
                required
              />
              <FormField
                label="Image URL"
                name="image"
                value={projectFormData.image}
                onChange={(val) => setProjectFormData({ ...projectFormData, image: val })}
                error={projectErrors.image}
                required
              />
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={projectFormData.description}
                onChange={(val) => setProjectFormData({ ...projectFormData, description: val })}
                error={projectErrors.description}
                required
              />

              {/* Stats Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Key Metrics / Stats
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newStat}
                    onChange={(e) => setNewStat(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), newStat.trim() && (setProjectFormData({ ...projectFormData, stats: [...projectFormData.stats, newStat.trim()] }), setNewStat('')))}
                    placeholder="e.g. 5000+ Users"
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newStat.trim()) {
                        setProjectFormData({ ...projectFormData, stats: [...projectFormData.stats, newStat.trim()] });
                        setNewStat('');
                      }
                    }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projectFormData.stats.map((st, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs">
                      {st}
                      <button type="button" onClick={() => setProjectFormData({ ...projectFormData, stats: projectFormData.stats.filter((_, i) => i !== idx) })}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleCloseProjectForm}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingProjectId ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TESTIMONIAL ADD/EDIT MODAL                                     */}
      {/* ------------------------------------------------------------- */}
      {isTestimonialFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingTestimonialId ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <button onClick={handleCloseTestimonialForm} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleTestimonialSubmit} className="p-6 space-y-4">
              <FormField
                label="Client Name"
                name="name"
                value={testimonialFormData.name}
                onChange={(val) => setTestimonialFormData({ ...testimonialFormData, name: val })}
                placeholder="e.g. Rajesh Gupta"
                error={testimonialErrors.name}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Role / Designation"
                  name="role"
                  value={testimonialFormData.role}
                  onChange={(val) => setTestimonialFormData({ ...testimonialFormData, role: val })}
                  placeholder="e.g. Principal / Director"
                  error={testimonialErrors.role}
                  required
                />
                <FormField
                  label="Company / Institution"
                  name="company"
                  value={testimonialFormData.company}
                  onChange={(val) => setTestimonialFormData({ ...testimonialFormData, company: val })}
                  placeholder="e.g. St. Xavier's International"
                />
              </div>

              <FormField
                label="Client Photo / Avatar URL"
                name="image"
                value={testimonialFormData.image}
                onChange={(val) => setTestimonialFormData({ ...testimonialFormData, image: val })}
                placeholder="https://images.unsplash.com/..."
                helpText="Paste an image URL for the client avatar photo"
              />

              {/* Photo Preview */}
              {testimonialFormData.image && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
                  <img
                    src={testimonialFormData.image}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-500 shadow-sm"
                    onError={(e: any) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonialFormData.name || 'User')}&background=0D8ABC&color=fff`;
                    }}
                  />
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">Avatar Photo Preview</p>
                    <p>Will be shown next to client quote</p>
                  </div>
                </div>
              )}

              {/* Star Rating Select */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Star Rating
                </label>
                <select
                  value={testimonialFormData.rating}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, rating: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white text-sm"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                  <option value={3}>⭐⭐⭐ 3 Stars</option>
                </select>
              </div>

              <FormField
                label="Testimonial Quote"
                name="text"
                type="textarea"
                rows={4}
                value={testimonialFormData.text}
                onChange={(val) => setTestimonialFormData({ ...testimonialFormData, text: val })}
                placeholder="What did the client say about Efficacious and the product results?"
                error={testimonialErrors.text}
                required
              />

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleCloseTestimonialForm}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingTestimonialId ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CLIENT LOGO ADD/EDIT MODAL                                    */}
      {/* ------------------------------------------------------------- */}
      {isClientFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingClientId ? 'Edit Client Logo' : 'Add New Client Logo'}
              </h3>
              <button onClick={handleCloseClientForm} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleClientSubmit} className="p-6 space-y-4">
              <FormField
                label="Client / Institution Name"
                name="name"
                value={clientFormData.name}
                onChange={(val) => setClientFormData({ ...clientFormData, name: val })}
                placeholder="e.g. St. Xavier's International School"
                error={clientErrors.name}
                required
              />

              <FormField
                label="Category / Industry"
                name="category"
                value={clientFormData.category}
                onChange={(val) => setClientFormData({ ...clientFormData, category: val })}
                placeholder="e.g. Education, Healthcare, Hospitality, Banking"
              />

              <FormField
                label="Logo / Image URL"
                name="logo"
                value={clientFormData.logo}
                onChange={(val) => setClientFormData({ ...clientFormData, logo: val })}
                placeholder="https://..."
                error={clientErrors.logo}
                required
              />

              {/* Logo Preview */}
              {clientFormData.logo && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                    <img
                      src={clientFormData.logo}
                      alt="Logo preview"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e: any) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(clientFormData.name || 'Logo')}&background=random&color=fff`;
                      }}
                    />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">Logo Image Preview</p>
                    <p>Will be displayed in client logo strip</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleCloseClientForm}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingClientId ? 'Save Changes' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={deleteProjectDialog.isOpen}
        onClose={() => setDeleteProjectDialog({ isOpen: false, id: null })}
        onConfirm={handleDeleteProject}
        title="Delete Portfolio Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />

      <ConfirmDialog
        isOpen={deleteTestimonialDialog.isOpen}
        onClose={() => setDeleteTestimonialDialog({ isOpen: false, id: null })}
        onConfirm={handleDeleteTestimonial}
        title="Delete Testimonial"
        message="Are you sure you want to delete this client testimonial? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />

      <ConfirmDialog
        isOpen={deleteClientDialog.isOpen}
        onClose={() => setDeleteClientDialog({ isOpen: false, id: null })}
        onConfirm={handleDeleteClient}
        title="Delete Client Logo"
        message="Are you sure you want to delete this client logo? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default PortfolioManager;

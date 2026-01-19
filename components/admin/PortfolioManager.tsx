import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, X, Folder } from 'lucide-react';

interface PortfolioForm {
  title: string;
  category: string;
  image: string;
  description: string;
  stats: string[];
  tags: string[];
}

const PortfolioManager: React.FC = () => {
  const { data, addItem, updateItem, deleteItem } = useContent();
  const { showToast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PortfolioForm>({
    title: '',
    category: '',
    image: '',
    description: '',
    stats: [],
    tags: []
  });
  const [newStat, setNewStat] = useState('');
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const validationRules = {
    title: {
      required: true,
      minLength: 3,
      maxLength: 100,
      message: 'Title must be between 3 and 100 characters'
    },
    category: { required: true },
    image: {
      required: true,
      custom: (value: string) => value.startsWith('http://') || value.startsWith('https://'),
      message: 'Please enter a valid image URL'
    },
    description: {
      required: true,
      minLength: 10,
      maxLength: 300,
      message: 'Description must be between 10 and 300 characters'
    }
  };

  const handleOpenForm = (project?: any) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        category: project.category,
        image: project.image,
        description: project.description,
        stats: project.stats || [],
        tags: project.tags || []
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        category: '',
        image: '',
        description: '',
        stats: [],
        tags: []
      });
    }
    setErrors({});
    setNewStat('');
    setNewTag('');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ title: '', category: '', image: '', description: '', stats: [], tags: [] });
    setErrors({});
    setNewStat('');
    setNewTag('');
  };

  const handleAddStat = () => {
    if (newStat.trim()) {
      setFormData({ ...formData, stats: [...formData.stats, newStat.trim()] });
      setNewStat('');
    }
  };

  const handleRemoveStat = (index: number) => {
    setFormData({ ...formData, stats: formData.stats.filter((_, i) => i !== index) });
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('error', 'Please fix the errors in the form');
      return;
    }

    if (editingId) {
      updateItem('portfolio', editingId, formData);
      showToast('success', 'Portfolio project updated successfully!');
    } else {
      const newItem = { id: Date.now(), ...formData };
      addItem('portfolio', newItem);
      showToast('success', 'Portfolio project added successfully!');
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteItem('portfolio', deleteDialog.id);
      showToast('success', 'Portfolio project deleted successfully!');
      setDeleteDialog({ isOpen: false, id: null });
    }
  };

  const openDeleteDialog = (id: number) => {
    setDeleteDialog({ isOpen: true, id });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage portfolio projects</p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.portfolio.map((project: any) => (
          <div
            key={project.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden group"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleOpenForm(project)}
                  className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => openDeleteDialog(project.id)}
                  className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Info */}
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

              {/* Stats */}
              {project.stats && project.stats.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.stats.slice(0, 2).map((stat: string, idx: number) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">
                      {stat}
                    </span>
                  ))}
                  {project.stats.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-500">
                      +{project.stats.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {data.portfolio.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
            <Folder size={48} className="mx-auto mb-4 opacity-50" />
            <p>No portfolio projects yet. Click "Add Project" to create one.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FormField
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={(value) => setFormData({ ...formData, title: value })}
                error={errors.title}
                required
                placeholder="e.g., EuroSchool ERP Implementation"
              />

              <FormField
                label="Category"
                name="category"
                value={formData.category}
                onChange={(value) => setFormData({ ...formData, category: value })}
                error={errors.category}
                required
                placeholder="e.g., Education, Healthcare, Finance"
              />

              <FormField
                label="Image URL"
                name="image"
                type="url"
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
                error={errors.image}
                required
                placeholder="https://example.com/image.jpg"
              />

              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                error={errors.description}
                required
                rows={3}
                placeholder="Brief project description"
              />

              {/* Stats Management */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Project Stats
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newStat}
                    onChange={(e) => setNewStat(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStat())}
                    placeholder="e.g., 5000+ Students, 98% Efficiency"
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddStat}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.stats.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg"
                      >
                        <span className="text-sm text-slate-700 dark:text-slate-300">{stat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveStat(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags Management */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="e.g., ERP, Mobile App, GPS"
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-lg"
                      >
                        <span className="text-sm">{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="text-brand-700 dark:text-brand-300 hover:text-brand-900 dark:hover:text-brand-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Portfolio Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default PortfolioManager;

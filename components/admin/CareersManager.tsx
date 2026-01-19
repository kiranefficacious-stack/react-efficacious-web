import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, X, Briefcase } from 'lucide-react';

interface CareerForm {
  title: string;
  experience: string;
  department: string;
  type: string;
  description: string;
  criteria: string[];
}

const CareersManager: React.FC = () => {
  const { data, addItem, updateItem, deleteItem } = useContent();
  const { showToast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CareerForm>({
    title: '',
    experience: '',
    department: '',
    type: 'Full Time',
    description: '',
    criteria: []
  });
  const [newCriterion, setNewCriterion] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const validationRules = {
    title: {
      required: true,
      minLength: 5,
      maxLength: 100,
      message: 'Title must be between 5 and 100 characters'
    },
    experience: {
      required: true,
      message: 'Experience requirement is required'
    },
    department: {
      required: true,
      message: 'Department is required'
    },
    description: {
      required: true,
      minLength: 20,
      maxLength: 500,
      message: 'Description must be between 20 and 500 characters'
    }
  };

  const handleOpenForm = (career?: any) => {
    if (career) {
      setEditingId(career.id);
      setFormData({
        title: career.title,
        experience: career.experience,
        department: career.department,
        type: career.type,
        description: career.description,
        criteria: career.criteria || []
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        experience: '',
        department: '',
        type: 'Full Time',
        description: '',
        criteria: []
      });
    }
    setErrors({});
    setNewCriterion('');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      experience: '',
      department: '',
      type: 'Full Time',
      description: '',
      criteria: []
    });
    setErrors({});
    setNewCriterion('');
  };

  const handleAddCriterion = () => {
    if (newCriterion.trim()) {
      setFormData({
        ...formData,
        criteria: [...formData.criteria, newCriterion.trim()]
      });
      setNewCriterion('');
    }
  };

  const handleRemoveCriterion = (index: number) => {
    setFormData({
      ...formData,
      criteria: formData.criteria.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('error', 'Please fix the errors in the form');
      return;
    }

    if (formData.criteria.length === 0) {
      showToast('error', 'Please add at least one criterion');
      return;
    }

    if (editingId) {
      updateItem('careers', editingId, formData);
      showToast('success', 'Job posting updated successfully!');
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      addItem('careers', newItem);
      showToast('success', 'Job posting added successfully!');
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteItem('careers', deleteDialog.id);
      showToast('success', 'Job posting deleted successfully!');
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Careers
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage job postings and openings
          </p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Job Posting
        </button>
      </div>

      {/* Careers List */}
      <div className="space-y-4">
        {data.careers.map((career: any) => (
          <div
            key={career.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex gap-6">
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {career.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  {career.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 text-sm mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    {career.experience}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                    {career.department}
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                    {career.type}
                  </span>
                </div>

                {/* Criteria */}
                {career.criteria && career.criteria.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Requirements:</p>
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                      {career.criteria.slice(0, 3).map((criterion: string, idx: number) => (
                        <li key={idx}>{criterion}</li>
                      ))}
                      {career.criteria.length > 3 && (
                        <li className="text-slate-400 dark:text-slate-500">
                          +{career.criteria.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleOpenForm(career)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => openDeleteDialog(career.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {data.careers.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            No job postings yet. Click "Add Job Posting" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Job Posting' : 'Add New Job Posting'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FormField
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={(value) => setFormData({ ...formData, title: value })}
                error={errors.title}
                required
                placeholder="e.g., Senior Software Engineer"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={(value) => setFormData({ ...formData, experience: value })}
                  error={errors.experience}
                  required
                  placeholder="e.g., 3-5 Years"
                />

                <FormField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={(value) => setFormData({ ...formData, department: value })}
                  error={errors.department}
                  required
                  placeholder="e.g., Engineering"
                />
              </div>

              <FormField
                label="Job Type"
                name="type"
                type="select"
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
                options={[
                  { value: 'Full Time', label: 'Full Time' },
                  { value: 'Part Time', label: 'Part Time' },
                  { value: 'Contract', label: 'Contract' },
                  { value: 'Remote', label: 'Remote' }
                ]}
              />

              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                error={errors.description}
                required
                rows={4}
                placeholder="Job description and responsibilities"
              />

              {/* Criteria Management */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Requirements/Criteria <span className="text-red-500">*</span>
                </label>
                
                {/* Add Criterion Input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newCriterion}
                    onChange={(e) => setNewCriterion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCriterion())}
                    placeholder="Add a requirement..."
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCriterion}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Criteria List */}
                {formData.criteria.length > 0 && (
                  <div className="space-y-2">
                    {formData.criteria.map((criterion, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      >
                        <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                          {criterion}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCriterion(index)}
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {formData.criteria.length === 0 && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    No requirements added yet. Add at least one requirement.
                  </p>
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
        title="Delete Job Posting"
        message="Are you sure you want to delete this job posting? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default CareersManager;

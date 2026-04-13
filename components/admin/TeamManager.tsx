import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';

interface TeamForm {
  name: string;
  role: string;
  image: string;
  description: string;
}

const TeamManager: React.FC = () => {
  const { data, addItem, editItem: updateItem, deleteItem } = useContent(); // Using editItem locally aliased
  const { showToast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<TeamForm>({
    name: '',
    role: '',
    image: '',
    description: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      message: 'Name must be between 2 and 100 characters'
    },
    role: {
      required: true,
      message: 'Role is required'
    },
    image: {
      required: true,
      message: 'Image URL is required'
    },
    description: {
      required: true,
      minLength: 10,
      maxLength: 300,
      message: 'Description must be between 10 and 300 characters'
    }
  };

  const handleOpenForm = (member?: any) => {
    if (member) {
      setEditingId(member.id);
      setFormData({
        name: member.name,
        role: member.role,
        image: member.image,
        description: member.description
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        role: '',
        image: '',
        description: ''
      });
    }
    setErrors({});
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      image: '',
      description: ''
    });
    setErrors({});
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
      updateItem('team', editingId, formData);
      showToast('success', 'Team member updated successfully!');
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      addItem('team', newItem);
      showToast('success', 'Team member added successfully!');
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteItem('team', deleteDialog.id);
      showToast('success', 'Team member deleted successfully!');
      setDeleteDialog({ isOpen: false, id: null });
    }
  };

  const openDeleteDialog = (id: number) => {
    setDeleteDialog({ isOpen: true, id });
  };

  // If data doesn't have a team array for some reason (e.g. legacy cache), fallback to empty
  const teamMembers = data?.team || [];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Team Members
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage the team showcase
          </p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Team Member
        </button>
      </div>

      {/* Team List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member: any) => (
          <div
            key={member.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
          >
            <div className="h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users size={48} className="text-slate-300" />
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-brand-600 dark:text-brand-400 mb-3">
                {member.role}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 flex-1">
                {member.description}
              </p>
              
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => handleOpenForm(member)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => openDeleteDialog(member.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {teamMembers.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
            <Users size={48} className="mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            No team members yet. Click "Add Team Member" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={(value) => setFormData({ ...formData, name: value })}
                  error={errors.name}
                  required
                  placeholder="John Doe"
                />

                <FormField
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={(value) => setFormData({ ...formData, role: value })}
                  error={errors.role}
                  required
                  placeholder="e.g. Developer"
                />
              </div>

              <FormField
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
                error={errors.image}
                required
                placeholder="https://images.unsplash.com/... or /images/..."
              />
              
              {formData.image && (
                <div className="mt-2 h-32 w-32 rounded-full overflow-hidden border-2 border-slate-200 mx-auto">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
                error={errors.description}
                required
                rows={4}
                placeholder="Brief description about the team member..."
              />

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
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default TeamManager;

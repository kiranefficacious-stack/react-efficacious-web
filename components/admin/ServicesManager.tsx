import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ServiceForm {
  title: string;
  description: string;
  iconName: string;
  color: string;
  deliverables: string[];
}

// Available Lucide icons for selection
const availableIcons = [
  'Code', 'Database', 'Server', 'Cloud', 'Smartphone', 'Monitor',
  'Cpu', 'HardDrive', 'Wifi', 'Globe', 'Lock', 'Shield',
  'Zap', 'Settings', 'Tool', 'Package', 'Layers', 'GitBranch',
  'MessageSquare', 'Users', 'UserCheck', 'Heart', 'Star', 'Award'
];

const ServicesManager: React.FC = () => {
  const { data, addItem, updateItem, deleteItem } = useContent();
  const { showToast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ServiceForm>({
    title: '',
    description: '',
    iconName: 'Code',
    color: 'blue',
    deliverables: []
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [iconSearch, setIconSearch] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const validationRules = {
    title: {
      required: true,
      minLength: 3,
      maxLength: 50,
      message: 'Title must be between 3 and 50 characters'
    },
    description: {
      required: true,
      minLength: 10,
      maxLength: 200,
      message: 'Description must be between 10 and 200 characters'
    },
    iconName: { required: true },
    color: { required: true }
  };

  const handleOpenForm = (service?: any) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title,
        description: service.description,
        iconName: service.iconName,
        color: service.color,
        deliverables: service.deliverables || []
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        iconName: 'Code',
        color: 'blue',
        deliverables: []
      });
    }
    setErrors({});
    setIconSearch('');
    setNewDeliverable('');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', iconName: 'Code', color: 'blue', deliverables: [] });
    setErrors({});
    setIconSearch('');
    setNewDeliverable('');
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
      updateItem('services', editingId, formData);
      showToast('success', 'Service updated successfully!');
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      addItem('services', newItem);
      showToast('success', 'Service added successfully!');
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteItem('services', deleteDialog.id);
      showToast('success', 'Service deleted successfully!');
      setDeleteDialog({ isOpen: false, id: null });
    }
  };

  const openDeleteDialog = (id: number) => {
    setDeleteDialog({ isOpen: true, id });
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Code;
  };

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: 'bg-blue-500 text-blue-600',
      purple: 'bg-purple-500 text-purple-600',
      green: 'bg-green-500 text-green-600',
      orange: 'bg-orange-500 text-orange-600',
      red: 'bg-red-500 text-red-600',
      pink: 'bg-pink-500 text-pink-600'
};
    return colors[color] || colors.blue;
  };

  const filteredIcons = availableIcons.filter(icon =>
    icon.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Services
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage service offerings
          </p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {data.services.map((service: any) => {
          const IconComponent = getIconComponent(service.iconName);
          const colorClass = getColorClasses(service.color);
          
          return (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
            >
              <div className="flex gap-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg ${colorClass.split(' ')[0]}/10 flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`w-8 h-8 ${colorClass.split(' ')[1]}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {service.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">
                      {service.iconName}
                    </span>
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded capitalize">
                      {service.color}
                    </span>
                    {service.deliverables && service.deliverables.length > 0 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">
                        {service.deliverables.length} Deliverables
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleOpenForm(service)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => openDeleteDialog(service.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {data.services.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            No services yet. Click "Add Service" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FormField
                label="Title"
                name="title"
                value={formData.title}
                onChange={(value) => setFormData({ ...formData, title: value })}
                error={errors.title}
                required
                placeholder="e.g., Custom Software Development"
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
                placeholder="Brief description of the service"
              />

              {/* Key Deliverables */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Key Deliverables
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newDeliverable.trim()) {
                          setFormData({
                            ...formData,
                            deliverables: [...formData.deliverables, newDeliverable.trim()]
                          });
                          setNewDeliverable('');
                        }
                      }
                    }}
                    placeholder="Add a deliverable..."
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newDeliverable.trim()) {
                        setFormData({
                          ...formData,
                          deliverables: [...formData.deliverables, newDeliverable.trim()]
                        });
                        setNewDeliverable('');
                      }
                    }}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                {formData.deliverables.length > 0 && (
                  <div className="space-y-2">
                    {formData.deliverables.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg group"
                      >
                        <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                          {item}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newDeliverables = [...formData.deliverables];
                            newDeliverables.splice(index, 1);
                            setFormData({ ...formData, deliverables: newDeliverables });
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Icon Picker */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Icon <span className="text-red-500">*</span>
                </label>
                
                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={iconSearch}
                    onChange={(e) => setIconSearch(e.target.value)}
                    placeholder="Search icons..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                {/* Icon Grid */}
                <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border border-slate-200 dark:border-slate-700 rounded-lg">
                  {filteredIcons.map((iconName) => {
                    const IconComponent = getIconComponent(iconName);
                    const isSelected = formData.iconName === iconName;
                    
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setFormData({ ...formData, iconName })}
                        className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-brand-500 text-white'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                        title={iconName}
                      >
                        <IconComponent size={20} />
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Selected: {formData.iconName}
                </p>
              </div>

              {/* Color Picker */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {['blue', 'purple', 'green', 'orange', 'red', 'pink'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        formData.color === color
                          ? 'ring-2 ring-offset-2 ring-brand-500 scale-110'
                          : ''
                      }`}
                      style={{
                        backgroundColor: {
                          blue: '#3b82f6',
                          purple: '#a855f7',
                          green: '#22c55e',
                          orange: '#f97316',
                          red: '#ef4444',
                          pink: '#ec4899'
                        }[color]
                      }}
                      title={color}
                    />
                  ))}
                </div>
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
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default ServicesManager;

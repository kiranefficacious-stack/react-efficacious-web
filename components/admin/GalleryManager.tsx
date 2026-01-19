import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors, commonRules } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

interface GalleryForm {
  url: string;
  caption: string;
  category?: string;
  size?: string;
}

const GalleryManager: React.FC = () => {
  const { data, addItem, updateItem, deleteItem } = useContent();
  const { showToast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<GalleryForm>({
    url: '',
    caption: '',
    category: 'Office',
    size: 'medium'
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const validationRules = {
    url: {
      required: true,
      custom: (value: string) => value.startsWith('http://') || value.startsWith('https://'),
      message: 'Please enter a valid image URL'
    },
    caption: {
      required: true,
      minLength: 2,
      maxLength: 100,
      message: 'Caption must be between 2 and 100 characters'
    }
  };

  const handleOpenForm = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        url: item.url,
        caption: item.caption,
        category: item.category || 'Office',
        size: item.size || 'medium'
      });
    } else {
      setEditingId(null);
      setFormData({
        url: '',
        caption: '',
        category: 'Office',
        size: 'medium'
      });
    }
    setErrors({});
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ url: '', caption: '', category: 'Office', size: 'medium' });
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
      updateItem('gallery', editingId, formData);
      showToast('success', 'Gallery image updated successfully!');
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      addItem('gallery', newItem);
      showToast('success', 'Gallery image added successfully!');
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteItem('gallery', deleteDialog.id);
      showToast('success', 'Gallery image deleted successfully!');
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
            Gallery
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage office gallery images
          </p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.gallery.map((item: any) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden group"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleOpenForm(item)}
                  className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => openDeleteDialog(item.id)}
                  className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {item.caption}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                {item.category && (
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">
                    {item.category}
                  </span>
                )}
                {item.size && (
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded capitalize">
                    {item.size}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {data.gallery.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>No images yet. Click "Add Image" to upload one.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Gallery Image' : 'Add New Gallery Image'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FormField
                label="Image URL"
                name="url"
                type="url"
                value={formData.url}
                onChange={(value) => setFormData({ ...formData, url: value })}
                error={errors.url}
                required
                placeholder="https://example.com/image.jpg"
                helpText="Enter a valid image URL starting with http:// or https://"
              />

              <FormField
                label="Caption"
                name="caption"
                value={formData.caption}
                onChange={(value) => setFormData({ ...formData, caption: value })}
                error={errors.caption}
                required
                placeholder="e.g., Main Office, Conference Room"
              />

              <FormField
                label="Category"
                name="category"
                value={formData.category || ''}
                onChange={(value) => setFormData({ ...formData, category: value })}
                placeholder="e.g., Office, Team, Event"
              />

              <FormField
                label="Size"
                name="size"
                type="select"
                value={formData.size || 'medium'}
                onChange={(value) => setFormData({ ...formData, size: value })}
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                  { value: 'wide', label: 'Wide' }
                ]}
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
                  {editingId ? 'Update' : 'Add'}
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
        title="Delete Gallery Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default GalleryManager;

import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors, commonRules } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, Calendar, Tag } from 'lucide-react';

interface NewsForm {
  title: string;
  date: string;
  description: string;
  category: string;
  image: string;
}

const NewsManager: React.FC = () => {
  const { data, addItem, updateItem, deleteItem } = useContent();
  const { showToast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<NewsForm>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: '',
    image: ''
  });
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
    date: { ...commonRules.required },
    description: {
      required: true,
      minLength: 10,
      maxLength: 500,
      message: 'Description must be between 10 and 500 characters'
    },
    category: { ...commonRules.required },
    image: {
      required: true,
      custom: (value: string) => value.startsWith('http://') || value.startsWith('https://'),
      message: 'Please enter a valid image URL'
    }
  };

  const handleOpenForm = (newsItem?: any) => {
    if (newsItem) {
      setEditingId(newsItem.id);
      setFormData({
        title: newsItem.title,
        date: newsItem.date,
        description: newsItem.description,
        category: newsItem.category,
        image: newsItem.image
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        image: ''
      });
    }
    setErrors({});
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: '',
      image: ''
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
      updateItem('news', editingId, formData);
      showToast('success', 'News item updated successfully!');
    } else {
      const newItem = {
        id: Date.now(),
        ...formData
      };
      addItem('news', newItem);
      showToast('success', 'News item added successfully!');
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteItem('news', deleteDialog.id);
      showToast('success', 'News item deleted successfully!');
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
            News & Events
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage news items and announcements
          </p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add News
        </button>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {data.news.map((newsItem: any) => (
          <div
            key={newsItem.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex gap-6">
              {/* Image */}
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {newsItem.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  {newsItem.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {newsItem.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={16} />
                    {newsItem.category}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleOpenForm(newsItem)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => openDeleteDialog(newsItem.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {data.news.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            No news items yet. Click "Add News" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit News Item' : 'Add New News Item'}
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
                placeholder="Enter news title"
              />

              <FormField
                label="Date"
                name="date"
                type="text"
                value={formData.date}
                onChange={(value) => setFormData({ ...formData, date: value })}
                error={errors.date}
                required
                placeholder="YYYY-MM-DD"
              />

              <FormField
                label="Category"
                name="category"
                value={formData.category}
                onChange={(value) => setFormData({ ...formData, category: value })}
                error={errors.category}
                required
                placeholder="e.g., Technology, Education, Business"
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
                helpText="Enter a valid image URL starting with http:// or https://"
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
                placeholder="Enter news description"
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
        title="Delete News Item"
        message="Are you sure you want to delete this news item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default NewsManager;

import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, Calendar, User, Clock } from 'lucide-react';

interface BlogForm {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  color: string;
}

const BlogsManager: React.FC = () => {
  const { data, addItem, updateItem, deleteItem } = useContent();
  const { showToast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<BlogForm>({
    title: '',
    excerpt: '',
    category: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    image: '',
    color: 'blue'
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const validationRules = {
    title: {
      required: true,
      minLength: 5,
      maxLength: 150,
      message: 'Title must be between 5 and 150 characters'
    },
    excerpt: {
      required: true,
      minLength: 20,
      maxLength: 300,
      message: 'Excerpt must be between 20 and 300 characters'
    },
    category: { required: true },
    author: { required: true },
    date: { required: true },
    readTime: { required: true },
    image: {
      required: true,
      custom: (value: string) => value.startsWith('http://') || value.startsWith('https://'),
      message: 'Please enter a valid image URL'
    }
  };

  const handleOpenForm = (blog?: any) => {
    if (blog) {
      setEditingId(blog.id);
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        author: blog.author,
        date: blog.date,
        readTime: blog.readTime,
        image: blog.image,
        color: blog.color || 'blue'
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        excerpt: '',
        category: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        readTime: '5 min read',
        image: '',
        color: 'blue'
      });
    }
    setErrors({});
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
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
      updateItem('blogs', editingId, formData);
      showToast('success', 'Blog post updated successfully!');
    } else {
      const newItem = { id: Date.now(), ...formData };
      addItem('blogs', newItem);
      showToast('success', 'Blog post added successfully!');
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteItem('blogs', deleteDialog.id);
      showToast('success', 'Blog post deleted successfully!');
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Blogs</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage blog posts and articles</p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Add Blog Post
        </button>
      </div>

      {/* Blogs List */}
      <div className="space-y-4">
        {data.blogs.map((blog: any) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex gap-6">
              {/* Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${blog.color}-100 dark:bg-${blog.color}-900/30 text-${blog.color}-700 dark:text-${blog.color}-300`}>
                    {blog.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {blog.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  {blog.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <User size={16} />
                    {blog.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {blog.readTime}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleOpenForm(blog)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => openDeleteDialog(blog.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {data.blogs.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            No blog posts yet. Click "Add Blog Post" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Blog Post' : 'Add New Blog Post'}
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
                placeholder="e.g., 5 Ways to Secure Your School Data"
              />

              <FormField
                label="Excerpt"
                name="excerpt"
                type="textarea"
                value={formData.excerpt}
                onChange={(value) => setFormData({ ...formData, excerpt: value })}
                error={errors.excerpt}
                required
                rows={3}
                placeholder="Brief summary of the blog post"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={(value) => setFormData({ ...formData, category: value })}
                  error={errors.category}
                  required
                  placeholder="e.g., Security, Technology"
                />

                <FormField
                  label="Color"
                  name="color"
                  type="select"
                  value={formData.color}
                  onChange={(value) => setFormData({ ...formData, color: value })}
                  options={[
                    { value: 'blue', label: 'Blue' },
                    { value: 'purple', label: 'Purple' },
                    { value: 'green', label: 'Green' },
                    { value: 'orange', label: 'Orange' },
                    { value: 'red', label: 'Red' }
                  ]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={(value) => setFormData({ ...formData, author: value })}
                  error={errors.author}
                  required
                  placeholder="e.g., Tech Team"
                />

                <FormField
                  label="Read Time"
                  name="readTime"
                  value={formData.readTime}
                  onChange={(value) => setFormData({ ...formData, readTime: value })}
                  error={errors.readTime}
                  required
                  placeholder="e.g., 5 min read"
                />
              </div>

              <FormField
                label="Date"
                name="date"
                type="text"
                value={formData.date}
                onChange={(value) => setFormData({ ...formData, date: value })}
                error={errors.date}
                required
                placeholder="MMM DD, YYYY"
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
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default BlogsManager;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Eye, EyeOff, Edit2, X, Plus, Trash2, ExternalLink } from 'lucide-react';

// Adjusted interface to allow for either strings or objects as described in your error
interface ProductForm {
  title: string;
  description: string;
  iconName: string;
  enabled: boolean;
  href: string;
  appStoreLink: string;
  playStoreLink: string;
  features: any[];
  modules: any[];
}

const ProductManager: React.FC = () => {
  const { data, updateContent, toggleProduct, addItem, deleteItem } = useContent();
  const { showToast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductForm>({
    title: '',
    description: '',
    iconName: 'Box',
    enabled: true,
    href: '',
    appStoreLink: '',
    playStoreLink: '',
    features: [],
    modules: []
  });
  const [newFeature, setNewFeature] = useState('');
  const [newModule, setNewModule] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [confirmAction, setConfirmAction] = useState<{ type: 'toggle' | 'delete', payload: any } | null>(null);

  const validationRules = {
    title: {
      required: true,
      minLength: 3,
      maxLength: 50
    },
    description: {
      required: true,
      minLength: 10,
      maxLength: 200
    },
    href: {
      required: true,
      minLength: 5,
      pattern: /^\/products\/.+/,
      customMessage: 'Route must start with /products/'
    }
  };

  // Helper function to safely extract text from a feature/module (which might be an object)
  const getItemText = (item: any): string => {
    if (typeof item === 'string') return item;
    if (typeof item === 'object' && item !== null) {
      return item.title || item.name || item.text || 'Untitled Item';
    }
    return '';
  };

  const handleConfirmAction = () => {
    if (!confirmAction) return;

    if (confirmAction.type === 'toggle') {
      const product = confirmAction.payload;
      toggleProduct(product.id);
      showToast(
        'success',
        `Product ${!product.enabled ? 'enabled' : 'disabled'} successfully!`
      );
    } else if (confirmAction.type === 'delete') {
      deleteItem('products', confirmAction.payload.id);
      showToast('success', 'Product deleted successfully!');
    }
    setConfirmAction(null);
  };

  const handleAddProduct = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      iconName: 'Box',
      enabled: false,
      href: '/products/',
      appStoreLink: '',
      playStoreLink: '',
      features: [],
      modules: []
    });
    setErrors({});
    setNewFeature('');
    setNewModule('');
    setIsFormOpen(true);
  };

  const handleOpenForm = (product: any) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      description: product.description,
      iconName: product.iconName || 'Box',
      enabled: product.enabled,
      href: product.href || '/products/',
      appStoreLink: product.appStoreLink || '',
      playStoreLink: product.playStoreLink || '',
      features: product.features || [],
      modules: product.modules || []
    });
    setErrors({});
    setNewFeature('');
    setNewModule('');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setErrors({});
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const handleAddModule = () => {
    if (newModule.trim()) {
      setFormData({ ...formData, modules: [...formData.modules, newModule.trim()] });
      setNewModule('');
    }
  };

  const handleRemoveModule = (index: number) => {
    setFormData({ ...formData, modules: formData.modules.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('error', 'Please fix the errors in the form');
      return;
    }

    if (editingId !== null) {
      // Edit existing product
      const updatedProducts = data.products.map((p: any) =>
        p.id === editingId ? { ...p, ...formData } : p
      );
      updateContent('products', updatedProducts);
      showToast('success', 'Product updated successfully!');
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        gradient: 'from-slate-400 via-slate-500 to-slate-600',
        bgAccent: 'bg-slate-500/10',
        textAccent: 'text-slate-600 dark:text-slate-400'
      };
      addItem('products', newProduct);
      showToast('success', 'Product created successfully!');
    }
    handleCloseForm();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Products</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage product visibility and details
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-brand-500/30"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.products.map((product: any) => (
          <div
            key={product.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            {/* Header with Toggle */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {product.title}
              </h3>
              <button
                onClick={() => setConfirmAction({ type: 'toggle', payload: product })}
                className={`p-2 rounded-lg transition-colors ${
                  product.enabled
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-slate-400 bg-slate-100 dark:bg-slate-700'
                }`}
                title={product.enabled ? 'Enabled - Click to disable' : 'Disabled - Click to enable'}
              >
                {product.enabled ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {product.description}
            </p>

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  product.enabled
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {product.enabled ? '● Active' : '○ Inactive'}
              </span>
            </div>

            {/* Features Preview */}
            {product.features && product.features.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  Features ({product.features.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 3).map((feature: any, idx: number) => {
                    const text = getItemText(feature);
                    return (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded"
                      >
                        {text.length > 20 ? text.substring(0, 20) + '...' : text}
                      </span>
                    );
                  })}
                  {product.features.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-500">
                      +{product.features.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Store Link Badges */}
            {(product.appStoreLink || product.playStoreLink) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.appStoreLink && (
                  <a
                    href={product.appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-xs font-medium hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
                    App Store
                  </a>
                )}
                {product.playStoreLink && (
                  <a
                    href={product.playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-700 dark:bg-emerald-800 text-white rounded-lg text-xs font-medium hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                    Play Store
                  </a>
                )}
              </div>
            )}

            {/* Learn More Link */}
            {product.href && (
              <Link
                to={product.href}
                className="block w-full py-2 px-4 mb-3 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-brand-200 dark:border-brand-800"
              >
                <ExternalLink size={16} />
                Learn More
              </Link>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenForm(product)}
                className="flex-1 py-2 px-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => setConfirmAction({ type: 'delete', payload: product })}
                className="py-2 px-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                title="Delete product"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId !== null ? 'Edit Product' : 'Add New Product'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FormField
                label="Product Title"
                name="title"
                value={formData.title}
                onChange={(value) => setFormData({ ...formData, title: value })}
                error={errors.title}
                required
                placeholder="e.g., eSmart School"
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
                placeholder="Brief product description"
              />

              <FormField
                label="Navigation Route"
                name="href"
                value={formData.href}
                onChange={(value) => setFormData({ ...formData, href: value })}
                error={errors.href}
                required
                placeholder="/products/product-name"
                helpText="URL path where users will be redirected when clicking 'Learn More'"
              />

              {/* Store Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl border border-slate-200 dark:border-slate-600">
                <div className="col-span-full">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current text-slate-500" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
                    App Store Links
                    <span className="text-xs font-normal text-slate-400">(optional — paste the full URL)</span>
                  </p>
                </div>
                <FormField
                  label="App Store Link (iOS)"
                  name="appStoreLink"
                  value={formData.appStoreLink}
                  onChange={(value) => setFormData({ ...formData, appStoreLink: value })}
                  placeholder="https://apps.apple.com/app/..."
                  helpText="Apple App Store URL"
                />
                <FormField
                  label="Play Store Link (Android)"
                  name="playStoreLink"
                  value={formData.playStoreLink}
                  onChange={(value) => setFormData({ ...formData, playStoreLink: value })}
                  placeholder="https://play.google.com/store/apps/..."
                  helpText="Google Play Store URL"
                />
              </div>

              <FormField
                label="Enabled"
                name="enabled"
                type="checkbox"
                value={formData.enabled}
                onChange={(value) => setFormData({ ...formData, enabled: value })}
                helpText="Toggle product visibility on the public site"
              />

              {/* Features Management */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Features
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    placeholder="Add a feature..."
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {formData.features.length > 0 && (
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      >
                        <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                          {getItemText(feature)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modules Management */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Modules
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddModule())}
                    placeholder="Add a module..."
                    className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 dark:bg-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {formData.modules.length > 0 && (
                  <div className="space-y-2">
                    {formData.modules.map((module, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      >
                        <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                          {getItemText(module)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveModule(index)}
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <X size={16} />
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
                  {editingId !== null ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirmAction}
        title={
          confirmAction?.type === 'toggle' 
            ? (confirmAction.payload.enabled ? 'Disable Product?' : 'Enable Product?')
            : confirmAction?.type === 'delete'
            ? 'Delete Product?'
            : 'Confirm Action'
        }
        message={
          confirmAction?.type === 'toggle' 
            ? `Are you sure you want to ${confirmAction.payload.enabled ? 'disable' : 'enable'} "${confirmAction.payload.title}"? This will affect its visibility on the website.`
            : confirmAction?.type === 'delete'
            ? `Are you sure you want to delete "${confirmAction.payload.title}"? This action cannot be undone.`
            : 'Are you sure you want to proceed?'
        }
        confirmText={
          confirmAction?.type === 'toggle'
            ? (confirmAction.payload.enabled ? 'Disable' : 'Enable')
            : confirmAction?.type === 'delete'
            ? 'Delete'
            : 'Confirm'
        }
        danger={confirmAction?.type === 'delete' || confirmAction?.payload.enabled}
      />
    </div>
  );
};

export default ProductManager;
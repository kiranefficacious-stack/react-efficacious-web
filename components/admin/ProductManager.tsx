import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors } from '../../utils/validation';
import { initialData } from '../../data';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Eye, EyeOff, Edit2, X, Plus, Trash2, ExternalLink, Clock, MessageSquare, Star, Quote } from 'lucide-react';

interface ProductTestimonial {
  id: string | number;
  name: string;
  role: string;
  organization?: string;
  school?: string;
  restaurant?: string;
  author?: string;
  quote: string;
  stars?: number;
  avatar?: string;
  city?: string;
  metric?: string;
  category?: string;
}

// Adjusted interface to allow for either strings or objects as described in your error
interface ProductForm {
  title: string;
  description: string;
  iconName: string;
  enabled: boolean;
  comingSoon: boolean;
  href: string;
  appStoreLink: string;
  playStoreLink: string;
  features: any[];
  modules: any[];
  testimonials?: ProductTestimonial[];
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
    comingSoon: false,
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

  // Testimonials management state
  const [selectedProductForTestimonials, setSelectedProductForTestimonials] = useState<any | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | number | null>(null);
  const [testimonialFormData, setTestimonialFormData] = useState<ProductTestimonial>({
    id: '',
    name: '',
    role: '',
    organization: '',
    quote: '',
    stars: 5,
    avatar: '',
    city: '',
    metric: '',
    category: 'all'
  });
  const [testimonialErrors, setTestimonialErrors] = useState<Record<string, string>>({});
  const [deleteTestimonialConfirm, setDeleteTestimonialConfirm] = useState<{ id: string | number; name: string } | null>(null);

  const handleOpenTestimonials = (product: any) => {
    const current = (data.products || []).find((p: any) => String(p.id) === String(product.id)) || product;
    setSelectedProductForTestimonials(current);
    setIsTestimonialModalOpen(true);
    setIsTestimonialFormOpen(false);
    setEditingTestimonialId(null);
  };

  const handleCloseTestimonials = () => {
    setIsTestimonialModalOpen(false);
    setSelectedProductForTestimonials(null);
    setIsTestimonialFormOpen(false);
    setEditingTestimonialId(null);
  };

  const handleOpenNewTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTestimonialFormData({
      id: '',
      name: '',
      role: '',
      organization: '',
      quote: '',
      stars: 5,
      avatar: '',
      city: '',
      metric: '',
      category: 'all'
    });
    setTestimonialErrors({});
    setIsTestimonialFormOpen(true);
  };

  const handleEditTestimonial = (t: any) => {
    setEditingTestimonialId(t.id);
    setTestimonialFormData({
      id: t.id,
      name: t.name || t.author || '',
      role: t.role || '',
      organization: t.organization || t.school || t.restaurant || '',
      quote: t.quote || '',
      stars: typeof t.stars === 'number' ? t.stars : 5,
      avatar: t.avatar || '',
      city: t.city || '',
      metric: t.metric || '',
      category: t.category || 'all'
    });
    setTestimonialErrors({});
    setIsTestimonialFormOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!testimonialFormData.name.trim()) errs.name = 'Author name is required';
    if (!testimonialFormData.role.trim()) errs.role = 'Role / Title is required';
    if (!testimonialFormData.quote.trim()) errs.quote = 'Quote / Feedback text is required';

    if (Object.keys(errs).length > 0) {
      setTestimonialErrors(errs);
      showToast('error', 'Please fill in all required fields');
      return;
    }

    if (!selectedProductForTestimonials) return;

    const currentTestimonials: any[] = Array.isArray(selectedProductForTestimonials.testimonials)
      ? [...selectedProductForTestimonials.testimonials]
      : [];

    const newEntry: ProductTestimonial = {
      id: editingTestimonialId !== null ? editingTestimonialId : Date.now(),
      name: testimonialFormData.name.trim(),
      author: testimonialFormData.name.trim(),
      role: testimonialFormData.role.trim(),
      organization: testimonialFormData.organization?.trim() || '',
      school: testimonialFormData.organization?.trim() || '',
      restaurant: testimonialFormData.organization?.trim() || '',
      quote: testimonialFormData.quote.trim(),
      stars: Number(testimonialFormData.stars) || 5,
      avatar: testimonialFormData.avatar?.trim() || '',
      city: testimonialFormData.city?.trim() || '',
      metric: testimonialFormData.metric?.trim() || '',
      category: testimonialFormData.category?.trim() || 'all'
    };

    let updatedTestimonials: any[];
    if (editingTestimonialId !== null) {
      updatedTestimonials = currentTestimonials.map(item =>
        String(item.id) === String(editingTestimonialId) ? { ...item, ...newEntry } : item
      );
    } else {
      updatedTestimonials = [newEntry, ...currentTestimonials];
    }

    const updatedProducts = (data.products || []).map((p: any) =>
      String(p.id) === String(selectedProductForTestimonials.id)
        ? { ...p, testimonials: updatedTestimonials }
        : p
    );

    updateContent('products', updatedProducts);
    setSelectedProductForTestimonials((prev: any) => ({ ...prev, testimonials: updatedTestimonials }));
    setIsTestimonialFormOpen(false);
    setEditingTestimonialId(null);
    showToast('success', editingTestimonialId !== null ? 'Testimonial updated!' : 'Testimonial added successfully!');
  };

  const handleDeleteTestimonial = () => {
    if (!deleteTestimonialConfirm || !selectedProductForTestimonials) return;
    const targetId = deleteTestimonialConfirm.id;
    const currentTestimonials: any[] = Array.isArray(selectedProductForTestimonials.testimonials)
      ? selectedProductForTestimonials.testimonials
      : [];

    const filtered = currentTestimonials.filter(item => String(item.id) !== String(targetId));

    const updatedProducts = (data.products || []).map((p: any) =>
      String(p.id) === String(selectedProductForTestimonials.id)
        ? { ...p, testimonials: filtered }
        : p
    );

    updateContent('products', updatedProducts);
    setSelectedProductForTestimonials((prev: any) => ({ ...prev, testimonials: filtered }));
    setDeleteTestimonialConfirm(null);
    showToast('success', 'Testimonial deleted successfully!');
  };

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

  const handleToggleComingSoon = (product: any) => {
    const isNowComingSoon = !product.comingSoon;
    const updatedProducts = (data.products || []).map((p: any) =>
      String(p.id) === String(product.id) ? { ...p, comingSoon: isNowComingSoon } : p
    );
    updateContent('products', updatedProducts);
    showToast(
      'success',
      `"${product.title}" is now ${isNowComingSoon ? 'marked as Coming Soon' : 'set to Active'}!`
    );
  };

  const handleAddProduct = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      iconName: 'Box',
      enabled: false,
      comingSoon: false,
      href: '/products/',
      appStoreLink: '',
      playStoreLink: '',
      features: [],
      modules: [],
      testimonials: []
    });
    setErrors({});
    setNewFeature('');
    setNewModule('');
    setIsFormOpen(true);
  };

  const handleOpenForm = (product: any) => {
    const localProduct = (initialData.products as any[]).find(
      (lp: any) => String(lp.id) === String(product.id) || lp.title?.toLowerCase() === product.title?.toLowerCase()
    );
    const resolvedAppStoreLink = (product.appStoreLink && product.appStoreLink !== '#')
      ? product.appStoreLink
      : (localProduct?.appStoreLink && localProduct?.appStoreLink !== '#' ? localProduct.appStoreLink : '');
    const resolvedPlayStoreLink = (product.playStoreLink && product.playStoreLink !== '#')
      ? product.playStoreLink
      : (localProduct?.playStoreLink && localProduct?.playStoreLink !== '#' ? localProduct.playStoreLink : '');

    setEditingId(product.id);
    setFormData({
      title: product.title,
      description: product.description,
      iconName: product.iconName || localProduct?.iconName || 'Box',
      enabled: product.enabled,
      comingSoon: Boolean(product.comingSoon),
      href: (product.href && product.href !== '/products/' ? product.href : localProduct?.href) || product.href || '/products/',
      appStoreLink: resolvedAppStoreLink,
      playStoreLink: resolvedPlayStoreLink,
      features: product.features || localProduct?.features || [],
      modules: product.modules || localProduct?.modules || [],
      testimonials: product.testimonials || localProduct?.testimonials || []
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
      const updatedProducts = (data.products || []).map((p: any) =>
        String(p.id) === String(editingId)
          ? {
              ...p,
              ...formData,
              testimonials: formData.testimonials !== undefined ? formData.testimonials : (p.testimonials || []),
              comingSoon: Boolean(formData.comingSoon)
            }
          : p
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

            {/* Status & Coming Soon Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  product.enabled
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {product.enabled ? '● Active' : '○ Inactive'}
              </span>

              <button
                type="button"
                onClick={() => handleToggleComingSoon(product)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                  product.comingSoon
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-orange-500/20'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-600'
                }`}
                title="Click to toggle Coming Soon status"
              >
                <Clock size={12} />
                {product.comingSoon ? 'Coming Soon: ON' : 'Coming Soon: OFF'}
              </button>
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
            {((product.appStoreLink && product.appStoreLink !== '#') || (product.playStoreLink && product.playStoreLink !== '#')) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.appStoreLink && product.appStoreLink !== '#' && (
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
                {product.playStoreLink && product.playStoreLink !== '#' && (
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

            {/* Manage Testimonials Button */}
            <button
              type="button"
              onClick={() => handleOpenTestimonials(product)}
              className="w-full py-2 px-4 mb-3 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-indigo-200 dark:border-indigo-800 text-sm"
            >
              <MessageSquare size={16} className="text-indigo-600 dark:text-indigo-400" />
              Manage Testimonials ({product.testimonials?.length || 0})
            </button>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Enabled"
                  name="enabled"
                  type="checkbox"
                  value={formData.enabled}
                  onChange={(value) => setFormData({ ...formData, enabled: value })}
                  helpText="Toggle product visibility on the public site"
                />

                <FormField
                  label="Coming Soon"
                  name="comingSoon"
                  type="checkbox"
                  value={formData.comingSoon}
                  onChange={(value) => setFormData({ ...formData, comingSoon: value })}
                  helpText="Highlight in popup with 'Coming Soon' button"
                />
              </div>

              {/* Testimonials Quick Access */}
              {editingId !== null && (
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                      <MessageSquare size={16} />
                      Product Testimonials
                    </h4>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-0.5">
                      {(formData.testimonials || []).length} testimonial{(formData.testimonials || []).length === 1 ? '' : 's'} configured for {formData.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = (data.products || []).find((p: any) => String(p.id) === String(editingId)) || formData;
                      handleOpenTestimonials(cur);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
                  >
                    Manage Testimonials
                  </button>
                </div>
              )}

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

      {/* Testimonials Modal */}
      {isTestimonialModalOpen && selectedProductForTestimonials && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <MessageSquare size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Testimonials — {selectedProductForTestimonials.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Manage client reviews and success stories displayed on the {selectedProductForTestimonials.title} app
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseTestimonials}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Toolbar */}
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {(selectedProductForTestimonials.testimonials || []).length} Testimonial{((selectedProductForTestimonials.testimonials || []).length === 1 ? '' : 's')}
                </span>
                {!isTestimonialFormOpen && (
                  <button
                    type="button"
                    onClick={handleOpenNewTestimonialForm}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-md shadow-indigo-500/20"
                  >
                    <Plus size={16} />
                    Add Testimonial
                  </button>
                )}
              </div>

              {/* Inline Testimonial Form (Add / Edit) */}
              {isTestimonialFormOpen && (
                <form onSubmit={handleSaveTestimonial} className="p-5 bg-indigo-50/50 dark:bg-slate-700/40 rounded-xl border border-indigo-200 dark:border-slate-600 space-y-4">
                  <div className="flex items-center justify-between border-b border-indigo-100 dark:border-slate-600 pb-3">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Edit2 size={16} className="text-indigo-600 dark:text-indigo-400" />
                      {editingTestimonialId !== null ? 'Edit Testimonial' : 'New Testimonial'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setIsTestimonialFormOpen(false);
                        setEditingTestimonialId(null);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Author / Client Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={testimonialFormData.name}
                        onChange={(e) => {
                          setTestimonialFormData({ ...testimonialFormData, name: e.target.value });
                          if (testimonialErrors.name) setTestimonialErrors({ ...testimonialErrors, name: '' });
                        }}
                        placeholder="e.g. Mrs. Sunita Sen / Rohit Sharma"
                        className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                      {testimonialErrors.name && (
                        <p className="text-xs text-red-500 mt-1">{testimonialErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Role / Designation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={testimonialFormData.role}
                        onChange={(e) => {
                          setTestimonialFormData({ ...testimonialFormData, role: e.target.value });
                          if (testimonialErrors.role) setTestimonialErrors({ ...testimonialErrors, role: '' });
                        }}
                        placeholder="e.g. Principal / Restaurant Owner / Operations Head"
                        className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                      {testimonialErrors.role && (
                        <p className="text-xs text-red-500 mt-1">{testimonialErrors.role}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Organization / School / Restaurant
                      </label>
                      <input
                        type="text"
                        value={testimonialFormData.organization || ''}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, organization: e.target.value })}
                        placeholder="e.g. Delhi Public School / The Spice Route / Metro Financial"
                        className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Rating (1 - 5 Stars)
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            type="button"
                            key={starVal}
                            onClick={() => setTestimonialFormData({ ...testimonialFormData, stars: starVal })}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform"
                          >
                            <Star
                              size={20}
                              className={starVal <= (testimonialFormData.stars || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 ml-2">
                          {testimonialFormData.stars || 5} Stars
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Quote / Review Text <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={testimonialFormData.quote}
                        onChange={(e) => {
                          setTestimonialFormData({ ...testimonialFormData, quote: e.target.value });
                          if (testimonialErrors.quote) setTestimonialErrors({ ...testimonialErrors, quote: '' });
                        }}
                        placeholder="Write client testimonial quote..."
                        className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                      {testimonialErrors.quote && (
                        <p className="text-xs text-red-500 mt-1">{testimonialErrors.quote}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Avatar Image URL (optional)
                      </label>
                      <input
                        type="text"
                        value={testimonialFormData.avatar || ''}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, avatar: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        City (optional)
                      </label>
                      <input
                        type="text"
                        value={testimonialFormData.city || ''}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, city: e.target.value })}
                        placeholder="e.g. Pune / Mumbai / Bengaluru"
                        className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Highlight Metric (optional)
                      </label>
                      <input
                        type="text"
                        value={testimonialFormData.metric || ''}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, metric: e.target.value })}
                        placeholder="e.g. 20 Min Faster Tables / 14 Outlets Synced"
                        className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Category Tag (optional)
                      </label>
                      <input
                        type="text"
                        value={testimonialFormData.category || ''}
                        onChange={(e) => setTestimonialFormData({ ...testimonialFormData, category: e.target.value })}
                        placeholder="e.g. finedine / cafe / qsr / chain / general"
                        className="w-full px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsTestimonialFormOpen(false);
                        setEditingTestimonialId(null);
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
                    >
                      {editingTestimonialId !== null ? 'Save Changes' : 'Add Testimonial'}
                    </button>
                  </div>
                </form>
              )}

              {/* Testimonials List */}
              {(!selectedProductForTestimonials.testimonials || selectedProductForTestimonials.testimonials.length === 0) ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                  <Quote className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    No testimonials configured yet for {selectedProductForTestimonials.title}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Click "Add Testimonial" above to add the first client review.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProductForTestimonials.testimonials.map((t: any, idx: number) => {
                    const authorName = t.name || t.author || 'Anonymous';
                    const org = t.organization || t.school || t.restaurant || '';
                    const starsCount = typeof t.stars === 'number' ? t.stars : 5;

                    return (
                      <div
                        key={t.id || idx}
                        className="p-4 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
                      >
                        <div>
                          {/* Card Header: Stars & Badges */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={i < starsCount ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}
                                />
                              ))}
                            </div>
                            <div className="flex items-center gap-1">
                              {t.metric && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                                  {t.metric}
                                </span>
                              )}
                              {t.category && t.category !== 'all' && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full capitalize">
                                  {t.category}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quote */}
                          <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-4 line-clamp-4 leading-relaxed">
                            "{t.quote}"
                          </p>
                        </div>

                        {/* Card Footer: Author details + Actions */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {t.avatar ? (
                              <img
                                src={t.avatar}
                                alt={authorName}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">
                                {authorName.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                                {authorName}
                              </h5>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                                {t.role}{org ? ` • ${org}` : ''}{t.city ? ` (${t.city})` : ''}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditTestimonial(t)}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                              title="Edit Testimonial"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTestimonialConfirm({ id: t.id, name: authorName })}
                              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Delete Testimonial"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
              <button
                type="button"
                onClick={handleCloseTestimonials}
                className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Testimonial Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTestimonialConfirm}
        onClose={() => setDeleteTestimonialConfirm(null)}
        onConfirm={handleDeleteTestimonial}
        title="Delete Testimonial?"
        message={`Are you sure you want to delete the testimonial from "${deleteTestimonialConfirm?.name}"? This action will immediately remove it from the product page.`}
        confirmText="Delete"
        danger
      />
    </div>
  );
};

export default ProductManager;
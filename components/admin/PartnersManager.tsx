import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors, commonRules } from '../../utils/validation';
import FormField from './FormField';
import ConfirmDialog from './ConfirmDialog';
import { Plus, Edit2, Trash2, MapPin, Mail, Phone } from 'lucide-react';

interface PartnerForm {
  region: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  color: string;
}

const PartnersManager: React.FC = () => {
  const { data, addItem, updateItem, deleteItem, updateContent } = useContent();
  const { showToast } = useToast();
  
  const [activeSection, setActiveSection] = useState<'partners' | 'slides'>('partners');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PartnerForm>({
    region: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    color: 'blue'
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({ isOpen: false, id: null });

  const validationRules = {
    region: { required: true },
    name: {
      required: true,
      minLength: 3,
      maxLength: 100
    },
    address: {
      required: true,
      minLength: 10
    },
    email: {
      required: true,
      ...commonRules.email
    },
    phone: {
      required: true,
      ...commonRules.phone
    }
  };

  const partners = data.partners?.items || [];

  const handleOpenForm = (partner?: any) => {
    if (partner) {
      setEditingId(partner.id);
      setFormData({
        region: partner.region,
        name: partner.name,
        address: partner.address,
        email: partner.email,
        phone: partner.phone,
        color: partner.color || 'blue'
      });
    } else {
      setEditingId(null);
      setFormData({
        region: '',
        name: '',
        address: '',
        email: '',
        phone: '',
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

    const updatedPartners = { ...data.partners };
    
    if (editingId) {
      const index = partners.findIndex((p: any) => p.id === editingId);
      if (index !== -1) {
        updatedPartners.items = [...partners];
        updatedPartners.items[index] = { ...formData, id: editingId };
        updateContent('partners', updatedPartners);
        showToast('success', 'Partner updated successfully!');
      }
    } else {
      const newPartner = { id: Date.now(), ...formData };
      updatedPartners.items = [...partners, newPartner];
      updateContent('partners', updatedPartners);
      showToast('success', 'Partner added successfully!');
    }

    handleCloseForm();
  };

  const handleDelete = () => {
    if (deleteDialog.id) {
      const updatedPartners = { ...data.partners };
      updatedPartners.items = partners.filter((p: any) => p.id !== deleteDialog.id);
      updateContent('partners', updatedPartners);
      showToast('success', 'Partner deleted successfully!');
      setDeleteDialog({ isOpen: false, id: null });
    }
  };

  const openDeleteDialog = (id: number) => {
    setDeleteDialog({ isOpen: true, id });
  };

  return (
    <div>
      {/* Header with Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Channel Partners</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage partners and hero slides</p>
        </div>
        {activeSection === 'partners' && (
          <button
            onClick={() => handleOpenForm()}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Partner
          </button>
        )}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveSection('partners')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSection === 'partners'
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          Partners
        </button>
        <button
          onClick={() => setActiveSection('slides')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSection === 'slides'
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          Hero Slides
        </button>
      </div>

      {/* Partners Section */}
      {activeSection === 'partners' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {partners.map((partner: any) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-${partner.color}-500`} />
              
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase bg-${partner.color}-100 dark:bg-${partner.color}-900/30 text-${partner.color}-700 dark:text-${partner.color}-300`}>
                  {partner.region}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenForm(partner)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => openDeleteDialog(partner.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white mb-4">{partner.name}</h3>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <MapPin size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300">{partner.address}</span>
                </div>
                <div className="flex gap-2">
                  <Mail size={16} className="text-slate-400 flex-shrink-0" />
                  <a href={`mailto:${partner.email}`} className="text-brand-600 dark:text-brand-400 hover:underline">
                    {partner.email}
                  </a>
                </div>
                <div className="flex gap-2">
                  <Phone size={16} className="text-slate-400 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">{partner.phone}</span>
                </div>
              </div>
            </div>
          ))}

          {partners.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
              No partners yet. Click "Add Partner" to create one.
            </div>
          )}
        </div>
      )}

      {/* Hero Slides Section */}
      {activeSection === 'slides' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Hero slides can be managed directly in the data file for now.
            <br />
            Full slide editor coming soon.
          </p>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Partner' : 'Add New Partner'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FormField
                label="Region"
                name="region"
                value={formData.region}
                onChange={(value) => setFormData({ ...formData, region: value })}
                error={errors.region}
                required
                placeholder="e.g., South India, North East India"
              />

              <FormField
                label="Name"
                name="name"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                error={errors.name}
                required
                placeholder="Partner name or company"
              />

              <FormField
                label="Address"
                name="address"
                type="textarea"
                value={formData.address}
                onChange={(value) => setFormData({ ...formData, address: value })}
                error={errors.address}
                required
                rows={3}
                placeholder="Complete address"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => setFormData({ ...formData, email: value })}
                  error={errors.email}
                  required
                  placeholder="email@example.com"
                />

                <FormField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  error={errors.phone}
                  required
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  {['blue', 'purple', 'emerald', 'orange', 'red', 'pink'].map((color) => (
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
                          emerald: '#10b981',
                          orange: '#f97316',
                          red: '#ef4444',
                          pink: '#ec4899'
                        }[color]
                      }}
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
        title="Delete Partner"
        message="Are you sure you want to delete this partner? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </div>
  );
};

export default PartnersManager;

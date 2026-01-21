import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors, commonRules } from '../../utils/validation';
import FormField from './FormField';
import { MapPin, Mail, Phone, Globe, Save } from 'lucide-react';

interface ContactForm {
  office: string;
  email: string;
  phone: string;
  website: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

const ContactManager: React.FC = () => {
  const { data, updateContent } = useContent();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState<ContactForm>({
    office: data.contact?.office || '',
    email: data.contact?.email || '',
    phone: data.contact?.phone || '',
    website: data.contact?.website || '',
    facebook: data.contact?.socials?.facebook || '',
    twitter: data.contact?.socials?.twitter || '',
    linkedin: data.contact?.socials?.linkedin || '',
    instagram: data.contact?.socials?.instagram || ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const validationRules = {
    office: {
      required: true,
      minLength: 10,
      message: 'Office address must be at least 10 characters'
    },
    email: {
      required: true,
      ...commonRules.email
    },
    phone: {
      required: true,
      ...commonRules.phone
    },
    website: {
      required: true,
      ...commonRules.url
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('error', 'Please fix the errors in the form');
      return;
    }

    setIsSaving(true);

    // Update contact info
    const updatedContact = {
      office: formData.office,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      socials: {
        facebook: formData.facebook || '',
        twitter: formData.twitter || '',
        linkedin: formData.linkedin || '',
        instagram: formData.instagram || ''
      }
    };

    updateContent('contact', updatedContact);
    showToast('success', 'Contact information updated successfully!');
    setIsSaving(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Information</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage contact details and social media links
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        {/* Primary Contact Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-brand-600" />
            Primary Contact
          </h3>

          <FormField
            label="Office Address"
            name="office"
            type="textarea"
            value={formData.office}
            onChange={(value) => setFormData({ ...formData, office: value })}
            error={errors.office}
            required
            rows={3}
            placeholder="Enter complete office address"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              error={errors.email}
              required
              placeholder="contact@example.com"
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

          <FormField
            label="Website"
            name="website"
            type="url"
            value={formData.website}
            onChange={(value) => setFormData({ ...formData, website: value })}
            error={errors.website}
            required
            placeholder="https://www.example.com"
          />
        </div>

        {/* Social Media */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe size={20} className="text-brand-600" />
            Social Media Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Facebook"
              name="facebook"
              type="url"
              value={formData.facebook || ''}
              onChange={(value) => setFormData({ ...formData, facebook: value })}
              placeholder="https://facebook.com/yourpage"
              helpText="Optional"
            />

            <FormField
              label="Twitter"
              name="twitter"
              type="url"
              value={formData.twitter || ''}
              onChange={(value) => setFormData({ ...formData, twitter: value })}
              placeholder="https://twitter.com/yourhandle"
              helpText="Optional"
            />

            <FormField
              label="LinkedIn"
              name="linkedin"
              type="url"
              value={formData.linkedin || ''}
              onChange={(value) => setFormData({ ...formData, linkedin: value })}
              placeholder="https://linkedin.com/company/yourcompany"
              helpText="Optional"
            />

            <FormField
              label="Instagram"
              name="instagram"
              type="url"
              value={formData.instagram || ''}
              onChange={(value) => setFormData({ ...formData, instagram: value })}
              placeholder="https://instagram.com/yourhandle"
              helpText="Optional"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Preview */}
      <div className="mt-8 max-w-3xl">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Preview</h3>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Office
              </p>
              <p className="text-slate-700 dark:text-slate-300">{formData.office || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail size={20} className="text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Email
              </p>
              <p className="text-brand-600 dark:text-brand-400">{formData.email || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone size={20} className="text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Phone
              </p>
              <p className="text-slate-700 dark:text-slate-300">{formData.phone || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe size={20} className="text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Website
              </p>
              <p className="text-brand-600 dark:text-brand-400">{formData.website || 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;

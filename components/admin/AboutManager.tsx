import React, { useState } from 'react';
import { useContent } from '../../hooks/useContent';
import { useToast } from '../../hooks/useToast';
import { validateForm, ValidationErrors, commonRules } from '../../utils/validation';
import FormField from './FormField';
import { Info, Save, Target, Eye, Users, Heart, Plus, X } from 'lucide-react';

interface AboutForm {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  whoWeAreTitle: string;
  whoWeAreContent: string[];
  whoWeAreExperience: string;
  whoWeAreImage: string;
  visionTitle: string;
  visionContent: string;
  visionPoints: string[];
  missionTitle: string;
  missionContent: string;
  missionPoints: string[];
  values: Array<{ title: string; description: string; iconName: string }>;
}

const AboutManager: React.FC = () => {
  const { data, updateContent } = useContent();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState<AboutForm>({
    heroTitle: data.about?.hero?.title || '',
    heroSubtitle: data.about?.hero?.subtitle || '',
    heroImage: data.about?.hero?.image || '',
    whoWeAreTitle: data.about?.whoWeAre?.title || '',
    whoWeAreContent: data.about?.whoWeAre?.content || [],
    whoWeAreExperience: data.about?.whoWeAre?.yearsExperience || '',
    whoWeAreImage: data.about?.whoWeAre?.image || '',
    visionTitle: data.about?.vision?.title || '',
    visionContent: data.about?.vision?.content || '',
    visionPoints: data.about?.vision?.points || [],
    missionTitle: data.about?.mission?.title || '',
    missionContent: data.about?.mission?.content || '',
    missionPoints: data.about?.mission?.points || [],
    values: data.about?.values || []
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const validationRules = {
    heroTitle: { required: true, minLength: 5 },
    heroSubtitle: { required: true, minLength: 10 },
    heroImage: { required: true, ...commonRules.url },
    whoWeAreTitle: { required: true },
    whoWeAreContent: { required: true }, // Custom check needed for array
    whoWeAreExperience: { required: true },
    visionTitle: { required: true },
    visionContent: { required: true, minLength: 20 },
    missionTitle: { required: true },
    missionContent: { required: true, minLength: 20 }
  };

  const updateWhoWeAreContent = (index: number, value: string) => {
    const newContent = [...formData.whoWeAreContent];
    newContent[index] = value;
    setFormData({ ...formData, whoWeAreContent: newContent });
  };

  const addParagraph = () => {
    setFormData({ ...formData, whoWeAreContent: [...formData.whoWeAreContent, ''] });
  };

  const removeParagraph = (index: number) => {
    const newContent = formData.whoWeAreContent.filter((_, i) => i !== index);
    setFormData({ ...formData, whoWeAreContent: newContent });
  };

  const addValue = () => {
    setFormData({
      ...formData,
      values: [...formData.values, { title: '', description: '', iconName: 'Heart' }]
    });
  };

  const updateValue = (index: number, field: string, value: string) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData({ ...formData, values: newValues });
  };

  const removeValue = (index: number) => {
    const newValues = formData.values.filter((_, i) => i !== index);
    setFormData({ ...formData, values: newValues });
  };

  const addVisionPoint = () => {
    setFormData({ ...formData, visionPoints: [...formData.visionPoints, ''] });
  };

  const updateVisionPoint = (index: number, value: string) => {
    const newPoints = [...formData.visionPoints];
    newPoints[index] = value;
    setFormData({ ...formData, visionPoints: newPoints });
  };

  const removeVisionPoint = (index: number) => {
    const newPoints = formData.visionPoints.filter((_, i) => i !== index);
    setFormData({ ...formData, visionPoints: newPoints });
  };

  const addMissionPoint = () => {
    setFormData({ ...formData, missionPoints: [...formData.missionPoints, ''] });
  };

  const updateMissionPoint = (index: number, value: string) => {
    const newPoints = [...formData.missionPoints];
    newPoints[index] = value;
    setFormData({ ...formData, missionPoints: newPoints });
  };

  const removeMissionPoint = (index: number) => {
    const newPoints = formData.missionPoints.filter((_, i) => i !== index);
    setFormData({ ...formData, missionPoints: newPoints });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom validation for content array
    if (formData.whoWeAreContent.some(p => !p.trim())) {
      showToast('error', 'All paragraphs in "Who We Are" must contain text');
      return;
    }

    const validationErrors = validateForm(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('error', 'Please fix the errors in the form');
      return;
    }

    setIsSaving(true);

    // Construct the nested about object
    const updatedAbout = {
      ...data.about,
      hero: {
        title: formData.heroTitle,
        subtitle: formData.heroSubtitle,
        image: formData.heroImage
      },
      whoWeAre: {
        title: formData.whoWeAreTitle,
        content: formData.whoWeAreContent,
        yearsExperience: formData.whoWeAreExperience,
        image: formData.whoWeAreImage
      },
      vision: {
        title: formData.visionTitle,
        content: formData.visionContent,
        points: formData.visionPoints
      },
      mission: {
        title: formData.missionTitle,
        content: formData.missionContent,
        points: formData.missionPoints
      },
      values: formData.values
    };

    updateContent('about', updatedAbout);
    showToast('success', 'About section updated successfully!');
    setIsSaving(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">About Us</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage company story, vision, and mission
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Section 1: Hero */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Info size={20} className="text-brand-600" />
            Hero Section
          </h3>
          
          <div className="space-y-4">
            <FormField
              label="Title"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={(value) => setFormData({ ...formData, heroTitle: value })}
              error={errors.heroTitle}
              required
            />
            <FormField
              label="Subtitle"
              name="heroSubtitle"
              type="textarea"
              value={formData.heroSubtitle}
              onChange={(value) => setFormData({ ...formData, heroSubtitle: value })}
              error={errors.heroSubtitle}
              required
              rows={2}
            />
            <FormField
              label="Hero Image URL"
              name="heroImage"
              type="url"
              value={formData.heroImage}
              onChange={(value) => setFormData({ ...formData, heroImage: value })}
              error={errors.heroImage}
              required
            />
          </div>
        </div>

        {/* Section 2: Who We Are */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-brand-600" />
            Who We Are
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                label="Section Title"
                name="whoWeAreTitle"
                value={formData.whoWeAreTitle}
                onChange={(value) => setFormData({ ...formData, whoWeAreTitle: value })}
                error={errors.whoWeAreTitle}
                required
              />
               <FormField
                label="Years of Experience"
                name="whoWeAreExperience"
                value={formData.whoWeAreExperience}
                onChange={(value) => setFormData({ ...formData, whoWeAreExperience: value })}
                error={errors.whoWeAreExperience}
                required
                placeholder="e.g. 10+"
              />
            </div>

             <FormField
              label="Section Image URL"
              name="whoWeAreImage"
              type="url"
              value={formData.whoWeAreImage}
              onChange={(value) => setFormData({ ...formData, whoWeAreImage: value })}
              error={errors.whoWeAreImage} // Note: check variable name in validationRules
              required
            />

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Content Paragraphs
              </label>
              <div className="space-y-3">
                {formData.whoWeAreContent.map((paragraph, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea
                      value={paragraph}
                      onChange={(e) => updateWhoWeAreContent(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-slate-700 dark:text-white"
                      rows={3}
                      placeholder={`Paragraph ${index + 1}`}
                    />
                    {formData.whoWeAreContent.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParagraph(index)}
                        className="self-start p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="Remove paragraph"
                      >
                         &times;
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addParagraph}
                  className="text-sm text-brand-600 font-medium hover:underline"
                >
                  + Add another paragraph
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye size={20} className="text-brand-600" />
              Vision
            </h3>
            <div className="space-y-4">
              <FormField
                label="Title"
                name="visionTitle"
                value={formData.visionTitle}
                onChange={(value) => setFormData({ ...formData, visionTitle: value })}
                error={errors.visionTitle}
                required
              />
              <FormField
                label="Content"
                name="visionContent"
                type="textarea"
                value={formData.visionContent}
                onChange={(value) => setFormData({ ...formData, visionContent: value })}
                error={errors.visionContent}
                required
                rows={4}
              />
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Key Points (Optional)
                </label>
                <div className="space-y-2">
                  {formData.visionPoints.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateVisionPoint(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-slate-700 dark:text-white"
                        placeholder={`Point ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeVisionPoint(index)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="Remove point"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addVisionPoint}
                    className="text-sm text-brand-600 font-medium hover:underline flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add key point
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Target size={20} className="text-brand-600" />
              Mission
            </h3>
            <div className="space-y-4">
               <FormField
                label="Title"
                name="missionTitle"
                value={formData.missionTitle}
                onChange={(value) => setFormData({ ...formData, missionTitle: value })}
                error={errors.missionTitle}
                required
              />
              <FormField
                label="Content"
                name="missionContent"
                type="textarea"
                value={formData.missionContent}
                onChange={(value) => setFormData({ ...formData, missionContent: value })}
                error={errors.missionContent}
                required
                rows={4}
              />
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Key Points (Optional)
                </label>
                <div className="space-y-2">
                  {formData.missionPoints.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateMissionPoint(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-slate-700 dark:text-white"
                        placeholder={`Point ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeMissionPoint(index)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="Remove point"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMissionPoint}
                    className="text-sm text-brand-600 font-medium hover:underline flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add key point
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Core Values */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Heart size={20} className="text-brand-600" />
            Core Values
          </h3>
          
          <div className="space-y-4">
            {formData.values.map((value, index) => (
              <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Value #{index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeValue(index)}
                    className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    title="Remove value"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <FormField
                    label="Title"
                    name={`value-title-${index}`}
                    value={value.title}
                    onChange={(val) => updateValue(index, 'title', val)}
                    placeholder="e.g., Innovation"
                    required
                  />
                  
                  <FormField
                    label="Description"
                    name={`value-description-${index}`}
                    type="textarea"
                    value={value.description}
                    onChange={(val) => updateValue(index, 'description', val)}
                    placeholder="Describe this core value..."
                    rows={2}
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Icon
                    </label>
                    <select
                      value={value.iconName}
                      onChange={(e) => updateValue(index, 'iconName', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-slate-700 dark:text-white"
                    >
                      <option value="Heart">Heart</option>
                      <option value="Shield">Shield</option>
                      <option value="Zap">Zap</option>
                      <option value="Users">Users</option>
                      <option value="Target">Target</option>
                      <option value="Eye">Eye</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addValue}
              className="w-full py-3 px-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-brand-600 dark:text-brand-400 font-medium hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Core Value
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold text-lg shadow-lg shadow-brand-600/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save size={20} />
            {isSaving ? 'Saving Changes...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManager;

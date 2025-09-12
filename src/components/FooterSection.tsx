import React from 'react';
import type { Footer, FormErrors } from '../types';
import CollapsibleSection from './CollapsibleSection';

interface FooterSectionProps {
  data: Footer;
  errors: FormErrors;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (data: Partial<Footer>) => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  data,
  errors,
  isExpanded,
  onToggle,
  onChange,
}) => {
  const handleInputChange = (field: keyof Footer, value: string) => {
    onChange({ [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would handle file upload here
      // For now, we'll just use the filename
      onChange({ supervisorSignature: file.name });
    }
  };

  return (
    <CollapsibleSection
      title="Supervisor Approval"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Supervisor's Signature <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={data.supervisorSignature}
                onChange={(e) => handleInputChange('supervisorSignature', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.supervisorSignature ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter supervisor's name"
              />
              {errors.supervisorSignature && (
                <p className="text-sm text-red-600">{errors.supervisorSignature}</p>
              )}
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Or upload signature file:</p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="mt-1 text-xs text-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="text-sm text-red-600">{errors.date}</p>
            )}
          </div>
        </div>

      </div>
    </CollapsibleSection>
  );
};

export default FooterSection;

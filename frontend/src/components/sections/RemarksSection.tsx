import React from "react";
import type { Remarks, FormErrors } from "../types";
import CollapsibleSection from "../common/CollapsibleSection";

interface RemarksSectionProps {
  data: Remarks;
  errors: FormErrors;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (data: Partial<Remarks>) => void;
}

const RemarksSection: React.FC<RemarksSectionProps> = ({
  data,
  errors,
  isExpanded,
  onToggle,
  onChange,
}) => {
  const handleInputChange = (field: keyof Remarks, value: string) => {
    onChange({ [field]: value });
  };

  const handlePiggingOptionChange = (option: string, checked: boolean) => {
    const currentOptions = data.piggingOptions || [];
    const newOptions = checked
      ? [...currentOptions, option]
      : currentOptions.filter((item) => item !== option);
    onChange({ piggingOptions: newOptions });
  };

  const piggingOptions = [
    "Before Assembly",
    "After Assembly",
    "Before Testing",
    "After Testing",
    "Final Inspection",
    "Packaging",
  ];

  return (
    <CollapsibleSection
      title="Remarks"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            General Remarks
          </label>
          <textarea
            value={data.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter any general remarks, observations, or notes about the process..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Welding Rod Number
            </label>
            <input
              type="text"
              value={data.weldingRodNumber || ""}
              onChange={(e) =>
                handleInputChange("weldingRodNumber", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter welding rod number"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Welding Rod Size Used
            </label>
            <input
              type="text"
              value={data.weldingRodSize || ""}
              onChange={(e) =>
                handleInputChange("weldingRodSize", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter welding rod size"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-800">
            Pigging Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {piggingOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.piggingOptions?.includes(option) || false}
                  onChange={(e) =>
                    handlePiggingOptionChange(option, e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default RemarksSection;

import React from "react";
import type { InProcessDetails, FormErrors, ProcessDetail } from "../../types";
import CollapsibleSection from "../common/CollapsibleSection";

interface InProcessDetailsSectionProps {
  data: InProcessDetails;
  errors: FormErrors;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (data: Partial<InProcessDetails>) => void;
}

const ProcessDetailForm: React.FC<{
  title: string;
  data: ProcessDetail;
  onChange: (data: ProcessDetail) => void;
  showMeasurements?: boolean;
}> = ({ title, data, onChange, showMeasurements = false }) => {
  const handleInputChange = (field: keyof ProcessDetail, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleMeasurementChange = (
    field: "value" | "unit",
    value: string | number
  ) => {
    if (data.measurements) {
      onChange({
        ...data,
        measurements: {
          ...data.measurements,
          [field]: value,
        },
      });
    }
  };

  const unitOptions = ["mm", "cm", "m", "ft", "in"];

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-semibold text-gray-800 border-b pb-2">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Operator Sign
          </label>
          <input
            type="text"
            value={data.operatorSign}
            onChange={(e) => handleInputChange("operatorSign", e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Operator signature"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700">
            Machine Number
          </label>
          <input
            type="text"
            value={data.machineNumber}
            onChange={(e) => handleInputChange("machineNumber", e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Machine number"
          />
        </div>

        {showMeasurements && data.measurements && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Measurement Value
              </label>
              <input
                type="number"
                value={data.measurements.value}
                onChange={(e) =>
                  handleMeasurementChange(
                    "value",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Value"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Unit
              </label>
              <select
                value={data.measurements.unit}
                onChange={(e) =>
                  handleMeasurementChange("unit", e.target.value)
                }
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          value={data.additionalNotes || ""}
          onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={2}
          placeholder="Additional notes or observations"
        />
      </div>
    </div>
  );
};

const InProcessDetailsSection: React.FC<InProcessDetailsSectionProps> = ({
  data,
  isExpanded,
  onToggle,
  onChange,
}) => {
  // Ensure data is always defined
  const safeData = data || {};

  const handleSectionChange = (
    section: keyof InProcessDetails,
    sectionData: unknown
  ) => {
    onChange({ [section]: sectionData });
  };

  const handleSkivingChange = (
    type: "internal" | "external",
    sectionData: ProcessDetail
  ) => {
    onChange({
      skivingDetails: {
        ...safeData.skivingDetails,
        [type]: sectionData,
      },
    });
  };

  return (
    <CollapsibleSection
      title="In-Process Details"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <ProcessDetailForm
          title="Hose Cut Details"
          data={safeData.hoseCutDetails || {}}
          onChange={(sectionData) =>
            handleSectionChange("hoseCutDetails", sectionData)
          }
          showMeasurements={true}
        />

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">
            Skiving Details
          </h3>
          <div className="space-y-4">
            <ProcessDetailForm
              title="Internal Skiving"
              data={safeData.skivingDetails?.internal || {}}
              onChange={(sectionData) =>
                handleSkivingChange("internal", sectionData)
              }
              showMeasurements={true}
            />
            <ProcessDetailForm
              title="External Skiving"
              data={safeData.skivingDetails?.external || {}}
              onChange={(sectionData) =>
                handleSkivingChange("external", sectionData)
              }
              showMeasurements={true}
            />
          </div>
        </div>

        <ProcessDetailForm
          title="Assembly Details"
          data={safeData.assemblyDetails || {}}
          onChange={(sectionData) =>
            handleSectionChange("assemblyDetails", sectionData)
          }
        />

        <ProcessDetailForm
          title="Mandrals Details"
          data={safeData.mandralsDetails || {}}
          onChange={(sectionData) =>
            handleSectionChange("mandralsDetails", sectionData)
          }
        />

        <ProcessDetailForm
          title="Crimping Details"
          data={safeData.crimpingDetails || {}}
          onChange={(sectionData) =>
            handleSectionChange("crimpingDetails", sectionData)
          }
          showMeasurements={true}
        />

        <ProcessDetailForm
          title="Welding Details"
          data={safeData.weldingDetails || {}}
          onChange={(sectionData) =>
            handleSectionChange("weldingDetails", sectionData)
          }
        />

        <ProcessDetailForm
          title="Punching / Tagging Details"
          data={safeData.punchingTaggingDetails || {}}
          onChange={(sectionData) =>
            handleSectionChange("punchingTaggingDetails", sectionData)
          }
        />
      </div>
    </CollapsibleSection>
  );
};

export default InProcessDetailsSection;

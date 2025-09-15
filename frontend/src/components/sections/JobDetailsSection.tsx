import React from "react";
import type { JobDetails, FormErrors } from "../types";
import CollapsibleSection from "../common/CollapsibleSection";

interface JobDetailsSectionProps {
  data: JobDetails;
  errors: FormErrors;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (data: Partial<JobDetails>) => void;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({
  data,
  errors,
  isExpanded,
  onToggle,
  onChange,
}) => {
  const handleInputChange = (field: keyof JobDetails, value: unknown) => {
    onChange({ [field]: value });
  };

  const handleMocChange = (moc: string, checked: boolean) => {
    const newMoc = checked
      ? [...data.moc, moc]
      : data.moc.filter((item) => item !== moc);
    onChange({ moc: newMoc });
  };

  const handleFittingTypeChange = (end: "endA" | "endB", value: string) => {
    onChange({
      fittingType: {
        ...data.fittingType,
        [end]: value,
      },
    });
  };

  const handleLengthCutChange = (
    field: "value" | "unit",
    value: string | number
  ) => {
    onChange({
      lengthCut: {
        ...data.lengthCut,
        [field]: value,
      },
    });
  };

  const handleTraceabilityChange = (
    field: keyof JobDetails["traceability"],
    value: string
  ) => {
    onChange({
      traceability: {
        ...data.traceability,
        [field]: value,
      },
    });
  };

  const mocOptions = ["CS", "SS", "AL", "BR"];
  const unitOptions = ["mm", "cm", "m", "ft", "in"];

  return (
    <CollapsibleSection
      title="Job Details"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hose Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.hoseType}
              onChange={(e) => handleInputChange("hoseType", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.hoseType ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter hose type"
            />
            {errors.hoseType && (
              <p className="text-sm text-red-600">{errors.hoseType}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hose ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.hoseId}
              onChange={(e) => handleInputChange("hoseId", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.hoseId ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter hose ID"
            />
            {errors.hoseId && (
              <p className="text-sm text-red-600">{errors.hoseId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Length Cut L/LOA
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={data.lengthCut.value}
                onChange={(e) =>
                  handleLengthCutChange(
                    "value",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Length"
                min="0"
                step="0.01"
              />
              <select
                value={data.lengthCut.unit}
                onChange={(e) => handleLengthCutChange("unit", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={data.quantity}
              onChange={(e) =>
                handleInputChange("quantity", parseInt(e.target.value) || 0)
              }
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.quantity ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter quantity"
              min="1"
            />
            {errors.quantity && (
              <p className="text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-800">Fitting Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                End A
              </label>
              <select
                value={data.fittingType.endA}
                onChange={(e) =>
                  handleFittingTypeChange("endA", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select End A</option>
                <option value="Adaptor A">Adaptor A</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                End B
              </label>
              <select
                value={data.fittingType.endB}
                onChange={(e) =>
                  handleFittingTypeChange("endB", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select End B</option>
                <option value="Adaptor B">Adaptor B</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-800">
            MOC (Material of Construction){" "}
            <span className="text-red-500">*</span>
          </h3>
          <div className="flex flex-wrap gap-4">
            {mocOptions.map((moc) => (
              <label key={moc} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.moc.includes(moc)}
                  onChange={(e) => handleMocChange(moc, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{moc}</span>
              </label>
            ))}
          </div>
          {errors.moc && <p className="text-sm text-red-600">{errors.moc}</p>}
        </div>

        <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-800">Traceability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hose Batch Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.traceability.hoseBatchNumber}
                onChange={(e) =>
                  handleTraceabilityChange("hoseBatchNumber", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.hoseBatchNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter hose batch number"
              />
              {errors.hoseBatchNumber && (
                <p className="text-sm text-red-600">{errors.hoseBatchNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Flexiflo Batch No
              </label>
              <input
                type="text"
                value={data.traceability.flexifloBatchNo}
                onChange={(e) =>
                  handleTraceabilityChange("flexifloBatchNo", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Flexiflo batch number"
              />
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default JobDetailsSection;

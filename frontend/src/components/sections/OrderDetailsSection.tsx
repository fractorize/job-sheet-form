import React from "react";
import type { OrderDetails, FormErrors } from "../types";
import CollapsibleSection from "../common/CollapsibleSection";

interface OrderDetailsSectionProps {
  data: OrderDetails;
  errors: FormErrors;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (data: Partial<OrderDetails>) => void;
}

const OrderDetailsSection: React.FC<OrderDetailsSectionProps> = ({
  data,
  errors,
  isExpanded,
  onToggle,
  onChange,
}) => {
  const handleInputChange = (field: keyof OrderDetails, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <CollapsibleSection
      title="Order Details"
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Customer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.customer}
            onChange={(e) => handleInputChange("customer", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customer ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter customer name"
          />
          {errors.customer && (
            <p className="text-sm text-red-600">{errors.customer}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            FLX Tag No <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.flxTagNo}
            onChange={(e) => handleInputChange("flxTagNo", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.flxTagNo ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter FLX Tag Number"
          />
          {errors.flxTagNo && (
            <p className="text-sm text-red-600">{errors.flxTagNo}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Customer Tag No
          </label>
          <input
            type="text"
            value={data.customerTagNo}
            onChange={(e) => handleInputChange("customerTagNo", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter customer tag number"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Delivery Due Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={data.deliveryDueDate}
            onChange={(e) =>
              handleInputChange("deliveryDueDate", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.deliveryDueDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.deliveryDueDate && (
            <p className="text-sm text-red-600">{errors.deliveryDueDate}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Reference
          </label>
          <input
            type="text"
            value={data.reference}
            onChange={(e) => handleInputChange("reference", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter reference information"
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default OrderDetailsSection;

import React from "react";
import { useFormStore } from "../store/useStore";
import OrderDetailsSection from "../components/OrderDetailsSection";
import JobDetailsSection from "../components/JobDetailsSection";
import InProcessDetailsSection from "../components/InProcessDetailsSection";
import RemarksSection from "../components/RemarksSection";
import FooterSection from "../components/FooterSection";

const JobSheetForm: React.FC = () => {
  const {
    formData,
    errors,
    successMessage,
    isSubmitting,
    expandedSections,
    updateFormData,
    toggleSection,
    createReport,
  } = useFormStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createReport();
  };

  return (
    <div
      className="min-h-screen py-8"
      style={{
        backgroundImage: 'url("/bg.png")',
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold text-center">
              Job Sheet cum In-Process Inspection Report
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                {successMessage}
              </div>
            )}
            <OrderDetailsSection
              data={formData.orderDetails}
              errors={errors}
              isExpanded={expandedSections.has("orderDetails")}
              onToggle={() => toggleSection("orderDetails")}
              onChange={(data) => updateFormData("orderDetails", data)}
            />

            <JobDetailsSection
              data={formData.jobDetails}
              errors={errors}
              isExpanded={expandedSections.has("jobDetails")}
              onToggle={() => toggleSection("jobDetails")}
              onChange={(data) => updateFormData("jobDetails", data)}
            />

            <InProcessDetailsSection
              data={formData.inProcessDetails}
              errors={errors}
              isExpanded={expandedSections.has("inProcessDetails")}
              onToggle={() => toggleSection("inProcessDetails")}
              onChange={(data) => updateFormData("inProcessDetails", data)}
            />

            <RemarksSection
              data={formData.remarks}
              errors={errors}
              isExpanded={expandedSections.has("remarks")}
              onToggle={() => toggleSection("remarks")}
              onChange={(data) => updateFormData("remarks", data)}
            />

            <FooterSection
              data={formData.footer}
              errors={errors}
              isExpanded={expandedSections.has("footer")}
              onToggle={() => toggleSection("footer")}
              onChange={(data) => updateFormData("footer", data)}
            />

            <div className="flex justify-center pt-6 border-t">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSheetForm;

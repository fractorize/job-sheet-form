import React from "react";
import { useFormStore } from "../store/useStore";
import AddJobBtn from "../components/button/AddJobBtn";
import OrderDetailsSection from "../components/sections/OrderDetailsSection";
import JobDetailsSection from "../components/sections/JobDetailsSection";
import InProcessDetailsSection from "../components/sections/InProcessDetailsSection";
import RemarksSection from "../components/sections/RemarksSection";
import FooterSection from "../components/sections/FooterSection";
import { useNavigate } from "react-router-dom";

const JobSheetForm: React.FC = () => {
  const {
    formData,
    errors,
    successMessage,

    expandedSections,
    updateFormData,
    toggleSection,
    createJob,
  } = useFormStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createJob();
  };
  const navigate = useNavigate();

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
          <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Create Inspection Report</h1>
            <button
              className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                {successMessage}{" "}
                <span
                  className="text-green-800 cursor-pointer underline"
                  onClick={() => navigate("/")}
                >
                  Go to Home
                </span>
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

            <AddJobBtn />
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSheetForm;

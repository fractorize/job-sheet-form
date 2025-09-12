import React, { useState } from "react";
import type { JobSheetFormData, FormErrors } from "./types";
import OrderDetailsSection from "./components/OrderDetailsSection";
import JobDetailsSection from "./components/JobDetailsSection";
import InProcessDetailsSection from "./components/InProcessDetailsSection";
import RemarksSection from "./components/RemarksSection";
import FooterSection from "./components/FooterSection";

const JobSheetForm: React.FC = () => {
  const [formData, setFormData] = useState<JobSheetFormData>({
    orderDetails: {
      customer: "",
      flxTagNo: "",
      customerTagNo: "",
      deliveryDueDate: "",
      reference: "",
    },
    jobDetails: {
      hoseType: "",
      hoseId: "",
      lengthCut: {
        value: 0,
        unit: "mm",
      },
      quantity: 0,
      fittingType: {
        endA: "",
        endB: "",
      },
      moc: [],
      traceability: {
        hoseBatchNumber: "",
        flexifloBatchNo: "",
      },
    },
    inProcessDetails: {
      hoseCutDetails: {
        date: "",
        operatorSign: "",
        machineNumber: "",
        measurements: {
          value: 0,
          unit: "mm",
        },
      },
      skivingDetails: {
        internal: {
          date: "",
          operatorSign: "",
          machineNumber: "",
          measurements: {
            value: 0,
            unit: "mm",
          },
        },
        external: {
          date: "",
          operatorSign: "",
          machineNumber: "",
          measurements: {
            value: 0,
            unit: "mm",
          },
        },
      },
      assemblyDetails: {
        date: "",
        operatorSign: "",
        machineNumber: "",
      },
      mandralsDetails: {
        date: "",
        operatorSign: "",
        machineNumber: "",
      },
      crimpingDetails: {
        date: "",
        operatorSign: "",
        machineNumber: "",
        measurements: {
          value: 0,
          unit: "mm",
        },
      },
      weldingDetails: {
        date: "",
        operatorSign: "",
        machineNumber: "",
      },
      punchingTaggingDetails: {
        date: "",
        operatorSign: "",
        machineNumber: "",
      },
    },
    remarks: {
      text: "",
      weldingRodNumber: "",
      weldingRodSize: "",
      piggingOptions: [],
    },
    footer: {
      supervisorSignature: "",
      date: "",
    },
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["orderDetails"])
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const updateFormData = <K extends keyof JobSheetFormData>(
    section: K,
    data: Partial<JobSheetFormData[K]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate required fields
    if (!formData.orderDetails.customer)
      newErrors.customer = "Customer is required";
    if (!formData.orderDetails.flxTagNo)
      newErrors.flxTagNo = "FLX Tag No is required";
    if (!formData.orderDetails.deliveryDueDate)
      newErrors.deliveryDueDate = "Delivery Due Date is required";

    if (!formData.jobDetails.hoseType)
      newErrors.hoseType = "Hose Type is required";
    if (!formData.jobDetails.hoseId) newErrors.hoseId = "Hose ID is required";
    if (formData.jobDetails.quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0";

    if (formData.jobDetails.moc.length === 0)
      newErrors.moc = "At least one MOC must be selected";
    if (!formData.jobDetails.traceability.hoseBatchNumber)
      newErrors.hoseBatchNumber = "Hose Batch Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold text-center">
              Job Sheet cum In-Process Inspection Report
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSheetForm;

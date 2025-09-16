import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormStore } from "../store/useStore";
import type { JobSheetFormData } from "../types";
import OrderDetailsSection from "../components/sections/OrderDetailsSection";
import JobDetailsSection from "../components/sections/JobDetailsSection";
import InProcessDetailsSection from "../components/sections/InProcessDetailsSection";
import RemarksSection from "../components/sections/RemarksSection";
import FooterSection from "../components/sections/FooterSection";
import { RiDeleteBin6Fill } from "react-icons/ri";

import { FiEdit3, FiCheck, FiX, FiRefreshCw } from "react-icons/fi";

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<JobSheetFormData | null>(null);

  const {
    jobDetail,
    jobDetailLoading,
    jobDetailError,
    fetchJobById,
    updateJob,
    errors,
    successMessage,
    expandedSections,
    toggleSection,
    isSubmitting,
    deleteJob,
  } = useFormStore();

  useEffect(() => {
    if (id) fetchJobById(id);
  }, [id, fetchJobById]);

  useEffect(() => {
    if (jobDetail && isEditing) {
      setEditData(jobDetail);
    }
  }, [jobDetail, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(jobDetail || null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleSave = async () => {
    if (editData && id) {
      await updateJob(id, editData);
      setIsEditing(false);
      setEditData(null);
    }
  };

  const handleDataChange = (
    section: keyof JobSheetFormData,
    data: Partial<JobSheetFormData[keyof JobSheetFormData]>
  ) => {
    if (editData) {
      setEditData({
        ...editData,
        [section]: {
          ...editData[section],
          ...data,
        },
      });
    }
  };
  const handleDelete = async () => {
    if (id) {
      await deleteJob(id);
      navigate("/");
    }
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
          <div
            onClick={() => navigate("/")}
            className="bg-blue-600 cursor-pointer text-white px-6 py-4 flex items-center justify-between"
          >
            <h1 className="text-2xl font-bold text-center">
              {isEditing
                ? "Edit Inspection Report"
                : "Inspection Report Detail"}
            </h1>
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button
                    className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    onClick={handleEdit}
                  >
                    <FiEdit3 className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <RiDeleteBin6Fill className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                    onClick={handleSave}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FiRefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                        Save
                      </>
                    )}
                  </button>
                  <button
                    className="group flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-700 transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={handleCancel}
                  >
                    <FiX className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-6">
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
                {successMessage}
              </div>
            )}

            {jobDetailLoading ? (
              <div className="text-center text-gray-500 py-8">Loading...</div>
            ) : jobDetailError ? (
              <div className="text-center text-red-600 py-8">
                {jobDetailError}
              </div>
            ) : !jobDetail ? (
              <div className="text-center text-gray-500 py-8">
                No data found.
              </div>
            ) : isEditing && editData ? (
              <form className="space-y-6">
                <OrderDetailsSection
                  data={editData.orderDetails}
                  errors={errors}
                  isExpanded={expandedSections.has("orderDetails")}
                  onToggle={() => toggleSection("orderDetails")}
                  onChange={(data) => handleDataChange("orderDetails", data)}
                />

                <JobDetailsSection
                  data={editData.jobDetails}
                  errors={errors}
                  isExpanded={expandedSections.has("jobDetails")}
                  onToggle={() => toggleSection("jobDetails")}
                  onChange={(data) => handleDataChange("jobDetails", data)}
                />

                <InProcessDetailsSection
                  data={editData.inProcessDetails || {}}
                  errors={errors}
                  isExpanded={expandedSections.has("inProcessDetails")}
                  onToggle={() => toggleSection("inProcessDetails")}
                  onChange={(data) =>
                    handleDataChange("inProcessDetails", data)
                  }
                />

                <RemarksSection
                  data={editData.remarks || {}}
                  errors={errors}
                  isExpanded={expandedSections.has("remarks")}
                  onToggle={() => toggleSection("remarks")}
                  onChange={(data) => handleDataChange("remarks", data)}
                />

                <FooterSection
                  data={editData.footer}
                  errors={errors}
                  isExpanded={expandedSections.has("footer")}
                  onToggle={() => toggleSection("footer")}
                  onChange={(data) => handleDataChange("footer", data)}
                />
              </form>
            ) : (
              <div className="space-y-6">
                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Order Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Customer:</span>{" "}
                      {jobDetail.orderDetails.customer}
                    </div>
                    <div>
                      <span className="font-medium">FLX Tag No:</span>{" "}
                      {jobDetail.orderDetails.flxTagNo}
                    </div>
                    <div>
                      <span className="font-medium">Customer Tag No:</span>{" "}
                      {jobDetail.orderDetails.customerTagNo}
                    </div>
                    <div>
                      <span className="font-medium">Delivery Due Date:</span>{" "}
                      {jobDetail.orderDetails.deliveryDueDate}
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-medium">Reference:</span>{" "}
                      {jobDetail.orderDetails.reference}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Job Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Hose Type:</span>{" "}
                      {jobDetail.jobDetails.hoseType}
                    </div>
                    <div>
                      <span className="font-medium">Hose ID:</span>{" "}
                      {jobDetail.jobDetails.hoseId}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span>{" "}
                      {jobDetail.jobDetails.quantity}
                    </div>
                    <div>
                      <span className="font-medium">Length Cut:</span>{" "}
                      {jobDetail.jobDetails.lengthCut?.value}{" "}
                      {jobDetail.jobDetails.lengthCut?.unit}
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-medium">MOC:</span>{" "}
                      {jobDetail.jobDetails.moc?.join(", ")}
                    </div>
                    <div>
                      <span className="font-medium">Fitting End A:</span>{" "}
                      {jobDetail.jobDetails.fittingType?.endA}
                    </div>
                    <div>
                      <span className="font-medium">Fitting End B:</span>{" "}
                      {jobDetail.jobDetails.fittingType?.endB}
                    </div>
                    <div>
                      <span className="font-medium">Hose Batch No:</span>{" "}
                      {jobDetail.jobDetails.traceability?.hoseBatchNumber}
                    </div>
                    <div>
                      <span className="font-medium">Flexiflo Batch No:</span>{" "}
                      {jobDetail.jobDetails.traceability?.flexifloBatchNo}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Remarks
                  </h2>
                  <div className="text-gray-700">
                    <div>
                      <span className="font-medium">Text:</span>{" "}
                      {jobDetail.remarks?.text}
                    </div>
                    <div>
                      <span className="font-medium">Pigging Options:</span>{" "}
                      {jobDetail.remarks?.piggingOptions?.join(", ")}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Footer
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Supervisor Signature:</span>{" "}
                      {jobDetail.footer.supervisorSignature}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      {jobDetail.footer.date}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

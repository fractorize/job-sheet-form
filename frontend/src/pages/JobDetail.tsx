import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormStore } from "../store/useStore";

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { jobDetail, jobDetailLoading, jobDetailError, fetchJobById } =
    useFormStore();

  useEffect(() => {
    if (id) fetchJobById(id);
  }, [id, fetchJobById]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-center">
              Inspection Report Detail
            </h1>
            <button
              className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          <div className="p-6">
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
                      {jobDetail.jobDetails.lengthCut.value}{" "}
                      {jobDetail.jobDetails.lengthCut.unit}
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-medium">MOC:</span>{" "}
                      {jobDetail.jobDetails.moc?.join(", ")}
                    </div>
                    <div>
                      <span className="font-medium">Fitting End A:</span>{" "}
                      {jobDetail.jobDetails.fittingType.endA}
                    </div>
                    <div>
                      <span className="font-medium">Fitting End B:</span>{" "}
                      {jobDetail.jobDetails.fittingType.endB}
                    </div>
                    <div>
                      <span className="font-medium">Hose Batch No:</span>{" "}
                      {jobDetail.jobDetails.traceability.hoseBatchNumber}
                    </div>
                    <div>
                      <span className="font-medium">Flexiflo Batch No:</span>{" "}
                      {jobDetail.jobDetails.traceability.flexifloBatchNo}
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
                      {jobDetail.remarks.text}
                    </div>
                    <div>
                      <span className="font-medium">Pigging Options:</span>{" "}
                      {jobDetail.remarks.piggingOptions?.join(", ")}
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

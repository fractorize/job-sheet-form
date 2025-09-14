import React from "react";

export interface InspectionReport {
  customerName: string;
  flxTagNo: string;
}

interface InspectionReportListProps {
  reports: InspectionReport[];
}

const InspectionReportList: React.FC<InspectionReportListProps> = ({
  reports,
}) => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold text-center">
              Inspection Report List
            </h1>
          </div>
          <div className="p-6">
            {reports.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No reports found.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {reports.map((report, idx) => (
                  <li
                    key={idx}
                    className="py-4 flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-800">
                      {report.customerName}
                    </span>
                    <span className="text-gray-500">
                      FLX Tag No: {report.flxTagNo}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionReportList;

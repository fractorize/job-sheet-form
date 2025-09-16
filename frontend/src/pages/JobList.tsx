import React, { useEffect } from "react";
import { useFormStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { TiUserAdd } from "react-icons/ti";

const JobList: React.FC = () => {
  const { jobs, jobsLoading, jobsError, fetchJobs } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Inspection Report List</h1>
          </div>

          <div className="p-6">
            {jobsLoading ? (
              <div className="text-center text-gray-500 py-8">Loading...</div>
            ) : jobsError ? (
              <div className="text-center text-red-600 py-8">{jobsError}</div>
            ) : jobs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No reports found.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <li
                    key={job._id}
                    className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 rounded"
                    onClick={() => navigate(`/report/${job._id}`)}
                  >
                    <span className="font-medium text-gray-800">
                      {job.orderDetails?.customer}
                    </span>
                    <span className="text-gray-500">
                      FLX Tag No: {job.orderDetails?.flxTagNo}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="fixed bottom-5 right-5 bg-blue-600 p-3 cursor-pointer rounded-full z-50 transition-transform duration-300"
            onClick={() => navigate("/create-job")}
          >
            <TiUserAdd color="white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobList;

import { Routes, Route } from "react-router-dom";
import JobSheetForm from "./pages/JobSheetForm";
import InspectionReportList from "./pages/InspectionReportList";

const reports = [
  { customerName: "Acme Corp", flxTagNo: "FLX-001" },
  { customerName: "Beta Industries", flxTagNo: "FLX-002" },
  { customerName: "Gamma Ltd.", flxTagNo: "FLX-003" },
  { customerName: "Delta LLC", flxTagNo: "FLX-004" },
];

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<InspectionReportList reports={reports} />} />
      <Route path="/create-job" element={<JobSheetForm />} />
    </Routes>
  );
};

export default App;

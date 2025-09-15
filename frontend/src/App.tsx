import { Routes, Route } from "react-router-dom";
import JobSheetForm from "./pages/JobSheetForm";
import InspectionReportList from "./pages/InspectionReportList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<InspectionReportList />} />
      <Route path="/create-job" element={<JobSheetForm />} />
    </Routes>
  );
};

export default App;

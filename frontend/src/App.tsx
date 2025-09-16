import { Routes, Route } from "react-router-dom";
import JobSheetForm from "./pages/JobSheetForm";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path="/create-job" element={<JobSheetForm />} />
      <Route path="/report/:id" element={<JobDetail />} />
    </Routes>
  );
};

export default App;

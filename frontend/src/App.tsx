import { Routes, Route } from "react-router-dom";
import JobSheetForm from "./pages/JobSheetForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/create-user" element={<JobSheetForm />} />
    </Routes>
  );
};

export default App;

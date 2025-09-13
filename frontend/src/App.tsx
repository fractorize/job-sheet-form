

import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobSheetForm from "./pages/JobSheetForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/create" element={<JobSheetForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

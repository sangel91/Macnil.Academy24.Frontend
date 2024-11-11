import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DashboardContent } from "./layout/Dashboard";

function App() {
  const loginDone = () => {
    console.log("Successfully logged in.");
  };
  const logoutDone = () => {
    console.log("Successfully logged out.");
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<DashboardContent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DashboardContent } from "./layout/Dashboard";
import { RecoveryContent } from "./layout/recovery";

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
          {/* <Route path="/*" element={<DashboardContent />} /> */}
          <Route path="/*" element={<RecoveryContent/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

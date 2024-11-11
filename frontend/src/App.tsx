import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DashboardContent } from "./layout/Dashboard";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import VisibilityIcon from '@mui/icons-material/Visibility';

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

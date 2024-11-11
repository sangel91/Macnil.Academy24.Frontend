import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { DashboardContent } from "./layout/Dashboard";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EntryCard from './Components/EntryCard';
import { EntryModel } from "./EntryModel";
const App: React.FC = () => {
  const [entries, setEntries] = useState<EntryModel[]>([]);
  

  
  useEffect(() => {
    axios.get<EntryModel[]>('http://localhost:8080/api/v1/entry')
      .then(response => {
        setEntries(response.data);  
      })
      .catch(error => {
        console.error("Errore nel recupero dei dati:", error);
      });
  }, []);

  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="http://localhost:8080/api/v1/entry" element={<DashboardContent />} />

     
        <Route
          path="/entries"
          element={
            <div className="App">
              {entries.map(entry => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

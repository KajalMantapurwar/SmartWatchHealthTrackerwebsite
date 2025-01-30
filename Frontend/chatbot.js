import React, { useState, useEffect } from "react";
import axios from "axios";
import HealthCard from "./components/HealthCard";
import Chatbot from "./components/Chatbot";

const App = () => {
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/health-data")
      .then((response) => {
        setHealthData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching health data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Smartwatch Health Tracker</h1>
      {healthData ? <HealthCard healthData={healthData} /> : <p className="text-gray-600">Loading health data...</p>}
      <Chatbot />
    </div>
  );
};

export default App;

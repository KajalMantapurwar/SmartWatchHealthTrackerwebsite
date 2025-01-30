import React, { useState, useEffect } from "react";
import axios from "axios";  // Import Axios for HTTP requests

const App = () => {
  const [healthData, setHealthData] = useState(null);
  const [query, setQuery] = useState("");
  const [botResponse, setBotResponse] = useState("");

  // Fetch health data from Flask backend when the component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/health-data") // Ensure this points to Flask server on port 8000
      .then((response) => {
        setHealthData(response.data); // Set the health data into state
      })
      .catch((error) => {
        console.error("Error fetching health data:", error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Handle chatbot query submission
  const handleChatbotQuery = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chatbot", { query }); // Corrected port to 8000
      setBotResponse(response.data.response); // Set the bot response into state
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
    }
  };

  return (
    <div>
      <h1>Smartwatch Health Tracker</h1>

      {healthData ? (
        <div>
          <p>Steps: {healthData.steps}</p>
          <p>Heart Rate: {healthData.heartRate} bpm</p>
          <p>Sleep Hours: {healthData.sleepHours} hours</p>
        </div>
      ) : (
        <p>Loading health data...</p>
      )}

      <div>
        <input
          type="text"
          placeholder="Ask chatbot..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleChatbotQuery}>Ask</button>
        <p>Chatbot Response: {botResponse}</p>
      </div>
    </div>
  );
};

export default App;

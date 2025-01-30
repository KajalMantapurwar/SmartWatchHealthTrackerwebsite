import React, { useState } from "react";

// Bluetooth related functions
const requestDevice = async () => {
  try {
    // Request Bluetooth device (e.g., a smartwatch that exposes the heart rate service)
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['heart_rate'] }] // Filter by the correct service UUID
    });
    console.log("Device selected:", device);
    
    // Connect to the device
    const server = await device.gatt.connect();
    console.log("Connected to server:", server);
    
    // Get the heart rate service
    const heartRateService = await server.getPrimaryService('heart_rate');
    const heartRateMeasurement = await heartRateService.getCharacteristic('heart_rate_measurement');
    
    // Read or subscribe to notifications
    heartRateMeasurement.startNotifications();
    heartRateMeasurement.addEventListener('characteristicvaluechanged', handleHeartRate);
  } catch (error) {
    console.error("Error connecting to Bluetooth device:", error);
  }
};

// Handle heart rate data
const handleHeartRate = (event) => {
  const heartRate = event.target.value.getUint8(1); // Extract heart rate value
  console.log("Heart Rate:", heartRate);
};

const App = () => {
  const [heartRate, setHeartRate] = useState(null);

  return (
    <div>
      <h1>Smartwatch Health Tracker</h1>
      {heartRate ? (
        <p>Heart Rate: {heartRate} bpm</p>
      ) : (
        <p>Connect to your smartwatch via Bluetooth...</p>
      )}
      
      <button onClick={requestDevice}>Connect to Smartwatch</button>
    </div>
  );
};

export default App;

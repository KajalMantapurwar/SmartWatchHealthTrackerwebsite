import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HealthCard = ({ healthData }) => {
  return (
    <Card className="w-80 p-4 shadow-lg bg-white rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Health Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">🚶 Steps: {healthData.steps}</p>
        <p className="text-gray-700">❤️ Heart Rate: {healthData.heartRate} bpm</p>
        <p className="text-gray-700">💤 Sleep Hours: {healthData.sleepHours} hours</p>
      </CardContent>
    </Card>
  );
};

export default HealthCard;

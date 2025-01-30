import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleChatbotQuery = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chatbot", { query });
      setBotResponse(response.data.response);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
    }
  };

  return (
    <div className="mt-6 w-80 flex flex-col gap-2">
      <Input
        type="text"
        placeholder="Ask chatbot..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border rounded-lg shadow-sm"
      />
      <Button onClick={handleChatbotQuery} className="bg-blue-500 text-white rounded-lg py-2">
        Ask
      </Button>
      <p className="text-gray-700 mt-2">💬 Chatbot: {botResponse}</p>
    </div>
  );
};

export default Chatbot;

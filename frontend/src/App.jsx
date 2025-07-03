import React, { useState } from "react";
import Home from "./pages/home";
import Interview from "./pages/interview";

export default function App() {
  const [role, setRole] = useState("");
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Interview Buddy</h1>
      {!started ? (
        <Home setRole={setRole} startInterview={() => setStarted(true)} />
      ) : (
        <Interview role={role} />
      )}
    </div>
  );
}
import React, { useState } from "react";

export default function Home({ setRole, startInterview }) {
  const [selected, setSelected] = useState("");

  const handleStart = () => {
    if (selected) {
      setRole(selected);
      startInterview();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <select
        onChange={(e) => setSelected(e.target.value)}
        className="p-2 border rounded mb-4"
      >
        <option value="">Select Role</option>
        <option value="SDE">SDE</option>
        <option value="PM">PM</option>
        <option value="UI/UX">UI/UX</option>
      </select>
      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start Interview
      </button>
    </div>
  );
}
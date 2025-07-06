import React, { useState } from "react";

export default function QuestionCard({ data, addToReport }) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const getAnswer = async () => {
    setLoading(true);
    const res = await fetch("/api/gpt-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: data.question }),
    });
    const result = await res.json();
    setAnswer(result.answer);
    addToReport(data, result.answer);
    setLoading(false);
  };

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-red-400";
      case "hard":
        return "text-red-700";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="font-semibold">{data.question}</p>
      <p className="text-sm text-gray-500">{data.type} | {" "}
        <span className={`font-medium ${getDifficultyColor(data.difficulty)}`}>
          {data.difficulty}
        </span>
      </p>
      {!answer && (
        <button
          className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          onClick={getAnswer}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Answer"}
        </button>
      )}
      {answer && (
        <div className="mt-3 p-2 border rounded bg-gray-100">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
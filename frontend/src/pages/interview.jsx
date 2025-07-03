import React, { useState, useEffect } from "react";
import QuestionCard from "../components/card";
import GeneratePDFButton from "../components/genpdf";

export default function Interview({ role }) {
  const [questions, setQuestions] = useState([]);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(`/api/questions?role=${role}`);
      const data = await res.json();
      setQuestions([...data.technical, ...data.behavioral]);
    };
    fetchQuestions();
  }, [role]);

  const addToReport = (questionObj, answer) => {
    setReportData((prev) => [
      ...prev,
      {
        question: questionObj.question,
        type: questionObj.type,
        difficulty: questionObj.difficulty,
        answer,
      },
    ]);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Interview for: {role}</h2>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <QuestionCard key={i} data={q} addToReport={addToReport} />
        ))}
      </div>
      {reportData.length > 0 && (
        <div className="mt-8">
          <GeneratePDFButton reportData={reportData} role={role} />
        </div>
      )}
    </div>
  );
}
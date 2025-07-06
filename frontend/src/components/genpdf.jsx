import React from "react";
import { jsPDF } from "jspdf";

export default function GeneratePDFButton({ reportData, role }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    const easyQuestions = reportData.filter(item => item.difficulty === "Easy").length;
    const mediumQuestions = reportData.filter(item => item.difficulty === "Medium").length;
    const hardQuestions = reportData.filter(item => item.difficulty === "Hard").length;

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("INTERVIEW BUDDY", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.text("Question Report", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    y += 15;
    doc.setFontSize(12);
    doc.text(`Role: ${role}`, 10, y);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 150, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Total questions taken: ${reportData.length}`, 10, y);
    y += 7;
    doc.text(`Easy: ${easyQuestions}`, 10, y);
    y += 7;
    doc.text(`Medium: ${mediumQuestions}`, 10, y);
    y += 7;
    doc.text(`Hard: ${hardQuestions}`, 10, y);
    y += 15;

    const leftm = 10;
    const maxwidth = 180;

    reportData.forEach((item, i) => {
      if (y > doc.internal.pageSize.getHeight() - 30) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      const question = `Q${i + 1}: ${item.question} (${item.type} | ${item.difficulty})`;

      const questionLines = doc.splitTextToSize(question, maxwidth);
      doc.setFont("helvetica", "normal"); 
      doc.text(questionLines,leftm, y);
      y += (questionLines.length * 6);

      y += 2;

      doc.setFontSize(11); 
      doc.setFont("helvetica", "normal");

      const answerLines = doc.splitTextToSize(`A: ${item.answer}`, maxwidth);
      doc.text(answerLines, leftm+2, y);
      y += (answerLines.length * 5) + 8;
    });

    doc.save("Interview_Report.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Download PDF Report
    </button>
  );
}
import React from "react";
import { jsPDF } from "jspdf";

export default function GeneratePDFButton({ reportData, role }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text("Interview Report", 70, 10);
    doc.setFontSize(12);
    doc.text(`Role: ${role}`, 10, 15);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 15);

    reportData.forEach((item, i) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${i + 1}. (${item.type} | ${item.difficulty})`, 10, y);
      y += 7;
      doc.text(`Q: ${item.question}`, 12, y);
      y += 7;
      doc.text(`A: ${item.answer}`, 12, y, { maxWidth: 180 });
      y += 15;
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
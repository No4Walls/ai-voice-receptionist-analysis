/**
 * usePdfDownload — generates a PDF of the full market analysis report.
 * Uses html2pdf.js for client-side rendering via canvas → PDF.
 * Design: Futurist SaaS Dashboard (Space Grotesk + Plus Jakarta Sans)
 */

import { useState } from "react";

export function usePdfDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadPdf = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setProgress(10);

    try {
      // Dynamically import to keep initial bundle lean
      const html2pdf = (await import("html2pdf.js")).default;

      setProgress(25);

      // Expand all PESTEL accordion cards before capturing
      const pestelCards = document.querySelectorAll<HTMLDivElement>(".pestel-card");
      const expandedStates: boolean[] = [];
      pestelCards.forEach((card) => {
        const expandable = card.querySelector<HTMLDivElement>(".overflow-hidden");
        if (expandable) {
          const isExpanded = expandable.classList.contains("max-h-\\[600px\\]");
          expandedStates.push(isExpanded);
          // Force expand
          expandable.style.maxHeight = "none";
          expandable.style.opacity = "1";
          expandable.style.overflow = "visible";
        }
      });

      setProgress(40);

      // Target the full page body
      const element = document.getElementById("pdf-content");
      if (!element) throw new Error("PDF content element not found");

      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: "AI-Voice-Receptionist-Market-Analysis-2025.pdf",
        image: { type: "jpeg" as const, quality: 0.95 },
        html2canvas: {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          windowWidth: 1280,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as const,
        },
        pagebreak: {
          mode: ["avoid-all", "css", "legacy"],
          before: ".pdf-page-break",
          avoid: [".stat-card", ".pestel-card", ".swot-quadrant", ".player-card"],
        },
      };

      setProgress(60);

      await html2pdf().set(opt).from(element).save();

      setProgress(100);

      // Restore PESTEL card states
      pestelCards.forEach((card, i) => {
        const expandable = card.querySelector<HTMLDivElement>(".overflow-hidden");
        if (expandable) {
          if (!expandedStates[i]) {
            expandable.style.maxHeight = "";
            expandable.style.opacity = "";
            expandable.style.overflow = "";
          }
        }
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 800);
    }
  };

  return { downloadPdf, isGenerating, progress };
}

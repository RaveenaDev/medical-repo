import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import AdmissionFormEditPDF from "./AdmissionFormEditPDF";

const AdmissionFormPrintWrapperEdit = ({
  form,

  onClose,
}) => {
  const pdfRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: "Admission_Form",
    onAfterPrint: () => {
      if (onClose) onClose(); // close modal after print finishes
    },
  });

  useEffect(() => {
    if (form) {
      // Wait for component + ref to mount before printing
      const timer = setTimeout(() => {
        handlePrint();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [form]);

  return (
    <div>
      {/* Hidden printable view */}
      <div className="printable">
        <AdmissionFormEditPDF ref={pdfRef} form={form} />
      </div>
    </div>
  );
};

export default AdmissionFormPrintWrapperEdit;

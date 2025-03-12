import React, { useEffect, useState } from "react";
import "./info.scss";
import { useNavigate } from "react-router-dom";
import RegisterHeader from "../components/RegisterHeader";
import BasicInfoForm from "./forms/BasicInfoForm";
import ContactInfoForm from "./forms/ContactInfoForm";
import AdminDetailsForm from "./forms/AdminDetailsForm";
import LegalUploadsForm from "./forms/LegalUploadsForm";
import AdditionalInfoForm from "./forms/AdditionalInfoForm";

const steps = [
  "Basic Hospital Information",
  "Contact Information",
  "Administrative Details",
  "Legal & Compliance Uploads",
  "Additional Information",
];

const Information = ({ setIsSignUpOrLogin, setShouldShowSidebar }) => {
  useEffect(() => {
    setIsSignUpOrLogin(true);
    setShouldShowSidebar(false);
  }, [setIsSignUpOrLogin, setShouldShowSidebar]);

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState({
    hospitalName: "",
    registrationNumber: "",
    yearOfEstablishment: "",
    hospitalType: "",
    email: "",
    phone: "",
    adminName: "",
    adminContact: "",
    license: null,
    complianceDocs: null,
    additionalNotes: "",
  });

  const handleNext = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <BasicInfoForm
            data={formData}
            setData={setFormData}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <ContactInfoForm
            data={formData}
            setData={setFormData}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <AdminDetailsForm
            data={formData}
            setData={setFormData}
            handleNext={handleNext}
          />
        );
      case 3:
        return (
          <LegalUploadsForm
            data={formData}
            setData={setFormData}
            handleNext={handleNext}
          />
        );
      case 4:
        return (
          <AdditionalInfoForm
            data={formData}
            setData={setFormData}
            handleNext={handleNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="info">
      <RegisterHeader />
      <div className="timeline">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`timeline_step ${activeStep === index ? "active" : ""} ${
              completedSteps.includes(index) ? "completed" : ""
            }`}
          >
            <p>{step}</p>
          </div>
        ))}
      </div>
      <div className="info_Container">
        <div className="info_Wrapper">{renderForm()}</div>
      </div>
    </div>
  );
};

export default Information;

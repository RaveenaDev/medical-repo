import React from "react";
import "./works.scss"; // Import the CSS file for styling

const Works = () => {
  return (
    <div className="how-it-works-2-column" data-aos="fade-up">
      <h2 className="section-title">How StepCare Works</h2>
      <div className="step-flow">
        <div className="step-column">
          <div className="step-block" data-aos="fade-up">
            <div className="step-icon">1</div>
            <div className="step-content">
              <h3 className="step-title">Patient Registration</h3>
              <p className="step-desc">Via reception, app, or kiosk</p>
            </div>
          </div>

          <div className="step-block" data-aos="fade-up" data-aos-delay="100">
            <div className="step-icon">3</div>
            <div className="step-content">
              <h3 className="step-title">Consultation & Prescription</h3>
              <p className="step-desc">Doctor updates system directly</p>
            </div>
          </div>

          <div className="step-block" data-aos="fade-up" data-aos-delay="200">
            <div className="step-icon">5</div>
            <div className="step-content">
              <h3 className="step-title">Auto Billing & Invoicing</h3>
              <p className="step-desc">No manual calculations</p>
            </div>
          </div>
        </div>

        <div className="step-column">
          <div className="step-block" data-aos="fade-up" data-aos-delay="300">
            <div className="step-icon">2</div>
            <div className="step-content">
              <h3 className="step-title">AI Appointment Scheduling</h3>
              <p className="step-desc">Smart time allocation</p>
            </div>
          </div>

          <div className="step-block" data-aos="fade-up" data-aos-delay="400">
            <div className="step-icon">4</div>
            <div className="step-content">
              <h3 className="step-title">Lab Tests & Pharmacy</h3>
              <p className="step-desc">Synced and automated</p>
            </div>
          </div>

          <div className="step-block" data-aos="fade-up" data-aos-delay="500">
            <div className="step-icon">6</div>
            <div className="step-content">
              <h3 className="step-title">Discharge & Follow-Up</h3>
              <p className="step-desc">With intelligent alerts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;

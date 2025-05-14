import React from "react";
import "./features.scss"; // Import your CSS file for styling

const Features = () => {
  return (
    <div className="core-features" data-aos="fade-up">
      <h2 className="section-title">Core Features</h2>
      <div className="features-container">
        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
          <div className="feature-icon">🗓️</div>
          <h3 className="feature-title">AI-Based Appointment Scheduling</h3>
          <p className="feature-description">
            Automatically assign time slots based on doctor availability,
            specialty, and patient urgency. Reduce wait times and improve care
            coordination.
          </p>
        </div>

        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
          <div className="feature-icon">🏥</div>
          <h3 className="feature-title">Real-Time Bed & IPD Management</h3>
          <p className="feature-description">
            Track bed occupancy and patient movement across departments. Get
            real-time status updates to optimize capacity planning.
          </p>
        </div>

        <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
          <div className="feature-icon">💊</div>
          <h3 className="feature-title">Pharmacy & Lab Integration</h3>
          <p className="feature-description">
            Connect in-house labs and pharmacies to streamline test requests,
            prescriptions, and medication stock management.
          </p>
        </div>

        <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
          <div className="feature-icon">💰</div>
          <h3 className="feature-title">Automated Billing System</h3>
          <p className="feature-description">
            From consultation to discharge, every service is captured and billed
            accurately. Supports insurance, packages, and custom pricing rules.
          </p>
        </div>

        <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
          <div className="feature-icon">📱</div>
          <h3 className="feature-title">Patient Mobile App (Coming Soon)</h3>
          <p className="feature-description">
            Patients can access appointments, reports, and invoices through a
            simple mobile interface — anytime, anywhere.
          </p>
        </div>

        <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">Admin Dashboards & Reports</h3>
          <p className="feature-description">
            Visualize operational data, monitor KPIs, and generate instant
            reports across departments. Make decisions backed by real-time
            insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

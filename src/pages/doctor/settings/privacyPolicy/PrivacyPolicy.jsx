import React from "react";
import "./privacy.scss";
import Searchbar from "../../../../components/Searchbar/index.jsx";
import Notifications from "../../../../components/NotificationFunc/Notification.jsx";

const PrivacyPolicy = () => {
  return (
      <>
        <div style={{display: 'flex',justifyContent:'flex-end', gap: '1rem',marginTop:'1rem'}}>
          <div style={{marginTop: '2px'}}>
            <Searchbar/>
          </div>
          <Notifications/>
        </div>
        <div className="privacy-policy-container">
          <div className="privacy-policy-header">Privacy Policy</div>
          <div className="privacy-policy-content">
            <div className="content-box">
              <div className="content-heading">Introduction</div>
              <div className="content-text">
                This Privacy Policy outlines how we collect, use, disclose, and
                protect the personal information of patients and other individuals
                who interact with our services. We are committed to ensuring the
                privacy and security of your data.
              </div>
            </div>
            <div className="content-box">
              <div className="content-heading">Information Collection</div>
              <div className="content-text">
                We may collect personal information from you when you:
              </div>
              <div className="content-list">
                <div className="list-item">Schedule an appointment</div>
                <div className="list-item">Visit our clinic</div>
                <div className="list-item">Contact us for inquiries or support</div>
                <div className="list-item">Fill out online forms or surveys</div>
                <div className="list-item">Use our website or mobile app</div>
              </div>

              <div className="content-text">
                The Types of information we collect include:
              </div>
              <div className="content-list">
                <div className="list-item">Name</div>
                <div className="list-item">
                  Contact information (address, phone number, email)
                </div>
                <div className="list-item">Date of birth</div>
                <div className="list-item">Medical history</div>
                <div className="list-item">Insurance information</div>
                <div className="list-item">Payment information</div>
              </div>
            </div>
            <div className="content-box">
              <div className="content-heading">Information Use</div>
              <div className="content-text">
                We use your personal information for the following purposes:
              </div>
              <div className="content-list">
                <div className="list-item">
                  Providing medical care and treatment
                </div>
                <div className="list-item">Scheduling appointments</div>
                <div className="list-item">Managing your account</div>
                <div className="list-item">
                  Communicating with you about your appointments, treatments, and
                  billing
                </div>
                <div className="list-item">
                  Improving our services and facilities
                </div>
                <div className="list-item">
                  Complying with legal and regulatory requirements
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default PrivacyPolicy;

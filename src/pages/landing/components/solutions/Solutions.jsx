import React from "react";
import "./solutions.scss";
import doc1 from "../../../../assets/Doc1.png";
import doc2 from "../../../../assets/doc2.png";
import doc3 from "../../../../assets/doc3.png";
import doc4 from "../../../../assets/doc4.png";

const Solutions = () => {
  return (
    <div className="container">
      <div className="heading">Our Solution</div>
      <div className="subHeading">Hospital Software</div>
      <div className="gridContainer">
        {[
          {
            img: doc1,
            title: "Tailored Access for Every Role",
            desc: "Custom dashboards for Admins, Receptionists, and Doctors to manage operations effortlessly.",
          },
          {
            img: doc2,
            title: "Smart Scheduling",
            desc: "Book, reschedule, or manage appointments with ease and efficiency",
          },
          {
            img: doc3,
            title: "Revenue Insights",
            desc: "Track earnings across services, rooms, and consultations in real-time.",
          },
          {
            img: doc4,
            title: "Patient Management",
            desc: "Access consultation room, treatment progress, medical history, and prescriptions in one place.",
          },
        ].map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="imageBox"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
            <div className="textBox">
              <div className="textTitle">{item.title}</div>
              <div className="textDescription">{item.desc}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="footerText">
        HIMS is one of the best digital healthcare solutions for hospitals.
        Manage appointments, billing, lab, stock and inventory, pharmacy,
        In-patient department and more. Advanced EMR to manage patient health
        records and deliver improved patient care.
      </div>
    </div>
  );
};

export default Solutions;

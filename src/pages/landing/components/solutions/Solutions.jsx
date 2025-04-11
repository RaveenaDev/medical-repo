import React from "react";
import "./solutions.scss";
import doc1 from "../../../../assets/sol1.png";
import doc2 from "../../../../assets/sol2.png";
import doc3 from "../../../../assets/sol3.png";
import doc4 from "../../../../assets/sol4.png";

const Solutions = () => {
  return (
    <div className="container" id="products">
      <div className="heading">Our Solution</div>
      <div className="subHeading">Hospital Software</div>
        <div className="subContainer">
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
                        desc: "Access consultation room, treatment progress, medical history, and prescriptions in one place.",
                    },
                    {
                        img: doc4,
                        title: "Patient Management",
                        desc: "Track earnings across services, rooms, and consultations in real-time.",
                    },
                ].map((item, index) => (
                    <div key={index} className="card">
                        <div
                            className="imageBox"
                            style={{backgroundImage: `url(${item.img})`}}
                        ></div>
                        <div className="textBox">
                            <div className="textTitle">{item.title}</div>
                            <div className="textDescription">{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="footerText">
                HIMS is one of the best digital healthcare solutions for hospitals.
                Manage appointments, billing, lab, stock and inventory, pharmacy,
                In-patient department and more. Advanced EMR to manage patient health
                records and deliver improved patient care.
            </div>
        </div>
    </div>
  );
};

export default Solutions;

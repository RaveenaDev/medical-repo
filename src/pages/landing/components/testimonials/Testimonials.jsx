import React from "react";
import "./testimonials.scss";

const Testimonials = () => {
  return (
    <div className="testimonials" data-aos="fade-up">
      <h2 className="section-title">Testimonials</h2>
      <div className="testimonial-cards">
        <div className="testimonial-card" data-aos="zoom-in">
          <span className="quote-icon">“</span>
          <p className="testimonial-text">
            StepCare helped us cut manual work by 60%. Their AI scheduling saved
            our doctors hours every week.
          </p>
          <p className="testimonial-author">
            — Dr. S. Nair, Director, NeoCare Hospital
          </p>
        </div>

        <div
          className="testimonial-card"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <span className="quote-icon">“</span>
          <p className="testimonial-text">
            Thanks to real-time bed tracking, we manage our ICU capacity better
            than ever before.
          </p>
          <p className="testimonial-author">— Dr. Priya Mehra, ICU Head</p>
        </div>

        <div
          className="testimonial-card"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <span className="quote-icon">“</span>
          <p className="testimonial-text">
            With StepCare, our billing and patient history processes are now
            100% digital. The transition was smooth and support has been
            excellent.
          </p>
          <p className="testimonial-author">
            — Dr. Rakesh Kumar, Sunrise Clinic
          </p>
        </div>

        <div
          className="testimonial-card"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <span className="quote-icon">“</span>
          <p className="testimonial-text">
            StepCare’s intuitive dashboards make admin work much easier. I can
            monitor KPIs in real time with zero hassle.
          </p>
          <p className="testimonial-author">
            — Dr. Anita Joshi, Medical Superintendent
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import background from "../../assets/image 7.png";
import play from "../landing/assets/Frame 1.png";
import ContactUs from "./components/contact/ContactUs.jsx";
import Solutions from "./components/solutions/Solutions.jsx";
import About from "./components/About/About.jsx";
import { Services } from "./components/services/Services.jsx";
import Footer from "./components/footer/footer.jsx";
import HeroSection from "./components/hero/HeroSection.jsx";
import Testimonials from "./components/testimonials/testimonials.jsx";
import Works from "./components/Works/Works.jsx";
import Features from "./components/features/Features.jsx";

const Base = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(true);
  }, []);
  return (
    <div style={{ overflowX: "hidden" }}>
      <HeroSection />
      <About />
      {/*<Works />*/}
      <Services />
      {/* <Features /> */}
      <Solutions />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
};
export default Base;

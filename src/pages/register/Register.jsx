import React, { useEffect, useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import RegisterHeader from "./components/RegisterHeader";

const Register = ({ setIsSignUpOrLogin, setShouldShowSidebar }) => {
  useEffect(() => {
    setIsSignUpOrLogin(true);
    setShouldShowSidebar(false);
  }, [setIsSignUpOrLogin, setShouldShowSidebar]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospitalName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Navigate to the next step or perform form submission logic
    navigate("/information"); // Change this to the actual next route
  };

  return (
    <div className="register">
      <RegisterHeader />
      <div className="register_Container">
        <div className="register_Wrapper">
          <h1>Create an Account</h1>
          <form className="register_Form" onSubmit={handleNext}>
            <div className="input_Group">
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                required
                placeholder="Hospital name"
              />
            </div>

            <div className="input_Group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>

            <div className="input_Group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Phone number"
              />
            </div>

            <div className="input_Group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
            </div>

            <div className="checkbox">
              <input type="checkbox" required />
              <label>
                By registering your details, you agree with our Terms &
                Condition, and Privacy policy
              </label>
            </div>

            <button type="submit" className="next_Button">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

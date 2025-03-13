import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const BasicInfoForm = ({ data, setData, handleNext }) => {
  const validationSchema = Yup.object({
    hospitalName: Yup.string().required("Hospital Name is required"),
    registrationNumber: Yup.string().required(
      "Registration Number is required"
    ),
    yearOfEstablishment: Yup.string().required(
      "Year of Establishment is required"
    ),
    hospitalType: Yup.string().required("Hospital Type is required"),
  });

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setData({ ...data, ...values });
        handleNext();
      }}
    >
      {({ isValid }) => (
        <Form>
          <div className="input_Group">
            <Field
              type="text"
              name="hospitalName"
              placeholder="Hospital Name"
            />
            <ErrorMessage
              name="hospitalName"
              component="div"
              className="error"
            />
          </div>

          <div className="input_Group">
            <Field
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
            />
            <ErrorMessage
              name="registrationNumber"
              component="div"
              className="error"
            />
          </div>
          <div className="select_Group">
            <div className="input_Group">
              <Field as="select" name="yearOfEstablishment" className="select">
                <option value="" disabled selected>
                  Year of Establishment
                </option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage
                name="yearOfEstablishment"
                component="div"
                className="error"
              />
            </div>

            <div className="input_Group">
              <Field as="select" name="hospitalType" className="select">
                <option value="" disabled selected>
                  Hospital Type
                </option>
                <option value="General">General Hospital</option>
                <option value="Specialized">Specialized Hospital</option>
                <option value="Teaching">Teaching Hospital</option>
                <option value="Clinic">Clinic</option>
                <option value="Others">Others</option>
              </Field>
              <ErrorMessage
                name="hospitalType"
                component="div"
                className="error"
              />
            </div>
          </div>

          <button type="submit" className="next_Button" disabled={!isValid}>
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BasicInfoForm;

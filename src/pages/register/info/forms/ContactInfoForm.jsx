import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactInfoForm = ({ data, setData, handleNext }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
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
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="input_Group">
            <label>Phone</label>
            <Field type="tel" name="phone" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>

          <button type="submit" className="next_Button" disabled={!isValid}>
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactInfoForm;

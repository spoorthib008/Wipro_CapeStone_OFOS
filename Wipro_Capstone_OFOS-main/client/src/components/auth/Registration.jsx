import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Password too short").required("Password is required"),
  mobile: Yup.string().matches(/^[0-9]{10}$/, "Enter valid 10 digit number").required("Mobile is required"),
  address: Yup.string().required("Address is required"),
  role: Yup.string().required("Role is required"),
});

const Registration = () => {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    alert(`Registration Successful as ${values.role}!`);
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "500px" }}>
        <h3 className="text-center text-success mb-4">Register</h3>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            mobile: "",
            address: "",
            role: "customer",
          }}
          validationSchema={RegistrationSchema}
          onSubmit={handleRegister}
        >
          {() => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label">Mobile Number</label>
                <Field type="text" name="mobile" className="form-control" />
                <ErrorMessage name="mobile" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <Field as="textarea" name="address" className="form-control" rows="2" />
                <ErrorMessage name="address" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <Field as="select" name="role" className="form-select">
                  <option value="customer">Customer</option>
                  <option value="owner">Restaurant Owner</option>
                  <option value="admin">Admin (only 1)</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-danger small" />
              </div>

              <button type="submit" className="btn btn-success w-100">Register</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;

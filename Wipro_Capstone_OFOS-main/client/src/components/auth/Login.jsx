import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Too short").required("Password is required"),
});

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();

    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (user) {
      localStorage.setItem("jwtToken", "dummy-jwt-token");
      localStorage.setItem("userRole", user.role);
      onLoginSuccess(user.role);

      if (user.role === "admin") navigate("/admin/dashboard");
      if (user.role === "owner") navigate("/owner/dashboard");
      if (user.role === "customer") navigate("/customer/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center text-primary mb-4">Login</h3>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form>
              <div className="mb-3">
                <label>Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              <button type="submit" className="btn btn-primary w-100">Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

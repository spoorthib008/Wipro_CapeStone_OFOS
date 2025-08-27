import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    role: "customer", // default
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 For now, just simulate success (replace with API later)
    console.log("User Registered:", formData);
    alert(`Registration Successful as ${formData.role}!`);
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "500px" }}>
        <h3 className="text-center text-success mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              className="form-control"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              pattern="[0-9]{10}" // 10 digit mobile
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              placeholder="Enter your delivery address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="owner">Restaurant Owner</option>
              <option value="admin">Admin (only 1)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;

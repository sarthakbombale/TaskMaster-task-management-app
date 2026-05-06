import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required ⚠️");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long ⚠️");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", form);
      toast.success("Registered successfully");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "radial-gradient(circle at top left, #14cba8, #3a86ff, #6a00f4)",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <div 
        className="card shadow-lg p-4 border-0" 
        style={{ 
            width: "380px", 
            borderRadius: "24px", 
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)"
        }}
      >
        <div className="text-center mb-4">
            <h3 className="fw-bold text-dark mb-1">Create Account</h3>
            <p className="text-muted small">Join us to start managing your tasks</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Full Name</label>
            <input
              className="form-control bg-light border-0 py-2 shadow-sm"
              style={{ borderRadius: "10px" }}
              name="name"
              placeholder="e.g. John Doe"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Email Address</label>
            <input
              className="form-control bg-light border-0 py-2 shadow-sm"
              style={{ borderRadius: "10px" }}
              name="email"
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Password</label>
            <input
              className="form-control bg-light border-0 py-2 shadow-sm"
              style={{ borderRadius: "10px" }}
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          <button
            className="btn w-100 text-white fw-bold py-2 shadow"
            style={{
              background: "linear-gradient(135deg, #14cba8, #3a86ff)",
              border: "none",
              borderRadius: "12px",
              transition: "transform 0.2s"
            }}
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
            <p className="small text-muted">
                Already have an account?{" "}
                <Link to="/" className="text-primary fw-bold text-decoration-none">
                    Log In
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
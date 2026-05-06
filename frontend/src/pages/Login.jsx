import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("All fields are required ⚠️");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "radial-gradient(circle at top right, #afe0d7, #0e1115, #dbbfff)",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <div 
        className="card shadow-lg p-4 border-0" 
        style={{ 
            width: "380px", 
            borderRadius: "24px", 
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)"
        }}
      >
        <div className="text-center mb-4">
            <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
            <p className="text-muted small">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Email Address</label>
            <input
              className="form-control bg-light border-0 py-2 shadow-sm"
              style={{ borderRadius: "10px" }}
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Password</label>
            <input
              className="form-control bg-light border-0 py-2 shadow-sm"
              style={{ borderRadius: "10px" }}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
          </div>

          <button
            className="btn w-100 text-white fw-bold py-2 shadow"
            style={{
              background: "linear-gradient(135deg, #0e1115, #3a86ff)",
              border: "none",
              borderRadius: "12px"
            }}
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="small text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary fw-bold text-decoration-none">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

    // Client-side validation
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required ⚠️");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long ⚠️");
      return;
    }

    try {
      console.log("Sending registration request:", form);
      const response = await axios.post("http://localhost:5000/api/auth/register", form);
      console.log("Registration response:", response.data);

      toast.success("Registered successfully 🚀");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.msg || err.response?.data?.error || "Something went wrong ❌");
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="card shadow-lg p-4" style={{ width: "350px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 fw-bold">Register</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className="btn w-100 text-white fw-bold"
            style={{
              background: "linear-gradient(135deg, #14cba8, #3a86ff, #6a00f4)",
              border: "none",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
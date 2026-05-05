import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-5 bg-white shadow-lg rounded-4"
        style={{ maxWidth: "500px" }}
      >
        <div className="text-danger mb-4">
          <AlertCircle size={80} strokeWidth={1.5} />
        </div>
        <h1 className="fw-bold text-dark mb-2">404 - Lost in Space?</h1>
        <p className="text-secondary mb-4">
          The page you're looking for doesn't exist or has been moved to another universe.
        </p>
        <button 
          onClick={() => navigate("/dashboard")}
          className="btn btn-primary px-4 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-2"
        >
          <Home size={18} /> Take Me Home
        </button>
      </motion.div>
    </div>
  );
}

export default NotFound;
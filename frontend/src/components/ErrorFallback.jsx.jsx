// src/components/ErrorFallback.jsx

import { motion } from "framer-motion";
import { RefreshCcw, WifiOff } from "lucide-react";

// Ensure this is a NAMED export to match your App.jsx import
export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card border-0 shadow-sm p-4 text-center"
        style={{ maxWidth: "450px", borderRadius: "20px" }}
      >
        <div className="p-3 bg-danger-subtle text-danger d-inline-block rounded-circle mb-3">
          <WifiOff size={40} />
        </div>
        <h4 className="fw-bold text-dark">Something went wrong</h4>
        <p className="text-muted small mb-4">
          {error.message || "A network error or unexpected crash occurred."}
        </p>
        <button 
          onClick={resetErrorBoundary}
          className="btn btn-dark w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
        >
          <RefreshCcw size={18} /> Try Again
        </button>
      </motion.div>
    </div>
  );
}
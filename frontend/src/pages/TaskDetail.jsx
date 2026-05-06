import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle, 
  Calendar, 
  Tag, 
  BarChart2, 
  Info,
  Clock,
  Trash2,
  Edit
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../services/api";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load task details");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const markComplete = async () => {
    try {
      await API.put(`/tasks/${id}`, { status: "completed" });
      toast.success("Great job! Task completed.");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const priorityColors = {
    High: "bg-danger text-white",
    Medium: "bg-warning text-dark",
    Low: "bg-info text-white"
  };

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="spinner-grow text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light py-5">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      
      <div className="container">
        <div className="row justify-content-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-lg-7 col-md-10"
          >
            {/* Header Actions */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <button 
                onClick={() => navigate("/dashboard")}
                className="btn btn-link text-decoration-none text-muted d-flex align-items-center gap-2"
              >
                <ArrowLeft size={18} /> <span>Back</span>
              </button>
              <div className="d-flex gap-2">
                <button onClick={() => navigate(`/edit/${id}`)} className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                  <Edit size={14} className="me-1" /> Edit
                </button>
              </div>
            </div>

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              {/* Task Title & Hero Section */}
              <div className="card-body p-4 p-lg-5">
                <div className="mb-4">
                  <span className={`badge rounded-pill mb-3 px-3 py-2 ${priorityColors[task.priority]}`}>
                    {task.priority} Priority
                  </span>
                  <h2 className="fw-bold text-dark display-6 mb-3">{task.title}</h2>
                  <p className="lead text-secondary" style={{ lineHeight: "1.7" }}>
                    {task.description}
                  </p>
                </div>

                <div className="row g-4 mb-5">
                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                      <div className="p-2 bg-white rounded-3 shadow-sm text-primary">
                        <Tag size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block text-uppercase fw-bold tracking-wider" style={{ fontSize: '0.65rem' }}>Category</small>
                        <span className="fw-semibold">{task.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                      <div className="p-2 bg-white rounded-3 shadow-sm text-success">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block text-uppercase fw-bold tracking-wider" style={{ fontSize: '0.65rem' }}>Due Date</small>
                        <span className="fw-semibold">{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-4">
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4">
                      <div className={`p-2 bg-white rounded-3 shadow-sm ${task.status === 'completed' ? 'text-success' : 'text-warning'}`}>
                        {task.status === 'completed' ? <CheckCircle size={20} /> : <Clock size={20} />}
                      </div>
                      <div>
                        <small className="text-muted d-block text-uppercase fw-bold tracking-wider" style={{ fontSize: '0.65rem' }}>Status</small>
                        <span className="fw-semibold text-capitalize">{task.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Action */}
                {task.status !== "completed" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={markComplete}
                    className="btn btn-primary w-100 py-3 rounded-4 fw-bold fs-5 shadow d-flex align-items-center justify-content-center gap-2"
                  >
                    <CheckCircle size={24} /> Mark as Complete
                  </motion.button>
                )}
                
                {task.status === "completed" && (
                  <div className="alert alert-success border-0 rounded-4 d-flex align-items-center gap-3 p-3">
                    <CheckCircle className="text-success" />
                    <span className="fw-medium">This task was successfully completed!</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
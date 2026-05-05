import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Circle, 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar, 
  Tag 
} from "lucide-react";
import API from "../services/api";

function TaskCard({ task, refresh }) {
  const navigate = useNavigate();

  const deleteTask = async (e) => {
    e.stopPropagation(); // Prevent card click from triggering
    if (!window.confirm("Move this task to trash?")) return;
    try {
      await API.delete(`/tasks/${task._id}`);
      refresh();
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const toggleStatus = async (e) => {
    e.stopPropagation();
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "completed" ? "pending" : "completed"
      });
      refresh();
    } catch (err) {
      console.error("Status update failed");
    }
  };

  // Industry-standard color mapping
  const priorityConfig = {
    High: { color: "text-danger", bg: "bg-danger-subtle" },
    Medium: { color: "text-warning", bg: "bg-warning-subtle" },
    Low: { color: "text-info", bg: "bg-info-subtle" }
  };

  const config = priorityConfig[task.priority] || priorityConfig.Low;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative ${
        task.status === "completed" ? "opacity-75" : ""
      }`}
    >
      {/* Visual Status Indicator (Left Border) */}
      <div 
        className={`position-absolute h-100 ${task.status === 'completed' ? 'bg-success' : 'bg-primary'}`} 
        style={{ width: '4px', left: 0, top: 0 }} 
      />

      <div className="card-body p-4">
        {/* Header: Title and Toggle */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className={`card-title fw-bold mb-0 ${task.status === "completed" ? "text-decoration-line-through text-muted" : "text-dark"}`}>
            {task.title}
          </h5>
          <button 
            onClick={toggleStatus} 
            className={`btn p-0 border-0 ${task.status === 'completed' ? 'text-success' : 'text-muted opacity-50'}`}
          >
            {task.status === "completed" ? <CheckCircle size={22} fill="currentColor" className="text-white" /> : <Circle size={22} />}
          </button>
        </div>

        {/* Description */}
        <p className="card-text text-secondary small mb-3 text-truncate-2" style={{ height: '2.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </p>

        {/* Metadata Badges */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <span className={`badge rounded-pill ${config.bg} ${config.color} border-0 px-2 py-1`}>
            {task.priority}
          </span>
          <span className="badge rounded-pill bg-light text-dark border px-2 py-1 d-flex align-items-center gap-1">
            <Tag size={12} /> {task.category}
          </span>
        </div>

        {/* Bottom Section */}
        <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
          <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.8rem' }}>
            <Calendar size={14} />
            <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>

          <div className="d-flex gap-1">
            <button
              className="btn btn-sm btn-light rounded-circle p-2 text-primary shadow-sm hover-elevate"
              onClick={() => navigate(`/task/${task._id}`)}
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              className="btn btn-sm btn-light rounded-circle p-2 text-warning shadow-sm hover-elevate"
              onClick={() => navigate(`/edit/${task._id}`)}
              title="Edit Task"
            >
              <Edit3 size={16} />
            </button>
            <button
              className="btn btn-sm btn-light rounded-circle p-2 text-danger shadow-sm hover-elevate"
              onClick={deleteTask}
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskCard;
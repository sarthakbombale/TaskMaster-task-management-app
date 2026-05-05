import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Edit3, 
  Type, 
  AlignLeft, 
  Calendar, 
  BarChart2, 
  Tag, 
  ArrowLeft,
  Save
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../services/api";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    category: ""
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch existing task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/${id}`);
        setTask({
          ...res.data,
          dueDate: res.data.dueDate?.slice(0, 10) // Format date for input
        });
      } catch (err) {
        toast.error("Failed to load task details");
      } finally {
        setFetching(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.description || !task.dueDate || !task.category) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await API.put(`/tasks/${id}`, task);
      toast.success("Task updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-5 d-flex align-items-center">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      
      <div className="container">
        <div className="row justify-content-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="col-lg-6 col-md-8"
          >
            {/* Back Button */}
            <button 
              onClick={() => navigate("/dashboard")}
              className="btn btn-link text-decoration-none text-muted p-0 mb-4 d-flex align-items-center gap-2"
            >
              <ArrowLeft size={18} /> <span>Return to Dashboard</span>
            </button>

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header bg-white border-0 pt-4 px-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 bg-warning-subtle text-warning rounded-3">
                    <Edit3 size={24} />
                  </div>
                  <h4 className="fw-bold mb-0 text-dark">Modify Task</h4>
                </div>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Title</label>
                    <div className="input-group group-focus">
                      <span className="input-group-text bg-light border-0"><Type size={18} className="text-muted" /></span>
                      <input
                        className="form-control bg-light border-0 py-2 shadow-none"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Task title"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted text-uppercase">Description</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0 align-items-start pt-2"><AlignLeft size={18} className="text-muted" /></span>
                      <textarea
                        className="form-control bg-light border-0 py-2 shadow-none"
                        rows="3"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="What are the details?"
                      />
                    </div>
                  </div>

                  <div className="row">
                    {/* Due Date */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Due Date</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0"><Calendar size={18} className="text-muted" /></span>
                        <input
                          type="date"
                          className="form-control bg-light border-0 py-2 shadow-none"
                          name="dueDate"
                          value={task.dueDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Priority */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Priority</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0"><BarChart2 size={18} className="text-muted" /></span>
                        <select
                          className="form-select bg-light border-0 py-2 shadow-none"
                          name="priority"
                          value={task.priority}
                          onChange={handleChange}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-muted text-uppercase">Category</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><Tag size={18} className="text-muted" /></span>
                      <select
                        className="form-select bg-light border-0 py-2 shadow-none"
                        name="category"
                        value={task.category}
                        onChange={handleChange}
                      >
                        <option value="Work">💼 Work</option>
                        <option value="Personal">👤 Personal</option>
                        <option value="Shopping">🛍️ Shopping</option>
                        <option value="Health">🏥 Health</option>
                        <option value="Learning">📚 Learning</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn btn-primary flex-grow-1 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <><Save size={18} /> Save Changes</>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
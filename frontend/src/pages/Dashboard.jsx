import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  LayoutGrid, 
  Filter,
  Inbox
} from "lucide-react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const stats = [
    { label: "Total Tasks", count: tasks.length, icon: <LayoutGrid size={20} />, color: "text-primary", bg: "bg-primary-subtle" },
    { label: "Completed", count: tasks.filter(t => t.status === "completed").length, icon: <CheckCircle2 size={20} />, color: "text-success", bg: "bg-success-subtle" },
    { label: "Pending", count: tasks.filter(t => t.status === "pending").length, icon: <Clock size={20} />, color: "text-warning", bg: "bg-warning-subtle" },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="fw-bold text-dark mb-1">Your Workspace</h2>
            <p className="text-muted mb-0">Manage your projects and productivity</p>
          </div>
          <Link to="/create" className="btn btn-primary rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm">
            <Plus size={18} /> <span className="fw-semibold">New Task</span>
          </Link>
        </div>

        {/* 🔢 Stats Grid */}
        <div className="row g-4 mb-5">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="col-md-4"
            >
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small fw-bold text-uppercase mb-1">{stat.label}</p>
                    <h3 className="fw-bold mb-0">{stat.count}</h3>
                  </div>
                  <div className={`p-3 rounded-4 ${stat.bg} ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔍 Search & Filters Bar */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-lg-6">
              <div className="input-group input-group-merge">
                <span className="input-group-text bg-transparent border-end-0 text-muted">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0 shadow-none"
                  placeholder="Search by task title..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-lg-end gap-2">
              {["all", "pending", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`btn rounded-pill px-3 py-1 fw-medium text-capitalize transition-all ${
                    filter === f ? "btn-dark shadow" : "btn-outline-secondary border-0"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 📦 Tasks Grid */}
        <div className="row g-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, idx) => (
                <motion.div
                  layout
                  key={task._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="col-xl-4 col-md-6"
                >
                  <TaskCard task={task} refresh={fetchTasks} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-5 mt-4"
              >
                <div className="text-muted mb-3">
                  <Inbox size={48} strokeWidth={1} />
                </div>
                <h5 className="text-secondary fw-medium">No tasks found in this view</h5>
                <p className="small text-muted">Try adjusting your filters or create a new task.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
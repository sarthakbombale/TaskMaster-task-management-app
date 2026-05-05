import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path ? "active border-bottom border-2" : "";

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm py-2" 
      style={{ 
        background: "rgba(255, 255, 255, 0.95)", 
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e0e0e0" 
      }}
    >
      <div className="container">
        {/* Brand/Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <div className="bg-primary p-1 rounded-3 me-2 d-flex align-items-center justify-content-center" style={{ width: "35px", height: "35px" }}>
             <i className="bi bi-check2-square text-white fs-5"></i>
          </div>
          <span className="fw-bold fs-4 tracking-tight text-dark">Task<span className="text-primary">Master</span></span>
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links & Auth */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center">
            {token ? (
              <>
                <li className="nav-item px-2">
                  <Link className={`nav-link fw-medium text-secondary ${isActive('/dashboard')}`} to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item px-2">
                  <Link className={`nav-link fw-medium text-secondary ${isActive('/create')}`} to="/create">
                    Create Task
                  </Link>
                </li>
                
                {/* User Profile Dropdown */}
                <li className="nav-item dropdown ms-lg-3 mt-2 mt-lg-0">
                  <button 
                    className="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2 rounded-pill px-3" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle"></i>
                    <span>{user?.name || "Account"}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="userDropdown">
                    <li><h6 className="dropdown-header">Manage Profile</h6></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link className="btn btn-link text-decoration-none text-dark fw-semibold" to="/">
                  Login
                </Link>
                <Link className="btn btn-primary rounded-pill px-4 shadow-sm fw-semibold" to="/register">
                  Join Free
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import { useNavigate } from "react-router-dom"

export default function Navbar(){

  const navigate = useNavigate()
  const role = localStorage.getItem("role")

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  const roleLabel =
    role === "ADMIN"
      ? "Admin Dashboard"
      : role === "STAFF"
      ? "Staff Dashboard"
      : "Customer"

  return(

    <div className="navbar">

      {/* LEFT SIDE */}
      <div className="nav-left">
        <img
          src="/logo.png"
          alt="ResolveIT Logo"
          className="nav-logo"
        />
  
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        <span className="role-text">{roleLabel}</span>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

    </div>

  )
}
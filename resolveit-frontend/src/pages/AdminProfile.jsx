import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function AdminProfile(){

  const name = localStorage.getItem("name") || "Admin User"
  const email = localStorage.getItem("email") || "admin@email.com"
  const role = localStorage.getItem("role") || "ADMIN"

  const [showPassword, setShowPassword] = useState(false)

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: ""
  })

  const handleUpdatePassword = () => {

    if(!passwords.current || !passwords.newPass || !passwords.confirm){
      alert("All fields required")
      return
    }

    if(passwords.newPass !== passwords.confirm){
      alert("Passwords do not match")
      return
    }

    if(passwords.newPass.length < 6){
      alert("Password must be at least 6 characters")
      return
    }

    localStorage.setItem("password", passwords.newPass)

    alert("Password updated successfully")

    setShowPassword(false)

    setPasswords({
      current: "",
      newPass: "",
      confirm: ""
    })
  }

  return(
    <div>

      <Navbar/>

      <div className="layout">

        <Sidebar role="ADMIN"/>

        <div className="content">

          {/* HEADER */}
         <div className="page-header">
  <div className="page-header-left">
    <h1 className="page-title">
      👤 <span className="gradient-text">Admin Profile</span>
      <span className="admin-badge">⚡ Admin</span>
    </h1>
    <p className="page-subtitle">
      Manage your account details, security, and system access
    </p>
  </div>
</div>
          {/* STATS */}
          <div className="profile-stats">
            <div className="stat-card">
              <h3>Role</h3>
              <p>{role}</p>
            </div>

            <div className="stat-card">
              <h3>Status</h3>
              <p>Active</p>
            </div>

            <div className="stat-card">
              <h3>Access Level</h3>
              <p>Full Control</p>
            </div>
          </div>

          {/* PROFILE CARD */}
          <div className="profile-container">

            <div className="profile-card">

              {/* HEADER */}
              <div className="profile-header">
                <div className="avatar">
                  {name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2>{name}</h2>
                  <p className="email">{email}</p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="profile-details">
                <div className="detail-item">
                  <span>Role</span>
                  <span className="role-badge">{role}</span>
                </div>

                <div className="detail-item">
                  <span>Account Type</span>
                  <span>Administrator</span>
                </div>

                <div className="detail-item">
                  <span>Permissions</span>
                  <span>Manage Users, Complaints, Reports</span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="profile-actions">

                <button className="edit-btn">
                  Edit Profile
                </button>

                <button 
                  className="password-btn"
                  onClick={()=>setShowPassword(!showPassword)}
                >
                  {showPassword ? "Close" : "Update Password"}
                </button>

              </div>

              {/* PASSWORD SECTION */}
              {showPassword && (
                <div className="password-section">

                  <h3>Update Password</h3>

                  <div className="password-column">

                    <input
                      type="password"
                      placeholder="Current Password"
                      value={passwords.current}
                      onChange={(e)=>setPasswords({...passwords, current:e.target.value})}
                    />

                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwords.newPass}
                      onChange={(e)=>setPasswords({...passwords, newPass:e.target.value})}
                    />

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={passwords.confirm}
                      onChange={(e)=>setPasswords({...passwords, confirm:e.target.value})}
                    />

                    <button 
                      className="save-btn"
                      onClick={handleUpdatePassword}
                    >
                      Save
                    </button>

                    <button 
                      className="cancel-btn"
                      onClick={()=>setShowPassword(false)}
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

            </div>
             <div className="activity-panel">
       

       <div className="activity-item">📊 Viewed analytics</div>


<div className="activity-item">📌 Assigned complaint</div>
<div className="activity-item">✔ Resolved complaint</div>
<div className="activity-item">⚠️ Escalated issue</div>
<div className="activity-item">👥 Managed staff</div>
     </div>
          </div>
        </div>

      </div>

    </div>
  )
}
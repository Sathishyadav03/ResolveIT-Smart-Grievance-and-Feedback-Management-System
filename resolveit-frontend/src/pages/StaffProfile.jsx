import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function StaffProfile(){

  const name = localStorage.getItem("name") || "Staff User"
  const email = localStorage.getItem("email") || "staff@email.com"
  const role = localStorage.getItem("role") || "STAFF"

  const [showPassword, setShowPassword] = useState(false)

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: ""
  })

  /* PASSWORD UPDATE */
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

        <Sidebar role="STAFF"/>

        <div className="content">

          {/* HEADER */}
          <div className="page-header">
            <div className="page-header-left">
              <h1 className="page-title">
                🧑‍💼 <span className="gradient-text">Staff Profile</span>
                <span className="staff-badge">👨‍🔧 Staff</span>
              </h1>
              <p className="page-subtitle">
                Manage your profile and account settings
              </p>
            </div>
          </div>

          {/* 🔥 STATS SECTION */}
          <div className="profile-stats">

            <div className="stat-card">
              <h4>Total Complaints</h4>
              <p>24</p>
            </div>

            <div className="stat-card">
              <h4>Resolved</h4>
              <p>18</p>
            </div>

            <div className="stat-card">
              <h4>Pending</h4>
              <p>6</p>
            </div>

          </div>

          <div className="profile-container">

            <div className="profile-card">

              {/* PROFILE HEADER */}
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
                  <span className="role-badge staff">{role}</span>
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

              {/* 🔥 PASSWORD SECTION (FIXED GRID) */}
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

                  </div>

                  <div className="password-actions">
                    <button className="save-btn" onClick={handleUpdatePassword}>
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

              {/* 🔥 ACTIVITY SECTION */}
              <div className="activity-panel">

                <h3>Recent Activity</h3>

                <div className="activity-item">
                  ✔ Resolved complaint #12
                </div>

                <div className="activity-item">
                  ⏳ Working on complaint #15
                </div>

                <div className="activity-item">
                  📩 Assigned new complaint #18
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
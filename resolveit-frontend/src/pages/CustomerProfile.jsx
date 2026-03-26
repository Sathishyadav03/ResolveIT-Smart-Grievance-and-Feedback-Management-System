import { useState } from "react"

export default function CustomerProfile(){

  const [name, setName] = useState(localStorage.getItem("name") || "Customer User")
  const [email, setEmail] = useState(localStorage.getItem("email") || "customer@email.com")
  const role = localStorage.getItem("role") || "CUSTOMER"

  const [showPassword, setShowPassword] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showPassText, setShowPassText] = useState(false)

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: ""
  })

  const [editData, setEditData] = useState({
    name,
    email
  })

  /* 🔐 PASSWORD UPDATE */
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

  /* ✏️ PROFILE UPDATE */
  const handleSaveProfile = () => {
    localStorage.setItem("name", editData.name)
    localStorage.setItem("email", editData.email)

    setName(editData.name)
    setEmail(editData.email)

    alert("Profile updated successfully")
    setShowEdit(false)
  }

  return(
    <div className="content">

      {/* HEADER */}
     <div className="page-header">
  <div className="page-header-left">
    <h1 className="page-title">
      👤 <span className="gradient-text">Customer Profile</span>
      <span className="customer-badge">🧑 Customer</span>
    </h1>
    <p className="page-subtitle">
      Manage your account details securely
    </p>
  </div>
</div>

      <div className="profile-container">

        {/* PROFILE CARD */}
        <div className="profile-card">

          <div className="profile-header">
            <div className="avatar">
              {name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2>{name}</h2>
              <p className="email">{email}</p>
            </div>
          </div>

          {/* ACCOUNT INFO */}
          <div className="profile-details">
            <div className="detail-item">
              <span>Role</span>
              <span className="role-badge customer">{role}</span>
            </div>

            <div className="detail-item">
              <span>Account Status</span>
              <span className="status active">Active</span>
            </div>

            <div className="detail-item">
              <span>Last Login</span>
              <span>Today</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="profile-actions">

            <button className="edit-btn" onClick={()=>setShowEdit(true)}>
              Edit Profile
            </button>

            <button 
              className="password-btn"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? "Close" : "Update Password"}
            </button>

          </div>

        </div>

        {/* 🔐 PASSWORD SECTION */}
        {showPassword && (
          <div className="password-section">

            <h3>Update Password</h3>

            <div className="password-column">

              <input
                type={showPassText ? "text" : "password"}
                placeholder="Current Password"
                value={passwords.current}
                onChange={(e)=>setPasswords({...passwords, current:e.target.value})}
              />

              <input
                type={showPassText ? "text" : "password"}
                placeholder="New Password"
                value={passwords.newPass}
                onChange={(e)=>setPasswords({...passwords, newPass:e.target.value})}
              />

              <input
                type={showPassText ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwords.confirm}
                onChange={(e)=>setPasswords({...passwords, confirm:e.target.value})}
              />

              <label style={{fontSize:"14px"}}>
                <input 
                  type="checkbox"
                  onChange={()=>setShowPassText(!showPassText)}
                /> Show Password
              </label>

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

      </div>
        {/* 🔥 ACTIVITY SECTION */}
      <div className="activity-panel">
       

       <div className="activity-item">📝 Raised complaint #23 about service issue</div>

<div className="activity-item">✔ Complaint #18 marked as resolved</div>

<div className="activity-item">⏳ Complaint #25 is being processed</div>

<div className="activity-item">📌 12 total complaints submitted</div>

<div className="activity-item">📅 Joined in January 2026</div>
      </div>

      {/* ✏️ EDIT MODAL */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="modal">

            <h3>Edit Profile</h3>

            <input
              type="text"
              value={editData.name}
              onChange={(e)=>setEditData({...editData, name:e.target.value})}
              placeholder="Name"
            />

            <input
              type="email"
              value={editData.email}
              onChange={(e)=>setEditData({...editData, email:e.target.value})}
              placeholder="Email"
            />

            <button className="save-btn" onClick={handleSaveProfile}>
              Save
            </button>

            <button 
              className="cancel-btn"
              onClick={()=>setShowEdit(false)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  )
}
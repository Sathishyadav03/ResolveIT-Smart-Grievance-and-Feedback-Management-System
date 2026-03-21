import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function CustomerDashboard(){

const [complaints,setComplaints] = useState([])
const [loading,setLoading] = useState(true)

const location = useLocation()
const navigate = useNavigate()

useEffect(()=>{
  loadComplaints()
},[])

const loadComplaints = async () => {
  try{
    const res = await api.get("/complaints/my")
    setComplaints(res.data)
  }catch(err){
    console.log(err)
  }finally{
    setLoading(false)
  }
}

/* COUNTS */

const assigned = complaints.filter(c => c.statusType === "ASSIGNED").length
const inProgress = complaints.filter(c => c.statusType === "IN_PROGRESS").length
const resolved = complaints.filter(c => c.statusType === "RESOLVED").length

/* GREETING */

const name = localStorage.getItem("name") || "User"
const hour = new Date().getHours()

const greeting =
  hour < 12 ? "Good Morning ☀️" :
  hour < 18 ? "Good Afternoon 🌤️" :
  "Good Evening 🌙"

return(
<div>

<Navbar/>

<div className="layout">
<Sidebar role="CUSTOMER"/>

<div className="content premium-bg">

{location.pathname === "/customer-dashboard" && (

<>
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <h1 className="page-title">
    {greeting}, {name} 👋
  </h1>
  <p className="subtitle">Here’s your complaint activity 🚀</p>
</motion.div>

{/* QUICK ACTIONS */}
<div className="quick-actions">
  <button onClick={()=>navigate("/customer-dashboard/submit-complaint")}>
    ➕ New Complaint
  </button>

  <button onClick={()=>navigate("/customer-dashboard/complaint-status")}>
    📂 View All
  </button>
</div>

{loading && (
  <p className="loading-text">⏳ Loading dashboard...</p>
)}

{!loading && (
<>

{/* STATS */}
<div className="stats-grid">
  {[
    {title:"Total", value:complaints.length, icon:"📊"},
    {title:"Assigned", value:assigned, icon:"📌"},
    {title:"In Progress", value:inProgress, icon:"⏳"},
    {title:"Resolved", value:resolved, icon:"✅"}
  ].map((item,i)=>(
    
    <motion.div
      key={i}
      className="stat-card neon"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ scale: 1.07 }}
    >
      <div className="stat-icon">{item.icon}</div>
      <h3>{item.title}</h3>
      <p>{item.value}</p>
    </motion.div>
  ))}
</div>

{/* PROGRESS */}
<div className="progress-section">
  <h3>📈 Resolution Progress</h3>

  <div className="progress-bar">
    <div 
      className="progress-fill"
      style={{ width: `${(resolved / complaints.length) * 100 || 0}%` }}
    ></div>
  </div>

  <p>{resolved} / {complaints.length} Resolved</p>
</div>

{/* MAIN GRID */}
<div className="dashboard-grid">

  {/* RECENT */}
  <motion.div 
    className="card glass premium-card"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
  >

    <h3>📋 Recent Complaints</h3>

    <div className="card-content">

      {complaints.length === 0 ? (
        <p className="empty-text">No complaints yet 🚀</p>
      ) : (
        complaints.slice(0,5).map(c => (

          <div key={c.id} className="activity-item modern-item">

            <div className={`status-dot ${c.statusType}`}></div>

            <div>
              <strong>#{c.id} {c.category}</strong>

              <p>
                {c.urgency === "HIGH" && "🔴 "}
                {c.urgency === "MEDIUM" && "🟡 "}
                {c.urgency === "LOW" && "🟢 "}
                {c.statusType}

                {c.assignedStaffName && (
                  <span> → {c.assignedStaffName}</span>
                )}
              </p>
            </div>

          </div>

        ))
      )}

    </div>

  </motion.div>

  {/* SMART */}
  <motion.div 
    className="card glass premium-card"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
  >

    <h3>🤖 Smart Suggestions</h3>

    <div className="card-content">

      {complaints.length === 0 && (
        <div className="tip-box">🚀 Start by submitting your first complaint</div>
      )}

      {inProgress > 0 && (
        <div className="tip-box">⏳ Track ongoing complaints regularly</div>
      )}

      {resolved > 0 && (
        <div className="tip-box success">✅ You resolved {resolved} complaints</div>
      )}

      {assigned > 0 && (
        <div className="tip-box">📌 Assigned complaints will update soon</div>
      )}

    </div>

  </motion.div>

</div>

</>
)}

</>
)}

<Outlet/>

</div>
</div>
</div>
)
}
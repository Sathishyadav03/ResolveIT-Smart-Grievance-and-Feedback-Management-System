import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function StaffDashboard(){

  const [complaints,setComplaints] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    loadComplaints()
  },[])

  const loadComplaints = async () => {
    try{
      const res = await api.get("/complaints/staff")
      setComplaints(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const total = complaints.length
  const pending = complaints.filter(c => c.statusType !== "RESOLVED").length
  const resolved = complaints.filter(c => c.statusType === "RESOLVED").length

  // 🎯 Completion %
  const completionRate = total === 0 ? 0 : Math.round((resolved / total) * 100)

  // 🧠 Smart Insight
  let insight = ""
  if (pending > 5) {
    insight = "⚠️ High workload! Focus on pending complaints."
  } else if (resolved > pending) {
    insight = "🎉 Great job! Most complaints are resolved."
  } else {
    insight = "📌 Keep working on assigned complaints."
  }

  // 🚨 High Priority Alert
  const hasHigh = complaints.some(c => c.urgency === "HIGH")

  const today = new Date().toLocaleDateString()

  return(

    <div>

      <Navbar/>

      <div className="layout">

        <Sidebar role="STAFF"/>

        <div className="content">

          {/* HEADER */}
          <div className="page-header-row">
            <div>
              <h1 className="page-title">📊 Staff Dashboard</h1>
              <p className="page-subtitle">Manage complaints with insights</p>
            </div>

            <div className="staff-count">
              📅 {today}
            </div>
          </div>

          {/* 🚨 ALERT */}
          {hasHigh && (
            <div className="alert-box">
              🔴 High priority complaints need immediate attention!
            </div>
          )}

          {/* STATS */}
          <div className="stats-grid">

            {/* TOTAL */}
            <div 
              className="stat-card open clickable"
              onClick={() => navigate("/staff-dashboard/assigned")}   // ✅ FIXED
            >
              <div className="stat-icon">📌</div>
              <h3>Total Assigned</h3>
              <p>{total}</p>
            </div>

            {/* PENDING */}
            <div 
              className="stat-card progress clickable"
              onClick={() => navigate("/staff-dashboard/assigned")}   // ✅ FIXED
            >
              <div className="stat-icon">⏳</div>
              <h3>Pending</h3>
              <p>{pending}</p>
            </div>

            {/* RESOLVED */}
            <div 
              className="stat-card resolved clickable"
              onClick={() => navigate("/staff-dashboard/resolved")}   // ✅ FIXED
            >
              <div className="stat-icon">✅</div>
              <h3>Resolved</h3>
              <p>{resolved}</p>
            </div>

          </div>

          {/* 🎯 COMPLETION */}
          <div className="progress-card">
            <h3>🎯 Completion Rate</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{width: `${completionRate}%`}}
              ></div>
            </div>
            <p>{completionRate}% Completed</p>
          </div>

          {/* 🧠 INSIGHT */}
          <div className="insight-box">
            {insight}
          </div>

          {/* TABLE */}
          <div className="table-container">

            <table className="table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Urgency</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {complaints.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-cell">
                      📭 No assigned complaints
                    </td>
                  </tr>
                )}

                {complaints.map(c => (

                  <tr key={c.id}>

                    <td>#{c.id}</td>

                    <td>{c.category}</td>

                    <td className="desc-cell">{c.description}</td>

                    <td>
                      <span className={`urgency ${c.urgency}`}>
                        {c.urgency === "HIGH" && "🔴 "}
                        {c.urgency === "MEDIUM" && "🟡 "}
                        {c.urgency === "LOW" && "🟢 "}
                        {c.urgency}
                      </span>
                    </td>

                    <td>
                      <span className={`status ${c.statusType}`}>
                        {c.statusType === "OPEN" && "📂 Open"}
                        {c.statusType === "ASSIGNED" && "⏳ Assigned"}
                        {c.statusType === "RESOLVED" && "✅ Resolved"}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  )  
}
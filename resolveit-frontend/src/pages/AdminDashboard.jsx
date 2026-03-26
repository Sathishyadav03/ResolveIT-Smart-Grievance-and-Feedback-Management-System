import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ComplaintChart from "../components/ComplaintChart"
import api from "../services/api"

export default function AdminDashboard(){

  const [complaints,setComplaints] = useState([])
  const [loading,setLoading] = useState(true)
  const [search,setSearch] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    loadComplaints()
  },[])

  const loadComplaints = async () => {
    try{
      const res = await api.get("/complaints/all")
      setComplaints(res.data)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const downloadReport = async () => {
    try{
      const res = await api.get("/reports/export")

      const blob = new Blob([res.data], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = "complaints_report.csv"

      document.body.appendChild(link)
      link.click()
      link.remove()

    }catch(err){
      console.log(err)
    }
  }

  /* FILTER */
  const filteredComplaints = complaints.filter(c =>
    c.category?.toLowerCase().includes(search.toLowerCase())
  )

  /* STATS */
  const total = complaints.length
  const open = complaints.filter(c => c.statusType === "OPEN").length
  const assigned = complaints.filter(c => c.statusType === "ASSIGNED").length
  const resolved = complaints.filter(c => c.statusType === "RESOLVED").length
  const inProgress = complaints.filter(c => c.statusType === "IN_PROGRESS").length
  const escalated = complaints.filter(c => c.statusType === "ESCALATED").length
  const highPriority = complaints.filter(c => c.urgency === "HIGH").length

  /* 🔥 UPDATED CHART DATA */
  const chartData = [
    { name:"OPEN", value:open },
    { name:"ASSIGNED", value:assigned },
    { name:"IN_PROGRESS", value:inProgress },
    { name:"ESCALATED", value:escalated },
    { name:"RESOLVED", value:resolved }
  ]

  if(loading){
    return (
      <div>
        <Navbar/>
        <div className="layout">
          <Sidebar role="ADMIN"/>
          <div className="content">
            <div className="empty-state">
              ⏳ Loading dashboard...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return(

    <div>

      <Navbar/>

      <div className="layout">

        <Sidebar role="ADMIN"/>

        <div className="content">

          {/* HEADER */}
          <div className="admin-header">

            <div>
              <h1 className="page-title">
                📊 <span className="gradient-text">Admin Dashboard</span>
              </h1>
              <p className="page-subtitle">
                Monitor, analyze and control complaint workflow
              </p>
            </div>

            <button className="download-btn" onClick={downloadReport}>
              ⬇️ Download Report
            </button>

          </div>

          {/* 🔥 ALERTS */}
          {highPriority > 0 && (
            <div className="alert-box">
              ⚠ {highPriority} High Priority complaints need attention!
            </div>
          )}

          {escalated > 0 && (
            <div className="alert-box escalated-alert">
              🚨 {escalated} Escalated complaints require immediate action!
            </div>
          )}

          {/* QUICK ACTIONS */}
          <div className="quick-actions">

            <button onClick={() => navigate("/admin-dashboard/complaints")}>
              📋 View All
            </button>

            <button onClick={() => navigate("/admin-dashboard/complaints?assignment=UNASSIGNED")}>
              ⚡ Assign Complaints
            </button>

            <button onClick={() => navigate("/admin-dashboard/complaints?status=ESCALATED")}>
              🚨 View Escalated
            </button>

            <button onClick={() => navigate("/admin-dashboard/staff")}>
              👨‍💼 Manage Staff
            </button>

          </div>

          {/* STATS */}
          <div className="stats-grid">

            <div className="stat-card" onClick={()=>navigate("/admin-dashboard/complaints")}>
              <h3>Total</h3>
              <p>{total}</p>
            </div>

            <div className="stat-card open">
              <h3>Open</h3>
              <p>{open}</p>
            </div>

            <div className="stat-card progress">
              <h3>Assigned</h3>
              <p>{assigned}</p>
            </div>

            <div 
              className="stat-card escalated"
              onClick={()=>navigate("/admin-dashboard/complaints?status=ESCALATED")}
            >
              <h3>Escalated</h3>
              <p>{escalated}</p>
            </div>

            <div className="stat-card resolved">
              <h3>Resolved</h3>
              <p>{resolved}</p>
            </div>

          </div>

          {/* STATUS ANALYTICS */}
          <div className="chart-section combined-chart">

            <h2 className="chart-title">📊 Status Analytics</h2>

            <div className="chart-content">

              <div className="chart-left">
                <ComplaintChart data={chartData}/>
              </div>

              <div className="chart-overview">

                <h3>📌 Overview</h3>

                <div className="summaryT-item">
                  <span>Total</span>
                  <strong>{total}</strong>
                </div>

                <div className="summaryA-item">
                  <span>Assigned</span>
                  <strong>{assigned}</strong>
                </div>

                <div className="summaryP-item">
                  <span>In Progress</span>
                  <strong>{inProgress}</strong>
                </div>

                <div className="summaryE-item">
                  <span>Escalated</span>
                  <strong>{escalated}</strong>
                </div>

                <div className="summaryR-item">
                  <span>Resolved</span>
                  <strong>{resolved}</strong>
                </div>

              </div>

            </div>

          </div>

          {/* RECENT */}
          <div className="activity-panel">

            <h3>🕒 Recent Complaints</h3>

            <input 
              className="search-box"
              placeholder="🔍 Search..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

            {filteredComplaints.length === 0 ? (
              <div className="empty-state">📭 No complaints found</div>
            ) : (
              filteredComplaints.slice(0,5).map(c => (
                <div key={c.id} className="activity-item">
                  <strong>#{c.id} {c.category}</strong>
                  {c.statusType === "ESCALATED" && (
                    <span className="badge escalated"> 🚨 Escalated</span>
                  )}
                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  )
}
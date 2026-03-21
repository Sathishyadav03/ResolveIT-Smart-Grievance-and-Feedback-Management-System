import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function AssignedComplaints() {

  const [complaints, setComplaints] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [urgencyFilter, setUrgencyFilter] = useState("ALL")
  const [dateFilter, setDateFilter] = useState("ALL")

  const navigate = useNavigate()

  useEffect(() => {
    loadComplaints()
  }, [])

  const loadComplaints = async () => {
    try {
      const res = await api.get("/complaints/staff")
      setComplaints(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  /* ✅ FILTER LOGIC (FIXED) */
  const filtered = complaints.filter(c => {

    // SEARCH
    const matchSearch =
      c.category?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())

    // STATUS
    const matchStatus =
      statusFilter === "ALL" ||
      c.statusType?.toUpperCase() === statusFilter

    // URGENCY
    const matchUrgency =
      urgencyFilter === "ALL" ||
      c.urgency?.toUpperCase() === urgencyFilter

    // DATE FILTER
    let matchDate = true

    if (dateFilter !== "ALL" && c.createdAt) {

      const today = new Date()
      const complaintDate = new Date(c.createdAt)

      // remove time
      today.setHours(0,0,0,0)
      complaintDate.setHours(0,0,0,0)

      const diffTime = today.getTime() - complaintDate.getTime()
      const diffDays = diffTime / (1000 * 60 * 60 * 24)

      if (dateFilter === "TODAY") {
        matchDate = diffDays === 0
      } 
      else if (dateFilter === "WEEK") {
        matchDate = diffDays >= 0 && diffDays <= 7
      } 
      else if (dateFilter === "MONTH") {
        matchDate = diffDays >= 0 && diffDays <= 30
      }
    }

    // 🔥 IMPORTANT RETURN
    return matchSearch && matchStatus && matchUrgency && matchDate
  })

  /* ✅ STATS (FIXED POSITION) */
  const total = complaints.length
  const resolvedCount = complaints.filter(c => c.statusType === "RESOLVED").length
  const inProgress = complaints.filter(c => c.statusType === "IN_PROGRESS").length
  const escalated = complaints.filter(c => c.statusType === "ESCALATED").length

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar role="STAFF" />

        <div className="content">

          {/* HEADER */}
          <div className="page-header">
            <div className="page-header-left">

              <h1 className="page-title">
                <span className="title-icon">📋</span>
                Assigned Complaints
              </h1>

              <p className="page-subtitle">
                Manage all assigned complaints efficiently
              </p>

              <div className="complaint-count">
                Total: {total}
              </div>

            </div>
          </div>

          {/* FILTER BAR */}
          <div className="filter-bar improved-filter">

            <input
              className="search-input"
              placeholder="🔍 Search complaints..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e)=>setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="ESCALATED">Escalated</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            <select
              className="filter-select"
              value={urgencyFilter}
              onChange={(e)=>setUrgencyFilter(e.target.value)}
            >
              <option value="ALL">All Urgency</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <select
              className="filter-select"
              value={dateFilter}
              onChange={(e)=>setDateFilter(e.target.value)}
            >
              <option value="ALL">All Time</option>
              <option value="TODAY">Today</option>
              <option value="WEEK">Last 7 Days</option>
              <option value="MONTH">Last 30 Days</option>
            </select>

          </div>

          {/* STATS */}
          <div className="assigned-stats">

            <div className="assigned-card blue">
              <h4>Total</h4>
              <p>{total}</p>
            </div>

            <div className="assigned-card orange">
              <h4>In Progress</h4>
              <p>{inProgress}</p>
            </div>

            <div className="assigned-card red">
              <h4>Escalated</h4>
              <p>{escalated}</p>
            </div>

            <div className="assigned-card green">
              <h4>Resolved</h4>
              <p>{resolvedCount}</p>
            </div>

          </div>

          {/* TABLE */}
          <div className="table-card">

            <table className="modern-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="7" className="empty">
                      🚫 No matching complaints
                    </td>
                  </tr>
                )}

                {filtered.map(c => (

                  <tr key={c.id} className="row-hover">

                    <td>{c.id}</td>
                    <td>{c.category}</td>
                    <td>{c.description}</td>

                    <td>
                      <span className={`badge urgency ${c.urgency}`}>
                        {c.urgency}
                      </span>
                    </td>

                    <td>
                      <span className={`badge status ${c.statusType}`}>
                        {c.statusType}
                      </span>
                    </td>

                    <td>
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/complaint/${c.id}`)}
                      >
                        View
                      </button>
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
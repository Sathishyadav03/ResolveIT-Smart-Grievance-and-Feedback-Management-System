import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function ResolvedComplaints() {

  const [complaints, setComplaints] = useState([])
  const [search, setSearch] = useState("")
  const [urgencyFilter, setUrgencyFilter] = useState("ALL")

  const navigate = useNavigate()

  useEffect(() => {
    loadComplaints()
  }, [])

  const loadComplaints = async () => {
    try {
      const res = await api.get("/complaints/staff")

      const resolved = res.data.filter(
        c => c.statusType === "RESOLVED"
      )

      setComplaints(resolved)

    } catch (err) {
      console.log(err)
    }
  }

  /* FILTER */
  const filtered = complaints.filter(c => {
    const matchSearch = c.category?.toLowerCase().includes(search.toLowerCase())
    const matchUrgency = urgencyFilter === "ALL" || c.urgency === urgencyFilter
    return matchSearch && matchUrgency
  })

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar role="STAFF" />

        <div className="content">

          {/* 🔥 HEADER */}
          <div className="page-header">
            <div className="page-header-left">

              <h1 className="page-title">
                <span className="title-icon">✅</span>
                Resolved Complaints
              </h1>

              <p className="page-subtitle">
                View and manage all successfully resolved complaints
              </p>

              {/* COUNT */}
              <div className="complaint-count">
                Total Resolved: {complaints.length}
              </div>

            </div>
          </div>

          {/* 🔥 SEARCH + FILTER */}
          <div className="filter-bar improved-filter">

            <input
              className="search-input"
              placeholder="🔍 Search by category..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />

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

          </div>

          {/* 🔥 STATS */}
          <div className="resolved-stats">

            <div className="resolved-card green">
              <h4>Resolved</h4>
              <p>{complaints.length}</p>
            </div>

            <div className="resolved-card orange">
              <h4>High Priority</h4>
              <p>{complaints.filter(c => c.urgency === "HIGH").length}</p>
            </div>

            <div className="resolved-card blue">
              <h4>Medium / Low</h4>
              <p>{complaints.filter(c => c.urgency !== "HIGH").length}</p>
            </div>

          </div>

          {/* TABLE */}
          <div className="table-card success-card">

            <table className="modern-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty">
                      🚫 No matching results
                    </td>
                  </tr>
                )}

                {filtered.map(c => (

                  <tr key={c.id} className="row-hover success-row">

                    <td>{c.id}</td>
                    <td>{c.category}</td>
                    <td>{c.description}</td>

                    <td>
                      <span className={`badge urgency ${c.urgency}`}>
                        {c.urgency}
                      </span>
                    </td>

                    <td>
                      <span className="badge resolved">
                        RESOLVED
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-btn success-btn"
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
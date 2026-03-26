import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"
import { useLocation } from "react-router-dom"

export default function AdminComplaints(){

  const [complaints,setComplaints] = useState([])
  const [staff,setStaff] = useState([])
  const [selectedStaff,setSelectedStaff] = useState({})
  const [search,setSearch] = useState("")

  const [filters, setFilters] = useState({
    assignment: "ALL",
    urgency: "ALL",
    status: "ALL"
  })

  const location = useLocation()

  useEffect(()=>{
    loadComplaints()
    loadStaff()
  },[])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const assignment = params.get("assignment")

    if (assignment) {
      setFilters(prev => ({ ...prev, assignment }))
    }
  }, [location])

  const loadComplaints = async ()=>{
    try{
      const res = await api.get("/complaints/all")
      setComplaints(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const loadStaff = async ()=>{
    try{
      const res = await api.get("/users/staff")
      setStaff(res.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleStaffChange = (complaintId,value)=>{
    setSelectedStaff(prev => ({
      ...prev,
      [complaintId]:value
    }))
  }

  const assignStaff = async (complaintId)=>{
    const staffId = selectedStaff[complaintId]

    if(!staffId){
      alert("Select staff first")
      return
    }

    try{
      await api.post("/complaints/assign",null,{
        params:{complaintId,staffId}
      })
      loadComplaints()
    }catch(err){
      console.log(err)
    }
  }

  const escalateComplaint = async (complaintId)=>{
    if(!window.confirm("Escalate this complaint?")) return

    try{
      await api.put(`/complaints/escalate/${complaintId}`)
      loadComplaints()
    }catch(err){
      console.log(err)
    }
  }

  /* 🔥 FILTER */
  const filtered = complaints.filter(c => {

    const matchSearch =
      c.category?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())

    const matchAssignment =
      filters.assignment === "ALL" ||
      (filters.assignment === "ASSIGNED" && c.assignedStaffId) ||
      (filters.assignment === "UNASSIGNED" && !c.assignedStaffId)

    const matchUrgency =
      filters.urgency === "ALL" || c.urgency === filters.urgency

    const matchStatus =
      filters.status === "ALL" || c.statusType === filters.status

    return matchSearch && matchAssignment && matchUrgency && matchStatus
  })

  /* 🔥 SEPARATE GROUPS */
  const unassigned = filtered.filter(c => !c.assignedStaffId)
  const assigned = filtered.filter(
    c => c.assignedStaffId && c.statusType !== "ESCALATED"
  )
  const escalatedComplaints = filtered.filter(
    c => c.statusType === "ESCALATED"
  )

  /* 🔥 STATS */
  const total = complaints.length
  const assignedCount = complaints.filter(c => c.assignedStaffId).length
  const unassignedCount = complaints.filter(c => !c.assignedStaffId).length
  const resolvedCount = complaints.filter(c => c.statusType === "RESOLVED").length
  const escalatedCount = complaints.filter(c => c.statusType === "ESCALATED").length

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
                📋 <span className="gradient-text">Admin Complaint Dashboard</span>
              </h1>

              <p className="page-subtitle">
                Monitor, assign and control complaint workflow
              </p>
            </div>

            <div className="complaint-count">
              Total: {filtered.length}
            </div>

          </div>

          {/* STATS */}
          <div className="stats-grid">

            <div className="stat-card open">
              <h3>Total</h3>
              <p>{total}</p>
            </div>

            <div className="stat-card progress">
              <h3>Assigned</h3>
              <p>{assignedCount}</p>
            </div>

            <div className="stat-card">
              <h3>Unassigned</h3>
              <p>{unassignedCount}</p>
            </div>

            <div className="stat-card escalated">
              <h3>Escalated</h3>
              <p>{escalatedCount}</p>
            </div>

            <div className="stat-card resolved">
              <h3>Resolved</h3>
              <p>{resolvedCount}</p>
            </div>

          </div>

          {/* SEARCH */}
          <input
            className="search-box"
            placeholder="🔍 Search complaints..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          {/* FILTERS */}
          <div className="filter-bar">

            <select
              value={filters.assignment}
              onChange={(e)=>setFilters({...filters, assignment:e.target.value})}
            >
              <option value="ALL">All</option>
              <option value="UNASSIGNED">Unassigned</option>
              <option value="ASSIGNED">Assigned</option>
            </select>

            <select
              value={filters.urgency}
              onChange={(e)=>setFilters({...filters, urgency:e.target.value})}
            >
              <option value="ALL">All Urgency</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            <select
              value={filters.status}
              onChange={(e)=>setFilters({...filters, status:e.target.value})}
            >
              <option value="ALL">All Status</option>
              <option value="OPEN">Open</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="ESCALATED">Escalated</option>
              <option value="RESOLVED">Resolved</option>
            </select>

          </div>

          <div className="complaints-section">

            {/* UNASSIGNED */}
            <h2 className="section-title">
              🔴 Unassigned ({unassigned.length})
            </h2>

            {unassigned.map(c => (
              <div key={c.id} className="complaint-card">

                <div className="complaint-left">
                  <div className="complaint-title">
                    #{c.id} {c.category}
                  </div>

                  <p className="complaint-desc">{c.description}</p>

                  <div className="complaint-meta">
                    <span className={`badge urgency ${c.urgency}`}>
                      {c.urgency}
                    </span>

                    <span className={`badge status ${c.statusType}`}>
                      {c.statusType}
                    </span>
                  </div>
                </div>

                <div className="complaint-right">
                  <select
                    className="staff-select"
                    value={selectedStaff[c.id] || ""}
                    onChange={(e)=>handleStaffChange(c.id,e.target.value)}
                  >
                    <option value="">Select Staff</option>
                    {staff.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>

                  <button
                    className="assign-btn"
                    onClick={()=>assignStaff(c.id)}
                  >
                    Assign
                  </button>
                </div>

              </div>
            ))}

            {/* ASSIGNED */}
            <h2 className="section-title">
              👨‍🔧 Assigned ({assigned.length})
            </h2>

            {assigned.map(c => (
              <div key={c.id} className="complaint-card">

                <div className="complaint-left">
                  <div className="complaint-title">
                    #{c.id} {c.category}
                  </div>

                  <p className="complaint-desc">{c.description}</p>

                  <p className="staff-info">
                    👨‍💼 {c.assignedStaffName}
                  </p>
                </div>

                {c.statusType !== "RESOLVED" && (
                  <button
                    className="escalate-btn"
                    onClick={()=>escalateComplaint(c.id)}
                  >
                    🚨 Escalate
                  </button>
                )}

              </div>
            ))}

            {/* ESCALATED */}
            <h2 className="section-title">
              🚨 Escalated ({escalatedComplaints.length})
            </h2>

            {escalatedComplaints.map(c => (
              <div key={c.id} className="complaint-card escalated-card">

                <div className="complaint-left">
                  <div className="complaint-title">
                    #{c.id} {c.category}
                  </div>

                  <p className="complaint-desc">{c.description}</p>

                  <p className="staff-info">
                    👨‍💼 {c.assignedStaffName}
                  </p>

                  <span className="badge escalated">
                    🚨 ESCALATED
                  </span>
                </div>

              </div>
            ))}

            {filtered.length === 0 && (
              <div className="empty-state">
                📭 No complaints found
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  )
}
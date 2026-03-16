import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function CustomerDashboard(){

const [complaints,setComplaints] = useState([])
const [loading,setLoading] = useState(true)

const location = useLocation()

useEffect(()=>{
loadComplaints()
},[])

/* LOAD USER COMPLAINTS */

const loadComplaints = async () => {

try{

const res = await api.get("/complaints/my")

setComplaints(res.data)

}catch(err){

console.log("Failed to load complaints",err)

}finally{

setLoading(false)

}

}

/* STATUS COUNTS */

const assigned = complaints.filter(
c => c.statusType === "ASSIGNED"
).length

const inProgress = complaints.filter(
c => c.statusType === "IN_PROGRESS"
).length

const resolved = complaints.filter(
c => c.statusType === "RESOLVED"
).length

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="CUSTOMER"/>

<div className="content">

{location.pathname === "/customer-dashboard" && (

<>

<h1 className="page-title">Customer Dashboard</h1>

{loading && (
<p style={{marginTop:"20px"}}>
Loading dashboard...
</p>
)}

{!loading && (

<>

{/* STATS */}

<div className="stats-grid">

<div className="stat-card open">

<div className="stat-icon">📂</div>

<h3>Total Complaints</h3>

<p>{complaints.length}</p>

</div>

<div className="stat-card progress">

<div className="stat-icon">📌</div>

<h3>Assigned</h3>

<p>{assigned}</p>

</div>

<div className="stat-card progress">

<div className="stat-icon">⏳</div>

<h3>In Progress</h3>

<p>{inProgress}</p>

</div>

<div className="stat-card resolved">

<div className="stat-icon">✅</div>

<h3>Resolved</h3>

<p>{resolved}</p>

</div>

</div>

{/* DASHBOARD GRID */}

<div className="dashboard-grid">

{/* RECENT COMPLAINTS */}

<div className="chart-section">

<h3>Recent Complaints</h3>

{complaints.length === 0 ? (

<p style={{fontSize:"14px",marginTop:"10px"}}>
No complaints submitted yet
</p>

) : (

complaints.slice(0,5).map(c => (

<div key={c.id} className="activity-item">

<div className="activity-dot"></div>

<div>

<strong>
#{c.id} {c.category}
</strong>

<p style={{fontSize:"13px",color:"#64748b"}}>

{/* URGENCY INDICATOR */}

{c.urgency === "HIGH" && "🔴 "}
{c.urgency === "MEDIUM" && "🟡 "}
{c.urgency === "LOW" && "🟢 "}

Status: {c.statusType}

{c.assignedStaffName && (
<span style={{marginLeft:"6px"}}>
→ {c.assignedStaffName}
</span>
)}

</p>

</div>

</div>

))

)}

</div>

{/* QUICK TIPS */}

<div className="activity-panel">

<h3>Quick Tips</h3>

<div className="activity-item">
<div className="activity-dot"></div>
<p>Submit complaints using the form</p>
</div>

<div className="activity-item">
<div className="activity-dot"></div>
<p>Track complaint progress anytime</p>
</div>

<div className="activity-item">
<div className="activity-dot"></div>
<p>Staff will update complaint status regularly</p>
</div>

</div>

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
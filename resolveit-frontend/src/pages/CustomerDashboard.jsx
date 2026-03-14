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

const open = complaints.filter(c => c.statusType === "OPEN").length

const progress = complaints.filter(
c => ["ASSIGNED","IN_PROGRESS"].includes(c.statusType)
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

{loading && <p>Loading dashboard...</p>}

{!loading && (

<>

<div className="stats-grid">

<div className="stat-card open">
<div className="stat-icon">📂</div>
<h3>Total Complaints</h3>
<p>{complaints.length}</p>
</div>

<div className="stat-card progress">
<div className="stat-icon">⏳</div>
<h3>In Progress</h3>
<p>{progress}</p>
</div>

<div className="stat-card resolved">
<div className="stat-icon">✅</div>
<h3>Resolved</h3>
<p>{resolved}</p>
</div>

</div>

<div className="dashboard-grid">

<div className="chart-section">

<h3>Recent Complaints</h3>

{complaints.length === 0 && (
<p style={{fontSize:"14px",marginTop:"10px"}}>
No complaints submitted yet
</p>
)}

{complaints.slice(0,5).map(c => (

<div key={c.id} className="activity-item">

<div className="activity-dot"></div>

<div>

<b>{c.category}</b>

<p style={{fontSize:"13px"}}>

Status: {c.statusType}

{c.assignedStaffName && (
<span style={{marginLeft:"6px"}}>
→ {c.assignedStaffName}
</span>
)}

</p>

</div>

</div>

))}

</div>

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
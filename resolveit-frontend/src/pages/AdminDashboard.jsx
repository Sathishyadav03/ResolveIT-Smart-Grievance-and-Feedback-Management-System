import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ComplaintChart from "../components/ComplaintChart"
import api from "../services/api"

export default function AdminDashboard(){

const [complaints,setComplaints] = useState([])

useEffect(()=>{
loadComplaints()
},[])

/* LOAD COMPLAINTS */

const loadComplaints = async () => {

try{

const res = await api.get("/complaints/all")
setComplaints(res.data)

}catch(err){
console.log(err)
}

}

/* DOWNLOAD CSV REPORT */

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

console.log("Report download failed",err)

}

}

/* STATS */

const total = complaints.length
const open = complaints.filter(c => c.statusType === "OPEN").length
const assigned = complaints.filter(c => c.statusType === "ASSIGNED").length
const resolved = complaints.filter(c => c.statusType === "RESOLVED").length

const chartData = [
{ name:"OPEN", value:open },
{ name:"ASSIGNED", value:assigned },
{ name:"RESOLVED", value:resolved }
]

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="ADMIN"/>

<div className="content">

<h1 className="page-title">Admin Dashboard</h1>

{/* DOWNLOAD REPORT BUTTON */}

<div style={{marginBottom:"20px"}}>

<button
onClick={downloadReport}
style={{
background:"#2563eb",
color:"white",
padding:"8px 16px",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}}
>
Download Complaints Report
</button>

</div>

{/* STAT CARDS */}

<div className="stats-grid">

<div className="stat-card">
<h3>Total Complaints</h3>
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

<div className="stat-card resolved">
<h3>Resolved</h3>
<p>{resolved}</p>
</div>

</div>

{/* DASHBOARD GRID */}

<div className="dashboard-grid">

{/* STATUS ANALYTICS */}

<div className="chart-section">

<h2 style={{marginBottom:"20px"}}>Status Analytics</h2>

<ComplaintChart data={chartData}/>

</div>

{/* RECENT COMPLAINTS */}

<div className="activity-panel">

<h3>Recent Complaints</h3>

{complaints.length === 0 ? (

<p style={{color:"#64748b",fontSize:"14px"}}>
No complaints yet
</p>

):(complaints.slice(0,5).map(c => (

<div key={c.id} className="activity-item">

<div className="activity-dot"></div>

<div>

<strong>#{c.id} {c.category}</strong>

<div style={{fontSize:"12px",color:"#64748b"}}>

{c.urgency === "HIGH" && "🔴 "}
{c.urgency === "MEDIUM" && "🟡 "}
{c.urgency === "LOW" && "🟢 "}

{c.statusType}

</div>

</div>

</div>

)))}

</div>

</div>

</div>

</div>

</div>

)

}
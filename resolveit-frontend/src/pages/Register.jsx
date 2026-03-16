
import { useEffect,useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"
import { Pie } from "react-chartjs-2"

export default function Reports(){

const [complaints,setComplaints] = useState([])

useEffect(()=>{
loadComplaints()
},[])

const loadComplaints = async ()=>{

const res = await api.get("/complaints/all")

setComplaints(res.data)

}

/* CALCULATE STATS */

const total = complaints.length
const open = complaints.filter(c=>c.statusType==="OPEN").length
const assigned = complaints.filter(c=>c.statusType==="ASSIGNED").length
const resolved = complaints.filter(c=>c.statusType==="RESOLVED").length

const data={
labels:["OPEN","ASSIGNED","RESOLVED"],
datasets:[
{
data:[open,assigned,resolved],
backgroundColor:["#3b82f6","#f59e0b","#10b981"]
}
]
}

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="ADMIN"/>

<div className="content">

<h1 className="page-title">Reports & Analytics</h1>

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

{/* PIE CHART */}

<div className="chart-section">

<Pie data={data}/>

</div>

</div>

</div>

</div>

)

}


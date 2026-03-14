import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import ComplaintCard from "../components/ComplaintCard"
import ComplaintChart from "../components/ComplaintChart"
import api from "../services/api"
import { FaFolderOpen, FaSpinner, FaCheckCircle } from "react-icons/fa"

export default function AdminDashboard(){

const [complaints,setComplaints] = useState([])
const [staffInputs,setStaffInputs] = useState({})

useEffect(()=>{

loadComplaints()

},[])

/* LOAD COMPLAINTS */

const loadComplaints = async ()=>{

try{

const res = await api.get("/complaints/all")

setComplaints(res.data)

}catch(err){

console.log("Failed to load complaints",err)

}

}

/* HANDLE STAFF INPUT */

const handleStaffChange = (complaintId,value) =>{

setStaffInputs({

...staffInputs,

[complaintId]:value

})

}

/* ASSIGN STAFF */

const assignComplaint = async (complaintId)=>{

const staffId = staffInputs[complaintId]

if(!staffId){

alert("Enter Staff ID")

return

}

try{

await api.post(`/complaints/assign?complaintId=${complaintId}&staffId=${staffId}`)

alert("Staff Assigned Successfully")

loadComplaints()

}catch(err){

console.log(err)

alert("Failed to assign staff")

}

}


/* STATISTICS */

const openCount = complaints.filter(
c => c.statusType === "OPEN"
).length

const progressCount = complaints.filter(
c => c.statusType === "IN_PROGRESS" || c.statusType === "ASSIGNED"
).length

const resolvedCount = complaints.filter(
c => c.statusType === "RESOLVED"
).length


const chartData = [

{ name:"OPEN", value:openCount },
{ name:"IN_PROGRESS", value:progressCount },
{ name:"RESOLVED", value:resolvedCount }

]

/* RECENT ACTIVITY */

const recentActivity = complaints.slice(0,5)


return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="ADMIN"/>

<div className="content">

<h1 className="page-title">Admin Dashboard</h1>


{/* STATISTICS */}

<div className="stats-grid">

<div className="stat-card open">

<div className="stat-icon">
<FaFolderOpen/>
</div>

<h3>Total Complaints</h3>

<p>{complaints.length}</p>

</div>


<div className="stat-card progress">

<div className="stat-icon">
<FaSpinner/>
</div>

<h3>In Progress</h3>

<p>{progressCount}</p>

</div>


<div className="stat-card resolved">

<div className="stat-icon">
<FaCheckCircle/>
</div>

<h3>Resolved</h3>

<p>{resolvedCount}</p>

</div>

</div>


{/* ANALYTICS + ACTIVITY */}

<div className="dashboard-grid">

<div className="chart-section">

<h2>Complaint Analytics</h2>

<ComplaintChart data={chartData}/>

</div>


<div className="activity-panel">

<h2>Recent Activity</h2>

{recentActivity.map(c => (

<div key={c.id} className="activity-item">

<div className="activity-dot"></div>

<div>

<b>Complaint #{c.id}</b>

<p>{c.category}</p>

<small>Status: {c.statusType}</small>

</div>

</div>

))}

</div>

</div>


{/* COMPLAINT LIST */}

<h2 style={{marginTop:"30px"}}>All Complaints</h2>

{complaints.map(c =>(

<div key={c.id}>

<ComplaintCard complaint={c}/>

<div className="assign-container">

<input
type="number"
placeholder="Enter Staff ID"
value={staffInputs[c.id] || ""}
onChange={(e)=>handleStaffChange(c.id,e.target.value)}
/>

<button
className="assign-btn"
onClick={()=>assignComplaint(c.id)}
>

Assign Staff

</button>

</div>

</div>

))}

</div>

</div>

</div>

)

}
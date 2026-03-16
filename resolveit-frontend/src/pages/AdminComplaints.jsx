import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function AdminComplaints(){

const [complaints,setComplaints] = useState([])
const [staff,setStaff] = useState([])
const [selectedStaff,setSelectedStaff] = useState({})
const [search,setSearch] = useState("")

useEffect(()=>{
loadComplaints()
loadStaff()
},[])

/* LOAD COMPLAINTS */

const loadComplaints = async ()=>{

try{

const res = await api.get("/complaints/all")
setComplaints(res.data)

}catch(err){

console.log("Error loading complaints",err)

}

}

/* LOAD STAFF */

const loadStaff = async ()=>{

try{

const res = await api.get("/users/staff")
setStaff(res.data)

}catch(err){

console.log("Error loading staff",err)

}

}

/* HANDLE STAFF SELECT */

const handleStaffChange = (complaintId,value)=>{

setSelectedStaff(prev => ({
...prev,
[complaintId]:value
}))

}

/* ASSIGN STAFF */

const assignStaff = async (complaintId)=>{

const staffId = selectedStaff[complaintId]

if(!staffId){
alert("Please select staff")
return
}

try{

await api.post("/complaints/assign",null,{
params:{complaintId,staffId}
})

loadComplaints()

setSelectedStaff(prev => ({
...prev,
[complaintId]:""
}))

}catch(err){

console.log("Assignment failed",err)

}

}

/* ESCALATE COMPLAINT */

const escalateComplaint = async (complaintId)=>{

if(!window.confirm("Escalate this complaint?")) return

try{

await api.put(`/complaints/escalate/${complaintId}`)

loadComplaints()

}catch(err){

console.log("Escalation failed",err)

}

}

/* FILTER COMPLAINTS */

const filteredComplaints = complaints.filter(c =>
c.category?.toLowerCase().includes(search.toLowerCase()) ||
c.description?.toLowerCase().includes(search.toLowerCase()) ||
c.statusType?.toLowerCase().includes(search.toLowerCase())
)

/* GROUP COMPLAINTS */

const unassignedComplaints = filteredComplaints.filter(
c => !c.assignedStaffId
)

const assignedComplaints = filteredComplaints.filter(
c => c.assignedStaffId
)

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="ADMIN"/>

<div className="content">

{/* PAGE HEADER */}

<div className="page-header">

<div>

<h1 className="page-title">All Complaints</h1>

<p className="page-subtitle">
Manage and monitor all submitted complaints
</p>

</div>

<div className="complaint-count">
Total: {complaints.length}
</div>

</div>

{/* SEARCH */}

<input
className="search-box"
placeholder="Search complaints..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="complaints-section">

{/* UNASSIGNED COMPLAINTS */}

{unassignedComplaints.length > 0 && (

<>

<h2 style={{marginTop:"10px",marginBottom:"10px"}}>
🔴 Unassigned Complaints
</h2>

{unassignedComplaints.map(c => (

<div key={c.id} className="complaint-card">

<div style={{flex:1}}>

<h3>#{c.id} {c.category}</h3>

<p>{c.description}</p>

<p>

<span className={`urgency ${c.urgency}`}>
{c.urgency === "HIGH" && "🔴 "}
{c.urgency === "MEDIUM" && "🟡 "}
{c.urgency === "LOW" && "🟢 "}
{c.urgency}
</span>

<span className={`status ${c.statusType}`} style={{marginLeft:"10px"}}>
{c.statusType}
</span>

</p>

<p style={{fontSize:"12px",color:"#64748b"}}>
Created: {c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
</p>

</div>

<div className="assign-container">

<select
value={selectedStaff[c.id] || ""}
onChange={(e)=>handleStaffChange(c.id,e.target.value)}
>

<option value="">Select Staff</option>

{staff.map(s => (

<option key={s.id} value={s.id}>
{s.name}
</option>

))}

</select>

<button onClick={()=>assignStaff(c.id)}>
Assign
</button>

</div>

</div>

))}

</>

)}

{/* ASSIGNED COMPLAINTS */}

{assignedComplaints.length > 0 && (

<>

<h2 style={{marginTop:"30px",marginBottom:"10px"}}>
👨‍🔧 Assigned Complaints
</h2>

{assignedComplaints.map(c => (

<div key={c.id} className="complaint-card">

<div style={{flex:1}}>

<h3>#{c.id} {c.category}</h3>

<p>{c.description}</p>

<p>

<span className={`urgency ${c.urgency}`}>
{c.urgency === "HIGH" && "🔴 "}
{c.urgency === "MEDIUM" && "🟡 "}
{c.urgency === "LOW" && "🟢 "}
{c.urgency}
</span>

<span className={`status ${c.statusType}`} style={{marginLeft:"10px"}}>
{c.statusType}
</span>

</p>

<p className="staff-info">
👨‍💼 Assigned to {c.assignedStaffName}
</p>

<p style={{fontSize:"12px",color:"#64748b"}}>
Created: {c.createdAt ? new Date(c.createdAt).toLocaleString() : "-"}
</p>

</div>

{c.statusType !== "RESOLVED" && (

<button
onClick={()=>escalateComplaint(c.id)}
style={{
marginTop:"8px",
background:"#ef4444",
color:"white",
border:"none",
padding:"6px 12px",
borderRadius:"6px",
cursor:"pointer"
}}
>
Escalate
</button>

)}

</div>

))}

</>

)}

{filteredComplaints.length === 0 && (

<div className="empty-state">
No complaints found
</div>

)}

</div>

</div>

</div>

</div>

)

}
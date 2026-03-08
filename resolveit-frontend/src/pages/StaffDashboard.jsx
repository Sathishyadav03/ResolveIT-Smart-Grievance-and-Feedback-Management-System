import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"
import "../styles/dashboard.css"

export default function StaffDashboard(){

const [complaints,setComplaints] = useState([])

useEffect(()=>{

api.get("/complaints/all")
.then(res => setComplaints(res.data))
.catch(err => console.log(err))

},[])


const updateStatus = async(id,status)=>{

try{

await api.post(`/complaints/update-status?complaintId=${id}&status=${status}`)

alert("Status Updated")

window.location.reload()

}catch(err){

alert("Error updating status")

}

}


return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="STAFF"/>

<div className="content">

<h1>Staff Dashboard</h1>

<h2>Assigned Complaints</h2>

<table className="table">

<thead>

<tr>
<th>ID</th>
<th>Category</th>
<th>Description</th>
<th>Urgency</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{complaints.map(c => (

<tr key={c.id}>

<td>{c.id}</td>
<td>{c.category}</td>
<td>{c.description}</td>
<td>{c.urgency}</td>
<td>{c.status}</td>

<td>

<select
onChange={(e)=>updateStatus(c.id,e.target.value)}
>

<option value="">Update</option>
<option value="IN_PROGRESS">In Progress</option>
<option value="RESOLVED">Resolved</option>

</select>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}
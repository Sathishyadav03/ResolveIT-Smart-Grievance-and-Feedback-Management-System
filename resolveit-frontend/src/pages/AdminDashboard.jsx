import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"
import "../styles/dashboard.css"

export default function AdminDashboard(){

const [complaints,setComplaints] = useState([])
const [staffId,setStaffId] = useState("")

useEffect(()=>{

api.get("/complaints/all")
.then(res => setComplaints(res.data))
.catch(err => console.log(err))

},[])


const assignComplaint = async(id)=>{

if(!staffId){
alert("Enter Staff ID")
return
}

try{

await api.post(`/complaints/assign?complaintId=${id}&staffId=${staffId}`)

alert("Complaint Assigned")

window.location.reload()

}catch(err){

alert("Assignment Failed")

}

}

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="ADMIN"/>

<div className="content">

<h1>Admin Dashboard</h1>

<h2>All Complaints</h2>

<table className="table">

<thead>

<tr>
<th>ID</th>
<th>Category</th>
<th>Description</th>
<th>Urgency</th>
<th>Status</th>
<th>Assign Staff</th>
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

<input
type="number"
placeholder="Staff ID"
onChange={(e)=>setStaffId(e.target.value)}
/>

<button
className="assign-btn"
onClick={()=>assignComplaint(c.id)}
>

Assign

</button>

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
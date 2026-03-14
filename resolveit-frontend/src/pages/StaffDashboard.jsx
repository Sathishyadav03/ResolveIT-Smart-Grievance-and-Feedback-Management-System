import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function StaffDashboard(){

const [complaints,setComplaints] = useState([])

const navigate = useNavigate()

useEffect(()=>{
loadComplaints()
},[])

const loadComplaints = async () => {

try{

const res = await api.get("/complaints/staff")

setComplaints(res.data)

}catch(err){

console.log("Failed to load complaints",err)

}

}

const updateStatus = async (id,status) => {

try{

await api.put(`/complaints/update-status/${id}?status=${status}`)

loadComplaints()

}catch(err){

console.log(err)

}

}

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="STAFF"/>

<div className="content">

<h1 className="page-title">Staff Dashboard</h1>

<div className="table-container">

<table className="table">

<thead>

<tr>

<th>ID</th>
<th>Category</th>
<th>Description</th>
<th>Urgency</th>
<th>Status</th>
<th>Update</th>
<th>View</th>

</tr>

</thead>

<tbody>

{complaints.length === 0 && (

<tr>
<td colSpan="7" style={{textAlign:"center"}}>
No assigned complaints
</td>
</tr>

)}

{complaints.map(c => (

<tr key={c.id}>

<td>{c.id}</td>

<td>{c.category}</td>

<td>{c.description}</td>

<td>

<span className={`priority ${c.urgency}`}>
{c.urgency}
</span>

</td>

<td>

<span className="status-badge">
{c.statusType}
</span>

</td>

<td>

<select
onChange={(e)=>updateStatus(c.id,e.target.value)}
defaultValue=""
>

<option value="" disabled>
Update
</option>

<option value="IN_PROGRESS">
In Progress
</option>

<option value="RESOLVED">
Resolved
</option>

</select>

</td>

<td>

<button
className="assign-btn"
onClick={()=>navigate(`/complaint/${c.id}`)}
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
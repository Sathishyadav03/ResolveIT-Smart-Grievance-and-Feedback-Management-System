import { useEffect,useState } from "react"
import api from "../services/api"
import "../styles/dashboard.css"

export default function ComplaintStatus(){

const [complaints,setComplaints]=useState([])

useEffect(()=>{

api.get("/complaints/all")
.then(res=>setComplaints(res.data))

},[])

return(

<div>

<h2>Complaint Status</h2>

<table className="table">

<thead>

<tr>
<th>ID</th>
<th>Category</th>
<th>Status</th>
<th>Urgency</th>
</tr>

</thead>

<tbody>

{complaints.map(c=>(
<tr key={c.id}>
<td>{c.id}</td>
<td>{c.category}</td>
<td>{c.status}</td>
<td>{c.urgency}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}
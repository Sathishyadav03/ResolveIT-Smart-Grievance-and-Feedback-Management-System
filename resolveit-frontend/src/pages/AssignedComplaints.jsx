import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function AssignedComplaints(){

const [complaints,setComplaints] = useState([])

const navigate = useNavigate()

useEffect(()=>{
loadComplaints()
},[])

const loadComplaints = async () => {

try{

const res = await api.get("/complaints/staff")

const assigned = res.data.filter(
c => c.statusType !== "RESOLVED"
)

setComplaints(assigned)

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

<h1 className="page-title">Assigned Complaints</h1>

<div className="table-container">

<table className="table">

<thead>

<tr>

<th>ID</th>
<th>Category</th>
<th>Description</th>
<th>Urgency</th>
<th>Status</th>
<th>View</th>

</tr>

</thead>

<tbody>

{complaints.length === 0 && (

<tr>
<td colSpan="6" style={{textAlign:"center"}}>
No Assigned Complaints
</td>
</tr>

)}

{complaints.map(c => (

<tr key={c.id}>

<td>{c.id}</td>

<td>{c.category}</td>

<td>{c.description}</td>

<td>
<span className={`urgency ${c.urgency}`}>
{c.urgency}
</span>
</td>

<td>
<span className={`status ${c.statusType}`}>
{c.statusType}
</span>
</td>

<td>

<button
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
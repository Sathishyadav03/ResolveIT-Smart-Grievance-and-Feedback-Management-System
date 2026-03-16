import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import api from "../services/api"

export default function StaffManagement(){

const [staff,setStaff] = useState([])
const [search,setSearch] = useState("")
const [selectedStaff,setSelectedStaff] = useState(null)

useEffect(()=>{
loadStaff()
},[])

/* LOAD STAFF */

const loadStaff = async ()=>{

try{

const res = await api.get("/users/staff")
setStaff(res.data)

}catch(err){

console.log("Error loading staff",err)

}

}

/* DELETE STAFF */

const deleteStaff = async (id)=>{

if(!window.confirm("Delete this staff member?")) return

try{

await api.delete(`/users/${id}`)

loadStaff()

}catch(err){

console.log(err)

}

}

/* VIEW STAFF */

const viewStaff = (staffMember)=>{

setSelectedStaff(staffMember)

}

/* FILTER STAFF */

const filteredStaff = staff.filter(s =>
s.name?.toLowerCase().includes(search.toLowerCase())
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
<h1 className="page-title">Staff Management</h1>
<p className="page-subtitle">
Manage all system staff members
</p>
</div>

<div className="complaint-count">
Total Staff: {staff.length}
</div>

</div>


{/* SEARCH */}

<input
className="search-box"
placeholder="Search staff by name..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>


{/* TABLE */}

<div className="table-container">

<table className="table">

<thead>

<tr>

<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>View</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{filteredStaff.length === 0 ?(

<tr>
<td colSpan="6" style={{textAlign:"center",padding:"20px"}}>
No staff found
</td>
</tr>

):(filteredStaff.map(s =>(

<tr key={s.id}>

<td>{s.id}</td>
<td>{s.name}</td>
<td>{s.email}</td>

<td>
<span className="role-badge">
{s.role}
</span>
</td>

<td>

<button
onClick={()=>viewStaff(s)}
style={{marginRight:"8px"}}
>
View
</button>

</td>

<td>

<button
className="delete-btn"
onClick={()=>deleteStaff(s.id)}
>

Delete

</button>

</td>

</tr>

)))}

</tbody>

</table>

</div>

{/* STAFF DETAILS MODAL */}

{selectedStaff && (

<div className="modal">

<div className="modal-content">

<h3>Staff Details</h3>

<p><b>ID:</b> {selectedStaff.id}</p>
<p><b>Name:</b> {selectedStaff.name}</p>
<p><b>Email:</b> {selectedStaff.email}</p>
<p><b>Role:</b> {selectedStaff.role}</p>

<button
onClick={()=>setSelectedStaff(null)}
style={{marginTop:"10px"}}
>
Close
</button>

</div>

</div>

)}

</div>

</div>

</div>

)

}
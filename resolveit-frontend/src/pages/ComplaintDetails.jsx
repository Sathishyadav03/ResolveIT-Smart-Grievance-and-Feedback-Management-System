import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Timeline from "../components/Timeline"
import StatusTracker from "../components/StatusTracker"
import api from "../services/api"

export default function ComplaintDetails(){

const { id } = useParams()

const [complaint,setComplaint] = useState(null)
const [comments,setComments] = useState([])
const [description,setDescription] = useState("")
const [status,setStatus] = useState("")

useEffect(()=>{
loadComplaint()
loadComments()
},[id])

useEffect(()=>{
if(complaint){
setStatus(complaint.statusType)
}
},[complaint])

const loadComplaint = async () => {

try{

const res = await api.get(`/complaints/${id}`)
setComplaint(res.data)

}catch(err){
console.log("Failed to load complaint",err)
}

}

const loadComments = async () => {

try{

const res = await api.get(`/comments/${id}`)
setComments(res.data)

}catch(err){
console.log("Failed to load comments",err)
}

}

const addUpdate = async () => {

if(!status || !description){
alert("Please fill all fields")
return
}

try{

await api.post("/comments/add",{
complaintsId: id,
description: description,
statusType: status
})

alert("Update Added Successfully")

setDescription("")

await loadComments()
await loadComplaint()

}catch(err){

console.log(err)
alert("Failed to add update")

}

}

if(!complaint){
return <p style={{padding:"40px"}}>Loading complaint...</p>
}

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="STAFF"/>

<div className="content">

<h2 className="page-title">Complaint Details</h2>

{/* COMPLAINT HEADER */}

<div className="complaint-details-card">

<div className="complaint-header">

<div>

<h3>{complaint.category}</h3>
<p>{complaint.description}</p>

</div>

<div className="complaint-meta">

<span className={`status ${complaint.statusType}`}>
{complaint.statusType}
</span>

<span className={`urgency ${complaint.urgency}`}>
{complaint.urgency}
</span>

<span className="created-date">
{new Date(complaint.createdAt).toLocaleDateString()}
</span>

</div>

</div>

{complaint.attachment && (

<div className="attachment-box">

<b>Attachment:</b>

<a
href={`http://localhost:8080/uploads/${complaint.attachment}`}
target="_blank"
rel="noreferrer"
>

View Attachment

</a>

</div>

)}

</div>

{/* STATUS TRACKER */}

<StatusTracker status={complaint.statusType}/>

{/* TIMELINE */}

<Timeline comments={comments}/>

{/* UPDATE SECTION */}

<div className="updates-layout">

<div className="updates-history">

<h3>Complaint Updates</h3>

{comments.length === 0 ? (

<p className="empty-updates">
No updates yet
</p>

):(comments.map(c => (

<div key={c.commentId} className="update-card">

<div className="update-status">
{c.statusType}
</div>

<p>{c.description}</p>

<span>{c.date}</span>

</div>

)))}

</div>

{/* ADD UPDATE FORM */}

<div className="form-container">

<h3>Add Update</h3>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="">Select Status</option>

<option value="IN_PROGRESS">
In Progress
</option>

<option value="RESOLVED">
Resolved
</option>

</select>

<textarea
placeholder="Write update..."
value={description}
onChange={(e)=>setDescription(e.target.value)}
></textarea>

<button onClick={addUpdate}>
Add Update
</button>

</div>

</div>

</div>

</div>

</div>

)

}
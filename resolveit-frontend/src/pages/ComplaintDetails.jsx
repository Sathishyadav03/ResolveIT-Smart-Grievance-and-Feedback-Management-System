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


const addUpdate = async ()=>{

if(!status || !description){

alert("Please fill all fields")

return

}

try{

await api.post("/comments/add",{

complaintsId:id,
description:description,
statusType:status

})

alert("Update Added Successfully")

setDescription("")
setStatus("")

loadComments()

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

<h2>Complaint Details</h2>

<div className="complaint-card">

<h3>{complaint.category}</h3>

<p>{complaint.description}</p>

{complaint.attachment && (

<div style={{marginTop:"10px"}}>

<b>Attachment:</b>

<br/>

<a
href={`http://localhost:8080/uploads/${complaint.attachment}`}
target="_blank"
rel="noreferrer"
>

View Attachment

</a>

</div>

)}

<p><b>Status:</b> {complaint.statusType}</p>

<p><b>Urgency:</b> {complaint.urgency}</p>

<p><b>Created At:</b> {new Date(complaint.createdAt).toLocaleDateString()}</p>

</div>

<StatusTracker status={complaint.statusType}/>

<Timeline comments={comments}/>

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

)

}
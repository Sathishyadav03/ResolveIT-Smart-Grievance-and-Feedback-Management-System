import { useEffect,useState } from "react"
import api from "../services/api"
import ComplaintCard from "../components/ComplaintCard"
import Timeline from "../components/Timeline"
import StatusTracker from "../components/StatusTracker"

export default function ComplaintStatus(){

const [complaints,setComplaints] = useState([])
const [selectedComplaint,setSelectedComplaint] = useState(null)
const [comments,setComments] = useState([])

useEffect(()=>{
loadComplaints()
},[])

const loadComplaints = async ()=>{

try{

const res = await api.get("/complaints/my")

setComplaints(res.data)

}catch(err){

console.log(err)

}

}

const openComplaint = async (complaint)=>{

setSelectedComplaint(complaint)

try{

const res = await api.get(`/comments/${complaint.id}`)

setComments(res.data)

}catch(err){

console.log(err)

}

}

return(

<div>

<h2 style={{marginBottom:"20px"}}>Complaint Status</h2>

<div className="complaints-list">

{complaints.map(c => (

<ComplaintCard
key={c.id}
complaint={c}
onClick={()=>openComplaint(c)}
/>

))}

</div>

{selectedComplaint && (

<div style={{marginTop:"40px"}}>

<h3>Complaint #{selectedComplaint.id}</h3>

<p><b>Category:</b> {selectedComplaint.category}</p>

<p><b>Description:</b> {selectedComplaint.description}</p>

<p>

<b>Status:</b> {selectedComplaint.statusType}

{selectedComplaint.assignedStaffName && (
<span style={{marginLeft:"6px"}}>
→ {selectedComplaint.assignedStaffName}
</span>
)}

</p>

<StatusTracker status={selectedComplaint.statusType}/>

<Timeline comments={comments}/>

</div>

)}

</div>

)

}
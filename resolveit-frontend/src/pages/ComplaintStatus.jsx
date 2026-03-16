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

/* LOAD USER COMPLAINTS */

const loadComplaints = async ()=>{

try{

const res = await api.get("/complaints/my")
setComplaints(res.data)

}catch(err){

console.log(err)

}

}

/* OPEN COMPLAINT DETAILS */

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

{/* COMPLAINT LIST */}

<div className="complaints-section">

{complaints.length === 0 ?(

<div className="empty-state">
No complaints submitted yet
</div>

):(complaints.map(c => (

<ComplaintCard
key={c.id}
complaint={c}
onClick={()=>openComplaint(c)}
/>

)))}

</div>

{/* SELECTED COMPLAINT DETAILS */}

{selectedComplaint && (

<div className="complaint-details-card">

{/* HEADER */}

<div className="complaint-header">

<div>

<h3>#{selectedComplaint.id} {selectedComplaint.category}</h3>

<p>{selectedComplaint.description}</p>

</div>

<div className="complaint-meta">

<span className={`urgency ${selectedComplaint.urgency}`}>

{selectedComplaint.urgency === "HIGH" && "🔴 "}
{selectedComplaint.urgency === "MEDIUM" && "🟡 "}
{selectedComplaint.urgency === "LOW" && "🟢 "}

{selectedComplaint.urgency}

</span>

<span className={`status ${selectedComplaint.statusType}`}>
{selectedComplaint.statusType}
</span>

</div>

</div>

{/* STAFF ASSIGNMENT */}

<p style={{marginTop:"10px"}}>

<b>Status:</b> {selectedComplaint.statusType}

{selectedComplaint.assignedStaffName && (
<span style={{marginLeft:"8px"}}>
→ 👨‍💼 {selectedComplaint.assignedStaffName}
</span>
)}

</p>

{/* ATTACHMENT */}

{selectedComplaint.attachment && (

<div style={{marginTop:"10px"}}>

<b>Attachment:</b>

<a
href={`http://localhost:8080/uploads/${selectedComplaint.attachment}`}
target="_blank"
rel="noreferrer"
style={{marginLeft:"8px"}}
>

View File

</a>

</div>

)}

{/* STATUS TRACKER */}

<StatusTracker status={selectedComplaint.statusType}/>

{/* TIMELINE */}

<Timeline comments={comments}/>

{/* UPDATES */}

<div className="updates-history">

<h3>Complaint Updates</h3>

{comments.length === 0 ?(

<p style={{color:"#64748b"}}>No updates yet</p>

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

</div>

)}

</div>

)

}
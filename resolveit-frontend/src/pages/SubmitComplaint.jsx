import { useState } from "react"
import api from "../services/api"
import "../styles/form.css"

export default function SubmitComplaint(){

const [category,setCategory]=useState("")
const [description,setDescription]=useState("")
const [urgency,setUrgency]=useState("LOW")
const [anonymous,setAnonymous]=useState(false)

const handleSubmit = async(e)=>{

e.preventDefault()

try{

const token = localStorage.getItem("token")
const payload = JSON.parse(atob(token.split(".")[1]))

const userId = payload.sub

await api.post(`/complaints/submit?userId=${userId}`,{

category,
description,
urgency,
anonymous

})

alert("Complaint Submitted Successfully")

}catch(err){

alert("Error submitting complaint")

}

}

return(

<div className="form-container">

<h2>Submit Complaint</h2>

<form onSubmit={handleSubmit}>

<label>Complaint Type</label>

<select onChange={(e)=>setAnonymous(e.target.value==="ANONYMOUS")}>

<option value="PUBLIC">Public</option>
<option value="ANONYMOUS">Anonymous</option>

</select>

<input
placeholder="Category"
onChange={(e)=>setCategory(e.target.value)}
required
/>

<select onChange={(e)=>setUrgency(e.target.value)}>

<option value="LOW">Low</option>
<option value="MEDIUM">Medium</option>
<option value="HIGH">High</option>

</select>

<textarea
placeholder="Describe complaint"
onChange={(e)=>setDescription(e.target.value)}
required
/>

<button type="submit">Submit</button>

</form>

</div>

)

}
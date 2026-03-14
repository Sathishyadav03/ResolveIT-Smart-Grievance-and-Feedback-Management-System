import { useState } from "react"
import api from "../services/api"

export default function SubmitComplaint(){

const [category,setCategory] = useState("")
const [description,setDescription] = useState("")
const [urgency,setUrgency] = useState("LOW")
const [anonymous,setAnonymous] = useState("false")
const [file,setFile] = useState(null)

const handleSubmit = async (e) => {

e.preventDefault()

try{

const formData = new FormData()

formData.append("category",category)
formData.append("description",description)
formData.append("urgency",urgency)
formData.append("anonymous",anonymous)

if(file){
formData.append("file",file)
}

await api.post("/complaints/submit",formData)

alert("Complaint submitted successfully")

setCategory("")
setDescription("")
setUrgency("LOW")
setAnonymous("false")
setFile(null)

}catch(err){

console.log(err)
alert("Failed to submit complaint")

}

}

return(

<div className="content">

<h1 className="page-title">Submit Complaint</h1>

<div className="form-container">

<form onSubmit={handleSubmit}>

<label>Category</label>

<textarea
rows="3"
placeholder="Enter complaint category..."
value={category}
onChange={(e)=>setCategory(e.target.value)}
required
/>

<label>Description</label>

<textarea
rows="4"
placeholder="Describe your complaint..."
value={description}
onChange={(e)=>setDescription(e.target.value)}
required
/>

<label>Urgency</label>

<select
value={urgency}
onChange={(e)=>setUrgency(e.target.value)}
>

<option value="LOW">Low</option>
<option value="MEDIUM">Medium</option>
<option value="HIGH">High</option>

</select>

<label>Attachment</label>

<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
/>

<label>Visibility</label>

<select
value={anonymous}
onChange={(e)=>setAnonymous(e.target.value)}
>

<option value="false">Public</option>
<option value="true">Anonymous</option>

</select>

<button type="submit">
Submit Complaint
</button>

</form>

</div>

</div>

)

}
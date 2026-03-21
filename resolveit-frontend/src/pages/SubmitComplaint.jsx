import { useState } from "react"
import api from "../services/api"
import { motion } from "framer-motion"

export default function SubmitComplaint(){

const [category,setCategory] = useState("")
const [description,setDescription] = useState("")
const [urgency,setUrgency] = useState("LOW")
const [anonymous,setAnonymous] = useState("false")
const [file,setFile] = useState(null)

const [loading,setLoading] = useState(false)
const [success,setSuccess] = useState(false)

const handleSubmit = async (e) => {

  e.preventDefault()
  setLoading(true)

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

    setSuccess(true)

    setCategory("")
    setDescription("")
    setUrgency("LOW")
    setAnonymous("false")
    setFile(null)

    setTimeout(()=>setSuccess(false),3000)

  }catch(err){
    alert("❌ Failed to submit complaint")
  }

  setLoading(false)
}

return(

<div className="content ultra-bg full-width-page">

{/* TITLE */}
<motion.h1 
  className="page-title big-title"
  initial={{opacity:0,y:-20}}
  animate={{opacity:1,y:0}}
>
  🚀 Submit Your Complaint
</motion.h1>

{/* FORM */}
<motion.div 
  className="form-container ultra-form improved-form full-width-card"
  initial={{opacity:0,y:30}}
  animate={{opacity:1,y:0}}
>

  {/* SUCCESS */}
  {success && (
    <div className="success-box">
      ✅ Complaint submitted successfully!
    </div>
  )}

  <form onSubmit={handleSubmit}>

    {/* CATEGORY */}
    <div className="form-group">
      <label>📂 Category</label>
      <textarea
        rows="2"
        placeholder="e.g. Water issue, Road damage..."
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        required
      />
    </div>

    {/* DESCRIPTION */}
    <div className="form-group">
      <label>📝 Description</label>
      <textarea
        rows="4"
        placeholder="Describe the issue clearly with details..."
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        required
      />
    </div>

    {/* OPTIONS */}
    <div className="form-row modern-row">

      <div className="form-group">
        <label>⚡ Urgency Level</label>
        <select value={urgency} onChange={(e)=>setUrgency(e.target.value)}>
          <option value="LOW">🟢 Low</option>
          <option value="MEDIUM">🟡 Medium</option>
          <option value="HIGH">🔴 High</option>
        </select>
      </div>

      <div className="form-group">
        <label>👁 Visibility</label>
        <select value={anonymous} onChange={(e)=>setAnonymous(e.target.value)}>
          <option value="false">Public</option>
          <option value="true">Anonymous</option>
        </select>
      </div>

    </div>

    {/* FILE */}
    <div className="form-group">
      <label>📎 Attachment (Optional)</label>

      <label className="file-upload modern-upload">
        <input 
          type="file" 
          onChange={(e)=>setFile(e.target.files[0])}
        />
        <span>
          {file ? `📄 ${file.name}` : "Click to upload file"}
        </span>
      </label>
    </div>

    {/* BUTTON */}
    <button 
      type="submit" 
      className="submit-btn glow-btn modern-btn"
      disabled={loading}
    >
      {loading ? "⏳ Submitting..." : "🚀 Submit Complaint"}
    </button>

  </form>

</motion.div>

{/* 🔥 SMART TIPS */}
<motion.div 
  className="tips-wrapper full-width-card"
  initial={{opacity:0,y:30}}
  animate={{opacity:1,y:0}}
>

  <h3 className="tips-heading">💡 Smart Tips</h3>

  <div className="tips-grid full-width-grid">

    <div className="tip-card blue">
      <span>📝</span>
      <div>
        <h4>Clear Description</h4>
        <p>Explain your issue in detail for faster resolution</p>
      </div>
    </div>

    <div className="tip-card purple">
      <span>📍</span>
      <div>
        <h4>Add Location</h4>
        <p>Mention exact area or address</p>
      </div>
    </div>

    <div className="tip-card cyan">
      <span>📎</span>
      <div>
        <h4>Attach Proof</h4>
        <p>Upload images or documents if available</p>
      </div>
    </div>

    <div className="tip-card orange">
      <span>⚡</span>
      <div>
        <h4>Select Urgency</h4>
        <p>Choose priority correctly</p>
      </div>
    </div>

  </div>

  <h3 className="tips-heading" style={{marginTop:"25px"}}>
    📌 Guidelines
  </h3>

  <div className="tips-grid full-width-grid">

    <div className="tip-card simple">
      🚫 Avoid duplicate complaints
    </div>

    <div className="tip-card simple">
      🔒 Anonymous complaints remain private
    </div>

    <div className="tip-card simple">
      📊 Track status anytime in dashboard
    </div>

  </div>

</motion.div>

</div>

)
}
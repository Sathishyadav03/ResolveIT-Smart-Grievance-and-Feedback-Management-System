import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Timeline from "../components/Timeline"
import StatusTracker from "../components/StatusTracker"
import api from "../services/api"

export default function ComplaintDetails() {

  const { id } = useParams()

  const [complaint, setComplaint] = useState(null)
  const [comments, setComments] = useState([])
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    loadComplaint()
    loadComments()
  }, [id])

  useEffect(() => {
    if (complaint) {
      setStatus(complaint.statusType)
    }
  }, [complaint])

  const loadComplaint = async () => {
    try {
      const res = await api.get(`/complaints/${id}`)
      setComplaint(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const loadComments = async () => {
    try {
      const res = await api.get(`/comments/${id}`)
      setComments(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const addUpdate = async () => {

    if (!status || !description) {
      alert("Please fill all fields")
      return
    }

    try {
      await api.post("/comments/add", {
        complaintsId: id,
        description,
        statusType: status
      })

      alert("✅ Update Added Successfully")

      setDescription("")
      await loadComments()
      await loadComplaint()

    } catch (err) {
      console.log(err)
      alert("❌ Failed to add update")
    }
  }

  if (!complaint) {
    return <p className="loading">⏳ Loading complaint...</p>
  }

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar role="STAFF" />

        <div className="content">

          {/* 🔥 HEADER */}
          <div className="page-header">
            <div className="page-header-left">

              <h2 className="page-title">
                📄 <span className="gradient-text">Complaint Details</span>
              </h2>

              <p className="page-subtitle">
                Track progress and manage complaint updates efficiently
              </p>

              <div className="complaint-count">
                Complaint ID: #{complaint.id}
              </div>

            </div>
          </div>

          {/* 🔥 MAIN CARD */}
          <div className="complaint-card fade-in">

            <div className="complaint-top">

              <div>
                <h3 className="complaint-title">
                  📂 {complaint.category}
                </h3>

                <p className="complaint-desc">
                  {complaint.description}
                </p>

                {/* 🔥 EXTRA INFO */}
                <p className="complaint-date">
                  📅 Created: {new Date(complaint.createdAt).toLocaleString()}
                </p>

              </div>

              <div className="complaint-meta">

                <span className={`badge status ${complaint.statusType}`}>
                  📌 {complaint.statusType}
                </span>

                <span className={`badge urgency ${complaint.urgency}`}>
                  ⚡ {complaint.urgency}
                </span>

              </div>

            </div>

            {/* 🔥 ATTACHMENT */}
            {complaint.attachment && (
              <div className="attachment-box">
                📎 <b>Attachment:</b>{" "}
                <a
                  href={`http://localhost:8080/uploads/${complaint.attachment}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View File
                </a>
              </div>
            )}

            {/* 🔥 QUICK ACTIONS */}
            <div className="quick-actions">

              <button onClick={() => setStatus("IN_PROGRESS")}>
                🚧 Mark In Progress
              </button>

              <button onClick={() => setStatus("RESOLVED")}>
                ✅ Mark Resolved
              </button>

            </div>

          </div>

          {/* 🔥 STATUS TRACKER */}
          <div className="fade-in delay-1">
            <StatusTracker status={complaint.statusType} />
          </div>

          {/* 🔥 TIMELINE */}
          <div className="fade-in delay-1">
            <Timeline comments={comments} />
          </div>

          {/* 🔥 UPDATE SECTION */}
          <div className="updates-layout">

            {/* HISTORY */}
            <div className="updates-history fade-in">

              <h3>🕒 Complaint Updates</h3>

              {comments.length === 0 ? (
                <p className="empty-updates">
                  🚫 No updates yet
                </p>
              ) : (

                comments.map(c => (

                  <div key={c.commentId} className="update-card">

                    <div className="update-header">
                      <span className="update-status">
                        {c.statusType}
                      </span>

                      <span className="update-date">
                        {new Date(c.date).toLocaleString()}
                      </span>
                    </div>

                    <p>{c.description}</p>

                  </div>

                ))

              )}

            </div>

            {/* FORM */}
            <div className="form-container fade-in delay-1">

              <h3>➕ Add Update</h3>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="IN_PROGRESS">🚧 In Progress</option>
                <option value="ESCALATED">⚠ Escalated</option>
                <option value="RESOLVED">✅ Resolved</option>
              </select>

              <textarea
                placeholder="✍️ Write update..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <button onClick={addUpdate}>
                🚀 Add Update
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
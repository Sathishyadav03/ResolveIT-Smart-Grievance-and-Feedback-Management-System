import { useEffect, useState } from "react"
import api from "../services/api"
import { motion, AnimatePresence } from "framer-motion"
import StatusTracker from "../components/StatusTracker"

export default function ComplaintStatus() {

  const [complaints, setComplaints] = useState([])
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    loadComplaints()
  }, [])

  const loadComplaints = async () => {
    try {
      const res = await api.get("/complaints/my")
      setComplaints(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const openComplaint = async (complaint) => {

    if (selectedComplaint?.id === complaint.id) {
      setSelectedComplaint(null)
      setComments([])
      return
    }

    setSelectedComplaint(complaint)

    try {
      const res = await api.get(`/comments/${complaint.id}`)
      setComments(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  /* 🔥 STATS */
  const total = complaints.length
  const resolved = complaints.filter(c => c.statusType === "RESOLVED").length
  const pending = complaints.filter(c => c.statusType !== "RESOLVED").length
  const escalated = complaints.filter(c => c.statusType === "ESCALATED").length

  return (

    <div className="status-page">

      {/* HEADER */}
      <div className="header-section">
        <h2 className="page-title">
          📌 <span className="gradient-text">Complaint Status Dashboard</span>
        </h2>
        <p className="page-subtitle">
          Track your complaints and real-time updates 🚀
        </p>
      </div>

      {/* 🔥 STATS */}
      <div className="status-stats">

        <div className="status-card blue">
          <h4>Total</h4>
          <p>{total}</p>
        </div>

        <div className="status-card green">
          <h4>Resolved</h4>
          <p>{resolved}</p>
        </div>

        <div className="status-card orange">
          <h4>Pending</h4>
          <p>{pending}</p>
        </div>

        <div className="status-card red">
          <h4>Escalated</h4>
          <p>{escalated}</p>
        </div>

      </div>

      {/* LIST */}
      <div className="complaints-list">

        {complaints.length === 0 ? (
          <div className="empty-state">
            🚫 No complaints submitted yet
          </div>
        ) : (

          complaints.map(c => (

            <div key={c.id}>

              {/* CARD */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`complaint-card modern ${selectedComplaint?.id === c.id ? "active" : ""}`}
                onClick={() => openComplaint(c)}
              >

                <div className="card-left">
                  <h4>🧾 #{c.id} {c.category}</h4>
                  <p>{c.description}</p>
                </div>

                <div className="card-right">

                  <span className={`badge urgency ${c.urgency}`}>
                    {c.urgency}
                  </span>

                  <span className={`badge status ${c.statusType}`}>
                    {c.statusType}
                  </span>

                </div>

              </motion.div>

              {/* DETAILS */}
              <AnimatePresence>

                {selectedComplaint?.id === c.id && (

                  <motion.div
                    className="details-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >

                    <StatusTracker status={c.statusType} />

                    <div className="timeline-section">

                      <h4>📍 Activity Timeline</h4>

                      {comments.length === 0 ? (
                        <p>No updates yet</p>
                      ) : (

                        comments.map(cm => (

                          <div key={cm.commentId} className="timeline-item">

                            <div className="timeline-dot"></div>

                            <div>
                              <b>{cm.statusType}</b>
                              <p>{cm.description}</p>
                              <span>{cm.date}</span>
                            </div>

                          </div>

                        ))

                      )}

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          ))

        )}

      </div>

    </div>
  )
}
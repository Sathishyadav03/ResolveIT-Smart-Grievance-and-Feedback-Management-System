export default function StatusTracker({ status }) {

  const steps = [
    { key: "OPEN", label: "Open", icon: "📝" },
    { key: "ASSIGNED", label: "Assigned", icon: "📌" },
    { key: "IN_PROGRESS", label: "In Progress", icon: "🚧" },
    { key: "RESOLVED", label: "Resolved", icon: "✅" }
  ]

  // 🔥 Detect Escalated separately
  const isEscalated = status === "ESCALATED"

  // Find current index (fallback = 0)
  const currentIndex = steps.findIndex(s => s.key === status)

  const safeIndex = currentIndex === -1 ? 0 : currentIndex

  // 🔥 Progress logic
  let progress = (safeIndex / (steps.length - 1)) * 100

  // 🚨 If escalated → stop at IN_PROGRESS (not resolved)
  if (isEscalated) {
    progress = (2 / (steps.length - 1)) * 100
  }

  return (

    <div className={`tracker-container ${isEscalated ? "escalated-tracker" : ""}`}>

      {/* BACK LINE */}
      <div className="tracker-line-bg"></div>

      {/* ACTIVE PROGRESS LINE */}
      <div 
        className={`tracker-line-progress ${isEscalated ? "escalated-line" : ""}`}
        style={{ width: `${progress}%` }}
      ></div>

      {/* STEPS */}
      <div className="tracker-wrapper">

        {steps.map((step, index) => {

          const active = index <= safeIndex
          const isCurrent = index === safeIndex

          return (
            <div key={step.key} className="tracker-step">

              <div className={`tracker-circle 
                ${active ? "active" : ""} 
                ${isCurrent ? "current" : ""}
              `}>
                {step.icon}
              </div>

              <p className={`tracker-label ${active ? "active-label" : ""}`}>
                {step.label}
              </p>

            </div>
          )
        })}

        {/* 🚨 ESCALATED STEP (SPECIAL) */}
        {isEscalated && (
          <div className="tracker-step">

            <div className="tracker-circle escalated">
              🚨
            </div>

            <p className="tracker-label escalated-label">
              Escalated
            </p>

          </div>
        )}

      </div>

    </div>
  )
}
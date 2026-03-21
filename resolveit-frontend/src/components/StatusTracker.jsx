export default function StatusTracker({ status }) {

  const steps = [
    { key: "OPEN", label: "Open", icon: "📝" },
    { key: "ASSIGNED", label: "Assigned", icon: "📌" },
    { key: "IN_PROGRESS", label: "In Progress", icon: "🚧" },
    { key: "RESOLVED", label: "Resolved", icon: "✅" }
  ]

  const currentIndex = steps.findIndex(s => s.key === status)

  // calculate progress %
  const progress = (currentIndex / (steps.length - 1)) * 100

  return (

    <div className="tracker-container">

      {/* BACK LINE */}
      <div className="tracker-line-bg"></div>

      {/* ACTIVE PROGRESS LINE */}
      <div 
        className="tracker-line-progress"
        style={{ width: `${progress}%` }}
      ></div>

      {/* STEPS */}
      <div className="tracker-wrapper">

        {steps.map((step, index) => {

          const active = index <= currentIndex
          const isCurrent = index === currentIndex

          return (
            <div key={step.key} className="tracker-step">

              <div className={`tracker-circle 
                ${active ? "active" : ""} 
                ${isCurrent ? "current" : ""}`}
              >
                {step.icon}
              </div>

              <p className={`tracker-label ${active ? "active-label" : ""}`}>
                {step.label}
              </p>

            </div>
          )
        })}

      </div>

    </div>
  )
}
export default function StatusTracker({ status }) {

const steps = ["OPEN","ASSIGNED","IN_PROGRESS","RESOLVED"]

const currentIndex = steps.indexOf(status)

return (

<div className="tracker-wrapper">

{steps.map((step,index)=>{

const active = index <= currentIndex

return(

<div key={step} className="tracker-step">

<div className={`tracker-circle ${active ? "active" : ""}`}>
{index+1}
</div>

<p className={`tracker-label ${active ? "active-label" : ""}`}>
{step.replace("_"," ")}
</p>

{index !== steps.length-1 && (
<div className={`tracker-line ${index < currentIndex ? "active-line" : ""}`}></div>
)}

</div>

)

})}

</div>

)

}
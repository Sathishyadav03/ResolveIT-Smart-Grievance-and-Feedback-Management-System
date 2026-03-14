export default function ComplaintCard({ complaint, onClick }) {

return (

<div className="complaint-card" onClick={onClick}>

<div className="complaint-header">

<span>
#{complaint.id} {complaint.category}
</span>

<span className={`priority ${complaint.urgency}`}>
{complaint.urgency}
</span>

<span className="status-badge">
{complaint.statusType}
</span>

</div>

<p>{complaint.description}</p>

<small>
Created: {new Date(complaint.createdAt).toLocaleDateString()}
</small>

</div>

)

}
export default function Timeline({ comments }) {

return(

<div className="timeline">

<h3>Complaint Updates</h3>

{comments.length === 0 && (
<p style={{marginTop:"10px"}}>No updates yet</p>
)}

{comments.map((c)=>(

<div key={c.comment_id} className="timeline-item">

<div className="timeline-dot"></div>

<div className="timeline-content">

<h4>{c.statusType}</h4>

<p>{c.description}</p>

<small>
{new Date(c.date).toLocaleDateString()}
</small>

</div>

</div>

))}

</div>

)

}
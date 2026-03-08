import { Link } from "react-router-dom"
import "../styles/dashboard.css"

export default function Sidebar({ role }) {

return(

<div className="sidebar">

<h3>ResolveIT</h3>

{role==="CUSTOMER" && (
<>
<Link to="/customer-dashboard">Dashboard</Link>
<Link to="/customer-dashboard/submit-complaint">Submit Complaint</Link>
<Link to="/customer-dashboard/complaint-status">Complaint Status</Link>
</>
)}

{role==="STAFF" && (
<>
<Link to="/staff-dashboard">Dashboard</Link>
<Link to="/staff-dashboard/assigned-complaints">Assigned Complaints</Link>
</>
)}

{role==="ADMIN" && (
<>
<Link to="/admin-dashboard">Dashboard</Link>
<Link to="/admin-dashboard/all-complaints">All Complaints</Link>
<Link to="/admin-dashboard/assign-complaints">Assign Complaints</Link>
</>
)}

</div>

)

}
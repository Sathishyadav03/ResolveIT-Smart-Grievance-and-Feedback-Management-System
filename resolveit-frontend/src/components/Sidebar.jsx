import { NavLink } from "react-router-dom"

export default function Sidebar({ role }) {

return (

<div className="sidebar">

<div className="sidebar-logo">
<h2>ResolveIT</h2>
<p>Complaint System</p>
</div>

<nav className="sidebar-links">

{role === "CUSTOMER" && (

<>
<NavLink to="/customer-dashboard" end className="sidebar-link">
🏠 Dashboard
</NavLink>

<NavLink to="/customer-dashboard/submit-complaint" className="sidebar-link">
📝 Submit Complaint
</NavLink>

<NavLink to="/customer-dashboard/complaint-status" className="sidebar-link">
📊 Complaint Status
</NavLink>
</>

)}

{role === "STAFF" && (

<>
<NavLink to="/staff-dashboard" className="sidebar-link">
🛠 Staff Dashboard
</NavLink>
</>

)}

{role === "ADMIN" && (

<>
<NavLink to="/admin-dashboard" className="sidebar-link">
⚙ Admin Dashboard
</NavLink>
</>

)}

</nav>

</div>

)

}
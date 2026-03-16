import { NavLink } from "react-router-dom"
import { FaChartBar, FaClipboardList, FaUsers } from "react-icons/fa"

export default function Sidebar({ role }) {

return (

<div className="sidebar">

<div className="sidebar-logo">
<h2>ResolveIT</h2>
<p>Complaint System</p>
</div>

<nav className="sidebar-links">

{/* CUSTOMER */}

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

{/* STAFF */}

{role === "STAFF" && (

<>
<NavLink to="/staff-dashboard" end className="sidebar-link">
🛠 Dashboard
</NavLink>

<NavLink to="/staff-dashboard/assigned" className="sidebar-link">
📋 Assigned Complaints
</NavLink>

<NavLink to="/staff-dashboard/resolved" className="sidebar-link">
✅ Resolved Complaints
</NavLink>
</>

)}

{/* ADMIN */}

{role === "ADMIN" && (

<>
<NavLink to="/admin-dashboard" end className="sidebar-link">
<FaChartBar/> Dashboard
</NavLink>

<NavLink to="/admin-dashboard/complaints" className="sidebar-link">
<FaClipboardList/> Complaints
</NavLink>

<NavLink to="/admin-dashboard/staff" className="sidebar-link">
<FaUsers/> Staff Management
</NavLink>
</>

)}

</nav>

</div>

)

}
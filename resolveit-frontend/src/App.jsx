import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"

import CustomerDashboard from "./pages/CustomerDashboard"
import SubmitComplaint from "./pages/SubmitComplaint"
import ComplaintStatus from "./pages/ComplaintStatus"
import CustomerProfile from "./pages/CustomerProfile"

import AdminDashboard from "./pages/AdminDashboard"
import AdminComplaints from "./pages/AdminComplaints"
import StaffManagement from "./pages/StaffManagement"
import AdminProfile from "./pages/AdminProfile"

import StaffDashboard from "./pages/StaffDashboard"
import AssignedComplaints from "./pages/AssignedComplaints"
import ResolvedComplaints from "./pages/ResolvedComplaints"
import StaffProfile from "./pages/StaffProfile"

import ComplaintDetails from "./pages/ComplaintDetails"

function App(){

return(

<Routes>

{/* AUTH */}

<Route path="/" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>


{/* CUSTOMER */}

<Route path="/customer-dashboard" element={<CustomerDashboard/>}>

<Route path="submit-complaint" element={<SubmitComplaint/>}/>
<Route path="complaint-status" element={<ComplaintStatus/>}/>
<Route path="profile" element={<CustomerProfile/>}/>

</Route>


{/* ADMIN */}

<Route path="/admin-dashboard" element={<AdminDashboard/>}/>
<Route path="/admin-dashboard/complaints" element={<AdminComplaints/>}/>
<Route path="/admin-dashboard/staff" element={<StaffManagement/>}/>
<Route path="/admin-dashboard/profile" element={<AdminProfile/>}/>

{/* STAFF */}

<Route path="/staff-dashboard" element={<StaffDashboard/>}/>
<Route path="/staff-dashboard/assigned" element={<AssignedComplaints/>}/>
<Route path="/staff-dashboard/resolved" element={<ResolvedComplaints/>}/>
<Route path="/staff-dashboard/profile" element={<StaffProfile/>}/>


{/* COMPLAINT DETAILS */}

<Route path="/complaint/:id" element={<ComplaintDetails/>}/>

</Routes>

)

}

export default App
import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"

import CustomerDashboard from "./pages/CustomerDashboard"
import SubmitComplaint from "./pages/SubmitComplaint"
import ComplaintStatus from "./pages/ComplaintStatus"

import AdminDashboard from "./pages/AdminDashboard"
import StaffDashboard from "./pages/StaffDashboard"
import ComplaintDetails from "./pages/ComplaintDetails"

function App(){

return(

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route path="/admin-dashboard" element={<AdminDashboard/>}/>
<Route path="/staff-dashboard" element={<StaffDashboard/>}/>

<Route path="/complaint/:id" element={<ComplaintDetails/>}/>

<Route path="/customer-dashboard" element={<CustomerDashboard/>}>

<Route path="submit-complaint" element={<SubmitComplaint/>}/>
<Route path="complaint-status" element={<ComplaintStatus/>}/>

</Route>

</Routes>

)

}

export default App
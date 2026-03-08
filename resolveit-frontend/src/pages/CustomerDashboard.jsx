import { Routes,Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

import SubmitComplaint from "./SubmitComplaint"
import ComplaintStatus from "./ComplaintStatus"

import "../styles/dashboard.css"

export default function CustomerDashboard(){

return(

<div>

<Navbar/>

<div className="layout">

<Sidebar role="CUSTOMER"/>

<div className="content">

<h1>Customer Dashboard</h1>

<Routes>

<Route path="submit-complaint" element={<SubmitComplaint/>}/>
<Route path="complaint-status" element={<ComplaintStatus/>}/>

</Routes>

</div>

</div>

</div>

)

}
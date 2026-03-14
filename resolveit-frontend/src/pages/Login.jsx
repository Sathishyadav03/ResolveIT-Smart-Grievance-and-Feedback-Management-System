import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../styles/login.css"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const navigate = useNavigate()

const handleLogin = async(e)=>{

e.preventDefault()

try{

setLoading(true)

const res = await api.post("/auth/login",{
email,
password
})

/* SAVE TOKEN */

localStorage.setItem("token", res.data.token)
localStorage.setItem("role", res.data.role)

if(res.data.role === "ADMIN"){
navigate("/admin-dashboard")
}
else if(res.data.role === "STAFF"){
navigate("/staff-dashboard")
}
else{
navigate("/customer-dashboard")
}

}catch(err){

console.error(err)
alert("Invalid email or password")

}
finally{
setLoading(false)
}

}

return(

<div className="login-page">

<div className="login-header">

<div className="logo-title">

<img
src="/logo.png"
alt="ResolveIT Logo"
className="login-logo"
/>

<h1>ResolveIT</h1>

</div>

<p>Smart Complaint & Grievance Management System</p>

</div>

<div className="login-card">

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit" disabled={loading}>

{loading ? "Logging in..." : "Login"}

</button>

</form>

<p className="register-text">
Don't have an account?
<a href="/register"> Register</a>
</p>

</div>

</div>

)

}
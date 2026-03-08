import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../styles/login.css"

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()

const handleLogin = async(e)=>{

e.preventDefault()

try{

const res = await api.post("/auth/login",{email,password})

const token = res.data.token

localStorage.setItem("token",token)

const payload = JSON.parse(atob(token.split(".")[1]))

const role = payload.role?.toUpperCase()

console.log("ROLE:",role)

if(role === "ADMIN"){
navigate("/admin-dashboard")
}
else if(role === "STAFF"){
navigate("/staff-dashboard")
}
else{
navigate("/customer-dashboard")
}

}catch(err){

console.error(err)
alert("Login Failed")

}

}

return(

<div className="login-container">

<div className="login-card">

<h2>ResolveIT Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">Login</button>

</form>

<p style={{marginTop:"15px"}}>

Don't have an account?
<a href="/register"> Register</a>

</p>

</div>

</div>

)

}
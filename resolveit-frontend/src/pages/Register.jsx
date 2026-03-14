import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../styles/login.css"

export default function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleRegister = async(e)=>{

e.preventDefault()

try{

await api.post("/auth/register",{
name,
email,
password
})

alert("Registration Successful")

navigate("/")

}catch(err){

console.error(err)
alert("Registration Failed")

}

}

return(

<div className="login-page">

{/* HEADER */}

<div className="login-header">

<img
src="/logo.png"
alt="ResolveIT Logo"
className="login-logo"
/>
<p>Create your account</p>

</div>


{/* REGISTER CARD */}

<div className="login-card">

<h2>Register</h2>

<form onSubmit={handleRegister}>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

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

<button type="submit">

Register

</button>

</form>

<p className="register-text">

Already have an account?  
<a href="/"> Login</a>

</p>

</div>

</div>

)

}
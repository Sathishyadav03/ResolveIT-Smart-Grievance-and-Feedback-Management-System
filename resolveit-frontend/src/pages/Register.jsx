import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../styles/login.css"

export default function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [role,setRole] = useState("CUSTOMER")

const navigate = useNavigate()

const handleRegister = async(e)=>{

e.preventDefault()

try{

await api.post("/auth/register",{
name,
email,
password,
role
})

alert("Registration Successful")

navigate("/")

}catch(err){

alert("Registration Failed")

}

}

return(

<div className="login-container">

<div className="login-card">

<h2>Register</h2>

<form onSubmit={handleRegister}>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<select onChange={(e)=>setRole(e.target.value)}>

<option value="CUSTOMER">Customer</option>
<option value="STAFF">Staff</option>

</select>

<button type="submit">Register</button>

</form>

</div>

</div>

)

}
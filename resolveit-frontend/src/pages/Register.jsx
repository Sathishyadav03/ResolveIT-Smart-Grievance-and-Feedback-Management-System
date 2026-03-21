import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import api from "../services/api"
import "../styles/login.css"   // reuse same UI

export default function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)
const [showPassword,setShowPassword] = useState(false)

const navigate = useNavigate()

const handleRegister = async(e)=>{
e.preventDefault()

try{
setLoading(true)

await api.post("/auth/register",{
name,
email,
password
})

alert("Registration successful ✅")

// redirect to login
navigate("/")

}catch(err){

console.error(err)

if(err.response?.status === 400){
alert("User already exists ⚠️")
}else{
alert("Registration failed ❌")
}

}finally{
setLoading(false)
}
}

return(

<div className="login-page">

{/* HEADER */}
<div className="login-header">

<img src="/logo.png" alt="ResolveIT Logo" className="login-logo"/>


<p>🚀 Create your account</p>

</div>

{/* CARD */}
<div className="login-card">

<h2>Register 🚀</h2>

<form onSubmit={handleRegister}>

{/* NAME */}
<div className="input-group">
<FaUser className="input-icon"/>
<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>
</div>

{/* EMAIL */}
<div className="input-group">
<FaEnvelope className="input-icon"/>
<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>
</div>

{/* PASSWORD */}
<div className="input-group">
<FaLock className="input-icon"/>

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<span
className="eye-icon"
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? <FaEyeSlash/> : <FaEye/>}
</span>

</div>

{/* BUTTON */}
<button type="submit" disabled={loading}>
{loading ? "Creating Account..." : "Register"}
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
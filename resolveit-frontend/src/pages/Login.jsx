import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import api from "../services/api"
import "../styles/login.css"

export default function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [showPassword,setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async(e)=>{
    e.preventDefault()

    try{
      setLoading(true)

      const res = await api.post("/auth/login",{ email, password })

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

      {/* HEADER */}
      <div className="login-header">
        <img src="/logo.png" alt="ResolveIT Logo" className="login-logo"/>
       <p className="project-desc">
  ResolveIT is an intelligent complaint and grievance management platform
  that enables users to report issues, track progress, and receive timely updates.
</p>
      </div>

      {/* CARD */}
      <div className="login-card">

        <h2>Welcome Back 👋</h2>

       <form onSubmit={handleLogin}>

  {/* EMAIL */}
  <div className="input-group">
    <div className="icon-box">
      <FaEnvelope />
    </div>

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
    <div className="icon-box">
      <FaLock />
    </div>

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      required
    />

    <div
      className="eye-icon"
      onClick={()=>setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash/> : <FaEye/>}
    </div>
  </div>

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
import { useNavigate } from "react-router-dom"

export default function Navbar(){

const navigate = useNavigate()

const role = localStorage.getItem("role")

const logout = () => {
    localStorage.clear()
    navigate("/")
}

return(

<div className="navbar">

<div className="logo">
ResolveIT
</div>

<div className="profile">

<span>{role}</span>

<button onClick={logout}>
Logout
</button>

</div>

</div>

)

}
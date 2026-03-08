import "../styles/dashboard.css"

export default function Navbar(){

const logout = () => {
localStorage.removeItem("token")
window.location="/"
}

return(

<div className="navbar">

<h2>ResolveIT</h2>

<div className="profile">

<span className="profile-icon">👤</span>

<button onClick={logout}>Logout</button>

</div>

</div>

)

}
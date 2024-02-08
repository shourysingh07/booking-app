import React from 'react'
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const Navbar = () => {
  const style={
    color:"inherit",
    textDecoration:"none"
  }
  const navigate=useNavigate()
  const handleClick=()=>{
    navigate("/login")
  }
  
  const {user,dispatch}=useContext(AuthContext)
  const handleLogout=(e)=>{
    e.preventDefault()
    localStorage.removeItem("user")
    dispatch({type:"LOGOUT"})

  }
  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={style}>
            <div className="logo">
                <h4>BookYourStay</h4>
            </div></Link>
           {user?
           <div className="buttons ">
           <button className='button'>{user.username}</button>
           <button className='button' onClick={handleLogout}>Logout</button>
       </div>
           
           : <div className="buttons ">
                <button className='button'>Register</button>
                <button className='button' onClick={handleClick}>Login</button>
            </div>}
        </div>
    </div>
  )
}

export default Navbar
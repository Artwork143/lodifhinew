import React from 'react'
import { NavLink } from 'react-router-dom'

function Profile() {
  return (
    <>
      <div>This is your Profile</div>
      <NavLink to="/register" className="hover:text-red-900">Register?</NavLink>
      <NavLink to="/logout" className="hover:text-red-900 block">Logout</NavLink>
    </>
    
  )
}

export default Profile